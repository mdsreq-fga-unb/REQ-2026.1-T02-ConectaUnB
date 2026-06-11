import { ConflictException, Injectable } from '@nestjs/common';
import { PerfilService } from '../perfil/perfil.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Cargo, Campus, Curso, Departamento, Perfil } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private perfilService: PerfilService,
    private jwtService: JwtService,
  ) {}

  async register(data: {
    email: string;
    password: string;
    name: string;
    cargo: Cargo;
    matricula?: number;
    curso: Curso;
    departamento: Departamento;
    campus: Campus;
  }) {
    const existing = await this.perfilService.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('Perfil already exists');
    }

    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashed = await bcrypt.hash(data.password, saltRounds);
    const perfil = await this.perfilService.create({
      email: data.email,
      senha: hashed,
      name: data.name,
      cargo: data.cargo,
      matricula: data.matricula,
      curso: data.curso,
      departamento: data.departamento,
      campus: data.campus,
    });

    return {
      id: perfil.id,
      email: perfil.email,
      name: perfil.name,
      cargo: perfil.cargo,
      matricula: perfil.matricula,
      curso: perfil.curso,
    };
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<Perfil, 'senha'> | null> {
    const perfil = await this.perfilService.findByEmail(email);
    if (!perfil) return null;

    const match = await bcrypt.compare(pass, perfil.senha);
    if (!match) return null;

    const { senha: _, ...rest } = perfil;
    return rest;
  }

  login(user: Pick<Perfil, 'id' | 'email'>) {
    const payload = { sub: String(user.id), email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
