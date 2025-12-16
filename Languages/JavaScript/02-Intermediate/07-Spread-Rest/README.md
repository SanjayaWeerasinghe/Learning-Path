# Spread and Rest Operators in JavaScript

## Introduction

The spread (`...`) and rest (`...`) operators use the same syntax but serve opposite purposes. Spread expands elements, while rest collects them.

## Key Concepts

### 1. Spread Operator

```javascript
// Spread in arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// Copy array
const original = [1, 2, 3];
const copy = [...original];

// Add elements
const numbers = [2, 3, 4];
const extended = [1, ...numbers, 5];  // [1, 2, 3, 4, 5]

// Spread in objects
const person = { name: 'John', age: 30 };
const employee = { ...person, job: 'Developer' };
// { name: 'John', age: 30, job: 'Developer' }

// Override properties
const updated = { ...person, age: 31 };  // { name: 'John', age: 31 }

// Merge objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 };  // { a: 1, b: 3, c: 4 }

// Spread in function calls
const numbers = [1, 2, 3];
console.log(Math.max(...numbers));  // 3
```

### 2. Rest Operator

```javascript
// Rest in function parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4));  // 10

// Combine with regular parameters
function greet(greeting, ...names) {
    return `${greeting} ${names.join(', ')}!`;
}
console.log(greet('Hello', 'John', 'Jane', 'Bob'));
// "Hello John, Jane, Bob!"

// Rest in destructuring (arrays)
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// Rest in destructuring (objects)
const person = { name: 'John', age: 30, city: 'NYC', country: 'USA' };
const { name, age, ...location } = person;
console.log(location);  // { city: 'NYC', country: 'USA' }
```

## Code Examples

### Example 1: Array Manipulation

```javascript
// Concatenate arrays
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'potato'];
const food = [...fruits, ...vegetables];

// Insert into middle
const numbers = [1, 2, 5, 6];
const complete = [0, ...numbers.slice(0, 2), 3, 4, ...numbers.slice(2)];
// [0, 1, 2, 3, 4, 5, 6]

// Remove duplicates
const withDupes = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(withDupes)];  // [1, 2, 3, 4]

// Flatten one level
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = [].concat(...nested);  // [1, 2, 3, 4, 5, 6]

// Convert string to array
const chars = [..."Hello"];  // ['H', 'e', 'l', 'l', 'o']
```

### Example 2: Object Operations

```javascript
// Clone object
const original = { a: 1, b: 2 };
const clone = { ...original };

// Merge with override
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { theme: 'dark' };
const settings = { ...defaults, ...userPrefs };
// { theme: 'dark', lang: 'en' }

// Add/update properties
const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31, email: 'john@example.com' };

// Remove property
const { age, ...userWithoutAge } = user;

// Conditional properties
const config = {
    ...baseConfig,
    ...(isDev && { debug: true }),
    ...(isProd && { cache: true })
};
```

### Example 3: Function Applications

```javascript
// Variadic functions
function multiply(multiplier, ...numbers) {
    return numbers.map(n => n * multiplier);
}
console.log(multiply(2, 1, 2, 3));  // [2, 4, 6]

// Apply function to array elements
const numbers = [1, 5, 3, 9, 2];
console.log(Math.max(...numbers));  // 9
console.log(Math.min(...numbers));  // 1

// Combine function arguments
function logUser(name, age, city) {
    console.log(`${name}, ${age}, from ${city}`);
}

const userData = ['John', 30, 'NYC'];
logUser(...userData);  // "John, 30, from NYC"
```

## Practical Tasks

### Task 1: Array Merger
```javascript
// Create function that merges multiple arrays and removes duplicates
function mergeUnique(...arrays) {
    // Your code here
}

console.log(mergeUnique([1,2], [2,3], [3,4]));  // [1, 2, 3, 4]
```

### Task 2: Object Updater
```javascript
// Create function that updates nested object properties
function updateNested(obj, updates) {
    // Deep merge using spread
}
```

### Task 3: Flexible Calculator
```javascript
// Create calculator that accepts variable number of arguments
const calculator = {
    add(...nums) { /* */ },
    multiply(...nums) { /* */ },
    average(...nums) { /* */ }
};
```

## Best Practices

1. **Use spread for shallow copying**
2. **Use rest for variadic functions**
3. **Spread objects for immutable updates**
4. **Remember: shallow copy only**

```javascript
// Good: Shallow copy
const newState = { ...oldState, updated: true };

// Be aware: Nested objects still reference original
const obj = { nested: { value: 1 } };
const copy = { ...obj };
copy.nested.value = 2;
console.log(obj.nested.value);  // 2 (modified!)
```

## Interview Questions

### Question 1: What's the difference between spread and rest?
**Answer:** Spread expands an array/object into individual elements; rest collects multiple elements into an array. Same syntax, opposite purposes.

### Question 2: Does spread create a deep or shallow copy?
**Answer:** Shallow copy. Nested objects/arrays are still referenced, not copied. Use libraries like Lodash for deep copying.

### Question 3: How do you merge objects with spread?
**Answer:** `{...obj1, ...obj2}` - later objects override earlier ones. Useful for immutable updates.

### Question 4: Can you use rest parameters with destructuring?
**Answer:** Yes. `const [first, ...rest] = array` or `const {name, ...others} = obj`. Rest must be last element.

### Question 5: What's the performance impact of spread operator?
**Answer:** Creates new array/object, so has memory and performance cost. Fine for small data, but consider alternatives for large arrays/frequent operations.

## Additional Resources

- [MDN - Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- [MDN - Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
