# Variables in JavaScript

## Introduction

Variables are containers for storing data values. In JavaScript, we have three ways to declare variables: `var`, `let`, and `const`. Understanding the differences between them is crucial for writing clean and bug-free code.

## Key Concepts

### 1. Variable Declaration Methods

#### var (Old Way - ES5)
- Function-scoped or globally-scoped
- Can be redeclared and updated
- Hoisted to the top of their scope
- Creates a property on the global object (window in browsers)

```javascript
var name = "John";
var name = "Jane"; // Allowed - redeclaration
name = "Bob";      // Allowed - update
```

#### let (Modern - ES6)
- Block-scoped
- Cannot be redeclared in the same scope
- Can be updated
- Not hoisted (temporal dead zone)

```javascript
let age = 25;
// let age = 30; // Error - cannot redeclare
age = 30;        // Allowed - update
```

#### const (Modern - ES6)
- Block-scoped
- Cannot be redeclared or updated
- Must be initialized at declaration
- For objects/arrays, the reference is constant but contents can be modified

```javascript
const PI = 3.14159;
// PI = 3.14; // Error - cannot reassign

const person = { name: "John" };
person.name = "Jane"; // Allowed - modifying object properties
// person = {};       // Error - cannot reassign the reference
```

### 2. Variable Scope

#### Global Scope
Variables declared outside any function or block.

```javascript
var globalVar = "I'm global";
let globalLet = "I'm also global";

function test() {
    console.log(globalVar); // Accessible
    console.log(globalLet); // Accessible
}
```

#### Function Scope
Variables declared inside a function are only accessible within that function.

```javascript
function myFunction() {
    var functionVar = "I'm function-scoped";
    let functionLet = "I'm also function-scoped";

    console.log(functionVar); // Works
    console.log(functionLet); // Works
}

// console.log(functionVar); // Error - not accessible outside
```

#### Block Scope
Variables declared with `let` and `const` inside a block `{}` are only accessible within that block.

```javascript
if (true) {
    var varVariable = "var is function-scoped";
    let letVariable = "let is block-scoped";
    const constVariable = "const is block-scoped";
}

console.log(varVariable);  // Works - var ignores block scope
// console.log(letVariable);   // Error - not accessible
// console.log(constVariable); // Error - not accessible
```

### 3. Hoisting

Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution.

```javascript
// var hoisting
console.log(x); // undefined (declaration hoisted, not initialization)
var x = 5;
console.log(x); // 5

// let/const hoisting (temporal dead zone)
// console.log(y); // ReferenceError - cannot access before initialization
let y = 10;

// Function hoisting
greet(); // Works - function declarations are fully hoisted
function greet() {
    console.log("Hello!");
}
```

### 4. Variable Naming Rules

```javascript
// Valid variable names
let firstName = "John";
let first_name = "John";
let _private = "secret";
let $jquery = "selector";
let age2 = 25;
let CONSTANT_VALUE = 100;

// Invalid variable names
// let 2age = 25;      // Cannot start with number
// let first-name = "John"; // Hyphens not allowed
// let class = "ES6";  // Reserved keyword
```

## Code Examples

### Example 1: Understanding Scope

```javascript
function demonstrateScope() {
    if (true) {
        var varScoped = "var";
        let letScoped = "let";
        const constScoped = "const";
    }

    console.log(varScoped);  // "var" - accessible (function-scoped)
    // console.log(letScoped);   // Error - not accessible (block-scoped)
    // console.log(constScoped); // Error - not accessible (block-scoped)
}

demonstrateScope();
```

### Example 2: const with Objects

```javascript
const person = {
    name: "John",
    age: 30
};

// This works - modifying properties
person.name = "Jane";
person.age = 31;
console.log(person); // { name: "Jane", age: 31 }

// This doesn't work - reassigning
// person = { name: "Bob" }; // Error

// Same with arrays
const numbers = [1, 2, 3];
numbers.push(4);    // Works
numbers[0] = 10;    // Works
// numbers = [];    // Error
```

