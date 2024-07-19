import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req.cookies['access_token']) {
            token = req.cookies['access_token'];
          } else {
            throw new HttpException(
              'Access token not found',
              HttpStatus.NOT_FOUND,
            );
          }
          return token;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secretOrKey,
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      email: payload.email,
      createdAt: payload.createdAt,
    };
  }
}
