# HTTP Server - Building Web Servers with Node.js

## What You'll Learn
- Creating HTTP servers with Node.js
- Handling HTTP requests and responses
- Working with URLs and query parameters
- Serving static files
- Understanding HTTP methods (GET, POST, PUT, DELETE)
- Setting headers and status codes
- Building a simple web application

## Concept Overview

Node.js has a built-in `http` module that allows you to create web servers without any external dependencies. This is the foundation for frameworks like Express.

### Why Build HTTP Servers?
- **Web APIs**: Create RESTful services
- **Web Applications**: Serve web pages and applications
- **Microservices**: Build scalable backend services
- **Real-time Apps**: WebSockets, streaming data
- **Understanding**: Learn how frameworks work under the hood

## Creating Your First Server

### Basic HTTP Server

```javascript
const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

// Start listening
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

### Understanding Request and Response

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Request properties
  console.log('Method:', req.method);       // GET, POST, etc.
  console.log('URL:', req.url);            // /about, /users, etc.
  console.log('Headers:', req.headers);    // Request headers

  // Response
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Hello!</h1>');
  res.end();
});

server.listen(3000);
```

## Handling Different Routes

### Simple Routing

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  const { url, method } = req;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.statusCode = 200;
    res.end('<h1>Home Page</h1>');
  } else if (url === '/about') {
    res.statusCode = 200;
    res.end('<h1>About Page</h1>');
  } else if (url === '/contact') {
    res.statusCode = 200;
    res.end('<h1>Contact Page</h1>');
  } else {
    res.statusCode = 404;
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Using URL Module for Routing

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader('Content-Type', 'application/json');

  if (pathname === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Home Page' }));
  } else if (pathname === '/user') {
    // Access query parameters: /user?name=John&age=30
    res.statusCode = 200;
    res.end(JSON.stringify({
      name: query.name || 'Guest',
      age: query.age || 'Unknown'
    }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000);
```

## HTTP Methods

### Handling Different Methods

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  res.setHeader('Content-Type', 'application/json');

  if (url === '/api/users') {
    if (method === 'GET') {
      // Retrieve users
      res.statusCode = 200;
      res.end(JSON.stringify({ users: ['John', 'Jane', 'Bob'] }));
    } else if (method === 'POST') {
      // Create user
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const newUser = JSON.parse(body);
        res.statusCode = 201;
        res.end(JSON.stringify({
          message: 'User created',
          user: newUser
        }));
      });
    } else if (method === 'DELETE') {
      // Delete user
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'User deleted' }));
    } else {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000);
```

## Handling POST Requests

### Reading Request Body

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/data') {
    let body = '';

    // Collect data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Process complete data
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Received:', data);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: true,
          received: data
        }));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

    // Handle errors
    req.on('error', err => {
      console.error('Request error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Server Error' }));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(3000);
```

## Serving Static Files

### Serving HTML Files

```javascript
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/' || req.url === '/index.html') {
      const filePath = path.join(__dirname, 'public', 'index.html');
      const content = await fs.readFile(filePath, 'utf8');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(content);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } catch (err) {
    res.statusCode = 500;
    res.end('Server Error');
  }
});

server.listen(3000);
```

### Serving Different File Types

```javascript
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain'
};

const server = http.createServer(async (req, res) => {
  try {
    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Get file extension
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Read and serve file
    const content = await fs.readFile(filePath);

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.statusCode = 404;
      res.end('File Not Found');
    } else {
      res.statusCode = 500;
      res.end('Server Error');
    }
  }
});

server.listen(3000);
```

## HTTP Status Codes

### Common Status Codes

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  const { url } = req;

  res.setHeader('Content-Type', 'application/json');

  if (url === '/success') {
    // 200 - OK
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Success' }));
  } else if (url === '/created') {
    // 201 - Created
    res.statusCode = 201;
    res.end(JSON.stringify({ message: 'Resource Created' }));
  } else if (url === '/redirect') {
    // 301 - Permanent Redirect
    res.statusCode = 301;
    res.setHeader('Location', '/new-location');
    res.end();
  } else if (url === '/bad-request') {
    // 400 - Bad Request
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Bad Request' }));
  } else if (url === '/unauthorized') {
    // 401 - Unauthorized
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));
  } else if (url === '/forbidden') {
    // 403 - Forbidden
    res.statusCode = 403;
    res.end(JSON.stringify({ error: 'Forbidden' }));
  } else if (url === '/server-error') {
    // 500 - Internal Server Error
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Server Error' }));
  } else {
    // 404 - Not Found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000);
```

## Headers

### Setting Response Headers

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Method 1: setHeader
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');

  // Method 2: writeHead (status + headers)
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  });

  res.end(JSON.stringify({ message: 'Hello' }));
});

server.listen(3000);
```

### Reading Request Headers

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Get all headers
  console.log('All headers:', req.headers);

  // Get specific headers
  const userAgent = req.headers['user-agent'];
  const contentType = req.headers['content-type'];
  const authorization = req.headers['authorization'];

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    userAgent,
    contentType,
    authorization
  }));
});

server.listen(3000);
```

## Your Tasks

