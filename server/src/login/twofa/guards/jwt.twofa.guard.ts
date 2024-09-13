import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_QR_KEY } from '../strategies/jwt.twofa.strategy';

@Injectable()
export class JwtTwofaGuard extends AuthGuard(JWT_QR_KEY) {}