/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  serverRuntimeConfig: {
    mySecret: "secret", //TODO: change this to something more secretive lol
    secondSecret: process.env.SECOND_SECRET,
  },

  images: {
    domains: ["wtwp.com"],
  },

  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development API
        : "https://oodles-2-1.vercel.app/", // production API
  },
};

module.exports = nextConfig;
