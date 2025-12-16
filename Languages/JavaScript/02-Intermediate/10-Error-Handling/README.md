# Error Handling in JavaScript

## Introduction

Error handling is crucial for building robust applications. JavaScript provides try-catch-finally blocks and Error objects to handle and throw errors gracefully.

## Key Concepts

### 1. Try-Catch-Finally

```javascript
// Basic try-catch
try {
    // Code that might throw an error
    const result = riskyOperation();
} catch (error) {
    // Handle the error
    console.error('Error occurred:', error.message);
}

// Try-catch-finally
try {
    const data = JSON.parse(jsonString);
    processData(data);
} catch (error) {
    console.error('Failed to parse JSON:', error);
} finally {
    // Always executes (cleanup)
    console.log('Cleanup completed');
}

// Catch without binding (ES2019)
try {
    riskyOperation();
} catch {
    // Error not needed
    console.log('Something went wrong');
}
```

### 2. Throwing Errors

```javascript
// Throw built-in error
throw new Error('Something went wrong');

// Throw error types
throw new TypeError('Expected a number');
throw new RangeError('Value out of range');
throw new ReferenceError('Variable not defined');

// Throw custom values (not recommended)
throw 'Error message';  // String
throw 42;               // Number
throw { message: 'Error' };  // Object

// Conditional throwing
function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
}

try {
    const result = divide(10, 0);
} catch (error) {
    console.error(error.message);  // "Cannot divide by zero"
}
```

### 3. Error Types

```javascript
// Error - generic error
try {
    throw new Error('Generic error');
} catch (e) {
    console.log(e.name);     // "Error"
    console.log(e.message);  // "Generic error"
    console.log(e.stack);    // Stack trace
}

// TypeError - wrong type
function processNumber(num) {
    if (typeof num !== 'number') {
        throw new TypeError('Expected a number');
    }
    return num * 2;
}

// RangeError - value out of range
function setAge(age) {
    if (age < 0 || age > 150) {
        throw new RangeError('Age must be between 0 and 150');
    }
}

// ReferenceError - invalid reference
try {
    console.log(nonExistentVariable);
} catch (e) {
    console.log(e instanceof ReferenceError);  // true
}

// SyntaxError - parsing error
try {
    eval('invalid javascript code {');
} catch (e) {
    console.log(e instanceof SyntaxError);  // true
}
```

### 4. Custom Errors

```javascript
// Custom error class
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

// Using custom errors
function validateUser(user) {
    if (!user.name) {
        throw new ValidationError('Name is required');
    }
    if (!user.email) {
        throw new ValidationError('Email is required');
    }
}

try {
    validateUser({ name: 'John' });
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('Validation failed:', error.message);
    } else {
        console.log('Unknown error:', error);
    }
}
```

### 5. Async Error Handling

```javascript
// Promises
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Fetch failed:', error));

// Async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // Re-throw if needed
    }
}

// Multiple async operations
async function loadMultiple() {
    try {
        const [users, posts] = await Promise.all([
            fetchUsers(),
            fetchPosts()
        ]);
        return { users, posts };
    } catch (error) {
        console.error('Failed to load data:', error);
        return null;
    }
}
```

## Code Examples

### Example 1: Input Validation

```javascript
function validateEmail(email) {
    if (typeof email !== 'string') {
        throw new TypeError('Email must be a string');
    }
    if (!email.includes('@')) {
        throw new ValidationError('Invalid email format');
    }
    return email.toLowerCase();
}

function processUserInput(input) {
    try {
        const email = validateEmail(input);
        console.log('Valid email:', email);
        return email;
    } catch (error) {
        if (error instanceof TypeError) {
            console.error('Type error:', error.message);
        } else if (error instanceof ValidationError) {
            console.error('Validation error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        return null;
    }
}
```

### Example 2: Safe JSON Parsing

