import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/utils/repositories/user/user.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtStrategy } from './strategies/jwt.strategy';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET.toString(),
      signOptions: {
        expiresIn: '1d',
        // expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10).toString() + 's',
      },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy],
})
export class ProfileModule {}
