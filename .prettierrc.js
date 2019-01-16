//配置文件三种格式  如：prettier
// 无后缀  .prettierrc 名称一般都是 .*rc   里面像json一样写  不能写注释
//js 后缀 有两种格式  .prettierrc.js和prettier.config.js  module.exports = {}里面写内容 可以有注释，比较喜欢这种
// .yaml/.yml/.json 这几个后缀也可以 不过没用过
//这些配置也可以不新建文件，直接在package.json配置 没用过
module.exports = {
  "printWidth": 120, //一行的字符数，如果超过会进行换行，默认为80
  "tabWidth": 2, //一个tab代表几个空格数，默认为80
  "useTabs": false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  "semi": true, // //行末是否使用分号，默认为true
  "singleQuote": true, //字符串是否使用单引号，默认为false，使用双引号
  "trailingComma": "none", // 最后一个对象元素加逗号，有三个可选值"<none|es5|all>"
  "bracketSpacing": true, // 对象，数组大括号直接是否有空格，默认为true，效果：{ foo: bar }
  "jsxBracketSameLine": true, // jsx > 是否另起一行
  "arrowParens": "avoid", // (x) => {} 是否要有小括号
  "requirePragma": false, // 是否要注释来决定是否格式化代码
  "proseWrap": "preserve", // 是否要换行
  // "parser": "flow" //代码的解析引擎，默认为babylon，与babel相同。
}
