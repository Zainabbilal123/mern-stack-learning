
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Express Server!');
});


app.get('/users', (req, res) => {
    const users = [
        { id: 1, name: 'Aisha', email: 'aisha@example.com' },
        { id: 2, name: 'Bilal', email: 'bilal@example.com' },
        { id: 3, name: 'Fatima', email: 'fatima@example.com' }
    ];
    res.json(users);
});


app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log('Received:', newUser);
    
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
    console.log('Test routes:');
    console.log('  GET  http://localhost:3000/users');
    console.log('  POST http://localhost:3000/users');
});