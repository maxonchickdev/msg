import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendMailDto } from './dto/send.mail.dto';
/**
 *
 *
 * @export
 * @class MailService
 */
@Injectable()
export class MailService {
  /**
   * Creates an instance of MailService.
   * @param {MailerService} mailService
   * @memberof MailService
   */
  constructor(private readonly mailService: MailerService) {}
  /**
   *
   *
   * @param {SendMailDto} mailDto
   * @return {*}  {Promise<boolean>}
   * @memberof MailService
   */
  async sendMail(mailDto: SendMailDto): Promise<boolean> {
    try {
      await this.mailService.sendMail({
        to: mailDto.to,
        from: 'msg@gmail.com',
        subject: mailDto.subject,
        html: `<p>${mailDto.text}: <strong>${mailDto.value}</strong></p>`,
      });
      return true;
    } catch (err) {
      throw new HttpException(`Incorrect email ${err}`, HttpStatus.NOT_FOUND);
    }
  }
}
