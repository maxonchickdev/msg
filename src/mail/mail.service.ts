import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IEmailData } from 'src/interfaces/users.interfaces';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: IEmailData): Promise<string> {
    await this.mailerService.sendMail({
      from: 'email@gmail.com',
      to: data.email,
      subject: data.subject,
      text: data.message,
    });
    return 'Mail sended';
  }
}
