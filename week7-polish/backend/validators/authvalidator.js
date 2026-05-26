const { z } = require('zod');

exports.registerSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .trim(),
    email: z.string()
        .email('Invalid email address')  
        .toLowerCase()
        .trim(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password too long')
});

exports.loginSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .toLowerCase(),
    password: z.string()
        .min(1, 'Password is required')
});