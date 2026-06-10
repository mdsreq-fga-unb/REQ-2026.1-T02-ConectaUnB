import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';

@Controller('postagem')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @Post()
  create(@Body() createPostagemDto: CreatePostagemDto) {
    return this.postagemService.create(createPostagemDto);
  }

  @Get()
  findAll() {
    return this.postagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postagemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostagemDto: UpdatePostagemDto) {
    return this.postagemService.update(+id, updatePostagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postagemService.remove(+id);
  }
}
