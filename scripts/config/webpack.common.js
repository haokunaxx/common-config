// inset
const { resolve } = require('path');

// custom
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// constant
const { PROJECT_PATH, isDev, isProd } = require('../constant');

// functions
const getCommonCssLoader = (importLoaders = 1) => [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: isDev,
      importLoaders: importLoaders,
    },
  },
  {
    loader: 'postcss-loader',
    // options: {
    //   ident: 'postcss',
    //   plugins: [
    //     require('postcss-flexbugs-fixes'),
    //     require('postcss-preset-env')({
    //       autoprefixer: {
    //         grid: true,
    //         flexbox: 'no-2009',
    //       },
    //       stage: 3,
    //     }),
    //     require('postcss-normalize'),
    //   ],
    //   sourceMap: isDev,
    // },
    // postcss变化（webpack5）
    options: {
      postcssOptions: {
        plugins: [
          require('postcss-flexbugs-fixes'),
          isProd && [
            'postcss-preset-env',
            {
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
        ].filter(Boolean),
      },
    },
  },
];

module.exports = {
  entry: {
    app: resolve(PROJECT_PATH, './src/index.tsx'),
    // app: resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: `js/[name]${isDev ? '' : '.[hash:6]'}.js`,
    path: resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: resolve(PROJECT_PATH, './src'),
      Components: resolve(PROJECT_PATH, './src/components'),
      Utils: resolve(PROJECT_PATH, './src/utils'),
    },
  },
  //webpack5默认支持缓存
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: isDev
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true,
          },
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          context:resolve(PROJECT_PATH,'./public'),
          from:'*',
          to:resolve(PROJECT_PATH,'./dist'),
          toType:'dir',
          globOptions:{
            dot:true,
            gitignore: true,
            ignore:['**/index.html']
          }
        }
      ]
    }),
    new WebpackBar({
      name:isDev ? '正在启动':'正在打包',
      color:'#fa8c16'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript:{
        configFile: resolve(PROJECT_PATH,'./tsconfig.json')
      }
    })
  ],
  externals:{
    react:'React',
    'react-dom':'ReactDOM',
    axios:'axios'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCommonCssLoader(),
      },
      {
        test: /\.scss$/,
        use: [
          ...getCommonCssLoader(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },

      {
        test: [/\.jpe?g$/, /\.png$/, /\.gif$/, /\.bmp$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4 * 1024,
              name: '[name].[contenthash:6].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:6].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },

      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/,
      },
    ],
  },
};
