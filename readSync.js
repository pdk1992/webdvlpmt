//read a file
//sychronous version reads files before running program like a config file
var fs = require("fs");
console.log("Starting");
var content = fs.readFileSync("./desktop/sample.txt");
console.log("Contents: " + content);
console.log("Carry on executing");