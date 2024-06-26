import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class IUser {
  @ApiProperty({name: 'id'})
  id: number;
  @ApiProperty({name: 'username'})
  username: string;
  @ApiProperty({name: 'email'})
  email: string
  @ApiProperty({name: 'password'})
  password: string;
}

export class IUpdateUser {
  @ApiPropertyOptional({name: 'username'})
  username?: string;
  @ApiPropertyOptional({name: 'email'})
  email?: string
  @ApiPropertyOptional({name: 'password'})
  password?: string;
}

export class IUserData {
  @ApiProperty({name: 'username'})
  username: string;
  @ApiProperty({name: 'email'})
  email: string
  @ApiProperty({name: 'password'})
  password: string;
}

export class IEmailData {
  @ApiProperty({name: 'to'})
  to: string
  @ApiProperty({name: 'from'})
  from: string;
  @ApiProperty({name: 'subject'})
  subject: string;
  @ApiProperty({name: 'message'})
  message: string;
}

export class IUserLogin {
  @ApiProperty({name: 'email'})
  email: string
  @ApiProperty({name: 'password'})
  password: string
}

