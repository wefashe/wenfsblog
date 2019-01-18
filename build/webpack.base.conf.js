'use strict'

const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin')
const internalIp = require('internal-ip')
const {
  VueLoaderPlugin
} = require('vue-loader');
module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [{
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        use: [
          'style-loader', // 为 css 创建 style 标签并置入其中插入页面
          'css-loader', // 处理 css
          'postcss-loader', // 浏览器兼容问题
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader' // loader 由下往上依次开始处理
        ]
      },
      {
        //处理html模版，处理img标签
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            //压缩html页面
            // minimize: true,
            // html 中的 <img> 标签没法使用这个别名功能，但 html-loader 有一个 root 参数，
            // 可以使 / 开头的文件相对于 root 目录解析
            root: path.resolve(__dirname, '../src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jfif|jpeg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放
            // 这里的单位时bit
            limit: 8192,
            name: 'static/images/[hash:8].[name].[ext]'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 字体图标啥的，跟图片分处理方式一样
            name: 'static/font/[hash:8].[name].[ext]'
          }
        }]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.md$/,
        use: [{
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: require.resolve('./md-loader')
          }
        ]
      }
    ]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   // filename: 'static/css/[name].[hash].css',
    //   // chunkFilename: 'static/css/[name].[hash].css'
    // }),
    // 在dist生成index.html页面
    new HtmlPlugin({
      // 要用html模版，必须安装html-loader
      // template: path.resolve(__dirname, 'index.html'),
      // 生成的html文件名称
      // filename: 'index.html',
      favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
      title: 'wenfsblog',
      // 内置html-minifier压缩插件
      minify: {
        //   // 默认值都为false
        //   // 清理注释
        // removeComments: false,
        //   // 清理html中的空格、换行符 但span元素内字符串包含的空格没有被清理
        collapseWhitespace: false,
        //   // 压缩html内的样式
        //   minifyCSS: false,
        //   // 压缩html内的js。
        //   minifyJS: false
      }
    }),
    new CleanWebpackPlugin(['dist/'], {
      root: path.resolve(__dirname, '../')
    }),
    // 添加VueLoaderPlugin，以响应vue-loader
    new VueLoaderPlugin(),
    // 该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify("123")
    }),
    new webpack.ProvidePlugin({ //引用框架 jquery  lodash工具库是很多组件会复用的，省去了import
      '_': 'lodash', //引用webpack
      '$': 'jquery'
    })
  ],
  // optimization: {
  //   // 提取公共代码
  //   splitChunks: {
  //     cacheGroups: {
  //       // 注意: priority属性
  //       // 其次: 打包业务中公共代码
  //       common: {
  //         name: 'common',
  //         chunks: 'all',
  //         minSize: 1,
  //         priority: 0
  //       },
  //       // 首先: 打包node_modules中的文件
  //       vendor: {
  //         name: 'vendor',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         priority: 10
  //         // enforce: true
  //       }
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }

}
