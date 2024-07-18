import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserLogin } from 'src/classes/users.classes';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.isVerified === false) {
      throw new HttpException('Mail not confirmed', HttpStatus.UNAUTHORIZED);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);
    }
    return user;
  }

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
