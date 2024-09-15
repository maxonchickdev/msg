import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import * as bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import { UserService } from 'src/utils/repositories/user/user.service'
import { PayloadDto } from '../dto/payload.dto'
import { SigninTokensDto } from '../dto/signin.tokens.dto'
import { SigninUserDto } from '../dto/signin.user.dto'
import { SingInStrategy } from './signin.strategy'

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(email);

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

    return true;
  }

  async generateSigninTokens(
    signinUserDto: SigninUserDto,
  ): Promise<SigninTokensDto> {
    const user = await this.usersService.findUserByEmail(signinUserDto.email);
    const payload: PayloadDto = {
      userId: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: `${this.configService.get<string>('JWT_ACCESS_EXPIRES_IN')
      }s`,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')}s`,
    });
    await this.usersService.setCurrntRefreshToken(refreshToken, user.id);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
