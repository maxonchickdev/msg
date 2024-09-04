import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDTO {
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
