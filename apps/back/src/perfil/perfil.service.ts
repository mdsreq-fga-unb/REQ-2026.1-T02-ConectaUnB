import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Prisma, Perfil } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const perfilSelectPublico = {
  id: true,
  name: true,
  email: true,
  matricula: true,
  curso: true,
  campus: true,
  cargo: true,
  departamento: true,
  linkFoto: true,
  createdAt: true,
  PreferenciaNotificacao: true,
};

@Injectable()
export class PerfilService {
  constructor(
    private prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async findAll() {
    return this.prisma.perfil.findMany({
      select: perfilSelectPublico,
    });
  }

  async findOne(id: number) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id },
      select: perfilSelectPublico,
    });
    if (!perfil) {
      throw new NotFoundException(`Perfil não encontrado.`);
    }

    return perfil;
  }

  async update(id: number, updatePerfilDto: UpdatePerfilDto) {
    try {
      return await this.prisma.perfil.update({
        where: { id },
        data: updatePerfilDto,
        select: perfilSelectPublico,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Perfil não encontrado para atualização.`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.perfil.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Perfil não encontrado para exclusão.`);
      }
      throw error;
    }
  }

  async findSeguindo(id: number) {
    const seguindo = await this.prisma.seguindo.findMany({
      where: { idPerfil: id },
      include: { entidade: true },
    });
    return seguindo.map((s) => s.entidade);
  }

  async findByEmail(email: string) {
    return this.prisma.perfil.findUnique({ where: { email } });
  }

  async setFoto(id: number, url: string) {
    try {
      return await this.prisma.perfil.update({
        where: { id },
        data: { linkFoto: url },
        select: perfilSelectPublico,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Perfil nao encontrado.`);
      }
      throw error;
    }
  }

  async create(data: Prisma.PerfilCreateInput): Promise<Perfil> {
    return this.prisma.perfil.create({ data });
  }

  async seguir(idEntidade: number, idUsuario: number) {
    const jaSeguindo = await this.prisma.seguindo.findFirst({
      where: {
        idPerfil: idUsuario,
        idEntidade: idEntidade,
      },
    });

    if (jaSeguindo) {
      await this.prisma.seguindo.delete({
        where: {
          idPerfil_idEntidade: {
            idPerfil: idUsuario,
            idEntidade: idEntidade,
          },
        },
      });
      return { message: 'Deixou de seguir a entidade.' };
    } else {
      await this.prisma.seguindo.create({
        data: {
          idPerfil: idUsuario,
          idEntidade: idEntidade,
        },
      });
      return { message: 'Seguiu a entidade com sucesso.' };
    }
  }

  async updateSenha(id: number, senhaDto: { senha: string }) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
    const hashed = await bcrypt.hash(senhaDto.senha, saltRounds);

    try {
      return await this.prisma.perfil.update({
        where: { id },
        data: { senha: hashed },
        select: perfilSelectPublico,
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Perfil não encontrado para atualização de senha.`,
        );
      }
      throw error;
    }
  }
}
