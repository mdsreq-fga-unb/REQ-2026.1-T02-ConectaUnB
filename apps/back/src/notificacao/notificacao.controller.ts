import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notificacao')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  @Post()
  create(@Body() createNotificacaoDto: CreateNotificacaoDto) {
    return this.notificacaoService.create(createNotificacaoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    const idPerfil = Number(req.user.id);
    return this.notificacaoService.findAll(idPerfil);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  updateUltimaLeitura(@Request() req) {
    const idPerfil = Number(req.user.id);
    return this.notificacaoService.updateUltimaLeitura(idPerfil);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/preferencias')
  updatePreferencias(
    @Request() req,
    @Body() preferencias: UpdatePreferenciasDto,
  ) {
    const idPerfil = Number(req.user.id);
    return this.notificacaoService.updatePreferencias(idPerfil, preferencias);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacaoService.remove(+id);
  }
}
