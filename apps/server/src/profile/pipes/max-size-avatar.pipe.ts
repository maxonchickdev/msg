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
 * @class MaxSizeAvatarPipe
 * @implements {PipeTransform}
 */
@Injectable()
export class MaxSizeAvatarPipe implements PipeTransform {
  /**
   *
   *
   * @param {Express.Multer.File} value
   * @return {*}
   * @memberof MaxSizeAvatarPipe
   */
  transform(value: Express.Multer.File): Express.Multer.File {
    if (value.size > 5000)
      throw new HttpException(
        'Validation failed (expected max size is 5 kb)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return value;
  }
}
