import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testUser@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    name: 'password',
    required: true,
    example: 'testPassword',
    description: 'The password of the user',
  })
  password?: string;
}
