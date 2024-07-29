import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginUserDto,
  UserEmailFromRequestDto,
} from '../registration/dto/user.dto';
import { RegistrationService } from 'src/registration/registration.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly jwtService: JwtService,
  ) {}

  async loginBasic(loginUserDto: LoginUserDto) {
    const user = await this.registrationService.findByEmail(loginUserDto.email);
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
    const user = await this.registrationService.findByEmail(
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
