import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailConfirmationModule } from './email-confirmation/email.confirmation.module';
import { MailModule } from './mail/mail.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { RedisModule } from './redis/redis.module';
import { RegistrationModule } from './registration/registration.module';
import mailerConfig from './utils/config/mailer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailerConfig],
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    RedisModule,
    MailModule,
    RegistrationModule,
    AuthModule,
    ProfileModule,
    EmailConfirmationModule,
    PrismaModule,
  ],
})
export class AppModule {}
