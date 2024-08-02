import { Injectable } from '@nestjs/common';
import { User } from '../utils/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from 'src/repositories/users/users.service';
import { CreateUserDto } from 'src/utils/dto/user.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const confirmationCode = uuidv4();

    await this.mailService.sendMail({
      to: createUserDto.email,
      subject: 'Email from MESSANGER',
      text: 'Your email confirmation code',
      value: confirmationCode,
    });

    await this.redisService.setValue(
      `confirmation-code-${createUserDto.email}`,
      confirmationCode,
    );

    const newUser = await this.usersService.createUser({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    await this.usersService.saveUser(newUser);

    return newUser;
  }
}
