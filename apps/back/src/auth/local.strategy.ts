import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Perfil } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    username: string,
    password: string,
  ): Promise<Omit<Perfil, 'senha'>> {
    const perfil = await this.authService.validateUser(username, password);
    if (!perfil) {
      throw new UnauthorizedException();
    }
    return perfil;
  }
}
