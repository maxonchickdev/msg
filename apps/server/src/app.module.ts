import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SigninModule } from './login/signin/signin.module'
import { TwofaModule } from './login/twofa/twofa.module'
import { ProfileModule } from './profile/profile.module'
import { SignupModule } from './signup/signup.module'
import githubConfig from './utils/configs/github.config'
import googleConfig from './utils/configs/google.config'
import hashConfig from './utils/configs/hash.config'
import jwtConfig from './utils/configs/jwt.config'
import mailerConfig from './utils/configs/mailer.config'
import redisConfig from './utils/configs/redis.config'
import { MailModule } from './utils/mail/mail.module'
import { PrismaModule } from './utils/prisma/prisma.module'
import { RedisModule } from './utils/redis/redis.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.serve.development', '.env.serve.production'],
      isGlobal: true,
      load: [
        githubConfig,
        googleConfig,
        jwtConfig,
        mailerConfig,
        redisConfig,
        hashConfig,
      ],
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
