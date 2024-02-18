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
  /* async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
        missing: [
          {
            type: 'header',
            key: 'authorization',
          },
        ],
      },
    ];
  }, */
};

module.exports = nextConfig;
