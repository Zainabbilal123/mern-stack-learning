const fs = require('fs').promises

console.log("start reading ")
fs.readFile('test.txt','utf8')
  .then(data => {
    console.log("file content:", data)
  })
    .catch(error =>{
        console.log("error", error.message)
    })

    console.log("this run while reading")