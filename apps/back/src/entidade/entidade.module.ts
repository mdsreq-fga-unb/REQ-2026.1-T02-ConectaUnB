import { Module } from '@nestjs/common';
import { EntidadeService } from './entidade.service';
import { EntidadeController } from './entidade.controller';

@Module({
  controllers: [EntidadeController],
  providers: [EntidadeService],
  exports: [EntidadeService],
})
export class EntidadeModule {}
