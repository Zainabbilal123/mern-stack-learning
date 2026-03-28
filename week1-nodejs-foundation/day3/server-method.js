
const http = require('http');

let notes = [
    { id: 1, text: 'Learn Node.js', done: false },
    { id: 2, text: 'Build HTTP server', done: false }
];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === '/notes' && method === 'GET') {
        // GET all notes
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(notes));
        
    } else if (url === '/notes' && method === 'POST') {
        // POST new note (get data from request body)
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const newNote = JSON.parse(body);
                newNote.id = notes.length + 1;
                notes.push(newNote);
                
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Note added!', note: newNote }));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        
    } else if (url.match(/\/notes\/(\d+)/) && method === 'DELETE') {
        // DELETE a note by ID
        const id = parseInt(url.split('/')[2]);
        const index = notes.findIndex(note => note.id === id);
        
        if (index !== -1) {
            notes.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Note ${id} deleted` }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Note not found' }));
        }
        
    } else if (url === '/' && method === 'GET') {
        // Simple HTML form to add notes
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Notes App</title>
                <style>
                    body { font-family: Arial; max-width: 600px; margin: 50px auto; }
                    input, button { padding: 10px; margin: 5px; }
                    .note { background: #f0f0f0; padding: 10px; margin: 10px 0; border-radius: 5px; }
                    button.delete { background: red; color: white; border: none; cursor: pointer; }
                </style>
            </head>
            <body>
                <h1>📝 Notes App</h1>
                <div>
                    <input type="text" id="noteText" placeholder="Enter a note">
                    <button onclick="addNote()">Add Note</button>
                </div>
                <div id="notes"></div>
                
                <script>
                    // Fetch and display notes
                    async function loadNotes() {
                        const res = await fetch('/notes');
                        const notes = await res.json();
                        const notesDiv = document.getElementById('notes');
                        notesDiv.innerHTML = notes.map(note => \`
                            <div class="note">
                                \${note.text}
                                <button class="delete" onclick="deleteNote(\${note.id})">Delete</button>
                            </div>
                        \`).join('');
                    }
                    
                    // Add a new note
                    async function addNote() {
                        const input = document.getElementById('noteText');
                        const text = input.value;
                        if (!text) return;
                        
                        await fetch('/notes', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ text, done: false })
                        });
                        
                        input.value = '';
                        loadNotes();
                    }
                    
                    // Delete a note
                    async function deleteNote(id) {
                        await fetch(\`/notes/\${id}\`, { method: 'DELETE' });
                        loadNotes();
                    }
                    
                    // Load notes on page load
                    loadNotes();
                </script>
            </body>
            </html>
        `);
        
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

server.listen(3000, () => {
    console.log('📝 Notes API Server running at http://localhost:3000');
    console.log('\nAvailable endpoints:');
    console.log('  GET  /notes     - Get all notes');
    console.log('  POST /notes     - Add a new note');
    console.log('  DELETE /notes/1 - Delete note by ID');
    console.log('  GET  /          - Web interface');
});