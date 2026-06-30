import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostagemDto } from './dto/create-postagem.dto';
import { UpdatePostagemDto } from './dto/update-postagem.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TipoNotificacao } from '@prisma/client';

@Injectable()
export class PostagemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(_createPostagemDto: CreatePostagemDto, userId: number) {
    const permissao = await this.validateUser(
      userId,
      _createPostagemDto.idEntidade,
    );
    if (!permissao) {
      throw new Error(
        'Usuário não autorizado para criar postagem nesta entidade',
      );
    }

    const postagem = await this.prisma.postagem.create({
      data: _createPostagemDto,
    });

    await this.prisma.notificacao.create({
      data: {
        idEntidade: _createPostagemDto.idEntidade,
        tipo: TipoNotificacao.NOVA_PUBLICACAO,
        mensagem: `Nova postagem: ${_createPostagemDto.titulo}`,
        referenciaId: postagem.id,
      },
    });

    return postagem;
  }

  async findAll() {
    return this.prisma.postagem.findMany();
  }

  async findOne(id: number) {
    return this.prisma.postagem.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    _updatePostagemDto: UpdatePostagemDto,
    userId: number,
  ) {
    const postagem = await this.prisma.postagem.findUnique({
      where: { id },
    });

    if (!postagem) {
      throw new Error('Postagem não encontrada');
    }

    const permissao = await this.validateUser(userId, postagem.idEntidade);
    if (!permissao) {
      throw new Error(
        'Usuário não autorizado para atualizar postagem nesta entidade',
      );
    }

    return this.prisma.postagem.update({
      where: { id },
      data: _updatePostagemDto,
    });
  }

  async remove(id: number, userId: number) {
    const postagem = await this.prisma.postagem.findUnique({
      where: { id },
    });

    if (!postagem) {
      throw new Error('Postagem não encontrada');
    }

    const permissao = await this.validateUser(userId, postagem.idEntidade);
    if (!permissao) {
      throw new Error(
        'Usuário não autorizado para remover postagem nesta entidade',
      );
    }

    return this.prisma.postagem.delete({
      where: { id },
    });
  }

  private async validateUser(Userid: number, EntidadeId: number) {
    
    
    const user = await this.prisma.perfil.findUnique({
      where: { id: Userid },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const entidade = await this.prisma.entidade.findUnique({
      where: { id: EntidadeId },
    });

    if (!entidade) {
      throw new NotFoundException('Entidade não encontrada');
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

    if (
      permissao?.classificacao !== 'GESTOR' &&
      permissao?.classificacao !== 'CO_GESTOR'
    ) {
      throw new ForbiddenException('Usuário não autorizado para esta ação');
    }

    return true;
  }

  async like(id: number, userId: number) {
    return this.prisma.curtidas.create({
      data: {
        idPostagem: id,
        idPerfil: userId,
      },
    });
  }

  async dislike(id: number, userId: number) {
    return this.prisma.curtidas.deleteMany({
      where: {
        idPostagem: id,
        idPerfil: userId,
      },
    });
  }

  async getLikes(id: number, userId: number | null) {
    const numero = await this.prisma.curtidas.count({
      where: { idPostagem: id },
    });

    let usuarioCurtiu = false;

    if (userId) {
      const curtida = await this.prisma.curtidas.findFirst({
        where: {
          idPostagem: id,
          idPerfil: userId,
        },
      });
      usuarioCurtiu = !!curtida;
    }

    return {
      numeroCurtidas: numero,
      usuarioCurtiu: usuarioCurtiu,
    };
  }

  async findPostagensByEntidade(entidadeId: number) {
    return this.prisma.postagem.findMany({
      where: { idEntidade: entidadeId },
    });
  }

}
