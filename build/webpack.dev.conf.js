'use strict'

//合并webpack配置文件的插件
const merge = require('webpack-merge');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
  // mode关系到代码压缩质量  https://webpack.docschina.org/guides/tree-shaking/
  mode: 'development',
  // source-map,将编译后的代码映射到原代码，便于报错后定位错误
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    //   host: '0.0.0.0',
    port: 8000,
    hot: true,
    open: true,
    //   // 开发环境允许其他电脑访问
    //   // hot: {
    //   //   host: {
    //   //     client: internalIp.v4.sync(),
    //   //     server: '0.0.0.0'
    //   //   }
    //   // },
    // overlay: true,
    overlay: {
      //出现错误时，显示在网页上
      errors: true,
    },
    //   dev: {
    //     /*
    //     指定 webpack-dev-middleware 的 publicpath
    //     一般情况下与 output.publicPath 保持一致（除非 output.publicPath 使用的是相对路径）
    //     https://github.com/webpack/webpack-dev-middleware#publicpath
    //     */
    //     publicPath: '/assets/'
    //   }
    // proxy: {
    //   "/comments": {
    //     target: "https://m.weibo.cn",
    //     changeOrigin: true,
    //     logLevel: "debug",
    //     headers: {
    //       Cookie: ""
    //     }
    //   }
    // },
    // historyApiFallback: {
    //   rewrites: [{
    //     from: /.*/,
    //     to: "/index.html"
    //   }]
    // }
  },
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
        // removeComments: false,
        //   // 清理html中的空格、换行符 但span元素内字符串包含的空格没有被清理
        collapseWhitespace: false,
        //   // 压缩html内的样式
        //   minifyCSS: false,
        //   // 压缩html内的js。
        //   minifyJS: false
      }
    }),
    //hot:true启用这个插件
    new webpack.HotModuleReplacementPlugin(),
    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    // new webpack.NoEmitOnErrorsPlugin()
  ],
  watch: true, // 开启监听文件更改，自动刷新
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
});
