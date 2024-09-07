import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ValidateAvatarGuard implements CanActivate {
  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: Express.Multer.File }>();
    return this.validateAvatar(request.body);
  }

  async validateAvatar(avatar: Express.Multer.File): Promise<boolean> {
    console.log(avatar);
    if (!avatar) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    if (avatar.size > 1000)
      throw new HttpException('Large avatar size', HttpStatus.CONFLICT);
    // if (avatar.mimetype.split('/')[1])
    // throw new HttpException(
    // "File type must be 'jpg' or 'png'",
    // HttpStatus.CONFLICT,
    // );
    return true;
  }
}
