import { IsNotEmpty } from 'class-validator'

export class PayloadDto {
  @IsNotEmpty()
  userId: string;
}
