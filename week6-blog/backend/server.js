require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/User');


const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();


// CREATE UPLOADS FOLDER IF NOT EXISTS

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('📁 Uploads folder created');
}


// CONNECT TO MONGODB

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Failed:', err.message));


// MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));


// ROUTES

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to Blog API',
        endpoints: {
            auth: '/auth/register, /auth/login, /auth/refresh, /auth/logout',
            posts: '/posts (GET, POST), /posts/:id (GET, PUT, DELETE)'
        }
    });
});

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// ERROR HANDLERS

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

// START SERVER

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`📁 Uploads folder: ${path.resolve('uploads')}`);
});