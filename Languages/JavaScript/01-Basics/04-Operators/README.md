# Operators in JavaScript

## Introduction

Operators are symbols that perform operations on values and variables. JavaScript provides a rich set of operators for arithmetic, comparison, logical operations, and more.

## Key Concepts

### 1. Arithmetic Operators

Used to perform mathematical operations.

```javascript
let a = 10;
let b = 3;

console.log(a + b);  // 13 - Addition
console.log(a - b);  // 7  - Subtraction
console.log(a * b);  // 30 - Multiplication
console.log(a / b);  // 3.333... - Division
console.log(a % b);  // 1  - Modulus (remainder)
console.log(a ** b); // 1000 - Exponentiation (10^3)

// Increment and Decrement
let x = 5;
console.log(x++);    // 5 - Post-increment (use then increment)
console.log(x);      // 6
console.log(++x);    // 7 - Pre-increment (increment then use)
console.log(x--);    // 7 - Post-decrement
console.log(--x);    // 5 - Pre-decrement
```

### 2. Assignment Operators

Used to assign values to variables.

```javascript
let x = 10;          // Simple assignment

x += 5;              // x = x + 5  (15)
x -= 3;              // x = x - 3  (12)
x *= 2;              // x = x * 2  (24)
x /= 4;              // x = x / 4  (6)
x %= 4;              // x = x % 4  (2)
x **= 3;             // x = x ** 3 (8)

// Logical assignment (ES2021)
let a = null;
a ??= 10;            // a = a ?? 10 (assign if null/undefined)
console.log(a);      // 10

let b = false;
b ||= true;          // b = b || true (assign if falsy)
console.log(b);      // true

let c = true;
c &&= false;         // c = c && false (assign if truthy)
console.log(c);      // false
```

### 3. Comparison Operators

Used to compare two values and return a boolean.

```javascript
let x = 5;
let y = "5";

// Equality
console.log(x == y);   // true  - Equal (with type coercion)
console.log(x === y);  // false - Strict equal (no type coercion)
console.log(x != y);   // false - Not equal (with type coercion)
console.log(x !== y);  // true  - Strict not equal (no type coercion)

// Relational
console.log(x > 3);    // true  - Greater than
console.log(x < 3);    // false - Less than
console.log(x >= 5);   // true  - Greater than or equal
console.log(x <= 4);   // false - Less than or equal

// String comparison
console.log("apple" < "banana");  // true (alphabetical order)
console.log("10" > "2");          // false (string comparison, not numeric)
```

### 4. Logical Operators

Used to combine or invert boolean values.

```javascript
let a = true;
let b = false;

// AND operator (&&)
console.log(a && b);          // false - both must be true
console.log(true && true);    // true

// OR operator (||)
console.log(a || b);          // true - at least one must be true
console.log(false || false);  // false

// NOT operator (!)
console.log(!a);              // false - inverts the value
console.log(!b);              // true

// Short-circuit evaluation
let user = null;
let name = user && user.name;  // null (doesn't evaluate user.name)

let defaultName = user || "Guest";  // "Guest"

// Nullish coalescing (??)
let value = null;
console.log(value ?? "default");    // "default"
console.log(0 ?? "default");        // 0 (only null/undefined trigger default)
console.log(value || "default");    // "default"
console.log(0 || "default");        // "default" (any falsy triggers default)
```

### 5. String Operators

The `+` operator concatenates strings.

```javascript
let firstName = "John";
let lastName = "Doe";

let fullName = firstName + " " + lastName;  // "John Doe"
console.log("Score: " + 95);                // "Score: 95"

let greeting = "Hello";
greeting += " World";                       // "Hello World"

// Template literals (better alternative)
let message = `${firstName} ${lastName}`;   // "John Doe"
```

### 6. Conditional (Ternary) Operator

Shorthand for if-else statements.

```javascript
// Syntax: condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Nested ternary (use sparingly)
let score = 85;
let grade = score >= 90 ? "A" :
            score >= 80 ? "B" :
            score >= 70 ? "C" : "F";
console.log(grade); // "B"

// Can include expressions
let discount = isPremium ? (price * 0.2) : (price * 0.1);
```

### 7. Type Operators

```javascript
// typeof - returns type of a value
console.log(typeof 42);           // "number"
console.log(typeof "hello");      // "string"
console.log(typeof true);         // "boolean"
console.log(typeof undefined);    // "undefined"
console.log(typeof {});           // "object"

// instanceof - checks if object is instance of a class
let arr = [1, 2, 3];
console.log(arr instanceof Array);   // true
console.log(arr instanceof Object);  // true
console.log(arr instanceof String);  // false

let date = new Date();
console.log(date instanceof Date);   // true
```

### 8. Bitwise Operators

Operate on binary representations (rarely used in typical JavaScript).

