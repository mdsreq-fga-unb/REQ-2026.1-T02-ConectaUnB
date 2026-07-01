import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateMembroProjetoDto } from './dto/update-membro-projeto.dto';
import { AddMembroProjetoDto } from './dto/add-membro-projeto.dto';
import { StorageService } from '../storage/storage.service';

type AuthenticatedRequest = ExpressRequest & {
  user: { id: string; email: string };
};

@Controller('projeto')
export class ProjetoController {
  constructor(
    private readonly projetoService: ProjetoService,
    private readonly storage: StorageService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProjetoDto: CreateProjetoDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = Number(req.user.id);
    return this.projetoService.create(createProjetoDto, userId);
  }

  @Get('entidade/:id')
  findProjetosEntidade(@Param('id') id: string) {
    return this.projetoService.findProjetosEntidade(+id);
  }

  @Get(':idProjeto')
  findOne(@Param('idProjeto') idProjeto: string) {
    return this.projetoService.findOne(+idProjeto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateProjetoDto: UpdateProjetoDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.projetoService.update(
      +id,
      Number(req.user.id),
      updateProjetoDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const userId = Number(req.user.id);
    return this.projetoService.remove(+id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/membros')
  addMembro(
    @Param('id') id: string,
    @Body() addMembroDto: AddMembroProjetoDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = Number(req.user.id);
    return this.projetoService.addMembro(+id, userId, addMembroDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id/membros/:idPerfil')
  updateMembro(
    @Param('id') id: string,
    @Param('idPerfil') idPerfil: string,
    @Body() updateMembroDto: UpdateMembroProjetoDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = Number(req.user.id);
    return this.projetoService.updateMembro(
      +id,
      userId,
      +idPerfil,
      updateMembroDto,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/membros/:idPerfil')
  removeMembro(
    @Param('id') id: string,
    @Param('idPerfil') idPerfil: string,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = Number(req.user.id);
    return this.projetoService.removeMembro(+id, userId, +idPerfil);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/foto')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  async uploadFoto(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Arquivo "file" eh obrigatorio.');
    const userId = Number(req.user.id);
    const uploaded = await this.storage.upload(file.buffer, {
      slot: 'projeto_foto',
      ownerId: userId,
      entityType: 'projeto',
      entityId: +id,
    });
    return this.projetoService.setFoto(+id, userId, uploaded.url);
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
    @Request() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Arquivo "file" eh obrigatorio.');
    const userId = Number(req.user.id);
    const uploaded = await this.storage.upload(file.buffer, {
      slot: 'projeto_banner',
      ownerId: userId,
      entityType: 'projeto',
      entityId: +id,
    });
    return this.projetoService.setBanner(+id, userId, uploaded.url);
  }
}
