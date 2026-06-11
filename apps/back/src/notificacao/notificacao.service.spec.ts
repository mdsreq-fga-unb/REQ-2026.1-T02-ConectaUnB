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

  it('create should return expected message', () => {
    expect(service.create({} as any)).toBe(
      'This action adds a new notificacao',
    );
  });

  it('findAll should return expected message', () => {
    expect(service.findAll()).toBe('This action returns all notificacao');
  });

  it('findOne should return expected message with id', () => {
    expect(service.findOne(1)).toBe('This action returns a #1 notificacao');
  });

  it('remove should return expected message with id', () => {
    expect(service.remove(1)).toBe('This action removes a #1 notificacao');
  });
});
