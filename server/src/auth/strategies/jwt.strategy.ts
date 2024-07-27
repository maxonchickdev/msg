import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/constants';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from '../dto/payload.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
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

  async validate(payloadDto: PayloadDto): Promise<PayloadDto> {
    const user = await this.usersService.findByEmail(payloadDto.email);
    if (!user)
      throw new HttpException('User not found )))', HttpStatus.NOT_FOUND);
    return {
      id: payloadDto.id,
      username: payloadDto.username,
      email: payloadDto.email,
      createdAt: payloadDto.createdAt,
      exp: payloadDto.exp,
    };
  }
}
