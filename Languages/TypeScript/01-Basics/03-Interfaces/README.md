# Interfaces

## Introduction

Interfaces in TypeScript are powerful constructs that define contracts for object shapes. They describe the structure of objects, including property names, types, and whether properties are optional or readonly. Interfaces are one of the core ways TypeScript provides type checking and code documentation.

## Key Concepts

### Interface Definition

An interface defines the shape of an object:

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}
```

### Optional Properties

Properties can be marked as optional with the `?` operator:

```typescript
interface Config {
  host: string;
  port?: number; // Optional property
}
```

### Readonly Properties

Properties can be marked as readonly to prevent modification:

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}
```

## TypeScript-Specific Code Examples

### Example 1: Basic Interface Definition

```typescript
// Define an interface for a user
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Create an object that conforms to the interface
const user: User = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  isActive: true
};

// Function that accepts User interface
function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}

console.log(greetUser(user));
```

### Example 2: Optional Properties

```typescript
// Interface with optional properties
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string; // Optional
  inStock?: boolean; // Optional
}

// Valid with all properties
const product1: Product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  description: "High-performance laptop",
  inStock: true
};

// Valid without optional properties
const product2: Product = {
  id: 2,
  name: "Mouse",
  price: 29.99
};

// Function with optional parameters using interface
function displayProduct(product: Product): void {
  console.log(`${product.name}: $${product.price}`);
  if (product.description) {
    console.log(`Description: ${product.description}`);
  }
}
```

### Example 3: Readonly Properties

```typescript
// Interface with readonly properties
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// Readonly array
interface DataSet {
  readonly values: readonly number[];
}

const data: DataSet = {
  values: [1, 2, 3, 4, 5]
};

// data.values.push(6); // Error: Property 'push' does not exist
// data.values[0] = 10; // Error: Index signature in type 'readonly number[]' only permits reading
```

### Example 4: Function Types in Interfaces

```typescript
// Interface defining function types
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// Implementing the interface
const calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
};

// Interface for callback functions
interface SearchCallback {
  (error: Error | null, results: string[]): void;
}

function search(query: string, callback: SearchCallback): void {
  // Simulate async search
  setTimeout(() => {
    callback(null, ["result1", "result2"]);
  }, 1000);
}
```

### Example 5: Extending Interfaces

```typescript
// Base interface
interface Animal {
  name: string;
  age: number;
}

// Extended interface
interface Dog extends Animal {
  breed: string;
  bark(): void;
}

// Multiple interface extension
interface Pet {
  owner: string;
}

interface ServiceDog extends Dog, Pet {
  task: string;
}

const myDog: ServiceDog = {
  name: "Buddy",
  age: 5,
  breed: "Golden Retriever",
  owner: "John Doe",
  task: "Guide dog",
  bark: () => console.log("Woof!")
};
```

### Example 6: Index Signatures

```typescript
// Interface with string index signature
interface StringDictionary {
  [key: string]: string;
}

const dictionary: StringDictionary = {
  hello: "greeting",
  goodbye: "farewell",
  thanks: "gratitude"
};

// Interface with number index signature
interface NumberArray {
  [index: number]: number;
}

const scores: NumberArray = [90, 85, 95, 88];

// Mixed index signature with known properties
interface Config {
  host: string;
  port: number;
  [key: string]: string | number; // Additional dynamic properties
}

const config: Config = {
  host: "localhost",
  port: 3000,
  timeout: 5000,
  protocol: "https"
};
```

### Example 7: Implementing Interfaces in Classes

```typescript
// Interface definition
interface Vehicle {
  brand: string;
  model: string;
  year: number;
  start(): void;
  stop(): void;
}

// Class implementing interface
class Car implements Vehicle {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  start(): void {
    console.log(`${this.brand} ${this.model} is starting...`);
  }

  stop(): void {
    console.log(`${this.brand} ${this.model} is stopping...`);
  }

  // Additional method not in interface
  honk(): void {
    console.log("Beep beep!");
  }
}

const myCar = new Car("Toyota", "Camry", 2023);
myCar.start();
```

### Example 8: Hybrid Types

```typescript
// Interface that acts as both function and object
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function createCounter(): Counter {
  const counter = function(start: number): string {
    return `Count: ${start}`;
  } as Counter;

  counter.interval = 1000;
  counter.reset = function() {
    console.log("Counter reset");
  };

  return counter;
}

const myCounter = createCounter();
console.log(myCounter(10)); // "Count: 10"
console.log(myCounter.interval); // 1000
myCounter.reset(); // "Counter reset"
```

## Practical Tasks

### Task 1: Create a User Management Interface
Build a user management system with interfaces:
1. Create a `User` interface with id, name, email, and optional phone
2. Create an `Address` interface with street, city, state, and zip
3. Extend the User interface to include an address property
4. Create functions to create, update, and display users
5. Implement validation for user data

### Task 2: Build a Product Catalog
Create a product catalog system:
1. Define a `Product` interface with required and optional properties
2. Create a `Category` interface
3. Create a `ProductWithCategory` interface that extends both
4. Implement CRUD operations using these interfaces
5. Create a search function that filters products

