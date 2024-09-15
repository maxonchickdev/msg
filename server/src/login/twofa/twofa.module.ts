import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import jwtConfig from 'src/utils/configs/jwt.config'
import { UserModule } from 'src/utils/repositories/user/user.module'
import { JwtTwofaStrategy } from './strategies/jwt.twofa.strategy'
import { TwofaController } from './twofa.controller'
import { TwofaService } from './twofa.service'

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.signOptions.expiresIn'),
        }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TwofaController],
  providers: [TwofaService, JwtTwofaStrategy],
})
export class TwofaModule {}
