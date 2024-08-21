import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenDTO } from './dto/access.token.dto';
import { LoginUserDTO } from './dto/login.user.dto';
import { GoogleStrategy } from './signin-strategies/google.strategy';
import { LocalStrategy } from './signin-strategies/local.strategy';

@Injectable()
export class AuthService {
  constructor(
    @Inject('GoogleStrategy')
    private readonly googleAuthStrategy: GoogleStrategy,
    @Inject('LocalStrategy')
    private readonly localAuthStrategy: LocalStrategy,
  ) {}

  async localAuth(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    return this.localAuthStrategy.generateJwt(loginUserDTO);
  }

  async googleAuth(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    return this.googleAuthStrategy.generateJwt(loginUserDTO);
  }
}
