# Functions in JavaScript

## Introduction

Functions are reusable blocks of code that perform specific tasks. They are fundamental to JavaScript programming, allowing you to organize code, avoid repetition, and create modular applications.

## Key Concepts

### 1. Function Declaration

The traditional way to define a function.

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("John"));  // "Hello, John!"

// Function with multiple parameters
function add(a, b) {
    return a + b;
}

console.log(add(5, 3));  // 8

// Function without parameters
function sayHello() {
    console.log("Hello, World!");
}

sayHello();  // "Hello, World!"

// Function without return (returns undefined)
function logMessage(message) {
    console.log(message);
    // No return statement
}

let result = logMessage("Hi");  // undefined
```

### 2. Function Expression

Assigning a function to a variable.

```javascript
const multiply = function(a, b) {
    return a * b;
};

console.log(multiply(4, 5));  // 20

// Named function expression (useful for debugging)
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};

console.log(factorial(5));  // 120
```

### 3. Arrow Functions (ES6)

Concise syntax for writing functions.

```javascript
// Basic syntax
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Concise syntax (implicit return, single parameter)
const square = x => x * x;

// Multiple parameters
const add = (a, b) => a + b;

// No parameters
const random = () => Math.random();

// Multiple statements (need braces)
const processUser = (user) => {
    const name = user.name.toUpperCase();
    const age = user.age + 1;
    return { name, age };
};

console.log(square(5));      // 25
console.log(add(3, 4));      // 7
console.log(random());       // Random number
```

### 4. Parameters and Arguments

```javascript
// Default parameters
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

console.log(greet());         // "Hello, Guest!"
console.log(greet("John"));   // "Hello, John!"

// Rest parameters (collect remaining arguments)
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15

// Combining regular and rest parameters
function introduce(firstName, lastName, ...hobbies) {
    console.log(`${firstName} ${lastName}`);
    console.log("Hobbies:", hobbies.join(", "));
}

introduce("John", "Doe", "reading", "gaming", "hiking");

// Arguments object (traditional functions only)
function showArguments() {
    console.log(arguments);  // Array-like object
    console.log(arguments.length);
}

showArguments(1, 2, 3);  // Shows all arguments
```

### 5. Return Statement

```javascript
// Simple return
function double(x) {
    return x * 2;
}

// Early return
function checkAge(age) {
    if (age < 0) {
        return "Invalid age";
    }
    if (age < 18) {
        return "Minor";
    }
    return "Adult";
}

// Returning objects
function createUser(name, age) {
    return {
        name: name,
        age: age,
        isAdult: age >= 18
    };
}

// Returning arrays
function getCoordinates() {
    return [10, 20];
}

const [x, y] = getCoordinates();
```

### 6. Function Scope

```javascript
// Global scope
const globalVar = "I'm global";

function outer() {
    // Function scope
    const outerVar = "I'm in outer";

    function inner() {
        // Nested function scope
        const innerVar = "I'm in inner";
        console.log(globalVar);  // Accessible
        console.log(outerVar);   // Accessible
        console.log(innerVar);   // Accessible
    }

    inner();
    // console.log(innerVar);  // Error - not accessible
}

outer();
// console.log(outerVar);  // Error - not accessible

// Block scope with let/const
function testScope() {
    if (true) {
        let blockVar = "block scoped";
        const blockConst = "also block scoped";
        var functionVar = "function scoped";
    }

    // console.log(blockVar);    // Error
    // console.log(blockConst);  // Error
    console.log(functionVar);    // Works
}
```

### 7. Higher-Order Functions

Functions that take other functions as arguments or return functions.

```javascript
// Function as argument
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(3, console.log);  // Logs 0, 1, 2

// Returning a function
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Practical example: event handlers
function createGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeting("Hello");
const sayHi = createGreeting("Hi");

console.log(sayHello("John"));  // "Hello, John!"
console.log(sayHi("Jane"));     // "Hi, Jane!"
```

### 8. Immediately Invoked Function Expression (IIFE)

```javascript
// Basic IIFE
(function() {
    console.log("I run immediately!");
})();

// IIFE with parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})("John");

// IIFE with arrow function
(() => {
    console.log("Arrow IIFE");
})();

// Returning values from IIFE
const result = (function() {
    return "IIFE result";
})();

console.log(result);  // "IIFE result"

