import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TwoFactorAuthenticationCodeDTO {
  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: '111111',
    description: 'The two factor authentication code',
  })
  @IsNotEmpty()
  code: string;
}
