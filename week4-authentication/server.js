require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const AppError = require('./utils/appError');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to Week 4 - Authentication',
        endpoints: {
            auth: '/auth/register, /auth/login, /auth/refresh, /auth/logout',
            users: '/users',
            posts: '/posts'
        }
    });
});


app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

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
    console.log(`Server running on port ${PORT}`);
    console.log(` Authentication enabled`);
    console.log(` http://localhost:${PORT}`);
});