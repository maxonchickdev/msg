import { IsEmail, IsNotEmpty } from 'class-validator';

export class MailDto {
  @IsNotEmpty()
  @IsEmail()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  value: string;
}
