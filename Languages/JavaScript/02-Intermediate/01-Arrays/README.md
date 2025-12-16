# Arrays in JavaScript

## Introduction

Arrays are ordered collections that can hold multiple values of any type. They are one of the most fundamental data structures in JavaScript and are essential for managing lists of data.

## Key Concepts

### 1. Creating Arrays

```javascript
// Array literal (most common)
let fruits = ["apple", "banana", "orange"];

// Array constructor
let numbers = new Array(1, 2, 3, 4, 5);

// Empty array with specific length
let empty = new Array(5);  // [empty × 5]

// Array.of() - creates array from arguments
let values = Array.of(1, 2, 3);  // [1, 2, 3]

// Array.from() - creates array from iterable
let str = "hello";
let chars = Array.from(str);  // ["h", "e", "l", "l", "o"]

// Array.from() with mapping function
let doubled = Array.from([1, 2, 3], x => x * 2);  // [2, 4, 6]
```

### 2. Accessing Array Elements

```javascript
let fruits = ["apple", "banana", "orange", "mango"];

// Index access (0-based)
console.log(fruits[0]);    // "apple"
console.log(fruits[2]);    // "orange"

// Last element
console.log(fruits[fruits.length - 1]);  // "mango"

// Negative indices (not directly supported, but can use at())
console.log(fruits.at(-1));   // "mango" (ES2022)
console.log(fruits.at(-2));   // "orange"

// Out of bounds returns undefined
console.log(fruits[10]);   // undefined
```

### 3. Array Properties

```javascript
let numbers = [1, 2, 3, 4, 5];

// length - number of elements
console.log(numbers.length);  // 5

// Modifying length
numbers.length = 3;
console.log(numbers);  // [1, 2, 3]

numbers.length = 5;
console.log(numbers);  // [1, 2, 3, empty × 2]
```

### 4. Adding and Removing Elements

```javascript
let arr = [1, 2, 3];

// push() - add to end (returns new length)
arr.push(4);
console.log(arr);  // [1, 2, 3, 4]

// pop() - remove from end (returns removed element)
let last = arr.pop();
console.log(last);  // 4
console.log(arr);   // [1, 2, 3]

// unshift() - add to beginning
arr.unshift(0);
console.log(arr);  // [0, 1, 2, 3]

// shift() - remove from beginning
let first = arr.shift();
console.log(first);  // 0
console.log(arr);    // [1, 2, 3]

// splice() - add/remove at any position
let fruits = ["apple", "banana", "orange"];
fruits.splice(1, 1, "mango", "kiwi");  // At index 1, remove 1, add 2
console.log(fruits);  // ["apple", "mango", "kiwi", "orange"]
```

### 5. Array Slicing and Copying

```javascript
let numbers = [1, 2, 3, 4, 5];

// slice() - extract portion (doesn't modify original)
let portion = numbers.slice(1, 3);
console.log(portion);  // [2, 3]
console.log(numbers);  // [1, 2, 3, 4, 5] (unchanged)

// Slice from index to end
let fromTwo = numbers.slice(2);
console.log(fromTwo);  // [3, 4, 5]

// Negative indices
let lastTwo = numbers.slice(-2);
console.log(lastTwo);  // [4, 5]

// Copy entire array
let copy = numbers.slice();
// Or using spread operator
let copy2 = [...numbers];
```

### 6. Searching in Arrays

```javascript
let fruits = ["apple", "banana", "orange", "banana"];

// indexOf() - first occurrence (returns -1 if not found)
console.log(fruits.indexOf("banana"));     // 1
console.log(fruits.indexOf("grape"));      // -1

// lastIndexOf() - last occurrence
console.log(fruits.lastIndexOf("banana")); // 3

// includes() - check if exists (returns boolean)
console.log(fruits.includes("apple"));     // true
console.log(fruits.includes("grape"));     // false

// find() - first element matching condition
let numbers = [1, 5, 10, 15, 20];
let found = numbers.find(num => num > 10);
console.log(found);  // 15

// findIndex() - index of first match
let index = numbers.findIndex(num => num > 10);
console.log(index);  // 3
```

### 7. Array Transformation

