# Express.js Basics - Web Framework for Node.js

## What You'll Learn
- What Express is and why use it
- Setting up Express applications
- Basic routing with Express
- Request and response objects
- Sending different response types
- Template engines (EJS, Pug)
- Static file serving
- Express application structure

## Concept Overview

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's the most popular Node.js framework.

### Why Express?
- **Simplified Routing**: Easy route definition
- **Middleware Support**: Powerful request/response processing
- **Template Engines**: Render dynamic HTML
- **Robust API**: Build RESTful APIs easily
- **Community**: Large ecosystem of middleware
- **Performance**: Fast and lightweight

### Express vs Raw HTTP

```javascript
// Raw HTTP - verbose
const http = require('http');
http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home</h1>');
  }
}).listen(3000);

// Express - concise
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});
app.listen(3000);
```

## Installation and Setup

### Install Express

```bash
# Initialize project
npm init -y

# Install Express
npm install express

# Install nodemon for development
npm install --save-dev nodemon
```

### package.json Scripts

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

## Your First Express App

### Basic Server

```javascript
// app.js
const express = require('express');
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Run it:
```bash
npm run dev
```

### Express Application Instance

```javascript
const express = require('express');
const app = express();

// app object has methods:
app.get()     // Handle GET requests
app.post()    // Handle POST requests
app.put()     // Handle PUT requests
app.delete()  // Handle DELETE requests
app.use()     // Use middleware
app.listen()  // Start server
app.set()     // Set configuration
```

## Routing Basics

### HTTP Methods

```javascript
const express = require('express');
const app = express();

// GET request
app.get('/users', (req, res) => {
  res.send('Get all users');
});

// POST request
app.post('/users', (req, res) => {
  res.send('Create a user');
});

// PUT request
app.put('/users/:id', (req, res) => {
  res.send(`Update user ${req.params.id}`);
});

// DELETE request
app.delete('/users/:id', (req, res) => {
  res.send(`Delete user ${req.params.id}`);
});

app.listen(3000);
```

### Route Parameters

```javascript
const express = require('express');
const app = express();

// Single parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, Post ${postId}`);
});

// Optional parameter (with ?)
app.get('/users/:id?', (req, res) => {
  if (req.params.id) {
    res.send(`User ${req.params.id}`);
  } else {
    res.send('All users');
  }
});

app.listen(3000);
```

### Query Parameters

```javascript
const express = require('express');
const app = express();

// Query string: /search?name=John&age=30
app.get('/search', (req, res) => {
  const { name, age } = req.query;
  res.send(`Searching for ${name}, age ${age}`);
});

// With defaults
app.get('/users', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  res.send(`Page ${page}, Limit ${limit}`);
});

app.listen(3000);
```

## Response Methods

### Different Response Types

```javascript
const express = require('express');
const app = express();

// Send text
app.get('/text', (req, res) => {
  res.send('Plain text response');
});

// Send HTML
app.get('/html', (req, res) => {
  res.send('<h1>HTML Response</h1>');
});

// Send JSON
app.get('/json', (req, res) => {
  res.json({
    name: 'John',
    age: 30,
    city: 'New York'
  });
});

// Send status code
app.get('/created', (req, res) => {
  res.status(201).json({ message: 'Created' });
});

// Send file
app.get('/download', (req, res) => {
  res.sendFile(__dirname + '/file.pdf');
});

// Redirect
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});

// Set custom status
app.get('/error', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(3000);
```

### Response Chaining

```javascript
app.get('/api/user', (req, res) => {
  res
    .status(200)
    .set('Content-Type', 'application/json')
    .json({ name: 'John' });
});
```

## Request Object

### Accessing Request Data

```javascript
const express = require('express');
const app = express();

app.get('/info', (req, res) => {
  const info = {
    method: req.method,           // GET
    url: req.url,                 // /info
    path: req.path,               // /info
    params: req.params,           // URL parameters
    query: req.query,             // Query string
    headers: req.headers,         // Request headers
    ip: req.ip,                   // Client IP
    hostname: req.hostname,       // Host name
    protocol: req.protocol,       // http or https
    originalUrl: req.originalUrl  // Full URL
  };

  res.json(info);
});

app.listen(3000);
```

## Middleware

### Built-in Middleware

```javascript
const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Now we can handle POST requests with JSON
app.post('/api/users', (req, res) => {
  const userData = req.body;  // Parsed JSON
  res.json({
    message: 'User created',
    data: userData
  });
});

app.listen(3000);
```

### Custom Middleware

```javascript
const express = require('express');
const app = express();

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();  // Pass control to next middleware
});

// Authentication middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === 'secret') {
    next();  // Authenticated, continue
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Apply to specific route
app.get('/protected', auth, (req, res) => {
  res.send('Protected content');
});

app.listen(3000);
```

## Static Files

### Serving Static Files

```javascript
const express = require('express');
const app = express();

// Serve files from 'public' directory
app.use(express.static('public'));

// Multiple static directories
app.use(express.static('public'));
app.use(express.static('files'));

// Virtual path prefix
app.use('/static', express.static('public'));

// Now accessible at:
// http://localhost:3000/image.png (if in public/)
// http://localhost:3000/static/image.png (with prefix)

app.listen(3000);
```

Project structure:
```
myapp/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── images/
│       └── logo.png
├── app.js
└── package.json
```

## Template Engines

### Using EJS

```bash
npm install ejs
```

```javascript
const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Render template
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home Page',
    user: 'John'
  });
});

