import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 *
 *
 * @export
 * @class GithubAuthGuard
 * @extends {AuthGuard('github')}
 */
@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {}