```javascript
// concat() - merge arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let merged = arr1.concat(arr2);
console.log(merged);  // [1, 2, 3, 4]

// join() - convert to string
let fruits = ["apple", "banana", "orange"];
console.log(fruits.join());        // "apple,banana,orange"
console.log(fruits.join(" - "));   // "apple - banana - orange"

// reverse() - reverse order (modifies original)
let numbers = [1, 2, 3, 4, 5];
numbers.reverse();
console.log(numbers);  // [5, 4, 3, 2, 1]

// sort() - sort elements (modifies original)
let words = ["zebra", "apple", "mango", "banana"];
words.sort();
console.log(words);  // ["apple", "banana", "mango", "zebra"]

// Numeric sort (needs compare function)
let nums = [10, 5, 40, 25, 1000];
nums.sort((a, b) => a - b);  // Ascending
console.log(nums);  // [5, 10, 25, 40, 1000]
```

### 8. Multi-dimensional Arrays

```javascript
// 2D array (matrix)
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Accessing elements
console.log(matrix[0][0]);  // 1
console.log(matrix[1][2]);  // 6
console.log(matrix[2][1]);  // 8

// Iterating 2D array
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        console.log(matrix[i][j]);
    }
}

// Or with for...of
for (let row of matrix) {
    for (let value of row) {
        console.log(value);
    }
}

// Creating 2D array dynamically
function create2DArray(rows, cols, fill = 0) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => fill)
    );
}

let grid = create2DArray(3, 3, 0);
console.log(grid);  // [[0,0,0], [0,0,0], [0,0,0]]
```

## Code Examples

### Example 1: Array Statistics

```javascript
function arrayStats(numbers) {
    if (numbers.length === 0) {
        return { min: null, max: null, avg: null, sum: null };
    }

    let sum = 0;
    let min = numbers[0];
    let max = numbers[0];

    for (let num of numbers) {
        sum += num;
        if (num < min) min = num;
        if (num > max) max = num;
    }

    return {
        min: min,
        max: max,
        avg: sum / numbers.length,
        sum: sum
    };
}

console.log(arrayStats([5, 2, 9, 1, 7]));
// { min: 1, max: 9, avg: 4.8, sum: 24 }
```

### Example 2: Remove Duplicates

```javascript
// Method 1: Using Set
function removeDuplicates1(arr) {
    return [...new Set(arr)];
}

// Method 2: Using filter
function removeDuplicates2(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

// Method 3: Using reduce
function removeDuplicates3(arr) {
    return arr.reduce((unique, item) => {
        return unique.includes(item) ? unique : [...unique, item];
    }, []);
}

let numbers = [1, 2, 3, 2, 4, 3, 5, 1];
console.log(removeDuplicates1(numbers));  // [1, 2, 3, 4, 5]
```

### Example 3: Array Chunking

```javascript
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(chunkArray(numbers, 3));
// [[1, 2, 3], [4, 5, 6], [7, 8]]
```

### Example 4: Flatten Nested Array

```javascript
// Shallow flatten
function flattenShallow(arr) {
    return arr.reduce((flat, item) => flat.concat(item), []);
}

// Deep flatten (recursive)
function flattenDeep(arr) {
    return arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? flattenDeep(item) : item);
    }, []);
}

// Using built-in flat()
let nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());      // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));     // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity));  // Fully flatten

// Custom deep flatten
let deep = [1, [2, [3, [4, 5]]]];
console.log(flattenDeep(deep));  // [1, 2, 3, 4, 5]
```

### Example 5: Shopping Cart

```javascript
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    clear() {
        this.items = [];
    }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ id: 1, name: "Laptop", price: 1000 }, 1);
cart.addItem({ id: 2, name: "Mouse", price: 25 }, 2);
console.log(cart.getTotal());      // 1050
console.log(cart.getItemCount());  // 3
```

## Practical Tasks

### Task 1: Array Rotation
Rotate an array by k positions.

```javascript
function rotateArray(arr, k) {
    // Rotate array to the right by k positions
    // Example: rotateArray([1,2,3,4,5], 2) => [4,5,1,2,3]
}

// Test cases
console.log(rotateArray([1, 2, 3, 4, 5], 2));  // [4, 5, 1, 2, 3]
console.log(rotateArray([1, 2, 3], 1));        // [3, 1, 2]
```

### Task 2: Find Intersection
Find common elements between two arrays.

```javascript
function findIntersection(arr1, arr2) {
    // Return array of elements that exist in both arrays
}

// Test cases
console.log(findIntersection([1, 2, 3], [2, 3, 4]));     // [2, 3]
console.log(findIntersection([1, 2, 3], [4, 5, 6]));     // []
```

### Task 3: Move Zeros
Move all zeros to the end of the array.

```javascript
function moveZeros(arr) {
    // Move all zeros to the end while maintaining order of other elements
    // Modify in place or return new array
}

// Test cases
console.log(moveZeros([0, 1, 0, 3, 12]));  // [1, 3, 12, 0, 0]
console.log(moveZeros([0, 0, 1]));         // [1, 0, 0]
```

