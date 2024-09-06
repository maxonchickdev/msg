import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class TwofaService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateTwoFactorAuthenticationSecret(
    payload: PayloadDto,
  ): Promise<string> {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      payload.email,
      process.env.GOOGLE_AUTHENTICATOR_APP_NAME,
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

    user.isTwoFactorAuthenticationEnabled = true;

    return true;
  }
}
