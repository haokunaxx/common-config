const webpack = require('webpack')
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { SERVER_PATH, SERVER_PORT } = require('../constant');
// const proxySettings = require('../../src/request/setProxy')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map', //代码映射
  target: 'web',  //热更新失效解决
  devServer: {
    host: SERVER_PATH,
    port: SERVER_PORT,
    compress: true,
    hot: true,
    open: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    before:require('../../mock/server/index.js')
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  //proxy
  // proxy:{
  //   ...proxySettings
  // }
});
