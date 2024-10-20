import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../../../utils/repositories/user/user.service';
import { PayloadDto } from '../dto/payload.dto';
import { SigninTokensDto } from '../dto/signin-tokens.dto';
import { SigninUserDto } from '../dto/signin-user.dto';
import { SingInStrategy } from './signin.strategy';

interface GithubProfile extends Profile {
  _json: {
    email: string;
  };
}
/**
 *
 *
 * @export
 * @class GithubStrategy
 * @extends {PassportStrategy(Strategy)}
 * @implements {SingInStrategy}
 */
@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  /**
   * Creates an instance of GithubStrategy.
   * @param {UserService} usersService
   * @param {JwtService} jwtService
   * @param {ConfigService} configService
   * @memberof GithubStrategy
   */
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('github.clientId'),
      clientSecret: configService.get<string>('github.clientSecret'),
      callbackURL: configService.get<string>('github.callbackUrl'),
      scope: 'user:email',
    });
  }
  /**
   *
   *
   * @param {string} accessToken
   * @param {string} _refreshToken
   * @param {GithubProfile} profile
   * @param {VerifyCallback} done
   * @memberof GithubStrategy
   */
  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: GithubProfile,
    done: VerifyCallback
  ) {
    done(null, profile._json.email);
  }
  /**
   *
   *
   * @param {SigninUserDto} signinUserDTO
   * @return {*}  {Promise<SigninTokensDto>}
   * @memberof GithubStrategy
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
