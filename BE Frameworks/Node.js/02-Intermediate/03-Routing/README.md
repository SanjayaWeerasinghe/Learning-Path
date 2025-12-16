# Routing - Organizing Express Routes

## What You'll Learn

- Express Router
- Route parameters
- Query parameters
- Route organization
- RESTful routing patterns
- Route middleware

## Concept Overview

Express Router helps organize routes into modular, mountable route handlers.

### Basic Router

```javascript
const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.send('Users list');
});

router.get('/:id', (req, res) => {
  res.send(`User ${req.params.id}`);
});

router.post('/', (req, res) => {
  res.send('Create user');
});

module.exports = router;

// In app.js
const userRouter = require('./routes/users');
app.use('/users', userRouter);
```

### Route Parameters

```javascript
// URL: /users/123
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});

// Multiple parameters: /posts/5/comments/10
router.get('/posts/:postId/comments/:commentId', (req, res) => {
  const { postId, commentId } = req.params;
  res.json({ postId, commentId });
});
```

### Query Parameters

```javascript
// URL: /search?q=node&page=2
router.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page });
});
```

## Your Tasks

### Task 1: Basic Router
Create a users router with GET, POST, PUT, DELETE routes.

### Task 2: Route Parameters
Build a blog router with `/posts/:id` and `/posts/:id/comments`.

### Task 3: Query Parameters
Implement a search route with query parameters for filtering.

### Task 4: Modular Routes
Organize an app with separate routers for users, posts, and comments.

### Task 5: RESTful API
Build a complete RESTful API for a resource (products, books, etc.).

## Next Steps

Move to `04-Middleware` to learn about Express middleware!
