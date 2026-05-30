import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly shouldConnect = Boolean(process.env.DATABASE_URL);

  async onModuleInit() {
    if (this.shouldConnect) {
      try {
        await this.$connect();
      } catch (error) {
        console.warn(
          'Prisma connect failed:',
          error instanceof Error ? error.message : error,
        );
      }
    }
  }

  async onModuleDestroy() {
    if (this.shouldConnect) {
      await this.$disconnect();
    }
  }

  enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      void app.close();
    });
  }
}
