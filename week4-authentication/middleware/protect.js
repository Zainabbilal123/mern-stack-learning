const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const AppError = require('../utils/appError');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(new AppError('Not authenticated. Please log in.', 401));
        }
        
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return next(new AppError('User no longer exists', 401));
        }
        
        req.user = user;
        next();
        
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Token expired. Please log in again.', 401));
        }
        next(new AppError('Invalid token.', 401));
    }
};

module.exports = protect;