const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPostById,
    createPost,
    deletePost
} = require('../controllers/postController');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.delete('/:id', deletePost);

module.exports = router;