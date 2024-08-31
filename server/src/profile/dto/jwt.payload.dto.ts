import { IsNotEmpty } from 'class-validator';

export class JwtPayloadDTO {
  @IsNotEmpty()
  email: string;
}
