import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/utils/repositories/user/user.module';
import { JwtTemporaryStrategy } from './strategies/jwt.temporary.strategy';
import { TwofaController } from './twofa.controller';
import { TwofaService } from './twofa.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        // expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10).toString() + 's',
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [TwofaController],
  providers: [TwofaService, JwtTemporaryStrategy],
})
export class TwofaModule {}
