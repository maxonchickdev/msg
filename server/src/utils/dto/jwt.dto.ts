import { IsNotEmpty } from 'class-validator';

export class JwtDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  email: string;
}
