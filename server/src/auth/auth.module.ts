import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/utils/constants/constants';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './signin-strategies/github.signin.strategy';
import { GoogleStrategy } from './signin-strategies/google.signin.strategy';
import { JwtStrategy } from './signin-strategies/jwt.signin.strategy';
import { LocalStrategy } from './signin-strategies/local.sgnin.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretOrKey,
      signOptions: { expiresIn: 5 * 60 },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'LocalStrategy',
      useClass: LocalStrategy,
    },
    {
      provide: 'GoogleStrategy',
      useClass: GoogleStrategy,
    },
    {
      provide: 'GithubStrategy',
      useClass: GithubStrategy,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
