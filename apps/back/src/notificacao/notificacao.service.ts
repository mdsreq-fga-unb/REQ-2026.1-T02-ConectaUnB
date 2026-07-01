import { Injectable } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TipoNotificacao } from '@prisma/client';
import { UpdatePreferenciasDto } from './dto/update-preferencias.dto';

@Injectable()
export class NotificacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(_createNotificacaoDto: CreateNotificacaoDto) {
    return this.prisma.notificacao.create({
      data: _createNotificacaoDto,
    });
  }

  async findAll(idPerfil: number) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id: idPerfil },
      select: {
        ultimaLeituraNotificacoes: true,
        PreferenciaNotificacao: true,
        Seguindo: {
          select: { idEntidade: true },
        },
      },
    });

    if (!perfil) {
      throw new Error('Perfil não encontrado');
    }

    const entidadesSeguidasIds = perfil.Seguindo.map((s) => s.idEntidade);

    if (entidadesSeguidasIds.length === 0) {
      return [];
    }

    const tiposPermitidos: TipoNotificacao[] = [];
    const prefs = perfil.PreferenciaNotificacao;

    if (!prefs || prefs.processoSeletivo) {
      tiposPermitidos.push(TipoNotificacao.PROCESSO_SELETIVO);
    }
    if (!prefs || prefs.atualizacaoProjeto) {
      tiposPermitidos.push(TipoNotificacao.ATUALIZACAO_PROJETO);
    }
    if (!prefs || prefs.atualizacaoPublicacao) {
      tiposPermitidos.push(TipoNotificacao.NOVA_PUBLICACAO);
    }

    if (tiposPermitidos.length === 0) {
      return [];
    }

    return this.prisma.notificacao.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        idEntidade: { in: entidadesSeguidasIds },
        createdAt: { gt: perfil.ultimaLeituraNotificacoes },
        tipo: { in: tiposPermitidos as any },
      },
      include: {
        entidade: {
          select: {
            nome: true,
            linkLogo: true,
          },
        },
      },
    });
  }

  async updateUltimaLeitura(idPerfil: number) {
    return this.prisma.perfil.update({
      where: { id: idPerfil },
      data: { ultimaLeituraNotificacoes: new Date() },
    });
  }

  async updatePreferencias(
    idPerfil: number,
    preferencias: UpdatePreferenciasDto,
  ) {
    return this.prisma.perfil.update({
      where: { id: idPerfil },
      data: {
        PreferenciaNotificacao: {
          upsert: {
            create: preferencias,
            update: preferencias,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.notificacao.delete({
      where: { id },
    });
  }
}
