import { Module } from '@nestjs/common';
import { MailModule } from '../utils/mail/mail.module';
import { RedisModule } from '../utils/redis/redis.module';
import { UserModule } from '../utils/repositories/user/user.module';
import { SignupController } from './signup.controller';
import { RegistrationService } from './signup.service';

@Module({
  imports: [UserModule, MailModule, RedisModule],
  providers: [RegistrationService],
  controllers: [SignupController],
})
export class SignupModule {}
