import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProcessoSeletivoService } from './processo-seletivo.service';
import { CreateProcessoSeletivoDto } from './dto/create-processo-seletivo.dto';
import { UpdateProcessoSeletivoDto } from './dto/update-processo-seletivo.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

type AuthenticatedRequest = ExpressRequest & {
  user: { id: string; email: string };
};

@Controller('processo-seletivo')
export class ProcessoSeletivoController {
  constructor(
    private readonly processoSeletivoService: ProcessoSeletivoService,
  ) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProcessoSeletivoDto: CreateProcessoSeletivoDto,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = Number(req.user.id);
    return this.processoSeletivoService.create(createProcessoSeletivoDto, userId);
  }

  @Get()
  findAll() {
    return this.processoSeletivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoSeletivoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcessoSeletivoDto: UpdateProcessoSeletivoDto,
    @Request() req : AuthenticatedRequest
  ) {
    const userId = Number(req.user.id);
    return this.processoSeletivoService.update(+id, updateProcessoSeletivoDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req : AuthenticatedRequest
  ) {
    const userId = Number(req.user.id);
    return this.processoSeletivoService.remove(+id, userId);
  }
}
