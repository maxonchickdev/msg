import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailConfirmationDTO {
  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testUser@gmail.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    name: 'code',
    required: true,
    example: 'ef666934-2ce4-4c7b-b403-26f8be9c3bcc',
    description: 'The confirmation code',
  })
  @IsNotEmpty()
  code: string;
}
