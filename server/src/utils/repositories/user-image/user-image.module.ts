import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { UserImageService } from './user-image.service';

@Module({
  imports: [PrismaModule],
  providers: [UserImageService],
  exports: [UserImageService],
})
export class UserImageModule {}
