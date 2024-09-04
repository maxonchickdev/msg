import { Injectable } from '@nestjs/common';
import { SigninUserDto } from './dto/signin.user.dto';
import { TemporaryTokenDto } from './dto/temporary.token.dto';
import { GithubStrategy } from './strategies/github.signin.strategy';
import { GoogleStrategy } from './strategies/google.signin.strategy';
import { LocalStrategy } from './strategies/local.signin.strategy';

@Injectable()
export class SigninService {
  constructor(
    private readonly googleAuthStrategy: GoogleStrategy,
    private readonly localAuthStrategy: LocalStrategy,
    private readonly githubStrategy: GithubStrategy,
  ) {}

  async localAuth(loginUserDTO: SigninUserDto): Promise<TemporaryTokenDto> {
    return this.localAuthStrategy.generateTemporaryJwt(loginUserDTO);
  }

  async googleAuth(loginUserDTO: SigninUserDto): Promise<TemporaryTokenDto> {
    return this.googleAuthStrategy.generateTemporaryJwt(loginUserDTO);
  }

  async githubAuth(loginUserDTO: SigninUserDto): Promise<TemporaryTokenDto> {
    return this.githubStrategy.generateTemporaryJwt(loginUserDTO);
  }
}
