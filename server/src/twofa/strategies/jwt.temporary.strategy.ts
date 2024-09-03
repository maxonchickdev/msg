import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { UsersService } from 'src/utils/repositories/users/users.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const JWT_TEMPORARY_STRATEGY_KEY = 'jwt-temporary';

@Injectable()
export class JwtTemporaryStrategy extends PassportStrategy(
  Strategy,
  JWT_TEMPORARY_STRATEGY_KEY,
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['temporaryToken'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payloadDto: PayloadDTO): Promise<PayloadDTO> {
    const user = await this.usersService.findUser({ email: payloadDto.email });
    3;
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      email: payloadDto.email,
    };
  }
}