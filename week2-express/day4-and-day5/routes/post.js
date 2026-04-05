// routes/posts.js
const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPostById,
    createPost
} = require('../controllers/postcontroller');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);

module.exports = router;