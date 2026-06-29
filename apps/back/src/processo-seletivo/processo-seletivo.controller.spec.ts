import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoSeletivoController } from './processo-seletivo.controller';
import { ProcessoSeletivoService } from './processo-seletivo.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('ProcessoSeletivoController', () => {
  let controller: ProcessoSeletivoController;
  let service: ProcessoSeletivoService;

  const mockProcessoSeletivoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRequest = {
    user: { id: '1', email: 'usuario@teste.com' },
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessoSeletivoController],
      providers: [
        {
          provide: ProcessoSeletivoService,
          useValue: mockProcessoSeletivoService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Bypassa o guard para focar na lógica do controller
      .compile();

    controller = module.get<ProcessoSeletivoController>(ProcessoSeletivoController);
    service = module.get<ProcessoSeletivoService>(ProcessoSeletivoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar o service.create com o DTO e o userId (convertido para number)', async () => {
      const dto = { titulo: 'Trainee 2026', idEntidade: 5 } as any;
      await controller.create(dto, mockRequest);
      
      expect(service.create).toHaveBeenCalledWith(dto, 1);
    });
  });

  describe('findAll', () => {
    it('deve chamar o service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve chamar o service.findOne convertendo o id para number', async () => {
      await controller.findOne('15');
      expect(service.findOne).toHaveBeenCalledWith(15);
    });
  });

  describe('update', () => {
    it('deve chamar o service.update com id, DTO e userId', async () => {
      const dto = { titulo: 'Atualizado' } as any;
      await controller.update('15', dto, mockRequest);
      
      expect(service.update).toHaveBeenCalledWith(15, dto, 1);
    });
  });

  describe('remove', () => {
    it('deve chamar o service.remove com id e userId', async () => {
      await controller.remove('15', mockRequest);
      
      expect(service.remove).toHaveBeenCalledWith(15, 1);
    });
  });
});