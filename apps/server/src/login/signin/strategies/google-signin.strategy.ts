import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../../../utils/repositories/user/user.service';
import { PayloadDto } from '../dto/payload.dto';
import { SigninTokensDto } from '../dto/signin-tokens.dto';
import { SigninUserDto } from '../dto/signin-user.dto';
import { SingInStrategy } from './signin.strategy';
/**
 *
 *
 * @export
 * @class GoogleStrategy
 * @extends {PassportStrategy(Strategy)}
 * @implements {SingInStrategy}
 */
@Injectable()
export class GoogleStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  /**
   * Creates an instance of GoogleStrategy.
   * @param {UserService} usersService
   * @param {JwtService} jwtService
   * @param {ConfigService} configService
   * @memberof GoogleStrategy
   */
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('google.clientId'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL: configService.get<string>('google.callbackUrl'),
      scope: ['email', 'profile'],
    });
  }
  /**
   *
   *
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {Profile} profile
   * @param {VerifyCallback} done
   * @return {*}  {Promise<void>}
   * @memberof GoogleStrategy
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<void> {
    const user = await this.usersService.findUserByEmail(profile._json.email);
    done(null, user.userId);
  }
  /**
   *
   *
   * @param {SigninUserDto} signinUserDTO
   * @return {*}  {Promise<SigninTokensDto>}
   * @memberof GoogleStrategy
   */
  async generateSigninTokens(
    signinUserDTO: SigninUserDto
  ): Promise<SigninTokensDto> {
    const user = await this.usersService.updateUser({
      where: {
        email: signinUserDTO.email,
      },
      data: {
        isVerified: true,
      },
    });
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
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
