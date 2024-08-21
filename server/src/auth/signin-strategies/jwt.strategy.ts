import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDTO } from 'src/auth/dto/payload.dto';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { jwtConstants } from '../../utils/constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersSerivce: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          let token = null;
          if (req.cookies.access_token) {
            token = req.cookies.access_token;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secretOrKey,
    });
  }

  async validate(payloadDto: PayloadDTO): Promise<PayloadDTO> {
    const user = await this.usersSerivce.findUser({ email: payloadDto.email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return {
      id: payloadDto.id,
      email: payloadDto.email,
    };
  }
}
