import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { ClassificacaoMembro } from '@prisma/client';
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
      deleteMany: jest.fn(),
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

  it('should add a member when requester can manage the entity', async () => {
    prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
    prisma.membro.findFirst
      .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
      .mockResolvedValueOnce(null);
    prisma.perfil.findUnique.mockResolvedValue({ id: 9 });
    prisma.membro.create.mockResolvedValue({
      id: 12,
      idEntidade: 1,
      idPerfil: 9,
      classificacao: 'MEMBRO',
    });

    await expect(
      service.addMembro(1, 7, {
        idPerfil: 9,
        classificacao: ClassificacaoMembro.MEMBRO,
      }),
    ).resolves.toEqual({
      id: 12,
      idEntidade: 1,
      idPerfil: 9,
      classificacao: 'MEMBRO',
    });

    expect(prisma.membro.findFirst).toHaveBeenNthCalledWith(1, {
      where: {
        idEntidade: 1,
        idPerfil: 7,
        classificacao: { in: ['GESTOR', 'CO_GESTOR'] },
      },
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

  it('should reject adding members when requester cannot manage the entity', async () => {
    prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
    prisma.membro.findFirst.mockResolvedValue(null);

    await expect(
      service.addMembro(1, 7, {
        idPerfil: 9,
        classificacao: ClassificacaoMembro.MEMBRO,
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.membro.create).not.toHaveBeenCalled();
  });

  it('should reject duplicated entity members', async () => {
    prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
    prisma.membro.findFirst
      .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
      .mockResolvedValueOnce({ id: 12, idPerfil: 9, idEntidade: 1 });
    prisma.perfil.findUnique.mockResolvedValue({ id: 9 });

    await expect(
      service.addMembro(1, 7, {
        idPerfil: 9,
        classificacao: ClassificacaoMembro.MEMBRO,
      }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(prisma.membro.create).not.toHaveBeenCalled();
  });

  it('should remove a member when requester can manage the entity', async () => {
    prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
    prisma.membro.findFirst
      .mockResolvedValueOnce({ id: 2, classificacao: 'CO_GESTOR' })
      .mockResolvedValueOnce({ id: 12, idPerfil: 9, idEntidade: 1 });
    prisma.membro.deleteMany.mockResolvedValue({ count: 1 });

    await expect(service.removeMembro(1, 7, 9)).resolves.toEqual({
      idEntidade: 1,
      idPerfil: 9,
      removed: true,
    });

    expect(prisma.membro.deleteMany).toHaveBeenCalledWith({
      where: {
        idEntidade: 1,
        idPerfil: 9,
      },
    });
  });

  it('should reject removing a member that does not belong to the entity', async () => {
    prisma.entidade.findUnique.mockResolvedValue({ id: 1 });
    prisma.membro.findFirst
      .mockResolvedValueOnce({ id: 2, classificacao: 'GESTOR' })
      .mockResolvedValueOnce(null);

    await expect(service.removeMembro(1, 7, 9)).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(prisma.membro.deleteMany).not.toHaveBeenCalled();
  });
});
