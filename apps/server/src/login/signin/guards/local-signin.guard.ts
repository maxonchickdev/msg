import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 *
 *
 * @export
 * @class LocalSigninGuard
 * @extends {AuthGuard('local')}
 */
@Injectable()
export class LocalSigninGuard extends AuthGuard('local') {}
