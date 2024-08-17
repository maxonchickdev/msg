import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  email: string;
}
