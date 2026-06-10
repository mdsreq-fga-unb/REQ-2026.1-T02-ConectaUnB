import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Prisma, Perfil } from '@prisma/client';

@Injectable()
export class PerfilService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.perfil.findMany();
  }

  findOne(id: number) {
    return this.prisma.perfil.findUnique({ where: { id } });
  }

  update(id: number, updatePerfilDto: UpdatePerfilDto) {
    return this.prisma.perfil.update({
      where: { id },
      data: updatePerfilDto,
    });
  }

  remove(id: number) {
    return this.prisma.perfil.delete({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.perfil.findUnique({ where: { email } });
  }

  async create(data: Prisma.PerfilCreateInput): Promise<Perfil> {
    return this.prisma.perfil.create({ data });
  }
}
