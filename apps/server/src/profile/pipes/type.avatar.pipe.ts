import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class TypeAvatarPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (value.mimetype === 'image/png' || value.mimetype === 'image/jpeg')
      throw new HttpException(
        'Validation failed (expected file type is png or jpeg)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return value;
  }
}
