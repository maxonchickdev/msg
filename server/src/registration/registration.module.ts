import { Module } from '@nestjs/common';
import { MailModule } from 'src/utils/mail/mail.module';
import { RedisModule } from 'src/utils/redis/redis.module';
import { UsersModule } from 'src/utils/repositories/users/users.module';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [UsersModule, MailModule, RedisModule],
  providers: [RegistrationService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
