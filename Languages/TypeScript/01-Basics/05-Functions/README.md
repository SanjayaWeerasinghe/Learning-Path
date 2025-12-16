# Functions

## Introduction

Functions are fundamental building blocks in TypeScript. TypeScript enhances JavaScript functions with type annotations for parameters and return values, optional parameters, default parameters, rest parameters, function overloads, and more, providing type safety and better documentation.

## Key Concepts

### Function Type Annotations

Functions can have type annotations for parameters and return values:

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

### Optional Parameters

Parameters can be marked as optional with `?`:

```typescript
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}
```

### Function Types

Functions themselves can be typed:

```typescript
type MathOperation = (a: number, b: number) => number;
```

## TypeScript-Specific Code Examples

### Example 1: Basic Function Type Annotations

```typescript
// Function with type annotations
function multiply(a: number, b: number): number {
  return a * b;
}

// Arrow function with type annotations
const divide = (a: number, b: number): number => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

// Function with no return value (void)
function logMessage(message: string): void {
  console.log(message);
}

// Function returning never (for functions that never return)
function throwError(message: string): never {
  throw new Error(message);
}

// Function returning never (infinite loop)
function infiniteLoop(): never {
  while (true) {
    // Never returns
  }
}

// Using the functions
const result = multiply(5, 3); // Type: number
divide(10, 2); // Type: number
logMessage("Hello"); // Type: void
```

### Example 2: Optional and Default Parameters

```typescript
// Optional parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

console.log(buildName("John")); // "John"
console.log(buildName("John", "Doe")); // "John Doe"

// Default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"

// Multiple optional parameters
function createUser(
  name: string,
  age?: number,
  email?: string
): object {
  return { name, age, email };
}

console.log(createUser("Alice")); // { name: "Alice", age: undefined, email: undefined }
console.log(createUser("Bob", 30)); // { name: "Bob", age: 30, email: undefined }
console.log(createUser("Charlie", 25, "charlie@example.com"));

// Default parameters with type inference
function calculateTotal(price: number, tax: number = 0.1, discount: number = 0): number {
  return price * (1 + tax) - discount;
}
```

### Example 3: Rest Parameters

```typescript
// Rest parameters with type annotation
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(10, 20, 30, 40)); // 100

// Rest parameters with other parameters
function introduce(greeting: string, ...names: string[]): string {
  return `${greeting} ${names.join(", ")}!`;
}

console.log(introduce("Hello", "Alice", "Bob", "Charlie"));
// "Hello Alice, Bob, Charlie!"

// Rest parameters with tuple types
function combine(separator: string, ...items: [string, number, boolean]): string {
  return items.join(separator);
}

console.log(combine(" - ", "text", 42, true)); // "text - 42 - true"
```

### Example 4: Function Types and Signatures

```typescript
// Function type
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

// Interface for function type
interface StringFormatter {
  (input: string): string;
}

const uppercase: StringFormatter = (input) => input.toUpperCase();
const lowercase: StringFormatter = (input) => input.toLowerCase();

// Function accepting callback
function processNumbers(
  numbers: number[],
  callback: (num: number) => number
): number[] {
  return numbers.map(callback);
}

const doubled = processNumbers([1, 2, 3], (n) => n * 2); // [2, 4, 6]

// Complex function type
type ApiCallback = (error: Error | null, data: any) => void;

function fetchData(url: string, callback: ApiCallback): void {
  // Simulated async operation
  setTimeout(() => {
    callback(null, { data: "some data" });
  }, 1000);
}
```

### Example 5: Function Overloads

