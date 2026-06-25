import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacaoMembro, StatusProjeto } from '@prisma/client';
import { ProjetoService } from './projeto.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProjetoService', () => {
  let service: ProjetoService;
  const prisma = {
    projeto: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    membro: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    entidade: {
      findUnique: jest.fn(),
    },
    gerentesProjetos: {
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjetoService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<ProjetoService>(ProjetoService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project and link requester as project manager', async () => {
    const dto = {
      idEntidade: 1,
      nome: 'Novo Projeto',
      status: StatusProjeto.PLANEJAMENTO,
      dataInicio: new Date('2026-06-25T00:00:00.000Z'),
    };
    prisma.membro.findFirst.mockResolvedValue({ id: 3 });
    prisma.projeto.create.mockResolvedValue({
      id: 10,
      ...dto,
      entidade: { id: 1, nome: 'Conecta UnB' },
    });

    await expect(service.create(dto, 7)).resolves.toEqual({
      id: 10,
      ...dto,
      entidade: { id: 1, nome: 'Conecta UnB' },
    });

    expect(prisma.membro.findFirst).toHaveBeenCalledWith({
      where: {
        idPerfil: 7,
        idEntidade: 1,
        classificacao: {
          in: [ClassificacaoMembro.GESTOR, ClassificacaoMembro.CO_GESTOR],
        },
      },
      select: { id: true },
    });
    expect(prisma.projeto.create).toHaveBeenCalledWith({
      data: {
        ...dto,
        gerentes: {
          create: {
            idMembro: 3,
          },
        },
      },
      include: {
        entidade: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  });

  it('should list projects for authenticated profile grouped by project role', async () => {
    prisma.membro.findMany.mockResolvedValue([
      {
        id: 3,
        gerenteProjetos: [
          {
            projeto: {
              id: 2,
              nome: 'App Conecta',
              entidade: { id: 1, nome: 'Conecta UnB' },
            },
          },
        ],
        colaboradorProjetos: [
          {
            projeto: {
              id: 4,
              nome: 'Site da Entidade',
              entidade: { id: 1, nome: 'Conecta UnB' },
            },
          },
        ],
      },
    ]);

    await expect(service.findMinhasProjetos(7)).resolves.toEqual([
      {
        id: 2,
        nome: 'App Conecta',
        entidade: { id: 1, nome: 'Conecta UnB' },
        vinculoProjeto: 'GERENTE',
      },
      {
        id: 4,
        nome: 'Site da Entidade',
        entidade: { id: 1, nome: 'Conecta UnB' },
        vinculoProjeto: 'COLABORADOR',
      },
    ]);

    expect(prisma.membro.findMany).toHaveBeenCalledWith({
      where: { idPerfil: 7 },
      select: {
        id: true,
        gerenteProjetos: {
          select: {
            projeto: {
              include: {
                entidade: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
        colaboradorProjetos: {
          select: {
            projeto: {
              include: {
                entidade: {
                  select: {
                    id: true,
                    nome: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  it('should update a project when requester is project manager', async () => {
    prisma.projeto.findUnique.mockResolvedValue({ id: 2 });
    prisma.gerentesProjetos.findFirst.mockResolvedValue({ idProjeto: 2 });
    prisma.projeto.update.mockResolvedValue({
      id: 2,
      nome: 'Projeto Atualizado',
    });

    await expect(
      service.update(2, 7, { nome: 'Projeto Atualizado' }),
    ).resolves.toEqual({
      id: 2,
      nome: 'Projeto Atualizado',
    });

    expect(prisma.projeto.update).toHaveBeenCalledWith({
      where: { id: 2 },
      data: { nome: 'Projeto Atualizado' },
    });
  });

  it('should delete a project when requester is project manager', async () => {
    prisma.projeto.findUnique.mockResolvedValue({ id: 2 });
    prisma.gerentesProjetos.findFirst.mockResolvedValue({ idProjeto: 2 });
    prisma.projeto.delete.mockResolvedValue({ id: 2 });

    await expect(service.remove(2, 7)).resolves.toEqual({ id: 2 });
    expect(prisma.projeto.delete).toHaveBeenCalledWith({ where: { id: 2 } });
  });
});
