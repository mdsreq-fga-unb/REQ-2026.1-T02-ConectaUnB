import { Test, TestingModule } from '@nestjs/testing';
import { PerfilService } from './perfil.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  perfil: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PerfilService', () => {
  let service: PerfilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PerfilService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PerfilService>(PerfilService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of perfis', async () => {
      const perfis = [
        { id: 1, email: 'a@aluno.unb.br', name: 'A' },
        { id: 2, email: 'b@aluno.unb.br', name: 'B' },
      ];
      mockPrisma.perfil.findMany.mockResolvedValue(perfis);

      const result = await service.findAll();
      expect(result).toEqual(perfis);
      expect(mockPrisma.perfil.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a perfil when found', async () => {
      const perfil = { id: 1, email: 'a@aluno.unb.br', name: 'A' };
      mockPrisma.perfil.findUnique.mockResolvedValue(perfil);

      const result = await service.findOne(1);
      expect(result).toEqual(perfil);
      expect(mockPrisma.perfil.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null when not found', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a perfil when email exists', async () => {
      const perfil = { id: 1, email: 'a@aluno.unb.br', name: 'A' };
      mockPrisma.perfil.findUnique.mockResolvedValue(perfil);

      const result = await service.findByEmail('a@aluno.unb.br');
      expect(result).toEqual(perfil);
      expect(mockPrisma.perfil.findUnique).toHaveBeenCalledWith({
        where: { email: 'a@aluno.unb.br' },
      });
    });

    it('should return null when email does not exist', async () => {
      mockPrisma.perfil.findUnique.mockResolvedValue(null);

      const result = await service.findByEmail('none@aluno.unb.br');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a perfil', async () => {
      const data = {
        email: 'new@aluno.unb.br',
        senha: 'hashed',
        name: 'New User',
        cargo: 'DISCENTE' as any,
        campus: 'GAMA' as any,
        curso: 'ENGENHARIA_DE_SOFTWARE' as any,
        departamento: 'FCTE' as any,
      };
      const created = { id: 1, ...data };
      mockPrisma.perfil.create.mockResolvedValue(created);

      const result = await service.create(data);
      expect(result).toEqual(created);
      expect(mockPrisma.perfil.create).toHaveBeenCalledWith({ data });
    });
  });

  describe('update', () => {
    it('should update and return the perfil', async () => {
      const dto = { name: 'Updated' };
      const updated = { id: 1, email: 'a@aluno.unb.br', name: 'Updated' };
      mockPrisma.perfil.update.mockResolvedValue(updated);

      const result = await service.update(1, dto);
      expect(result).toEqual(updated);
      expect(mockPrisma.perfil.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete and return the perfil', async () => {
      const deleted = { id: 1, email: 'a@aluno.unb.br', name: 'A' };
      mockPrisma.perfil.delete.mockResolvedValue(deleted);

      const result = await service.remove(1);
      expect(result).toEqual(deleted);
      expect(mockPrisma.perfil.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
