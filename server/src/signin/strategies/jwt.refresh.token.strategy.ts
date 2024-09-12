import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from 'src/signin/dto/payload.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

export const JWT_REFRESH_KEY = 'jwt-refresh-token';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_KEY,
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
    const user = await this.userService.findUser({ id: payloadDto.id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const refreshTokensMatch = await bcrypt.compare(
      req.cookies['refresh'],
      user.currentHashedRefreshToken,
    );
    if (!refreshTokensMatch)
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);

    return {
      id: user.id,
    };
  }
}
