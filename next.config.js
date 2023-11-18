/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { NYT_API_KEY: process.env.NYT_API_KEY }
};

module.exports = nextConfig;
