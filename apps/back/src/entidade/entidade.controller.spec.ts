import { Test, TestingModule } from '@nestjs/testing';
import { ClassificacaoMembro } from '@prisma/client';
import { EntidadeController } from './entidade.controller';
import { EntidadeService } from './entidade.service';

describe('EntidadeController', () => {
  let controller: EntidadeController;
  const entidadeService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findMinhasEntidades: jest.fn(),
    addMembro: jest.fn(),
    removeMembro: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntidadeController],
      providers: [
        {
          provide: EntidadeService,
          useValue: entidadeService,
        },
      ],
    }).compile();

    controller = module.get<EntidadeController>(EntidadeController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list entities for the authenticated user', () => {
    const req: Parameters<EntidadeController['findMinhasEntidades']>[0] = {
      user: { id: '7', email: 'user@aluno.unb.br' },
    } as Parameters<EntidadeController['findMinhasEntidades']>[0];

    entidadeService.findMinhasEntidades.mockReturnValue([
      { id: 1, nome: 'Conecta UnB', vinculo: { classificacao: 'GESTOR' } },
    ]);

    expect(controller.findMinhasEntidades(req)).toEqual([
      { id: 1, nome: 'Conecta UnB', vinculo: { classificacao: 'GESTOR' } },
    ]);
    expect(entidadeService.findMinhasEntidades).toHaveBeenCalledWith(7);
  });

  it('should add members using authenticated manager id', () => {
    const dto = { idPerfil: 9, classificacao: ClassificacaoMembro.MEMBRO };
    const req: Parameters<EntidadeController['addMembro']>[2] = {
      user: { id: '7', email: 'gestor@aluno.unb.br' },
    } as Parameters<EntidadeController['addMembro']>[2];

    entidadeService.addMembro.mockReturnValue({
      id: 11,
      idPerfil: 9,
      idEntidade: 1,
      classificacao: 'MEMBRO',
    });

    expect(controller.addMembro('1', dto, req)).toEqual({
      id: 11,
      idPerfil: 9,
      idEntidade: 1,
      classificacao: 'MEMBRO',
    });
    expect(entidadeService.addMembro).toHaveBeenCalledWith(1, 7, dto);
  });

  it('should remove members using authenticated manager id', () => {
    const req: Parameters<EntidadeController['removeMembro']>[2] = {
      user: { id: '7', email: 'gestor@aluno.unb.br' },
    } as Parameters<EntidadeController['removeMembro']>[2];

    entidadeService.removeMembro.mockReturnValue({
      idEntidade: 1,
      idPerfil: 9,
      removed: true,
    });

    expect(controller.removeMembro('1', '9', req)).toEqual({
      idEntidade: 1,
      idPerfil: 9,
      removed: true,
    });
    expect(entidadeService.removeMembro).toHaveBeenCalledWith(1, 7, 9);
  });
});
