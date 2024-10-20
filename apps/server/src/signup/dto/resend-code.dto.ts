import { ResendCodeInterface } from '@msg-monorepo/dto';
import { ApiProperty } from '@nestjs/swagger';
/**
 *
 *
 * @export
 * @class ResendCodeDto
 * @implements {ResendCodeInterface}
 */
export class ResendCodeDto implements ResendCodeInterface {
  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testUser@gmail.com',
    description: 'The email of the user',
  })
  email: string;
}
