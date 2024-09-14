import { Injectable, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as dotenv from 'dotenv'
import { SigninTokensDto } from './dto/signin.tokens.dto'
import { SigninUserDto } from './dto/signin.user.dto'
import { GithubStrategy } from './strategies/github.signin.strategy'
import { GoogleStrategy } from './strategies/google.signin.strategy'
import { LocalStrategy } from './strategies/local.signin.strategy'

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Injectable()
export class SigninService {
  constructor(
    private readonly googleAuthStrategy: GoogleStrategy,
    private readonly localAuthStrategy: LocalStrategy,
    private readonly githubStrategy: GithubStrategy,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(SigninService.name);

  async localAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.localAuthStrategy.generateSigninTokens(signinUserDTO);
  }

  async googleAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.googleAuthStrategy.generateSigninTokens(signinUserDTO);
  }

  async githubAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.githubStrategy.generateSigninTokens(signinUserDTO);
  }

  async getNewAccessToken(userId: string): Promise<string> {
    const newAccessToken = this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: `${process.env.JWT_ACCESS_EXPIRES_IN}s`,
      },
    );
    return newAccessToken;
  }
}
