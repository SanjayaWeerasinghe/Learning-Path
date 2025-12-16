# Authentication - Securing Your API

## What You'll Learn

- Password hashing with bcrypt
- JWT (JSON Web Tokens)
- Login/Register endpoints
- Protected routes
- Refresh tokens
- Session management

## Setup

```bash
npm install bcryptjs jsonwebtoken
```

## Password Hashing

```javascript
const bcrypt = require('bcryptjs');

// Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Compare password
const isValid = await bcrypt.compare(password, hashedPassword);
```

## JWT Authentication

```javascript
const jwt = require('jsonwebtoken');

// Generate token
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

## Auth Routes

```javascript
// Register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  // Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.status(201).json({ token });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  // Check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });

  // Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});
```

## Auth Middleware

```javascript
function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
}

// Protected route
app.get('/api/profile', auth, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});
```

## Your Tasks

### Task 1: Register & Login
Implement user registration and login with password hashing.

### Task 2: JWT Tokens
Generate and verify JWT tokens for authentication.

### Task 3: Protected Routes
Create middleware to protect routes requiring authentication.

### Task 4: User Profile
Build endpoints for viewing and updating user profile.

### Task 5: Password Reset
Implement password reset functionality.

### Task 6: Refresh Tokens
Add refresh token functionality for extended sessions.

## Security Best Practices

- Never store plain text passwords
- Use strong JWT secrets (environment variables)
- Set token expiration
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting for auth routes
- Hash passwords with bcrypt (cost factor 10+)

## Next Steps

Move to `03-Error-Handling` for robust error management!
