import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RedisService } from 'src/utils/redis/redis.service';
import { UserService } from 'src/utils/repositories/user/user.service';
import { EmailConfirmationDTO } from '../dto/email.confirmation.dto';

@Injectable()
export class ConfirmationEmailGuard implements CanActivate {
  constructor(
    private readonly usersSerice: UserService,
    private readonly redisService: RedisService,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: EmailConfirmationDTO }>();
    return this.validateEmail(request.body);
  }

  async validateEmail(
    emailConfirmationDto: EmailConfirmationDTO,
  ): Promise<boolean> {
    const user = await this.usersSerice.findUser({
      email: emailConfirmationDto.email,
    });
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    const confirmationCode = await this.redisService.getValue(
      `confirmation-code-${emailConfirmationDto.email.split('@')[0]}`,
    );

    if (confirmationCode !== emailConfirmationDto.code) {
      throw new HttpException('Invalid code', HttpStatus.CONFLICT);
    }
    return true;
  }
}
