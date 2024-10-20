import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../utils/mail/mail.service';
import { RedisService } from '../utils/redis/redis.service';
import { UserService } from '../utils/repositories/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailConfirmationDto } from './dto/email-confirmation.dto';
import { ResendCodeDto } from './dto/resend-code.dto';

@Injectable()
export class RegistrationService {
  /**
   * Creates an instance of RegistrationService.
   * @param {UserService} usersService
   * @param {MailService} mailService
   * @param {RedisService} redisService
   * @param {ConfigService} configService
   * @memberof RegistrationService
   */
  constructor(
    private readonly usersService: UserService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {}
  /**
   *
   *
   * @param {CreateUserDto} createUserDto
   * @return {*}  {Promise<boolean>}
   * @memberof RegistrationService
   */
  async signupUser(createUserDto: CreateUserDto): Promise<boolean> {
    const confirmationCode = uuidv4();

    await this.mailService.sendMail({
      to: createUserDto.email,
      subject: 'Email from MSG',
      text: 'Your email confirmation code',
      value: confirmationCode,
    });

    await this.redisService.setValue(
      `confirmation-code-${createUserDto.email.split('@')[0]}`,
      confirmationCode
    );

    await this.usersService.createUser({
      username: createUserDto.username,
      email: createUserDto.email,
      password: await bcrypt.hash(
        createUserDto.password,
        this.configService.get<number>('hash.salt')
      ),
    });

    return true;
  }
  /**
   *
   *
   * @param {EmailConfirmationDto} emailConfirmationDto
   * @return {*}  {Promise<boolean>}
   * @memberof RegistrationService
   */
  async validateConfirmationCode(
    emailConfirmationDto: EmailConfirmationDto
  ): Promise<boolean> {
    await this.redisService.deleteValue(
      `confirmation-code-${emailConfirmationDto.email.split('@')[0]}`
    );
    await this.usersService.updateUser({
      where: {
        email: emailConfirmationDto.email,
      },
      data: {
        isVerified: true,
      },
    });
    return true;
  }
  /**
   *
   *
   * @param {ResendCodeDto} resendCodeDto
   * @return {*}  {Promise<boolean>}
   * @memberof RegistrationService
   */
  async resendConfirmationCode(resendCodeDto: ResendCodeDto): Promise<boolean> {
    await this.redisService.deleteValue(
      `confirmation-code-${resendCodeDto.email.split('@')[0]}`
    );

    const confirmationCode = uuidv4();

    await this.mailService.sendMail({
      to: resendCodeDto.email,
      subject: 'Email from MSG',
      text: 'Your email confirmation code',
      value: confirmationCode,
    });

    await this.redisService.setValue(
      `confirmation-code-${resendCodeDto.email.split('@')[0]}`,
      confirmationCode
    );

    return true;
  }
}
