import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/utils/constants/constants';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { SigninController } from './signin.controller';
import { SigninService } from './signin.service';
import { GithubStrategy } from './strategies/github.signin.strategy';
import { GoogleStrategy } from './strategies/google.signin.strategy';
import { LocalStrategy } from './strategies/local.sgnin.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretOrKey,
      signOptions: { expiresIn: 5 * 60 },
    }),
    UsersModule,
  ],
  providers: [
    SigninService,
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
  ],
  controllers: [SigninController],
})
export class SigninModule {}
