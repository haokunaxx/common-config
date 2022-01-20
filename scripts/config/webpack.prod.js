const { resolve } = require('path')

const { merge } = require('webpack-merge')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')  //查找路径文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')   //css文件提取，webpack5好像不需要配置

const {PROJECT_PATH} = require('../constant')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins:[
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body']
    }),
    new MiniCssExtractPlugin({
      filename:'css/[name].[contenthash:6].css',
      chunkFilename:'css/[name].[contenthash:6].css',
      ignoreOrder:false
    })
  ],
  optimization:{
    // minimize:false,//  关闭代码压缩，webpack5默认开启
    minimizer:[
      //覆盖webpack5默认的js压缩
      (compiler)=>{
        const TerserPlugin = require('terser-webpack-plugin');
        new TerserPlugin({
          // extractComments: false, //false意味着去除所有注释,默认好像就去除了
          terserOptions:{
            compress:{
              pure_funcs:['console.log']    //去除指定  方法
            }
          }
        }).apply(compiler)
      },
      //css压缩
      (compiler)=>{
        const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
        new CssMinimizerPlugin().apply(compiler)
      }
    ],
    moduleIds: 'deterministic',
    splitChunks:{
      // chunks:'all',

      cacheGroups: { // 缓冲引用的外部库fd442
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
  },
});
