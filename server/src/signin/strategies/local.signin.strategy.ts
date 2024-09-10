import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Strategy } from 'passport-local';
import { UserService } from 'src/utils/repositories/user/user.service';
import { PayloadDto } from '../dto/payload.dto';
import { SigninTokensDto } from '../dto/signin.tokens.dto';
import { SigninUserDto } from '../dto/signin.user.dto';
import { SingInStrategy } from './signin.strategy';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUser({ email: email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.isVerified === false) {
      throw new HttpException('Mail not confirmed', HttpStatus.FORBIDDEN);
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

  async generateSigninTokens(
    signinUserDto: SigninUserDto,
  ): Promise<SigninTokensDto> {
    const user = await this.usersService.findUser({
      email: signinUserDto.email,
    });
    const payload: PayloadDto = {
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: `${process.env.JWT_ACCESS_EXPIRES_IN}s`,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: `${process.env.JWT_REFRESH_EXPIRES_IN}s`,
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
