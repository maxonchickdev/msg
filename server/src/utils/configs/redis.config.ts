import { registerAs } from '@nestjs/config'
import * as dotenv from 'dotenv'

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export default registerAs('redis', () => ({
	ttl: process.env.REDIS_TTL,
	max: parseInt(process.env.REDIS_MAX),
}))
