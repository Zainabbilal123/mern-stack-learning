
const fs = require('fs').promises;

async function readAllFiles() {
    try {
        console.log('Reading all files...');
        
        // Read multiple files at the same time
        const [file1, file2, file3] = await Promise.all([
            fs.readFile('file1.txt', 'utf8'),
            fs.readFile('file2.txt', 'utf8'),
            fs.readFile('file3.txt', 'utf8')
        ]);
        
        console.log('File 1:', file1);
        console.log('File 2:', file2);
        console.log('File 3:', file3);
        console.log('All files read!');
        
    } catch (error) {
        console.log('Error:', error.message);
    }
}

readAllFiles();