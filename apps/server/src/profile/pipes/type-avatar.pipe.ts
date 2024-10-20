import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
/**
 *
 *
 * @export
 * @class TypeAvatarPipe
 * @implements {PipeTransform}
 */
@Injectable()
export class TypeAvatarPipe implements PipeTransform {
  /**
   *
   *
   * @param {Express.Multer.File} value
   * @return {*}  {Express.Multer.File}
   * @memberof TypeAvatarPipe
   */
  transform(value: Express.Multer.File): Express.Multer.File {
    if (value.mimetype === 'image/png' || value.mimetype === 'image/jpeg')
      throw new HttpException(
        'Validation failed (expected file type is png or jpeg)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return value;
  }
}
