import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { EmailConfirmationDTO } from 'src/email-confirmation/dto/email.confirmation.dto';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/repositories/users/users.service';

@Injectable()
export class ConfirmationEmailGuard implements CanActivate {
  constructor(
    private readonly usersSerice: UsersService,
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
      `confirmation-code-${emailConfirmationDto.email}`,
    );

    if (confirmationCode !== emailConfirmationDto.code) {
      throw new HttpException('Invalid code', HttpStatus.CONFLICT);
    }
    return true;
  }
}
