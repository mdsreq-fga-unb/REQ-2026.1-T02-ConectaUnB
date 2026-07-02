import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  ParseIntPipe,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { PerfilService } from './perfil.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateSenhaDto } from './dto/update-senha.dto';
import { StorageService } from '../storage/storage.service';

type AuthenticatedRequest = ExpressRequest & {
  user: { id: string; email: string };
};

@Controller('perfil')
export class PerfilController {
  constructor(
    private readonly perfilService: PerfilService,
    private readonly storage: StorageService,
  ) {}

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get('seguindo/:id')
  findSeguindo(@Param('id', ParseIntPipe) id: number) {
    return this.perfilService.findSeguindo(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perfilService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req, @Body() updatePerfilDto: UpdatePerfilDto) {
    const id = Number(req.user.id);
    return this.perfilService.update(id, updatePerfilDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('senha')
  updateSenha(@Req() req, @Body() senhaDto: UpdateSenhaDto) {
    const id = Number(req.user.id);
    return this.perfilService.updateSenha(id, senhaDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('foto')
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
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Arquivo "file" eh obrigatorio.');
    const id = Number(req.user.id);
    const uploaded = await this.storage.upload(file.buffer, {
      slot: 'avatar',
      ownerId: id,
    });
    return this.perfilService.setFoto(id, uploaded.url);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Req() req) {
    const id = Number(req.user.id);
    return this.perfilService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('seguir/:id')
  seguir(@Param('id') id: string, @Req() req) {
    const idUsuario = Number(req.user.id);
    return this.perfilService.seguir(Number(id), idUsuario);
  }
}
