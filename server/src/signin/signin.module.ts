import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/utils/repositories/user/user.module';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { GithubStrategy } from './strategies/github.signin.strategy';
import { GoogleStrategy } from './strategies/google.signin.strategy';
import { LocalStrategy } from './strategies/local.signin.strategy';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  controllers: [SigninController],
  providers: [SigninService, LocalStrategy, GoogleStrategy, GithubStrategy],
})
export class SigninModule {}
