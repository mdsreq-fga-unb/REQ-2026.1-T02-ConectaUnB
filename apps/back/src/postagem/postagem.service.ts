import { Injectable } from '@nestjs/common';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';

@Injectable()
export class PostagemService {
  create(createPostagemDto: CreatePostagemDto) {
    return 'This action adds a new postagem';
  }

  findAll() {
    return `This action returns all postagem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postagem`;
  }

  update(id: number, updatePostagemDto: UpdatePostagemDto) {
    return `This action updates a #${id} postagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} postagem`;
  }
}
