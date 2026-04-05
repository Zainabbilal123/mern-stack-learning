// middleware/validation.js
const apperror = require('../utils/apperror');

// Validate Content-Type for POST/PUT
const requireJson = (req, res, next) => {
    const contentType = req.headers['content-type'];
    
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!contentType || contentType !== 'application/json') {
            return next(new AppError('Content-Type must be application/json', 415));
        }
    }
    next();
};

// Validate user input for create/update
const validateUser = (req, res, next) => {
    const { name, email } = req.body;
    
    if (req.method === 'POST') {
        if (!name || !email) {
            return next(new AppError('Name and email are required', 400));
        }
        
        if (typeof name !== 'string' || name.length < 2) {
            return next(new AppError('Name must be at least 2 characters', 400));
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            return next(new AppError('Please provide a valid email', 400));
        }
    }
    
    next();
};

module.exports = { requireJson, validateUser };