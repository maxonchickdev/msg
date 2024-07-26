import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { User } from '../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidationCode } from '../entities/validation_code.entity';
import { ValidationUserGuard } from './guards/validate-new-user.guard';
import { ValidationEmailGuard } from './guards/validate-email.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, ValidationCode])],
  providers: [
    UsersService,
    MailService,
    ValidationUserGuard,
    ValidationEmailGuard,
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
