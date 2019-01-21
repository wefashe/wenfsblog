const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

const devServer = {
  host: '0.0.0.0',
  port: 8000,
  useLocalIp: true,
  open: true,
  // openPage: '/different/page',
  overlay: {
    errors: true
  },
  // inline: true,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '/api/v2': {
      target: 'https://www.yuque.com/',
      changeOrigin: true
    }
  }
};

let config;
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
    plugins: [new webpack.HotModuleReplacementPlugin()]
  });
} else {
  config = merge(baseConfig, {
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/styles/[name].[contentHash:8].css'
      }),
      new OptimizeCssAssetsPlugin()
    ]
  });
}

module.exports = config;
