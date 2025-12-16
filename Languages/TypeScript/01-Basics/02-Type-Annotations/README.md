# Type Annotations

## Introduction

Type annotations are the foundation of TypeScript's type system. They allow you to explicitly specify the types of variables, function parameters, and return values, enabling compile-time type checking and better code documentation.

## Key Concepts

### Basic Type Annotations

TypeScript supports several primitive types:

- `string`: Text values
- `number`: Numeric values (integers and floats)
- `boolean`: true/false values
- `null`: Null value
- `undefined`: Undefined value
- `any`: Any type (avoid when possible)
- `void`: Absence of a value (used in functions)
- `never`: Values that never occur

### Type Inference

TypeScript can automatically infer types based on the assigned value:

```typescript
let name = "John"; // TypeScript infers type as string
let age = 30; // TypeScript infers type as number
```

## TypeScript-Specific Code Examples

### Example 1: Primitive Type Annotations

```typescript
// String type
let username: string = "Alice";
let greeting: string = `Hello, ${username}`;

// Number type
let age: number = 25;
let price: number = 19.99;
let hexValue: number = 0xf00d;

// Boolean type
let isActive: boolean = true;
let hasPermission: boolean = false;

// Any type (avoid when possible)
let randomValue: any = "hello";
randomValue = 42;
randomValue = true;

// Null and undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
```

### Example 2: Array Type Annotations

```typescript
// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];

// Array of numbers
let scores: number[] = [90, 85, 95];

// Alternative array syntax
let fruits: Array<string> = ["apple", "banana", "orange"];

// Mixed type array (not recommended)
let mixed: any[] = [1, "two", true];

// Array of arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6]
];
```

### Example 3: Object Type Annotations

```typescript
// Object with explicit type
let user: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Nested objects
let person: {
  name: string;
  address: {
    street: string;
    city: string;
  };
} = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "New York"
  }
};

// Optional properties
let config: {
  host: string;
  port?: number; // Optional property
} = {
  host: "localhost"
};
```

### Example 4: Function Type Annotations

```typescript
// Function with parameter and return type annotations
function add(a: number, b: number): number {
  return a + b;
}

// Function with no return value
function logMessage(message: string): void {
  console.log(message);
}

// Arrow function with type annotations
const multiply = (x: number, y: number): number => {
  return x * y;
};

// Function with optional parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

// Function with default parameters
function createUser(name: string, age: number = 18): object {
  return { name, age };
}

// Function with rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}
```

### Example 5: Type Inference Examples

```typescript
// TypeScript infers the type automatically
let inferredString = "Hello"; // Type: string
let inferredNumber = 42; // Type: number
let inferredBoolean = true; // Type: boolean

// Inference with arrays
let inferredArray = [1, 2, 3]; // Type: number[]
let mixedArray = [1, "two", 3]; // Type: (string | number)[]

// Inference with objects
let inferredObject = {
  name: "Alice",
  age: 30
}; // Type: { name: string; age: number; }

// Inference with functions
function inferredReturn(x: number) {
  return x * 2; // Return type inferred as number
}

// Best practice: Let TypeScript infer when obvious
const colors = ["red", "green", "blue"]; // Inferred as string[]

// Use explicit types when inference might be wrong or unclear
const result: number = parseFloat("3.14");
```

### Example 6: Tuple Types

```typescript
// Tuple with fixed length and types
let tuple: [string, number] = ["Alice", 30];

// Accessing tuple elements
let name: string = tuple[0];
let age: number = tuple[1];

// Tuple with optional elements
let optionalTuple: [string, number?] = ["Bob"];

// Tuple with rest elements
let restTuple: [string, ...number[]] = ["scores", 90, 85, 95];

// Practical example: function returning multiple values
function getUser(): [string, number, boolean] {
  return ["Alice", 30, true];
}

const [userName, userAge, isActive] = getUser();
```

### Example 7: Literal Types

```typescript
// String literal types
let direction: "north" | "south" | "east" | "west";
direction = "north"; // Valid
// direction = "up"; // Error

// Number literal types
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;
diceRoll = 4; // Valid
// diceRoll = 7; // Error

// Boolean literal type
let isTrue: true = true;
// isTrue = false; // Error

// Combining literal types
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";
```

### Example 8: Union Types

```typescript
// Variable that can be multiple types
let id: string | number;
id = "ABC123"; // Valid
id = 12345; // Valid

// Function with union type parameter
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}

printId("ABC"); // Valid
printId(123); // Valid

// Array with union types
let mixed: (string | number)[] = ["Alice", 30, "Bob", 25];

// Type narrowing with typeof
function process(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // TypeScript knows it's a string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's a number
  }
}
```

## Practical Tasks

### Task 1: Basic Type Annotations Practice
Create a TypeScript file that demonstrates all primitive types:
1. Declare variables with explicit type annotations for string, number, boolean, null, and undefined
2. Create arrays of different types
3. Create an object with multiple properties of different types
4. Create a function that uses various type annotations

### Task 2: Build a User Profile System
Create a user profile management system with proper type annotations:
1. Define user objects with name (string), age (number), email (string), and isActive (boolean)
2. Create a function to create a new user profile
3. Create a function to update user information with optional parameters
4. Create a function to format user information for display

