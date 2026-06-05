import { Injectable } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Injectable()
export class NotificacaoService {
  create(createNotificacaoDto: CreateNotificacaoDto) {
    return 'This action adds a new notificacao';
  }

  findAll() {
    return `This action returns all notificacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacao`;
  }

  update(id: number, updateNotificacaoDto: UpdateNotificacaoDto) {
    return `This action updates a #${id} notificacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacao`;
  }
}
