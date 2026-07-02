import { Test, TestingModule } from '@nestjs/testing';
import { PerfilService } from './perfil.service';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { NotFoundException } from '@nestjs/common';

const mockPerfil = {
  id: 1,
  nome: 'Usuário Teste',
  email: 'usuario.teste@exemplo.com',
  matricula: '123456789',
  curso: 'ENGENHARIA_DE_SOFTWARE',
  campus: 'GAMA',
  cargo: 'DISCENTE',
  departamento: 'FCTE',
  createdAt: new Date(),
};

const mockEntidade = {
  id: 5,
  nome: 'Projeto Teste Genérico',
};

const mockPrismaService = {
  perfil: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  },
  membro: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
  entidade: {
    delete: jest.fn(),
  },
  seguindo: {
    findMany: jest.fn(),
  },
};

describe('PerfilService', () => {
  let service: PerfilService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerfilService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: StorageService,
          useValue: {
            upload: jest.fn(),
            delete: jest.fn(),
            getUsage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PerfilService>(PerfilService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar uma lista de perfis protegida', async () => {
      mockPrismaService.perfil.findMany.mockResolvedValue([mockPerfil]);
      const result = await service.findAll();
      expect(result).toEqual([mockPerfil]);
      expect(prisma.perfil.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('deve retornar o perfil se ele existir', async () => {
      mockPrismaService.perfil.findUnique.mockResolvedValue(mockPerfil);
      const result = await service.findOne(1);
      expect(result).toEqual(mockPerfil);
    });

    it('deve lançar NotFoundException se o perfil não existir', async () => {
      mockPrismaService.perfil.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto = { nome: 'Usuário Teste Atualizado' };

    it('deve atualizar o perfil com sucesso', async () => {
      const perfilAtualizado = { ...mockPerfil, ...updateDto };
      mockPrismaService.perfil.update.mockResolvedValue(perfilAtualizado);

      const result = await service.update(1, updateDto as any);
      expect(result).toEqual(perfilAtualizado);
    });

    it('deve lançar NotFoundException se tentar atualizar ID inexistente (Erro P2025)', async () => {
      const mockError = { code: 'P2025' };
      mockPrismaService.perfil.update.mockRejectedValue(mockError);

      await expect(service.update(999, updateDto as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('deve deletar o perfil com sucesso', async () => {
      mockPrismaService.membro.findMany.mockResolvedValue([]);
      mockPrismaService.perfil.delete.mockResolvedValue(mockPerfil);
      const result = await service.remove(1);
      expect(result).toEqual(mockPerfil);
    });

    it('deve lançar NotFoundException se tentar deletar ID inexistente (Erro P2025)', async () => {
      mockPrismaService.membro.findMany.mockResolvedValue([]);
      const mockError = { code: 'P2025' };
      mockPrismaService.perfil.delete.mockRejectedValue(mockError);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findSeguindo', () => {
    it('deve retornar as entidades que o perfil segue', async () => {
      const relacoes = [{ idPerfil: 1, idEntidade: 5, entidade: mockEntidade }];
      mockPrismaService.seguindo.findMany.mockResolvedValue(relacoes);

      const result = await service.findSeguindo(1);

      expect(result).toEqual([mockEntidade]);
      expect(prisma.seguindo.findMany).toHaveBeenCalledWith({
        where: { idPerfil: 1 },
        include: { entidade: true },
      });
    });
  });

  describe('findByEmail', () => {
    it('deve buscar um perfil pelo email (usado no login)', async () => {
      mockPrismaService.perfil.findUnique.mockResolvedValue(mockPerfil);
      const result = await service.findByEmail('usuario.teste@exemplo.com');
      expect(result).toEqual(mockPerfil);
    });
  });

  describe('create', () => {
    it('deve criar um novo perfil', async () => {
      const createDto = { email: 'novo.usuario@exemplo.com', senha: '123' };
      mockPrismaService.perfil.create.mockResolvedValue(mockPerfil);

      const result = await service.create(createDto as any);
      expect(result).toEqual(mockPerfil);
    });
  });
});
