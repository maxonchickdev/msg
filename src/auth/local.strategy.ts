import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string) {
    const pickedUser = await this.authService.jwtValidateUser(
      email,
      password
    );
    if (!pickedUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return pickedUser;
  }
}
