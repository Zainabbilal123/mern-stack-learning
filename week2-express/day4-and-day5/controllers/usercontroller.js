
const apperror = require('../utils/apperror');

let users = [
    { id: 1, name: 'Aisha', email: 'aisha@example.com', role: 'admin' },
    { id: 2, name: 'Bilal', email: 'bilal@example.com', role: 'user' },
    { id: 3, name: 'Fatima', email: 'fatima@example.com', role: 'user' },
    { id: 4, name: 'Omar', email: 'omar@example.com', role: 'admin' }
];

 //optional role filter
const getUsers = (req, res, next) => {
    try {
        const role = req.query.role;
        
        if (role) {
            const filteredUsers = users.filter(user => user.role === role);
            return res.json({
                status: 'success',
                count: filteredUsers.length,
                data: filteredUsers
            });
        }
        
        res.json({
            status: 'success',
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

//  single user by ID
const getUserById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        // Check if ID is valid number
        if (isNaN(id)) {
            return next(new AppError('Invalid ID format. ID must be a number', 400));
        }
        
        const user = users.find(user => user.id === id);
        
        if (!user) {
            return next(new AppError(`User with ID ${id} not found`, 404));
        }
        
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Create new user
const createUser = (req, res, next) => {
    try {
        const { name, email, role } = req.body;
        
        // Validation
        if (!name || !email) {
            return next(new AppError('Name and email are required', 400));
        }
        
        const newUser = {
            id: users.length + 1,
            name,
            email,
            role: role || 'user',
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

// Update user
const updateUser = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { name, email, role } = req.body;
        
        const userIndex = users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            return next(new AppError(`User with ID ${id} not found`, 404));
        }
        
        // Update only provided fields
        if (name) users[userIndex].name = name;
        if (email) users[userIndex].email = email;
        if (role) users[userIndex].role = role;
        
        res.json({
            status: 'success',
            message: 'User updated successfully',
            data: users[userIndex]
        });
    } catch (error) {
        next(error);
    }
};

// Delete user
const deleteUser = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        const userIndex = users.findIndex(user => user.id === id);
        
        if (userIndex === -1) {
            return next(new AppError(`User with ID ${id} not found`, 404));
        }
        
        const deletedUser = users.splice(userIndex, 1);
        
        res.json({
            status: 'success',
            message: 'User deleted successfully',
            data: deletedUser[0]
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};