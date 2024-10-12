import { registerAs } from '@nestjs/config'
import * as dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default registerAs('redis', () => ({
	ttl: process.env.REDIS_TTL,
	max: parseInt(process.env.REDIS_MAX),
}))
