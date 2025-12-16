# Data Types in JavaScript

## Introduction

JavaScript is a dynamically typed language, meaning variables can hold values of any type without type declaration. Understanding data types is fundamental to working with JavaScript effectively.

## Key Concepts

### JavaScript Data Types

JavaScript has **8 data types**:
- **7 Primitive types**: String, Number, BigInt, Boolean, Undefined, Null, Symbol
- **1 Reference type**: Object (includes Arrays, Functions, Dates, etc.)

### 1. Primitive Data Types

Primitive values are immutable and stored directly in the variable.

#### String
Represents textual data enclosed in quotes.

```javascript
let name = "John";
let greeting = 'Hello';
let message = `Welcome, ${name}!`; // Template literal

// Strings are immutable
let str = "Hello";
str[0] = "h"; // Doesn't change the string
console.log(str); // "Hello"
```

#### Number
Represents both integer and floating-point numbers.

```javascript
let age = 25;
let price = 99.99;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN;

console.log(typeof age); // "number"
console.log(typeof NaN); // "number" (special case)
```

#### BigInt
Represents integers larger than 2^53 - 1.

```javascript
let bigNumber = 1234567890123456789012345678901234567890n;
let anotherBig = BigInt("9007199254740991");

console.log(typeof bigNumber); // "bigint"
```

#### Boolean
Represents logical values: `true` or `false`.

```javascript
let isActive = true;
let hasPermission = false;

// Truthy and Falsy values
// Falsy: false, 0, "", null, undefined, NaN
// Truthy: everything else
```

#### Undefined
Represents a variable that has been declared but not assigned a value.

```javascript
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"

function noReturn() {}
console.log(noReturn()); // undefined
```

#### Null
Represents intentional absence of any object value.

```javascript
let emptyValue = null;
console.log(typeof null); // "object" (known JavaScript bug)

// null vs undefined
let a = null;      // intentional absence
let b = undefined; // not yet defined
let c;             // undefined by default
```

#### Symbol
Represents a unique identifier (ES6).

```javascript
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2); // false - each symbol is unique
console.log(typeof id1);  // "symbol"
```

### 2. Reference Data Type (Object)

Objects are collections of key-value pairs and are mutable.

#### Object Literals

```javascript
let person = {
    name: "John",
    age: 30,
    isEmployed: true
};

console.log(typeof person); // "object"
```

#### Arrays

```javascript
let colors = ["red", "green", "blue"];
let mixed = [1, "two", true, null];

console.log(typeof colors); // "object"
console.log(Array.isArray(colors)); // true
```

#### Functions

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(typeof greet); // "function"
```

#### Other Built-in Objects

```javascript
let now = new Date();
let pattern = /ab+c/;
let map = new Map();
let set = new Set();

console.log(typeof now);     // "object"
console.log(typeof pattern); // "object"
```

### 3. Type Checking with typeof

```javascript
console.log(typeof "hello");        // "string"
console.log(typeof 42);             // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof null);           // "object" (bug in JavaScript)
console.log(typeof Symbol("id"));   // "symbol"
console.log(typeof 123n);           // "bigint"
console.log(typeof {});             // "object"
console.log(typeof []);             // "object"
console.log(typeof function() {}); // "function"
```

### 4. Type Conversion

#### Implicit Conversion (Coercion)

```javascript
// String conversion
let result = "5" + 2;        // "52" (number to string)
let result2 = "5" - 2;       // 3 (string to number)

// Number conversion
let num1 = "5" * "2";        // 10
let num2 = "hello" - 5;      // NaN

// Boolean conversion
if ("hello") {               // "hello" is truthy
    console.log("Truthy!");
}

if (0) {                     // 0 is falsy
    console.log("Won't run");
}
```

#### Explicit Conversion

```javascript
// To String
let num = 123;
String(num);           // "123"
num.toString();        // "123"
num + "";              // "123"

// To Number
let str = "456";
Number(str);           // 456
parseInt(str);         // 456
parseFloat("3.14");    // 3.14
+str;                  // 456

// To Boolean
Boolean(1);            // true
Boolean(0);            // false
Boolean("hello");      // true
Boolean("");           // false
!!value;              // double negation to boolean
```

## Code Examples

### Example 1: Primitive vs Reference Types

```javascript
// Primitive types - passed by value
let a = 10;
let b = a;
b = 20;

console.log(a); // 10 (unchanged)
console.log(b); // 20

// Reference types - passed by reference
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;

console.log(obj1.value); // 20 (changed!)
console.log(obj2.value); // 20
```

### Example 2: Type Checking Utility

```javascript
function getType(value) {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
}

console.log(getType(42));           // "number"
console.log(getType("hello"));      // "string"
console.log(getType(null));         // "null"
console.log(getType([]));           // "array"
console.log(getType({}));           // "object"
```

### Example 3: Working with Different Types

```javascript
// Number operations
let num1 = 10;
let num2 = 3;
console.log(num1 + num2);  // 13
console.log(num1 / num2);  // 3.3333...
console.log(num1 % num2);  // 1
console.log(num1 ** num2); // 1000

// String operations
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName); // "John Doe"
console.log(fullName.length); // 8

// Boolean operations
let isAdult = true;
let hasLicense = false;
console.log(isAdult && hasLicense); // false
console.log(isAdult || hasLicense); // true
console.log(!isAdult);              // false
```

### Example 4: Truthy and Falsy Values

```javascript
// Falsy values: false, 0, "", null, undefined, NaN
function checkTruthiness(value) {
    if (value) {
        console.log(`${value} is truthy`);
    } else {
        console.log(`${value} is falsy`);
    }
}

