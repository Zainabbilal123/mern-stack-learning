

const http = require('http');
const { json } = require('stream/consumers');

const server = http.createServer((req,res) => {
 const  url = req.url; 
 const  method = req.method
   console.log(`${req.methos} ${req.url}`)


   if (url === '/'){                                            //for home page
    res.writeHead(200,{'content-type': 'text/plain'})
res.end('welcome to homepage')}

 else if (url === '/about'){                                        //for about page
    res.writeHead(200,{'content-type': 'text/plain'})
res.end('About us ---- learning node js')}

 else if (url === '/contact'){                                 //for contact page
    res.writeHead(200,{'content-type': 'text/plain'})
res.end('contact us ---- @zainabbilal99@gmail.com')}

 else if (url === '/api'){                                     // for api page

    const data = {
        message: 'API endpoint',
        status: 'success',
        timestamp: new Date().toISOString()
    };
    
    res.writeHead(200,{'content-type': 'application/json'})
res.end(JSON.stringify(data))}

else {                                                             // for error page
    
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
}
});

server.listen(3000,()=> {
    console.log('Server running at http://localhost:3000');
    console.log('  - http://localhost:3000');
    console.log('  - http://localhost:3000/about');
    console.log('  - http://localhost:3000/contact');
    console.log('  - http://localhost:3000/api');
    console.log('  - http://localhost:3000/anything (404)');
})