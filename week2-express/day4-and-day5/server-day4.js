// server.js - Main Server File
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/post');
const requestLogger = require('./middleware/requestlogger');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(requestLogger);

// Routes
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Express REST API',
        endpoints: {
            users: '/users',
            posts: '/posts'
        }
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('\nAvailable endpoints:');
    console.log('  GET  /users');
    console.log('  GET  /users/:id');
    console.log('  POST /users');
    console.log('  PUT  /users/:id');
    console.log('  DELETE /users/:id');
    console.log('  GET  /posts');
    console.log('  GET  /posts/:id');
    console.log('  POST /posts');
});