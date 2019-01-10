'use strict'

const merge = require('webpack-merge');
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    // 在dist生成index.html页面
    new HtmlPlugin({
      // 要用html模版，必须安装html-loader
      template: path.resolve(__dirname, 'index.html'),
      // 生成的html文件名称
      // filename: 'index.html',
      favicon: path.resolve(__dirname, '../src/assets/images/favicon.ico'),
      // 内置html-minifier压缩插件
      minify: {
        //   // 默认值都为false
        //   // 清理注释
        removeComments: true,
        //   // 清理html中的空格、换行符 但span元素内字符串包含的空格没有被清理
        collapseWhitespace: true,
        //   // 压缩html内的样式
        minifyCSS: true,
        //   // 压缩html内的js。
        minifyJS: true
      }
    })
  ]
});
