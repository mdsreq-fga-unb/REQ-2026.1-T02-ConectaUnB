import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoService } from './projeto.service';

describe('ProjetoService', () => {
  let service: ProjetoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetoService],
    }).compile();

    service = module.get<ProjetoService>(ProjetoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return expected message', () => {
    expect(service.create({} as any)).toBe('This action adds a new projeto');
  });

  it('findAll should return expected message', () => {
    expect(service.findAll()).toBe('This action returns all projeto');
  });

  it('findOne should return expected message with id', () => {
    expect(service.findOne(1)).toBe('This action returns a #1 projeto');
  });

  it('update should return expected message with id', () => {
    expect(service.update(1, {} as any)).toBe(
      'This action updates a #1 projeto',
    );
  });

  it('remove should return expected message with id', () => {
    expect(service.remove(1)).toBe('This action removes a #1 projeto');
  });
});
