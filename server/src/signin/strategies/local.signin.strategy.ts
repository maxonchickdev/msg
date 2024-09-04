import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserService } from 'src/utils/repositories/user/user.service';
import { PayloadDTO } from '../dto/payload.dto';
import { SigninUserDTO } from '../dto/signin.user.dto';
import { TemporaryTokenDTO } from '../dto/temporary.token.dto';
import { SingInStrategy } from './signin.strategy';

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

  async generateTemporaryJwt(
    loginUserDTO: SigninUserDTO,
  ): Promise<TemporaryTokenDTO> {
    const user = await this.usersService.findUser({
      email: loginUserDTO.email,
    });
    const payload: PayloadDTO = {
      email: user.email,
    };
    return { temporaryToken: await this.jwtService.signAsync(payload) };
  }
}
