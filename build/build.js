const webpack = require('webpack');
const ora = require('ora')
const config = require('./webpack.prod.conf');
const chalk = require('chalk')

const spinner = ora('building for production...')
spinner.start()

webpack(config, function (err, stats) {
  //致命的 wepback 错误（配置出错等）
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }
  //编译错误（缺失的 module，语法错误等）
  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
  }
  //编译警告
  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  // 处理完成
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
});