### Task 1: Hello World Server
Create a simple server that:
- Responds with "Hello, World!" on any request
- Runs on port 3000
- Logs each request to console

### Task 2: Multi-Route Server
Create a server with routes:
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- Any other route - 404 error

### Task 3: JSON API
Create an API server:
- GET `/api/status` - Returns server status
- GET `/api/time` - Returns current time
- GET `/api/random` - Returns random number

### Task 4: Query Parameters
Create a server that:
- Route: `/greet?name=John&age=30`
- Returns JSON with name and age
- Handles missing parameters

### Task 5: POST Request Handler
Create a server that:
- Accepts POST requests to `/api/users`
- Receives JSON data (name, email)
- Validates the data
- Returns success or error response

### Task 6: Simple Calculator API
Create an API:
- `/add?a=5&b=3` - Returns sum
- `/subtract?a=10&b=4` - Returns difference
- `/multiply?a=6&b=7` - Returns product
- `/divide?a=20&b=4` - Returns quotient

### Task 7: Static File Server
Create a server that:
- Serves HTML files from a `public` folder
- Serves CSS files
- Returns 404 for missing files

### Task 8: User CRUD API
Create a simple user management API:
- GET `/users` - List all users (from array)
- GET `/users/:id` - Get specific user
- POST `/users` - Add new user
- DELETE `/users/:id` - Delete user

### Task 9: File Upload Endpoint
Create a server that:
- Accepts POST requests with file data
- Saves the file to disk
- Returns success message with filename

### Task 10: Complete Web Server
Build a complete server with:
- Multiple routes
- Static file serving
- API endpoints
- Error handling
- Request logging

## Common Pitfalls

### 1. Not Ending Response

```javascript
// ❌ Response never ends
http.createServer((req, res) => {
  res.write('Hello');
  // Missing res.end()!
});

// ✅ Always end response
http.createServer((req, res) => {
  res.write('Hello');
  res.end();
  // Or combine:
  res.end('Hello');
});
```

### 2. Setting Headers After Sending

```javascript
// ❌ Headers after body
http.createServer((req, res) => {
  res.write('Body');
  res.setHeader('Content-Type', 'text/plain');  // Error!
  res.end();
});

// ✅ Headers before body
http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('Body');
  res.end();
});
```

### 3. Not Handling Async Properly

```javascript
// ❌ Doesn't wait for async operation
http.createServer((req, res) => {
  fs.readFile('file.txt', (err, data) => {
    res.end(data);
  });
  // Response might end before file is read
});

// ✅ Handle async properly
http.createServer(async (req, res) => {
  try {
    const data = await fs.promises.readFile('file.txt');
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    res.end('Error');
  }
});
```

### 4. Forgetting Error Handling

```javascript
// ❌ No error handling
http.createServer((req, res) => {
  const data = JSON.parse(req.body);  // Might throw
  res.end(JSON.stringify(data));
});

// ✅ Handle errors
http.createServer((req, res) => {
  try {
    const data = JSON.parse(req.body);
    res.end(JSON.stringify(data));
  } catch (err) {
    res.statusCode = 400;
    res.end('Invalid JSON');
  }
});
```

### 5. Port Already in Use

```javascript
// ✅ Handle port in use error
const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server started on port 3000');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port 3000 is already in use');
    process.exit(1);
  }
});
```

## Best Practices

### 1. Use Async/Await

```javascript
// ✅ Modern async handling
const server = http.createServer(async (req, res) => {
  try {
    const data = await fetchData();
    res.end(JSON.stringify(data));
  } catch (err) {
    res.statusCode = 500;
    res.end('Error');
  }
});
```

### 2. Separate Route Logic

```javascript
// ✅ Clean route separation
const routes = {
  '/': (req, res) => {
    res.end('Home');
  },
  '/about': (req, res) => {
    res.end('About');
  }
};

const server = http.createServer((req, res) => {
  const handler = routes[req.url];
  if (handler) {
    handler(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});
```

### 3. Set Timeouts

```javascript
// ✅ Prevent hanging connections
const server = http.createServer(handler);
server.timeout = 30000;  // 30 seconds
server.listen(3000);
```

### 4. Log Requests

```javascript
// ✅ Log all requests
http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  // Handle request...
});
```

### 5. Validate Input

```javascript
// ✅ Validate before processing
http.createServer((req, res) => {
  if (req.method === 'POST') {
    // Validate content-type
    if (req.headers['content-type'] !== 'application/json') {
      res.statusCode = 415;
      res.end('Unsupported Media Type');
      return;
    }
    // Process...
  }
});
```

### 6. Use Environment Variables

```javascript
// ✅ Configurable port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
```

### 7. Graceful Shutdown

```javascript
// ✅ Handle shutdown gracefully
const server = http.createServer(handler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
```

## Next Steps

Once you complete these tasks, move on to:
- `02-Express-Basics` - Learn Express framework (easier than raw HTTP)
- `03-Routing` - Advanced routing techniques
- `04-Middleware` - Request/response processing
- `05-REST-API` - Build professional REST APIs

## Additional Resources

- [Node.js HTTP Documentation](https://nodejs.org/api/http.html)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [REST API Design](https://restfulapi.net/)
