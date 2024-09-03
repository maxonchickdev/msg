import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy],
})
export class ProfileModule {}
