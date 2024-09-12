import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_MAIN } from '../strategies/jwt.main.strategy';

@Injectable()
export class JwtMainGuard extends AuthGuard(JWT_MAIN) {}
