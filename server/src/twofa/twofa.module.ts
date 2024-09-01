import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { JwtTemporaryStrategy } from './strategies/jwt.temporary.strategy';
import { TwofaController } from './twofa.controller';
import { TwofaService } from './twofa.service';

@Module({
  imports: [
    UsersModule,
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
  controllers: [TwofaController],
  providers: [TwofaService, JwtTemporaryStrategy],
})
export class TwofaModule {}
