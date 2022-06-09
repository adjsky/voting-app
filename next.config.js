/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"]
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
