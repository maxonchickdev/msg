import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDTO } from 'src/signin/dto/payload.dto';
import { UsersService } from 'src/utils/repositories/users/users.service';

@Injectable()
export class JwtTemporaryStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.cookies.temporary_token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payloadDto: PayloadDTO): Promise<PayloadDTO> {
    const user = await this.usersService.findUser({ email: payloadDto.email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return {
      email: payloadDto.email,
    };
  }
}
