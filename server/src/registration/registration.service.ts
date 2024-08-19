import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RedisService } from 'src/redis/redis.service';
import { UsersService } from 'src/repositories/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { CreateUserDTO } from './dto/create.user.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}
  async signupUser(createUserDto: CreateUserDTO): Promise<User> {
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

    return newUser;
  }
}
