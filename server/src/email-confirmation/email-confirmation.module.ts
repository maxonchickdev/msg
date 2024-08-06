import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';
import { UsersModule } from 'src/repositories/users/users.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [UsersModule, RedisModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
