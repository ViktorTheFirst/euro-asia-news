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
    '@material-ui/core/': {
      transform: '@material-ui/core/{{member}}',
    },
    '@material-ui/lab/': {
      transform: '@material-ui/lab/{{member}}',
    },
    '@material-ui/icons/?(((\\w*)?/?)*)': {
      transform: '@material-ui/icons/{{ matches.[1] }}/{{member}}',
    },
  },
};

module.exports = nextConfig;
