import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoSeletivoController } from './processo-seletivo.controller';
import { ProcessoSeletivoService } from './processo-seletivo.service';

describe('ProcessoSeletivoController', () => {
  let controller: ProcessoSeletivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessoSeletivoController],
      providers: [ProcessoSeletivoService],
    }).compile();

    controller = module.get<ProcessoSeletivoController>(
      ProcessoSeletivoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
