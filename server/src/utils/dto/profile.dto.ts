import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserProfileDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  createdAt: Date;
  @IsNotEmpty()
  exp: number;
}
