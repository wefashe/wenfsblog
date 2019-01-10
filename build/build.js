const webpack = require('webpack');
const config = require('./webpack.prod.conf');

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
  console.log(stats.toString({
    chunks: false, // 使构建过程更静默无输出
    colors: true // 在控制台展示颜色
  }));
});


function getErr(err, stats) {

}
