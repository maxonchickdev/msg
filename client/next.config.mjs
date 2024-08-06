/** @type {import('next').NextConfig} */
import * as dotenv from "dotenv";

dotenv.config({ path: `${process.env.ENVIRONMENT}` });

const nextConfig = {
  output: "standalone",
  distDir: "dist",
};

export default nextConfig;
