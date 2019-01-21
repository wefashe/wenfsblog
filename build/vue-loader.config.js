module.exports = (isDev) => {
  return {
    //去除vue模版里面标签值的行尾的空格
    preserveWhitepace: true,
    //把vue样式提取到一个文件中
    extractCSS: !isDev,
    cssModules: {
      //样式class名字转换，保密性提高
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      //把样式的clsss名字下划线转换为
      camelCase: true
    },
    //vue模版的热重载,true重载，false刷新
    // hotReload: false
  }
};
