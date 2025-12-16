# Arrow Functions in JavaScript

## Introduction

Arrow functions are a concise syntax for writing function expressions introduced in ES6. They provide cleaner syntax and have different behavior with the `this` keyword.

## Key Concepts

### 1. Basic Syntax

```javascript
// Traditional function
const add = function(a, b) {
    return a + b;
};

// Arrow function
const addArrow = (a, b) => {
    return a + b;
};

// Concise arrow function (implicit return)
const addConcise = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;
const squareExplicit = (x) => x * x;  // Also valid

// No parameters (parentheses required)
const greet = () => "Hello!";
const random = () => Math.random();

// Multiple statements (need braces and explicit return)
const processUser = (name, age) => {
    const upperName = name.toUpperCase();
    const info = `${upperName} is ${age} years old`;
    return info;
};
```

### 2. Implicit vs Explicit Return

```javascript
// Implicit return (single expression, no braces)
const double = n => n * 2;
const isEven = n => n % 2 === 0;

// Returning object (wrap in parentheses)
const makeUser = (name, age) => ({ name, age });
// Without parentheses, braces are seen as function body
// const makeUser = (name, age) => { name, age };  // Wrong!

// Explicit return (multiple statements, need braces)
const calculatePrice = (price, tax) => {
    const taxAmount = price * tax;
    const total = price + taxAmount;
    return total;
};

// Multi-line for readability (still implicit return)
const longCalculation = (a, b, c) => (
    a * b * c +
    a + b + c
);
```

### 3. Arrow Functions vs Regular Functions

```javascript
// 1. No `this` binding - inherits from parent scope
const person = {
    name: "John",

    regularFunc: function() {
        console.log(this.name);  // "John"
    },

    arrowFunc: () => {
        console.log(this.name);  // undefined (inherits from global)
    },

    nestedExample: function() {
        // Regular function in callback
        setTimeout(function() {
            console.log(this.name);  // undefined
        }, 100);

        // Arrow function in callback
        setTimeout(() => {
            console.log(this.name);  // "John" (inherits from nestedExample)
        }, 100);
    }
};

// 2. No `arguments` object
function regularFunc() {
    console.log(arguments);  // Available
}

const arrowFunc = () => {
    console.log(arguments);  // ReferenceError
};

// Use rest parameters instead
const arrowWithArgs = (...args) => {
    console.log(args);  // Array of arguments
};

// 3. Cannot be used as constructors
function RegularFunc() {
    this.value = 42;
}
const instance = new RegularFunc();  // Works

const ArrowFunc = () => {
    this.value = 42;
};
// const instance = new ArrowFunc();  // TypeError

// 4. No prototype property
console.log(RegularFunc.prototype);  // { constructor: ... }
console.log(ArrowFunc.prototype);    // undefined
```

### 4. Use Cases for Arrow Functions

```javascript
// 1. Array methods
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

// 2. Callbacks
setTimeout(() => console.log("Hello"), 1000);

button.addEventListener('click', (e) => {
    console.log('Clicked!', e.target);
});

// 3. Promise chains
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// 4. Higher-order functions
const multiply = factor => number => number * factor;
const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// 5. Sorting and comparing
const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

users.sort((a, b) => a.age - b.age);
```

### 5. When NOT to Use Arrow Functions

```javascript
// 1. Object methods (need `this`)
const calculator = {
    value: 0,

    // Don't use arrow function
    add: (n) => {
        this.value += n;  // `this` doesn't refer to calculator
        return this;
    },

    // Use regular function
    subtract: function(n) {
        this.value -= n;  // `this` refers to calculator
        return this;
    }
};

// 2. Event handlers needing `this`
button.addEventListener('click', function() {
    this.classList.toggle('active');  // `this` is the button
});

// Arrow function won't work the same way
button.addEventListener('click', () => {
    this.classList.toggle('active');  // `this` is not the button
});

// 3. Constructors
// Arrow functions cannot be constructors

// 4. When you need `arguments` object
function sumAll() {
    return Array.from(arguments).reduce((sum, n) => sum + n, 0);
}

// With arrow function, use rest parameters
const sumAllArrow = (...numbers) => {
    return numbers.reduce((sum, n) => sum + n, 0);
};
```

## Code Examples

### Example 1: Array Transformations

```javascript
const products = [
    { name: "Laptop", price: 1000, category: "electronics" },
    { name: "Phone", price: 500, category: "electronics" },
    { name: "Shirt", price: 30, category: "clothing" }
];

// Get product names
const names = products.map(p => p.name);

// Filter expensive items
const expensive = products.filter(p => p.price > 100);

// Calculate total
const total = products.reduce((sum, p) => sum + p.price, 0);

// Check if any electronics
const hasElectronics = products.some(p => p.category === "electronics");

// Check if all are affordable
const allAffordable = products.every(p => p.price < 2000);

// Complex transformation
const formatted = products
    .filter(p => p.category === "electronics")
    .map(p => ({ ...p, price: p.price * 0.9 }))
    .map(p => `${p.name}: $${p.price}`);
```

