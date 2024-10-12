import { IsNotEmpty } from 'class-validator'

export class SigninTokensDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}
