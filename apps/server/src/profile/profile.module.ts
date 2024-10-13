import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { MulterModule } from '@nestjs/platform-express'
import jwtConfig from '../utils/configs/jwt.config'
import { AvatarModule } from '../utils/repositories/avatar/avatar.module'
import { UserModule } from '../utils/repositories/user/user.module'
import { S3Module } from '../utils/s3/s3.module'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { JwtMainStrategy } from './strategies/jwt.main.strategy'

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    MulterModule,
    UserModule,
    AvatarModule,
    S3Module,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.signOptions.expiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtMainStrategy],
})
export class ProfileModule {}
