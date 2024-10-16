import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class TwoFactorAuthenticationCodeDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: '111111',
    description: 'The twofa code',
  })
  twoFactorAuthenticationCode: string;
}
