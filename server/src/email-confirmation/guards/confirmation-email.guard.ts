import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmailConfirmationDto } from '../dto/email-confirmation.dto';
import { RegistrationService } from '../../registration/registration.service';

@Injectable()
export class ConfirmationEmailGuard implements CanActivate {
  constructor(private readonly registrationService: RegistrationService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: EmailConfirmationDto }>();
    return this.validateEmail(request.body);
  }

  async validateEmail(
    emailConfirmationDto: EmailConfirmationDto,
  ): Promise<boolean> {
    const user = await this.registrationService.findByEmail(
      emailConfirmationDto.email,
    );
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    if (user.validationCode.code !== emailConfirmationDto.code)
      throw new HttpException('Invalid code', HttpStatus.CONFLICT);

    return true;
  }
}
