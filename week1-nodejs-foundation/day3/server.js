const http = require('http')

const server = http.createServer((req,res) =>{
     console.log(`request recived:${req.method} ${req.url}`)   //thsi function run for every request

res.writeHead(200,{"content-type":"text/plain"});  //send back the response
res.end("hello from zainab bilal") });
// start the server on port 30000
server.listen (3000,() => {
console.log("server is running at http://localhost:3000")
console.log("press ctl C to stop the server")
})