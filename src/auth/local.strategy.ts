import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUser } from 'src/interfaces/users.interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: IUser) {
    const pickedUser = await this.authService.validateUser(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return pickedUser;
  }
}
