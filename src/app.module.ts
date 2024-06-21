import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { MailController } from './mail/mail.controller'
import { MailModule } from './mail/mail.module'
import { MailService } from './mail/mail.service'
import { User } from './users/user.entity'
import { UsersController } from './users/users.controller'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
    MailModule,
  ],
  controllers: [AppController, UsersController, AuthController, MailController],

  providers: [MailService],
})
export class AppModule {}
