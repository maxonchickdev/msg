import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_2FA_KEY } from '../strategies/jwt.2fa.strategy';

@Injectable()
export class Jwt2FaGuard extends AuthGuard(JWT_2FA_KEY) {}
