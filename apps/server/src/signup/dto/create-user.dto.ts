import { CreateUserInterface } from '@msg-monorepo/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
/**
 *
 *
 * @export
 * @class CreateUserDto
 * @implements {CreateUserInterface}
 */
export class CreateUserDto implements CreateUserInterface {
  @ApiProperty({
    type: 'string',
    name: 'username',
    required: true,
    example: 'testUsername',
    description: 'The username of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testUser@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    name: 'password',
    required: true,
    example: 'testPassword',
    description: 'The password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
