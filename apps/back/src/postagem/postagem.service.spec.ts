import { Test, TestingModule } from '@nestjs/testing';
import { PostagemService } from './postagem.service';

describe('PostagemService', () => {
  let service: PostagemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostagemService],
    }).compile();

    service = module.get<PostagemService>(PostagemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
