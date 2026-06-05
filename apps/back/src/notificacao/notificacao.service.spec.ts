import { Test, TestingModule } from '@nestjs/testing';
import { NotificacaoService } from './notificacao.service';

describe('NotificacaoService', () => {
  let service: NotificacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificacaoService],
    }).compile();

    service = module.get<NotificacaoService>(NotificacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
