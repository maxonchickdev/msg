import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/profile/strategies/jwt.strategy';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { UserImageModule } from 'src/utils/repositories/user-image/user-image.module';
import { UserModule } from 'src/utils/repositories/user/user.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [PrismaModule, UserModule, UserImageModule],
  controllers: [FileController],
  providers: [FileService, JwtStrategy],
})
export class FileModule {}
