import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IEmailData } from 'src/interfaces/users.interfaces';
import { MailService } from './mail.service';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: IEmailData })
  @ApiOperation({ summary: 'Send email' })
  async sendMail(@Body() data: IEmailData, @Res() res: Response) {
    try {
      const message = await this.mailService.sendMail(data);
      return res.status(200).json({ msg: message });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  }
}

// Message sended
