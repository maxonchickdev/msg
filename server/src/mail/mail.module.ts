import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'
import { MailController } from './mail.controller'
import { MailService } from './mail.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					secure: true,
					host: process.env.MAIL_HOST,
					port: parseInt(process.env.MAIL_PORT),
					auth: {
						user: process.env.MAIL_USER,
						pass: process.env.MAIL_PASS
					}
				}
			}),
		}),
	],
	controllers: [MailController],
	providers: [MailService]
})
export class MailModule {}
