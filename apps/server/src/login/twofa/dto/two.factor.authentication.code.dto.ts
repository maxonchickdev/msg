import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TwoFactorAuthenticationCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: '111111',
    description: 'The two factor authentication code',
  })
  code: string
}
