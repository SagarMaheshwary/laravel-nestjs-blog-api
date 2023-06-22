import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // tranform payloads according to their DTOs.
      whitelist: true, // strip out properties that do not have validation decorators
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory(errors) {
        let _errors = {};

        errors.forEach((error) => {
          _errors[error.property] = Object.values(error.constraints);
        });

        throw new UnprocessableEntityException({ errors: _errors });
      },
    }),
  );

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  const port = config.get('app.port') || 3000;

  await app.listen(port, () => console.log(`SERVER STARTED ON PORT: ${port}`));
}

bootstrap();
