import { UserProfileInterface } from '@msg-monorepo/dto';
import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 *
 *
 * @export
 * @class UserProfileDto
 * @implements {UserProfileInterface}
 */
export class UserProfileDto implements UserProfileInterface {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}
