import { Module } from '@nestjs/common';
import { MailModule } from 'src/utils/mail/mail.module';
import { RedisModule } from 'src/utils/redis/redis.module';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { SignupController } from './signup.controller';
import { RegistrationService } from './signup.service';

@Module({
  imports: [UsersModule, MailModule, RedisModule],
  providers: [RegistrationService],
  controllers: [SignupController],
})
export class SignupModule {}
