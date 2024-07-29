import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEmailFromRequestDto } from './dto/google-info.dto';
import { LoginUserDto } from './dto/login.dto';
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
    console.log('From service: ', userEmailFromRequestDto.email);
    const user = await this.registrationService.findByEmail(
      userEmailFromRequestDto.email,
    );
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    user.isVerified = true;
    await this.registrationService.saveUser(user);
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
