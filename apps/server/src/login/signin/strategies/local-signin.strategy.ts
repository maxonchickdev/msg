import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserService } from '../../../utils/repositories/user/user.service';
import { PayloadDto } from '../dto/payload.dto';
import { SigninTokensDto } from '../dto/signin-tokens.dto';
import { SigninUserDto } from '../dto/signin-user.dto';
import { SingInStrategy } from './signin.strategy';
/**
 *
 *
 * @export
 * @class LocalStrategy
 * @extends {PassportStrategy(Strategy)}
 * @implements {SingInStrategy}
 */
@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  /**
   * Creates an instance of LocalStrategy.
   * @param {UserService} usersService
   * @param {JwtService} jwtService
   * @param {ConfigService} configService
   * @memberof LocalStrategy
   */
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  /**
   *
   *
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<boolean>}
   * @memberof LocalStrategy
   */
  async validate(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(email);

    if (user.isVerified === false) {
      throw new HttpException('Mail not confirmed', HttpStatus.FORBIDDEN);
    }

    const isPasswordsMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatching) {
      throw new HttpException(
        'Email or password incorrected',
        HttpStatus.UNAUTHORIZED
      );
    }

    return true;
  }
  /**
   *
   *
   * @param {SigninUserDto} signinUserDto
   * @return {*}  {Promise<SigninTokensDto>}
   * @memberof LocalStrategy
   */
  async generateSigninTokens(
    signinUserDto: SigninUserDto
  ): Promise<SigninTokensDto> {
    const user = await this.usersService.findUserByEmail(signinUserDto.email);
    const payload: PayloadDto = {
      userId: user.userId,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: this.configService.get<string>('jwt.accessExpiresIn'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
    });
    await this.usersService.setCurrntRefreshToken(refreshToken, user.userId);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
