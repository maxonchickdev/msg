import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { RegistrationService } from '../registration.service';

@Injectable()
export class ValidationUserGuard implements CanActivate {
  constructor(private readonly registrationService: RegistrationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: CreateUserDto }>();
    return this.validateUser(request.body);
  }

  async validateUser(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.registrationService.findByEmail(
      createUserDto.email,
    );
    if (user)
      throw new HttpException(
        'User with the same email exists',
        HttpStatus.CONFLICT,
      );
    return true;
  }
}
