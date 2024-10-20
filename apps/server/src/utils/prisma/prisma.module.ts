import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
/**
 *
 *
 * @export
 * @class PrismaModule
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
