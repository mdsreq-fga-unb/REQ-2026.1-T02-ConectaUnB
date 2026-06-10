import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';

@Controller('notificacao')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  @Post()
  create(@Body() createNotificacaoDto: CreateNotificacaoDto) {
    return this.notificacaoService.create(createNotificacaoDto);
  }

  @Get()
  findAll() {
    return this.notificacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacaoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacaoService.remove(+id);
  }
}
