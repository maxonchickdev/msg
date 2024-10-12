import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MaxSizeAvatarPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (value.size > 5000)
      throw new HttpException(
        'Validation failed (expected max size is 5 kb)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return value;
  }
}
