import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 *
 *
 * @export
 * @class GoogleOAuthGuard
 * @extends {AuthGuard('google')}
 */
@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor() {
    super({
      accessType: 'offline',
    });
  }
}