### Example 2: Currying and Partial Application

```javascript
// Currying with arrow functions
const add = a => b => a + b;
const add5 = add(5);
console.log(add5(3));  // 8

// Practical example: configuration
const createLogger = prefix => message => {
    console.log(`[${prefix}] ${message}`);
};

const errorLogger = createLogger('ERROR');
const infoLogger = createLogger('INFO');

errorLogger('Something went wrong');  // [ERROR] Something went wrong
infoLogger('Process complete');       // [INFO] Process complete

// Partial application
const multiply = (a, b, c) => a * b * c;
const multiplyByTwo = b => c => multiply(2, b, c);

console.log(multiplyByTwo(3)(4));  // 24
```

### Example 3: Lexical `this` Benefits

```javascript
class Counter {
    constructor() {
        this.count = 0;
    }

    // Regular function approach (need bind)
    startWithRegular() {
        setInterval(function() {
            this.count++;  // `this` is undefined
            console.log(this.count);
        }.bind(this), 1000);
    }

    // Arrow function approach (cleaner)
    startWithArrow() {
        setInterval(() => {
            this.count++;  // `this` refers to Counter instance
            console.log(this.count);
        }, 1000);
    }

    // Event handler example
    setupButton() {
        const button = document.querySelector('button');

        // Arrow function maintains `this` context
        button.addEventListener('click', () => {
            this.count++;
            console.log(this.count);
        });
    }
}
```

### Example 4: Pipeline Functions

```javascript
// Composing functions with arrows
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const transform = pipe(addOne, double, square);
console.log(transform(2));  // ((2 + 1) * 2) ^ 2 = 36

// Data processing pipeline
const processUsers = pipe(
    users => users.filter(u => u.active),
    users => users.map(u => ({ ...u, name: u.name.toUpperCase() })),
    users => users.sort((a, b) => a.name.localeCompare(b.name))
);
```

## Practical Tasks

### Task 1: Rewrite to Arrow Functions
```javascript
// Convert these to arrow functions
function double(x) {
    return x * 2;
}

function greet(name) {
    return "Hello, " + name;
}

function sum(a, b, c) {
    return a + b + c;
}
```

### Task 2: Create Function Chain
```javascript
// Create a chain of arrow functions that:
// 1. Takes an array of numbers
// 2. Filters out numbers less than 5
// 3. Doubles each remaining number
// 4. Returns the sum
```

### Task 3: Build a Validator
```javascript
// Create validation functions using arrows
const isEmail = // check if valid email
const isPhone = // check if valid phone
const isStrong = // check if strong password

const validate = (value, ...validators) => // run all validators
```

### Task 4: Implement Debounce
```javascript
const debounce = (fn, delay) => {
    // Return debounced version of fn using arrow functions
};
```

## Best Practices

1. **Use arrow functions for callbacks and array methods**
2. **Use regular functions for object methods**
3. **Use concise syntax when appropriate**
4. **Wrap object returns in parentheses**
5. **Use rest parameters instead of `arguments`**
6. **Consider readability - don't over-concise**

```javascript
// Good
const double = x => x * 2;
const users = data.map(u => ({ id: u.id, name: u.name }));

// Avoid over-concision
const complex = x => y => z => x + y + z;  // Hard to read
// Better:
const add = x => {
    return y => {
        return z => x + y + z;
    };
};
```

## Common Pitfalls

1. **Returning objects without parentheses**
2. **Using arrow functions as methods**
3. **Expecting `this` to work like regular functions**
4. **Forgetting arrow functions can't be constructors**

```javascript
// Pitfall: Object return
const makeObj = (x) => { x: x };  // Wrong! Returns undefined
const makeObj = (x) => ({ x: x }); // Correct

// Pitfall: Method definition
const obj = {
    value: 10,
    getValue: () => this.value  // Wrong! `this` is not obj
};
```

## Interview Questions

### Question 1: What are the main differences between arrow and regular functions?
**Answer:** Arrow functions: (1) lexical `this` binding, (2) no `arguments` object, (3) can't be used as constructors, (4) no `prototype` property, (5) more concise syntax.

### Question 2: When should you NOT use arrow functions?
**Answer:** Don't use for: (1) object methods needing `this`, (2) event handlers needing `this` reference to element, (3) constructors, (4) when you need `arguments` object.

### Question 3: What is lexical `this` binding?
**Answer:** Arrow functions don't have their own `this`; they inherit `this` from the parent scope where they're defined. This makes them ideal for callbacks in object methods.

### Question 4: How do you return an object from an arrow function?
**Answer:** Wrap the object in parentheses: `(x) => ({ key: x })`. Without parentheses, braces are interpreted as function body.

### Question 5: Can arrow functions be used with `new`?
**Answer:** No, arrow functions cannot be used as constructors. Attempting to use `new` with an arrow function throws a TypeError.

## Additional Resources

- [MDN - Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [JavaScript.info - Arrow Functions](https://javascript.info/arrow-functions-basics)
