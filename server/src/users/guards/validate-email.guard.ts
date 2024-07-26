import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { EmailValidationDto } from '../dto/user.dto';

@Injectable()
export class ValidationEmailGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: EmailValidationDto }>();
    return this.validateEmail(request.body);
  }

  async validateEmail(
    emailValidationDto: EmailValidationDto,
  ): Promise<boolean> {
    const user = await this.usersService.findByEmail(emailValidationDto.email);
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    if (user.validationCode.code !== emailValidationDto.code)
      throw new HttpException('Invalid code', HttpStatus.CONFLICT);

    return true;
  }
}
