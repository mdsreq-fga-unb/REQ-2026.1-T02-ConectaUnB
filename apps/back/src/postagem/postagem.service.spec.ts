import { Test, TestingModule } from '@nestjs/testing';
import { PostagemService } from './postagem.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PostagemService', () => {
  let service: PostagemService;
  let prisma: PrismaService;

const mockPrisma = {
    postagem: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    perfil: { findUnique: jest.fn() },
    entidade: { findUnique: jest.fn() },
    membro: { findUnique: jest.fn(), findFirst: jest.fn() }, 
    curtidas: {
      create: jest.fn(),
      deleteMany: jest.fn(),
      count: jest.fn(),
      findFirst: jest.fn(),
    },
    notificacao: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostagemService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PostagemService>(PostagemService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('deve lançar erro se a classificação não for GESTOR ou CO-GESTOR', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      // CORREÇÃO: trocado para findFirst
      mockPrisma.membro.findFirst.mockResolvedValue({ classificacao: 'MEMBRO' }); 

      await expect(service.validateUser(1, 1)).rejects.toThrow('Usuário não autorizado para esta ação');
    });

    it('deve retornar true se o usuário for GESTOR', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      // CORREÇÃO: trocado para findFirst
      mockPrisma.membro.findFirst.mockResolvedValue({ classificacao: 'GESTOR' });

      const result = await service.validateUser(1, 1);
      expect(result).toBe(true);
    });

    it('deve retornar true se o usuário for CO_GESTOR', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      // CORREÇÃO: trocado para findFirst
      mockPrisma.membro.findFirst.mockResolvedValue({ classificacao: 'CO_GESTOR' });

      const result = await service.validateUser(1, 1);
      expect(result).toBe(true);
    });

    it('deve retornar true se o usuário for CO_GESTOR', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.entidade.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.membro.findUnique.mockResolvedValue({ classificacao: 'CO_GESTOR' });

      const result = await service.validateUser(1, 1);
      expect(result).toBe(true);
    });
  });

  describe('create', () => {
    it('deve criar a postagem se o usuário for validado', async () => {
      // Isolamos a lógica interna de validação usando spyOn
      jest.spyOn(service, 'validateUser').mockResolvedValue(true);
      
      const createDto = { titulo: 'Atualização Conecta UnB', conteudo: 'Novidades', idEntidade: 2 } as any;
      const mockResult = { id: 10, ...createDto };
      mockPrisma.postagem.create.mockResolvedValue(mockResult);

      const result = await service.create(createDto, 1);

      expect(service.validateUser).toHaveBeenCalledWith(1, 2);
      expect(mockPrisma.postagem.create).toHaveBeenCalledWith({ data: createDto });
      expect(result).toEqual(mockResult);
    });

    it('deve bloquear a criação se a validação falhar', async () => {
      jest.spyOn(service, 'validateUser').mockRejectedValue(new Error('Usuário não autorizado para esta ação'));
      
      const createDto = { titulo: 'Projeto FGM', idEntidade: 3 } as any;

      await expect(service.create(createDto, 1)).rejects.toThrow('Usuário não autorizado para esta ação');
      expect(mockPrisma.postagem.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll & findOne', () => {
    it('findAll: deve retornar uma lista de postagens', async () => {
      mockPrisma.postagem.findMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);
      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(mockPrisma.postagem.findMany).toHaveBeenCalled();
    });

    it('findOne: deve retornar uma postagem específica', async () => {
      mockPrisma.postagem.findUnique.mockResolvedValue({ id: 5 });
      const result = await service.findOne(5);
      expect(result.id).toBe(5);
      expect(mockPrisma.postagem.findUnique).toHaveBeenCalledWith({ where: { id: 5 } });
    });
  });

  describe('update', () => {
    it('deve atualizar a postagem se o usuário tiver permissão na entidade', async () => {
      // Mock do findUnique interno para pegar o idEntidade
      mockPrisma.postagem.findUnique.mockResolvedValue({ id: 1, idEntidade: 5 });
      jest.spyOn(service, 'validateUser').mockResolvedValue(true);
      
      const updateDto = { conteudo: 'Conteúdo atualizado' } as any;
      mockPrisma.postagem.update.mockResolvedValue({ id: 1, ...updateDto });

      const result = await service.update(1, updateDto, 2);

      expect(service.validateUser).toHaveBeenCalledWith(2, 5);
      expect(mockPrisma.postagem.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result.conteudo).toBe('Conteúdo atualizado');
    });
  });

  describe('remove', () => {
    it('deve remover a postagem se o usuário tiver permissão', async () => {
      mockPrisma.postagem.findUnique.mockResolvedValue({ id: 1, idEntidade: 5 });
      jest.spyOn(service, 'validateUser').mockResolvedValue(true);
      mockPrisma.postagem.delete.mockResolvedValue({ id: 1 });

      await service.remove(1, 2);

      expect(mockPrisma.postagem.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('Curtidas (like / dislike / getLikes)', () => {
    it('like: deve registrar uma curtida', async () => {
      mockPrisma.curtidas.create.mockResolvedValue({ id: 1, idPostagem: 10, idPerfil: 2 });
      await service.like(10, 2);
      expect(mockPrisma.curtidas.create).toHaveBeenCalledWith({
        data: { idPostagem: 10, idPerfil: 2 },
      });
    });

    it('dislike: deve remover a curtida', async () => {
      mockPrisma.curtidas.deleteMany.mockResolvedValue({ count: 1 });
      await service.dislike(10, 2);
      expect(mockPrisma.curtidas.deleteMany).toHaveBeenCalledWith({
        where: { idPostagem: 10, idPerfil: 2 },
      });
    });

    it('getLikes: deve retornar a contagem e usuarioCurtiu como true se existir registro', async () => {
      mockPrisma.curtidas.count.mockResolvedValue(15);
      mockPrisma.curtidas.findFirst.mockResolvedValue({ id: 1 }); // Retornou um registro

      const result = await service.getLikes(10, 2);

      expect(result).toEqual({ numeroCurtidas: 15, usuarioCurtiu: true });
    });

    it('getLikes: deve retornar a contagem e usuarioCurtiu como false se não existir registro', async () => {
      mockPrisma.curtidas.count.mockResolvedValue(15);
      mockPrisma.curtidas.findFirst.mockResolvedValue(null); // Nenhum registro encontrado

      const result = await service.getLikes(10, 2);

      expect(result).toEqual({ numeroCurtidas: 15, usuarioCurtiu: false });
    });
  });
});