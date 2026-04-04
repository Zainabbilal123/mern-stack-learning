
const fs = require('fs').promises;
const path = require('path');


const NOTES_FILE = path.join(__dirname, 'notes.json');


// Create file if it doesn't exist
async function ensureFile() {
    try {
        await fs.access(NOTES_FILE);
    } catch {
        // File doesn't exist, create it with empty array
        await fs.writeFile(NOTES_FILE, JSON.stringify([]));
        console.log(' Created new notes file');
    }
}


async function readNotes() {
    await ensureFile();
    const data = await fs.readFile(NOTES_FILE, 'utf8');
    return JSON.parse(data);
}


async function writeNotes(notes) {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}




async function addNote(text) {
    try {
        const notes = await readNotes();
        
        const newNote = {
            id: notes.length + 1,
            text: text,
            createdAt: new Date().toLocaleString()
        };
        
        notes.push(newNote);
        await writeNotes(notes);
        
        console.log(` Note added successfully!`);
        console.log(`   ID: ${newNote.id}`);
        console.log(`   Text: ${newNote.text}`);
        console.log(`   Time: ${newNote.createdAt}`);
    } catch (error) {
        console.log(` Error adding note: ${error.message}`);
    }
}


async function listNotes() {
    try {
        const notes = await readNotes();
        
        if (notes.length === 0) {
            console.log('\n No notes found!');
            console.log('   Add a note with: node notes.js add "Your note here"\n');
            return;
        }
        
        
        console.log(' YOUR NOTES');
        
        
        notes.forEach(note => {
            console.log(`\n[${note.id}] ${note.text}`);
            console.log(`    ${note.createdAt}`);
        });
        
        console.log('\n' + '='.repeat(50));
        console.log(`Total: ${notes.length} note(s)`);
        console.log('='.repeat(50) + '\n');
        
    } catch (error) {
        console.log(`Error reading notes: ${error.message}`);
    }
}


async function deleteNote(id) {
    try {
        const notes = await readNotes();
        const noteToDelete = notes.find(note => note.id === parseInt(id));
        
        if (!noteToDelete) {
            console.log(`Note with ID ${id} not found!`);
            return;
        }
        
        const filteredNotes = notes.filter(note => note.id !== parseInt(id));
        
        // Re-index IDs (so IDs are 1,2,3...)
        const reindexedNotes = filteredNotes.map((note, index) => ({
            ...note,
            id: index + 1
        }));
        
        await writeNotes(reindexedNotes);
        
        console.log(` Deleted note:`);
        console.log(`   ID: ${id}`);
        console.log(`   Text: ${noteToDelete.text}`);
        
    } catch (error) {
        console.log(` Error deleting note: ${error.message}`);
    }
}


async function deleteAllNotes() {
    try {
        await writeNotes([]);
        console.log(' All notes deleted successfully!');
    } catch (error) {
        console.log(` Error deleting all notes: ${error.message}`);
    }
}

// Show help menu
function showHelp() {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║              📝 NODE.js NOTES CLI TOOL                    ║
╚══════════════════════════════════════════════════════════╝

COMMANDS:
  add "text"        Add a new note
  list              List all notes
  delete <id>       Delete a note by ID
  delete-all        Delete ALL notes
  help              Show this help menu

EXAMPLES:
  node notes.js add "Buy milk"
  node notes.js add "Learn Node.js"
  node notes.js list
  node notes.js delete 2
  node notes.js delete-all

`);
}



async function main() {
    const command = process.argv[2];
    const argument = process.argv[3];
    
    switch (command) {
        case 'add':
            if (!argument) {
                console.log(' Please provide note text!');
                console.log('   Usage: node notes.js add "Your note"');
                return;
            }
            await addNote(argument);
            break;
            
        case 'list':
            await listNotes();
            break;
            
        case 'delete':
            if (!argument) {
                console.log(' Please provide note ID to delete!');
                console.log('   Usage: node notes.js delete 1');
                return;
            }
            await deleteNote(argument);
            break;
            
        case 'delete-all':
            await deleteAllNotes();
            break;
            
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
            
        default:
            if (!command) {
                console.log(' Welcome to Notes CLI Tool!\n');
                showHelp();
            } else {
                console.log(` Unknown command: ${command}`);
                console.log('   Type "node notes.js help" for available commands\n');
            }
    }
}


main();