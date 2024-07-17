import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(
    to: string,
    message: string,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      await this.mailService.sendMail({
        to: to,
        from: 'nestjs-app.gmail.com',
        subject: 'Your verification code',
        text: message,
      });
      return { statusCode: 200, message: 'Mail sended successfully' };
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
}
