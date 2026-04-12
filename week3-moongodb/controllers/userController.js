const User = require('../models/User');
const AppError = require('../utils/appError');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json({
            status: 'success',
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        if (error.code === 11000) {
            return next(new AppError('Email already exists', 400));
        }
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        
        res.json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};