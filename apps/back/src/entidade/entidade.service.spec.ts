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

  it('create should return expected message', () => {
    expect(service.create({} as any)).toBe('This action adds a new entidade');
  });

  it('findAll should return expected message', () => {
    expect(service.findAll()).toBe('This action returns all entidade');
  });

  it('findOne should return expected message with id', () => {
    expect(service.findOne(1)).toBe('This action returns a #1 entidade');
  });

  it('update should return expected message with id', () => {
    expect(service.update(1, {} as any)).toBe(
      'This action updates a #1 entidade',
    );
  });

  it('remove should return expected message with id', () => {
    expect(service.remove(1)).toBe('This action removes a #1 entidade');
  });
});
