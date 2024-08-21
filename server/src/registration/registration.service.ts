import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { ResendCodeDTO } from 'src/registration/dto/resend.code.dto';
import { RedisService } from 'src/utils/redis/redis.service';
import { UsersService } from 'src/utils/repositories/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../utils/mail/mail.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { EmailConfirmationDTO } from './dto/email.confirmation.dto';
import { JustifiedUserDTO } from './dto/justified.user.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async signupUser(createUserDto: CreateUserDTO): Promise<JustifiedUserDTO> {
    const confirmationCode = uuidv4();

    await this.mailService.sendMail({
      to: createUserDto.email,
      subject: 'Email from MESSANGER',
      text: 'Your email confirmation code',
      value: confirmationCode,
    });

    await this.redisService.setValue(
      `confirmation-code-${createUserDto.email.split('@')[0]}`,
      confirmationCode,
    );

    const newUser = await this.usersService.createUser({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await bcrypt.hash(
        createUserDto.password,
        parseInt(this.configService.get<string>('SALT_OR_ROUNDS'), 10),
      ),
    });

    return {
      username: newUser.username,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  async validateConfirmationCode(
    emailConfirmationDto: EmailConfirmationDTO,
  ): Promise<JustifiedUserDTO> {
    await this.redisService.deleteValue(
      `confirmation-code-${emailConfirmationDto.email.split('@')[0]}`,
    );
    const user = await this.usersService.updateUser({
      where: {
        email: emailConfirmationDto.email,
      },
      data: {
        isVerified: true,
      },
    });
    return {
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async resendConfirmationCode(resendCodeDto: ResendCodeDTO): Promise<boolean> {
    await this.redisService.deleteValue(
      `confirmation-code-${resendCodeDto.email.split('@')[0]}`,
    );

    const confirmationCode = uuidv4();

    await this.mailService.sendMail({
      to: resendCodeDto.email,
      subject: 'Email from MESSANGER',
      text: 'Your email confirmation code',
      value: confirmationCode,
    });

    await this.redisService.setValue(
      `confirmation-code-${resendCodeDto.email.split('@')[0]}`,
      confirmationCode,
    );

    return true;
  }
}
