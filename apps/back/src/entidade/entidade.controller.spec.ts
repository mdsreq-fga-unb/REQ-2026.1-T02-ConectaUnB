import { Test, TestingModule } from '@nestjs/testing';
import { EntidadeController } from './entidade.controller';
import { EntidadeService } from './entidade.service';

describe('EntidadeController', () => {
  let controller: EntidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntidadeController],
      providers: [EntidadeService],
    }).compile();

    controller = module.get<EntidadeController>(EntidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
