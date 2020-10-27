require("dotenv").config();
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");

// const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
// console.log("APIKEY: ", apiKey);

module.exports = withCSS({
  env: {
    API_KEY: process.env.SHOPIFY_API_KEY,
  },
  webpack: (config) => {
    const env = process.env;
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
});
