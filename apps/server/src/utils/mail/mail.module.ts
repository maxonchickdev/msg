import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailerConfig from '../configs/mailer.config';
import { MailService } from './mail.service';
/**
 *
 *
 * @export
 * @class MailModule
 */
@Module({
  imports: [
    ConfigModule.forFeature(mailerConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          secure: configService.get<boolean>('mailer.transport.secure'),
          host: configService.get<string>('mailer.transport.host'),
          port: configService.get<number>('mailer.transport.port'),
          auth: {
            user: configService.get<string>('mailer.transport.auth.user'),
            pass: configService.get<string>('mailer.transport.auth.pass'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