```typescript
// Function overload signatures
function createDate(timestamp: number): Date;
function createDate(year: number, month: number, day: number): Date;
function createDate(dateString: string): Date;

// Implementation signature (must be compatible with all overloads)
function createDate(
  timestampOrYearOrString: number | string,
  month?: number,
  day?: number
): Date {
  if (typeof timestampOrYearOrString === "string") {
    return new Date(timestampOrYearOrString);
  } else if (month !== undefined && day !== undefined) {
    return new Date(timestampOrYearOrString, month - 1, day);
  } else {
    return new Date(timestampOrYearOrString);
  }
}

// Usage
const date1 = createDate(1609459200000); // From timestamp
const date2 = createDate(2023, 1, 15); // From year, month, day
const date3 = createDate("2023-01-15"); // From string

// Another example with different return types
function getValue(key: string): string;
function getValue(key: number): number;
function getValue(key: string | number): string | number {
  if (typeof key === "string") {
    return `String value for ${key}`;
  } else {
    return key * 2;
  }
}

const strValue = getValue("name"); // Type: string
const numValue = getValue(42); // Type: number
```

### Example 6: Generic Functions

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42); // Type: number
const str = identity<string>("hello"); // Type: string
const auto = identity(true); // Type inferred as boolean

// Generic function with constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK - string has length
logLength([1, 2, 3]); // OK - array has length
logLength({ length: 10, value: 3 }); // OK - object has length
// logLength(123); // Error - number doesn't have length

// Generic function with multiple type parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30 });
// Type: { name: string } & { age: number }
console.log(merged.name, merged.age);

// Generic array function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNum = getFirstElement([1, 2, 3]); // Type: number | undefined
const firstName = getFirstElement(["a", "b", "c"]); // Type: string | undefined
```

### Example 7: This Parameter Type

```typescript
// Specifying the type of 'this'
interface User {
  name: string;
  greet(this: User): void;
}

const user: User = {
  name: "Alice",
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

user.greet(); // OK
const greetFn = user.greet;
// greetFn(); // Error: The 'this' context of type 'void' is not assignable to method's 'this' of type 'User'

// Function with explicit this parameter
function formatMessage(this: { prefix: string }, message: string): string {
  return `${this.prefix}: ${message}`;
}

const logger = {
  prefix: "LOG",
  log: formatMessage
};

console.log(logger.log("System started")); // "LOG: System started"
```

### Example 8: Callback Functions and Promises

```typescript
// Callback function types
type Callback<T> = (error: Error | null, result: T | null) => void;

function readFile(path: string, callback: Callback<string>): void {
  // Simulated async file reading
  setTimeout(() => {
    if (path) {
      callback(null, "file contents");
    } else {
      callback(new Error("Invalid path"), null);
    }
  }, 1000);
}

// Promise-based functions
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "User " + id });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
}

// Async/await with proper typing
async function getUserData(id: number): Promise<string> {
  try {
    const user = await fetchUser(id);
    return `User: ${user.name}`;
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}

// Using the async function
getUserData(1).then(console.log).catch(console.error);
```

## Practical Tasks

### Task 1: Calculator with Function Overloads
Create a calculator that uses function overloads:
1. Create overloaded signatures for different number of parameters
2. Implement basic operations (add, subtract, multiply, divide)
3. Handle both single values and arrays of numbers
4. Add proper type annotations and return types
5. Include error handling for division by zero

### Task 2: Generic Array Utilities
Build a set of generic utility functions:
1. Create a generic filter function with type guards
2. Implement a generic map function
3. Create a generic find function
4. Implement a generic reduce function
5. Add proper type constraints and return types

### Task 3: Event Handler System
Design a type-safe event handling system:
1. Create function types for different event handlers
2. Implement subscribe/unsubscribe functions
3. Use proper typing for event data
4. Handle optional parameters in event handlers
5. Implement callback queues with proper types

### Task 4: Data Validator Functions
Build a validation system using functions:
1. Create validator functions with specific return types
2. Implement validators for different data types
3. Use function composition for complex validations
4. Add optional configuration parameters
5. Return detailed error information with proper types

## Best Practices

1. **Always Type Parameters**: Explicitly type function parameters
2. **Type Return Values**: Explicitly type function return values for clarity
3. **Use Optional Parameters Carefully**: Place optional parameters at the end
4. **Prefer Default Parameters**: Over optional when there's a sensible default
5. **Use Rest Parameters**: For variable-length argument lists
6. **Use Function Overloads**: When functions behave differently based on arguments
7. **Use Generics**: For reusable type-safe functions
8. **Avoid any**: Use unknown or proper types instead
9. **Use void Appropriately**: For functions that don't return values
10. **Use never**: For functions that never return (throw errors or infinite loops)

## Interview Questions

### Question 1: What's the difference between optional and default parameters?
**Answer**:

**Optional Parameters** (with `?`):
- May be omitted when calling the function
- Have type `T | undefined`
- No default value is assigned

```typescript
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

greet("Alice"); // greeting is undefined
greet("Bob", "Hi"); // greeting is "Hi"
```

**Default Parameters**:
- Can be omitted when calling the function
- Have a default value assigned
- Type is just `T`, not `T | undefined`

```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

greet("Alice"); // greeting is "Hello"
greet("Bob", "Hi"); // greeting is "Hi"
```

Prefer default parameters when there's a sensible default value.

### Question 2: Explain function overloads in TypeScript
**Answer**: Function overloads allow you to define multiple function signatures for the same function, enabling different parameter types or counts while maintaining type safety.

```typescript
// Overload signatures
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;

// Implementation signature
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "YES" : "NO";
  }
}

