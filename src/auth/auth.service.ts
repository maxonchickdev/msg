import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/interfaces/users.interfaces';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user: IUser): Promise<any> {
    const pickedUser = await this.usersService.findByUsername(user.username);
    if (pickedUser && pickedUser.password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
