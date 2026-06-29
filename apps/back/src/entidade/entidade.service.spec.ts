import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ClassificacaoMembro, Prisma } from '@prisma/client';
import { EntidadeService } from './entidade.service';
import { PrismaService } from '../prisma/prisma.service';

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
        {
          provide: PrismaService,
          useValue: prisma,
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
    prisma.membro.findMany.mockResolvedValue([
      {
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
      },
    ]);

    await expect(service.findMinhasEntidades(7)).resolves.toEqual([
      {
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
        vinculo: {
          id: 10,
          classificacao: 'GESTOR',
          createdAt: new Date('2026-06-01T00:00:00.000Z'),
        },
      },
    ]);

    expect(prisma.membro.findMany).toHaveBeenCalledWith({
      where: { idPerfil: 7 },
      orderBy: { entidade: { nome: 'asc' } },
      select: {
        id: true,
        classificacao: true,
        createdAt: true,
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
      membros: [
        {
          id: 12,
          email: 'test@unb.br',
          classificacao: 'MEMBRO',
          createdAt: new Date('2026-06-01T00:00:00.000Z'),
          perfil: {
            id: 9,
            name: 'Maria',
            email: 'maria@aluno.unb.br',
          },
        },
      ],
    };
    prisma.entidade.findUnique.mockResolvedValue(entidade);

    await expect(service.findOne(1)).resolves.toEqual(entidade);
    expect(prisma.entidade.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: {
        membros: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            idPerfil: true,
            classificacao: true,
            createdAt: true,
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
    });
  });

  it('should update an entity when requester manages it', async () => {
    prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
    prisma.membro.findFirst.mockResolvedValue({
      id: 2,
      classificacao: 'CO_GESTOR',
    });
    prisma.entidade.update.mockResolvedValue({
      id: 1,
      nome: 'Entidade Atualizada',
    });

    await expect(
      service.update(1, 7, { nome: 'Entidade Atualizada' }),
    ).resolves.toEqual({
      id: 1,
      nome: 'Entidade Atualizada',
    });
    expect(prisma.entidade.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { nome: 'Entidade Atualizada' },
    });
  });

  it('should remove an entity when requester is GESTOR', async () => {
    prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
    prisma.membro.findFirst.mockResolvedValue({
      id: 2,
      classificacao: 'GESTOR',
    });
    prisma.entidade.delete.mockResolvedValue({ id: 1 });

    await expect(service.remove(1, 7)).resolves.toEqual({ id: 1 });
    expect(prisma.entidade.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  describe('addMembro', () => {
    it('should add a MEMBRO when requester is GESTOR', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue({
        id: 2,
        classificacao: 'GESTOR',
      });
      prisma.perfil.findUnique.mockResolvedValue({ id: 9 });
      prisma.membro.create.mockResolvedValue({
        id: 12,
        idEntidade: 1,
        email: 'test@unb.br',
        classificacao: 'MEMBRO',
      });

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).resolves.toEqual({
        id: 12,
        idEntidade: 1,
        email: 'test@unb.br',
        classificacao: 'MEMBRO',
      });

      expect(prisma.membro.findFirst).toHaveBeenCalledWith({
        where: {
          idEntidade: 1,
          idPerfil: 7,
          classificacao: { in: ['GESTOR', 'CO_GESTOR'] },
        },
        select: { id: true, classificacao: true },
      });
      expect(prisma.membro.create).toHaveBeenCalledWith({
        data: {
          idEntidade: 1,
          idPerfil: 9,
          classificacao: 'MEMBRO',
        },
        include: {
          perfil: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          entidade: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
    });

    it('should add a MEMBRO when requester is CO_GESTOR', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue({
        id: 2,
        classificacao: 'CO_GESTOR',
      });
      prisma.perfil.findUnique.mockResolvedValue({ id: 9 });
      prisma.membro.create.mockResolvedValue({ id: 12 });

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).resolves.toEqual({ id: 12 });

      expect(prisma.membro.create).toHaveBeenCalled();
    });

    it('should add a GESTOR when requester is GESTOR', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue({
        id: 2,
        classificacao: 'GESTOR',
      });
      prisma.perfil.findUnique.mockResolvedValue({ id: 9 });
      prisma.membro.create.mockResolvedValue({ id: 12 });

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.GESTOR,
        }),
      ).resolves.toEqual({ id: 12 });
    });

    it('should reject adding entity members when requester cannot manage', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue(null);

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prisma.membro.create).not.toHaveBeenCalled();
    });

    it('should reject CO_GESTOR trying to create another GESTOR (privilege escalation)', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue({
        id: 2,
        classificacao: 'CO_GESTOR',
      });

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.GESTOR,
        }),
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prisma.membro.create).not.toHaveBeenCalled();
    });

    it('should reject when entity does not exist', async () => {
      prisma.entidade.findUnique.mockResolvedValue(null);

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBeInstanceOf(NotFoundException);

      expect(prisma.membro.findFirst).not.toHaveBeenCalled();
      expect(prisma.membro.create).not.toHaveBeenCalled();
    });

    it('should reject when target perfil does not exist', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue({
        id: 2,
        classificacao: 'GESTOR',
      });
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
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue({
        id: 2,
        classificacao: 'GESTOR',
      });
      prisma.perfil.findUnique.mockResolvedValue({ id: 9 });
      prisma.membro.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '6.14.0',
        }),
      );

      await expect(
        service.addMembro(1, 7, {
          email: 'test@unb.br',
          classificacao: ClassificacaoMembro.MEMBRO,
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('should rethrow unexpected errors from prisma.membro.create', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue({
        id: 2,
        classificacao: 'GESTOR',
      });
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
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'CO_GESTOR' })
        .mockResolvedValueOnce({ id: 12, classificacao: 'MEMBRO' });
      prisma.membro.delete.mockResolvedValue({ id: 12 });

      await expect(service.removeMembro(1, 7, 9)).resolves.toEqual({
        idEntidade: 1,
        idPerfil: 9,
        removed: true,
      });

      expect(prisma.membro.delete).toHaveBeenCalledWith({ where: { id: 12 } });
    });

    it('should remove a GESTOR when requester is GESTOR and another GESTOR remains', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
        .mockResolvedValueOnce({ id: 12, classificacao: 'GESTOR' });
      prisma.membro.count.mockResolvedValue(2);
      prisma.membro.delete.mockResolvedValue({ id: 12 });

      await expect(service.removeMembro(1, 7, 9)).resolves.toEqual({
        idEntidade: 1,
        idPerfil: 9,
        removed: true,
      });

      expect(prisma.membro.count).toHaveBeenCalledWith({
        where: { idEntidade: 1, classificacao: 'GESTOR' },
      });
    });

    it('should reject when entity does not exist', async () => {
      prisma.entidade.findUnique.mockResolvedValue(null);

      await expect(service.removeMembro(1, 7, 9)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(prisma.membro.findFirst).not.toHaveBeenCalled();
      expect(prisma.membro.delete).not.toHaveBeenCalled();
    });

    it('should reject when requester cannot manage the entity', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst.mockResolvedValue(null);

      await expect(service.removeMembro(1, 7, 9)).rejects.toBeInstanceOf(
        ForbiddenException,
      );

      expect(prisma.membro.delete).not.toHaveBeenCalled();
    });

    it('should reject removing a member that does not belong to the entity', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
        .mockResolvedValueOnce(null);

      await expect(service.removeMembro(1, 7, 9)).rejects.toBeInstanceOf(
        NotFoundException,
      );

      expect(prisma.membro.delete).not.toHaveBeenCalled();
    });

    it('should reject CO_GESTOR trying to remove a GESTOR (hierarchy)', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'CO_GESTOR' })
        .mockResolvedValueOnce({ id: 12, classificacao: 'GESTOR' });

      await expect(service.removeMembro(1, 7, 9)).rejects.toBeInstanceOf(
        ForbiddenException,
      );

      expect(prisma.membro.delete).not.toHaveBeenCalled();
    });

    it('should reject removing the last GESTOR of the entity', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
        .mockResolvedValueOnce({ id: 12, classificacao: 'GESTOR' });
      prisma.membro.count.mockResolvedValue(1);

      await expect(service.removeMembro(1, 7, 9)).rejects.toBeInstanceOf(
        ConflictException,
      );

      expect(prisma.membro.delete).not.toHaveBeenCalled();
    });
  });

  describe('updateMembro', () => {
    it('should allow GESTOR to change MEMBRO to CO_GESTOR', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
        .mockResolvedValueOnce({ id: 3, classificacao: 'MEMBRO' });

      prisma.membro.update.mockResolvedValue({ id: 3, classificacao: 'CO_GESTOR' });

      await service.updateMembro(1, 7, 9, { classificacao: ClassificacaoMembro.CO_GESTOR });

      expect(prisma.membro.update).toHaveBeenCalledWith({
        where: { id: 3 },
        data: { classificacao: 'CO_GESTOR' },
      });
    });

    it('should reject CO_GESTOR trying to promote MEMBRO to CO_GESTOR', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'CO_GESTOR' });

      await expect(
        service.updateMembro(1, 7, 9, { classificacao: ClassificacaoMembro.CO_GESTOR })
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prisma.membro.update).not.toHaveBeenCalled();
    });

    it('should reject CO_GESTOR trying to edit a GESTOR', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'CO_GESTOR' })
        .mockResolvedValueOnce({ id: 3, classificacao: 'GESTOR' });

      await expect(
        service.updateMembro(1, 7, 9, { classificacao: ClassificacaoMembro.MEMBRO })
      ).rejects.toBeInstanceOf(ForbiddenException);

      expect(prisma.membro.update).not.toHaveBeenCalled();
    });

    it('should reject demoting the last GESTOR of the entity', async () => {
      prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      prisma.membro.findFirst
        .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
        .mockResolvedValueOnce({ id: 3, classificacao: 'GESTOR' });
      
      prisma.membro.count.mockResolvedValue(1);

      await expect(
        service.updateMembro(1, 7, 9, { classificacao: ClassificacaoMembro.MEMBRO })
      ).rejects.toBeInstanceOf(ConflictException);

      expect(prisma.membro.update).not.toHaveBeenCalled();
    });
  });
});
