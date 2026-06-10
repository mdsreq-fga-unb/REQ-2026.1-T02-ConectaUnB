import { Test, TestingModule } from '@nestjs/testing';
import { EntidadeService } from './entidade.service';

describe('EntidadeService', () => {
  let service: EntidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntidadeService],
    }).compile();

    service = module.get<EntidadeService>(EntidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
