# Array Methods in JavaScript

## Introduction

JavaScript provides powerful built-in methods for working with arrays. These methods enable functional programming patterns and make array manipulation clean and expressive.

## Key Concepts

### 1. forEach() - Iteration

Executes a function for each array element. Returns `undefined`.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Basic usage
numbers.forEach(num => console.log(num));

// With index and array parameters
numbers.forEach((num, index, arr) => {
    console.log(`Index ${index}: ${num}`);
});

// Cannot break out of forEach
numbers.forEach(num => {
    if (num === 3) return;  // Only skips this iteration
    console.log(num);
});
```

### 2. map() - Transformation

Creates a new array by transforming each element.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// Extract property from objects
const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

const names = users.map(user => user.name);
console.log(names);  // ["John", "Jane", "Bob"]

// With index
const indexed = numbers.map((num, i) => `${i}: ${num}`);
console.log(indexed);  // ["0: 1", "1: 2", ...]

// Returning objects (need parentheses for implicit return)
const objects = numbers.map(num => ({ value: num, doubled: num * 2 }));
```

### 3. filter() - Selection

Creates a new array with elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Even numbers
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

// Filter objects
const users = [
    { name: "John", age: 30, active: true },
    { name: "Jane", age: 25, active: false },
    { name: "Bob", age: 35, active: true }
];

const activeUsers = users.filter(user => user.active);
const adults = users.filter(user => user.age >= 30);

// Complex conditions
const filtered = numbers.filter((num, index) => {
    return num > 5 && index % 2 === 0;
});

// Remove falsy values
const values = [0, 1, false, 2, "", 3, null, 4, undefined, 5];
const truthy = values.filter(Boolean);
console.log(truthy);  // [1, 2, 3, 4, 5]
```

### 4. reduce() - Aggregation

Reduces array to a single value by applying a function.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // 15

// Product
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product);  // 120

// Maximum value
const max = numbers.reduce((max, num) => num > max ? num : max, numbers[0]);

// Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count);  // { apple: 3, banana: 2, orange: 1 }

// Group by property
const users = [
    { name: "John", role: "admin" },
    { name: "Jane", role: "user" },
    { name: "Bob", role: "admin" }
];

const byRole = users.reduce((acc, user) => {
    if (!acc[user.role]) acc[user.role] = [];
    acc[user.role].push(user);
    return acc;
}, {});

// Flatten array
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log(flat);  // [1, 2, 3, 4, 5, 6]
```

### 5. find() and findIndex()

Find first element matching a condition.

```javascript
const users = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 35 }
];

// find() - returns element or undefined
const user = users.find(u => u.id === 2);
console.log(user);  // { id: 2, name: "Jane", age: 25 }

const notFound = users.find(u => u.id === 10);
console.log(notFound);  // undefined

// findIndex() - returns index or -1
const index = users.findIndex(u => u.name === "Bob");
console.log(index);  // 2

const notFoundIndex = users.findIndex(u => u.id === 10);
console.log(notFoundIndex);  // -1

// First number greater than 5
const numbers = [1, 3, 5, 7, 9];
const found = numbers.find(num => num > 5);
console.log(found);  // 7
```

### 6. some() and every()

Test if elements satisfy a condition.

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - returns true if at least one element passes
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);  // true

const hasNegative = numbers.some(num => num < 0);
console.log(hasNegative);  // false

// every() - returns true if all elements pass
const allPositive = numbers.every(num => num > 0);
console.log(allPositive);  // true

const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven);  // false

// Validate user data
const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 17 }
];

const allAdults = users.every(user => user.age >= 18);
console.log(allAdults);  // false

const hasMinor = users.some(user => user.age < 18);
console.log(hasMinor);  // true
```

### 7. sort()

Sorts array in place (modifies original).

```javascript
// String sort (default)
const fruits = ["banana", "apple", "orange", "mango"];
fruits.sort();
console.log(fruits);  // ["apple", "banana", "mango", "orange"]

// Numeric sort (requires compare function)
const numbers = [10, 5, 40, 25, 1000, 1];

// Wrong - lexicographic sort
numbers.sort();
console.log(numbers);  // [1, 10, 1000, 25, 40, 5]

