/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env['API_URL'],
    DEP_ENV: process.env['DEP_ENV'],
  },
};

module.exports = nextConfig;
