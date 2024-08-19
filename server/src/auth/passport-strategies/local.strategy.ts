import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/repositories/users/users.service';

@Injectable()
export class LocalPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersSerice: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersSerice.findUser({ email: email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.isVerified === false) {
      throw new HttpException('Mail not confirmed', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordsMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatching) {
      throw new HttpException(
        'Email or password incorrected',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
