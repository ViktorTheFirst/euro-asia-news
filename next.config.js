/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  // needed for react-pdf package
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'viktor-indie.com',
        port: '',
        //pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        //pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.246',
        port: '2905',
        //pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '2905',
        //pathname: '**',
      },
    ],
  },
  // doesnt build the whole MUI and lodash modules on build time
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    '@mui/material/': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab/': {
      transform: '@mui/lab/{{member}}',
    },
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
};

module.exports = nextConfig;
