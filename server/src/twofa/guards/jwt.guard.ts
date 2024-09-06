import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_QR_KEY } from '../strategies/jwt.strategy';

@Injectable()
export class JwtGuard extends AuthGuard(JWT_QR_KEY) {}
