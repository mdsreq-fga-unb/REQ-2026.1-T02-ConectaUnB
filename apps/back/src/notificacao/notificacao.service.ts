import { Injectable } from '@nestjs/common';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TipoNotificacao } from '@prisma/client';

@Injectable()
export class NotificacaoService {
  constructor(private readonly prisma: PrismaService) {}

  create(_createNotificacaoDto: CreateNotificacaoDto) {
    return 'This action adds a new notificacao';
  }

  async findAll(idPerfil: number) {

    const perfil = await this.prisma.perfil.findUnique({
      where: { id: idPerfil },
      select: { 
        ultimaLeituraNotificacoes: true,
        PreferenciaNotificacao: true,
        Seguindo: {
          select: { idEntidade: true }
        }
      },
    });

    if (!perfil) {
      throw new Error("Perfil não encontrado");
    }

    const entidadesSeguidasIds = perfil.Seguindo.map((s) => s.idEntidade);

    if (entidadesSeguidasIds.length === 0) {
      return [];
    }

const tiposPermitidos: TipoNotificacao[] = []
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
            linkLogo: true
          }
        }
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} notificacao`;
  }
}