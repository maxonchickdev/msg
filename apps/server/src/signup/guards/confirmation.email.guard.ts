import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RedisService } from '../../utils/redis/redis.service';
import { UserService } from '../../utils/repositories/user/user.service';
import { EmailConfirmationDto } from '../dto/email.confirmation.dto';

@Injectable()
export class ConfirmationEmailGuard implements CanActivate {
  constructor(
    private readonly usersSerice: UserService,
    private readonly redisService: RedisService
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: EmailConfirmationDto }>();
    return this.validateEmail(request.body);
  }

  async validateEmail(
    emailConfirmationDto: EmailConfirmationDto
  ): Promise<boolean> {
    await this.usersSerice.findUserByEmail(emailConfirmationDto.email);

    const confirmationCode = await this.redisService.getValue(
      `confirmation-code-${emailConfirmationDto.email.split('@')[0]}`
    );

    if (confirmationCode !== emailConfirmationDto.code) {
      throw new HttpException('Invalid code', HttpStatus.CONFLICT);
    }
    return true;
  }
}
