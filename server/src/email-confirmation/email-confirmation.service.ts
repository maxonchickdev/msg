import { Injectable } from '@nestjs/common';
import { EmailConfirmationDto } from 'src/utils/dto/email-confirmation.dto';
import { UsersService } from 'src/repositories/users/users.service';
import { RedisService } from 'src/redis/redis.service';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { ResendCodeDto } from 'src/utils/dto/resend-code.sto';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly usersSerice: UsersService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}

  async confirmEmail(emailConfirmationDto: EmailConfirmationDto) {
    await this.redisService.deleteValue(
      `confirmation-code-${emailConfirmationDto.email}`,
    );
    const user = await this.usersSerice.findByEmail(emailConfirmationDto.email);
    user.isVerified = true;
    await this.usersSerice.saveUser(user);
    return user;
  }

  async resendMail(resendCodeDto: ResendCodeDto) {
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
