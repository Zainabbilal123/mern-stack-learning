# Day 3: Raw HTTP Server

## What I Did
-  Created basic HTTP server with http module
-  Implemented manual routing
- Served different content types (text, HTML, JSON)
-  Handled GET and POST requests
-  Created a simple notes API
-  Added logging middleware
-  Handled 404 errors





### HTTP Server Basics
- `http.createServer()` creates the server
- `req` contains request info (url, method, headers)
- `res` is used to send response
- `server.listen(port)` starts the server

### Routing
- `req.url` is just a string - we parse it manually
- Express just makes this easier
- We can implement any routing logic we want

### Response Types
- `text/plain` - Plain text
- `text/html` - HTML pages
- `application/json` - JSON data

### Request Methods
- GET - Retrieve data
- POST - Send data to server
- DELETE - Remove data

