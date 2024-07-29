import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserEmailFromRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
