import { Injectable } from '@nestjs/common';
import { AccessTokenDto } from './dto/access.token.dto';
import { SigninUserDto } from './dto/signin.user.dto';
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

  async localAuth(loginUserDTO: SigninUserDto): Promise<AccessTokenDto> {
    return this.localAuthStrategy.generateAccessJwt(loginUserDTO);
  }

  async googleAuth(loginUserDTO: SigninUserDto): Promise<AccessTokenDto> {
    return this.googleAuthStrategy.generateAccessJwt(loginUserDTO);
  }

  async githubAuth(loginUserDTO: SigninUserDto): Promise<AccessTokenDto> {
    return this.githubStrategy.generateAccessJwt(loginUserDTO);
  }
}
