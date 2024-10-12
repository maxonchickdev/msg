import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../../../utils/repositories/user/user.service';
import { PayloadDto } from '../dto/payload.dto';
import { SigninTokensDto } from '../dto/signin.tokens.dto';
import { SigninUserDto } from '../dto/signin.user.dto';
import { SingInStrategy } from './signin.strategy';

interface GithubProfile extends Profile {
  _json: {
    email: string;
  };
}

@Injectable()
export class GithubStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALL_BACK_URL'),
      scope: 'user:email',
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: GithubProfile,
    done: VerifyCallback
  ) {
    done(null, profile._json.email);
  }

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
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: `${this.configService.get<string>('JWT_ACCESS_EXPIRES_IN')}s`,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')}s`,
    });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
