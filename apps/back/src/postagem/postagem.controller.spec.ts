import { Test, TestingModule } from '@nestjs/testing';
import { PostagemController } from './postagem.controller';
import { PostagemService } from './postagem.service';

describe('PostagemController', () => {
  let controller: PostagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostagemController],
      providers: [PostagemService],
    }).compile();

    controller = module.get<PostagemController>(PostagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
