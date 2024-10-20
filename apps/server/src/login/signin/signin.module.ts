import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../utils/repositories/user/user.module';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { GithubStrategy } from './strategies/github-signin.strategy';
import { GoogleStrategy } from './strategies/google-signin.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.token.strategy';
import { LocalStrategy } from './strategies/local-signin.strategy';
/**
 *
 *
 * @export
 * @class SigninModule
 */
@Module({
  imports: [UserModule, PassportModule, JwtModule],
  controllers: [SigninController],
  providers: [
    SigninService,
    LocalStrategy,
    GoogleStrategy,
    GithubStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class SigninModule {}
