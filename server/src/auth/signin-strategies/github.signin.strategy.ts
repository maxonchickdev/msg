import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';
import { VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { AccessTokenDTO } from '../dto/access.token.dto';
import { LoginUserDTO } from '../dto/login.user.dto';
import { PayloadDTO } from '../dto/payload.dto';
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
    private readonly usersService: UsersService,
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
    console.log(profile, accessToken);
    console.log(profile._json.email);
    done(null, profile._json.email);
  }

  async generateJwt(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    const user = await this.usersService.updateUser({
      where: {
        email: loginUserDTO.email,
      },
      data: {
        isVerified: true,
      },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const payload: PayloadDTO = {
      id: user.id,
      email: user.email,
    };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
