
import fetch from 'node-fetch';

async function getPost() {
    try {
        console.log('Fetching data...');
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        
        console.log('Post ID:', data.id);
        console.log('Title:', data.title);
        console.log('Body:', data.body);
        
    } catch (error) {
        console.log('Error:', error.message);
    }
}

getPost();