import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtPassportStrategy } from 'src/auth/passport-strategies/jwt.strategy';
import { LocalPassportStrategy } from 'src/auth/passport-strategies/local.strategy';
import { UsersModule } from 'src/repositories/users/users.module';
import { jwtConstants } from 'src/utils/constants/constants';
import { GoogleAuthStrategy } from './auth-strategies/google.auth.strategy';
import { LocalAuthStrategy } from './auth-strategies/local.auth.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GooglePassportStrategy } from './passport-strategies/google.strategy';

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
    JwtPassportStrategy,
    LocalPassportStrategy,
    GooglePassportStrategy,
    {
      provide: 'GoogleAuthStrategy',
      useClass: GoogleAuthStrategy,
    },
    {
      provide: 'LocalAuthStrategy',
      useClass: LocalAuthStrategy,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
