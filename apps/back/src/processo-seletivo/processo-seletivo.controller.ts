import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessoSeletivoService } from './processo-seletivo.service';
import { CreateProcessoSeletivoDto } from './dto/create-processo-seletivo.dto';
import { UpdateProcessoSeletivoDto } from './dto/update-processo-seletivo.dto';

@Controller('processo-seletivo')
export class ProcessoSeletivoController {
  constructor(
    private readonly processoSeletivoService: ProcessoSeletivoService,
  ) {}

  @Post()
  create(@Body() createProcessoSeletivoDto: CreateProcessoSeletivoDto) {
    return this.processoSeletivoService.create(createProcessoSeletivoDto);
  }

  @Get()
  findAll() {
    return this.processoSeletivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoSeletivoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcessoSeletivoDto: UpdateProcessoSeletivoDto,
  ) {
    return this.processoSeletivoService.update(+id, updateProcessoSeletivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processoSeletivoService.remove(+id);
  }
}
