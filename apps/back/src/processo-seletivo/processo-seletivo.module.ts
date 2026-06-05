import { Module } from '@nestjs/common';
import { ProcessoSeletivoService } from './processo-seletivo.service';
import { ProcessoSeletivoController } from './processo-seletivo.controller';

@Module({
  controllers: [ProcessoSeletivoController],
  providers: [ProcessoSeletivoService],
})
export class ProcessoSeletivoModule {}
