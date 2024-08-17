import { IsEmail, IsNotEmpty } from 'class-validator';

export class PayloadDTO {
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
