import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../utils/repositories/user/user.service';
import { CreateUserDto } from '../dto/create.user.dto';

@Injectable()
export class ValidationUserGuard implements CanActivate {
  constructor(private readonly usersSerice: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: CreateUserDto }>();
    return this.validateUser(request.body);
  }

  async validateUser(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.usersSerice.findUserByUsername(
      createUserDto.username
    );

    if (user.username === createUserDto.username)
      throw new HttpException(
        'User with the same username exists',
        HttpStatus.CONFLICT
      );

    if (user.email === createUserDto.email)
      throw new HttpException(
        'User with the same email exists',
        HttpStatus.CONFLICT
      );

    return true;
  }
}
