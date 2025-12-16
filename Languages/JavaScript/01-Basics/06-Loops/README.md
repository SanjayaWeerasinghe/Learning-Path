# Loops in JavaScript

## Introduction

Loops allow you to execute a block of code repeatedly. They are essential for iterating over data structures, performing repetitive tasks, and processing collections of items.

## Key Concepts

### 1. for Loop

The most common loop, ideal when you know how many iterations you need.

```javascript
// Syntax: for (initialization; condition; increment)
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// Counting backwards
for (let i = 5; i > 0; i--) {
    console.log(i);  // 5, 4, 3, 2, 1
}

// Step by 2
for (let i = 0; i <= 10; i += 2) {
    console.log(i);  // 0, 2, 4, 6, 8, 10
}

// Iterating over an array
let fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
```

### 2. while Loop

Executes while a condition is true. Good when you don't know the number of iterations in advance.

```javascript
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}

// Practical example: user input validation
let password = "";
while (password.length < 8) {
    // password = prompt("Enter password (min 8 characters):");
    password = "validpassword"; // Example
}

// Reading a list until a condition
let numbers = [1, 2, 3, 4, 5];
let index = 0;
while (index < numbers.length && numbers[index] !== 3) {
    console.log(numbers[index]);
    index++;
}
```

### 3. do...while Loop

Similar to while, but guarantees at least one execution.

```javascript
let num = 0;
do {
    console.log(num);  // Executes at least once
    num++;
} while (num < 3);

// Practical use: menu systems
let choice;
do {
    // choice = showMenu();
    choice = 3; // Example
} while (choice !== 3);  // Repeat until user chooses exit

// Difference from while
let x = 10;
while (x < 5) {
    console.log("This won't run");
}

do {
    console.log("This runs once");  // Executes despite condition being false
} while (x < 5);
```

### 4. for...of Loop

Iterates over iterable objects (arrays, strings, maps, sets, etc.). Best for arrays.

```javascript
// Array iteration
let colors = ["red", "green", "blue"];
for (let color of colors) {
    console.log(color);
}

// String iteration
let text = "Hello";
for (let char of text) {
    console.log(char);  // H, e, l, l, o
}

// With index (using entries)
let fruits = ["apple", "banana", "orange"];
for (let [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}

// Set iteration
let uniqueNumbers = new Set([1, 2, 3, 2, 1]);
for (let num of uniqueNumbers) {
    console.log(num);  // 1, 2, 3
}

// Map iteration
let userRoles = new Map([
    ["John", "admin"],
    ["Jane", "user"]
]);
for (let [name, role] of userRoles) {
    console.log(`${name}: ${role}`);
}
```

### 5. for...in Loop

Iterates over enumerable properties of an object. Best for objects.

```javascript
// Object iteration
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Can be used with arrays (not recommended)
let numbers = [10, 20, 30];
for (let index in numbers) {
    console.log(index);  // "0", "1", "2" (as strings!)
    console.log(numbers[index]);  // 10, 20, 30
}

// Checking own properties
let obj = Object.create({ inherited: "value" });
obj.own = "property";

for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key);  // Only "own", not "inherited"
    }
}
```

### 6. break Statement

Exits the loop immediately.

```javascript
// Finding a value
let numbers = [1, 2, 3, 4, 5];
let target = 3;

for (let num of numbers) {
    if (num === target) {
        console.log("Found:", num);
        break;  // Exit loop
    }
}

// Breaking out of nested loops (using labels)
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outerLoop;  // Breaks out of both loops
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}
```

### 7. continue Statement

Skips the current iteration and continues with the next.

```javascript
// Skip even numbers
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(i);  // 1, 3, 5, 7, 9
}

// Skip empty values
let values = [1, null, 2, undefined, 3, 0, 4];
for (let value of values) {
    if (!value) {
        continue;  // Skip falsy values
    }
    console.log(value);  // 1, 2, 3, 4
}

// With labeled continue
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (j === 1) {
            continue outer;  // Skip to next iteration of outer loop
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}
```

## Code Examples

### Example 1: Sum of Array Elements

```javascript
function sumArray(arr) {
    let sum = 0;
    for (let num of arr) {
        sum += num;
    }
    return sum;
}

console.log(sumArray([1, 2, 3, 4, 5]));  // 15

// Using traditional for loop
function sumArrayTraditional(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
```

