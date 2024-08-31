import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { jwtConstants } from '../../utils/constants/constants';

@Injectable()
export class JwtTemporaryStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersSerivce: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies.temporary_token;
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
      email: payloadDto.email,
    };
  }
}
