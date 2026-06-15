import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClassificacaoMembro } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AddMembroDto } from './dto/add-membro.dto';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';

@Injectable()
export class EntidadeService {
  constructor(private prisma: PrismaService) {}

  create(createEntidadeDto: CreateEntidadeDto) {
    return this.prisma.entidade.create({ data: createEntidadeDto });
  }

  findAll() {
    return this.prisma.entidade.findMany();
  }

  async findMinhasEntidades(idPerfil: number) {
    const vinculos = await this.prisma.membro.findMany({
      where: { idPerfil },
      orderBy: { entidade: { nome: 'asc' } },
      select: {
        id: true,
        classificacao: true,
        createdAt: true,
        entidade: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            classificacao: true,
            campus: true,
            departamento: true,
            linkBanner: true,
            linkLogo: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return vinculos.map(({ entidade, ...membro }) => ({
      ...entidade,
      vinculo: membro,
    }));
  }

  findOne(id: number) {
    return this.prisma.entidade.findUnique({ where: { id } });
  }

  update(id: number, updateEntidadeDto: UpdateEntidadeDto) {
    return this.prisma.entidade.update({
      where: { id },
      data: updateEntidadeDto,
    });
  }

  remove(id: number) {
    return this.prisma.entidade.delete({ where: { id } });
  }

  async addMembro(
    idEntidade: number,
    idPerfilSolicitante: number,
    addMembroDto: AddMembroDto,
  ) {
    await this.ensureEntidadeExists(idEntidade);
    await this.ensureCanManageEntidade(idEntidade, idPerfilSolicitante);
    await this.ensurePerfilExists(addMembroDto.idPerfil);

    const membroExistente = await this.prisma.membro.findFirst({
      where: {
        idEntidade,
        idPerfil: addMembroDto.idPerfil,
      },
    });

    if (membroExistente) {
      throw new ConflictException('Perfil ja e membro desta entidade');
    }

    return this.prisma.membro.create({
      data: {
        idEntidade,
        idPerfil: addMembroDto.idPerfil,
        classificacao: addMembroDto.classificacao,
      },
      include: {
        perfil: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        entidade: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async removeMembro(
    idEntidade: number,
    idPerfilSolicitante: number,
    idPerfilRemovido: number,
  ) {
    await this.ensureEntidadeExists(idEntidade);
    await this.ensureCanManageEntidade(idEntidade, idPerfilSolicitante);

    const membro = await this.prisma.membro.findFirst({
      where: {
        idEntidade,
        idPerfil: idPerfilRemovido,
      },
    });

    if (!membro) {
      throw new NotFoundException('Membro nao encontrado nesta entidade');
    }

    await this.prisma.membro.deleteMany({
      where: {
        idEntidade,
        idPerfil: idPerfilRemovido,
      },
    });

    return {
      idEntidade,
      idPerfil: idPerfilRemovido,
      removed: true,
    };
  }

  private async ensureEntidadeExists(idEntidade: number) {
    const entidade = await this.prisma.entidade.findUnique({
      where: { id: idEntidade },
      select: { id: true },
    });

    if (!entidade) {
      throw new NotFoundException('Entidade nao encontrada');
    }
  }

  private async ensurePerfilExists(idPerfil: number) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id: idPerfil },
      select: { id: true },
    });

    if (!perfil) {
      throw new NotFoundException('Perfil nao encontrado');
    }
  }

  private async ensureCanManageEntidade(idEntidade: number, idPerfil: number) {
    const membroGestor = await this.prisma.membro.findFirst({
      where: {
        idEntidade,
        idPerfil,
        classificacao: {
          in: [ClassificacaoMembro.GESTOR, ClassificacaoMembro.CO_GESTOR],
        },
      },
    });

    if (!membroGestor) {
      throw new ForbiddenException(
        'Apenas gestores ou co-gestores podem gerenciar membros da entidade',
      );
    }
  }
}
