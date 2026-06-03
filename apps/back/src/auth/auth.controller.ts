import { Request as ExpressRequest } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register({
      email: dto.email,
      password: dto.password,
      name: dto.name,
      cargo: dto.cargo,
      matricula: dto.matricula,
      curso: dto.curso,
    });
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Request() req: ExpressRequest & { user: { id: string; email: string } }) {
    return req.user;
  }
}
