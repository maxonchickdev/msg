import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { ResendCodeDto } from 'src/signup/dto/resend.code.dto';
import { RedisService } from 'src/utils/redis/redis.service';
import { UserService } from 'src/utils/repositories/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../utils/mail/mail.service';
import { CreateUserDto } from './dto/create.user.dto';
import { EmailConfirmationDto } from './dto/email.confirmation.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly usersService: UserService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async signupUser(createUserDto: CreateUserDto): Promise<boolean> {
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

    await this.usersService.createUser({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await bcrypt.hash(
        createUserDto.password,
        parseInt(this.configService.get<string>('SALT_OR_ROUNDS'), 10),
      ),
    });

    return true;
  }

  async validateConfirmationCode(
    emailConfirmationDto: EmailConfirmationDto,
  ): Promise<boolean> {
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
    return true;
  }

  async resendConfirmationCode(resendCodeDto: ResendCodeDto): Promise<boolean> {
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
