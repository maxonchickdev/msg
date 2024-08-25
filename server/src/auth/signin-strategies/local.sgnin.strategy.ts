import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { AccessTokenDTO } from '../dto/access.token.dto';
import { LoginUserDTO } from '../dto/login.user.dto';
import { PayloadDTO } from '../dto/payload.dto';
import { SingInStrategy } from './signin.strategy';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  constructor(
    private readonly usersService: UsersService,
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

  async generateJwt(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    const user = await this.usersService.findUser({
      email: loginUserDTO.email,
    });
    const payload: PayloadDTO = {
      id: user.id,
      email: user.email,
    };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
