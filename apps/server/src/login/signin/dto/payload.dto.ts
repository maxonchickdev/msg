import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class PayloadDto {
  @IsNotEmpty()
  @IsString()
  userId: string
}
