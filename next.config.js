/** @type {import('next').NextConfig} */
//const nextConfig = {};

// const nextConfig = {
//   webpack5: true,
//   webpack: (config) => {
//     config.resolve.fallback = {
//       fs: false,
//       dgram: false,
//     };

//     return config;
//   },
// };

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: "empty",
        dgram: "empty",
      };
    }

    return config;
  },
};
module.exports = nextConfig;
