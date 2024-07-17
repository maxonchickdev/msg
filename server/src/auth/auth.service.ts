import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserLogin } from 'src/classes/users.classes';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async jwtValidateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.isVerified === false) {
      throw new HttpException('Mail not confirmed', HttpStatus.UNAUTHORIZED);
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }
    const { password, ...result } = user;
    return result;
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
