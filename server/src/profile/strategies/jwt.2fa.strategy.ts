import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const JWT_2FA_KEY = 'jwt-2fa';

@Injectable()
export class Jwt2FaStrategy extends PassportStrategy(Strategy, JWT_2FA_KEY) {
  constructor(private readonly usersSerivce: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['accessToken'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payloadDto: PayloadDto): Promise<PayloadDto> {
    const user = await this.usersSerivce.findUser({ email: payloadDto.email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!user.isTwoFactorAuthenticationEnabled)
      throw new HttpException('Two fa is not enabled', HttpStatus.CONFLICT);
    return {
      email: payloadDto.email,
    };
  }
}
