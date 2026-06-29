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
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProjetoService } from './projeto.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateMembroProjetoDto } from './dto/update-membro-projeto.dto';
import { AddMembroProjetoDto } from './dto/add-membro-projeto.dto';

type AuthenticatedRequest = ExpressRequest & {
  user: { id: string; email: string };
};

@Controller('projeto')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

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
  findProjetosEntidade(
    @Param('id') id: string,
  ) {
    return this.projetoService.findProjetosEntidade(+id);
  }

  @Get(':idProjeto')
  findOne(
    @Param('idProjeto') idProjeto: string
  ) {
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
    return this.projetoService.addMembro(
      +id,
      userId,
      addMembroDto,
    );
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
    return this.projetoService.removeMembro(
      +id,
      userId,
      +idPerfil,
    );
  }

}
