import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './core/errors/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }))

  app.useGlobalFilters(
    new PrismaClientExceptionFilter()
  );
  
  app.use(cookieParser());
  
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true
  })
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
