import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClassificacaoMembro, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AddMembroDto } from './dto/add-membro.dto';
import { CreateEntidadeDto } from './dto/create-entidade.dto';
import { UpdateEntidadeDto } from './dto/update-entidade.dto';

@Injectable()
export class EntidadeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEntidadeDto: CreateEntidadeDto, idCriador: number) {
    const { linkLogo, linkBanner, ...rest } = createEntidadeDto;
    
    return this.prisma.entidade.create({
      data: {
        ...rest,
        linkLogo: linkLogo || '/sem_foto.png',
        linkBanner: linkBanner || '/texturaHorizontal.png',
        membros: {
          create: {
            idPerfil: idCriador,
            classificacao: ClassificacaoMembro.GESTOR,
          },
        },
      },
    });
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
    const gestaoSolicitante = await this.findGestaoMembro(
      idEntidade,
      idPerfilSolicitante,
    );

    if (!gestaoSolicitante) {
      throw new ForbiddenException(
        'Apenas gestores ou co-gestores podem gerenciar membros da entidade',
      );
    }

    const isPapelDeGestao =
      addMembroDto.classificacao === ClassificacaoMembro.GESTOR ||
      addMembroDto.classificacao === ClassificacaoMembro.CO_GESTOR;

    if (
      isPapelDeGestao &&
      gestaoSolicitante.classificacao !== ClassificacaoMembro.GESTOR
    ) {
      throw new ForbiddenException(
        'Apenas GESTOR pode atribuir papeis de gestão (GESTOR ou CO_GESTOR)',
      );
    }

    await this.ensurePerfilExists(addMembroDto.idPerfil);

    try {
      return await this.prisma.membro.create({
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
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Perfil já é membro desta entidade');
      }
      throw error;
    }
  }

  async removeMembro(
    idEntidade: number,
    idPerfilSolicitante: number,
    idPerfilRemovido: number,
  ) {
    await this.ensureEntidadeExists(idEntidade);
    const gestaoSolicitante = await this.findGestaoMembro(
      idEntidade,
      idPerfilSolicitante,
    );

    if (!gestaoSolicitante) {
      throw new ForbiddenException(
        'Apenas gestores ou co-gestores podem gerenciar membros da entidade',
      );
    }

    const alvo = await this.prisma.membro.findFirst({
      where: {
        idEntidade,
        idPerfil: idPerfilRemovido,
      },
      select: { id: true, classificacao: true },
    });

    if (!alvo) {
      throw new NotFoundException('Membro não encontrado nesta entidade');
    }

    const solicitanteIsGestor =
      gestaoSolicitante.classificacao === ClassificacaoMembro.GESTOR;

    if (
      alvo.classificacao === ClassificacaoMembro.GESTOR &&
      !solicitanteIsGestor
    ) {
      throw new ForbiddenException(
        'CO_GESTOR não pode remover um GESTOR da entidade',
      );
    }

    if (alvo.classificacao === ClassificacaoMembro.GESTOR) {
      const totalGestores = await this.prisma.membro.count({
        where: {
          idEntidade,
          classificacao: ClassificacaoMembro.GESTOR,
        },
      });

      if (totalGestores <= 1) {
        throw new ConflictException(
          'Não é possível remover o único GESTOR da entidade',
        );
      }
    }

    await this.prisma.membro.delete({
      where: { id: alvo.id },
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
      throw new NotFoundException('Entidade não encontrada');
    }
  }

  private async ensurePerfilExists(idPerfil: number) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id: idPerfil },
      select: { id: true },
    });

    if (!perfil) {
      throw new NotFoundException('Perfil não encontrado');
    }
  }

  private async findGestaoMembro(idEntidade: number, idPerfil: number) {
    return this.prisma.membro.findFirst({
      where: {
        idEntidade,
        idPerfil,
        classificacao: {
          in: [ClassificacaoMembro.GESTOR, ClassificacaoMembro.CO_GESTOR],
        },
      },
      select: { id: true, classificacao: true },
    });
  }
}
