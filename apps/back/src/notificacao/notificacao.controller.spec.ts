import { Test, TestingModule } from '@nestjs/testing';
import { NotificacaoController } from './notificacao.controller';
import { NotificacaoService } from './notificacao.service';

const mockNotificacaoService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

describe('NotificacaoController', () => {
  let controller: NotificacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacaoController],
      providers: [
        { provide: NotificacaoService, useValue: mockNotificacaoService },
      ],
    }).compile();

    controller = module.get<NotificacaoController>(NotificacaoController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /notificacao', () => {
    it('should delegate to service.create', () => {
      const dto = {
        idEntidade: 1,
        tipo: 'NOVA_PUBLICACAO' as any,
        mensagem: 'Test',
        referenciaId: 1,
      };
      mockNotificacaoService.create.mockReturnValue('created');

      const result = controller.create(dto);
      expect(result).toBe('created');
      expect(mockNotificacaoService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /notificacao', () => {
    it('should delegate to service.findAll', () => {
      mockNotificacaoService.findAll.mockReturnValue('all');
      expect(controller.findAll()).toBe('all');
      expect(mockNotificacaoService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /notificacao/:id', () => {
    it('should delegate to service.findOne with converted id', () => {
      mockNotificacaoService.findOne.mockReturnValue('one');
      expect(controller.findOne('5')).toBe('one');
      expect(mockNotificacaoService.findOne).toHaveBeenCalledWith(5);
    });
  });

  describe('DELETE /notificacao/:id', () => {
    it('should delegate to service.remove with converted id', () => {
      mockNotificacaoService.remove.mockReturnValue('removed');
      expect(controller.remove('7')).toBe('removed');
      expect(mockNotificacaoService.remove).toHaveBeenCalledWith(7);
    });
  });
});
