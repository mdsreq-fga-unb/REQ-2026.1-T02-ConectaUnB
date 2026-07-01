import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { File, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ImageProcessor } from './image.processor';
import { R2StorageProvider } from './providers/r2.provider';
import { LocalStorageProvider } from './providers/local.provider';
import {
  CACHE_CONTROL_IMMUTABLE,
  DEFAULT_PERFIL_STORAGE_QUOTA_BYTES,
  DEFAULT_UPLOAD_MAX_FILE_SIZE_BYTES,
  STORAGE_SLOTS,
  StorageSlotName,
} from './storage.constants';
import {
  StorageProvider,
  StorageUploadResult,
  UploadContext,
} from './storage.types';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly provider: StorageProvider;
  private readonly imageProcessor = new ImageProcessor();

  constructor(
    private readonly r2: R2StorageProvider,
    private readonly local: LocalStorageProvider,
    private readonly prisma: PrismaService,
  ) {
    this.provider = this.resolveProvider();
  }

  private resolveProvider(): StorageProvider {
    const driver = (process.env.STORAGE_DRIVER ?? '').toLowerCase();
    if (driver === 'r2') return this.r2;
    if (driver === 'local') return this.local;
    // auto-detect
    if (process.env.R2_BUCKET_NAME && process.env.R2_ENDPOINT) return this.r2;
    return this.local;
  }

  private get maxFileSize(): number {
    const parsed = Number.parseInt(
      process.env.UPLOAD_MAX_FILE_SIZE_BYTES ??
        String(DEFAULT_UPLOAD_MAX_FILE_SIZE_BYTES),
      10,
    );
    return Number.isFinite(parsed) && parsed > 0
      ? parsed
      : DEFAULT_UPLOAD_MAX_FILE_SIZE_BYTES;
  }

  private get perfilQuota(): number {
    const parsed = Number.parseInt(
      process.env.PERFIL_STORAGE_QUOTA_BYTES ??
        String(DEFAULT_PERFIL_STORAGE_QUOTA_BYTES),
      10,
    );
    return Number.isFinite(parsed) && parsed > 0
      ? parsed
      : DEFAULT_PERFIL_STORAGE_QUOTA_BYTES;
  }

  async upload(
    buffer: Buffer,
    ctx: UploadContext,
  ): Promise<StorageUploadResult> {
    const slotCfg = STORAGE_SLOTS[ctx.slot];
    if (!slotCfg) {
      throw new BadRequestException(`Slot desconhecido: ${ctx.slot}`);
    }

    if (buffer.length === 0) {
      throw new BadRequestException('Arquivo vazio.');
    }
    if (buffer.length > this.maxFileSize) {
      throw new BadRequestException(
        `Arquivo excede o tamanho maximo de ${this.maxFileSize} bytes.`,
      );
    }

    const mime = this.imageProcessor.detectMime(buffer);
    if (!this.imageProcessor.isAllowed(mime)) {
      throw new BadRequestException(
        `Tipo de arquivo nao suportado (${mime}). Use JPEG, PNG ou WebP.`,
      );
    }

    const processed = await this.imageProcessor.process(buffer, ctx.slot);

    if (processed.buffer.length > slotCfg.maxSizeBytes) {
      throw new BadRequestException(
        `Imagem processada ainda muito grande para o slot "${ctx.slot}" (${processed.buffer.length} bytes).`,
      );
    }

    await this.assertQuota(ctx.ownerId, processed.buffer.length);

    const key = this.imageProcessor.buildKey({
      slot: ctx.slot,
      ownerId: ctx.ownerId,
      hash: processed.hash,
      entityType: ctx.entityType,
      entityId: ctx.entityId,
    });

    // Dedup: se a chave já existe no R2/local, reusamos. Caso contrario subimos.
    const existing = await this.prisma.file.findUnique({ where: { key } });
    if (existing) {
      return {
        fileId: existing.id,
        key: existing.key,
        url: existing.url,
        size: existing.size,
        mimeType: existing.mimeType,
      };
    }

    const { url } = await this.provider.upload({
      buffer: processed.buffer,
      key,
      contentType: processed.mimeType,
      cacheControl: CACHE_CONTROL_IMMUTABLE,
    });

    // Slot single: substitui o anterior (deleta R2 + File row) dentro de tx.
    let fileRow: File;
    if (slotCfg.single) {
      fileRow = await this.replaceSingleSlot({
        key,
        url,
        size: processed.buffer.length,
        mimeType: processed.mimeType,
        originalNameHint: ctx.slot,
        ctx,
      });
    } else {
      fileRow = await this.prisma.file.create({
        data: {
          key,
          url,
          size: processed.buffer.length,
          mimeType: processed.mimeType,
          slot: ctx.slot,
          ownerId: ctx.ownerId,
          entityType: ctx.entityType ?? null,
          entityId: ctx.entityId ?? null,
          originalName: `${ctx.slot}-${processed.hash}`,
        },
      });
    }

    return {
      fileId: fileRow.id,
      key: fileRow.key,
      url: fileRow.url,
      size: fileRow.size,
      mimeType: fileRow.mimeType,
    };
  }

  async delete(fileId: string, requesterId: number): Promise<void> {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new NotFoundException('Arquivo nao encontrado.');
    if (file.ownerId !== requesterId) {
      // Permite delecao por gestores da entidade dona via camada de dominio.
      // Aqui, sem contexto de entidade, so o dono.
      throw new NotFoundException('Arquivo nao encontrado.');
    }
    await this.provider.delete({ key: file.key });
    await this.prisma.file.delete({ where: { id: fileId } });
  }

  async findByUrl(url: string): Promise<File | null> {
    return this.prisma.file.findFirst({ where: { url } });
  }

  async findByOwnerSlot(
    ownerId: number,
    slot: StorageSlotName,
  ): Promise<File[]> {
    return this.prisma.file.findMany({ where: { ownerId, slot } });
  }

  async deleteByKey(key: string): Promise<void> {
    await this.provider.delete({ key });
    try {
      await this.prisma.file.delete({ where: { key } });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        return;
      }
      throw err;
    }
  }

  async getUsage(perfilId: number): Promise<{
    used: number;
    quota: number;
    percent: number;
  }> {
    const agg = await this.prisma.file.aggregate({
      where: { ownerId: perfilId },
      _sum: { size: true },
    });
    const used = agg._sum.size ?? 0;
    const quota = this.perfilQuota;
    return { used, quota, percent: quota > 0 ? (used / quota) * 100 : 0 };
  }

  private async assertQuota(ownerId: number, incomingBytes: number) {
    const { used, quota } = await this.getUsage(ownerId);
    if (used + incomingBytes > quota) {
      throw new BadRequestException(
        `Upload excederia a quota de armazenamento do perfil (${used + incomingBytes} > ${quota} bytes).`,
      );
    }
  }

  private async replaceSingleSlot(args: {
    key: string;
    url: string;
    size: number;
    mimeType: string;
    originalNameHint: string;
    ctx: UploadContext;
  }): Promise<File> {
    const where: Prisma.FileWhereInput = {
      ownerId: args.ctx.ownerId,
      slot: args.ctx.slot,
    };
    if (args.ctx.entityType && args.ctx.entityId != null) {
      where.entityType = args.ctx.entityType;
      where.entityId = args.ctx.entityId;
    }
    const previous = await this.prisma.file.findFirst({ where });

    const created = await this.prisma.file.create({
      data: {
        key: args.key,
        url: args.url,
        size: args.size,
        mimeType: args.mimeType,
        slot: args.ctx.slot,
        ownerId: args.ctx.ownerId,
        entityType: args.ctx.entityType ?? null,
        entityId: args.ctx.entityId ?? null,
        originalName: `${args.originalNameHint}-${args.key.split('/').pop()}`,
      },
    });

    if (
      previous &&
      previous.id !== created.id &&
      previous.key !== created.key
    ) {
      await this.provider.delete({ key: previous.key }).catch((err) => {
        this.logger.warn(
          `falha ao remover arquivo anterior: ${previous.key} -> ${err}`,
        );
      });
      await this.prisma.file
        .delete({ where: { id: previous.id } })
        .catch((err) => {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2025'
          ) {
            return;
          }
          this.logger.warn(
            `falha ao remover File row anterior: ${previous.id}`,
          );
        });
    }
    return created;
  }
}
