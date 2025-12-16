# Database - MongoDB Integration

## What You'll Learn

- MongoDB setup
- Mongoose ODM
- Schema and models
- CRUD operations with database
- Relationships
- Queries and aggregation

## Setup

```bash
npm install mongoose
```

## Connecting to MongoDB

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));
```

## Creating Schema and Model

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
```

## CRUD Operations

```javascript
// Create
const user = new User({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
});
await user.save();

// Read
const users = await User.find();
const user = await User.findById(id);
const filtered = await User.find({ age: { $gte: 18 } });

// Update
await User.findByIdAndUpdate(id, { name: 'Jane Doe' });

// Delete
await User.findByIdAndDelete(id);
```

## Your Tasks

### Task 1: User Model
Create a User schema and perform CRUD operations.

### Task 2: Product API
Build a product API with MongoDB backend.

### Task 3: Validation
Add Mongoose validation to all fields.

### Task 4: Relationships
Create User and Post models with relationships.

### Task 5: Queries
Implement filtering, sorting, and pagination with MongoDB.

### Task 6: Aggregation
Use MongoDB aggregation for statistics.

## Next Steps

Move to `02-Authentication` to add user authentication!
