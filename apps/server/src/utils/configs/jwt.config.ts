import { registerAs } from '@nestjs/config'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default registerAs('jwt', () => ({
	secret: process.env.JWT_SECRET,
	signOptions: {
		expiresIn: `${process.env.JWT_ACCESS_EXPIRES_IN} + 's'`,
	}
}))
