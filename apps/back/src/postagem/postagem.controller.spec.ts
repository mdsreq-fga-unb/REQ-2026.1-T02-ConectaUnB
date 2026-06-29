import { Test, TestingModule } from '@nestjs/testing';
import { PostagemController } from './postagem.controller';
import { PostagemService } from './postagem.service';

describe('PostagemController', () => {
  let controller: PostagemController;
  let service: PostagemService;

  const mockPostagemService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    like: jest.fn(),
    dislike: jest.fn(),
    getLikes: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostagemController],
      providers: [
        {
          provide: PostagemService,
          useValue: mockPostagemService,
        },
      ],
    }).compile();

    controller = module.get<PostagemController>(PostagemController);
    service = module.get<PostagemService>(PostagemService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a post with user id', async () => {
      const dto = { titulo: 'Teste', conteudo: 'Conteudo' } as any;
      const req = { user: { id: 1 } };
      mockPostagemService.create.mockResolvedValue({ id: 1, ...dto });

      const result = await controller.create(req, dto);

      expect(service.create).toHaveBeenCalledWith(dto, 1);
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const posts = [{ id: 1, titulo: 'Teste' }];
      mockPostagemService.findAll.mockResolvedValue(posts);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(posts);
    });
  });

  describe('findOne', () => {
    it('should return a single post by id', async () => {
      const post = { id: 1, titulo: 'Teste' };
      mockPostagemService.findOne.mockResolvedValue(post);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(post);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const dto = { titulo: 'Novo Titulo' } as any;
      const req = { user: { id: 1 } };
      mockPostagemService.update.mockResolvedValue({ id: 1, ...dto });

      const result = await controller.update('1', dto, req);

      expect(service.update).toHaveBeenCalledWith(1, dto, 1);
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('like', () => {
    it('should like a post', async () => {
      const req = { user: { id: 1 } };
      mockPostagemService.like.mockResolvedValue({ id: 1, likes: 1 });

      const result = await controller.like('1', req);

      expect(service.like).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual({ id: 1, likes: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a post', async () => {
      const req = { user: { id: 1 } };
      mockPostagemService.remove.mockResolvedValue({ deleted: true });

      const result = await controller.remove('1', req);

      expect(service.remove).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual({ deleted: true });
    });
  });

  describe('like/dislike/getLikes', () => {
    const req = { user: { id: 2 } };

    it('like: deve chamar o serviço com ID da postagem e usuário', async () => {
      await controller.like('10', req);
      expect(service.like).toHaveBeenCalledWith(10, 2);
    });

    it('dislike: deve chamar o serviço com ID da postagem e usuário', async () => {
      await controller.Dislike('10', req);
      expect(service.dislike).toHaveBeenCalledWith(10, 2);
    });

    it('getLikes: deve chamar o serviço com ID da postagem e usuário', async () => {
      await controller.getLikes('10', req);
      expect(service.getLikes).toHaveBeenCalledWith(10, 2);
    });
  });
});
