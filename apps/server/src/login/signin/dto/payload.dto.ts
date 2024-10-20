import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PayloadInterface } from '@msg-monorepo/dto';
/**
 *
 *
 * @export
 * @class PayloadDto
 * @implements {PayloadInterface}
 */
export class PayloadDto implements PayloadInterface {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
