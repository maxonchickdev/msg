import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { TwofaModule } from './twofa/twofa.module';
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
    SignupModule,
    SigninModule,
    ProfileModule,
    PrismaModule,
    TwofaModule,
  ],
})
export class AppModule {}
