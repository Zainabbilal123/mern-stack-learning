
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/post');
const requestLogger = require('./middleware/requestLogger');
const apperror = require('./utils/apperror');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));  
app.use(cors());         


app.use(requestLogger);  // Our custom logger

// ROUTES
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to Express REST API',
        version: '1.0.0',
        endpoints: {
            users: {
                base: 'GET /users',
                single: 'GET /users/:id',
                create: 'POST /users',
                update: 'PUT /users/:id',
                delete: 'DELETE /users/:id'
            },
            posts: {
                base: 'GET /posts',
                single: 'GET /posts/:id',
                create: 'POST /posts',
                delete: 'DELETE /posts/:id'
            }
        }
    });
});

// Mount routers
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// ERROR HANDLING
// 404 Handler - Route not found (catch-all)
app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.url} on this server`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
                                       // Development vs Production error response
    if (process.env.NODE_ENV === 'development') {
        res.status(statusCode).json({
            status: status,
            message: err.message,
            stack: err.stack,
            error: err
        });
    } else {
        // don't send stack traces
        res.status(statusCode).json({
            status: status,
            message: err.message || 'Internal server error'
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(' Available Routes:');
    console.log('   GET    /');
    console.log('   GET    /users');
    console.log('   GET    /users/:id');
    console.log('   POST   /users');
    console.log('   PUT    /users/:id');
    console.log('   DELETE /users/:id');
    console.log('   GET    /posts');
    console.log('   GET    /posts/:id');
    console.log('   POST   /posts');
    console.log('   DELETE /posts/:id');
  
});