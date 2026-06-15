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
import { EntidadeService } from './entidade.service';
import { AddMembroDto } from './dto/add-membro.dto';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('entidade')
export class EntidadeController {
  constructor(private readonly entidadeService: EntidadeService) {}

  @Post()
  create(@Body() createEntidadeDto: CreateEntidadeDto) {
    return this.entidadeService.create(createEntidadeDto);
  }

  @Get()
  findAll() {
    return this.entidadeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('minhas')
  findMinhasEntidades(
    @Request() req: ExpressRequest & { user: { id: string; email: string } },
  ) {
    return this.entidadeService.findMinhasEntidades(Number(req.user.id));
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/membros')
  addMembro(
    @Param('id') id: string,
    @Body() addMembroDto: AddMembroDto,
    @Request() req: ExpressRequest & { user: { id: string; email: string } },
  ) {
    return this.entidadeService.addMembro(
      +id,
      Number(req.user.id),
      addMembroDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/membros/:idPerfil')
  removeMembro(
    @Param('id') id: string,
    @Param('idPerfil') idPerfil: string,
    @Request() req: ExpressRequest & { user: { id: string; email: string } },
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntidadeDto: UpdateEntidadeDto,
  ) {
    return this.entidadeService.update(+id, updateEntidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entidadeService.remove(+id);
  }
}
