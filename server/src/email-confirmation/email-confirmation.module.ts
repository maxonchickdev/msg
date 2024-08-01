import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './email-confirmation.controller';
import { EmailConfirmationService } from './email-confirmation.service';
import { UsersModule } from 'src/repositories/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [EmailConfirmationController],
  providers: [EmailConfirmationService],
  exports: [],
})
export class EmailConfirmationModule {}
