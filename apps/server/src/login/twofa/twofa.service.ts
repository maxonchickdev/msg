import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { UserService } from '../../utils/repositories/user/user.service';
import { PayloadDto } from '../signin/dto/payload.dto';
/**
 *
 *
 * @export
 * @class TwofaService
 */
@Injectable()
export class TwofaService {
  /**
   * Creates an instance of TwofaService.
   * @param {UserService} usersService
   * @param {ConfigService} configService
   * @memberof TwofaService
   */
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService
  ) {}
  /**
   *
   *
   * @param {string} userId
   * @return {*}  {Promise<string>}
   * @memberof TwofaService
   */
  async generateTwoFactorAuthenticationSecret(userId: string): Promise<string> {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(
      userId,
      this.configService.get<string>('google.appName'),
      secret
    );

    await this.usersService.updateUser({
      where: {
        userId: userId,
      },
      data: {
        twoFactorAuthenticationSecret: secret,
      },
    });

    return otpauthUrl;
  }
  /**
   *
   *
   * @param {string} otpauthUrl
   * @return {*}  {Promise<string>}
   * @memberof TwofaService
   */
  async generateQrCodeData(otpauthUrl: string): Promise<string> {
    return toDataURL(otpauthUrl);
  }
  /**
   *
   *
   * @param {string} twoFactorAuthenticationCode
   * @param {PayloadDto} payload
   * @return {*}  {Promise<boolean>}
   * @memberof TwofaService
   */
  async isTwoFactorAuthenticationCodeValid(
    twoFactorAuthenticationCode: string,
    payload: PayloadDto
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
        userId: payload.userId,
      },
      data: {
        isTwoFactorAuthenticationEnabled: true,
      },
    });

    return true;
  }
}
