import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from '../../../utils/repositories/user/user.service'
import { PayloadDto } from '../../signin/dto/payload.dto'

export const JWT_QR_KEY = 'jwt-2fa-turn-on'

@Injectable()
export class JwtTwofaStrategy extends PassportStrategy(Strategy, JWT_QR_KEY) {
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access']
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessSecret'),
    })
  }

  async validate(payloadDto: PayloadDto): Promise<PayloadDto> {
    await this.usersService.findUserById(payloadDto.userId)
    return {
      userId: payloadDto.userId,
    }
  }
}
