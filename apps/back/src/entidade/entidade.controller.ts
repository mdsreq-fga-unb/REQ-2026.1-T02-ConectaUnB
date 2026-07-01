import { Request as ExpressRequest } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { EntidadeService } from './entidade.service';
import { AddMembroDto } from './dto/add-membro.dto';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StorageService } from '../storage/storage.service';

type AuthenticatedRequest = ExpressRequest & {
  user: { id: string; email: string };
};

@ApiTags('Entidade')
@Controller('entidade')
export class EntidadeController {
  constructor(
    private readonly entidadeService: EntidadeService,
    private readonly storage: StorageService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createEntidadeDto: CreateEntidadeDto,
  ) {
    return this.entidadeService.create(createEntidadeDto, Number(req.user.id));
  }

  @Get('buscar')
  search(@Query('q') q: string) {
    return this.entidadeService.search(q || '');
  }

  @Get()
  findAll() {
    return this.entidadeService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('minhas')
  findMinhasEntidades(@Req() req: AuthenticatedRequest) {
    return this.entidadeService.findMinhasEntidades(Number(req.user.id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/membros')
  addMembro(
    @Param('id') id: string,
    @Body() addMembroDto: AddMembroDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.entidadeService.addMembro(
      +id,
      Number(req.user.id),
      addMembroDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/membros/:idPerfil')
  removeMembro(
    @Param('id') id: string,
    @Param('idPerfil') idPerfil: string,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.entidadeService.removeMembro(
      +id,
      Number(req.user.id),
      +idPerfil,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/membros/:idPerfil')
  updateMembro(
    @Param('id') id: string,
    @Param('idPerfil') idPerfil: string,
    @Body() updateMembroDto: UpdateMembroDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.entidadeService.updateMembro(
      +id,
      Number(req.user.id),
      +idPerfil,
      updateMembroDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entidadeService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntidadeDto: UpdateEntidadeDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.entidadeService.update(
      +id,
      Number(req.user.id),
      updateEntidadeDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.entidadeService.remove(+id, Number(req.user.id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/seguir')
  seguir(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.entidadeService.seguir(+id, Number(req.user.id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/seguir')
  unfollow(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.entidadeService.unfollow(+id, Number(req.user.id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/logo')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  async uploadLogo(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Arquivo "file" eh obrigatorio.');
    const ownerId = Number(req.user.id);
    const uploaded = await this.storage.upload(file.buffer, {
      slot: 'logo',
      ownerId,
      entityType: 'entidade',
      entityId: +id,
    });
    return this.entidadeService.setLogo(+id, ownerId, uploaded.url);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/banner')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  async uploadBanner(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Arquivo "file" eh obrigatorio.');
    const ownerId = Number(req.user.id);
    const uploaded = await this.storage.upload(file.buffer, {
      slot: 'banner',
      ownerId,
      entityType: 'entidade',
      entityId: +id,
    });
    return this.entidadeService.setBanner(+id, ownerId, uploaded.url);
  }
}
