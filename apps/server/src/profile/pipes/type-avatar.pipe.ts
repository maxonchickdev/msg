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
   * @param {string} mimetype
   * @return {*}  {Express.Multer.File}
   * @memberof TypeAvatarPipe
   */
  transform(mimetype: string): string {
    if (mimetype === 'image/png' || mimetype === 'image/jpeg')
      throw new HttpException(
        'Validation failed (expected file type is png or jpeg)',
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    return mimetype;
  }
}
