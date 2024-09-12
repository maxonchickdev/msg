import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

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

  const config = new DocumentBuilder()
    .setTitle('MSG api')
    .setDescription('MSG api description')
    .setVersion('0.0.1')
    .addServer(
      `http://${process.env.SERVER_HOST}:${process.env.SERVER_APP_PORT}/`,
      'Local environment',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'MSG api',
  });

  await app.listen(parseInt(process.env.SERVER_APP_PORT));
  logger.log('🚀 Application running');
}

bootstrap();
