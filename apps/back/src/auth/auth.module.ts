import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { PerfilModule } from '../perfil/perfil.module';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    PerfilModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const nodeEnv = configService.get<string>('NODE_ENV');
        if (!secret && nodeEnv === 'production') {
          throw new Error('JWT_SECRET must be defined in production');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '24h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}