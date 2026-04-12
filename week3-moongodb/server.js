require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const bookmarksRouter = require('./routes/bookmarks');
const requestLogger = require('./middleware/requestLogger');
const AppError = require('./utils/appError');

const app = express();


connectDB();


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(requestLogger);


app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to Week 3 - MongoDB & Mongoose',
        endpoints: {
            users: '/users',
            posts: '/posts',
            bookmarks: '/bookmarks'
        }
    });
});

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/bookmarks', bookmarksRouter);

app.use((req, res, next) => {
    next(new AppError(`Cannot find ${req.url} on this server`, 404));
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
    console.log(` Database: MongoDB Atlas`);
    console.log(` http://localhost:${PORT}`);
});