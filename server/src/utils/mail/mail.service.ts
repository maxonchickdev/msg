import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send.mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(mailDto: SendMailDto): Promise<boolean> {
    try {
      await this.mailService.sendMail({
        to: mailDto.to,
        from: 'messanger@gmail.com',
        subject: mailDto.subject,
        html: `<p>${mailDto.text}: <strong>${mailDto.value}</strong></p>`,
      });
      return true;
    } catch (err) {
      throw new HttpException('Incorrect email', HttpStatus.NOT_FOUND);
    }
  }
}
