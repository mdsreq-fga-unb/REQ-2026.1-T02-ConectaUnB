import { Module } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { PostagemController } from './postagem.controller';

@Module({
  controllers: [PostagemController],
  providers: [PostagemService],
  exports: [PostagemService],
})
export class PostagemModule {}
