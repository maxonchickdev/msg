import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as passport from 'passport'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session({
    secret: 'thesecret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000}
  }))
  app.use(passport.initialize())
  app.use(passport.session())
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
