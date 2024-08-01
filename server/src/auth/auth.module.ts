import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from 'src/utils/constants/constants';
import { RegistrationModule } from 'src/registration/registration.module';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';
import { LocalStrategy } from 'src/utils/strategies/local.strategy';
import { GoogleStrategy } from 'src/utils/strategies/google.strategy';
import { UsersModule } from 'src/repositories/users/users.module';

@Module({
  imports: [
    UsersModule,
    RegistrationModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secretOrKey,
      signOptions: { expiresIn: 10 },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
