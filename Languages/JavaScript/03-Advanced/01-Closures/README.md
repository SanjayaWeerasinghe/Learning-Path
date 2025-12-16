# Closures in JavaScript

## Introduction

A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned. Closures are a fundamental concept in JavaScript.

## Key Concepts

### 1. Basic Closure

```javascript
function outer() {
    const message = 'Hello';

    function inner() {
        console.log(message);  // Accesses outer variable
    }

    return inner;
}

const myFunc = outer();
myFunc();  // "Hello" - closure maintains access to message
```

### 2. Lexical Scope

```javascript
const globalVar = 'global';

function outer() {
    const outerVar = 'outer';

    function inner() {
        const innerVar = 'inner';
        console.log(globalVar, outerVar, innerVar);
    }

    inner();  // Can access all three
}

outer();  // "global outer inner"
```

### 3. Data Privacy

```javascript
function createCounter() {
    let count = 0;  // Private variable

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getCount());   // 2
// console.log(counter.count);     // undefined - private!
```

## Code Examples

### Example 1: Module Pattern

```javascript
const calculator = (function() {
    let result = 0;

    return {
        add(n) {
            result += n;
            return this;
        },
        subtract(n) {
            result -= n;
            return this;
        },
        getResult() {
            return result;
        },
        reset() {
            result = 0;
            return this;
        }
    };
})();

calculator.add(10).subtract(3);
console.log(calculator.getResult());  // 7
```

### Example 2: Function Factory

```javascript
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

### Example 3: Event Handlers

```javascript
function setupButtons() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Closure preserves index for each button
            console.log(`Button ${index} clicked`);
        });
    });
}
```

## Practical Tasks

### Task 1: Create Bank Account
```javascript
function createAccount(initialBalance) {
    // Private balance variable
    // Return deposit, withdraw, getBalance methods
}
```

### Task 2: Implement Memoization
```javascript
function memoize(fn) {
    // Cache function results
    // Use closure to maintain cache
}
```

### Task 3: Build Rate Limiter
```javascript
function rateLimit(fn, limit, interval) {
    // Limit function calls using closure
}
```

## Interview Questions

### Question 1: What is a closure?
**Answer:** A closure is a function that retains access to variables from its outer scope even after the outer function has returned. Created every time a function is created.

### Question 2: Why are closures useful?
**Answer:** (1) Data privacy/encapsulation, (2) creating function factories, (3) maintaining state in async code, (4) module pattern, (5) partial application and currying.

### Question 3: What's a common pitfall with closures in loops?
**Answer:** Using `var` in loops creates only one binding. Use `let` for block scope or IIFE to create new closure for each iteration.

### Question 4: How do closures affect memory?
**Answer:** Closures keep outer variables in memory. Can cause memory leaks if large objects are retained unnecessarily. Be mindful of what's captured.

### Question 5: What's the difference between closure and scope?
**Answer:** Scope determines variable access at write time; closure is when a function remembers and accesses variables from its lexical scope even when executed outside that scope.

## Additional Resources

- [MDN - Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [JavaScript.info - Closures](https://javascript.info/closure)
