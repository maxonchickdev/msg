import { ApiProperty } from '@nestjs/swagger';

export class TwoFactorAuthenticationCodeDto {
  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: '111111',
    description: 'The twofa code',
  })
  twoFactorAuthenticationCode: string;
}
