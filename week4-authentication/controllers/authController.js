const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');
const AppError = require('../utils/appError');
const { signToken } = require('../utils/jwt');

const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

const issueTokens = async (user, res) => {
    const accessToken = signToken(user._id);
    
    const rawRefreshToken = generateRefreshToken();
    const hashedRefreshToken = hashToken(rawRefreshToken);
    
    user.refreshToken = hashedRefreshToken;
    user.refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    
    res.cookie('refreshToken', rawRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    return accessToken;
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        const accessToken = await issueTokens(user, res);
        
        user.password = undefined;
        user.refreshToken = undefined;
        user.refreshTokenExpiry = undefined;
        
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token: accessToken,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return next(new AppError('Email and password are required', 400));
        }
        
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return next(new AppError('Invalid email or password', 401));
        }
        
        const accessToken = await issueTokens(user, res);
        
        user.password = undefined;
        user.refreshToken = undefined;
        user.refreshTokenExpiry = undefined;
        
        res.json({
            status: 'success',
            message: 'Logged in successfully',
            token: accessToken,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
};

exports.refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            return next(new AppError('No refresh token provided', 401));
        }
        
        const hashedToken = hashToken(refreshToken);
        
        const user = await User.findOne({
            refreshToken: hashedToken,
            refreshTokenExpiry: { $gt: Date.now() }
        }).select('+refreshToken +refreshTokenExpiry');
        
        if (!user) {
            return next(new AppError('Invalid or expired refresh token', 401));
        }
        
        const newAccessToken = await issueTokens(user, res);
        
        res.json({
            status: 'success',
            token: newAccessToken
        });
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (refreshToken) {
            const hashedToken = hashToken(refreshToken);
            await User.findOneAndUpdate(
                { refreshToken: hashedToken },
                { $unset: { refreshToken: 1, refreshTokenExpiry: 1 } }
            );
        }
        
        res.clearCookie('refreshToken');
        res.json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};