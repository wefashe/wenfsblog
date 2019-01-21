const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin');
const createVueLoaderOptions = require('./vue-loader.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.resolve(__dirname, '../src/client/entry-client.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, '../dist/client/')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'static/images/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'static/fonts/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist/'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin({
      template: path.resolve(__dirname, './template.html')
    })
  ],
  resolve: {
    //这里的extensions指定了from后可导入的文件类型
    //定义的这3类可导入文件，js和vue是可以省略后缀的
    //json不可以省略后缀
    //from后的来源除了文件，还可以是文件夹
    //在package.json存在且设置正确的情况下，会默认加载package.json；若不满足，则加载index.js；若不满足，则加载index.vue
    //所以一个省略后缀的from来源，有可能是.vue，.js，或者文件夹
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      //Issue中提出的方案是：<img src="~@/assets/head.png" alt="">
      // '@': path.resolve(__dirname, '../src'),
      '@': path.resolve(__dirname, '../src'),
      '@client': path.resolve(__dirname, '../src/client'),
      '@server': path.resolve(__dirname, '../src/server'),
      '@styles': path.resolve(__dirname, '../src/client/assets/styles')
      // '@images': path.resolve(__dirname, '../src/assets/images'),
      // '@fonts': path.resolve(__dirname, '../src/assets/fonts'),
    }
  }
};

module.exports = config;
