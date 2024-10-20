import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../../utils/repositories/user/user.service';
import { PayloadDto } from '../../signin/dto/payload.dto';

export const JWT_QR_KEY = 'jwt-2fa-turn-on';
/**
 *
 *
 * @export
 * @class JwtTwofaStrategy
 * @extends {PassportStrategy(Strategy, JWT_QR_KEY)}
 */
@Injectable()
export class JwtTwofaStrategy extends PassportStrategy(Strategy, JWT_QR_KEY) {
  /**
   * Creates an instance of JwtTwofaStrategy.
   * @param {UserService} usersService
   * @param {ConfigService} configService
   * @memberof JwtTwofaStrategy
   */
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessSecret'),
    });
  }
  /**
   *
   *
   * @param {PayloadDto} payloadDto
   * @return {*}  {Promise<PayloadDto>}
   * @memberof JwtTwofaStrategy
   */
  async validate(payloadDto: PayloadDto): Promise<PayloadDto> {
    await this.usersService.findUserById(payloadDto.userId);
    return {
      userId: payloadDto.userId,
    };
  }
}
