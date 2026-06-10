import { Injectable } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';

@Injectable()
export class NotificacaoService {
  create(_createNotificacaoDto: CreateNotificacaoDto) {
    return 'This action adds a new notificacao';
  }

  findAll() {
    return `This action returns all notificacao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificacao`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificacao`;
  }
}
