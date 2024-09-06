import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Jwt2FaGuard extends AuthGuard('jwt-two-factor') {}
