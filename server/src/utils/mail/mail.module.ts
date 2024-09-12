import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MailService } from './mail.service';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        secure: false,
        host: process.env.MAILER_HOST,
        port: parseInt(process.env.MAILER_PORT) || 465,
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
