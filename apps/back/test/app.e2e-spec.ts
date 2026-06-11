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

  describe('Entidade endpoints', () => {
    it('POST /api/entidade should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/entidade')
        .send({
          nome: 'Test',
          classificacao: 'EMPRESA_JUNIOR',
          campus: 'GAMA',
          departamento: 'FCTE',
        })
        .expect(201)
        .expect('This action adds a new entidade');
    });

    it('GET /api/entidade should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/entidade')
        .expect(200)
        .expect('This action returns all entidade');
    });

    it('GET /api/entidade/:id should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/entidade/1')
        .expect(200)
        .expect('This action returns a #1 entidade');
    });

    it('PATCH /api/entidade/:id should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .patch('/api/entidade/1')
        .send({ nome: 'Updated' })
        .expect(200)
        .expect('This action updates a #1 entidade');
    });

    it('DELETE /api/entidade/:id should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .delete('/api/entidade/1')
        .expect(200)
        .expect('This action removes a #1 entidade');
    });
  });

  describe('Projeto endpoints', () => {
    it('POST /api/projeto should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/projeto')
        .send({
          idEntidade: 1,
          nome: 'Proj',
          status: 'EM_ANDAMENTO',
          dataInicio: '2026-01-01',
        })
        .expect(201)
        .expect('This action adds a new projeto');
    });

    it('GET /api/projeto should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/projeto')
        .expect(200)
        .expect('This action returns all projeto');
    });

    it('GET /api/projeto/:id should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/projeto/1')
        .expect(200)
        .expect('This action returns a #1 projeto');
    });

    it('DELETE /api/projeto/:id should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .delete('/api/projeto/1')
        .expect(200)
        .expect('This action removes a #1 projeto');
    });
  });

  describe('Postagem endpoints', () => {
    it('POST /api/postagem should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/postagem')
        .send({ idEntidade: 1, titulo: 'Post', conteudo: 'Content' })
        .expect(201)
        .expect('This action adds a new postagem');
    });

    it('GET /api/postagem should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/postagem')
        .expect(200)
        .expect('This action returns all postagem');
    });
  });

  describe('Processo Seletivo endpoints', () => {
    it('POST /api/processo-seletivo should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/processo-seletivo')
        .send({
          idEntidade: 1,
          titulo: 'PS',
          classificacao: 'ABERTA',
          inicioInscricao: '2026-01-01',
          fimInscricao: '2026-02-01',
        })
        .expect(201)
        .expect('This action adds a new processoSeletivo');
    });

    it('GET /api/processo-seletivo should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/processo-seletivo')
        .expect(200)
        .expect('This action returns all processoSeletivo');
    });
  });

  describe('Notificacao endpoints', () => {
    it('POST /api/notificacao should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/notificacao')
        .send({
          idEntidade: 1,
          tipo: 'NOVA_PUBLICACAO',
          mensagem: 'Test',
          referenciaId: 1,
        })
        .expect(201)
        .expect('This action adds a new notificacao');
    });

    it('GET /api/notificacao should return stub message', () => {
      return request(app.getHttpServer() as Server)
        .get('/api/notificacao')
        .expect(200)
        .expect('This action returns all notificacao');
    });
  });

  describe('Auth validation', () => {
    it('POST /api/auth/register should reject invalid email', () => {
      return request(app.getHttpServer() as Server)
        .post('/api/auth/register')
        .send({
          name: 'Test',
          email: 'invalid@gmail.com',
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
});
