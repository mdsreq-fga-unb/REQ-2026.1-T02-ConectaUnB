import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoService } from './projeto.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { TipoNotificacao } from '@prisma/client';

describe('ProjetoService', () => {
  let service: ProjetoService;
  let prisma: PrismaService;

  const mockPrisma = {
    projeto: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
    notificacao: { create: jest.fn() },
    perfil: { findUnique: jest.fn() },
    entidade: { findUnique: jest.fn() },
    membro: { findFirst: jest.fn() },
    gerentesProjetos: {
      create: jest.fn(),
      findFirst: jest.fn(),
      deleteMany: jest.fn(),
      upsert: jest.fn(),
    },
    colaboradoresProjetos: {
      create: jest.fn(),
      findFirst: jest.fn(),
      deleteMany: jest.fn(),
      upsert: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjetoService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProjetoService>(ProjetoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um projeto e emitir uma notificação', async () => {
      jest.spyOn(service as any, 'validateUser').mockResolvedValue(true);
      const dto = { nome: 'Novo Projeto', idEntidade: 1 } as any;
      const projetoMock = { id: 10, ...dto };
      
      mockPrisma.projeto.create.mockResolvedValue(projetoMock);

      const result = await service.create(dto, 1);

      expect(mockPrisma.projeto.create).toHaveBeenCalled();
      expect(mockPrisma.notificacao.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          tipo: TipoNotificacao.ATUALIZACAO_PROJETO,
          referenciaId: 10,
        }),
      });
      expect(result).toEqual(projetoMock);
    });
  });

  describe('findProjetosEntidade e findOne', () => {
    it('findProjetosEntidade: deve retornar lista de projetos', async () => {
      mockPrisma.projeto.findMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);
      const result = await service.findProjetosEntidade(5);
      expect(result).toHaveLength(2);
      expect(mockPrisma.projeto.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { idEntidade: 5 } })
      );
    });

    it('findOne: deve retornar um projeto', async () => {
      mockPrisma.projeto.findUnique.mockResolvedValue({ id: 1 });
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });
  });

  describe('remove', () => {
    it('deve lançar NotFoundException se o projeto não existir', async () => {
      mockPrisma.projeto.findUnique.mockResolvedValue(null);
      await expect(service.remove(99, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar o projeto se permitido', async () => {
      jest.spyOn(service as any, 'podeEditarProjeto').mockResolvedValue(true);
      const dto = { descricao: 'Nova' } as any;
      
      await service.update(1, 1, dto);
      expect(mockPrisma.projeto.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('addMembro', () => {
    beforeEach(() => {
      jest.spyOn(service as any, 'podeEditarProjeto').mockResolvedValue(true);
      mockPrisma.projeto.findUnique.mockResolvedValue({ idEntidade: 5 });
    });

    it('deve lançar NotFound se perfil não for encontrado', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue(null);
      await expect(service.addMembro(1, 1, { email: 'a@a.com', papel: 'GERENTE' } as any)).rejects.toThrow(NotFoundException);
    });

    it('deve lançar NotFound se usuário não for membro da entidade', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 2 });
      mockPrisma.membro.findFirst.mockResolvedValue(null);
      await expect(service.addMembro(1, 1, { email: 'a@a.com', papel: 'GERENTE' } as any)).rejects.toThrow(NotFoundException);
    });

    it('deve impedir adição se o membro já for gerente do projeto', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 2 });
      mockPrisma.membro.findFirst.mockResolvedValue({ id: 20 });
      mockPrisma.gerentesProjetos.findFirst.mockResolvedValue({ idProjeto: 1 }); // Já é gerente

      await expect(service.addMembro(1, 1, { email: 'a@a.com', papel: 'GERENTE' } as any)).rejects.toThrow(ForbiddenException);
    });

    it('deve adicionar com sucesso na tabela de gerentes', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 2 });
      mockPrisma.membro.findFirst.mockResolvedValue({ id: 20 });
      mockPrisma.gerentesProjetos.findFirst.mockResolvedValue(null);
      mockPrisma.colaboradoresProjetos.findFirst.mockResolvedValue(null);

      await service.addMembro(1, 1, { email: 'a@a.com', papel: 'GERENTE' } as any);
      expect(mockPrisma.gerentesProjetos.create).toHaveBeenCalledWith({ data: { idProjeto: 1, idMembro: 20 } });
    });
  });

  describe('removeMembro', () => {
    it('deve remover membro de ambas as tabelas associativas', async () => {
      jest.spyOn(service as any, 'podeEditarProjeto').mockResolvedValue(true);
      mockPrisma.projeto.findUnique.mockResolvedValue({ idEntidade: 5 });
      mockPrisma.membro.findFirst.mockResolvedValue({ id: 20 });

      await service.removeMembro(1, 1, 2);

      expect(mockPrisma.colaboradoresProjetos.deleteMany).toHaveBeenCalledWith({ where: { idProjeto: 1, idMembro: 20 } });
      expect(mockPrisma.gerentesProjetos.deleteMany).toHaveBeenCalledWith({ where: { idProjeto: 1, idMembro: 20 } });
    });
  });

  describe('updateMembro', () => {
    beforeEach(() => {
      jest.spyOn(service as any, 'podeEditarProjeto').mockResolvedValue(true);
      mockPrisma.projeto.findUnique.mockResolvedValue({ idEntidade: 5 });
      mockPrisma.membro.findFirst.mockResolvedValue({ id: 20 });
    });

    it('transição para GERENTE: deve deletar de colaboradores e upsert em gerentes', async () => {
      await service.updateMembro(1, 1, 2, { papel: 'GERENTE' } as any);
      
      expect(mockPrisma.colaboradoresProjetos.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.gerentesProjetos.upsert).toHaveBeenCalled();
    });

    it('transição para COLABORADOR: deve deletar de gerentes e upsert em colaboradores', async () => {
      await service.updateMembro(1, 1, 2, { papel: 'COLABORADOR' } as any);
      
      expect(mockPrisma.gerentesProjetos.deleteMany).toHaveBeenCalled();
      expect(mockPrisma.colaboradoresProjetos.upsert).toHaveBeenCalled();
    });
  });

  describe('Validações Internas (Privadas)', () => {
    it('podeEditarProjeto: deve lançar erro se projeto não existir', async () => {
      mockPrisma.projeto.findUnique.mockResolvedValue(null);
      await expect(service['podeEditarProjeto'](1, 1)).rejects.toThrow(NotFoundException);
    });

    it('podeEditarProjeto: deve bloquear se não for gerente do projeto e nem gestor da entidade', async () => {
      mockPrisma.projeto.findUnique.mockResolvedValue({ idEntidade: 5 });
      mockPrisma.gerentesProjetos.findFirst.mockResolvedValue(null);
      mockPrisma.membro.findFirst.mockResolvedValue(null); // Não é gestor

      await expect(service['podeEditarProjeto'](1, 1)).rejects.toThrow(ForbiddenException);
    });

    it('validateUser: deve lançar erro genérico se usuário não existir', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue(null);
      await expect(service['validateUser'](1, 1)).rejects.toThrow("Usuário não encontrado");
    });
  });
});