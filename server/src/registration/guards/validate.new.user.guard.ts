import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/registration/dto/create.user.dto';
import { UsersService } from 'src/utils/repositories/users/users.service';

@Injectable()
export class ValidationUserGuard implements CanActivate {
  constructor(private readonly usersSerice: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { body: CreateUserDTO }>();
    return this.validateUser(request.body);
  }

  async validateUser(createUserDto: CreateUserDTO): Promise<boolean> {
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
