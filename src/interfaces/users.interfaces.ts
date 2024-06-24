import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class IUser {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class IUpdateUser {
  @ApiPropertyOptional()
  username?: string;
  @ApiPropertyOptional()
  password?: string;
}

export class IUserData {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}

export class IEmailData {
  @ApiProperty()
  to: string
  @ApiProperty()
  from: string;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  message: string;
}
