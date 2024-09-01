import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class HttpExceptionDTO {
  @ApiProperty({
    type: 'string',
    name: 'statusCode',
    required: true,
    example: '404',
    description: 'Not found',
  })
  @IsNotEmpty()
  statusCode: number;

  @ApiProperty({
    type: 'string',
    name: 'message',
    required: true,
    example: 'Not found',
    description: 'User not found',
  })
  @IsNotEmpty()
  message: string;
}
