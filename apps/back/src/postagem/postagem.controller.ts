import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('postagem')
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request()req, @Body() createPostagemDto: CreatePostagemDto) {
    const userId = Number(req.user.id);
    return this.postagemService.create(createPostagemDto, userId);
  }

  @Get()
  findAll() {
    return this.postagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postagemService.findOne(+id);
  }

  @Get('/entidade/:entidadeId')
  findPostagensByEntidade(@Param('entidadeId') entidadeId: string) {
    return this.postagemService.findPostagensByEntidade(+entidadeId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostagemDto: UpdatePostagemDto,
    @Request() req
  ) {
    const userId = Number(req.user.id);
    return this.postagemService.update(+id, updatePostagemDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = Number(req.user.id);
    return this.postagemService.remove(+id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  like(@Param('id') id: string, @Request() req) {
    const userId = Number(req.user.id);
    return this.postagemService.like(+id, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  Dislike(@Param('id') id: string, @Request() req) {
    const userId = Number(req.user.id);
    return this.postagemService.dislike(+id, userId);
  }

  @Get(':id/likes')
  @UseGuards(OptionalJwtAuthGuard)
  getLikes(@Param('id') id: string, @Request() req) {
    const userId = Number(req.user.id) || null;
    return this.postagemService.getLikes(+id, userId);
  }

}