```javascript
let a = 5;  // 0101 in binary
let b = 3;  // 0011 in binary

console.log(a & b);   // 1  - AND (0001)
console.log(a | b);   // 7  - OR (0111)
console.log(a ^ b);   // 6  - XOR (0110)
console.log(~a);      // -6 - NOT
console.log(a << 1);  // 10 - Left shift
console.log(a >> 1);  // 2  - Right shift
```

### 9. Other Operators

```javascript
// Comma operator
let x = (1, 2, 3);  // x = 3 (returns last value)

// delete operator
let obj = { name: "John", age: 30 };
delete obj.age;
console.log(obj);  // { name: "John" }

// in operator
console.log("name" in obj);  // true
console.log("age" in obj);   // false

// void operator
void(0);  // returns undefined (rarely used)

// Optional chaining (?.)
let user = {};
console.log(user?.address?.street);  // undefined (no error)
```

## Code Examples

### Example 1: Calculator Function

```javascript
function calculate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
        case '%':
            return num1 % num2;
        case '**':
            return num1 ** num2;
        default:
            return "Invalid operator";
    }
}

console.log(calculate(10, 5, '+'));   // 15
console.log(calculate(10, 5, '-'));   // 5
console.log(calculate(10, 5, '*'));   // 50
console.log(calculate(10, 5, '/'));   // 2
```

### Example 2: Logical Operators in Practice

```javascript
function canVote(age, isCitizen, isRegistered) {
    // Must be 18+, citizen, and registered
    return age >= 18 && isCitizen && isRegistered;
}

console.log(canVote(20, true, true));   // true
console.log(canVote(16, true, true));   // false
console.log(canVote(20, false, true));  // false

function getDiscount(isPremium, isStudent, age) {
    // Premium gets 20%, students or seniors get 10%
    if (isPremium) return 0.20;
    if (isStudent || age >= 65) return 0.10;
    return 0;
}

console.log(getDiscount(true, false, 30));   // 0.20
console.log(getDiscount(false, true, 20));   // 0.10
console.log(getDiscount(false, false, 70));  // 0.10
```

### Example 3: Comparison and Equality

```javascript
// Loose vs Strict Equality
console.log(5 == "5");     // true  - type coercion
console.log(5 === "5");    // false - different types
console.log(null == undefined);   // true
console.log(null === undefined);  // false

// Array and object comparison
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
let arr3 = arr1;

console.log(arr1 == arr2);   // false - different objects
console.log(arr1 === arr2);  // false - different references
console.log(arr1 === arr3);  // true  - same reference

// Comparing objects
function areEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log(areEqual({a: 1}, {a: 1}));  // true
```

### Example 4: Short-circuit Evaluation

```javascript
// && returns first falsy value or last value
console.log(true && "hello");      // "hello"
console.log(false && "hello");     // false
console.log(null && "hello");      // null

// Practical use: conditional execution
let user = { name: "John" };
user && console.log(user.name);    // "John" (executes)

let noUser = null;
noUser && console.log(noUser.name); // null (doesn't execute, no error)

// || returns first truthy value or last value
console.log(false || "default");   // "default"
console.log("value" || "default"); // "value"
console.log(0 || "default");       // "default"

// Practical use: default values
function greet(name) {
    name = name || "Guest";
    return `Hello, ${name}!`;
}

console.log(greet("John"));  // "Hello, John!"
console.log(greet());        // "Hello, Guest!"
```

## Practical Tasks

### Task 1: Grade Calculator
Create a function that calculates letter grades based on numeric scores.

```javascript
function calculateGrade(score) {
    // Use comparison and ternary operators
    // 90-100: A, 80-89: B, 70-79: C, 60-69: D, below 60: F
    // Return the letter grade
}

// Test cases
console.log(calculateGrade(95));  // "A"
console.log(calculateGrade(82));  // "B"
console.log(calculateGrade(55));  // "F"
```

### Task 2: Shipping Cost Calculator
Calculate shipping cost based on conditions.

```javascript
function calculateShipping(weight, distance, isPremium) {
    // Base rate: $5
    // Add $2 per kg over 5kg
    // Add $1 per 100km over 500km
    // Premium members get 20% discount
    // Use arithmetic and logical operators
}

// Test cases
console.log(calculateShipping(3, 300, false));   // $5
console.log(calculateShipping(7, 600, false));   // $10
console.log(calculateShipping(7, 600, true));    // $8
```

### Task 3: Password Validator
Create a password strength validator.

```javascript
function validatePassword(password) {
    // Check if password:
    // - Has at least 8 characters
    // - Contains at least one number
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // Return true if all conditions met
}

// Test cases
console.log(validatePassword("Pass123"));    // false (too short)
console.log(validatePassword("Password123")); // true
```

### Task 4: Predict the Output
Predict and explain the output:

