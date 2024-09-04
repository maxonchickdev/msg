import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { JwtGuard } from 'src/profile/guards/jwt.guard';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('avatar')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addProfileImage(
    @Req() req: Request & { user: PayloadDTO },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadPublicFile(
      req.user.email,
      file.buffer,
      file.originalname,
    );
  }
}
