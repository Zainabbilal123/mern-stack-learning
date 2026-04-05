// controllers/userController.js
let users = [
    { id: 1, name: 'Aisha', email: 'aisha@example.com', role: 'admin' },
    { id: 2, name: 'Bilal', email: 'bilal@example.com', role: 'user' },
    { id: 3, name: 'Fatima', email: 'fatima@example.com', role: 'user' }
];

// Get all users
const getUsers = (req, res) => {
    const role = req.query.role;
    
    if (role) {
        const filtered = users.filter(user => user.role === role);
        return res.json(filtered);
    }
    res.json(users);
};

// Get single user
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    
    const user = users.find(user => user.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
};

// Create user
const createUser = (req, res) => {
    const { name, email, role } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email required' });
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email,
        role: role || 'user'
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
};

// Update user
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, role } = req.body;
    
    const user = users.find(user => user.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    
    res.json({ message: 'User updated', user });
};

// Delete user
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const deletedUser = users.splice(index, 1);
    res.json({ message: 'User deleted', user: deletedUser[0] });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};