/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  // publicRuntimeConfig: {
  //   // Will be available on both server and client
  //   staticFolder: "/static",
  // },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development API
        : "http://localhost:3000/api", //TODO: replace production API with correct route
  },
};

module.exports = nextConfig;
