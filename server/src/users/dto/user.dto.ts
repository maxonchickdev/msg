import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
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

export class EmailValidationDto {
  @ApiProperty({ name: 'email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'code' })
  @IsNotEmpty()
  code: string;
}

export class LoginUserDto {
  @ApiProperty({ name: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ name: 'password' })
  @IsNotEmpty()
  password: string;
}
