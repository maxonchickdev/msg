import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import * as bcrypt from 'bcrypt'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../../utils/repositories/user/user.service'
import { PayloadDto } from '../dto/payload.dto'

export const JWT_REFRESH_TOKEN = 'jwt-refresh'

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_TOKEN
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['refresh']
        },
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('jwt.refreshSecret'),
    })
  }

  async validate(req: Request, payloadDto: PayloadDto): Promise<PayloadDto> {
    const user = await this.userService.findUserById(payloadDto.userId)

    const refreshTokensMatch = await bcrypt.compare(
      req.cookies['refresh'],
      user.currentHashedRefreshToken
    )

    if (!refreshTokensMatch)
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED)

    return {
      userId: user.userId,
    }
  }
}
