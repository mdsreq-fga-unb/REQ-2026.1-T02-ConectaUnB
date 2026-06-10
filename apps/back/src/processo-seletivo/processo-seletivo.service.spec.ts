import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoSeletivoService } from './processo-seletivo.service';

describe('ProcessoSeletivoService', () => {
  let service: ProcessoSeletivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessoSeletivoService],
    }).compile();

    service = module.get<ProcessoSeletivoService>(ProcessoSeletivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
