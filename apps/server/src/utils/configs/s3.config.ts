import { registerAs } from '@nestjs/config'

export default registerAs('s3', () => ({
  bucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  region: process.env.AWS_REGION,
  accessKey: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
}))
