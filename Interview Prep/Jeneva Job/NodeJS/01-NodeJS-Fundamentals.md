# Node.js Fundamentals - Interview Questions & Answers

## Table of Contents
1. [What is Node.js?](#what-is-nodejs)
2. [Event Loop and Async Programming](#event-loop-and-async-programming)
3. [Modules and npm](#modules-and-npm)
4. [Express.js Framework](#expressjs-framework)
5. [Error Handling](#error-handling)
6. [Middleware](#middleware)
7. [Performance and Scalability](#performance-and-scalability)

---

## What is Node.js?

### Question
**What is Node.js and what are its key features?**

### Answer
Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side.

**Key Features:**
- **Asynchronous & Non-blocking I/O**: Handles many connections simultaneously
- **Single-threaded**: Uses event loop for concurrency
- **Fast**: Built on V8 engine
- **npm**: Largest package ecosystem
- **Cross-platform**: Works on Windows, Linux, macOS

### Better Explanation

**Node.js vs Browser JavaScript:**
```javascript
// Browser JavaScript
window.alert("Hello");
document.getElementById("app");
localStorage.setItem("key", "value");

// Node.js
const fs = require('fs');
const http = require('http');
process.env.NODE_ENV;
```

**Simple HTTP Server:**
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

**When to Use Node.js:**
- RESTful APIs
- Real-time applications (chat, collaboration tools)
- Microservices
- Streaming applications
- Server-side rendering (SSR)

**When NOT to Use Node.js:**
- CPU-intensive tasks (image/video processing)
- Heavy computation algorithms
- Use worker threads or separate services for these

---

## Event Loop and Async Programming

### Question
**Explain the Node.js Event Loop and asynchronous programming.**

### Answer

Node.js uses a single-threaded event loop to handle asynchronous operations efficiently.

### Better Explanation

**Event Loop Phases:**
```
   ┌───────────────────────────┐
┌─>│           timers          │  setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  Internal use
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  Retrieve new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  setImmediate callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │  socket.on('close', ...)
│  └─────────────┬─────────────┘
└──────────────────────────────┘
```

**Callbacks:**
```javascript
const fs = require('fs');

// Asynchronous - non-blocking
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

console.log('This runs first!');

// Output:
// This runs first!
// (file contents)
```

**Promises:**
```javascript
const fs = require('fs').promises;

// Using promises
fs.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Chaining promises
fetchUser(userId)
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.error(err));
```

**Async/Await (Modern):**
```javascript
const fs = require('fs').promises;

async function readFiles() {
  try {
    const file1 = await fs.readFile('file1.txt', 'utf8');
    const file2 = await fs.readFile('file2.txt', 'utf8');
    console.log(file1, file2);
  } catch (err) {
    console.error(err);
  }
}

readFiles();

// Parallel execution
async function readFilesParallel() {
  try {
    const [file1, file2] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8')
    ]);
    console.log(file1, file2);
  } catch (err) {
    console.error(err);
  }
}
```

**Common Async Patterns:**
```javascript
// Sequential execution
async function sequential() {
  const result1 = await operation1(); // Waits
  const result2 = await operation2(); // Waits
  return [result1, result2];
}

// Parallel execution
async function parallel() {
  const [result1, result2] = await Promise.all([
    operation1(), // Runs simultaneously
    operation2()  // Runs simultaneously
  ]);
  return [result1, result2];
}

// Race (first to complete)
async function race() {
  const result = await Promise.race([
    operation1(),
    operation2()
  ]);
  return result; // Returns first completed
}

// All settled (waits for all, doesn't fail fast)
async function allSettled() {
  const results = await Promise.allSettled([
    operation1(),
    operation2()
  ]);
  // Returns: [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]
  return results;
}
```

---

## Modules and npm

### Question
**How do modules work in Node.js?**

### Answer

Node.js uses the CommonJS module system (and now ES modules).

### Better Explanation

**CommonJS (Traditional):**
```javascript
// math.js - Exporting
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = {
  add,
  subtract
};

// Or export individually
exports.add = add;
exports.subtract = subtract;

// app.js - Importing
const math = require('./math');
console.log(math.add(5, 3)); // 8

// Or destructure
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

**ES Modules (Modern):**
```javascript
// math.mjs or math.js (with "type": "module" in package.json)
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// app.mjs
import multiply, { add, subtract } from './math.mjs';
console.log(add(5, 3)); // 8
console.log(multiply(5, 3)); // 15
```

**Built-in Modules:**
```javascript
// File system
const fs = require('fs');
const fsPromises = require('fs').promises;

// Path
const path = require('path');
console.log(path.join(__dirname, 'file.txt'));

// HTTP
const http = require('http');

// Events
const EventEmitter = require('events');

// Stream
const { Readable, Writable } = require('stream');

// OS
const os = require('os');
console.log(os.platform());
console.log(os.cpus().length);
```

**npm (Node Package Manager):**
```bash
# Initialize project
npm init
npm init -y  # Skip questions

# Install package
npm install express
npm i express  # Shorthand

# Install as dev dependency
npm install --save-dev jest
npm i -D jest  # Shorthand

# Install globally
npm install -g nodemon

# Update packages
npm update

# Remove package
npm uninstall express

# List installed packages
npm list
npm list --depth=0  # Top-level only

# Run scripts
npm run dev
npm start
npm test
```

**package.json:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^2.0.0"
  }
}
```

---

## Express.js Framework

### Question
**What is Express.js and how do you use it?**

### Answer

Express is a minimal and flexible Node.js web application framework.

### Better Explanation

**Basic Express App:**
```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  // Save user to database
  res.status(201).json(user);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Route Parameters:**
```javascript
// URL parameter
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // Fetch user by id
  res.json({ id, name: 'John' });
});

// Query parameters
// GET /api/users?page=2&limit=10
app.get('/api/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  res.json({ page, limit });
});

// Multiple parameters
app.get('/api/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({ userId, postId });
});
```

**Router for Organization:**
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create user' });
});

module.exports = router;

// app.js
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
```

---

## Error Handling

### Question
**How do you handle errors in Node.js and Express?**

### Answer

**Synchronous Error Handling:**
```javascript
app.get('/api/users/:id', (req, res, next) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    res.json(user);
  } catch (err) {
    next(err); // Pass to error handler
  }
});
```

**Async Error Handling:**
```javascript
// Without wrapper
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// With async wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json(user);
}));
```

**Global Error Handler:**
```javascript
// Must be last middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});
```

**Custom Error Classes:**
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(`${resource} not found`, 404);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

// Usage
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      throw new NotFoundError('User');
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});
```

---

## Middleware

### Question
**What is middleware in Express and how do you use it?**

### Answer

Middleware are functions that have access to request, response, and next middleware function.

### Better Explanation

**Built-in Middleware:**
```javascript
const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

**Third-party Middleware:**
```javascript
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Enable CORS
app.use(cors());

// HTTP request logger
app.use(morgan('dev'));

// Security headers
app.use(helmet());
```

**Custom Middleware:**
```javascript
// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Must call next()
};

app.use(logger);

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply to specific routes
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});
```

**Middleware Order:**
```javascript
// 1. Global middleware (runs for all routes)
app.use(express.json());
app.use(logger);

// 2. Route-specific middleware
app.get('/api/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin panel' });
});

// 3. Error handling middleware (must be last)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

## Performance and Scalability

### Question
**How do you optimize Node.js application performance?**

### Answer

**1. Clustering:**
```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  console.log(`Master process ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Replace dead worker
  });
} else {
  // Workers share the same server port
  const app = require('./app');
  app.listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```

**2. Caching:**
```javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  // Check cache first
  const cached = cache.get(`user_${id}`);
  if (cached) {
    return res.json(cached);
  }

  // Fetch from database
  const user = await getUserById(id);

  // Store in cache
  cache.set(`user_${id}`, user);

  res.json(user);
});
```

**3. Database Connection Pooling:**
```javascript
// Using pg (PostgreSQL)
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'user',
  password: 'password',
  max: 20, // Maximum number of clients
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Use pool instead of creating new connections
app.get('/api/users', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
  } finally {
    client.release();
  }
});
```

**4. Compression:**
```javascript
const compression = require('compression');

app.use(compression()); // Compress responses
```

**5. Async Best Practices:**
```javascript
// ❌ Bad - Sequential
async function bad() {
  const user = await getUser(); // Waits
  const posts = await getPosts(); // Waits
  return { user, posts };
}

// ✅ Good - Parallel
async function good() {
  const [user, posts] = await Promise.all([
    getUser(), // Runs simultaneously
    getPosts() // Runs simultaneously
  ]);
  return { user, posts };
}
```

---

## Key Takeaways for Jeneva Interview

### Node.js Priorities:
1. **Async programming**: Callbacks, Promises, async/await
2. **Express framework**: Routes, middleware, error handling
3. **Modules**: CommonJS, ES modules, npm
4. **Event loop**: Understanding non-blocking I/O
5. **Performance**: Clustering, caching, optimization

### Demonstrate:
- Strong async/await understanding
- Experience building REST APIs with Express
- Knowledge of middleware patterns
- Error handling best practices
- Performance optimization techniques
