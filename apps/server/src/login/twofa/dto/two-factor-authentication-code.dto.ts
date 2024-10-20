import { TwoFactorAuthenticationCodeInterface } from '@msg-monorepo/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
/**
 *
 *
 * @export
 * @class TwoFactorAuthenticationCodeDto
 * @implements {TwoFactorAuthenticationCodeInterface}
 */
export class TwoFactorAuthenticationCodeDto
  implements TwoFactorAuthenticationCodeInterface
{
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: '111111',
    description: 'The twofa code',
  })
  twoFactorAuthenticationCode: string;
}
