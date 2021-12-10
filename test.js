console.log("hello");
var fs = require("fs");

// 点号表示当前文件所在路径
var str = fs.realpathSync(".");
console.log(str);
