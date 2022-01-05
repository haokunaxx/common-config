const webpack = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { SERVER_PATH, SERVER_PORT } = require('../constant');
// const proxySettings = require('../../src/request/setProxy')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  target: 'web',
  devServer: {
    host: SERVER_PATH,
    port: SERVER_PORT,
    compress: true,
    hot: true,
    open: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  //proxy
  // proxy:{
  //   ...proxySettings
  // }
});
