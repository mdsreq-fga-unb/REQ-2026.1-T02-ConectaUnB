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

  it('create should return expected message', () => {
    expect(service.create({} as any)).toBe(
      'This action adds a new processoSeletivo',
    );
  });

  it('findAll should return expected message', () => {
    expect(service.findAll()).toBe('This action returns all processoSeletivo');
  });

  it('findOne should return expected message with id', () => {
    expect(service.findOne(1)).toBe(
      'This action returns a #1 processoSeletivo',
    );
  });

  it('update should return expected message with id', () => {
    expect(service.update(1, {} as any)).toBe(
      'This action updates a #1 processoSeletivo',
    );
  });

  it('remove should return expected message with id', () => {
    expect(service.remove(1)).toBe('This action removes a #1 processoSeletivo');
  });
});
