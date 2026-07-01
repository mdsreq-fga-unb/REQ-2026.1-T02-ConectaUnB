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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostagemService } from './postagem.service';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import { StorageService } from '../storage/storage.service';

@Controller('postagem')
export class PostagemController {
  constructor(
    private readonly postagemService: PostagemService,
    private readonly storage: StorageService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPostagemDto: CreatePostagemDto) {
    const userId = Number(req.user.id);
    return this.postagemService.create(createPostagemDto, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('imagem')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
      required: ['file'],
    },
  })
  async uploadImagem(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) throw new BadRequestException('Arquivo "file" eh obrigatorio.');
    const userId = Number(req.user.id);
    return this.storage.upload(file.buffer, {
      slot: 'postagem',
      ownerId: userId,
    });
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
    @Request() req,
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