app.listen(3000);
```

Create `views/index.ejs`:
```html
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1>Welcome, <%= user %>!</h1>
</body>
</html>
```

### Using Pug

```bash
npm install pug
```

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    message: 'Hello from Pug!'
  });
});

app.listen(3000);
```

Create `views/index.pug`:
```pug
doctype html
html
  head
    title= title
  body
    h1= message
```

## Error Handling

### 404 Handler

```javascript
const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Home');
});

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(3000);
```

### Error Handler

```javascript
const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  throw new Error('Oops!');
});

// Error handler (must be last, has 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(3000);
```

## Your Tasks

### Task 1: Basic Express Server
Create an Express server with:
- Route `/` - "Welcome to Express"
- Route `/about` - "About Page"
- Route `/contact` - "Contact Page"
- 404 handler

### Task 2: User Profile
Create routes:
- `/user/:username` - Display "Profile: {username}"
- `/user/:id/posts` - Display "Posts by user {id}"
- `/search?q=keyword` - Display "Search results for: {keyword}"

### Task 3: JSON API
Create an API:
- GET `/api/users` - Return array of users
- GET `/api/users/:id` - Return specific user
- POST `/api/users` - Accept and return user data

### Task 4: Static Website
Create a website with:
- Serve static files (HTML, CSS, images)
- Multiple HTML pages
- Styled with CSS
- Include images

### Task 5: Template Rendering
Create an app using EJS:
- Home page with dynamic content
- About page with user info
- Pass data from routes to templates

### Task 6: Calculator API
Create calculator endpoints:
- POST `/api/add` - { a, b } → sum
- POST `/api/subtract` - { a, b } → difference
- POST `/api/multiply` - { a, b } → product
- POST `/api/divide` - { a, b } → quotient

### Task 7: Blog System
Create basic blog routes:
- GET `/` - List all posts
- GET `/post/:id` - View single post
- Use array to store posts
- Render with template engine

### Task 8: Middleware Logger
Create middleware that:
- Logs all requests (method, URL, timestamp)
- Logs response time
- Saves to file

### Task 9: Authentication
Create simple auth system:
- POST `/login` - Check credentials
- GET `/dashboard` - Protected route
- Use middleware for auth check

### Task 10: Complete App
Build a todo application:
- View all todos (EJS template)
- Add new todo (form)
- Delete todo
- Mark as complete
- Use array for storage

## Common Pitfalls

### 1. Forgetting express.json()

```javascript
// ❌ req.body is undefined
app.post('/api/users', (req, res) => {
  console.log(req.body);  // undefined
});

// ✅ Add JSON middleware
app.use(express.json());
app.post('/api/users', (req, res) => {
  console.log(req.body);  // Works!
});
```

### 2. Route Order Matters

```javascript
// ❌ Wrong order
app.get('/users/:id', (req, res) => {
  res.send(`User ${req.params.id}`);
});

app.get('/users/new', (req, res) => {
  res.send('New user form');
});
// '/users/new' will match first route with id='new'

// ✅ Specific routes first
app.get('/users/new', (req, res) => {
  res.send('New user form');
});

app.get('/users/:id', (req, res) => {
  res.send(`User ${req.params.id}`);
});
```

### 3. Not Sending Response

```javascript
// ❌ Request hangs
app.get('/', (req, res) => {
  const data = getData();
  // Forgot to send response!
});

// ✅ Always send response
app.get('/', (req, res) => {
  const data = getData();
  res.json(data);
});
```

### 4. Forgetting next() in Middleware

```javascript
// ❌ Request stuck in middleware
app.use((req, res, next) => {
  console.log('Middleware');
  // Forgot next()!
});

// ✅ Call next()
app.use((req, res, next) => {
  console.log('Middleware');
  next();
});
```

### 5. Error Handler Position

```javascript
// ❌ Error handler before routes
app.use((err, req, res, next) => {
  res.status(500).send('Error');
});

app.get('/', (req, res) => {
  // Won't catch errors
});

// ✅ Error handler last
app.get('/', (req, res) => {
  // Routes
});

app.use((err, req, res, next) => {
  res.status(500).send('Error');
});
```

## Best Practices

### 1. Use Environment Variables

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`Server on port ${PORT} in ${NODE_ENV} mode`);
});
```

### 2. Separate Route Files

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('All users');
});

router.get('/:id', (req, res) => {
  res.send(`User ${req.params.id}`);
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
```

### 3. Use Async Error Handling

```javascript
// Wrapper for async routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

### 4. Validate Input

```javascript
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email required'
    });
  }

  // Process...
});
```

### 5. Use Helmet for Security

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');
app.use(helmet());
```

### 6. Enable CORS

```bash
npm install cors
```

```javascript
const cors = require('cors');
app.use(cors());
```

### 7. Structure Your App

```
myapp/
├── config/
│   └── database.js
├── controllers/
│   └── userController.js
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── middleware/
│   └── auth.js
├── public/
│   ├── css/
│   └── js/
├── views/
│   └── index.ejs
├── app.js
└── package.json
```

## Next Steps

Once you complete these tasks, move on to:
- `03-Routing` - Advanced routing patterns
- `04-Middleware` - Creating and using middleware
- `05-REST-API` - Building RESTful APIs
- `03-Advanced` - Database, authentication, testing

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