### Task 3: API Response Interface
Design interfaces for API responses:
1. Create a generic `ApiResponse` interface with status, message, and data
2. Create specific interfaces for success and error responses
3. Implement functions that return properly typed API responses
4. Create type guards to check response types
5. Build a mock API client using these interfaces

### Task 4: Configuration System
Build a type-safe configuration system:
1. Create interfaces for different configuration sections (database, server, logging)
2. Use readonly properties for immutable config values
3. Use optional properties for non-required settings
4. Create a main Config interface combining all sections
5. Implement a function to validate configuration

## Best Practices

1. **Prefer Interfaces for Object Shapes**: Use interfaces to define object structures
2. **Use Descriptive Names**: Name interfaces clearly (e.g., `User`, `Product`, not `IUser`, `IProduct`)
3. **Mark Immutable Properties as Readonly**: Use `readonly` for properties that shouldn't change
4. **Use Optional Properties Appropriately**: Mark properties as optional only when they're truly optional
5. **Extend Interfaces**: Use interface extension to build on existing interfaces
6. **Keep Interfaces Focused**: Each interface should have a single, clear purpose
7. **Use Index Signatures Sparingly**: Only use when you truly need dynamic properties
8. **Document Complex Interfaces**: Add JSDoc comments for complex interfaces
9. **Prefer Interface over Type for Objects**: Interfaces are more extensible than type aliases
10. **Use Interface Segregation**: Create smaller, focused interfaces rather than large ones

## Interview Questions

### Question 1: What is an interface in TypeScript?
**Answer**: An interface in TypeScript is a contract that defines the structure of an object. It specifies what properties and methods an object should have, along with their types. Interfaces are used for type checking and don't produce any JavaScript code at runtime.

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};
```

Interfaces provide:
- Type safety for object structures
- Better IDE autocomplete and intellisense
- Self-documenting code
- Contract enforcement for classes

### Question 2: What's the difference between optional and required properties?
**Answer**:
- **Required properties**: Must be present in objects that implement the interface
- **Optional properties**: Marked with `?` and may or may not be present

```typescript
interface Config {
  host: string;        // Required
  port?: number;       // Optional
  timeout?: number;    // Optional
}

// Valid
const config1: Config = { host: "localhost" };

// Also valid
const config2: Config = {
  host: "localhost",
  port: 3000,
  timeout: 5000
};
```

Optional properties are useful for:
- Configuration objects with default values
- API responses with conditional fields
- Function parameters that aren't always needed

### Question 3: How do you extend an interface in TypeScript?
**Answer**: Interfaces can be extended using the `extends` keyword, allowing you to create new interfaces based on existing ones. You can extend single or multiple interfaces.

```typescript
// Base interface
interface Person {
  name: string;
  age: number;
}

// Extended interface
interface Employee extends Person {
  employeeId: number;
  department: string;
}

// Multiple extension
interface Manager extends Employee {
  teamSize: number;
  reportTo: string;
}

const manager: Manager = {
  name: "Alice",
  age: 35,
  employeeId: 12345,
  department: "Engineering",
  teamSize: 10,
  reportTo: "CEO"
};
```

Benefits:
- Code reuse
- Maintains DRY principle
- Creates clear hierarchies
- Easy to add new properties to existing structures

### Question 4: What are readonly properties in interfaces?
**Answer**: Readonly properties are properties that can only be assigned once during object creation and cannot be modified afterward. They're marked with the `readonly` keyword.

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// Readonly arrays
interface Data {
  readonly values: readonly number[];
}

const data: Data = { values: [1, 2, 3] };
// data.values.push(4); // Error
// data.values[0] = 10; // Error
```

Use readonly when:
- Values shouldn't change after initialization
- Implementing immutable data structures
- Defining constants or configuration
- Preventing accidental mutations

### Question 5: What's the difference between interface and type alias?
**Answer**: While both can define object shapes, they have key differences:

**Interfaces:**
- Can be extended with `extends`
- Can be implemented by classes
- Can be merged (declaration merging)
- Better for object-oriented programming

```typescript
interface User {
  name: string;
}

interface User {
  age: number; // Declaration merging - adds to existing interface
}
```

**Type Aliases:**
- Can represent any type (primitives, unions, tuples)
- Can use union and intersection operators
- Cannot be merged
- More flexible for complex types

```typescript
type ID = string | number; // Union type
type Point = [number, number]; // Tuple type
```

**Recommendation**: Use interfaces for object shapes and class contracts, use type aliases for unions, intersections, and complex type compositions.

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Interface |
|---------|-----------|---------------------|
| Structure Definition | No formal structure | Explicit structure definition |
| Type Checking | Runtime only | Compile-time checking |
| Optional Properties | Checked at runtime | Checked at compile-time |
| Readonly | Use Object.freeze() | readonly keyword |
| Extension | Prototype inheritance | Interface extension |
| Documentation | Comments needed | Self-documenting with types |
| Refactoring | Error-prone | Safe with type checking |

```javascript
// JavaScript - No structure enforcement
const user = {
  name: "Alice",
  age: 30
};

// TypeScript - Structure enforced
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "Alice",
  age: 30
  // Error: Property 'email' is missing
};
```

## Additional Resources

- [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Interface vs Type Alias](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