// Correct - numeric sort
numbers.sort((a, b) => a - b);  // Ascending
console.log(numbers);  // [1, 5, 10, 25, 40, 1000]

numbers.sort((a, b) => b - a);  // Descending
console.log(numbers);  // [1000, 40, 25, 10, 5, 1]

// Sort objects
const users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 25 },
    { name: "Bob", age: 35 }
];

// By age
users.sort((a, b) => a.age - b.age);

// By name
users.sort((a, b) => a.name.localeCompare(b.name));

// Create sorted copy (don't modify original)
const sortedCopy = [...numbers].sort((a, b) => a - b);
```

### 8. flat() and flatMap()

Flatten nested arrays.

```javascript
// flat() - flattens nested arrays
const nested = [1, 2, [3, 4, [5, 6]]];

console.log(nested.flat());      // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));     // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity));  // Fully flatten

// flatMap() - map then flatten one level
const numbers = [1, 2, 3];

const doubled = numbers.flatMap(num => [num, num * 2]);
console.log(doubled);  // [1, 2, 2, 4, 3, 6]

// Useful for splitting strings
const sentences = ["hello world", "foo bar"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words);  // ["hello", "world", "foo", "bar"]

// Filtering during map
const nums = [1, 2, 3, 4, 5];
const evenDoubled = nums.flatMap(num =>
    num % 2 === 0 ? [num * 2] : []
);
console.log(evenDoubled);  // [4, 8]
```

## Code Examples

### Example 1: Method Chaining

```javascript
const users = [
    { name: "John", age: 30, salary: 50000 },
    { name: "Jane", age: 25, salary: 60000 },
    { name: "Bob", age: 35, salary: 55000 },
    { name: "Alice", age: 28, salary: 65000 }
];

// Find average salary of users over 25
const avgSalary = users
    .filter(user => user.age > 25)
    .map(user => user.salary)
    .reduce((sum, salary) => sum + salary, 0) /
    users.filter(user => user.age > 25).length;

console.log(avgSalary);  // 56666.67

// Get names of top 2 earners
const topEarners = users
    .sort((a, b) => b.salary - a.salary)
    .slice(0, 2)
    .map(user => user.name);

console.log(topEarners);  // ["Alice", "Jane"]
```

### Example 2: Data Transformation

```javascript
// Transform array of objects
const products = [
    { id: 1, name: "Laptop", price: 1000, category: "electronics" },
    { id: 2, name: "Phone", price: 500, category: "electronics" },
    { id: 3, name: "Shirt", price: 30, category: "clothing" }
];

// Create price lookup object
const priceById = products.reduce((acc, product) => {
    acc[product.id] = product.price;
    return acc;
}, {});

// Group by category
const byCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
}, {});

// Apply discount to electronics
const discounted = products.map(product => {
    if (product.category === "electronics") {
        return { ...product, price: product.price * 0.9 };
    }
    return product;
});
```

### Example 3: Array Statistics

```javascript
function getArrayStats(numbers) {
    if (numbers.length === 0) return null;

    return {
        sum: numbers.reduce((sum, num) => sum + num, 0),
        avg: numbers.reduce((sum, num) => sum + num, 0) / numbers.length,
        min: numbers.reduce((min, num) => Math.min(min, num), numbers[0]),
        max: numbers.reduce((max, num) => Math.max(max, num), numbers[0]),
        count: numbers.length,
        median: (() => {
            const sorted = [...numbers].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 === 0
                ? (sorted[mid - 1] + sorted[mid]) / 2
                : sorted[mid];
        })()
    };
}

console.log(getArrayStats([1, 2, 3, 4, 5]));
// { sum: 15, avg: 3, min: 1, max: 5, count: 5, median: 3 }
```

### Example 4: Custom Array Methods

```javascript
// Custom map
Array.prototype.customMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

// Custom filter
Array.prototype.customFilter = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

