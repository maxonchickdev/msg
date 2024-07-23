import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from '../mail/mail.service';
import { User } from '../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidationCode } from '../entities/validation_code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ValidationCode])],
  providers: [UsersService, MailService],
  exports: [UsersService, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
