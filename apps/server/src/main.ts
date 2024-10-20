import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create<INestApplication>(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: [config.get<string>('CLIENT_ORIGIN')],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('MSG api')
    .setDescription('MSG api description')
    .setVersion('0.0.1')
    .addServer(
      `http://${config.get<string>('SERVER_HOST')}:${config.get<string>(
        'SERVER_APP_PORT'
      )}/`,
      'Local environment'
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'MSG api',
  });

  await app.listen(config.get<number>('SERVER_APP_PORT'));

  logger.log(
    'Server is running on port ' + config.get<number>('SERVER_APP_PORT')
  );
}

bootstrap();
