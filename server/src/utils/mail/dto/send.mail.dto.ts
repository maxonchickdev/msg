import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendMailDto {
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
