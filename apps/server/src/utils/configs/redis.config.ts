import { registerAs } from '@nestjs/config'

export default registerAs('redis', () => ({
  ttl: parseInt(process.env.REDIS_TTL),
  max: parseInt(process.env.REDIS_MAX),
}))
