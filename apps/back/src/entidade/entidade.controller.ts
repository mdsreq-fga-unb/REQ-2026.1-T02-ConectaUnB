import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntidadeService } from './entidade.service';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';

@Controller('entidade')
export class EntidadeController {
  constructor(private readonly entidadeService: EntidadeService) {}

  @Post()
  create(@Body() createEntidadeDto: CreateEntidadeDto) {
    return this.entidadeService.create(createEntidadeDto);
  }

  @Get()
  findAll() {
    return this.entidadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entidadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntidadeDto: UpdateEntidadeDto) {
    return this.entidadeService.update(+id, updateEntidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entidadeService.remove(+id);
  }
}
