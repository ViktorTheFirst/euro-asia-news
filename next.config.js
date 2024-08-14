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
        protocol: 'http',
        hostname: 'viktor-indie.com',
        port: '',
        //pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'viktor-indie.com',
        port: '',
        //pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        //pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5001',
        //pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.246',
        port: '2905',
        //pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '192.168.1.246',
        port: '2905',
        //pathname: '**',
      },
      {
        protocol: 'http',
        hostname:
          'euroasianewsbe-backend-45a6cf-bcf6f8-92-113-25-137.traefik.me',
        port: '2905',
        //pathname: '**',
      },
      {
        protocol: 'https',
        hostname:
          'euroasianewsbe-backend-45a6cf-bcf6f8-92-113-25-137.traefik.me',
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
