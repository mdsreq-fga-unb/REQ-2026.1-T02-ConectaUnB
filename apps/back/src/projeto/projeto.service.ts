import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ClassificacaoMembro } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';

@Injectable()
export class ProjetoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto, idPerfilSolicitante: number) {
    const membroGestor = await this.prisma.membro.findFirst({
      where: {
        idPerfil: idPerfilSolicitante,
        idEntidade: createProjetoDto.idEntidade,
        classificacao: {
          in: [ClassificacaoMembro.GESTOR, ClassificacaoMembro.CO_GESTOR],
        },
      },
      select: { id: true },
    });

    if (!membroGestor) {
      const entidade = await this.prisma.entidade.findUnique({
        where: { id: createProjetoDto.idEntidade },
        select: { id: true },
      });

      if (!entidade) {
        throw new NotFoundException('Entidade não encontrada');
      }

      throw new ForbiddenException(
        'Apenas gestores ou co-gestores da entidade podem criar projetos',
      );
    }

    return this.prisma.projeto.create({
      data: {
        ...createProjetoDto,
        gerentes: {
          create: {
            idMembro: membroGestor.id,
          },
        },
      },
      include: {
        entidade: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.projeto.findMany({
      orderBy: { nome: 'asc' },
      include: {
        entidade: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async findMinhasProjetos(idPerfil: number) {
    const membros = await this.prisma.membro.findMany({
      where: { idPerfil },
      select: {
        id: true,
        gerenteProjetos: {
          select: {
            projeto: {
              include: {
                entidade: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
        colaboradorProjetos: {
          select: {
            projeto: {
              include: {
                entidade: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const projetos = new Map<number, Record<string, unknown>>();

    for (const membro of membros) {
      for (const vinculo of membro.gerenteProjetos) {
        projetos.set(vinculo.projeto.id, {
          ...vinculo.projeto,
          vinculoProjeto: 'GERENTE',
        });
      }

      for (const vinculo of membro.colaboradorProjetos) {
        if (!projetos.has(vinculo.projeto.id)) {
          projetos.set(vinculo.projeto.id, {
            ...vinculo.projeto,
            vinculoProjeto: 'COLABORADOR',
          });
        }
      }
    }

    return Array.from(projetos.values()).sort((a, b) =>
      String(a.nome).localeCompare(String(b.nome)),
    );
  }

  findOne(id: number) {
    return this.prisma.projeto.findUnique({
      where: { id },
      include: {
        entidade: {
          select: {
            id: true,
            nome: true,
          },
        },
        gerentes: {
          include: {
            membro: {
              include: {
                perfil: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        colaboradores: {
          include: {
            membro: {
              include: {
                perfil: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(
    id: number,
    idPerfilSolicitante: number,
    updateProjetoDto: UpdateProjetoDto,
  ) {
    await this.ensureProjetoGerenciadoPorPerfil(id, idPerfilSolicitante);

    return this.prisma.projeto.update({
      where: { id },
      data: updateProjetoDto,
    });
  }

  async remove(id: number, idPerfilSolicitante: number) {
    await this.ensureProjetoGerenciadoPorPerfil(id, idPerfilSolicitante);

    return this.prisma.projeto.delete({ where: { id } });
  }

  private async ensureProjetoGerenciadoPorPerfil(
    idProjeto: number,
    idPerfil: number,
  ) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id: idProjeto },
      select: { id: true },
    });

    if (!projeto) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const gerente = await this.prisma.gerentesProjetos.findFirst({
      where: {
        idProjeto,
        membro: { idPerfil },
      },
      select: { idProjeto: true },
    });

    if (!gerente) {
      throw new ForbiddenException(
        'Apenas gerentes do projeto podem editar ou excluir o projeto',
      );
    }
  }
}
