import { Test, TestingModule } from '@nestjs/testing';
import { NotificacaoService } from './notificacao.service';
import { PrismaService } from '../prisma/prisma.service';
import { TipoNotificacao } from '@prisma/client';

describe('NotificacaoService', () => {
  let service: NotificacaoService;
  let prisma: PrismaService;

  // Mock completo do Prisma
  const mockPrisma = {
    notificacao: {
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
    perfil: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificacaoService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<NotificacaoService>(NotificacaoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar e retornar uma notificação com sucesso', async () => {
      const createDto = { 
        idEntidade: 1, 
        tipo: TipoNotificacao.PROCESSO_SELETIVO, 
        mensagem: 'Nova notificação', 
        referenciaId: 10 
      };
      
      const mockResult = { id: 1, createdAt: new Date(), ...createDto };
      mockPrisma.notificacao.create.mockResolvedValue(mockResult);

      const result = await service.create(createDto as any);

      expect(prisma.notificacao.create).toHaveBeenCalledWith({ data: createDto });
      expect(result).toEqual(mockResult);
    });
  });

  describe('findAll', () => {
    it('deve lançar erro se o perfil não for encontrado', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue(null);

      await expect(service.findAll(999)).rejects.toThrow('Perfil não encontrado');
      expect(prisma.perfil.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 999 } })
      );
    });

    it('deve retornar array vazio se o perfil não segue nenhuma entidade', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ 
        Seguindo: [] 
      });

      const result = await service.findAll(1);

      expect(result).toEqual([]);
      expect(prisma.notificacao.findMany).not.toHaveBeenCalled();
    });

    it('deve retornar array vazio se nenhuma preferência de notificação estiver ativa', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({
        Seguindo: [{ idEntidade: 1 }],
        PreferenciaNotificacao: {
          processoSeletivo: false,
          atualizacaoProjeto: false,
          atualizacaoPublicacao: false,
        },
      });

      const result = await service.findAll(1);

      expect(result).toEqual([]);
      expect(prisma.notificacao.findMany).not.toHaveBeenCalled();
    });

    it('deve habilitar todos os tipos se PreferenciaNotificacao for nulo (comportamento padrão)', async () => {
      const dataMock = new Date('2026-01-01');
      mockPrisma.perfil.findUnique.mockResolvedValue({
        ultimaLeituraNotificacoes: dataMock,
        Seguindo: [{ idEntidade: 1 }],
        PreferenciaNotificacao: null, // Testando a branch !prefs
      });

      mockPrisma.notificacao.findMany.mockResolvedValue([{ id: 100 }]);

      await service.findAll(1);

      expect(prisma.notificacao.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        where: {
          idEntidade: { in: [1] },
          createdAt: { gt: dataMock },
          tipo: { 
            in: [
              TipoNotificacao.PROCESSO_SELETIVO, 
              TipoNotificacao.ATUALIZACAO_PROJETO, 
              TipoNotificacao.NOVA_PUBLICACAO
            ] 
          },
        },
        include: {
          entidade: { select: { nome: true, linkLogo: true } }
        }
      });
    });

    it('deve filtrar os tipos de notificação conforme as preferências booleanas do usuário', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({
        ultimaLeituraNotificacoes: new Date(),
        Seguindo: [{ idEntidade: 2 }, { idEntidade: 3 }],
        PreferenciaNotificacao: {
          processoSeletivo: true,
          atualizacaoProjeto: false, // Desativado
          atualizacaoPublicacao: true,
        },
      });

      mockPrisma.notificacao.findMany.mockResolvedValue([]);

      await service.findAll(1);

      // Garante que apenas PROCESSO_SELETIVO e NOVA_PUBLICACAO foram passados no "in"
      expect(prisma.notificacao.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            idEntidade: { in: [2, 3] },
            tipo: { 
              in: [TipoNotificacao.PROCESSO_SELETIVO, TipoNotificacao.NOVA_PUBLICACAO] 
            },
          }),
        })
      );
    });
  });

  describe('updateUltimaLeitura', () => {
    it('deve atualizar o perfil com a data atual para ultimaLeituraNotificacoes', async () => {
      mockPrisma.perfil.update.mockResolvedValue({ id: 1 });

      await service.updateUltimaLeitura(1);

      expect(prisma.perfil.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { ultimaLeituraNotificacoes: expect.any(Date) }, // Ignora o valor exato, foca no tipo
      });
    });
  });

  describe('updatePreferencias', () => {
    it('deve realizar o upsert correto das preferências do perfil', async () => {
      const updateDto = {
        processoSeletivo: false,
        atualizacaoProjeto: true,
      };

      mockPrisma.perfil.update.mockResolvedValue({ id: 1 });

      await service.updatePreferencias(1, updateDto);

      expect(prisma.perfil.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          PreferenciaNotificacao: {
            upsert: {
              create: updateDto,
              update: updateDto,
            },
          },
        },
      });
    });
  });

  describe('remove', () => {
    it('deve remover a notificação pelo ID', async () => {
      mockPrisma.notificacao.delete.mockResolvedValue({ id: 99 });

      await service.remove(99);

      expect(prisma.notificacao.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });
});