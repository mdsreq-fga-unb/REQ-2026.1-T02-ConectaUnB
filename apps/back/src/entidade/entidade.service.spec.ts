import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ClassificacaoMembro } from '@prisma/client';
import { EntidadeService } from './entidade.service';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

describe('EntidadeService', () => {
  let service: EntidadeService;
  const prisma = {
    entidade: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    perfil: {
      findUnique: jest.fn(),
    },
    membro: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntidadeService,
        { provide: PrismaService, useValue: prisma },
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

    service = module.get<EntidadeService>(EntidadeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list authenticated user entities with membership data', async () => {
    const membroRow = {
      id: 10,
      classificacao: 'GESTOR',
      createdAt: new Date('2026-06-01T00:00:00.000Z'),
      entidade: {
        id: 1,
        nome: 'Conecta UnB',
        descricao: 'Entidade de teste',
        classificacao: 'PROJETO_EXTENSAO',
        campus: 'GAMA',
        departamento: 'FCTE',
        linkBanner: null,
        linkLogo: null,
        createdAt: new Date('2026-06-01T00:00:00.000Z'),
        updatedAt: new Date('2026-06-01T00:00:00.000Z'),
      },
    };

    prisma.membro.findMany.mockResolvedValue([membroRow]);

    const result = await service.findMinhasEntidades(7);

    expect(result).toEqual([
      {
        ...membroRow.entidade,
        vinculo: { classificacao: 'GESTOR', idMembro: 10 },
      },
    ]);
    expect(prisma.membro.findMany).toHaveBeenCalledWith({
      where: { idPerfil: 7 },
      include: {
        entidade: {
          select: {
            id: true,
            nome: true,
            descricao: true,
            classificacao: true,
            campus: true,
            departamento: true,
            linkBanner: true,
            linkLogo: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  });

  it('should find one entity with member data', async () => {
    const entidade = {
      id: 1,
      nome: 'Conecta UnB',
      descricao: 'Entidade de teste',
      classificacao: 'PROJETO_EXTENSAO',
      campus: 'GAMA',
      departamento: 'FCTE',
      linkLogo: null,
      linkBanner: null,
      createdAt: new Date('2026-06-01T00:00:00.000Z'),
      updatedAt: new Date('2026-06-01T00:00:00.000Z'),
      membros: [
        {
          id: 12,
          classificacao: 'MEMBRO',
          perfil: {
            id: 9,
            name: 'Maria',
            email: 'maria@aluno.unb.br',
            linkFoto: null,
          },
        },
      ],
      _count: { seguidores: 0 },
    };

    prisma.entidade.findUnique.mockResolvedValue(entidade);

    const result = await service.findOne(1);
    expect(result).toEqual(entidade);
    expect(prisma.entidade.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      select: {
        id: true,
        nome: true,
        descricao: true,
        classificacao: true,
        campus: true,
        departamento: true,
        linkLogo: true,
        linkBanner: true,
        createdAt: true,
        updatedAt: true,
        membros: {
          select: {
            id: true,
            classificacao: true,
            perfil: {
              select: { id: true, name: true, email: true, linkFoto: true },
            },
          },
        },
        _count: { select: { seguidores: true } },
      },
    });
  });

  describe('update', () => {
    it('should update an entity when requester manages it', async () => {
      prisma.membro.findUnique.mockResolvedValue({
        classificacao: 'CO_GESTOR',
      });
      prisma.entidade.update.mockResolvedValue({
        id: 1,
        nome: 'Entidade Atualizada',
        descricao: null,
        classificacao: null,
        campus: null,
        departamento: null,
        linkLogo: null,
        linkBanner: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.update(1, 7, {
        nome: 'Entidade Atualizada',
      });
      expect(result).toMatchObject({ id: 1, nome: 'Entidade Atualizada' });
      expect(prisma.membro.findUnique).toHaveBeenCalledWith({
        where: { idPerfil_idEntidade: { idPerfil: 7, idEntidade: 1 } },
        select: { classificacao: true },
      });
      expect(prisma.entidade.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          nome: 'Entidade Atualizada',
          descricao: undefined,
          classificacao: undefined,
          campus: undefined,
          departamento: undefined,
          linkLogo: undefined,
          linkBanner: undefined,
        },
        select: expect.any(Object),
      });
    });

    it('should reject update when requester cannot manage', async () => {
      prisma.membro.findUnique.mockResolvedValue(null);

      await expect(service.update(1, 7, { nome: 'X' })).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      expect(prisma.entidade.update).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove an entity when requester is GESTOR', async () => {
      prisma.membro.findUnique.mockResolvedValue({ classificacao: 'GESTOR' });
      prisma.entidade.delete.mockResolvedValue({ id: 1 });

      const result = await service.remove(1, 7);
      expect(result).toEqual({ id: 1 });
      expect(prisma.entidade.delete).toHaveBeenCalledWith({
        where: { id: 1 },
        select: { id: true },
      });
    });

    it('should reject remove when requester cannot manage', async () => {
      prisma.membro.findUnique.mockResolvedValue(null);

      await expect(service.remove(1, 7)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      expect(prisma.entidade.delete).not.toHaveBeenCalled();
    });
  });

  describe('addMembro', () => {
    it('should add a MEMBRO when requester can manage', async () => {
      prisma.membro.findUnique
        .mockResolvedValueOnce({ classificacao: 'GESTOR' }) // assertCanManage
        .mockResolvedValueOnce(null); // no existing membership
      prisma.perfil.findUnique.mockResolvedValue({ id: 9 });
      prisma.membro.create.mockResolvedValue({ id: 12 });

      const result = await service.addMembro(1, 7, {
        email: 'test@unb.br',
        classificacao: ClassificacaoMembro.MEMBRO,
      });
      expect(result).toEqual({ id: 12 });
      expect(prisma.membro.create).toHaveBeenCalled();
    });

    it('should reject when requester cannot manage', async () => {
      prisma.membro.findUnique.mockResolvedValue(null);

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prisma.membro.create).not.toHaveBeenCalled();
    });

    it('should reject when requester cannot manage (Forbidden)', async () => {
      prisma.membro.findUnique.mockResolvedValue(null);

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prisma.membro.create).not.toHaveBeenCalled();
    });

    it('should reject when target perfil does not exist', async () => {
      prisma.membro.findUnique.mockResolvedValue({ classificacao: 'GESTOR' });
      prisma.perfil.findUnique.mockResolvedValue(null);

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prisma.membro.create).not.toHaveBeenCalled();
    });

    it('should map Prisma P2002 (duplicated member) to ConflictException', async () => {
      prisma.membro.findUnique.mockResolvedValue({ classificacao: 'GESTOR' });

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should rethrow unexpected errors from prisma.membro.create', async () => {
      prisma.membro.findUnique
        .mockResolvedValueOnce({ classificacao: 'GESTOR' })
        .mockResolvedValueOnce(null);
      prisma.perfil.findUnique.mockResolvedValue({ id: 9 });
      const unknownError = new Error('boom');
      prisma.membro.create.mockRejectedValue(unknownError);

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBe(unknownError);
    });
  });

  describe('removeMembro', () => {
    it('should remove a MEMBRO when requester is CO_GESTOR', async () => {
      prisma.membro.findUnique
        .mockResolvedValueOnce({ classificacao: 'CO_GESTOR' }) // assertCanManage
        .mockResolvedValueOnce({ id: 12, classificacao: 'MEMBRO' }); // target exists
      prisma.membro.delete.mockResolvedValue({ id: 12 });

      const result = await service.removeMembro(1, 7, 9);
      expect(result).toEqual({ id: 12 });
      expect(prisma.membro.delete).toHaveBeenCalledWith({
        where: { idPerfil_idEntidade: { idPerfil: 9, idEntidade: 1 } },
      });
    });

    it('should reject when entity does not exist (assertCanManage fails)', async () => {
      prisma.membro.findUnique.mockResolvedValue(null);

      await expect(service.removeMembro(1, 7, 9)).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      expect(prisma.membro.delete).not.toHaveBeenCalled();
    });
  });

  describe('setLogo / setBanner', () => {
    it('setLogo should update linkLogo when requester can manage', async () => {
      prisma.membro.findUnique.mockResolvedValue({ classificacao: 'GESTOR' });
      prisma.entidade.update.mockResolvedValue({
        id: 1,
        linkLogo: 'https://example.com/logo.webp',
      });

      const result = await service.setLogo(
        1,
        7,
        'https://example.com/logo.webp',
      );
      expect(result).toEqual({
        id: 1,
        linkLogo: 'https://example.com/logo.webp',
      });
      expect(prisma.entidade.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { linkLogo: 'https://example.com/logo.webp' },
        select: { id: true, linkLogo: true },
      });
    });

    it('setBanner should update linkBanner when requester can manage', async () => {
      prisma.membro.findUnique.mockResolvedValue({
        classificacao: 'CO_GESTOR',
      });
      prisma.entidade.update.mockResolvedValue({
        id: 1,
        linkBanner: 'https://example.com/banner.webp',
      });

      const result = await service.setBanner(
        1,
        7,
        'https://example.com/banner.webp',
      );
      expect(result).toEqual({
        id: 1,
        linkBanner: 'https://example.com/banner.webp',
      });
    });

    it('setLogo should reject when requester cannot manage', async () => {
      prisma.membro.findUnique.mockResolvedValue(null);

      await expect(
        service.setLogo(1, 7, 'https://example.com/logo.webp'),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
