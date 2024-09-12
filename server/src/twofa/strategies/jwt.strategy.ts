import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const JWT_QR_KEY = 'jwt-qr';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_QR_KEY) {
  constructor(private readonly usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payloadDto: PayloadDto): Promise<PayloadDto> {
    const user = await this.usersService.findUser({ id: payloadDto.id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      id: payloadDto.id,
    };
  }
}