// Custom reduce
Array.prototype.customReduce = function(callback, initialValue) {
    let accumulator = initialValue;
    const startIndex = initialValue === undefined ? 1 : 0;

    if (initialValue === undefined && this.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value");
    }

    if (initialValue === undefined) {
        accumulator = this[0];
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};

// Test
const nums = [1, 2, 3, 4, 5];
console.log(nums.customMap(x => x * 2));      // [2, 4, 6, 8, 10]
console.log(nums.customFilter(x => x > 2));   // [3, 4, 5]
console.log(nums.customReduce((a, b) => a + b, 0));  // 15
```

## Practical Tasks

### Task 1: Student Grade Analyzer
Analyze student grades using array methods.

```javascript
const students = [
    { name: "John", scores: [85, 90, 92] },
    { name: "Jane", scores: [88, 95, 90] },
    { name: "Bob", scores: [70, 75, 72] }
];

function analyzeGrades(students) {
    // Calculate average for each student
    // Find student with highest average
    // Count students passing (avg >= 80)
    // Return summary object
}
```

### Task 2: Shopping Cart Total
Calculate cart total with discounts.

```javascript
const cart = [
    { name: "Laptop", price: 1000, quantity: 1, category: "electronics" },
    { name: "Mouse", price: 25, quantity: 2, category: "electronics" },
    { name: "Shirt", price: 30, quantity: 3, category: "clothing" }
];

function calculateTotal(cart) {
    // Electronics get 10% discount
    // Buy 2+ of same item, get 5% off that item
    // Return total after discounts
}
```

### Task 3: Word Frequency Counter
Count word frequency in an array of sentences.

```javascript
function wordFrequency(sentences) {
    // Split sentences into words
    // Count frequency of each word
    // Return sorted array of {word, count}
}

const sentences = [
    "hello world",
    "world of javascript",
    "hello javascript"
];
// Should return: [{word: "hello", count: 2}, {word: "world", count: 2}, ...]
```

### Task 4: Array Unique Values
Find unique values across multiple arrays.

```javascript
function uniqueValues(...arrays) {
    // Combine all arrays
    // Return only unique values
}

console.log(uniqueValues([1, 2, 3], [2, 3, 4], [3, 4, 5]));
// [1, 2, 3, 4, 5]
```

## Best Practices

1. **Use appropriate method for the task**
   - `map()` for transformation
   - `filter()` for selection
   - `reduce()` for aggregation
   - `forEach()` for side effects only

2. **Chain methods for readability**
   ```javascript
   const result = array
       .filter(condition)
       .map(transform)
       .reduce(aggregate);
   ```

3. **Avoid mutating original arrays**
   ```javascript
   // Good - creates new array
   const sorted = [...array].sort();

   // Bad - modifies original
   const sorted = array.sort();
   ```

4. **Provide initial value to reduce()**
   ```javascript
   // Good - safe
   array.reduce((sum, n) => sum + n, 0);

   // Risky - fails on empty array
   array.reduce((sum, n) => sum + n);
   ```

## Common Pitfalls

1. **Forgetting to return in map/filter**
2. **Using forEach when map is appropriate**
3. **Mutating array during iteration**
4. **Not providing accumulator initial value in reduce**
5. **Confusing some/every return values**

## Interview Questions

### Question 1: What's the difference between map() and forEach()?
**Answer:** `map()` returns a new array with transformed values; `forEach()` returns undefined and is used for side effects. Use `map()` when transforming data, `forEach()` when performing actions.

### Question 2: How does reduce() work?
**Answer:** `reduce()` applies a function to accumulate array values into a single result. Takes accumulator and current value, returns new accumulator. Common uses: sum, product, grouping, flattening.

### Question 3: Explain filter() vs find().
**Answer:** `filter()` returns array of all matching elements; `find()` returns first matching element or undefined. `filter()` always returns array (may be empty); `find()` returns single element.

### Question 4: What's the difference between some() and every()?
**Answer:** `some()` returns true if at least one element passes the test; `every()` returns true only if all elements pass. `some()` is OR logic; `every()` is AND logic.

### Question 5: Why doesn't sort() work correctly with numbers?
**Answer:** By default, `sort()` converts elements to strings and sorts lexicographically. For numbers, use compare function: `array.sort((a, b) => a - b)` for ascending order.

## Additional Resources

- [MDN - Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript Array Explorer](https://arrayexplorer.netlify.app/)
- [JavaScript.info - Array Methods](https://javascript.info/array-methods)