### Task 4: Array Difference
Find elements in first array that are not in the second.

```javascript
function arrayDifference(arr1, arr2) {
    // Return elements from arr1 that don't exist in arr2
}

// Test cases
console.log(arrayDifference([1, 2, 3, 4], [2, 4]));     // [1, 3]
console.log(arrayDifference([1, 2, 3], [1, 2, 3]));     // []
```

## Best Practices

1. **Use const for arrays that won't be reassigned**
   ```javascript
   const fruits = ["apple", "banana"];
   fruits.push("orange");  // OK - modifying content
   // fruits = [];         // Error - reassigning
   ```

2. **Prefer array methods over loops** for readability
   ```javascript
   // Good
   const doubled = numbers.map(n => n * 2);

   // Less readable
   const doubled = [];
   for (let i = 0; i < numbers.length; i++) {
       doubled.push(numbers[i] * 2);
   }
   ```

3. **Use spread operator for copying**
   ```javascript
   const original = [1, 2, 3];
   const copy = [...original];
   ```

4. **Check array length before accessing**
   ```javascript
   if (arr.length > 0) {
       console.log(arr[0]);
   }
   ```

5. **Use appropriate search methods**
   ```javascript
   // For simple existence check
   if (arr.includes(value)) { }

   // For finding complex objects
   const user = users.find(u => u.id === targetId);
   ```

## Common Pitfalls

1. **Modifying array during iteration**
   ```javascript
   // Wrong
   for (let i = 0; i < arr.length; i++) {
       arr.splice(i, 1);  // Changes length during iteration
   }

   // Right
   arr = arr.filter(item => /* keep condition */);
   ```

2. **Confusing reference vs value**
   ```javascript
   const arr1 = [1, 2, 3];
   const arr2 = arr1;     // Reference, not copy!
   arr2.push(4);
   console.log(arr1);     // [1, 2, 3, 4] - modified!

   // Correct
   const arr2 = [...arr1];  // Copy
   ```

3. **Sorting numbers without compare function**
   ```javascript
   const nums = [10, 5, 40, 25];
   nums.sort();  // Wrong: [10, 25, 40, 5] (lexicographic)
   nums.sort((a, b) => a - b);  // Right: [5, 10, 25, 40]
   ```

4. **Not checking if value is an array**
   ```javascript
   // Wrong
   if (value) {
       value.forEach(/* ... */);  // Might not be array
   }

   // Right
   if (Array.isArray(value)) {
       value.forEach(/* ... */);
   }
   ```

## Interview Questions

### Question 1: What are the different ways to create an array in JavaScript?
**Answer:**
1. Array literal: `let arr = [1, 2, 3]`
2. Array constructor: `let arr = new Array(1, 2, 3)`
3. Array.of(): `let arr = Array.of(1, 2, 3)`
4. Array.from(): `let arr = Array.from('abc')` creates `['a', 'b', 'c']`
5. Spread operator: `let arr = [...otherArr]`

### Question 2: What's the difference between slice() and splice()?
**Answer:**
- `slice()` returns a shallow copy of a portion without modifying the original array
- `splice()` changes the original array by removing/replacing/adding elements
- `slice(start, end)` - end is exclusive, returns extracted portion
- `splice(start, deleteCount, ...items)` - returns removed elements, modifies original

### Question 3: How do you remove duplicates from an array?
**Answer:** Several approaches:
1. Using Set: `[...new Set(arr)]`
2. Using filter: `arr.filter((item, index) => arr.indexOf(item) === index)`
3. Using reduce: build unique array incrementally
4. Using forEach with temporary object/set

The Set approach is simplest and most performant for primitive values.

### Question 4: Explain the difference between Array.forEach() and Array.map().
**Answer:**
- `forEach()` executes a function for each element but returns undefined
- `map()` executes a function for each element and returns a new array with results
- Use `forEach()` for side effects (logging, updating external variables)
- Use `map()` for transforming data into a new array
- `map()` is preferred in functional programming as it's pure

### Question 5: How do you check if a variable is an array?
**Answer:** Use `Array.isArray(value)` - this is the most reliable method.
- `typeof arr` returns "object" (not useful)
- `arr instanceof Array` works but fails across different execution contexts (iframes)
- `Array.isArray()` is the standard, reliable method introduced in ES5

## Additional Resources

- [MDN - Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info - Arrays](https://javascript.info/array)
- [JavaScript Array Explorer](https://arrayexplorer.netlify.app/)
