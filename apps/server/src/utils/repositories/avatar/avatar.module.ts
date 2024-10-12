import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AvatarService } from './avatar.service';

@Module({
  imports: [PrismaModule],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
