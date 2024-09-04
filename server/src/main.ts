import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { setup } from './utils/config/swagger.config';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create<INestApplication>(AppModule);

  app.enableCors({
    origin: [process.env.CLIENT_ORIGIN.toString()],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.use(cookieParser());

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  setup(app);
  await app.listen(8080);
  logger.log('🚀 Application running');
}

bootstrap();
