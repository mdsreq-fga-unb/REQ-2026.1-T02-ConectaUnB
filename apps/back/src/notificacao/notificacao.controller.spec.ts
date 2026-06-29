import { Test, TestingModule } from '@nestjs/testing';
import { NotificacaoController } from './notificacao.controller';
import { NotificacaoService } from './notificacao.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('NotificacaoController', () => {
  let controller: NotificacaoController;
  let service: NotificacaoService;

  const mockNotificacaoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    updateUltimaLeitura: jest.fn(),
    updatePreferencias: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificacaoController],
      providers: [
        { provide: NotificacaoService, useValue: mockNotificacaoService },
      ],
    })
      // Simulamos que o guard está desabilitado para focar na lógica do controller
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<NotificacaoController>(NotificacaoController);
    service = module.get<NotificacaoService>(NotificacaoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar notificacaoService.create com o DTO recebido', async () => {
      const dto = { idEntidade: 1, tipo: 'PROCESSO_SELETIVO', mensagem: 'msg', referenciaId: 1 } as any;
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('deve chamar notificacaoService.findAll com o id do usuário do request', async () => {
      const req = { user: { id: 10 } };
      await controller.findAll(req);
      expect(service.findAll).toHaveBeenCalledWith(10);
    });
  });

  describe('updateUltimaLeitura', () => {
    it('deve chamar notificacaoService.updateUltimaLeitura com o id do usuário', async () => {
      const req = { user: { id: 5 } };
      await controller.updateUltimaLeitura(req);
      expect(service.updateUltimaLeitura).toHaveBeenCalledWith(5);
    });
  });

  describe('updatePreferencias', () => {
    it('deve chamar notificacaoService.updatePreferencias com id e body', async () => {
      const req = { user: { id: 7 } };
      const dto = { processoSeletivo: true };
      await controller.updatePreferencias(req, dto);
      expect(service.updatePreferencias).toHaveBeenCalledWith(7, dto);
    });
  });

  describe('remove', () => {
    it('deve chamar notificacaoService.remove convertendo o ID para number', async () => {
      await controller.remove('123');
      expect(service.remove).toHaveBeenCalledWith(123);
    });
  });
});