import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { RegistrationModule } from './registration/registration.module';
import mailerConfig from './utils/config/mailer.config';
import { MailModule } from './utils/mail/mail.module';
import { RedisModule } from './utils/redis/redis.module';

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
    PrismaModule,
  ],
})
export class AppModule {}
