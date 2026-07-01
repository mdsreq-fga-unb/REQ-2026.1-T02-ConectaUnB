import { Module } from '@nestjs/common';
import { PostagemService } from './postagem.service';
import { PostagemController } from './postagem.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [PostagemController],
  providers: [PostagemService],
  exports: [PostagemService],
})
export class PostagemModule {}
