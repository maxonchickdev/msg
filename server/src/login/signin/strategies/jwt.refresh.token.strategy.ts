import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from 'src/login/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

export const JWT_REFRESH_TOKEN = 'jwt-refresh';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_TOKEN,
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies['refresh'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payloadDto: PayloadDto): Promise<PayloadDto> {
    const user = await this.userService.findUserById(payloadDto.userId);

    const refreshTokensMatch = await bcrypt.compare(
      req.cookies['refresh'],
      user.currentHashedRefreshToken,
    );

    if (!refreshTokensMatch)
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);

    return {
      userId: user.id,
    };
  }
}