checkTruthiness(true);      // truthy
checkTruthiness(false);     // falsy
checkTruthiness(0);         // falsy
checkTruthiness("");        // falsy
checkTruthiness("hello");   // truthy
checkTruthiness(null);      // falsy
checkTruthiness(undefined); // falsy
checkTruthiness([]);        // truthy (empty array is an object)
checkTruthiness({});        // truthy (empty object)
```

## Practical Tasks

### Task 1: Type Converter
Create a function that converts values to different types and handles edge cases.

```javascript
function convertType(value, targetType) {
    // Convert value to targetType ("string", "number", "boolean")
    // Handle edge cases (NaN, null, undefined)
    // Return the converted value
}

// Test cases
console.log(convertType("123", "number"));      // 123
console.log(convertType(456, "string"));        // "456"
console.log(convertType("hello", "boolean"));   // true
console.log(convertType(0, "boolean"));         // false
```

### Task 2: Data Type Validator
Create a function that validates if a value matches the expected type.

```javascript
function validateType(value, expectedType) {
    // Return true if value matches expectedType
    // Handle special cases: null, array, date
}

// Test cases
console.log(validateType("hello", "string"));   // true
console.log(validateType([], "array"));         // true
console.log(validateType(null, "null"));        // true
console.log(validateType(42, "string"));        // false
```

### Task 3: Deep vs Shallow Copy
Create functions to demonstrate shallow and deep copying.

```javascript
// Create a function that does shallow copy
function shallowCopy(obj) {
    // Your code here
}

// Create a function that does deep copy
function deepCopy(obj) {
    // Your code here
}

// Test with nested objects
const original = { a: 1, b: { c: 2 } };
```

### Task 4: Type Coercion Quiz
Predict and explain the output of these operations:

```javascript
console.log(5 + "5");
console.log(5 - "5");
console.log("5" * "5");
console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log(true + true);
console.log(true + false);
```

## Best Practices

1. **Use strict equality (`===`)** instead of `==` to avoid type coercion
2. **Be explicit with conversions** - use `Number()`, `String()`, `Boolean()` instead of relying on coercion
3. **Check for null/undefined** before accessing properties
4. **Use `Array.isArray()`** to check for arrays, not `typeof`
5. **Validate input types** in functions
6. **Use meaningful variable names** that indicate the expected type
7. **Avoid mixing types** in operations when possible
8. **Use TypeScript or JSDoc** for type safety in larger projects

```javascript
// Good practices
function calculateTotal(price, quantity) {
    if (typeof price !== "number" || typeof quantity !== "number") {
        throw new TypeError("Arguments must be numbers");
    }
    return price * quantity;
}

// Checking for null/undefined
function processUser(user) {
    if (user == null) { // checks both null and undefined
        return "No user";
    }
    return user.name;
}
```

## Common Pitfalls

1. **typeof null returns "object"** - known JavaScript bug
2. **typeof array returns "object"** - use `Array.isArray()` instead
3. **NaN is of type "number"** - use `Number.isNaN()` to check
4. **Empty arrays/objects are truthy** - check `.length` or `Object.keys()`
5. **Comparing different types** with `==` can give unexpected results
6. **Floating-point precision** issues with numbers

```javascript
// Pitfalls examples
console.log(typeof null);              // "object" (not "null")
console.log(typeof []);                // "object" (not "array")
console.log(typeof NaN);               // "number"
console.log(0.1 + 0.2 === 0.3);       // false
console.log("2" == 2);                 // true (type coercion)
console.log("2" === 2);                // false (no coercion)
```

## Interview Questions

### Question 1: What are the primitive data types in JavaScript?
**Answer:** JavaScript has 7 primitive data types:
1. String - textual data
2. Number - integers and floating-point numbers
3. BigInt - large integers beyond Number safe range
4. Boolean - true or false
5. Undefined - variable declared but not assigned
6. Null - intentional absence of value
7. Symbol - unique identifier

All other types (Arrays, Objects, Functions, etc.) are reference types based on Object.

### Question 2: What's the difference between null and undefined?
**Answer:**
- `undefined` means a variable has been declared but not assigned a value, or a function doesn't return anything
- `null` is an intentional assignment representing "no value" or "empty"
- `typeof undefined` returns "undefined", `typeof null` returns "object" (JavaScript bug)
- Both are falsy values, but `null == undefined` is true while `null === undefined` is false

### Question 3: What's the difference between primitive and reference types?
**Answer:**
- **Primitive types** (String, Number, Boolean, etc.) are immutable and stored directly in the variable. When assigned to another variable, the value is copied.
- **Reference types** (Objects, Arrays, Functions) are mutable and stored by reference. When assigned to another variable, only the reference is copied, so both variables point to the same object in memory.

### Question 4: Why does typeof [] return "object"?
**Answer:** Arrays are technically objects in JavaScript - they're a special type of object with numeric indices and additional methods. To properly check for arrays, use `Array.isArray(value)` instead of `typeof`.

### Question 5: What are truthy and falsy values?
**Answer:** In JavaScript, values are coerced to boolean in conditional contexts.
- **Falsy values** (6 total): `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`
- **Truthy values**: Everything else, including `"0"`, `"false"`, `[]`, `{}`, and any non-zero number

This is important for conditional statements and logical operations.

## Additional Resources

- [MDN - Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN - typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [JavaScript.info - Data Types](https://javascript.info/types)
- [Type Coercion in JavaScript](https://javascript.info/type-conversions)
