import { AvatarInterface } from '@msg-monorepo/dto';
import { IsNotEmpty, IsString } from 'class-validator';
/**
 *
 *
 * @export
 * @class AvatarDto
 * @implements {AvatarInterface}
 */
export class AvatarDto implements AvatarInterface {
  avatar: string;
}
