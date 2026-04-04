// s Middleware Examples
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();



app.use(express.json());     
app.use(express.urlencoded({ extended: true })); 

app.use(morgan('dev'));      
app.use(cors());             

function requestLogger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); 
}

app.use(requestLogger);

function requireJson(req, res, next) {
    const contentType = req.headers['content-type'];
    
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!contentType || contentType !== 'application/json') {
            return res.status(415).json({
                error: 'Unsupported Media Type',
                message: 'Content-Type must be application/json'
            });
        }
    }
    next();
}

app.post('/users', requireJson, (req, res) => {
    res.status(201).json({
        message: 'User created',
        data: req.body
    });
});

function checkAdmin(req, res, next) {
    const userRole = req.headers['user-role'];
    
    if (userRole !== 'admin') {
        return res.status(403).json({
            error: 'Forbidden',
            message: 'Admin access required'
        });
    }
    next();
}

app.get('/admin', checkAdmin, (req, res) => {
    res.json({ message: 'Welcome admin!' });
});

app.get('/', (req, res) => {
    res.send('Middleware Demo Server');
});

app.post('/test', requireJson, (req, res) => {
    res.json({ received: req.body });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('\nTest middleware:');
    console.log('  POST http://localhost:3000/users (with JSON body)');
    console.log('  POST http://localhost:3000/test (wrong content-type → 415)');
    console.log('  GET  http://localhost:3000/admin (with header: user-role: admin)');
});