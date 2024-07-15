import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IEmailData } from 'src/classes/users.classes';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(
    data: IEmailData,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      await this.mailService.sendMail({
        to: data.to,
        from: 'nestjs-app.gmail.com',
        subject: 'Your verification code',
        text: data.message,
      });
      return { statusCode: 200, message: 'Mail sended successfully' };
    } catch (err) {
      throw new HttpException('Incorrect email', HttpStatus.BAD_REQUEST);
    }
  }
}
