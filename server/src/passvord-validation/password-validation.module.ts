import { Module } from '@nestjs/common';
import { PasswordValidationService } from './password-validation.service';

@Module({
  providers: [PasswordValidationService],
  exports: [PasswordValidationService],
})
export class PasswordValidationModule {}
