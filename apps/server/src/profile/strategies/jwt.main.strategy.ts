import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PayloadDto } from '../../login/signin/dto/payload.dto'
import { UserService } from '../../utils/repositories/user/user.service'

export const JWT_MAIN = 'jwt-main'

@Injectable()
export class JwtMainStrategy extends PassportStrategy(Strategy, JWT_MAIN) {
  constructor(
    private readonly usersSerivce: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['access']
        },
      ]),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('jwt.accessSecret'),
    })
  }

  async validate(req: Request, payloadDto: PayloadDto): Promise<PayloadDto> {
    const user = await this.usersSerivce.findUserById(payloadDto.userId)

    if (!user.isTwoFactorAuthenticationEnabled)
      throw new HttpException('Two fa is not enabled', HttpStatus.CONFLICT)

    return {
      userId: payloadDto.userId,
    }
  }
}
