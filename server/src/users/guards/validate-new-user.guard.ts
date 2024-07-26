import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class ValidationUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: CreateUserDto }>();
    return this.validateUser(request.body);
  }

  async validateUser(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) throw new HttpException('User exists', HttpStatus.CONFLICT);
    return true;
  }
}
