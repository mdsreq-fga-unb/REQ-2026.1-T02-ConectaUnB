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

  it('create should return expected message', () => {
    expect(service.create({} as any)).toBe('This action adds a new postagem');
  });

  it('findAll should return expected message', () => {
    expect(service.findAll()).toBe('This action returns all postagem');
  });

  it('findOne should return expected message with id', () => {
    expect(service.findOne(1)).toBe('This action returns a #1 postagem');
  });

  it('update should return expected message with id', () => {
    expect(service.update(1, {} as any)).toBe(
      'This action updates a #1 postagem',
    );
  });

  it('remove should return expected message with id', () => {
    expect(service.remove(1)).toBe('This action removes a #1 postagem');
  });
});
