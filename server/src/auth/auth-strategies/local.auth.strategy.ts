import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/repositories/users/users.service';
import { AccessTokenDTO } from '../dto/access.token.dto';
import { LoginUserDTO } from '../dto/login.user.dto';
import { PayloadDTO } from '../dto/payload.dto';
import { AuthStrategy } from './auth.strategy';

@Injectable()
export class LocalAuthStrategy implements AuthStrategy {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async generateJwtToken(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    const user = await this.usersService.findUser({
      email: loginUserDTO.email,
    });
    const payload: PayloadDTO = {
      id: user.id,
      email: user.email,
    };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
