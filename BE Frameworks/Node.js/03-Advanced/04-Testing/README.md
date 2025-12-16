# Testing - Ensuring Code Quality

## What You'll Learn

- Jest testing framework
- Unit testing
- Integration testing
- Testing API endpoints
- Mocking
- Test coverage

## Setup

```bash
npm install --save-dev jest supertest
```

## Unit Testing

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// math.test.js
const { add } = require('./math');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds negative numbers', () => {
  expect(add(-1, -2)).toBe(-3);
});
```

## API Testing with Supertest

```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /api/users', () => {
  test('should return all users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /api/users', () => {
  test('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  test('should return 400 for invalid data', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: '' });

    expect(res.statusCode).toBe(400);
  });
});
```

## Mocking

```javascript
// Mocking database
jest.mock('./models/User');
const User = require('./models/User');

test('should find user by id', async () => {
  const mockUser = { id: 1, name: 'John' };
  User.findById.mockResolvedValue(mockUser);

  const user = await User.findById(1);
  expect(user).toEqual(mockUser);
});
```

## Your Tasks

### Task 1: Unit Tests
Write unit tests for utility functions.

### Task 2: API Tests
Test all CRUD endpoints for a resource.

### Task 3: Auth Tests
Test login and register endpoints.

### Task 4: Error Tests
Test error handling scenarios.

### Task 5: Mocking
Mock database calls in tests.

### Task 6: Test Coverage
Achieve >80% code coverage.

### Task 7: Integration Tests
Test complete user flows.

## Running Tests

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Next Steps

Move to `05-Deployment` to deploy your Node.js app!
