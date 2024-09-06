import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class TwofaService {
  constructor(private readonly usersService: UserService) {}

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

  async generateQrCodeData(res: Response, otpauthUrl: string): Promise<void> {
    return toFileStream(res, otpauthUrl);
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

    await this.usersService.updateUser({
      where: {
        email: payload.email,
      },
      data: {
        isTwoFactorAuthenticationEnabled: true,
      },
    });

    return true;
  }
}
