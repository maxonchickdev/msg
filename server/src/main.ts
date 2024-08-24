import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { setup } from './utils/config/setup';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<INestApplication>(AppModule);

  app.use(
    '/docs*',
    basicAuth({
      challenge: true,
      users: {
        maxondev: process.env.SWAGGER_PASSWORD.toString(),
      },
    }),
  );

  app.enableCors({
    origin: [process.env.CLIENT_ORIGIN],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  setup(app);
  await app.listen(8080);
  logger.log('🚀 Application running');
}

bootstrap();
