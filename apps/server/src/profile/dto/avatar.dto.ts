import { AvatarInterface } from '@msg-monorepo/dto';
/**
 *
 *
 * @export
 * @class AvatarDto
 * @implements {AvatarInterface}
 */
export class AvatarDto implements AvatarInterface {
  avatar: Express.Multer.File;
}
