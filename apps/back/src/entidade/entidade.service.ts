import { Injectable } from '@nestjs/common';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';

@Injectable()
export class EntidadeService {
  create(_createEntidadeDto: CreateEntidadeDto) {
    return 'This action adds a new entidade';
  }

  findAll() {
    return `This action returns all entidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entidade`;
  }

  update(id: number, _updateEntidadeDto: UpdateEntidadeDto) {
    return `This action updates a #${id} entidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} entidade`;
  }
}
