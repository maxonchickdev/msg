import { Module } from '@nestjs/common';
import { ConfirmationCodeService } from './confirmation-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationCode } from 'src/utils/entities/confirmation.code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfirmationCode])],
  providers: [ConfirmationCodeService],
  exports: [ConfirmationCodeService],
})
export class ConfirmationCodeModule {}
