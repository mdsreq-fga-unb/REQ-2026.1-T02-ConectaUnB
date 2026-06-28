import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoController } from './projeto.controller';
import { ProjetoService } from './projeto.service';

describe('ProjetoController', () => {
  let controller: ProjetoController;
  const projetoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findMinhasProjetos: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetoController],
      providers: [
        {
          provide: ProjetoService,
          useValue: projetoService,
        },
      ],
    }).compile();

    controller = module.get<ProjetoController>(ProjetoController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create project using authenticated user id', () => {
    const dto = {
      idEntidade: 1,
      nome: 'Novo Projeto',
      status: 'PLANEJAMENTO',
      dataInicio: new Date('2026-06-25T00:00:00.000Z'),
    };
    const req = { user: { id: '7', email: 'user@aluno.unb.br' } };
    projetoService.create.mockReturnValue({ id: 10, ...dto });

    expect(controller.create(dto as never, req as never)).toEqual({
      id: 10,
      ...dto,
    });
    expect(projetoService.create).toHaveBeenCalledWith(dto, 7);
  });

  it('should list projects for authenticated user', () => {
    projetoService.findMinhasProjetos.mockReturnValue([
      { id: 2, nome: 'App Conecta', vinculoProjeto: 'GERENTE' },
    ]);
    const req = { user: { id: '7', email: 'user@aluno.unb.br' } };

    expect(controller.findMinhasProjetos(req as never)).toEqual([
      { id: 2, nome: 'App Conecta', vinculoProjeto: 'GERENTE' },
    ]);
    expect(projetoService.findMinhasProjetos).toHaveBeenCalledWith(7);
  });

  it('should update project using authenticated user id', () => {
    const dto = { nome: 'Projeto Atualizado' };
    const req = { user: { id: '7', email: 'user@aluno.unb.br' } };
    projetoService.update.mockReturnValue({ id: 2, ...dto });

    expect(controller.update('2', dto, req as never)).toEqual({
      id: 2,
      ...dto,
    });
    expect(projetoService.update).toHaveBeenCalledWith(2, 7, dto);
  });

  it('should remove project using authenticated user id', () => {
    const req = { user: { id: '7', email: 'user@aluno.unb.br' } };
    projetoService.remove.mockReturnValue({ id: 2 });

    expect(controller.remove('2', req as never)).toEqual({ id: 2 });
    expect(projetoService.remove).toHaveBeenCalledWith(2, 7);
  });
});
