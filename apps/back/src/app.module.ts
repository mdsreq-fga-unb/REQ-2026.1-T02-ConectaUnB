import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './health.controller';
import { PerfilModule } from './perfil/perfil.module';
import { EntidadeModule } from './entidade/entidade.module';
import { ProjetoModule } from './projeto/projeto.module';
import { PostagemModule } from './postagem/postagem.module';
import { ProcessoSeletivoModule } from './processo-seletivo/processo-seletivo.module';
import { NotificacaoModule } from './notificacao/notificacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 20 }),
    PrismaModule,
    AuthModule,
    StorageModule,
    PerfilModule,
    EntidadeModule,
    ProjetoModule,
    PostagemModule,
    ProcessoSeletivoModule,
    NotificacaoModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
