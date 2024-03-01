/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
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
        hostname: 'localhost',
        port: '5000',
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
    '@mui/icons-material/?(((\\w*)?/?)*)': {
      transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
    },
  },
};

module.exports = nextConfig;
