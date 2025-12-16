# Error Handling - Robust Error Management

## What You'll Learn

- Try-catch blocks
- Error middleware
- Custom error classes
- Async error handling
- Validation errors
- Error logging
- Production vs development errors

## Basic Error Handling

```javascript
// Try-catch for async operations
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

## Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
throw new AppError('User not found', 404);
```

## Error Middleware

```javascript
// Global error handler (must be last middleware)
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error
  console.error(err);

  // Send response
  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
}

app.use(errorHandler);
```

## Async Wrapper

```javascript
// Wrapper to catch async errors
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Usage
app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

## Validation Errors

```javascript
// Using express-validator
const { validationResult } = require('express-validator');

app.post('/api/users', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Process valid data
});
```

## Your Tasks

### Task 1: Try-Catch
Add try-catch blocks to all async routes.

### Task 2: Custom Errors
Create custom error classes for different error types.

### Task 3: Error Middleware
Implement global error handling middleware.

### Task 4: Async Handler
Create an async wrapper to eliminate repetitive try-catch.

### Task 5: Validation
Add input validation with proper error messages.

### Task 6: Error Logging
Implement error logging to file or service.

### Task 7: 404 Handler
Create middleware for handling 404 errors.

### Task 8: Production Errors
Different error responses for dev vs production.

## Best Practices

- Always handle errors
- Use custom error classes
- Log errors properly
- Don't expose sensitive info in production
- Use async/await with try-catch
- Validate all inputs
- Return consistent error format

## Next Steps

Move to `04-Testing` to learn testing your Node.js apps!
