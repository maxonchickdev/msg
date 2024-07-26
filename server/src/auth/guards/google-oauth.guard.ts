import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
  constructor(private readonly configService: ConfigService) {
    super({
      accessType: 'offline',
    });
  }
}
