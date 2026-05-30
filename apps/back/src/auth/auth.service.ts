import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await (this.prisma as any).user.findUnique({
      where: { email },
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles ?? [],
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(data: { email: string; password: string; name?: string }) {
    const existing = await (this.prisma as any).user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashed = await bcrypt.hash(data.password, saltRounds);
    const created = await (this.prisma as any).user.create({
      data: { email: data.email, password: hashed, name: data.name },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = created;
    return result;
  }
}
