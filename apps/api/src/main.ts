import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //define o prefixo global para as rotas da API
  app.setGlobalPrefix('/api');

  //habilita o CORS para permitir requisições do front
  app.enableCors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //inicia o servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
