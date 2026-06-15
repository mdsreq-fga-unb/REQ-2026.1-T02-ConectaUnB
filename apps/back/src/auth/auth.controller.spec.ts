import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Cargo, Campus, Curso, Departamento } from '@prisma/client';

const mockAuthService = {
  register: jest.fn(),
  validateUser: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /auth/register', () => {
    const registerDto = {
      email: 'joao@aluno.unb.br',
      senha: 'Senha@123',
      name: 'João Silva',
      cargo: Cargo.DISCENTE,
      curso: Curso.ENGENHARIA_DE_SOFTWARE as Curso,
      departamento: Departamento.FCTE as Departamento,
      campus: Campus.GAMA as Campus,
    };

    it('should register a new user', async () => {
      const expectedResult = {
        id: 1,
        email: registerDto.email,
        name: registerDto.name,
        cargo: registerDto.cargo,
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);

      expect(mockAuthService.register).toHaveBeenCalledWith({
        email: registerDto.email,
        password: registerDto.senha,
        name: registerDto.name,
        cargo: registerDto.cargo,
        curso: registerDto.curso,
        departamento: registerDto.departamento,
        campus: registerDto.campus,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('POST /auth/login', () => {
    const loginDto = { email: 'joao@unb.br', senha: 'Senha@123' };

    it('should return access token when credentials are valid', async () => {
      const user = { id: 1, email: loginDto.email };
      const tokenResult = { access_token: 'mock-token' };

      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockReturnValue(tokenResult);

      const result = await controller.login(loginDto);

      expect(mockAuthService.validateUser).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.senha,
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(user);
      expect(result).toEqual(tokenResult);
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      mockAuthService.validateUser.mockResolvedValue(null);

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('GET /auth/me', () => {
    it('should return the authenticated user', () => {
      const req = { user: { id: '1', email: 'joao@unb.br' } };
      const result = controller.me(req as any);

      expect(result).toEqual({ id: '1', email: 'joao@unb.br' });
    });
  });
});
