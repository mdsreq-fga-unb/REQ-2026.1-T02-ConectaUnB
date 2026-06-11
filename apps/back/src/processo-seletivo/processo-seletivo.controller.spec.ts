import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoSeletivoController } from './processo-seletivo.controller';
import { ProcessoSeletivoService } from './processo-seletivo.service';

const mockProcessoSeletivoService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ProcessoSeletivoController', () => {
  let controller: ProcessoSeletivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessoSeletivoController],
      providers: [
        {
          provide: ProcessoSeletivoService,
          useValue: mockProcessoSeletivoService,
        },
      ],
    }).compile();

    controller = module.get<ProcessoSeletivoController>(
      ProcessoSeletivoController,
    );
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /processo-seletivo', () => {
    it('should delegate to service.create', () => {
      const dto = {
        idEntidade: 1,
        titulo: 'PS',
        classificacao: 'ABERTA' as any,
        inicioInscricao: new Date(),
        fimInscricao: new Date(),
      };
      mockProcessoSeletivoService.create.mockReturnValue('created');

      const result = controller.create(dto);
      expect(result).toBe('created');
      expect(mockProcessoSeletivoService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /processo-seletivo', () => {
    it('should delegate to service.findAll', () => {
      mockProcessoSeletivoService.findAll.mockReturnValue('all');
      expect(controller.findAll()).toBe('all');
      expect(mockProcessoSeletivoService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /processo-seletivo/:id', () => {
    it('should delegate to service.findOne with converted id', () => {
      mockProcessoSeletivoService.findOne.mockReturnValue('one');
      expect(controller.findOne('5')).toBe('one');
      expect(mockProcessoSeletivoService.findOne).toHaveBeenCalledWith(5);
    });
  });

  describe('PATCH /processo-seletivo/:id', () => {
    it('should delegate to service.update with converted id', () => {
      const dto = { titulo: 'Updated' };
      mockProcessoSeletivoService.update.mockReturnValue('updated');
      expect(controller.update('3', dto as any)).toBe('updated');
      expect(mockProcessoSeletivoService.update).toHaveBeenCalledWith(3, dto);
    });
  });

  describe('DELETE /processo-seletivo/:id', () => {
    it('should delegate to service.remove with converted id', () => {
      mockProcessoSeletivoService.remove.mockReturnValue('removed');
      expect(controller.remove('7')).toBe('removed');
      expect(mockProcessoSeletivoService.remove).toHaveBeenCalledWith(7);
    });
  });
});
