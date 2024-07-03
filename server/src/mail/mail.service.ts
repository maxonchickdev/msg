import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { IEmailData } from 'src/classes/users.classes'

@Injectable()
export class MailService {
	constructor(private readonly mailService: MailerService) {}

	async sendMail(data: IEmailData): Promise<{status: number, msg: string}> {
		await this.mailService.sendMail({
			to: data.to,
			from: data.from,
			subject: data.subject,
			text: data.message
		})
		return {status: 200, msg: 'Mail sended successfully'}
	}
}