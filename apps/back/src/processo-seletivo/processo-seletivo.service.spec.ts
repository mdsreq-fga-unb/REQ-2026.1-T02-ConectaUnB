import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoSeletivoService } from './processo-seletivo.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { TipoNotificacao } from '@prisma/client';

describe('ProcessoSeletivoService', () => {
  let service: ProcessoSeletivoService;

  const mockPrisma = {
    processoSeletivo: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    notificacao: {
      create: jest.fn(),
    },
    perfil: { findUnique: jest.fn() },
    entidade: { findUnique: jest.fn() },
    membro: { findFirst: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessoSeletivoService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProcessoSeletivoService>(ProcessoSeletivoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um processo seletivo e disparar notificação', async () => {
      // Isola a validação
      jest.spyOn(service as any, 'validateUser').mockResolvedValue(true);

      const dto = { titulo: 'Processo Trainee 2026', idEntidade: 1 } as any;
      const processoMock = { id: 10, ...dto };

      mockPrisma.processoSeletivo.create.mockResolvedValue(processoMock);

      const result = await service.create(dto, 1);

      expect(mockPrisma.processoSeletivo.create).toHaveBeenCalledWith({
        data: { ...dto },
      });
      expect(mockPrisma.notificacao.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          tipo: TipoNotificacao.PROCESSO_SELETIVO,
          referenciaId: 10,
        }),
      });
      expect(result).toEqual(processoMock);
    });
  });

  describe('findAll', () => {
    it('deve retornar uma lista de processos seletivos', async () => {
      const mockList = [{ id: 1 }, { id: 2 }];
      mockPrisma.processoSeletivo.findMany.mockResolvedValue(mockList);

      const result = await service.findAll();
      expect(result).toEqual(mockList);
      expect(mockPrisma.processoSeletivo.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar o processo seletivo se encontrado', async () => {
      mockPrisma.processoSeletivo.findUnique.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });

    it('deve lançar NotFoundException se o processo seletivo não existir', async () => {
      mockPrisma.processoSeletivo.findUnique.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve lançar NotFoundException se o processo seletivo não for encontrado', async () => {
      mockPrisma.processoSeletivo.findUnique.mockResolvedValue(null);
      await expect(service.update(1, {} as any, 1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve atualizar o processo se o usuário tiver permissão', async () => {
      mockPrisma.processoSeletivo.findUnique.mockResolvedValue({
        idEntidade: 5,
      });
      jest.spyOn(service as any, 'validateUser').mockResolvedValue(true);

      const dto = { titulo: 'Atualizado' } as any;
      mockPrisma.processoSeletivo.update.mockResolvedValue({ id: 1, ...dto });

      const result = await service.update(1, dto, 2);

      expect(service['validateUser']).toHaveBeenCalledWith(2, 5);
      expect(mockPrisma.processoSeletivo.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
      expect(result.titulo).toBe('Atualizado');
    });
  });

  describe('remove', () => {
    it('deve lançar NotFoundException se o processo não for encontrado para exclusão', async () => {
      mockPrisma.processoSeletivo.findUnique.mockResolvedValue(null);
      await expect(service.remove(1, 1)).rejects.toThrow(NotFoundException);
    });

    it('deve remover o processo se o usuário tiver permissão', async () => {
      mockPrisma.processoSeletivo.findUnique.mockResolvedValue({
        idEntidade: 5,
      });
      jest.spyOn(service as any, 'validateUser').mockResolvedValue(true);
      mockPrisma.processoSeletivo.delete.mockResolvedValue({ id: 1 });

      await service.remove(1, 2);

      expect(service['validateUser']).toHaveBeenCalledWith(2, 5);
      expect(mockPrisma.processoSeletivo.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('validateUser', () => {
    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue(null);
      await expect(service['validateUser'](1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar NotFoundException se a entidade não for encontrada', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue(null);
      await expect(service['validateUser'](1, 1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar ForbiddenException se a classificação não for GESTOR ou CO_GESTOR', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.membro.findFirst.mockResolvedValue({
        classificacao: 'MEMBRO',
      });

      await expect(service['validateUser'](1, 1)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('deve retornar true se o usuário for GESTOR', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.membro.findFirst.mockResolvedValue({
        classificacao: 'GESTOR',
      });

      const result = await service['validateUser'](1, 1);
      expect(result).toBe(true);
    });

    it('deve retornar true se o usuário for CO_GESTOR', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.membro.findFirst.mockResolvedValue({
        classificacao: 'CO_GESTOR',
      });

      const result = await service['validateUser'](1, 1);
      expect(result).toBe(true);
    });
  });
});
