const fs = require('fs');

console.log("start reading file")

fs.readFile('test.txt','utf8',(err,data) =>{
    if(err) {
        console.log("'error:",err.message)
    } else {
        console.log("'file content:", data)
    }
})
console.log("this run while file is being run ")