const mongoose = require('mongoose');
const AppError = require('../utils/appError');

const validateObjectId = (paramName = 'id') => {
    return (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
            return next(new AppError('Invalid ID format', 400));
        }
        next();
    };
};

module.exports = validateObjectId;