```javascript
console.log(5 + 3 * 2);
console.log((5 + 3) * 2);
console.log(10 / 2 + 3);
console.log(10 / (2 + 3));
console.log(true && false || true);
console.log(true && (false || true));
console.log(!"");
console.log(!!"");
```

## Best Practices

1. **Use strict equality (`===`)** instead of loose equality (`==`)
2. **Use parentheses** to make operator precedence clear
3. **Prefer `??` over `||`** for default values when 0 or "" are valid
4. **Use `+=`, `-=`, etc.** instead of `x = x + y` for clarity
5. **Avoid complex nested ternary operators** - use if-else for readability
6. **Use logical operators** for short-circuit evaluation and defaults
7. **Be aware of type coercion** when using operators
8. **Use optional chaining (`?.`)** to safely access nested properties

```javascript
// Good
const price = basePrice ?? 0;  // 0 is valid
const total = price + tax;
const discount = isPremium ? 0.2 : 0.1;

// Avoid
const price = basePrice || 0;  // 0 would trigger default
const total = price + (tax);   // unnecessary parentheses
const discount = isPremium ? (isMember ? (hasCode ? 0.3 : 0.2) : 0.15) : 0.1;
```

## Operator Precedence

Operators are evaluated in this order (highest to lowest):

1. Grouping: `()`
2. Member access: `.` `[]`
3. Function call: `()`
4. Postfix increment/decrement: `++` `--`
5. Logical NOT, Unary: `!` `~` `+` `-` `typeof` `delete`
6. Exponentiation: `**`
7. Multiplication/Division: `*` `/` `%`
8. Addition/Subtraction: `+` `-`
9. Comparison: `<` `<=` `>` `>=`
10. Equality: `==` `===` `!=` `!==`
11. Logical AND: `&&`
12. Logical OR: `||`
13. Nullish coalescing: `??`
14. Conditional: `? :`
15. Assignment: `=` `+=` `-=` etc.

```javascript
// Understanding precedence
console.log(2 + 3 * 4);     // 14 (not 20)
console.log((2 + 3) * 4);   // 20
console.log(true || false && false);  // true
console.log((true || false) && false); // false
```

## Common Pitfalls

1. **Using `==` instead of `===`** - can cause unexpected type coercion
2. **Confusing `=` with `==` or `===`** in conditions
3. **Not understanding operator precedence** - leads to incorrect calculations
4. **Floating-point precision issues** with arithmetic
5. **Post vs pre increment** confusion
6. **Forgetting `||` and `&&` return values**, not just booleans

```javascript
// Common mistakes
if (x = 5) { }          // Always true (assignment, not comparison)
if (x == 5) { }         // Correct for comparison

console.log(0.1 + 0.2); // 0.30000000000000004 (floating-point issue)

let x = 5;
console.log(x++);       // 5 (then becomes 6)
console.log(++x);       // 7 (increments first)

console.log(0 || "default");  // "default" (0 is falsy)
console.log(0 ?? "default");  // 0 (only null/undefined use default)
```

## Interview Questions

### Question 1: What's the difference between == and ===?
**Answer:**
- `==` (loose equality) compares values after type coercion
- `===` (strict equality) compares both value and type without coercion
- Always prefer `===` to avoid unexpected behavior
- Example: `5 == "5"` is true, but `5 === "5"` is false

### Question 2: How does short-circuit evaluation work?
**Answer:**
- `&&` returns the first falsy value or the last value if all are truthy
- `||` returns the first truthy value or the last value if all are falsy
- This allows conditional execution: `user && user.getName()`
- And default values: `name || "Guest"`
- The second operand is only evaluated if needed

### Question 3: What's the difference between `||` and `??`?
**Answer:**
- `||` treats all falsy values (false, 0, "", null, undefined, NaN) as triggers for the default
- `??` (nullish coalescing) only treats null and undefined as triggers
- Use `??` when 0, false, or "" are valid values
- Example: `count || 10` returns 10 if count is 0, but `count ?? 10` returns 0

### Question 4: Explain the ternary operator.
**Answer:** The ternary operator (`condition ? valueIfTrue : valueIfFalse`) is a shorthand for if-else statements. It evaluates a condition and returns one of two values based on whether the condition is true or false. It's useful for simple conditional assignments but can become hard to read when nested.

### Question 5: What is operator precedence and why does it matter?
**Answer:** Operator precedence determines the order in which operators are evaluated in an expression. For example, multiplication has higher precedence than addition, so `2 + 3 * 4` equals 14, not 20. Understanding precedence prevents bugs and makes code behavior predictable. When in doubt, use parentheses to make the intended order explicit.

## Additional Resources

- [MDN - Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [MDN - Operator Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- [JavaScript.info - Operators](https://javascript.info/operators)
- [JavaScript.info - Comparisons](https://javascript.info/comparison)
