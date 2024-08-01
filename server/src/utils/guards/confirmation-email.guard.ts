import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmailConfirmationDto } from '../dto/email-confirmation.dto';
import { UsersService } from 'src/repositories/users/users.service';

@Injectable()
export class ConfirmationEmailGuard implements CanActivate {
  constructor(private readonly usersSerice: UsersService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: EmailConfirmationDto }>();
    return this.validateEmail(request.body);
  }

  async validateEmail(
    emailConfirmationDto: EmailConfirmationDto,
  ): Promise<boolean> {
    const user = await this.usersSerice.findByEmail(emailConfirmationDto.email);
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    if (user.confirmationCode.code !== emailConfirmationDto.code)
      throw new HttpException('Invalid code', HttpStatus.CONFLICT);

    return true;
  }
}
