import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClassificacaoMembro, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';
import { AddMembroDto } from './dto/add-membro.dto';
import { UpdateMembroDto } from './dto/update-membro.dto';

const entidadeSelect = {
  id: true,
  nome: true,
  descricao: true,
  classificacao: true,
  campus: true,
  departamento: true,
  linkLogo: true,
  linkBanner: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.EntidadeSelect;

@Injectable()
export class EntidadeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async create(dto: CreateEntidadeDto, idCriador: number) {
    const entidade = await this.prisma.entidade.create({
      data: {
        nome: dto.nome,
        descricao: dto.descricao,
        classificacao: dto.classificacao,
        campus: dto.campus,
        departamento: dto.departamento,
        linkLogo: dto.linkLogo,
        linkBanner: dto.linkBanner,
        membros: {
          create: {
            idPerfil: idCriador,
            classificacao: ClassificacaoMembro.GESTOR,
          },
        },
      },
      select: entidadeSelect,
    });
    return entidade;
  }

  findAll() {
    return this.prisma.entidade.findMany({
      select: entidadeSelect,
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: number) {
    const entidade = await this.prisma.entidade.findUnique({
      where: { id },
      select: {
        ...entidadeSelect,
        membros: {
          select: {
            id: true,
            idPerfil: true,
            classificacao: true,
            perfil: {
              select: { id: true, name: true, email: true, linkFoto: true },
            },
          },
        },
        _count: { select: { seguidores: true } },
      },
    });
    if (!entidade) throw new NotFoundException('Entidade nao encontrada.');
    return entidade;
  }

  async update(id: number, idSolicitante: number, dto: UpdateEntidadeDto) {
    await this.assertCanManage(id, idSolicitante);
    try {
      return await this.prisma.entidade.update({
        where: { id },
        data: {
          nome: dto.nome,
          descricao: dto.descricao,
          classificacao: dto.classificacao,
          campus: dto.campus,
          departamento: dto.departamento,
          linkLogo: dto.linkLogo,
          linkBanner: dto.linkBanner,
        },
        select: entidadeSelect,
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(
          'Entidade nao encontrada para atualizacao.',
        );
      }
      throw err;
    }
  }

  async remove(id: number, idSolicitante: number) {
    await this.assertCanManage(id, idSolicitante, { gestorOnly: true });
    try {
      return await this.prisma.entidade.delete({
        where: { id },
        select: { id: true },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('Entidade nao encontrada para exclusao.');
      }
      throw err;
    }
  }

  async search(nome: string) {
    return this.prisma.entidade.findMany({
      where: {
        nome: { contains: nome, mode: 'insensitive' },
      },
      select: {
        id: true,
        nome: true,
        classificacao: true,
        campus: true,
        linkLogo: true,
      },
      orderBy: { nome: 'asc' },
    });
  }

  async findMinhasEntidades(idPerfil: number) {
    const membros = await this.prisma.membro.findMany({
      where: { idPerfil },
      include: {
        entidade: { select: entidadeSelect },
      },
    });
    return membros.map((m) => ({
      ...m.entidade,
      vinculo: { classificacao: m.classificacao, idMembro: m.id },
    }));
  }

  async addMembro(
    idEntidade: number,
    idSolicitante: number,
    dto: AddMembroDto,
  ) {
    await this.assertCanManage(idEntidade, idSolicitante);

    const perfil = await this.prisma.perfil.findUnique({
      where: { email: dto.email },
      select: { id: true },
    });
    if (!perfil)
      throw new NotFoundException('Perfil do novo membro nao encontrado.');

    const exists = await this.prisma.membro.findUnique({
      where: { idPerfil_idEntidade: { idPerfil: perfil.id, idEntidade } },
    });
    if (exists)
      throw new ConflictException('Perfil ja eh membro desta entidade.');

    return this.prisma.membro.create({
      data: {
        idPerfil: perfil.id,
        idEntidade,
        classificacao: dto.classificacao,
      },
    });
  }

  async removeMembro(
    idEntidade: number,
    idSolicitante: number,
    idPerfilAlvo: number,
  ) {
    await this.assertCanManage(idEntidade, idSolicitante);
    if (idPerfilAlvo === idSolicitante) {
      throw new ForbiddenException(
        'Use a rota de saida para remover a si proprio.',
      );
    }
    try {
      return await this.prisma.membro.delete({
        where: { idPerfil_idEntidade: { idPerfil: idPerfilAlvo, idEntidade } },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('Membro nao encontrado nesta entidade.');
      }
      throw err;
    }
  }

  async updateMembro(
    idEntidade: number,
    idSolicitante: number,
    idPerfilAlvo: number,
    dto: UpdateMembroDto,
  ) {
    await this.assertCanManage(idEntidade, idSolicitante);
    try {
      return await this.prisma.membro.update({
        where: { idPerfil_idEntidade: { idPerfil: idPerfilAlvo, idEntidade } },
        data: { classificacao: dto.classificacao },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('Membro nao encontrado nesta entidade.');
      }
      throw err;
    }
  }

  /**
   * Define logo (single slot). Substitui a anterior e limpa do storage.
   */
  async setLogo(id: number, idSolicitante: number, url: string) {
    await this.assertCanManage(id, idSolicitante);
    return this.prisma.entidade.update({
      where: { id },
      data: { linkLogo: url },
      select: { id: true, linkLogo: true },
    });
  }

  async setBanner(id: number, idSolicitante: number, url: string) {
    await this.assertCanManage(id, idSolicitante);
    return this.prisma.entidade.update({
      where: { id },
      data: { linkBanner: url },
      select: { id: true, linkBanner: true },
    });
  }

  async seguir(idEntidade: number, idPerfil: number) {
    await this.prisma.seguindo.create({
      data: { idPerfil, idEntidade },
    });
    return { seguindo: true };
  }

  async unfollow(idEntidade: number, idPerfil: number) {
    await this.prisma.seguindo.delete({
      where: { idPerfil_idEntidade: { idPerfil, idEntidade } },
    });
    return { seguindo: false };
  }

  private async assertCanManage(
    idEntidade: number,
    idPerfil: number,
    opts: { gestorOnly?: boolean } = {},
  ) {
    const membro = await this.prisma.membro.findUnique({
      where: { idPerfil_idEntidade: { idPerfil, idEntidade } },
      select: { classificacao: true },
    });
    if (!membro) {
      throw new ForbiddenException('Voce nao eh membro desta entidade.');
    }
    const permitido = opts.gestorOnly
      ? membro.classificacao === ClassificacaoMembro.GESTOR
      : membro.classificacao === ClassificacaoMembro.GESTOR ||
        membro.classificacao === ClassificacaoMembro.CO_GESTOR;
    if (!permitido) {
      throw new ForbiddenException(
        'Apenas Gestor' +
          (opts.gestorOnly ? '' : ' ou Co-gestor') +
          ' pode realizar esta acao.',
      );
    }
  }
}
