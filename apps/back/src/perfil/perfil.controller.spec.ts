import { Test, TestingModule } from '@nestjs/testing';
import { PerfilController } from './perfil.controller';
import { PerfilService } from './perfil.service';
import { StorageService } from '../storage/storage.service';

const mockPerfil = {
  id: 1,
  nome: 'Usuário Teste',
  email: 'usuario.teste@exemplo.com',
  matricula: '123456789',
  curso: 'ENGENHARIA_DE_SOFTWARE',
  campus: 'GAMA',
  cargo: 'DISCENTE',
  departamento: 'FCTE',
  createdAt: new Date(),
};

const mockPerfilService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findSeguindo: jest.fn(),
};

describe('PerfilController', () => {
  let controller: PerfilController;
  let service: PerfilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilController],
      providers: [
        { provide: PerfilService, useValue: mockPerfilService },
        {
          provide: StorageService,
          useValue: {
            upload: jest.fn(),
            delete: jest.fn(),
            getUsage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PerfilController>(PerfilController);
    service = module.get<PerfilService>(PerfilService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar um array de perfis', async () => {
      mockPerfilService.findAll.mockResolvedValue([mockPerfil]);

      const result = await controller.findAll();

      expect(result).toEqual([mockPerfil]);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('deve retornar um único perfil pelo ID', async () => {
      // ...
    await controller.findOne(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('findSeguindo', () => {
    it('deve retornar as entidades seguidas pelo perfil', async () => {
      await controller.findSeguindo(1); // Mande o número diretamente!
      expect(service.findSeguindo).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('deve atualizar o perfil usando o ID extraído do token (req.user)', async () => {
      const updateDto = { nome: 'Usuário Teste Atualizado' };

      const mockReq = { user: { id: '1' } };

      const perfilAtualizado = { ...mockPerfil, ...updateDto };
      mockPerfilService.update.mockResolvedValue(perfilAtualizado);

      const result = await controller.update(mockReq, updateDto as any);

      expect(result).toEqual(perfilAtualizado);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('deve remover o perfil usando o ID extraído do token (req.user)', async () => {
      const mockReq = { user: { id: '1' } };

      mockPerfilService.remove.mockResolvedValue(mockPerfil);

      const result = await controller.remove(mockReq);

      expect(result).toEqual(mockPerfil);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
