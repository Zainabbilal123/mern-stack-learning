//route paarms and Query strings 
 const express = require('express')

 const app = express()

 app.use(express.json())

 let users = [
    { id: 1, name: 'Aisha', email: 'aisha@example.com', role: 'admin' },
    { id: 2, name: 'Bilal', email: 'bilal@example.com', role: 'user' },
    { id: 3, name: 'Fatima', email: 'fatima@example.com', role: 'user' },
    { id: 4, name: 'Omar', email: 'omar@example.com', role: 'admin' }
 ]

 app.get('/users',(req,res) => {
    const role = req.query.role;
    if(role){
        const filtereduser = users.filter(user => user.role === role)
        res.json(filtereduser)
    } else {
        res.json(users)
    }
 })

 app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Validate ID
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    
    const user = users.find(user => user.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

 app.put('/users/:id', (req, res) => {
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
});
 app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const deletedUser = users.splice(index, 1);
    res.json({ message: 'User deleted', user: deletedUser[0] });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('\nTest URLs:');
    console.log('  GET  http://localhost:3000/users');
    console.log('  GET  http://localhost:3000/users?role=admin');
    console.log('  GET  http://localhost:3000/users/1');
    console.log('  PUT  http://localhost:3000/users/1');
    console.log('  DELETE http://localhost:3000/users/1');
});