const s = format("hello"); // Type: string
const n = format(42); // Type: string
const b = format(true); // Type: string
```

Key points:
- Overload signatures define the function's public API
- Implementation signature must be compatible with all overloads
- TypeScript uses the most specific matching overload
- Implementation signature is not directly callable

### Question 3: What are rest parameters and how do you type them?
**Answer**: Rest parameters allow functions to accept an indefinite number of arguments as an array. In TypeScript, you type them by specifying the array type.

```typescript
// Basic rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3); // 6
sum(10, 20, 30, 40); // 100

// Rest parameters with other parameters
function format(template: string, ...values: (string | number)[]): string {
  return template + " " + values.join(", ");
}

format("Values:", 1, "two", 3); // "Values: 1, two, 3"

// Rest parameters with tuple types
function createCoordinate(...coords: [number, number, number?]): object {
  return { x: coords[0], y: coords[1], z: coords[2] };
}
```

Important rules:
- Must be the last parameter
- Can only have one rest parameter
- Typed as an array
- Can use tuple types for specific lengths

### Question 4: How do generics work in functions?
**Answer**: Generic functions allow you to write reusable, type-safe code that works with multiple types while preserving type information.

```typescript
// Basic generic function
function identity<T>(arg: T): T {
  return arg;
}

identity<number>(42); // Type: number
identity<string>("hello"); // Type: string
identity(true); // Type inferred as boolean

// Generic with constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
// logLength(42); // Error

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair("age", 30); // Type: [string, number]
```

Benefits:
- Type safety without sacrificing reusability
- Type inference reduces boilerplate
- Constraints ensure type compatibility
- Better than using `any`

### Question 5: What's the difference between void and never return types?
**Answer**:

**`void`**: Function doesn't return a meaningful value (but does return)
```typescript
function log(message: string): void {
  console.log(message);
  // Implicitly returns undefined
}

const result = log("Hello"); // Type: void (actually undefined)
```

**`never`**: Function never returns (throws error or infinite loop)
```typescript
function throwError(message: string): never {
  throw new Error(message);
  // Never reaches the end
}

function infiniteLoop(): never {
  while (true) {
    // Never returns
  }
}
```

Key differences:
- `void` functions complete execution, `never` functions don't
- `void` is assignable to `undefined`, `never` isn't assignable to anything
- `never` is useful for exhaustive type checking
- `void` is for side effects, `never` for control flow

## Comparison with JavaScript

| Feature | JavaScript | TypeScript |
|---------|-----------|------------|
| Parameter Types | No | Yes |
| Return Type Annotation | No | Yes |
| Optional Parameters | Check manually | `?` syntax |
| Function Overloads | No | Yes |
| Generics | No | Yes |
| Type Checking | Runtime only | Compile-time |
| this Type | Dynamic | Can be typed |

```javascript
// JavaScript
function add(a, b) {
  return a + b;
}

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
```

## Additional Resources

- [TypeScript Handbook - Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
- [Generic Functions](https://www.typescriptlang.org/docs/handbook/2/generics.html)
