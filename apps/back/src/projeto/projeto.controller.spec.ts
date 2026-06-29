import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoController } from './projeto.controller';
import { ProjetoService } from './projeto.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjetoDto } from './dto/create-projeto.dto';

describe('ProjetoController', () => {
  let controller: ProjetoController;
  let service: ProjetoService;

  const mockProjetoService = {
    create: jest.fn(),
    findProjetosEntidade: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addMembro: jest.fn(),
    updateMembro: jest.fn(),
    removeMembro: jest.fn(),
  };

  const mockRequest = {
    user: { id: '1', email: 'teste@teste.com' },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetoController],
      providers: [
        { provide: ProjetoService, useValue: mockProjetoService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Bypassa o guard para testes unitários
      .compile();

    controller = module.get<ProjetoController>(ProjetoController);
    service = module.get<ProjetoService>(ProjetoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve chamar o service.create com DTO e userId convertido', async () => {
      const dto = { nome: 'Novo Projeto', idEntidade: 5 } as any;
      await controller.create(dto, mockRequest);
      expect(service.create).toHaveBeenCalledWith(dto, 1); // req.user.id '1' convertido para Number
    });
  });

  describe('findProjetosEntidade', () => {
    it('deve chamar o service passando o id da entidade convertido para number', async () => {
      await controller.findProjetosEntidade('5');
      expect(service.findProjetosEntidade).toHaveBeenCalledWith(5);
    });
  });

  describe('findOne', () => {
    it('deve chamar o service passando o id do projeto convertido', async () => {
      await controller.findOne('10');
      expect(service.findOne).toHaveBeenCalledWith(10);
    });
  });

  describe('update', () => {
    it('deve chamar o service.update com idProjeto, userId e DTO', async () => {
      const dto = { descricao: 'Atualizada' } as any;
      await controller.update('10', dto, mockRequest);
      expect(service.update).toHaveBeenCalledWith(10, 1, dto);
    });
  });

  describe('remove', () => {
    it('deve chamar o service.remove com idProjeto e userId', async () => {
      await controller.remove('10', mockRequest);
      expect(service.remove).toHaveBeenCalledWith(10, 1);
    });
  });

  describe('addMembro', () => {
    it('deve chamar o service.addMembro com os dados corretos', async () => {
      const dto = { email: 'membro@unb.br', papel: 'COLABORADOR' } as any;
      await controller.addMembro('10', dto, mockRequest);
      expect(service.addMembro).toHaveBeenCalledWith(10, 1, dto);
    });
  });

  describe('updateMembro', () => {
    it('deve chamar o service.updateMembro convertendo os IDs', async () => {
      const dto = { papel: 'GERENTE' } as any;
      await controller.updateMembro('10', '2', dto, mockRequest);
      // idProjeto (10), idPerfilSolicitante (1), idPerfilAlterado (2), DTO
      expect(service.updateMembro).toHaveBeenCalledWith(10, 1, 2, dto);
    });
  });

  describe('removeMembro', () => {
    it('deve chamar o service.removeMembro convertendo os IDs', async () => {
      await controller.removeMembro('10', '2', mockRequest);
      expect(service.removeMembro).toHaveBeenCalledWith(10, 1, 2);
    });
  });
});