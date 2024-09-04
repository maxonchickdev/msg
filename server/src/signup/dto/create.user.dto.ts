import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    type: 'string',
    name: 'username',
    required: true,
    example: 'testUsername',
    description: 'The username of the user',
  })
  username: string;

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
    name: 'password',
    required: true,
    example: 'testPassword',
    description: 'The password of the user',
  })
  password: string;
}
