import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { RedisModule } from 'src/redis/redis.module';
import { UsersModule } from 'src/repositories/users/users.module';
import { EmailConfirmationController } from './confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';

@Module({
  imports: [UsersModule, RedisModule, MailModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
