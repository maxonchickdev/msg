import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDTO } from './dto/signin.user.dto';
import { TemporaryTokenDTO } from './dto/temporary.token.dto';
import { GithubStrategy } from './strategies/github.signin.strategy';
import { GoogleStrategy } from './strategies/google.signin.strategy';
import { LocalStrategy } from './strategies/local.sgnin.strategy';

@Injectable()
export class SigninService {
  constructor(
    @Inject('GoogleStrategy')
    private readonly googleAuthStrategy: GoogleStrategy,
    @Inject('LocalStrategy')
    private readonly localAuthStrategy: LocalStrategy,
    @Inject('GithubStrategy') private readonly githubStrategy: GithubStrategy,
  ) {}

  async localAuth(loginUserDTO: LoginUserDTO): Promise<TemporaryTokenDTO> {
    return this.localAuthStrategy.generateTemporaryJwt(loginUserDTO);
  }

  async googleAuth(loginUserDTO: LoginUserDTO): Promise<TemporaryTokenDTO> {
    return this.googleAuthStrategy.generateTemporaryJwt(loginUserDTO);
  }

  async githubAuth(loginUserDTO: LoginUserDTO): Promise<TemporaryTokenDTO> {
    return this.githubStrategy.generateTemporaryJwt(loginUserDTO);
  }
}
