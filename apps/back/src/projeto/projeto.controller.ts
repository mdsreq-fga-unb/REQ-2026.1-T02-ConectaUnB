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
    return this.projetoService.create(createProjetoDto, Number(req.user.id));
  }

  @Get()
  findAll() {
    return this.projetoService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('minhas')
  findMinhasProjetos(@Request() req: AuthenticatedRequest) {
    return this.projetoService.findMinhasProjetos(Number(req.user.id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projetoService.findOne(+id);
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
    return this.projetoService.remove(+id, Number(req.user.id));
  }
}
