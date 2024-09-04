import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/utils/repositories/user/user.service';
import { PayloadDto } from '../dto/payload.dto';
import { SigninUserDto } from '../dto/signin.user.dto';
import { TemporaryTokenDto } from '../dto/temporary.token.dto';
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
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
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
    done: VerifyCallback,
  ) {
    done(null, profile._json.email);
  }

  async generateTemporaryJwt(
    loginUserDTO: SigninUserDto,
  ): Promise<TemporaryTokenDto> {
    const user = await this.usersService.updateUser({
      where: {
        email: loginUserDTO.email,
      },
      data: {
        isVerified: true,
      },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const payload: PayloadDto = {
      email: user.email,
    };
    return { temporaryToken: await this.jwtService.signAsync(payload) };
  }
}
