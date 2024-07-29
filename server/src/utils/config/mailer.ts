import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env' });

const mailerConfig = {
  transport: {
    secure: true,
    host: `${process.env.MAILER_HOST}`,
    port: parseInt(`${process.env.MAILER_PORT}`, 10) || 465,
    auth: {
      user: `${process.env.MAILER_USER}`,
      pass: `${process.env.MAILER_PASS}`,
    },
  },
};

export default registerAs('mailer', () => mailerConfig);
