import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PerfilService } from '../perfil/perfil.service';
import { Cargo, Campus, Curso, Departamento } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const mockPerfilService = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PerfilService, useValue: mockPerfilService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const registerData = {
      email: 'joao@aluno.unb.br',
      password: 'Senha@123',
      name: 'João Silva',
      cargo: Cargo.DISCENTE,
      curso: Curso.ENGENHARIA_DE_SOFTWARE,
      departamento: Departamento.FCTE,
      campus: Campus.GAMA,
    };

    it('should create a user and return it without senha', async () => {
      const createdPerfil = {
        id: 1,
        email: registerData.email,
        name: registerData.name,
        cargo: registerData.cargo,
        matricula: null,
        curso: registerData.curso,
      };

      mockPerfilService.findByEmail.mockResolvedValue(null);
      mockPerfilService.create.mockResolvedValue(createdPerfil);

      const result = await service.register(registerData);

      expect(mockPerfilService.findByEmail).toHaveBeenCalledWith(registerData.email);
      expect(mockPerfilService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: registerData.email,
          name: registerData.name,
          cargo: registerData.cargo,
        }),
      );
      expect(result).toEqual(createdPerfil);
    });

    it('should throw ConflictException if email already exists', async () => {
      mockPerfilService.findByEmail.mockResolvedValue({ id: 1 });

      await expect(service.register(registerData)).rejects.toThrow(ConflictException);
    });
  });

  describe('validateUser', () => {
    const email = 'joao@aluno.unb.br';
    const password = 'Senha@123';

    it('should return user without senha when credentials are valid', async () => {
      const hashed = await bcrypt.hash(password, 1);

      mockPerfilService.findByEmail.mockResolvedValue({
        id: 1,
        email,
        senha: hashed,
        name: 'João',
      });

      const result = await service.validateUser(email, password);

      expect(result).not.toBeNull();
      expect(result).not.toHaveProperty('senha');
      expect(result!.email).toBe(email);
    });

    it('should return null if user is not found', async () => {
      mockPerfilService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser(email, password);
      expect(result).toBeNull();
    });

    it('should return null if password is wrong', async () => {
      mockPerfilService.findByEmail.mockResolvedValue({
        id: 1,
        email,
        senha: await bcrypt.hash('correct-password', 1),
      });

      const result = await service.validateUser(email, 'wrong-password');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', () => {
      const user = { id: 1, email: 'joao@unb.br' };
      const result = service.login(user);

      expect(mockJwtService.sign).toHaveBeenCalledWith({
        sub: '1',
        email: user.email,
      });
      expect(result).toEqual({ access_token: 'mock-token' });
    });
  });
});
