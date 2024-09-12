import { Module } from '@nestjs/common';
import { SigninModule } from './login/signin/signin.module';
import { TwofaModule } from './login/twofa/twofa.module';
import { ProfileModule } from './profile/profile.module';
import { SignupModule } from './signup/signup.module';
import { MailModule } from './utils/mail/mail.module';
import { PrismaModule } from './utils/prisma/prisma.module';
import { RedisModule } from './utils/redis/redis.module';

@Module({
  imports: [
    RedisModule,
    MailModule,
    SignupModule,
    SigninModule,
    TwofaModule,
    PrismaModule,
    ProfileModule,
  ],
})
export class AppModule {}
