import { existsSync } from 'node:fs';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LOCAL_UPLOAD_ROOT } from './storage/providers/local.provider';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? process.env.FRONTEND_URL ?? '*',
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Servir uploads locais em /uploads quando STORAGE_DRIVER=local.
  if (existsSync(LOCAL_UPLOAD_ROOT)) {
    app.useStaticAssets(LOCAL_UPLOAD_ROOT, { prefix: '/uploads/' });
  }

  const config = new DocumentBuilder()
    .setTitle('ConectaUnB API')
    .setDescription('API do ConectaUnB')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error(err);
});
