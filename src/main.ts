import 'dotenv/config';

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule } from '@nestjs/swagger';
import { config } from './helpers/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector))
  );
  await app.listen(PORT);
}

bootstrap();
