// webpack v4
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
// extract-text-webpack-plugin在webpack 4表现并不好，mini-css-extract-plugin代替
// 需要把webpack升级到4.2.0.0，不然这个插件无法运行！
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const internalIp = require('internal-ip')

// const dev = Boolean(process.env.)
// console.log(dev);
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    // js引用路径或者CDN地址
    publicPath: '/assets/',
    path: path.resolve(__dirname, 'dist'),
    // hash 所有打包文件名hash相同  chunkhash 每个打包文件名hash都不相同
    filename: '[name].[hash:8].js'
  },
  module: {
    rules: [{
        // es6就是未来，可是现在的浏览器对他的支持不是很好，我们需要babel来转换他
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        //提取样式 处理url 加上浏览器前缀
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'postcss-loader']
      },
      {
        //处理html模版，处理img标签
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            // html 中的 <img> 标签没法使用这个别名功能，但 html-loader 有一个 root 参数，
            // 可以使 / 开头的文件相对于 root 目录解析
            root: path.resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      }
    ]
  },
  plugins: [
    // 清空dist文件夹
    new CleanPlugin(['dist']),
    // 在dist生成index.html页面
    new HtmlPlugin({
      // 要用html模版，必须安装html-loader
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: path.resolve(__dirname, 'src/assets/image/favicon.ico'),
      filename: path.resolve(__dirname, 'dist/index.html'),
      // 内置html-minifier压缩插件
      minify: {
        // 默认值都为false
        // 清理注释
        removeComments: false,
        // 清理html中的空格、换行符 但span元素内字符串包含的空格没有被清理
        collapseWhitespace: false,
        // 压缩html内的样式
        minifyCSS: false,
        // 压缩html内的js。
        minifyJS: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  optimization: {
    // 提取公共代码
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10
          // enforce: true
        }
      }
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 8000,
    hot: true,
    // 开发环境允许其他电脑访问
    // hot: {
    //   host: {
    //     client: internalIp.v4.sync(),
    //     server: '0.0.0.0'
    //   }
    // },
    overlay: true,
    dev: {
      /*
      指定 webpack-dev-middleware 的 publicpath
      一般情况下与 output.publicPath 保持一致（除非 output.publicPath 使用的是相对路径）
      https://github.com/webpack/webpack-dev-middleware#publicpath
      */
      publicPath: '/assets/'
    }
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }

}
