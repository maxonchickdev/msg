import { HttpExceptionInterface } from '@msg-monorepo/dto';
import { ApiProperty } from '@nestjs/swagger';
/**
 *
 *
 * @export
 * @class HttpExceptionDto
 * @implements {HttpExceptionInterface}
 */
export class HttpExceptionDto implements HttpExceptionInterface {
  @ApiProperty({
    type: 'string',
    name: 'statusCode',
    required: true,
    example: '404',
    description: 'Not found',
  })
  statusCode: number;

  @ApiProperty({
    type: 'string',
    name: 'message',
    required: true,
    example: 'Not found',
    description: 'User not found',
  })
  message: string;
}
