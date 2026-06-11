import { Test, TestingModule } from '@nestjs/testing';
import { PostagemController } from './postagem.controller';
import { PostagemService } from './postagem.service';

const mockPostagemService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PostagemController', () => {
  let controller: PostagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostagemController],
      providers: [{ provide: PostagemService, useValue: mockPostagemService }],
    }).compile();

    controller = module.get<PostagemController>(PostagemController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /postagem', () => {
    it('should delegate to service.create', () => {
      const dto = { idEntidade: 1, titulo: 'Post', conteudo: 'Content' };
      mockPostagemService.create.mockReturnValue('created');

      const result = controller.create(dto);
      expect(result).toBe('created');
      expect(mockPostagemService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /postagem', () => {
    it('should delegate to service.findAll', () => {
      mockPostagemService.findAll.mockReturnValue('all');
      expect(controller.findAll()).toBe('all');
      expect(mockPostagemService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /postagem/:id', () => {
    it('should delegate to service.findOne with converted id', () => {
      mockPostagemService.findOne.mockReturnValue('one');
      expect(controller.findOne('5')).toBe('one');
      expect(mockPostagemService.findOne).toHaveBeenCalledWith(5);
    });
  });

  describe('PATCH /postagem/:id', () => {
    it('should delegate to service.update with converted id', () => {
      const dto = { titulo: 'Updated' };
      mockPostagemService.update.mockReturnValue('updated');
      expect(controller.update('3', dto as any)).toBe('updated');
      expect(mockPostagemService.update).toHaveBeenCalledWith(3, dto);
    });
  });

  describe('DELETE /postagem/:id', () => {
    it('should delegate to service.remove with converted id', () => {
      mockPostagemService.remove.mockReturnValue('removed');
      expect(controller.remove('7')).toBe('removed');
      expect(mockPostagemService.remove).toHaveBeenCalledWith(7);
    });
  });
});
