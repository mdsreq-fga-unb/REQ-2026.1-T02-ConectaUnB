import * as crypto from 'node:crypto';
import sharp from 'sharp';
import {
  ALLOWED_INPUT_MIME,
  OUTPUT_EXT,
  OUTPUT_MIME,
  STORAGE_SLOTS,
  StorageSlotName,
} from './storage.constants';

export class ImageProcessor {
  /**
   * Detecta o MIME real a partir do buffer (magic bytes). Nao confia no header
   * enviado pelo cliente.
   */
  detectMime(buffer: Buffer): string {
    if (buffer.length < 12) return 'application/octet-stream';
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff)
      return 'image/jpeg';
    if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    )
      return 'image/png';
    if (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46 &&
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50
    )
      return 'image/webp';
    return 'application/octet-stream';
  }

  isAllowed(mime: string): boolean {
    return ALLOWED_INPUT_MIME.has(mime);
  }

  /**
   * Processa a imagem para o slot: redimensiona, corrige orientacao EXIF,
   * converte para WebP q80. Retorna buffer processado + sha1 para path
   * deterministico.
   */
  async process(
    buffer: Buffer,
    slot: StorageSlotName,
  ): Promise<{
    buffer: Buffer;
    hash: string;
    mimeType: string;
  }> {
    const cfg = STORAGE_SLOTS[slot];
    const pipeline = sharp(buffer, { failOn: 'error' }).rotate().resize({
      width: cfg.width,
      height: cfg.height,
      fit: cfg.fit,
      withoutEnlargement: true,
    });

    const processed = await pipeline.webp({ quality: 80 }).toBuffer();
    const hash = crypto
      .createHash('sha1')
      .update(processed)
      .digest('hex')
      .slice(0, 16);
    return { buffer: processed, hash, mimeType: OUTPUT_MIME };
  }

  /**
   * Monta a chave canônica no bucket: `<slot>/<ownerId>/<entityId?>/<hash>.webp`.
   * O hash garante path deterministico (dedup: mesmo arquivo = mesma chave).
   */
  buildKey(args: {
    slot: StorageSlotName;
    ownerId: number;
    hash: string;
    entityType?: string | null;
    entityId?: number | null;
  }): string {
    const segments = [args.slot, String(args.ownerId)];
    if (args.entityType && args.entityId != null) {
      segments.push(`${args.entityType}-${args.entityId}`);
    }
    segments.push(`${args.hash}.${OUTPUT_EXT}`);
    return segments.join('/');
  }
}
