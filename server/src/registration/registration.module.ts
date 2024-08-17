import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { RedisModule } from 'src/redis/redis.module';
import { UsersModule } from 'src/repositories/users/users.module';
import { GoogleStrategy } from 'src/utils/strategies/google.strategy';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [UsersModule, MailModule, RedisModule],
  providers: [RegistrationService, GoogleStrategy],
  controllers: [RegistrationController],
  exports: [RegistrationService],
})
export class RegistrationModule {}
