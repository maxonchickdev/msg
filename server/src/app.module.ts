import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmailConfirmationModule } from './email-confirmation/email.confirmation.module';
import { MailModule } from './mail/mail.module';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from './redis/redis.module';
import { RegistrationModule } from './registration/registration.module';
import mailerConfig from './utils/config/mailer.config';
import typeormConfig from './utils/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig, mailerConfig],
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    RedisModule,
    MailModule,
    RegistrationModule,
    AuthModule,
    ProfileModule,
    EmailConfirmationModule,
  ],
})
export class AppModule {}
