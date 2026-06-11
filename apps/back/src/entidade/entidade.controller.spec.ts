import { Test, TestingModule } from '@nestjs/testing';
import { EntidadeController } from './entidade.controller';
import { EntidadeService } from './entidade.service';

const mockEntidadeService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('EntidadeController', () => {
  let controller: EntidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntidadeController],
      providers: [{ provide: EntidadeService, useValue: mockEntidadeService }],
    }).compile();

    controller = module.get<EntidadeController>(EntidadeController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /entidade', () => {
    it('should delegate to service.create', () => {
      const dto = {
        nome: 'Test',
        classificacao: 'EMPRESA_JUNIOR' as any,
        campus: 'GAMA' as any,
        departamento: 'FCTE' as any,
      };
      mockEntidadeService.create.mockReturnValue('created');

      const result = controller.create(dto);
      expect(result).toBe('created');
      expect(mockEntidadeService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /entidade', () => {
    it('should delegate to service.findAll', () => {
      mockEntidadeService.findAll.mockReturnValue('all');
      expect(controller.findAll()).toBe('all');
      expect(mockEntidadeService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /entidade/:id', () => {
    it('should delegate to service.findOne with converted id', () => {
      mockEntidadeService.findOne.mockReturnValue('one');
      expect(controller.findOne('5')).toBe('one');
      expect(mockEntidadeService.findOne).toHaveBeenCalledWith(5);
    });
  });

  describe('PATCH /entidade/:id', () => {
    it('should delegate to service.update with converted id', () => {
      const dto = { nome: 'Updated' };
      mockEntidadeService.update.mockReturnValue('updated');
      expect(controller.update('3', dto as any)).toBe('updated');
      expect(mockEntidadeService.update).toHaveBeenCalledWith(3, dto);
    });
  });

  describe('DELETE /entidade/:id', () => {
    it('should delegate to service.remove with converted id', () => {
      mockEntidadeService.remove.mockReturnValue('removed');
      expect(controller.remove('7')).toBe('removed');
      expect(mockEntidadeService.remove).toHaveBeenCalledWith(7);
    });
  });
});
