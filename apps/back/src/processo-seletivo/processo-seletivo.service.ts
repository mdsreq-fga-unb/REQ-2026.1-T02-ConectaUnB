import { Injectable } from '@nestjs/common';
import { CreateProcessoSeletivoDto } from './dto/create-processo-seletivo.dto';
import { UpdateProcessoSeletivoDto } from './dto/update-processo-seletivo.dto';

@Injectable()
export class ProcessoSeletivoService {
  create(_createProcessoSeletivoDto: CreateProcessoSeletivoDto) {
    return 'This action adds a new processoSeletivo';
  }

  findAll() {
    return `This action returns all processoSeletivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} processoSeletivo`;
  }

  update(id: number, _updateProcessoSeletivoDto: UpdateProcessoSeletivoDto) {
    return `This action updates a #${id} processoSeletivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} processoSeletivo`;
  }
}
