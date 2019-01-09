// webpack v4
const path = require('path');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js',
  },
  module: {
    rules: [{
      //es6就是未来，可是现在的浏览器对他的支持不是很好，我们需要babel来转换他
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }, {
      test: /\.css$/,
      use: extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    }]
  }
};