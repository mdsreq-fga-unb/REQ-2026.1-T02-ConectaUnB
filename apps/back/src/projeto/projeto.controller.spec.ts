import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoController } from './projeto.controller';
import { ProjetoService } from './projeto.service';

describe('ProjetoController', () => {
  let controller: ProjetoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetoController],
      providers: [ProjetoService],
    }).compile();

    controller = module.get<ProjetoController>(ProjetoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
