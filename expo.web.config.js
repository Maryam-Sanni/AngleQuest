const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Modify or extend the default Expo Webpack config
    if (!isServer) {
      config.plugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/index.html'),
          base: '/',
        })
      );
    }

    return config;
  },
};
