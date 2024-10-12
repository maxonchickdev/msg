import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SigninModule } from './login/signin/signin.module'
import { TwofaModule } from './login/twofa/twofa.module'
import { ProfileModule } from './profile/profile.module'
import { SignupModule } from './signup/signup.module'
import { MailModule } from './utils/mail/mail.module'
import { PrismaModule } from './utils/prisma/prisma.module'
import { RedisModule } from './utils/redis/redis.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['development.env', 'production.env'],
      isGlobal: true
    }),
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
