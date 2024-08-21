import { IsEmail, IsNotEmpty } from 'class-validator';

export class JustifiedUserDTO {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
