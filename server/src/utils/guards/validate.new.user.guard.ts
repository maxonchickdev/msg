import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { UsersService } from 'src/repositories/users/users.service';

@Injectable()
export class ValidationUserGuard implements CanActivate {
  constructor(private readonly usersSerice: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: CreateUserDto }>();
    return this.validateUser(request.body);
  }

  async validateUser(createUserDto: CreateUserDto): Promise<boolean> {
    const isSameUsername = await this.usersSerice.findByUsername(
      createUserDto.username,
    );
    if (isSameUsername)
      throw new HttpException(
        'User with the same username exists',
        HttpStatus.CONFLICT,
      );
    const isSameEmail = await this.usersSerice.findByEmail(createUserDto.email);
    if (isSameEmail)
      throw new HttpException(
        'User with the same email exists',
        HttpStatus.CONFLICT,
      );
    return true;
  }
}