### Task 3: Type Inference vs Explicit Typing
Create examples that demonstrate when to use type inference vs explicit typing:
1. Create variables where type inference is sufficient
2. Create variables where explicit typing is necessary
3. Create functions with inferred return types
4. Create functions where explicit return types improve clarity

### Task 4: Advanced Type Annotations
Practice with complex type scenarios:
1. Create nested object types
2. Use tuple types to return multiple values from a function
3. Create union types for variables that can hold multiple types
4. Use literal types to restrict values to specific options

## Best Practices

1. **Use Type Inference When Obvious**: Let TypeScript infer types when they're clear from the assignment
2. **Annotate Function Parameters**: Always explicitly type function parameters
3. **Annotate Function Returns**: Explicitly type function return values for clarity
4. **Avoid `any` Type**: Use `unknown` or proper types instead of `any`
5. **Use Union Types**: When a value can be multiple types, use union types instead of `any`
6. **Use Literal Types**: For values restricted to specific options, use literal types
7. **Enable Strict Mode**: Use `"strict": true` in tsconfig.json
8. **Consistent Naming**: Use clear, descriptive names for variables
9. **Use `readonly` for Constants**: Mark properties that shouldn't change as readonly
10. **Type Complex Objects**: Always provide type annotations for complex object structures

## Interview Questions

### Question 1: What is the difference between type annotation and type inference?
**Answer**:
- **Type Annotation**: Explicitly specifying the type of a variable, parameter, or return value
  ```typescript
  let name: string = "Alice"; // Explicit annotation
  ```
- **Type Inference**: TypeScript automatically determines the type based on the assigned value
  ```typescript
  let name = "Alice"; // TypeScript infers type as string
  ```

Type inference reduces boilerplate while maintaining type safety. Use explicit annotations for function parameters, return types, and when the inferred type isn't clear.

### Question 2: When should you use the `any` type?
**Answer**: The `any` type should be avoided when possible because it disables type checking. Valid use cases include:
- Migrating JavaScript code to TypeScript gradually
- Working with dynamic content where types are truly unknown
- Interacting with third-party libraries without type definitions

Better alternatives:
- Use `unknown` for values with unknown types (requires type checking)
- Use union types when you know the possible types
- Use generics for reusable type-safe code

```typescript
// Avoid
let data: any = fetchData();

// Better
let data: unknown = fetchData();
if (typeof data === 'string') {
  console.log(data.toUpperCase());
}
```

### Question 3: What are literal types in TypeScript?
**Answer**: Literal types allow you to specify exact values a variable can hold, not just general types. They're useful for creating type-safe constants and restricting values to specific options.

```typescript
// String literal types
type Direction = "north" | "south" | "east" | "west";
let heading: Direction = "north"; // Valid
// let heading: Direction = "up"; // Error

// Numeric literal types
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4;

// Boolean literal types
let success: true = true;
```

Literal types are often used with union types to create enumerations of allowed values.

### Question 4: Explain the difference between `void` and `undefined`
**Answer**:
- **`void`**: Used as return type for functions that don't return a value. The function can return undefined or nothing at all.
  ```typescript
  function log(message: string): void {
    console.log(message);
    // No return statement needed
  }
  ```

- **`undefined`**: An actual value type. A variable of type undefined can only hold the value undefined.
  ```typescript
  let value: undefined = undefined;
  ```

Key difference: A function with return type `void` can be called without using the return value, while a function returning `undefined` explicitly returns the undefined value.

### Question 5: How do union types work in TypeScript?
**Answer**: Union types allow a variable to hold values of multiple types, separated by the `|` operator. TypeScript uses type narrowing to safely work with union types.

```typescript
function printId(id: string | number): void {
  // Type narrowing with typeof
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(id.toFixed(2)); // TypeScript knows it's number
  }
}

printId("ABC123");
printId(42);
```

Union types are useful for:
- Function parameters that accept multiple types
- API responses that can be success or error
- Variables that change type based on state

## Comparison with JavaScript

| Feature | JavaScript | TypeScript |
|---------|-----------|------------|
| Type Checking | Runtime only | Compile-time and runtime |
| Type Annotations | Not available | Explicit type annotations |
| Type Inference | Implicit, dynamic | Static type inference |
| Type Safety | No compile-time checks | Strong compile-time checks |
| Documentation | Comments needed | Types serve as documentation |
| Refactoring | Error-prone | Safe with type checking |
| IDE Support | Basic | Advanced (autocomplete, type hints) |

```javascript
// JavaScript - No type safety
function add(a, b) {
  return a + b;
}
add(5, "10"); // Returns "510" - unexpected!

// TypeScript - Type safety
function add(a: number, b: number): number {
  return a + b;
}
// add(5, "10"); // Compile error!
```

## Additional Resources

- [TypeScript Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [TypeScript Deep Dive - Types](https://basarat.gitbook.io/typescript/type-system)
- [Type Inference in TypeScript](https://www.typescriptlang.org/docs/handbook/type-inference.html)
