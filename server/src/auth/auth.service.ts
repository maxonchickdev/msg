import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/repositories/users/users.service';
import { LoginUserDTO } from './dto/login.user.dto';
import { PayloadDTO } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async loginBasic(loginUserDto: LoginUserDTO) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    const payload: PayloadDTO = {
      id: user.id,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async loginGoogle(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    user.isVerified = true;

    await this.usersService.saveUser(user);
    const payload: PayloadDTO = {
      id: user.id,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
