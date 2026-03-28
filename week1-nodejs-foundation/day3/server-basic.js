const http = require('http')

const server = http.createServer((req,res) => {
    console.log('Method:', req.method);        // GET, POST, etc.
    console.log('URL:', req.url);              // /about, /api, etc.
    console.log('Headers:', req.headers);      // Browser info, etc.
    console.log('HTTP Version:', req.httpVersion);

    res.writeHead (200,{
        'Content-Type': 'text/html',
        'X-Powered-By': 'Node.js',
        'X-Custom-Header': 'Hello from server' 

    })
    res.write('<h1>server info</h1>')
    res.write('<p>check terminal</p>')
    res.write(`<h1>your req: ${req.method} ${req.url}</h1>`)
    res.end();
})

server.listen(3000,() => {
    console.log('Server running on http://localhost:3000')
})

