import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3005',
      'http://localhost:4200',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
    credentials: true, // Allow sending cookies and authentication headers
  });
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
