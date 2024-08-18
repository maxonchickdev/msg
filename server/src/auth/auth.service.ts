import { Inject, Injectable } from '@nestjs/common';
import { GoogleAuthStrategy } from './auth-strategies/google.auth.strategy';
import { LocalAuthStrategy } from './auth-strategies/local.auth.strategy';
import { AccessTokenDTO } from './dto/access.token.dto';
import { LoginUserDTO } from './dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('GoogleAuthStrategy')
    private readonly googleAuthStrategy: GoogleAuthStrategy,
    @Inject('LocalAuthStrategy')
    private readonly localAuthStrategy: LocalAuthStrategy,
  ) {}

  async localAuth(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    return this.localAuthStrategy.generateJwtToken(loginUserDTO);
  }

  async googleAuth(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    return this.googleAuthStrategy.generateJwtToken(loginUserDTO);
  }
}
