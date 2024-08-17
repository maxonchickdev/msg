import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserProfileDTO {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
