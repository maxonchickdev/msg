import { registerAs } from '@nestjs/config'

export default registerAs('google', () => ({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: process.env.GOOGLE_CALL_BACK_URL,
  appName: process.env.GOOGLE_AUTHENTICATOR_APP_NAME,
}))
