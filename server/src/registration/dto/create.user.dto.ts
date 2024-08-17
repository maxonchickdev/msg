import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ name: 'username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ name: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'password' })
  @IsNotEmpty()
  password: string;
}
