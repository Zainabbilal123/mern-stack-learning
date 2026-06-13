require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const config = require('./config/env');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(helmet({crossOriginResourcePolicy: { policy: "cross-origin" }}));
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,                 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { status: 'error', message: 'Too many requests. Try again in 15 minutes.' }
});
app.use(limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { status: 'error', message: 'Too many login attempts. Try again in 15 minutes.' }
});

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Apply auth rate limit
app.use('/auth', authLimiter);

// Routes
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to Blog API',
        environment: config.nodeEnv
    });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Cannot find ${req.url} on this server`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal server error'
    });
});

module.exports = app;