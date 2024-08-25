import { Inject, Injectable } from '@nestjs/common';
import { AccessTokenDTO } from './dto/access.token.dto';
import { LoginUserDTO } from './dto/login.user.dto';
import { GithubStrategy } from './signin-strategies/github.signin.strategy';
import { GoogleStrategy } from './signin-strategies/google.signin.strategy';
import { LocalStrategy } from './signin-strategies/local.sgnin.strategy';

@Injectable()
export class AuthService {
  constructor(
    @Inject('GoogleStrategy')
    private readonly googleAuthStrategy: GoogleStrategy,
    @Inject('LocalStrategy')
    private readonly localAuthStrategy: LocalStrategy,
    @Inject('GithubStrategy') private readonly githubStrategy: GithubStrategy,
  ) {}

  async localAuth(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    return this.localAuthStrategy.generateJwt(loginUserDTO);
  }

  async googleAuth(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    return this.googleAuthStrategy.generateJwt(loginUserDTO);
  }

  async githubAuth(loginUserDTO: LoginUserDTO): Promise<AccessTokenDTO> {
    return this.githubStrategy.generateJwt(loginUserDTO);
  }
}
