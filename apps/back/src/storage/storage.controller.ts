import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StorageSlotName } from './storage.constants';
import { StorageService } from './storage.service';

type AuthenticatedRequest = ExpressRequest & {
  user: { id: string; email: string };
};

@ApiBearerAuth()
@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: Number.parseInt(
          process.env.UPLOAD_MAX_FILE_SIZE_BYTES ?? '5242880',
          10,
        ),
      },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Apenas imagens sao permitidas.'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('slot') slot: string,
    @Query('entityId') entityId: string | undefined,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Arquivo "file" eh obrigatorio.');
    const validSlots: StorageSlotName[] = [
      'avatar',
      'logo',
      'banner',
      'postagem',
      'projeto_foto',
      'projeto_banner',
      'processo_foto',
    ];
    if (!validSlots.includes(slot as StorageSlotName)) {
      throw new BadRequestException(`Slot invalido: ${slot}`);
    }

    const slotName = slot as StorageSlotName;
    const ownerId = Number(req.user.id);

    const ctx: {
      slot: StorageSlotName;
      ownerId: number;
      entityType?: string;
      entityId?: number;
    } = {
      slot: slotName,
      ownerId,
    };

    // Mapeia slot -> (entityType, entityId) para dedup/substituicao por entidade.
    if (entityId) {
      const eid = Number(entityId);
      if (slotName === 'logo' || slotName === 'banner')
        ctx.entityType = 'entidade';
      else if (slotName === 'projeto_foto' || slotName === 'projeto_banner')
        ctx.entityType = 'projeto';
      else if (slotName === 'postagem') ctx.entityType = 'postagem';
      else if (slotName === 'processo_foto')
        ctx.entityType = 'processo_seletivo';
      if (ctx.entityType) ctx.entityId = eid;
    }

    return this.storageService.upload(file.buffer, ctx);
  }

  @Get('usage/:perfilId')
  @UseGuards(JwtAuthGuard)
  usage(@Param('perfilId') perfilId: string) {
    return this.storageService.getUsage(Number(perfilId));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    await this.storageService.delete(id, Number(req.user.id));
    return { ok: true };
  }
}
