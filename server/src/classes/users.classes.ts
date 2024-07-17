import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IUpdateUser {
  @ApiPropertyOptional({ name: 'username' })
  username?: string;
  @ApiPropertyOptional({ name: 'email' })
  email?: string;
  @ApiPropertyOptional({ name: 'password' })
  password?: string;
}

export class IUserLogin {
  @ApiProperty({ name: 'email' })
  email: string;
  @ApiProperty({ name: 'password' })
  password: string;
}
