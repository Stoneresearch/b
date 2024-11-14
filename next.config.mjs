/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
    },
    webpack: (config, { isServer }) => {
      // Disable Webpack caching
      config.cache = false;
      return config;
    },
  };
  
  export default nextConfig;
  