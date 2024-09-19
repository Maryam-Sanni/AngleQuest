const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = function(env, argv) {
  const envFile = `.env.${process.env.NODE_ENV}`;
  const envConfig = dotenv.config({ path: envFile }).parsed;

  return {
    // other configurations...
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(envConfig),
      }),
    ],
    // other configurations...
  };
};
