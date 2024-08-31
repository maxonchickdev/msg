import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { UsersService } from 'src/utils/repositories/users/users.service';

@Injectable()
export class TwofaService {
  constructor(private readonly usersService: UsersService) {}

  async generateTwoFactorAuthenticationSecret(
    payload: PayloadDTO,
  ): Promise<string> {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(payload.email, 'APP', secret);

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

  async pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<void> {
    return toFileStream(stream, otpauthUrl);
  }

  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    payload: PayloadDTO,
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
