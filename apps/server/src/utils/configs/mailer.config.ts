import { registerAs } from '@nestjs/config'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default registerAs('mailer', () => ({
	transport: {
		secure: false,
		host: process.env.MAILER_HOST,
		port: parseInt(process.env.MAILER_PORT),
		auth: {
			user: process.env.MAILER_USER,
			pass: process.env.MAILER_PASS,
		}
	}
}))
