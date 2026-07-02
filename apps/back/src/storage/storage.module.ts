import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { R2StorageProvider } from './providers/r2.provider';
import { LocalStorageProvider } from './providers/local.provider';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StorageController],
  providers: [StorageService, R2StorageProvider, LocalStorageProvider],
  exports: [StorageService],
})
export class StorageModule {}
