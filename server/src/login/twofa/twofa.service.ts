import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { PayloadDto } from 'src/login/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class TwofaService {
  constructor(private readonly usersService: UserService) {}

  async generateTwoFactorAuthenticationSecret(userId: string): Promise<string> {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      userId,
      process.env.GOOGLE_AUTHENTICATOR_APP_NAME,
      secret,
    );

    await this.usersService.updateUser({
      where: {
        id: userId,
      },
      data: {
        twoFactorAuthenticationSecret: secret,
      },
    });

    return otpauthUrl;
  }

  async generateQrCodeData(otpauthUrl: string): Promise<string> {
    return toDataURL(otpauthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    payload: PayloadDto,
  ): Promise<boolean> {
    const user = await this.usersService.findUserById(payload.userId);
    const isCodeValid = authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });

    if (!isCodeValid)
      throw new HttpException('Wrong authentication code', HttpStatus.CONFLICT);

    await this.usersService.updateUser({
      where: {
        id: payload.userId,
      },
      data: {
        isTwoFactorAuthenticationEnabled: true,
      },
    });

    return true;
  }
}
