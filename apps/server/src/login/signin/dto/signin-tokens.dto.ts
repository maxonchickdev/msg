import { SigninTokensInterface } from '@msg-monorepo/dto';
import { IsNotEmpty, IsString } from 'class-validator';
/**
 *
 *
 * @export
 * @class SigninTokensDto
 * @implements {SigninTokensInterface}
 */
export class SigninTokensDto implements SigninTokensInterface {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
