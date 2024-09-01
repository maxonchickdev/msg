import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { GithubStrategy } from './strategies/github.signin.strategy';
import { GoogleStrategy } from './strategies/google.signin.strategy';
import { LocalStrategy } from './strategies/local.signin.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN'), 10),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SigninService, LocalStrategy, GoogleStrategy, GithubStrategy],
  controllers: [SigninController],
})
export class SigninModule {}
