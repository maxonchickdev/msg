import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { UsersModule } from 'src/repositories/users/users.module';
import { MailModule } from 'src/mail/mail.module';
import { GoogleStrategy } from 'src/utils/strategies/google.strategy';
import { ConfirmationCodeModule } from 'src/repositories/confirmation-code/confirmation-code.module';

@Module({
  imports: [UsersModule, MailModule, ConfirmationCodeModule],
  providers: [RegistrationService, GoogleStrategy],
  controllers: [RegistrationController],
  exports: [RegistrationService],
})
export class RegistrationModule {}
