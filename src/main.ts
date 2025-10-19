import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './interceptors/wrap-data/wrap-data.interceptor';
import { CustomExceptionFilter } from './filters/custom-exception/custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  /**
   * This interceptor transforms all responses to follow a consistent format.
   * Example:
   * {
   *   status: 'success',
   *   timestamp: '2022-04-22T12:00:00.000Z',
   *   data: {...}
   * }
   */
  app.useGlobalInterceptors(new WrapDataInterceptor());

  app.useGlobalFilters(new CustomExceptionFilter());

  app.setGlobalPrefix('api/v1');

  const configSwagger = new DocumentBuilder()
    .setTitle(' Restaurant Management API Documentation')
    .setDescription('API documentation for restaurant and user features')
    .setVersion('1.0')
    .addTag('Restaurants')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
