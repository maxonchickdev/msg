/** @type {import('next').NextConfig} */
import * as dotenv from "dotenv";

dotenv.config({ path: `${process.env.ENVIRONMENT}` });

const nextConfig = {
  output: "standalone",
  distDir: "dist",
  env: {
    LS_HASH_KEY: process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY,
    LS_PREFIX: process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX,
    SERVER_ORIGIN: process.env.NEST_PUBLIC_SERVER_BASE,
    SERVER_BASIC_REG: process.env.NEST_PUBLIC_SERVER_BASIC_REG,
    SERVER_BASIC_REG_CONFIRM: process.env.NEST_PUBLIC_SERVER_BASIC_REG_CONFIRM,
    SERVER_BASIC_AUTH: process.env.NEST_PUBLIC_SERVER_BASIC_AUTH,
    SERVER_GOOGLE_AUTH: process.env.NEST_PUBLIC_SERVER_GOOGLE_AUTH,
    SERVER_RESEND: process.env.NEST_PUBLIC_SERVER_BASIC_REG_RESEND,
    SERVER_PROFILE: process.env.NEST_PUBLIC_SERVER_PROFILE,
    CLIENT_REG: process.env.NEXT_PUBLIC_CLIENT_REG,
    CLIENT_CONF: process.env.NEXT_PUBLIC_CLIENT_CONFIRMATION,
    CLIENT_PROFILE: process.env.NEXT_PUBLIC_CLIENT_PROFILE,
  },
};

export default nextConfig;
