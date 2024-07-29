import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';
import { RegistrationModule } from 'src/registration/registration.module';

@Module({
  imports: [RegistrationModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [],
})
export class EmailConfirmationModule {}
