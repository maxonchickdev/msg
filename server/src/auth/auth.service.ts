import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    const payload = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  googleLogin(req: Request) {
    if (!req.user)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // const user = await this.usersService.findByEmail();
    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
