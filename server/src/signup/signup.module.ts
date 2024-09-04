import { Module } from '@nestjs/common';
import { MailModule } from 'src/utils/mail/mail.module';
import { RedisModule } from 'src/utils/redis/redis.module';
import { UserModule } from 'src/utils/repositories/user/user.module';
import { SignupController } from './signup.controller';
import { RegistrationService } from './signup.service';

@Module({
  imports: [UserModule, MailModule, RedisModule],
  providers: [RegistrationService],
  controllers: [SignupController],
})
export class SignupModule {}
