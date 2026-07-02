import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { ProjetoController } from './projeto.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [ProjetoController],
  providers: [ProjetoService],
  exports: [ProjetoService],
})
export class ProjetoModule {}
