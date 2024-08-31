import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { PayloadDTO } from '../dto/payload.dto';
import { LoginUserDTO } from '../dto/signin.user.dto';
import { TemporaryTokenDTO } from '../dto/temporary.token.dto';
import { SingInStrategy } from './signin.strategy';

@Injectable()
export class GoogleStrategy
  extends PassportStrategy(Strategy)
  implements SingInStrategy
{
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALL_BACK_URL'),
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { _json } = profile;

    done(null, _json.email);
  }

  async generateTemporaryJwt(
    loginUserDTO: LoginUserDTO,
  ): Promise<TemporaryTokenDTO> {
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
      email: user.email,
    };
    return { temporaryToken: await this.jwtService.signAsync(payload) };
  }
}
