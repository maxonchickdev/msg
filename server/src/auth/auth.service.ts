import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserLogin } from '../classes/users.classes';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: IUserLogin) {
    const user = await this.usersService.findByEmail(data.email);
    const payload = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
