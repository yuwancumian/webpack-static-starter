const glob = require('glob');
const path = require('path');

let srcPath = path.resolve(__dirname + "/src");
console.log(srcPath)
let config = glob.sync(srcPath + "/*");
console.log(config)

