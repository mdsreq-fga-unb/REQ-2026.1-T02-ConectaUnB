import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProcessoSeletivoDto } from './dto/create-processo-seletivo.dto';
import { UpdateProcessoSeletivoDto } from './dto/update-processo-seletivo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TipoNotificacao } from '@prisma/client';
import { CronExpression } from '@nestjs/schedule/dist/enums/cron-expression.enum';
import { Cron } from '@nestjs/schedule/dist/decorators/cron.decorator';

@Injectable()
export class ProcessoSeletivoService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'fecharProcessosExpirados',
    timeZone: 'America/Sao_Paulo',
  }) 
  async fecharProcessosExpirados() {
    try {
      const dataAtual = new Date();

      const resultado = await this.prisma.processoSeletivo.updateMany({
        where: {
          fimInscricao: {
            lt: dataAtual,
          },
          classificacao: {
            not: 'FECHADA',
          }
        },
        data: {
          classificacao: 'FECHADA',
        },
      });

      if (resultado.count > 0) {
        console.log(`[Cron] ${resultado.count} processos seletivos foram fechados automaticamente.`);
      }
    } catch (error) {
      console.error('[Cron] Erro ao tentar fechar processos seletivos:', error);
    }
  }

  async create(
    _createProcessoSeletivoDto: CreateProcessoSeletivoDto,
    userId: number,
  ) {
    await this.validateUser(userId, _createProcessoSeletivoDto.idEntidade);

    const { linkInscricao, ...rest } = _createProcessoSeletivoDto as any;

    const processoSeletivo = await this.prisma.processoSeletivo.create({
      data: {
        ...rest,
        linkIncricao: linkInscricao,
      },
    });

    await this.prisma.notificacao.create({
      data: {
        idEntidade: _createProcessoSeletivoDto.idEntidade,
        tipo: TipoNotificacao.PROCESSO_SELETIVO,
        mensagem: `Novo Processo Seletivo aberto: ${_createProcessoSeletivoDto.titulo}`,
        referenciaId: processoSeletivo.id,
      },
    });

    return processoSeletivo;
  }

  async findAll() {
    return await this.prisma.processoSeletivo.findMany();
  }

  async findOne(id: number) {
    const processoSeletivo = await this.prisma.processoSeletivo.findUnique({
      where: { id },
    });
    if (!processoSeletivo) {
      throw new NotFoundException('Processo seletivo não encontrado');
    }
    return processoSeletivo;
  }

  async update(
    id: number,
    _updateProcessoSeletivoDto: UpdateProcessoSeletivoDto,
    userId: number,
  ) {
    const processo = await this.prisma.processoSeletivo.findUnique({
      where: { id },
      select: { idEntidade: true },
    });

    if (!processo) {
      throw new NotFoundException('Processo seletivo não encontrado');
    }

    await this.validateUser(userId, processo.idEntidade);

    return await this.prisma.processoSeletivo.update({
      where: { id },
      data: _updateProcessoSeletivoDto,
    });
  }

  async remove(id: number, userId: number) {
    const processo = await this.prisma.processoSeletivo.findUnique({
      where: { id },
      select: { idEntidade: true },
    });

    if (!processo) {
      throw new NotFoundException('Processo seletivo não encontrado');
    }

    await this.validateUser(userId, processo.idEntidade);

    return await this.prisma.processoSeletivo.delete({
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
}
