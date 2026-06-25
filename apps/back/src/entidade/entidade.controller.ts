import { Request as ExpressRequest } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EntidadeService } from './entidade.service';
import { AddMembroDto } from './dto/add-membro.dto';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

type AuthenticatedRequest = ExpressRequest & {
  user: { id: string; email: string };
};

@ApiTags('Entidade')
@Controller('entidade')
export class EntidadeController {
  constructor(private readonly entidadeService: EntidadeService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req: AuthenticatedRequest,
    @Body() createEntidadeDto: CreateEntidadeDto,
  ) {
    console.log(
      '=> CREATE CHAMADO! idCriador:',
      req.user.id,
      'DTO:',
      createEntidadeDto,
    );
    return this.entidadeService.create(createEntidadeDto, Number(req.user.id));
  }

  @Get()
  findAll() {
    return this.entidadeService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('minhas')
  findMinhasEntidades(@Request() req: AuthenticatedRequest) {
    return this.entidadeService.findMinhasEntidades(Number(req.user.id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/membros')
  addMembro(
    @Param('id') id: string,
    @Body() addMembroDto: AddMembroDto,
    @Request() req: AuthenticatedRequest,
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
    @Request() req: AuthenticatedRequest,
  ) {
    return this.entidadeService.removeMembro(
      +id,
      Number(req.user.id),
      +idPerfil,
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
  ) {
    return this.entidadeService.update(+id, updateEntidadeDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entidadeService.remove(+id);
  }
}
