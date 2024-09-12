import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from 'src/login/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const JWT_MAIN = 'jwt-main';

@Injectable()
export class JwtMainStrategy extends PassportStrategy(Strategy, JWT_MAIN) {
  constructor(private readonly usersSerivce: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payloadDto: PayloadDto): Promise<PayloadDto> {
    const user = await this.usersSerivce.findUserById(payloadDto.userId);

    if (!user.isTwoFactorAuthenticationEnabled)
      throw new HttpException('Two fa is not enabled', HttpStatus.CONFLICT);

    return {
      userId: payloadDto.userId,
    };
  }
}