// Using IIFE for private variables
const counter = (function() {
    let count = 0;  // Private variable

    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
})();

console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getCount());   // 2
```

## Code Examples

### Example 1: Temperature Converter

```javascript
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function convertTemperature(value, unit) {
    if (unit === "C") {
        return `${value}°C = ${celsiusToFahrenheit(value).toFixed(2)}°F`;
    } else if (unit === "F") {
        return `${value}°F = ${fahrenheitToCelsius(value).toFixed(2)}°C`;
    }
    return "Invalid unit";
}

console.log(convertTemperature(0, "C"));    // "0°C = 32.00°F"
console.log(convertTemperature(32, "F"));   // "32°F = 0.00°C"
console.log(convertTemperature(100, "C"));  // "100°C = 212.00°F"
```

### Example 2: Array Processing Functions

```javascript
// Filter function
function filterEvenNumbers(numbers) {
    return numbers.filter(num => num % 2 === 0);
}

// Map function
function doubleNumbers(numbers) {
    return numbers.map(num => num * 2);
}

// Reduce function
function sumNumbers(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

// Combining functions
function processNumbers(numbers) {
    const evens = filterEvenNumbers(numbers);
    const doubled = doubleNumbers(evens);
    const sum = sumNumbers(doubled);
    return sum;
}

const nums = [1, 2, 3, 4, 5, 6];
console.log(processNumbers(nums));  // 24 (2+4+6 doubled = 4+8+12)
```

### Example 3: Validation Functions

```javascript
const validator = {
    isEmail: function(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    },

    isPhoneNumber: function(phone) {
        const pattern = /^\d{3}-\d{3}-\d{4}$/;
        return pattern.test(phone);
    },

    isStrongPassword: function(password) {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /[0-9]/.test(password);
    },

    validateUser: function(user) {
        const errors = [];

        if (!this.isEmail(user.email)) {
            errors.push("Invalid email");
        }
        if (!this.isPhoneNumber(user.phone)) {
            errors.push("Invalid phone number");
        }
        if (!this.isStrongPassword(user.password)) {
            errors.push("Weak password");
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};

const user = {
    email: "test@example.com",
    phone: "123-456-7890",
    password: "Pass123"
};

console.log(validator.validateUser(user));
```

### Example 4: Recursive Functions

```javascript
// Factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5));  // 120

// Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7));  // 13

// Countdown
function countdown(num) {
    if (num <= 0) {
        console.log("Done!");
        return;
    }
    console.log(num);
    countdown(num - 1);
}

countdown(5);  // 5, 4, 3, 2, 1, Done!

// Sum of array (recursive)
function sumArray(arr) {
    if (arr.length === 0) return 0;
    return arr[0] + sumArray(arr.slice(1));
}

console.log(sumArray([1, 2, 3, 4, 5]));  // 15
```

### Example 5: Callback Functions

```javascript
// Async simulation
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "John" };
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log("Received:", data);
});

// Array processing with callbacks
function processArray(arr, callback) {
    const result = [];
    for (let item of arr) {
        result.push(callback(item));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];
const squared = processArray(numbers, x => x * x);
console.log(squared);  // [1, 4, 9, 16, 25]

// Custom forEach
function customForEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i, arr);
    }
}

customForEach([1, 2, 3], (value, index) => {
    console.log(`Index ${index}: ${value}`);
});
```

## Practical Tasks

### Task 1: Calculator Functions
Create a calculator with multiple operations.

```javascript
const calculator = {
    add: function(a, b) {
        // Your code here
    },
    subtract: function(a, b) {
        // Your code here
    },
    multiply: function(a, b) {
        // Your code here
    },
    divide: function(a, b) {
        // Your code here (handle division by zero)
    },
    power: function(base, exponent) {
        // Your code here
    }
};

// Test cases
console.log(calculator.add(5, 3));       // 8
console.log(calculator.divide(10, 2));   // 5
console.log(calculator.power(2, 3));     // 8
```

### Task 2: Array Utilities
Create utility functions for arrays.

```javascript
function findMax(arr) {
    // Return the maximum value in the array
}

function findMin(arr) {
    // Return the minimum value in the array
}

function average(arr) {
    // Return the average of all numbers
}

function removeDuplicates(arr) {
    // Return array with duplicates removed
}