### Example 3: Loop Variable Scope

```javascript
// var in loops (common pitfall)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
}
// Prints: 3, 3, 3 (var is function-scoped)

// let in loops (correct behavior)
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log(j), 1000);
}
// Prints: 0, 1, 2 (let creates new binding for each iteration)
```

## Practical Tasks

### Task 1: Variable Scope Challenge
Create a function that demonstrates the difference between `var`, `let`, and `const` in different scopes.

```javascript
function scopeChallenge() {
    // Your code here
    // Demonstrate global, function, and block scope
    // Show what's accessible and what's not
}
```

### Task 2: Fix the Bug
Fix the following code so it prints 0, 1, 2, 3, 4:

```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 100);
}
```

### Task 3: Shopping Cart
Create a shopping cart using appropriate variable declarations:

```javascript
// Create a cart that:
// - Has a constant cart name
// - Can add/remove items
// - Can update item quantities
// - Cannot be reassigned
```

### Task 4: Hoisting Understanding
Predict and explain the output of this code:

```javascript
console.log(a);
console.log(b);
console.log(c);

var a = 1;
let b = 2;
const c = 3;
```

## Best Practices

1. **Use `const` by default** - Use it for values that won't be reassigned
2. **Use `let` when you need to reassign** - For loop counters, conditional values
3. **Avoid `var`** - It has confusing scoping rules and is outdated
4. **Declare variables at the top** - Makes code more readable
5. **Use meaningful names** - `userName` instead of `x`
6. **Use camelCase** - Standard JavaScript convention
7. **Initialize when declaring** - Avoid undefined values when possible
8. **One declaration per line** - More readable and easier to modify

```javascript
// Good
const MAX_USERS = 100;
let currentUserCount = 0;
let userName = "John";

// Avoid
var x = 1, y = 2, z = 3;
```

## Common Pitfalls

1. **Forgetting to declare variables** - Creates global variables accidentally
2. **Using var in loops** - Can cause unexpected behavior with closures
3. **Assuming const makes objects immutable** - Only the reference is constant
4. **Accessing variables before declaration** - Temporal dead zone with let/const
5. **Redeclaring variables with var** - Can lead to bugs

## Interview Questions

### Question 1: What is the difference between var, let, and const?
**Answer:**
- `var` is function-scoped, can be redeclared and updated, and is hoisted with undefined value
- `let` is block-scoped, cannot be redeclared but can be updated, and has temporal dead zone
- `const` is block-scoped, cannot be redeclared or updated, must be initialized, and has temporal dead zone
- For objects/arrays with `const`, the reference is constant but properties/elements can be modified

### Question 2: What is hoisting?
**Answer:** Hoisting is JavaScript's default behavior of moving declarations to the top of their scope before code execution. Function declarations are fully hoisted (can be called before declaration), `var` declarations are hoisted with undefined value, and `let`/`const` declarations are hoisted but remain in the temporal dead zone until their declaration is reached.

### Question 3: What is the temporal dead zone?
**Answer:** The temporal dead zone (TDZ) is the time between entering a scope and the actual declaration of a let or const variable. During this time, the variable exists but cannot be accessed, and attempting to do so will throw a ReferenceError.

### Question 4: Can you change a const object's properties?
**Answer:** Yes. The `const` keyword makes the variable binding constant, not the value. For objects and arrays, you can modify their properties or elements, but you cannot reassign the variable to a new object or array.

### Question 5: Why does this code print 5 five times instead of 0, 1, 2, 3, 4?
```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 100);
}
```
**Answer:** Because `var` is function-scoped (not block-scoped), there's only one `i` variable shared across all iterations. By the time the setTimeout callbacks execute, the loop has completed and `i` is 5. Using `let` instead creates a new binding for each iteration, solving this issue.

## Additional Resources

- [MDN - var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [MDN - let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [JavaScript.info - Variables](https://javascript.info/variables)
