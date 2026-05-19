const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const upload = require('../middleware/upload');
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postcontroller');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, upload.single('coverImage'), createPost);
router.put('/:id', protect, upload.single('coverImage'), updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;