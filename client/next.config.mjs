/** @type {import('next').NextConfig} */
import * as dotenv from "dotenv";

dotenv.config({ path: `${process.env.ENVIRONMENT}` });

const nextConfig = {
  output: "standalone",
  distDir: "dist",
  transpilePackages: ["mui-one-time-password-input"],
  images: {
    domains: ["msg-bucket.s3.eu-north-1.amazonaws.com"],
    formats: ["image/webp", "image/avif"],
  },
  env: {
    LS_HASH_KEY: process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY,
    LS_PREFIX: process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX,
    SERVER_ORIGIN: process.env.NEST_PUBLIC_SERVER_BASE,
    SERVER_BASIC_SIGNUP: process.env.NEST_PUBLIC_SERVER_BASIC_SIGNUP,
    SERVER_BASIC_SIGNUP_CONFIRM:
      process.env.NEST_PUBLIC_SERVER_BASIC_SIGNUP_CONFIRM,
    SERVER_BASIC_SIGNUP_RESEND:
      process.env.NEST_PUBLIC_SERVER_BASIC_SIGNUP_RESEND,
    SERVER_BASIC_SIGNIN: process.env.NEST_PUBLIC_SERVER_BASIC_SIGNIN,
    SERVER_GOOGLE_SIGNIN: process.env.NEST_PUBLIC_SERVER_GOOGLE_SIGNIN,
    SERVER_GITHUB_SIGNIN: process.env.NEST_PUBLIC_SERVER_GITHUB_SIGNIN,
    SERVER_QR: process.env.NEST_PUBLIC_SERVER_QR,
    SERVER_TWO_FA_ON: process.env.NEST_PUBLIC_SERVER_TWO_FA_ON,
    SERVER_PROFILE: process.env.NEST_PUBLIC_SERVER_PROFILE,
    CLIENT_REG: process.env.NEXT_PUBLIC_CLIENT_REG,
    CLIENT_CONF: process.env.NEXT_PUBLIC_CLIENT_CONFIRMATION,
    CLIENT_PROFILE: process.env.NEXT_PUBLIC_CLIENT_PROFILE,
    CLIENT_TWOFA: process.env.NEXT_PUBLIC_CLIENT_TWOFA,
    SERVER_UPLOAD_AVATAR: process.env.NEST_PUBLIC_SERVER_UPLOAD_AVATAR,
  },
};

export default nextConfig;
