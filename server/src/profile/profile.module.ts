import { Module } from '@nestjs/common';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy],
})
export class ProfileModule {}
