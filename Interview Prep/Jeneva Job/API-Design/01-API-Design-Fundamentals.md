# API Design & Development - Interview Questions & Answers

## Table of Contents
1. [REST API Principles](#rest-api-principles)
2. [HTTP Methods and Status Codes](#http-methods-and-status-codes)
3. [API Design Best Practices](#api-design-best-practices)
4. [Authentication & Authorization](#authentication--authorization)
5. [Error Handling](#error-handling)
6. [API Versioning](#api-versioning)
7. [GraphQL Basics](#graphql-basics)

---

## REST API Principles

### Question
**What is REST and what are its core principles?**

### Answer
REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP protocols and is stateless.

**Core Principles:**
1. **Client-Server Architecture**: Separation of concerns
2. **Stateless**: Each request contains all information needed
3. **Cacheable**: Responses must define themselves as cacheable or not
4. **Uniform Interface**: Standard methods and conventions
5. **Layered System**: Client can't tell if connected directly to server
6. **Code on Demand (Optional)**: Server can send executable code

### Better Explanation

**RESTful Resource Design:**
```
Good REST API Design:

GET    /api/users              # Get all users
GET    /api/users/123          # Get specific user
POST   /api/users              # Create new user
PUT    /api/users/123          # Update entire user
PATCH  /api/users/123          # Partial update
DELETE /api/users/123          # Delete user

GET    /api/users/123/posts    # Get user's posts
POST   /api/posts              # Create post
GET    /api/posts/456          # Get specific post
```

**Bad API Design (Not RESTful):**
```
❌ GET  /api/getUser?id=123
❌ POST /api/createUser
❌ POST /api/deleteUser
❌ GET  /api/user-delete?id=123
```

**Resource Naming Conventions:**
- Use nouns, not verbs
- Use plural for collections
- Use lowercase and hyphens
- Be consistent

```
✅ /api/users
✅ /api/blog-posts
✅ /api/order-items

❌ /api/getUsers
❌ /api/BlogPosts
❌ /api/orderitems
```

---

## HTTP Methods and Status Codes

### Question
**Explain HTTP methods and when to use appropriate status codes.**

### Answer

**HTTP Methods:**

| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| GET | Retrieve resource | Yes | Yes |
| POST | Create resource | No | No |
| PUT | Update/Replace resource | Yes | No |
| PATCH | Partial update | No | No |
| DELETE | Delete resource | Yes | No |

### Better Explanation

**GET - Retrieve Data:**
```typescript
// GET /api/users
app.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

// GET /api/users/123
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

// GET with query parameters
// GET /api/users?page=2&limit=10&role=admin
app.get('/api/users', async (req, res) => {
  const { page = 1, limit = 10, role } = req.query;

  const users = await User.findAll({
    where: role ? { role } : {},
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit)
  });

  res.status(200).json({
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: await User.count()
    }
  });
});
```

**POST - Create Resource:**
```typescript
// POST /api/users
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Return 201 Created with location header
    res.status(201)
       .location(`/api/users/${user.id}`)
       .json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

**PUT - Full Update:**
```typescript
// PUT /api/users/123
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;

  // PUT requires all fields
  if (!name || !email || !role) {
    return res.status(400).json({
      error: 'All fields required for PUT'
    });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Replace entire resource
  const updated = await user.update({ name, email, role });

  res.status(200).json(updated);
});
```

**PATCH - Partial Update:**
```typescript
// PATCH /api/users/123
app.patch('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update only provided fields
  const updated = await user.update(updates);

  res.status(200).json(updated);
});
```

**DELETE - Remove Resource:**
```typescript
// DELETE /api/users/123
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  await user.delete();

  // 204 No Content (success, no body)
  res.status(204).send();
});
```

**HTTP Status Codes:**

**2xx Success:**
- `200 OK` - GET, PUT, PATCH success
- `201 Created` - POST success (include Location header)
- `204 No Content` - DELETE success

**4xx Client Errors:**
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Resource already exists
- `422 Unprocessable Entity` - Validation failed
- `429 Too Many Requests` - Rate limit exceeded

**5xx Server Errors:**
- `500 Internal Server Error` - Generic server error
- `502 Bad Gateway` - Invalid response from upstream
- `503 Service Unavailable` - Server temporarily unavailable

---

## API Design Best Practices

### Question
**What are the best practices for designing APIs?**

### Answer

**1. Consistent Response Format:**
```typescript
// Success Response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe"
  },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

**2. Pagination:**
```typescript
// GET /api/users?page=2&limit=10
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrevious": true
  },
  "links": {
    "self": "/api/users?page=2&limit=10",
    "first": "/api/users?page=1&limit=10",
    "last": "/api/users?page=10&limit=10",
    "next": "/api/users?page=3&limit=10",
    "prev": "/api/users?page=1&limit=10"
  }
}
```

**3. Filtering and Sorting:**
```typescript
// GET /api/users?role=admin&status=active&sort=name:asc,createdAt:desc
app.get('/api/users', async (req, res) => {
  const { role, status, sort, page = 1, limit = 10 } = req.query;

  const where: any = {};
  if (role) where.role = role;
  if (status) where.status = status;

  const order: any = [];
  if (sort) {
    const sortFields = sort.split(',');
    sortFields.forEach((field: string) => {
      const [key, direction] = field.split(':');
      order.push([key, direction.toUpperCase()]);
    });
  }

  const users = await User.findAll({
    where,
    order,
    limit: Number(limit),
    offset: (Number(page) - 1) * Number(limit)
  });

  res.json({ data: users });
});
```

**4. Field Selection (Sparse Fieldsets):**
```typescript
// GET /api/users/123?fields=id,name,email
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;

  const attributes = fields ? fields.split(',') : undefined;

  const user = await User.findById(id, { attributes });

  res.json(user);
});
```

**5. Nested Resources:**
```typescript
// GET /api/users/123/posts
app.get('/api/users/:userId/posts', async (req, res) => {
  const { userId } = req.params;

  const posts = await Post.findAll({ where: { userId } });

  res.json(posts);
});

// POST /api/users/123/posts
app.post('/api/users/:userId/posts', async (req, res) => {
  const { userId } = req.params;
  const { title, content } = req.body;

  const post = await Post.create({
    userId,
    title,
    content
  });

  res.status(201).json(post);
});
```

**6. HATEOAS (Hypermedia):**
```typescript
// Response includes links to related resources
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "_links": {
    "self": { "href": "/api/users/1" },
    "posts": { "href": "/api/users/1/posts" },
    "followers": { "href": "/api/users/1/followers" },
    "avatar": { "href": "/api/users/1/avatar" }
  }
}
```

---

## Authentication & Authorization

### Question
**How do you implement authentication and authorization in APIs?**

### Answer

**1. JWT (JSON Web Tokens):**
```typescript
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// Authentication middleware
function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Authorization middleware
function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    next();
  };
}

// Protected routes
app.get('/api/users', authenticate, async (req, res) => {
  // Only authenticated users can access
  const users = await User.findAll();
  res.json(users);
});

app.delete('/api/users/:id', authenticate, authorize('admin'), async (req, res) => {
  // Only admins can delete users
  await User.delete(req.params.id);
  res.status(204).send();
});
```

**2. API Keys:**
```typescript
// API Key middleware
async function validateApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  const key = await ApiKey.findByKey(apiKey as string);

  if (!key || !key.isActive) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  // Check rate limits
  const usage = await key.checkRateLimit();
  if (usage.exceeded) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: usage.retryAfter
    });
  }

  req.apiKey = key;
  next();
}

// Usage
app.get('/api/data', validateApiKey, async (req, res) => {
  const data = await getData();
  res.json(data);
});
```

---

## Error Handling

### Question
**How do you handle errors in APIs?**

### Answer

**Centralized Error Handling:**
```typescript
// Custom error classes
class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
  }
}

class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(422, message, 'VALIDATION_ERROR', details);
  }
}

class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND');
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message, 'UNAUTHORIZED');
  }
}

// Global error handler middleware
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      }
    });
  }

  // Unknown error
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  });
}

// Usage in routes
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError('User');
    }

    res.json(user);
  } catch (error) {
    next(error); // Pass to error handler
  }
});

// Register error handler (must be last)
app.use(errorHandler);
```

**Validation with Detailed Errors:**
```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120)
});

app.post('/api/users', async (req, res, next) => {
  try {
    // Validate request body
    const data = createUserSchema.parse(req.body);

    const user = await User.create(data);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      throw new ValidationError('Validation failed', details);
    }

    next(error);
  }
});
```

---

## API Versioning

### Question
**How do you version APIs?**

### Answer

**1. URL Versioning (Most Common):**
```typescript
// v1/users.ts
app.get('/api/v1/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// v2/users.ts - Breaking changes
app.get('/api/v2/users', async (req, res) => {
  const users = await User.findAll();

  // v2 returns different format
  res.json({
    items: users,
    count: users.length
  });
});
```

**2. Header Versioning:**
```typescript
app.get('/api/users', async (req, res) => {
  const version = req.headers['api-version'] || 'v1';

  if (version === 'v2') {
    return res.json({ items: users, count: users.length });
  }

  res.json(users);
});
```

**3. Accept Header Versioning:**
```typescript
// Request: Accept: application/vnd.myapp.v2+json
app.get('/api/users', async (req, res) => {
  const accept = req.headers.accept || '';

  if (accept.includes('v2')) {
    return res.json({ items: users });
  }

  res.json(users);
});
```

---

## GraphQL Basics

### Question
**What is GraphQL and how does it differ from REST?**

### Answer

GraphQL is a query language for APIs that allows clients to request exactly the data they need.

### Better Explanation

**GraphQL Schema:**
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String, email: String): User!
  deleteUser(id: ID!): Boolean!
}
```

**GraphQL Query:**
```graphql
# Request exactly what you need
query {
  user(id: "123") {
    name
    email
    posts {
      title
    }
  }
}

# Response - only requested fields
{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "posts": [
        { "title": "Post 1" },
        { "title": "Post 2" }
      ]
    }
  }
}
```

**REST vs GraphQL:**

| Aspect | REST | GraphQL |
|--------|------|---------|
| Endpoints | Multiple | Single |
| Data Fetching | Fixed structure | Client-defined |
| Over-fetching | Common | Never |
| Under-fetching | Common | Never |
| Versioning | Required | Not needed |
| Caching | HTTP caching | More complex |

---

## Key Takeaways for Jeneva Interview

### API Design Priorities:
1. **RESTful principles**: Resources, HTTP methods, status codes
2. **Security**: Authentication (JWT), authorization, API keys
3. **Error handling**: Consistent, informative error responses
4. **Best practices**: Pagination, filtering, versioning
5. **Documentation**: Clear API documentation (Swagger/OpenAPI)

### Common Interview Topics:
- Designing CRUD APIs for resources
- Implementing authentication/authorization
- Handling errors and validation
- API versioning strategies
- Rate limiting and throttling
- REST vs GraphQL trade-offs

### Demonstrate:
- Experience building production APIs
- Understanding of HTTP and web standards
- Security best practices
- Scalable API design patterns
