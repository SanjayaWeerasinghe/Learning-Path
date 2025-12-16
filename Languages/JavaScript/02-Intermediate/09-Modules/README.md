# ES6 Modules in JavaScript

## Introduction

ES6 modules provide a standardized way to organize and share code between files. They support named and default exports/imports for better code organization.

## Key Concepts

### 1. Exporting

```javascript
// Named exports - utils.js
export const PI = 3.14159;
export function add(a, b) {
    return a + b;
}
export class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

// Export after declaration
function subtract(a, b) {
    return a - b;
}
export { subtract };

// Export with rename
function divide(a, b) {
    return a / b;
}
export { divide as div };

// Default export (one per file)
export default function greet(name) {
    return `Hello, ${name}!`;
}

// or
const greeting = (name) => `Hello, ${name}!`;
export default greeting;
```

### 2. Importing

```javascript
// Named imports
import { add, subtract } from './utils.js';
import { div as division } from './utils.js';

// Import all as namespace
import * as utils from './utils.js';
utils.add(5, 3);

// Default import
import greet from './utils.js';

// Mixed imports
import greet, { add, subtract } from './utils.js';

// Import for side effects only
import './styles.css';
import './init.js';

// Dynamic imports
const module = await import('./module.js');
// or with promises
import('./module.js').then(module => {
    module.doSomething();
});
```

### 3. Module Patterns

```javascript
// config.js - Configuration module
export const config = {
    API_URL: 'https://api.example.com',
    TIMEOUT: 5000,
    MAX_RETRIES: 3
};

// logger.js - Utility module
export function log(message) {
    console.log(`[LOG] ${message}`);
}

export function error(message) {
    console.error(`[ERROR] ${message}`);
}

// user.js - Class module
export default class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    greet() {
        return `Hello, I'm ${this.name}`;
    }
}

// Using modules
import { config } from './config.js';
import { log, error } from './logger.js';
import User from './user.js';

log(config.API_URL);
const user = new User('John', 'john@example.com');
```

## Code Examples

### Example 1: Math Utilities Module

```javascript
// math.js
export const PI = 3.14159;

export function square(x) {
    return x * x;
}

export function cube(x) {
    return x * x * x;
}

export function average(...numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum / numbers.length;
}

export default {
    square,
    cube,
    average,
    PI
};

// main.js
import math, { square, PI } from './math.js';

console.log(square(5));      // 25
console.log(math.cube(3));   // 27
console.log(math.PI);        // 3.14159
```

### Example 2: API Module

```javascript
// api.js
const BASE_URL = 'https://api.example.com';

async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const response = await fetch(url, options);
    return response.json();
}

export async function getUsers() {
    return request('/users');
}

export async function getUser(id) {
    return request(`/users/${id}`);
}

export async function createUser(data) {
    return request('/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
}

// app.js
import { getUsers, createUser } from './api.js';

const users = await getUsers();
const newUser = await createUser({ name: 'John' });
```

### Example 3: Component System

```javascript
// components/Button.js
export default class Button {
    constructor(label) {
        this.label = label;
    }

    render() {
        return `<button>${this.label}</button>`;
    }
}

// components/Input.js
export default class Input {
    constructor(placeholder) {
        this.placeholder = placeholder;
    }

    render() {
        return `<input placeholder="${this.placeholder}">`;
    }
}

// components/index.js (barrel export)
export { default as Button } from './Button.js';
export { default as Input } from './Input.js';

// app.js
import { Button, Input } from './components/index.js';

const btn = new Button('Click me');
const input = new Input('Enter name');
```

## Practical Tasks

### Task 1: Create Validation Module
```javascript
// validators.js
// Export functions: isEmail, isPhone, isURL
// Include a default export object with all validators
```

### Task 2: Build State Manager
```javascript
// state.js
// Create module with:
// - getState() - returns current state
// - setState(newState) - updates state
// - subscribe(callback) - listen to changes
```

### Task 3: Create Theme Module
```javascript
// themes.js
// Export light and dark themes
// Export function to apply theme
// Default export: current theme manager
```

## Best Practices

1. **One module per file** for clarity
2. **Use named exports** for multiple items
3. **Use default export** for primary export
4. **Create index.js** for barrel exports
5. **Use absolute paths** with bundlers
6. **Keep modules focused** (single responsibility)

```javascript
// Good structure
// utils/
//   string.js
//   array.js
//   index.js

// utils/index.js (barrel export)
export * from './string.js';
export * from './array.js';

// Usage
import { capitalize, unique } from './utils';
```

## Common Pitfalls

1. **Forgetting .js extension** in Node.js
2. **Circular dependencies** between modules
3. **Mixing CommonJS and ES6** syntax
4. **Not using type="module"** in HTML

```javascript
// Wrong - mixing syntaxes
import { something } from './module.js';
module.exports = { other };

// Right - use one system
export { something, other };
```

## Interview Questions

### Question 1: What's the difference between named and default exports?
**Answer:** Named exports allow multiple exports per file with specific names; default export is one per file and can be imported with any name. Use named for utilities, default for main class/function.

### Question 2: What are the benefits of ES6 modules?
**Answer:** (1) Static analysis for tree-shaking, (2) better dependency management, (3) explicit imports/exports, (4) native browser support, (5) helps avoid global namespace pollution.

### Question 3: How do modules differ from scripts?
**Answer:** Modules: (1) have their own scope, (2) use strict mode by default, (3) import/export syntax, (4) async loading, (5) executed once. Scripts run in global scope.

### Question 4: What is tree-shaking?
**Answer:** Dead code elimination during bundling. Only imports actually used are included in the final bundle, reducing bundle size. Works with ES6 modules' static structure.

### Question 5: Can you dynamically import modules?
**Answer:** Yes, using `import()` function returning a promise: `import('./module.js').then(...)` or `await import('./module.js')`. Useful for code-splitting and lazy loading.

## Additional Resources

- [MDN - Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript.info - Modules](https://javascript.info/modules-intro)
