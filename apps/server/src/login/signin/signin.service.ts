import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SigninTokensDto } from './dto/signin-tokens.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { GithubStrategy } from './strategies/github-signin.strategy';
import { GoogleStrategy } from './strategies/google-signin.strategy';
import { LocalStrategy } from './strategies/local-signin.strategy';
/**
 *
 *
 * @export
 * @class SigninService
 */
@Injectable()
export class SigninService {
  constructor(
    private readonly googleAuthStrategy: GoogleStrategy,
    private readonly localAuthStrategy: LocalStrategy,
    private readonly githubStrategy: GithubStrategy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  /**
   *
   *
   * @param {SigninUserDto} signinUserDTO
   * @return {*}  {Promise<SigninTokensDto>}
   * @memberof SigninService
   */
  async localAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.localAuthStrategy.generateSigninTokens(signinUserDTO);
  }
  /**
   *
   *
   * @param {SigninUserDto} signinUserDTO
   * @return {*}  {Promise<SigninTokensDto>}
   * @memberof SigninService
   */
  async googleAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.googleAuthStrategy.generateSigninTokens(signinUserDTO);
  }
  /**
   *
   *
   * @param {SigninUserDto} signinUserDTO
   * @return {*}  {Promise<SigninTokensDto>}
   * @memberof SigninService
   */
  async githubAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.githubStrategy.generateSigninTokens(signinUserDTO);
  }
  /**
   *
   *
   * @param {string} userId
   * @return {*}  {Promise<string>}
   * @memberof SigninService
   */
  async getNewAccessToken(userId: string): Promise<string> {
    const newAccessToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: this.configService.get<string>('jwt.accessExpiresIn'),
      }
    );
    return newAccessToken;
  }
}
