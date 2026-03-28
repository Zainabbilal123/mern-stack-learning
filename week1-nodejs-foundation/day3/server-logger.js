
const http = require('http');


function logger(req, res) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
}

// Route handlers
const routes = {
    GET: {
        '/': (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h1>🏠 Home Page</h1>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/api">API</a></li>
                    <li><a href="/users">Users</a></li>
                </ul>
            `);
        },
        
        '/about': (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>📖 About</h1><p>Learning Node.js HTTP module</p>');
        },
        
        '/api': (req, res) => {
            const data = {
                status: 'success',
                message: 'API is working',
                timestamp: new Date().toISOString()
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data, null, 2));
        },
        
        '/users': (req, res) => {
            const users = [
                { id: 1, name: 'Alice', email: 'alice@example.com' },
                { id: 2, name: 'Bob', email: 'bob@example.com' },
                { id: 3, name: 'Charlie', email: 'charlie@example.com' }
            ];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users, null, 2));
        }
    },
    
    POST: {
        '/api/data': (req, res) => {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ received: data, message: 'Data saved!' }));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON' }));
                }
            });
        }
    }
};

// Handle 404
function handle404(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1><p>The page you requested does not exist.</p>');
}

// Create server
const server = http.createServer((req, res) => {
    // Log every request
    logger(req, res);
    
    // Get handler for this method and path
    const methodHandlers = routes[req.method];
    if (methodHandlers) {
        const handler = methodHandlers[req.url];
        if (handler) {
            handler(req, res);
        } else {
            handle404(req, res);
        }
    } else {
        handle404(req, res);
    }
});

server.listen(3000, () => {
    console.log('🚀 Server with logging running at http://localhost:3000');
    console.log('\nAvailable routes:');
    console.log('  GET  /');
    console.log('  GET  /about');
    console.log('  GET  /api');
    console.log('  GET  /users');
    console.log('  POST /api/data');
});