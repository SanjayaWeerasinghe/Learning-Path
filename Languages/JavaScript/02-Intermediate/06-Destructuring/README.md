# Destructuring in JavaScript

## Introduction

Destructuring is an ES6 feature that allows you to extract values from arrays or properties from objects into distinct variables using a concise syntax.

## Key Concepts

### 1. Array Destructuring

```javascript
// Basic array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first);   // 'red'
console.log(second);  // 'green'

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary);   // 'red'
console.log(tertiary);  // 'blue'

// Rest operator
const numbers = [1, 2, 3, 4, 5];
const [one, two, ...rest] = numbers;
console.log(one);   // 1
console.log(two);   // 2
console.log(rest);  // [3, 4, 5]

// Default values
const [a = 1, b = 2, c = 3] = [10];
console.log(a, b, c);  // 10, 2, 3

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);  // 2, 1
```

### 2. Object Destructuring

```javascript
// Basic object destructuring
const person = { name: 'John', age: 30, city: 'NYC' };
const { name, age, city } = person;
console.log(name);  // 'John'
console.log(age);   // 30

// Rename variables
const { name: fullName, age: years } = person;
console.log(fullName);  // 'John'
console.log(years);     // 30

// Default values
const { name, country = 'USA' } = person;
console.log(country);  // 'USA'

// Rest operator
const { name, ...details } = person;
console.log(details);  // { age: 30, city: 'NYC' }

// Nested destructuring
const user = {
    id: 1,
    name: 'John',
    address: {
        city: 'NYC',
        zip: '10001'
    }
};

const { address: { city, zip } } = user;
console.log(city);  // 'NYC'
console.log(zip);   // '10001'
```

### 3. Function Parameter Destructuring

```javascript
// Array parameters
function printColors([first, second]) {
    console.log(`Primary: ${first}, Secondary: ${second}`);
}
printColors(['red', 'blue']);

// Object parameters
function greetUser({ name, age }) {
    return `Hello ${name}, you are ${age} years old`;
}
greetUser({ name: 'John', age: 30 });

// With defaults
function createUser({ name = 'Guest', role = 'user' } = {}) {
    return { name, role };
}
console.log(createUser());  // { name: 'Guest', role: 'user' }
console.log(createUser({ name: 'John' }));  // { name: 'John', role: 'user' }

// Rest in parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4));  // 10
```

## Code Examples

### Example 1: Practical Destructuring

```javascript
// API response handling
const response = {
    status: 200,
    data: {
        user: {
            id: 1,
            name: 'John',
            email: 'john@example.com'
        },
        posts: [1, 2, 3]
    }
};

const {
    status,
    data: {
        user: { name, email },
        posts
    }
} = response;

console.log(status, name, email, posts);

// Function return values
function getCoordinates() {
    return [40.7128, -74.0060];
}

const [latitude, longitude] = getCoordinates();

// Multiple return values
function getUserInfo() {
    return {
        user: { name: 'John', age: 30 },
        settings: { theme: 'dark' }
    };
}

const { user, settings } = getUserInfo();
```

### Example 2: Swapping and Transforming

```javascript
// Swap without temp variable
let a = 1, b = 2;
[a, b] = [b, a];

// Array to object
const [name, age, city] = ['John', 30, 'NYC'];
const person = { name, age, city };

// Object to array
const user = { id: 1, name: 'John', age: 30 };
const entries = Object.entries(user);
const [[key1, val1], [key2, val2]] = entries;
```

### Example 3: Configuration Objects

```javascript
function createServer({
    port = 3000,
    host = 'localhost',
    ssl = false,
    timeout = 30000
} = {}) {
    console.log(`Server: ${host}:${port}`);
    console.log(`SSL: ${ssl}, Timeout: ${timeout}ms`);
}

createServer({ port: 8080, ssl: true });
createServer();  // Uses all defaults
```

## Practical Tasks

### Task 1: Extract User Data
```javascript
const userData = {
    id: 1,
    profile: {
        firstName: 'John',
        lastName: 'Doe',
        contact: {
            email: 'john@example.com',
            phone: '555-0100'
        }
    }
};

// Extract firstName, lastName, and email using destructuring
```

### Task 2: Array Manipulation
```javascript
// Given array [1,2,3,4,5], use destructuring to:
// - Get first element as 'first'
// - Get last element as 'last'
// - Get middle elements as 'middle' array
```

### Task 3: Function with Options
```javascript
// Create a function that accepts options object with:
// - Required: url
// - Optional: method (default 'GET'), timeout (default 5000)
// Use destructuring in parameters
```

## Best Practices

1. **Use object destructuring for named parameters**
2. **Provide default values for optional properties**
3. **Keep destructuring shallow for readability**
4. **Use rest operator for remaining properties**

## Interview Questions

### Question 1: What is destructuring?
**Answer:** Destructuring is a syntax for extracting values from arrays or objects into separate variables. It provides a concise way to unpack values.

### Question 2: How do you swap variables using destructuring?
**Answer:** `[a, b] = [b, a]` - creates a temporary array with swapped values and destructures it back into the variables.

### Question 3: What's the difference between rest and spread operators?
**Answer:** Rest gathers remaining elements into an array (`...rest`); spread expands an array/object into individual elements (`...array`). Same syntax, opposite purposes.

### Question 4: How do you set default values in destructuring?
**Answer:** Use `=` operator: `const {name = 'Guest'} = obj` or `const [x = 0] = arr`. Default is used if value is undefined.

### Question 5: Can you destructure nested objects?
**Answer:** Yes: `const {user: {name}} = data` extracts `name` from nested `user` object. Can chain multiple levels.

## Additional Resources

- [MDN - Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [JavaScript.info - Destructuring](https://javascript.info/destructuring-assignment)
