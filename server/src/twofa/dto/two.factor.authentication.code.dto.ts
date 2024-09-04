import { ApiProperty } from '@nestjs/swagger';

export class TwoFactorAuthenticationCodeDTO {
  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: '111111',
    description: 'The two factor authentication code',
  })
  code: string;
}
