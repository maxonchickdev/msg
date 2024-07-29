import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { MailService } from '../mail/mail.service';
import { ValidationUserGuard } from '../users/guards/validate-new-user.guard';
import { User } from '../entities/user.entity';
import { ValidationCode } from '../entities/validation_code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, ValidationCode])],
  providers: [RegistrationService, MailService, ValidationUserGuard],
  controllers: [RegistrationController],
  exports: [RegistrationService],
})
export class RegistrationModule {}
