const fs = require('fs').promises;

async function readMyfile() {
    try{
        console.log("start reading file")
        const data = await fs.readFile('test.txt','utf8')
        console.log("'file content:", data)
        console.log("done")
    } catch (error) {
            console.log("Error:", error.message)
    }
}
console.log("start")
readMyfile()
console.log("end");