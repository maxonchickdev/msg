import { IsNotEmpty, IsString } from 'class-validator'

export class SigninTokensDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string

  @IsNotEmpty()
  @IsString()
  refreshToken: string
}
