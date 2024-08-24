import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PayloadDTO {
  @ApiProperty({
    type: 'string',
    name: 'id',
    required: true,
    example: 'a4de9af2-aba3-47f0-8e22-365a8c740ee7',
    description: 'The id of the user',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: 'string',
    name: 'email',
    required: true,
    example: 'testUser@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
