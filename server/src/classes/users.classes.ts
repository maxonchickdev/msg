import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class IUser {
  @ApiProperty({ name: 'id' })
  id: number;
  @ApiProperty({ name: 'username' })
  username: string;
  @ApiProperty({ name: 'email' })
  email: string;
  @ApiProperty({ name: 'password' })
  @Exclude()
  password: string;
}

export class IUpdateUser {
  @ApiPropertyOptional({ name: 'username' })
  username?: string;
  @ApiPropertyOptional({ name: 'email' })
  email?: string;
  @ApiPropertyOptional({ name: 'password' })
  password?: string;
}

export class IEmailData {
  to: string;
  message: string;
}

export class IUserLogin {
  @ApiProperty({ name: 'email' })
  email: string;
  @ApiProperty({ name: 'password' })
  password: string;
}
