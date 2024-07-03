import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from '../constants/constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie
      ]),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secretOrKey,
    });
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if(req.cookies && req.cookies.access_token) {
      return req.cookies.access_token
    }
    return null
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username, email: payload.email };
  }
}
