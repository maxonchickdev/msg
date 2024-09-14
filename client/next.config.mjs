/** @type {import('next').NextConfig} */
import * as dotenv from "dotenv"

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

const nextConfig = {
  output: "standalone",
  distDir: "dist",
  transpilePackages: ["mui-one-time-password-input"],
  images: {
    domains: ["msg-bucket.s3.eu-north-1.amazonaws.com"],
    formats: ["image/webp", "image/avif"],
  },
  env: {
    CLIENT_LS_HASH: process.env.CLIENT_LS_HASH,
    CLIENT_LS_PREFIX: process.env.CLIENT_LS_PREFIX,

    SERVER_HOST: process.env.SERVER_HOST,
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_SIGNUP: process.env.SERVER_SIGNUP,
    SERVER_SIGNUP_CONFIRM: process.env.SERVER_SIGNUP_CONFIRM,
    SERVER_SIGNUP_RESEND_CODE: process.env.SERVER_SIGNUP_RESEND_CODE,
    SERVER_SIGNIN_BASIC: process.env.SERVER_SIGNIN_BASIC,
    SERVER_SIGNIN_GOOGLE: process.env.SERVER_SIGNIN_GOOGLE,
    SERVER_SIGNIN_GITHUB: process.env.SERVER_SIGNIN_GITHUB,
    SERVER_SIGNIN_REFRESH: process.env.SERVER_SIGNIN_REFRESH,
    SERVER_TWOFA_QR: process.env.SERVER_TWOFA_QR,
    SERVER_TWOFA_TURN_ON: process.env.SERVER_TWOFA_TURN_ON,
    SERVER_PROFILE: process.env.SERVER_PROFILE,
    SERVER_UPLOAD_AVATAR: process.env.SERVER_UPLOAD_AVATAR,

    CLIENT_SIGNUP: process.env.CLIENT_SIGNUP,
    CLIENT_SIGNUP_CONFIRM: process.env.CLIENT_SIGNUP_CONFIRM,
    CLIENT_SIGNIN: process.env.CLIENT_SIGNIN,
    CLIENT_SIGNIN_TWOFA: process.env.CLIENT_SIGNIN_TWOFA,
    CLIENT_PROFILE: process.env.CLIENT_PROFILE,
  },
};

export default nextConfig;
