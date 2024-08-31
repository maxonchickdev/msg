import { IsNotEmpty } from 'class-validator';

export class HttpExceptionDTO {
  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  message: string;
}