### Example 2: Finding Elements

```javascript
// Find first occurrence
function findFirst(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;  // Return index
        }
    }
    return -1;  // Not found
}

console.log(findFirst([1, 2, 3, 4, 5], 3));  // 2
console.log(findFirst([1, 2, 3, 4, 5], 6));  // -1

// Find all occurrences
function findAll(arr, target) {
    let indices = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            indices.push(i);
        }
    }
    return indices;
}

console.log(findAll([1, 2, 3, 2, 1], 2));  // [1, 3]
```

### Example 3: Nested Loops - Multiplication Table

```javascript
function multiplicationTable(size) {
    for (let i = 1; i <= size; i++) {
        let row = "";
        for (let j = 1; j <= size; j++) {
            row += (i * j).toString().padStart(4, " ");
        }
        console.log(row);
    }
}

multiplicationTable(5);
/*
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
*/
```

### Example 4: Object Iteration

```javascript
let inventory = {
    apples: 10,
    bananas: 5,
    oranges: 8
};

// Count total items
let total = 0;
for (let item in inventory) {
    total += inventory[item];
}
console.log("Total items:", total);  // 23

// Find item with most quantity
let maxItem = "";
let maxQuantity = 0;
for (let item in inventory) {
    if (inventory[item] > maxQuantity) {
        maxQuantity = inventory[item];
        maxItem = item;
    }
}
console.log(`Most: ${maxItem} (${maxQuantity})`);  // apples (10)
```

### Example 5: FizzBuzz Challenge

```javascript
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

fizzBuzz(15);
// 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz
```

### Example 6: Reversing an Array

```javascript
function reverseArray(arr) {
    let reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        reversed.push(arr[i]);
    }
    return reversed;
}

console.log(reverseArray([1, 2, 3, 4, 5]));  // [5, 4, 3, 2, 1]

// In-place reversal
function reverseInPlace(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
        let temp = arr[i];
        let oppositeIndex = arr.length - 1 - i;
        arr[i] = arr[oppositeIndex];
        arr[oppositeIndex] = temp;
    }
    return arr;
}
```

## Practical Tasks

### Task 1: Prime Number Checker
Create a function to check if a number is prime.

```javascript
function isPrime(num) {
    // A prime number is only divisible by 1 and itself
    // Return true if prime, false otherwise
    // Hint: Loop from 2 to sqrt(num)
}

// Test cases
console.log(isPrime(7));   // true
console.log(isPrime(12));  // false
console.log(isPrime(2));   // true
console.log(isPrime(1));   // false
```

### Task 2: Factorial Calculator
Calculate factorial using a loop.

```javascript
function factorial(n) {
    // n! = n * (n-1) * (n-2) * ... * 1
    // Example: 5! = 5 * 4 * 3 * 2 * 1 = 120
}

// Test cases
console.log(factorial(5));  // 120
console.log(factorial(0));  // 1
console.log(factorial(7));  // 5040
```

### Task 3: Pattern Printer
Print a pyramid pattern.

```javascript
function printPyramid(rows) {
    // Print a pyramid with given number of rows
    // Example for rows = 4:
    //    *
    //   ***
    //  *****
    // *******
}

printPyramid(4);
```

### Task 4: Array Deduplication
Remove duplicates from an array.

```javascript
function removeDuplicates(arr) {
    // Return new array with duplicates removed
    // Keep first occurrence of each value
}

// Test cases
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5]));  // [1, 2, 3, 4, 5]
console.log(removeDuplicates(["a", "b", "a", "c"]));   // ["a", "b", "c"]
```

## Best Practices

1. **Choose the right loop type**
   - `for` - when you know the iteration count
   - `for...of` - for iterating array values
   - `for...in` - for iterating object properties
   - `while` - when condition-based, unknown iterations

2. **Use const/let instead of var** in loops

3. **Cache array length** in performance-critical loops
   ```javascript
   // Good for large arrays
   for (let i = 0, len = arr.length; i < len; i++) {
       // ...
   }
   ```

4. **Avoid infinite loops**
   ```javascript
   // Bad - infinite loop
   // while (true) { }

   // Good - has exit condition
   while (condition) {
       if (shouldExit) break;
   }
   ```