// Test cases
console.log(findMax([1, 5, 3, 9, 2]));          // 9
console.log(average([1, 2, 3, 4, 5]));          // 3
console.log(removeDuplicates([1, 2, 2, 3, 3])); // [1, 2, 3]
```

### Task 3: String Formatter
Create string formatting functions.

```javascript
function capitalize(str) {
    // Capitalize first letter of each word
}

function reverseString(str) {
    // Reverse the string
}

function isPalindrome(str) {
    // Check if string is palindrome (reads same forwards/backwards)
}

// Test cases
console.log(capitalize("hello world"));     // "Hello World"
console.log(reverseString("hello"));        // "olleh"
console.log(isPalindrome("racecar"));       // true
console.log(isPalindrome("hello"));         // false
```

### Task 4: Function Composition
Create a function that composes multiple functions.

```javascript
function compose(...functions) {
    // Return a function that applies all functions right to left
    // compose(f, g, h)(x) should equal f(g(h(x)))
}

// Test
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composed = compose(addOne, double, square);
console.log(composed(2));  // 9 (square(2)=4, double(4)=8, addOne(8)=9)
```

## Best Practices

1. **Use descriptive function names** - verbs that describe what the function does
2. **Keep functions small and focused** - one function, one purpose
3. **Use default parameters** instead of checking for undefined
4. **Prefer arrow functions** for short, simple functions
5. **Use regular functions** when you need `this` or `arguments`
6. **Return early** to avoid deep nesting
7. **Avoid side effects** when possible (pure functions)
8. **Document complex functions** with comments

```javascript
// Good practices
function calculateDiscount(price, discountPercent = 0) {
    if (price < 0) return 0;
    return price * (1 - discountPercent / 100);
}

// Pure function - no side effects
function add(a, b) {
    return a + b;
}

// Descriptive names
function validateEmail(email) { /* ... */ }
function sendNotification(user) { /* ... */ }
```

## Common Pitfalls

1. **Forgetting to return a value**
   ```javascript
   function add(a, b) {
       a + b;  // Missing return!
   }
   ```

2. **Arrow function `this` binding**
   ```javascript
   const obj = {
       value: 10,
       arrow: () => console.log(this.value),    // undefined
       regular: function() { console.log(this.value); }  // 10
   };
   ```

3. **Modifying parameters (side effects)**
   ```javascript
   // Bad
   function sortArray(arr) {
       return arr.sort();  // Modifies original array!
   }

   // Good
   function sortArray(arr) {
       return [...arr].sort();  // Sorts a copy
   }
   ```

4. **Not handling edge cases**
   ```javascript
   // Bad
   function divide(a, b) {
       return a / b;  // What if b is 0?
   }

   // Good
   function divide(a, b) {
       if (b === 0) return "Cannot divide by zero";
       return a / b;
   }
   ```

## Interview Questions

### Question 1: What's the difference between function declarations and function expressions?
**Answer:**
- **Function declarations** are hoisted completely, can be called before definition
- **Function expressions** are not hoisted, cannot be called before assignment
- Function declarations: `function name() {}`
- Function expressions: `const name = function() {}`
- Arrow functions are always expressions

### Question 2: What are arrow functions and how do they differ from regular functions?
**Answer:**
- Arrow functions have concise syntax: `(params) => expression`
- They don't have their own `this` - inherit from parent scope
- No `arguments` object - use rest parameters instead
- Cannot be used as constructors (no `new`)
- Implicit return for single expressions
- Best for callbacks and short functions

### Question 3: What is a higher-order function?
**Answer:** A higher-order function is a function that either:
1. Takes one or more functions as arguments, or
2. Returns a function as its result

Examples: `map`, `filter`, `reduce`, event handlers. They enable functional programming patterns and code reusability.

### Question 4: Explain function scope and closure.
**Answer:** Function scope means variables declared inside a function are only accessible within that function. A closure is when an inner function has access to outer function's variables even after the outer function has returned. Closures are created every time a function is created and are useful for data privacy and creating function factories.

### Question 5: What are pure functions and why are they important?
**Answer:** Pure functions:
1. Always return the same output for the same input
2. Have no side effects (don't modify external state)

Benefits: easier to test, predictable behavior, can be cached (memoization), enable functional programming. Example: `add(2, 3)` always returns 5 and doesn't modify anything.

## Additional Resources

- [MDN - Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN - Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [JavaScript.info - Functions](https://javascript.info/function-basics)
- [You Don't Know JS - Scope & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures)
