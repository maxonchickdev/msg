import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { SigninTokensDto } from './dto/signin.tokens.dto'
import { SigninUserDto } from './dto/signin.user.dto'
import { GithubStrategy } from './strategies/github.signin.strategy'
import { GoogleStrategy } from './strategies/google.signin.strategy'
import { LocalStrategy } from './strategies/local.signin.strategy'

@Injectable()
export class SigninService {
  constructor(
    private readonly googleAuthStrategy: GoogleStrategy,
    private readonly localAuthStrategy: LocalStrategy,
    private readonly githubStrategy: GithubStrategy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    console.log(this.configService.get<string>('jwt.accessSecret'))
  }

  async localAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.localAuthStrategy.generateSigninTokens(signinUserDTO)
  }

  async googleAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.googleAuthStrategy.generateSigninTokens(signinUserDTO)
  }

  async githubAuth(signinUserDTO: SigninUserDto): Promise<SigninTokensDto> {
    return this.githubStrategy.generateSigninTokens(signinUserDTO)
  }

  async getNewAccessToken(userId: string): Promise<string> {
    const newAccessToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get<string>('jwt.accessSecret'),
        expiresIn: this.configService.get<string>('jwt.accessExpiresIn'),
      }
    )
    return newAccessToken
  }
}
