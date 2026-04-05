
const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPostById,
    createPost,
    deletePost
} = require('../controllers/postController');
const { requireJson } = require('../middleware/validation');

router.get('/', getPosts);

router.get('/:id', getPostById);

router.post('/', requireJson, createPost);

router.delete('/:id', deletePost);

module.exports = router;