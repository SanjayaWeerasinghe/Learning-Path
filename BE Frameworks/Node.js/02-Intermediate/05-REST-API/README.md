# REST API - Building RESTful Web Services

## What You'll Learn

- RESTful principles
- HTTP methods (GET, POST, PUT, DELETE)
- Status codes
- Request/Response structure
- API versioning
- CRUD operations

## Concept Overview

REST (Representational State Transfer) is an architectural style for building web services.

### RESTful Routes

```javascript
const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(user);
  res.status(201).json(user);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.name = req.body.name;
  user.email = req.body.email;
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## HTTP Status Codes

- 200 OK - Success
- 201 Created - Resource created
- 204 No Content - Success, no data
- 400 Bad Request - Invalid data
- 401 Unauthorized - Not authenticated
- 403 Forbidden - Not authorized
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server error

## Your Tasks

### Task 1: Products API
Build a complete REST API for products (CRUD operations).

### Task 2: Validation
Add input validation for all POST/PUT requests.

### Task 3: Filtering & Sorting
Implement query parameters for filtering and sorting results.

### Task 4: Pagination
Add pagination to GET all routes.

### Task 5: Nested Resources
Create API for posts with comments (`/posts/:id/comments`).

### Task 6: Error Handling
Implement comprehensive error handling.

### Task 7: API Documentation
Document your API endpoints with examples.

### Task 8: API Versioning
Implement API versioning (`/api/v1/users`).

## Best Practices

- Use plural nouns for resources (`/users`, not `/user`)
- Use HTTP methods correctly
- Return appropriate status codes
- Validate all inputs
- Handle errors gracefully
- Version your API
- Document endpoints
- Use consistent response format

## Next Steps

Move to `03-Advanced/01-Database-MongoDB` to add database persistence!
