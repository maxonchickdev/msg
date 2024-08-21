import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ResendCodeDTO } from 'src/registration/dto/resend.code.dto';
import { RedisService } from 'src/utils/redis/redis.service';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../utils/mail/mail.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { EmailConfirmationDTO } from './dto/email.confirmation.dto';

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

  async validateConfirmationCode(
    emailConfirmationDto: EmailConfirmationDTO,
  ): Promise<boolean> {
    await this.redisService.deleteValue(
      `confirmation-code-${emailConfirmationDto.email}`,
    );
    const user = await this.usersService.updateUser({
      where: {
        email: emailConfirmationDto.email,
      },
      data: {
        isVerified: true,
      },
    });
    return true;
  }

  async resendConfirmationCode(resendCodeDto: ResendCodeDTO): Promise<boolean> {
    await this.redisService.deleteValue(
      `confirmation-code-${resendCodeDto.email}`,
    );

    const confirmationCode = uuidv4();

    await this.mailService.sendMail({
      to: resendCodeDto.email,
      subject: 'Email from MESSANGER',
      text: 'Your email confirmation code',
      value: confirmationCode,
    });

    await this.redisService.setValue(
      `confirmation-code-${resendCodeDto.email}`,
      confirmationCode,
    );

    return true;
  }
}