```javascript
function safeJSONParse(jsonString, defaultValue = null) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('JSON parse error:', error.message);
        return defaultValue;
    }
}

// Usage
const data = safeJSONParse('{"name": "John"}', {});
const invalid = safeJSONParse('invalid json', { fallback: true });

// With validation
function parseAndValidate(jsonString, schema) {
    let data;

    try {
        data = JSON.parse(jsonString);
    } catch (error) {
        throw new Error('Invalid JSON: ' + error.message);
    }

    if (!validateSchema(data, schema)) {
        throw new ValidationError('Data does not match schema');
    }

    return data;
}
```

### Example 3: Resource Cleanup

```javascript
class DatabaseConnection {
    constructor() {
        this.connected = false;
    }

    connect() {
        console.log('Connecting to database...');
        this.connected = true;
    }

    query(sql) {
        if (!this.connected) {
            throw new Error('Not connected to database');
        }
        console.log('Executing:', sql);
        return [];
    }

    close() {
        console.log('Closing connection...');
        this.connected = false;
    }
}

function executeQuery(sql) {
    const db = new DatabaseConnection();

    try {
        db.connect();
        const results = db.query(sql);
        return results;
    } catch (error) {
        console.error('Query failed:', error);
        throw error;
    } finally {
        // Always cleanup, even if error occurs
        db.close();
    }
}
```

### Example 4: Error Boundary Pattern

```javascript
class ErrorBoundary {
    constructor(fallback) {
        this.fallback = fallback;
    }

    execute(fn) {
        try {
            return fn();
        } catch (error) {
            console.error('Caught error:', error);
            return this.fallback;
        }
    }

    async executeAsync(fn) {
        try {
            return await fn();
        } catch (error) {
            console.error('Caught async error:', error);
            return this.fallback;
        }
    }
}

// Usage
const boundary = new ErrorBoundary({ error: true, data: null });

const result = boundary.execute(() => {
    return riskyOperation();
});

const asyncResult = await boundary.executeAsync(async () => {
    return await fetchData();
});
```

## Practical Tasks

### Task 1: Create Safe Calculator
```javascript
class Calculator {
    divide(a, b) {
        // Handle division by zero
        // Validate input types
        // Return result or throw appropriate error
    }

    sqrt(n) {
        // Handle negative numbers
    }
}
```

### Task 2: Build Retry Logic
```javascript
async function retry(fn, maxAttempts = 3) {
    // Retry async function on failure
    // Throw error after max attempts
}
```

### Task 3: Implement Error Logger
```javascript
class ErrorLogger {
    log(error) {
        // Log error with timestamp
        // Categorize by error type
        // Store for later analysis
    }
}
```

## Best Practices

1. **Use specific error types**
2. **Provide meaningful error messages**
3. **Clean up resources in finally**
4. **Don't catch errors you can't handle**
5. **Re-throw after logging if needed**
6. **Use custom errors for domain logic**

```javascript
// Good
try {
    const data = await fetchData();
    processData(data);
} catch (error) {
    logger.error('Failed to process data:', error);
    throw error;  // Let caller handle
} finally {
    cleanup();
}

// Avoid swallowing errors
try {
    riskyOperation();
} catch (error) {
    // Bad - silent failure
}
```

## Interview Questions

### Question 1: What's the difference between throw and return?
**Answer:** `throw` stops execution and jumps to catch block; `return` normally exits function. Throw signals error condition; return signals success with value.

### Question 2: When does the finally block execute?
**Answer:** Always executes whether error thrown or not, before control leaves try-catch. Perfect for cleanup (closing connections, releasing resources).

### Question 3: What's the difference between Error and custom errors?
**Answer:** Custom errors extend Error class, adding specific properties/methods. They allow better error categorization and handling of different error types distinctly.

### Question 4: How do you handle errors in async/await?
**Answer:** Wrap await in try-catch block. Errors in async functions become rejected promises. Can also use `.catch()` on the returned promise.

### Question 5: What information does an Error object contain?
**Answer:** `name` (error type), `message` (description), `stack` (stack trace showing where error occurred). Custom errors can add more properties.

## Additional Resources

- [MDN - Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [MDN - Control Flow and Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [JavaScript.info - Error Handling](https://javascript.info/try-catch)
