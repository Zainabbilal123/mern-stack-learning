// controllers/postController.js
let posts = [
    { id: 1, title: 'First Post', content: 'Hello World', userId: 1 },
    { id: 2, title: 'Second Post', content: 'Learning Express', userId: 2 }
];

const getPosts = (req, res) => {
    res.json(posts);
};

const getPostById = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
};

const createPost = (req, res) => {
    const { title, content, userId } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content required' });
    }
    
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        userId: userId || 1
    };
    
    posts.push(newPost);
    res.status(201).json(newPost);
};

module.exports = {
    getPosts,
    getPostById,
    createPost
};