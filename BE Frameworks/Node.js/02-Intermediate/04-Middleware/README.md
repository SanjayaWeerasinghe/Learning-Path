# Middleware - Processing Requests

## What You'll Learn

- What is middleware
- Built-in middleware
- Custom middleware
- Third-party middleware
- Error handling middleware
- Middleware order

## Concept Overview

Middleware functions have access to request, response, and next function in the request-response cycle.

### Basic Middleware

```javascript
// Custom logging middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to next middleware
}

app.use(logger);
```

### Built-in Middleware

```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

### Route-Specific Middleware

```javascript
function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.get('/dashboard', checkAuth, (req, res) => {
  res.send('Dashboard');
});
```

### Error Handling Middleware

```javascript
// Must have 4 parameters
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

app.use(errorHandler);
```

## Your Tasks

### Task 1: Logger Middleware
Create middleware that logs all requests with timestamp.

### Task 2: Authentication Middleware
Build middleware to check for valid auth tokens.

### Task 3: Request Validation
Create middleware to validate request body data.

### Task 4: Rate Limiting
Implement simple rate limiting middleware.

### Task 5: Error Handler
Build comprehensive error handling middleware.

## Next Steps

Move to `05-REST-API` to build complete REST APIs!
