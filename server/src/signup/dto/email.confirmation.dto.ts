import { ApiProperty } from '@nestjs/swagger';

export class EmailConfirmationDTO {
  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testUser@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: 'ef666934-2ce4-4c7b-b403-26f8be9c3bcc',
    description: 'The confirmation code',
  })
  code: string;
}