5. **Use meaningful variable names**
   ```javascript
   // Good
   for (let user of users) { }

   // Avoid
   for (let x of y) { }
   ```

6. **Prefer array methods** when appropriate
   ```javascript
   // Instead of:
   let doubled = [];
   for (let num of numbers) {
       doubled.push(num * 2);
   }

   // Use:
   let doubled = numbers.map(num => num * 2);
   ```

7. **Don't modify array length during iteration**
   ```javascript
   // Bad
   for (let i = 0; i < arr.length; i++) {
       arr.push(i);  // Creates infinite loop!
   }
   ```

## Common Pitfalls

1. **Off-by-one errors**
   ```javascript
   // Wrong - skips last element
   for (let i = 0; i < arr.length - 1; i++) { }

   // Correct
   for (let i = 0; i < arr.length; i++) { }
   ```

2. **Using for...in with arrays**
   ```javascript
   let arr = [1, 2, 3];
   // Bad - iterates over indices as strings
   for (let i in arr) {
       console.log(typeof i);  // "string"
   }

   // Good - use for...of for arrays
   for (let value of arr) {
       console.log(value);
   }
   ```

3. **Infinite loops**
   ```javascript
   // Forgot to increment
   let i = 0;
   while (i < 10) {
       console.log(i);
       // Missing: i++
   }
   ```

4. **Modifying loop variable inside loop**
   ```javascript
   // Confusing
   for (let i = 0; i < 10; i++) {
       i += 2;  // Don't do this
   }
   ```

5. **Not using hasOwnProperty with for...in**
   ```javascript
   let obj = Object.create({ inherited: true });
   obj.own = true;

   // Wrong - includes inherited properties
   for (let key in obj) {
       console.log(key);  // "own", "inherited"
   }

   // Correct
   for (let key in obj) {
       if (obj.hasOwnProperty(key)) {
           console.log(key);  // "own"
       }
   }
   ```

## Loop Performance

```javascript
// Fastest to slowest (generally):

// 1. Traditional for loop (fastest for simple operations)
for (let i = 0; i < arr.length; i++) { }

// 2. for...of loop (cleaner, nearly as fast)
for (let item of arr) { }

// 3. forEach (functional, good readability)
arr.forEach(item => { });

// 4. for...in (slowest, don't use for arrays)
for (let i in arr) { }
```

## Interview Questions

### Question 1: What's the difference between for...of and for...in?
**Answer:**
- `for...of` iterates over values of iterable objects (arrays, strings, maps, sets)
- `for...in` iterates over enumerable property names (keys) of an object
- Use `for...of` for arrays to get values directly
- Use `for...in` for objects to get keys
- `for...in` returns string indices for arrays, which is usually not desired

### Question 2: When would you use a while loop instead of a for loop?
**Answer:**
- Use `while` when the number of iterations is unknown beforehand
- Use `while` when looping is based on a condition rather than a counter
- Examples: user input validation, reading from a stream, waiting for an event
- Use `for` when you know exactly how many times to iterate (like array length)

### Question 3: What's the difference between break and continue?
**Answer:**
- `break` exits the entire loop immediately
- `continue` skips the current iteration and moves to the next one
- `break` is used when you've found what you're looking for or met an exit condition
- `continue` is used to skip certain items that don't match criteria
- Both can use labels to work with nested loops

### Question 4: What's the difference between while and do...while?
**Answer:**
- `while` checks the condition before executing the loop body (may not run at all)
- `do...while` executes the loop body once before checking the condition (runs at least once)
- Use `do...while` when you need guaranteed execution (e.g., showing a menu once)
- Use `while` when execution depends entirely on the initial condition

### Question 5: How can you avoid infinite loops?
**Answer:**
1. Always ensure the loop condition will eventually become false
2. Make sure increment/decrement statements are executed
3. Include a maximum iteration counter as a safety measure
4. Use `break` statements for exit conditions
5. Test loop conditions carefully, especially with complex logic
6. For `while` loops, ensure the condition variable is modified inside the loop

## Additional Resources

- [MDN - Loops and Iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [MDN - for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- [MDN - for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [MDN - for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- [JavaScript.info - Loops](https://javascript.info/while-for)
