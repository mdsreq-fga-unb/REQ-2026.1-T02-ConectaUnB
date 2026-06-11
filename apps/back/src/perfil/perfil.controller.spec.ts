import { Test, TestingModule } from '@nestjs/testing';
import { PerfilController } from './perfil.controller';
import { PerfilService } from './perfil.service';

const mockPerfilService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PerfilController', () => {
  let controller: PerfilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilController],
      providers: [{ provide: PerfilService, useValue: mockPerfilService }],
    }).compile();

    controller = module.get<PerfilController>(PerfilController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /perfil', () => {
    it('should return all perfis', async () => {
      const perfis = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ];
      mockPerfilService.findAll.mockResolvedValue(perfis);

      const result = await controller.findAll();
      expect(result).toEqual(perfis);
      expect(mockPerfilService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /perfil/:id', () => {
    it('should return a single perfil', async () => {
      const perfil = { id: 1, name: 'A' };
      mockPerfilService.findOne.mockResolvedValue(perfil);

      const result = await controller.findOne('1');
      expect(result).toEqual(perfil);
      expect(mockPerfilService.findOne).toHaveBeenCalledWith(1);
    });

    it('should convert string id to number', async () => {
      mockPerfilService.findOne.mockResolvedValue(null);
      await controller.findOne('42');
      expect(mockPerfilService.findOne).toHaveBeenCalledWith(42);
    });
  });

  describe('PATCH /perfil/:id', () => {
    it('should update a perfil', async () => {
      const dto = { name: 'Updated' };
      const updated = { id: 1, name: 'Updated' };
      mockPerfilService.update.mockResolvedValue(updated);

      const result = await controller.update('1', dto);
      expect(result).toEqual(updated);
      expect(mockPerfilService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('DELETE /perfil/:id', () => {
    it('should delete a perfil', async () => {
      const deleted = { id: 1, name: 'A' };
      mockPerfilService.remove.mockResolvedValue(deleted);

      const result = await controller.remove('1');
      expect(result).toEqual(deleted);
      expect(mockPerfilService.remove).toHaveBeenCalledWith(1);
    });
  });
});
