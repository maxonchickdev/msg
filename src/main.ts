import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('Users management system with login logic')
    .setVersion('0.0.1')
    .addTag('users')
    .addBearerAuth()
    .addCookieAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'UAS documentation',
  });

  await app.listen(8080);
}
bootstrap();
