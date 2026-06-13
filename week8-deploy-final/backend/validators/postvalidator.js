const { z } = require('zod');

exports.createPostSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters')
        .max(120, 'Title too long')
        .trim(),
    body: z.string()
        .min(10, 'Post body must be at least 10 characters')
        .max(10000, 'Post too long'),
    tags: z.array(z.string()).optional().default([])
});

exports.updatePostSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters')
        .max(120, 'Title too long')
        .trim()
        .optional(),
    body: z.string()
        .min(10, 'Post body must be at least 10 characters')
        .optional(),
    tags: z.array(z.string()).optional()
});