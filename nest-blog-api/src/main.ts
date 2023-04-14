import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  await app.listen(config.get('app.port'));
}

bootstrap();
