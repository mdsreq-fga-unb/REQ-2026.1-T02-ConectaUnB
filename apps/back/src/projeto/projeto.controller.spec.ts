import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoController } from './projeto.controller';
import { ProjetoService } from './projeto.service';

const mockProjetoService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('ProjetoController', () => {
  let controller: ProjetoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetoController],
      providers: [{ provide: ProjetoService, useValue: mockProjetoService }],
    }).compile();

    controller = module.get<ProjetoController>(ProjetoController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /projeto', () => {
    it('should delegate to service.create', () => {
      const dto = {
        idEntidade: 1,
        nome: 'Proj',
        status: 'EM_ANDAMENTO' as any,
        dataInicio: new Date(),
      };
      mockProjetoService.create.mockReturnValue('created');

      const result = controller.create(dto);
      expect(result).toBe('created');
      expect(mockProjetoService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /projeto', () => {
    it('should delegate to service.findAll', () => {
      mockProjetoService.findAll.mockReturnValue('all');
      expect(controller.findAll()).toBe('all');
      expect(mockProjetoService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /projeto/:id', () => {
    it('should delegate to service.findOne with converted id', () => {
      mockProjetoService.findOne.mockReturnValue('one');
      expect(controller.findOne('5')).toBe('one');
      expect(mockProjetoService.findOne).toHaveBeenCalledWith(5);
    });
  });

  describe('PATCH /projeto/:id', () => {
    it('should delegate to service.update with converted id', () => {
      const dto = { nome: 'Updated' };
      mockProjetoService.update.mockReturnValue('updated');
      expect(controller.update('3', dto as any)).toBe('updated');
      expect(mockProjetoService.update).toHaveBeenCalledWith(3, dto);
    });
  });

  describe('DELETE /projeto/:id', () => {
    it('should delegate to service.remove with converted id', () => {
      mockProjetoService.remove.mockReturnValue('removed');
      expect(controller.remove('7')).toBe('removed');
      expect(mockProjetoService.remove).toHaveBeenCalledWith(7);
    });
  });
});
