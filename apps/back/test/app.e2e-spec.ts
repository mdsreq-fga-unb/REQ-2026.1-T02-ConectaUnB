import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Server } from 'http';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterEach(async () => {
    if (app && typeof app.close === 'function') {
      await app.close();
    }
  });

  describe('Health', () => {
    it('/api/health (GET) should return ok', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/health')
        .expect(200)
        .expect({ status: 'ok' });
    });
  });

  describe('Auth validation', () => {
    it('POST /api/auth/register should reject non-UnB email', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/auth/register')
        .send({
          name: 'Teste Usuario',
          email: 'invalid@gmail.com',
          senha: 'Senha@123',
          cargo: 'DISCENTE',
          curso: 'ENGENHARIA_DE_SOFTWARE',
          departamento: 'FCTE',
          campus: 'GAMA',
          matricula: '123456789',
        })
        .expect(400);
    });

    it('POST /api/auth/register should reject discente email without @aluno.unb.br', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/auth/register')
        .send({
          name: 'Teste Usuario',
          email: 'student@unb.br',
          senha: 'Senha@123',
          cargo: 'DISCENTE',
          curso: 'ENGENHARIA_DE_SOFTWARE',
          departamento: 'FCTE',
          campus: 'GAMA',
          matricula: '123456789',
        })
        .expect(400);
    });

    it('POST /api/auth/register should reject weak password', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/auth/register')
        .send({
          name: 'Teste Usuario',
          email: 'student@aluno.unb.br',
          senha: '123',
          cargo: 'DISCENTE',
          curso: 'ENGENHARIA_DE_SOFTWARE',
          departamento: 'FCTE',
          campus: 'GAMA',
          matricula: '123456789',
        })
        .expect(400);
    });

    it('POST /api/auth/register should reject discente without matricula', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/auth/register')
        .send({
          name: 'Teste Usuario',
          email: 'student@aluno.unb.br',
          senha: 'Senha@123',
          cargo: 'DISCENTE',
          curso: 'ENGENHARIA_DE_SOFTWARE',
          departamento: 'FCTE',
          campus: 'GAMA',
        })
        .expect(400);
    });

    it('POST /api/auth/register should reject missing fields', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/auth/register')
        .send({})
        .expect(400);
    });

    it('POST /api/auth/login should reject missing fields', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/auth/login')
        .send({})
        .expect(400);
    });

    it('GET /api/auth/me should return 401 without token', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/auth/me')
        .expect(401);
    });

    it('GET /api/auth/me should return 401 with invalid token', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('Protected endpoints require authentication', () => {
    it('POST /api/entidade should return 401 without token', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/entidade')
        .send({
          nome: 'Test',
          classificacao: 'EMPRESA_JUNIOR',
          campus: 'GAMA',
          departamento: 'FCTE',
        })
        .expect(401);
    });

    it('GET /api/entidade/minhas should return 401 without token', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/entidade/minhas')
        .expect(401);
    });

    it('POST /api/projeto should return 401 without token', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/projeto')
        .send({ idEntidade: 1, nome: 'Proj', status: 'EM_ANDAMENTO' })
        .expect(401);
    });

    it('POST /api/postagem should return 401 without token', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/postagem')
        .send({ idEntidade: 1, titulo: 'Post', conteudo: 'Content' })
        .expect(401);
    });

    it('GET /api/notificacao should return 401 without token', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/notificacao')
        .expect(401);
    });

    it('POST /api/processo-seletivo should return 401 without token', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/processo-seletivo')
        .send({
          idEntidade: 1,
          titulo: 'PS',
          classificacao: 'ABERTA',
          inicioInscricao: '2026-01-01',
          fimInscricao: '2026-02-01',
        })
        .expect(401);
    });
  });
});
