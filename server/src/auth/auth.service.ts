import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/utils/dto/login.dto';
import { PayloadDto } from 'src/utils/dto/payload.dto';
import { UsersService } from 'src/repositories/users/users.service';
import { RegistrationService } from 'src/registration/registration.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly registrationService: RegistrationService,
  ) {}

  async loginBasic(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);
    const payload: PayloadDto = {
      id: user.id,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async loginGoogle(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      const payload: PayloadDto =
        await this.registrationService.createGoogleUser(email);
      return { access_token: await this.jwtService.signAsync(payload) };
    } else {
      user.isVerified = true;
      await this.usersService.saveUser(user);
      const payload: PayloadDto = {
        id: user.id,
        email: user.email,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
