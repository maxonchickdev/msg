import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/signup/dto/create.user.dto';
import { UserService } from 'src/utils/repositories/user/user.service';

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
    const isSameUsername = await this.usersSerice.findUser({
      username: createUserDto.username,
    });
    if (isSameUsername)
      throw new HttpException(
        'User with the same username exists',
        HttpStatus.CONFLICT,
      );
    const isSameEmail = await this.usersSerice.findUser({
      email: createUserDto.email,
    });
    if (isSameEmail)
      throw new HttpException(
        'User with the same email exists',
        HttpStatus.CONFLICT,
      );
    return true;
  }
}
