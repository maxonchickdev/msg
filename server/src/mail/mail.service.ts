import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send.mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(
    mailDto: SendMailDto,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      await this.mailService.sendMail({
        to: mailDto.to,
        from: 'messanger@gmail.com',
        subject: mailDto.subject,
        html: `<p>${mailDto.text}: <strong>${mailDto.value}</strong></p>`,
      });
      return { statusCode: 200, message: 'Mail sended successfully' };
    } catch (err) {
      throw new HttpException(`Incorrect email: ${err}`, HttpStatus.NOT_FOUND);
    }
  }
}
