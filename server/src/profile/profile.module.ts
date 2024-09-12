import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import { AvatarModule } from 'src/utils/repositories/avatar/avatar.module';
import { UserModule } from 'src/utils/repositories/user/user.module';
import { S3Module } from 'src/utils/s3/s3.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtMainStrategy } from './strategies/jwt.main.strategy';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    MulterModule,
    UserModule,
    AvatarModule,
    S3Module,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10) + 's',
      },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtMainStrategy],
})
export class ProfileModule {}
