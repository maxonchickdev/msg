import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_ACCESS_STRATEGY_KEY } from '../strategies/jwt.strategy';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_ACCESS_STRATEGY_KEY) {}
