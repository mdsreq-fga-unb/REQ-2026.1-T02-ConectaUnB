import { Module } from '@nestjs/common';
import { EntidadeService } from './entidade.service';
import { EntidadeController } from './entidade.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [EntidadeController],
  providers: [EntidadeService],
  exports: [EntidadeService],
})
export class EntidadeModule {}
