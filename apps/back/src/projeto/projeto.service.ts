import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ClassificacaoMembro } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { TipoNotificacao } from '@prisma/client';
import { AddMembroProjetoDto } from './dto/add-membro-projeto.dto';
import { UpdateMembroProjetoDto } from './dto/update-membro-projeto.dto';

@Injectable()
export class ProjetoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto, idPerfilSolicitante: number) {
    
    await this.validateUser(idPerfilSolicitante, createProjetoDto.idEntidade);

    const projeto = await this.prisma.projeto.create({
      data: {
        ...createProjetoDto,
        gerentes: {
          create: {
            idMembro: idPerfilSolicitante,
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

    await this.prisma.notificacao.create({
      data: {
        idEntidade: createProjetoDto.idEntidade,
        tipo: TipoNotificacao.ATUALIZACAO_PROJETO,
        mensagem: `Novo Projeto Criado: ${createProjetoDto.nome}`,
        referenciaId: projeto.id
      },
    });

    return projeto;

  }

  async findProjetosEntidade(idEntidade: number) {
    
    const projetos = await this.prisma.projeto.findMany({
      where: { idEntidade },
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

    return projetos;
  }

  async findOne(id: number) {

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

  async remove(id: number, idPerfilSolicitante: number) {

    await this.podeEditarProjeto(id, idPerfilSolicitante);

    const idEntidade = (await this.prisma.projeto.findUnique({
      where: { id },
      select: { idEntidade: true },
    }))?.idEntidade;

    if (!idEntidade) {
      throw new NotFoundException('Projeto não encontrado');
    }
    
    await this.validateUser(idPerfilSolicitante, idEntidade);

    return this.prisma.projeto.delete({ where: { id } });
  }

  async update(
    id: number,
    idPerfilSolicitante: number,
    updateProjetoDto: UpdateProjetoDto,
  ) {

    await this.podeEditarProjeto(id, idPerfilSolicitante);

    return this.prisma.projeto.update({
      where: { id },
      data: updateProjetoDto,
    });
  }

  async addMembro(idProjeto: number, idPerfilSolicitante: number, addMembroProjetoDto: AddMembroProjetoDto) {

    await this.podeEditarProjeto(idProjeto, idPerfilSolicitante);

    const idPerfilNovoMembro = (await this.prisma.perfil.findUnique({
      where: { email: addMembroProjetoDto.email },
      select: { id: true },
    }))?.id;

    if (!idPerfilNovoMembro) {
      throw new NotFoundException('Perfil do novo membro não encontrado');
    }

    const novoMembro = await this.prisma.membro.findFirst({
      where: {
        idPerfil: idPerfilNovoMembro,
        idEntidade: (await this.prisma.projeto.findUnique({
          where: { id: idProjeto },
          select: { idEntidade: true },
        }))?.idEntidade,
      },
    });

    if (!novoMembro) {
      throw new NotFoundException('Membro não encontrado na entidade do projeto');
    }

    const classificacao = addMembroProjetoDto.papel === 'GERENTE' ? 'GERENTE' : 'COLABORADOR';

    const existe = await this.prisma.gerentesProjetos.findFirst({
      where: {
        idProjeto,
        idMembro: novoMembro.id,
      },
    });

    if (existe) {
      throw new ForbiddenException('Membro já é gerente deste projeto');
    }

    const existeColaborador = await this.prisma.colaboradoresProjetos.findFirst({
      where: {
        idProjeto,
        idMembro: novoMembro.id,
      },
    });

    if (existeColaborador) {
      throw new ForbiddenException('Membro já é colaborador deste projeto');
    }

    if (classificacao === 'GERENTE') {
      return await this.prisma.gerentesProjetos.create({
        data: {
          idProjeto,
          idMembro: novoMembro.id,
        },
      });
    } else {
      return await this.prisma.colaboradoresProjetos.create({
        data: {
          idProjeto,
          idMembro: novoMembro.id,
        },
      });
    }
  }

  async removeMembro(idProjeto: number, idPerfilSolicitante: number, idPerfilMembro: number) {

    await this.podeEditarProjeto(idProjeto, idPerfilSolicitante);

    const membro = await this.prisma.membro.findFirst({
      where: {
        idPerfil: idPerfilMembro,
        idEntidade: (await this.prisma.projeto.findUnique({
          where: { id: idProjeto },
          select: { idEntidade: true },
        }))?.idEntidade,
      },
    });

    if (!membro) {
      throw new NotFoundException('Membro não encontrado na entidade do projeto');
    }

    await this.prisma.colaboradoresProjetos.deleteMany({ where: { idProjeto, idMembro: membro.id } });
    
    return this.prisma.gerentesProjetos.deleteMany({ where: { idProjeto, idMembro: membro.id } });

  }

  async updateMembro(idProjeto: number, idPerfilSolicitante: number, idPerfilAlterado: number, updateMembroProjetoDto: UpdateMembroProjetoDto) {

    await this.podeEditarProjeto(idProjeto, idPerfilSolicitante);

    const membro = await this.prisma.membro.findFirst({
      where: {
        idPerfil: idPerfilAlterado,
        idEntidade: (await this.prisma.projeto.findUnique({
          where: { id: idProjeto },
          select: { idEntidade: true },
        }))?.idEntidade,
      },
    });

    if (!membro) {
      throw new NotFoundException('Membro não encontrado na entidade do projeto');
    }

    if (updateMembroProjetoDto.papel === 'GERENTE') {
      
      await this.prisma.colaboradoresProjetos.deleteMany({
        where: {
          idProjeto,
          idMembro: membro.id,
        },
      });

      return await this.prisma.gerentesProjetos.upsert({
        where: {
          idProjeto_idMembro: {
            idProjeto,
            idMembro: membro.id,
          },
        },
        update: {},
        create: {
          idProjeto,
          idMembro: membro.id,
        },
      });

    } else {
      
      await this.prisma.gerentesProjetos.deleteMany({
        where: {
          idProjeto,
          idMembro: membro.id,
        },
      });

      return await this.prisma.colaboradoresProjetos.upsert({
        where: {
          idProjeto_idMembro: {
            idProjeto,
            idMembro: membro.id,
          },
        },
        update: {},
        create: {
          idProjeto,
          idMembro: membro.id,
        },
      });
    }
  }

  private async podeEditarProjeto(
    idProjeto: number,
    idPerfil: number,
  ) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id: idProjeto },
      select: { id: true, idEntidade: true },
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

    const Gestor = await this.prisma.membro.findFirst({
      where: {
        idPerfil,
        idEntidade: projeto.idEntidade,
        classificacao: { in: [ClassificacaoMembro.GESTOR, ClassificacaoMembro.CO_GESTOR] },
      },
      select: { id: true },
    });

    if (!gerente && !Gestor) {
      throw new ForbiddenException(
        'Apenas gerentes do projeto ou gestores/co-gestores da entidade podem editar ou excluir o projeto',
      );
    }
  }

  private async validateUser(Userid: number, EntidadeId: number) {
    const user = await this.prisma.perfil.findUnique({
      where: { id: Userid },
    });

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const entidade = await this.prisma.entidade.findUnique({
      where: { id: EntidadeId },
    });

    if (!entidade) {
      throw new NotFoundException("Entidade não encontrada");
    }

    const permissao = await this.prisma.membro.findFirst({
      where: {
        idPerfil: Userid,
        idEntidade: EntidadeId,
      },
      select: {
        classificacao: true,
      },
    });

    if (permissao?.classificacao !== 'GESTOR' && permissao?.classificacao !== 'CO_GESTOR') {
      throw new ForbiddenException("Usuário não autorizado para esta ação");
    }

    return true;
  }
}
