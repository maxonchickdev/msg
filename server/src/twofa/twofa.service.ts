import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';
import { AccessTokenDto } from './dto/access.token.dto';

@Injectable()
export class TwofaService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateTwoFactorAuthenticationSecret(
    payload: PayloadDto,
  ): Promise<string> {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      payload.email,
      this.configService.get<string>('GOOGLE_AUTHENTICATOR_APP_NAME'),
      secret,
    );

    await this.usersService.updateUser({
      where: {
        email: payload.email,
      },
      data: {
        twoFactorAuthenticationSecret: secret,
      },
    });
    return otpauthUrl;
  }

  async pipeQrCode(otpauthUrl: string): Promise<string> {
    return toDataURL(otpauthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    payload: PayloadDto,
  ): Promise<boolean> {
    const user = await this.usersService.findUser({ email: payload.email });
    const isCodeValid = authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });

    if (!isCodeValid)
      throw new HttpException('Wrong authentication code', HttpStatus.CONFLICT);

    return true;
  }

  async generateAccessToken(email: string): Promise<AccessTokenDto> {
    const payload: PayloadDto = {
      email: email,
    };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
