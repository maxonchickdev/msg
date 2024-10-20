import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AvatarService } from './avatar.service';
/**
 *
 *
 * @export
 * @class AvatarModule
 */
@Module({
  imports: [PrismaModule],
  providers: [AvatarService],
  exports: [AvatarService],
})
export class AvatarModule {}
