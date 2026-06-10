import { Test, TestingModule } from '@nestjs/testing';
import { PerfilController } from './perfil.controller';
import { PerfilService } from './perfil.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PerfilController', () => {
  let controller: PerfilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerfilController],
      providers: [PerfilService, PrismaService],
    }).compile();

    controller = module.get<PerfilController>(PerfilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
