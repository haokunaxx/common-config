const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { SERVER_PATH, SERVER_PORT } = require('../constant');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: SERVER_PATH,
    port: SERVER_PORT,
    compress: true,
    hot: true,
    open: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
  },
});
