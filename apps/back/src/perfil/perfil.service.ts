import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Prisma, Perfil } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

const perfilSelectPublico = {
  id: true,
  name: true,
  email: true,
  matricula: true,
  curso: true,
  campus: true,
  cargo: true,
  departamento: true,
  createdAt: true,
};

@Injectable()
export class PerfilService {
  constructor(private prisma: PrismaService) {}

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
        where: { id } 
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

  async create(data: Prisma.PerfilCreateInput): Promise<Perfil> {
    return this.prisma.perfil.create({ data });
  }
}
