
const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { requireJson, validateUser } = require('../middleware/validation');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', requireJson, validateUser, createUser);

router.put('/:id', requireJson, updateUser);

router.delete('/:id', deleteUser);

module.exports = router;