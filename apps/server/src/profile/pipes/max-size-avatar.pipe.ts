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
   * @param {number} size
   * @return {*}
   * @memberof MaxSizeAvatarPipe
   */
  transform(size: number): number {
    if (size > 60000)
      throw new HttpException(
        'Validation failed (expected max size is 60 kb)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return size;
  }
}
