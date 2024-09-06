import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Profile, Strategy } from 'passport-github';
import { VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/utils/repositories/user/user.service';
import { AccessTokenDto } from '../dto/access.token.dto';
import { PayloadDto } from '../dto/payload.dto';
import { SigninUserDto } from '../dto/signin.user.dto';
import { SingInStrategy } from './signin.strategy';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

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
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALL_BACK_URL,
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

  async generateAccessJwt(
    loginUserDTO: SigninUserDto,
  ): Promise<AccessTokenDto> {
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
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
