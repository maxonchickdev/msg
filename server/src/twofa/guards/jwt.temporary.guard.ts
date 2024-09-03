import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_TEMPORARY_STRATEGY_KEY } from '../strategies/jwt.temporary.strategy';

@Injectable()
export class JwtTemporaryGuard extends AuthGuard(JWT_TEMPORARY_STRATEGY_KEY) {}
