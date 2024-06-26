import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { IEmailData } from 'src/classes/users.classes'
import { MailService } from './mail.service'

@ApiTags('mail')
@Controller('mail')
export class MailController {
	constructor(private readonly mailService: MailService) {}

	@Post('/')
	@HttpCode(200)
	@ApiResponse({ status: 200, description: 'Mail submitted successfully' })
	@ApiResponse({ status: 500, description: 'Internal server error' })
	async sendMail(@Body() data: IEmailData, @Res() res: Response) {
		try {
			const {status, msg} = await this.mailService.sendMail(data)
			return res.status(200).json({status: status, msg: msg})
		} catch(err) {
			return res.status(500).json({status: 500, msg: err })
		}
	}
}
