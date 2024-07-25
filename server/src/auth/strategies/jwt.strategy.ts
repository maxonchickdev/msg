import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from '../dto/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (!req.cookies['access_token']) {
            throw new HttpException('Token not foun', HttpStatus.CONFLICT);
          }
          token = req.cookies['access_token'];
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secretOrKey,
    });
  }

  async validate(payloadDto: PayloadDto): Promise<PayloadDto> {
    return {
      username: payloadDto.username,
      email: payloadDto.email,
      createdAt: payloadDto.createdAt,
      exp: payloadDto.exp,
    };
  }
}
