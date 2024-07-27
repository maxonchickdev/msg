import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, UserEmailFromRequestDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginBasic(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async loginGoogle(userEmailFromRequestDto: UserEmailFromRequestDto) {
    const user = await this.usersService.findByEmail(
      userEmailFromRequestDto.email,
    );
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
