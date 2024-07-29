import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { User } from '../../entities/user.entity';
import { RegistrationService } from '../../registration/registration.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private registrationService: RegistrationService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.registrationService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.isVerified === false) {
      throw new HttpException('Mail not confirmed', HttpStatus.UNAUTHORIZED);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Permission denied', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
