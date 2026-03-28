const http = require('http')

const server = http.createServer((req,res) => {
    const url = req.url

if (url === '/'){
    res.writeHead(200,{'context-type': 'text/html'})
    res.end(`<!DOCTYPE html>
            <html>
            <head>
                <title>Node.js Server</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 50px auto;
                        padding: 20px;
                        background: #f4f4f4;
                    }
                    h1 { color: #333; }
                    nav a {
                        margin-right: 15px;
                        color: #0066cc;
                        text-decoration: none;
                    }
                    .card {
                        background: white;
                        padding: 20px; border-radius: 5px;
                        margin-top: 20px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                </style>
            </head>
            <body>
                <h1> Welcome to Node.js Server</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/api">API</a>
                </nav>
                <div class="card">
                    <h2>Server Information</h2>
                    <p>This server is running on Node.js</p>
                    <p>Current time: ${new Date().toLocaleString()}</p>
                </div>
            </body>
            </html>
        `);
}
else if(url === '/about'){
    
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>About Us</title>
                <style>
                    body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
                    .back { margin-top: 20px; }
                </style>
            </head>
            <body>
                <h1> About This Server</h1>
                <p>This is a raw Node.js HTTP server built without Express.</p>
                <p>It demonstrates:</p>
                <ul>
                    <li>Manual routing</li>
                    <li>Different content types</li>
                    <li>HTML responses</li>
                </ul>
                 </ul>
                <div class="back">
                    <a href="/">← Back to Home</a>
                </div>
            </body>
            </html>
        `);
} else if(url === '/api'){
    const  apidata = {
        name: 'Node.js Server',
        version: '1.0.0',
        endpoints: ['/', '/about', '/api', '/users'],
        status: 'running',
        uptime: process.uptime()
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apidata, null, 2));
    
} else {
    // Custom 404 page
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - Page Not Found</title>
            <style>
                body { font-family: Arial; text-align: center; margin-top: 100px; }
                h1 { font-size: 72px; color: #666; }
                .error { color: #999; }
            </style>
        </head>
        <body>
            <h1>404</h1>
            <p class="error">Oops! The page you're looking for doesn't exist.</p>
            <a href="/">Go Home</a>
        </body>
        </html>
    `); }
})

 server.listen(3000,() => {
  console.log('server running http://localhost:3000')
 })