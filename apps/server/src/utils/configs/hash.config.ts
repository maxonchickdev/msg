import { registerAs } from '@nestjs/config'

export default registerAs('hash', () => ({
  salt: process.env.HASH_PASS,
}))
