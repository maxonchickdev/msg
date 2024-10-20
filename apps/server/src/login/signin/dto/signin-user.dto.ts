import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SigninUserInterface } from '@msg-monorepo/dto';
/**
 *
 *
 * @export
 * @class SigninUserDto
 * @implements {SigninUserInterface}
 */
export class SigninUserDto implements SigninUserInterface {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testUser@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: 'string',
    name: 'password',
    required: true,
    example: 'testPassword',
    description: 'The password of the user',
  })
  password?: string;
}
