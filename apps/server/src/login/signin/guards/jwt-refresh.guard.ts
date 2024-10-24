import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH_TOKEN } from '../strategies/jwt-refresh.token.strategy';
/**
 *
 *
 * @export
 * @class JwtRefreshGuard
 * @extends {AuthGuard(JWT_REFRESH_TOKEN)}
 */
@Injectable()
export class JwtRefreshGuard extends AuthGuard(JWT_REFRESH_TOKEN) {}
