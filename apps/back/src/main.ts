import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NextFunction, Request, Response } from 'express';

function loadEnvironmentFile() {
  const rootDirectory = process.env.INIT_CWD ?? process.cwd();
  const candidates = [resolve(rootDirectory, '.env')];

  for (const filePath of candidates) {
    if (!existsSync(filePath)) {
      continue;
    }

    const envContent = readFileSync(filePath, 'utf8');

    for (const line of envContent.split(/\r?\n/)) {
      const trimmedLine = line.trim();

      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }

      const separatorIndex = trimmedLine.indexOf('=');

      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }

    break;
  }
}

function protectSwaggerWithBasicAuth(username: string, password: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader?.startsWith('Basic ')) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Docs"');
      res.status(401).send('Authentication required.');
      return;
    }

    const credentials = Buffer.from(
      authorizationHeader.slice(6),
      'base64',
    ).toString('utf8');
    const separatorIndex = credentials.indexOf(':');

    if (separatorIndex === -1) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Docs"');
      res.status(401).send('Invalid credentials format.');
      return;
    }

    const requestUsername = credentials.slice(0, separatorIndex);
    const requestPassword = credentials.slice(separatorIndex + 1);

    if (requestUsername !== username || requestPassword !== password) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Swagger Docs"');
      res.status(401).send('Invalid credentials.');
      return;
    }

    next();
  };
}

async function bootstrap() {
  loadEnvironmentFile();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const nodeEnvironment = process.env.NODE_ENV ?? 'development';
  const swaggerEnabled =
    process.env.SWAGGER_ENABLED === 'true' || nodeEnvironment === 'development';

  if (swaggerEnabled) {
    if (nodeEnvironment !== 'development') {
      const swaggerUsername = process.env.SWAGGER_USER;
      const swaggerPassword = process.env.SWAGGER_PASSWORD;

      if (swaggerUsername && swaggerPassword) {
        const basicAuthMiddleware = protectSwaggerWithBasicAuth(
          swaggerUsername,
          swaggerPassword,
        );
        app.use(`/${globalPrefix}/docs`, basicAuthMiddleware);
        app.use(`/${globalPrefix}/docs-json`, basicAuthMiddleware);
      }
    }

    const config = new DocumentBuilder()
      .setTitle('Conecta UnB')
      .setDescription('API do Conecta UnB')
      .setVersion(process.env.npm_package_version ?? '0.0.1')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
