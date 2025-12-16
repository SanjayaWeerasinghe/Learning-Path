# Union Types

## Introduction

Union types in TypeScript allow a value to be one of several types. They provide flexibility while maintaining type safety, enabling you to handle multiple type scenarios without resorting to the `any` type. Combined with type guards and narrowing, union types are essential for writing robust, type-safe code.

## Key Concepts

### Basic Union Types

A union type is created using the `|` operator:

```typescript
type StringOrNumber = string | number;
```

### Type Narrowing

TypeScript narrows union types based on control flow analysis:

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
  }
}
```

### Discriminated Unions

Tagged union types with a common discriminant property:

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };
```

## TypeScript-Specific Code Examples

### Example 1: Basic Union Types

```typescript
// Simple union types
type ID = string | number;
type Status = "pending" | "approved" | "rejected";
type Nullable<T> = T | null;

function printId(id: ID): void {
  console.log(`ID: ${id}`);
}

printId("abc123"); // OK
printId(42); // OK

// Union with multiple types
type Result = string | number | boolean | null;

let result: Result;
result = "success"; // OK
result = 404; // OK
result = true; // OK
result = null; // OK

// Array with union type elements
type Mixed = (string | number)[];
const mixed: Mixed = ["a", 1, "b", 2];

// Union of object types
type Cat = { meow: () => void };
type Dog = { bark: () => void };
type Pet = Cat | Dog;

const pet: Pet = {
  meow: () => console.log("Meow!")
};
```

### Example 2: Type Narrowing with typeof

```typescript
function processValue(value: string | number): string {
  // Type narrowing using typeof
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows value is string
  } else {
    return value.toFixed(2); // TypeScript knows value is number
  }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(3.14159)); // "3.14"

// Multiple type checks
function format(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `String: ${value}`;
  } else if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  } else {
    return `Boolean: ${value ? "Yes" : "No"}`;
  }
}

// Narrowing with Array.isArray
function processData(data: string | string[]): void {
  if (Array.isArray(data)) {
    data.forEach(item => console.log(item)); // data is string[]
  } else {
    console.log(data); // data is string
  }
}
```

### Example 3: Discriminated Unions (Tagged Unions)

```typescript
// Discriminated union with 'kind' discriminator
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; size: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.size ** 2;
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
const rectangle: Shape = { kind: "rectangle", width: 10, height: 5 };

console.log(calculateArea(circle)); // 78.54
console.log(calculateArea(rectangle)); // 50

// API response discriminated union
type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string }
  | { status: "loading" };

function handleResponse<T>(response: ApiResponse<T>): void {
  switch (response.status) {
    case "success":
      console.log(response.data); // TypeScript knows data exists
      break;
    case "error":
      console.log(response.error); // TypeScript knows error exists
      break;
    case "loading":
      console.log("Loading..."); // No data or error here
      break;
  }
}

// State machine with discriminated unions
type State =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; data: string }
  | { state: "error"; error: Error };

function renderState(state: State): string {
  switch (state.state) {
    case "idle":
      return "Ready to load";
    case "loading":
      return "Loading...";
    case "success":
      return `Data: ${state.data}`;
    case "error":
      return `Error: ${state.error.message}`;
  }
}
```

### Example 4: Intersection Types

```typescript
// Intersection types combine multiple types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "Alice",
  age: 30,
  employeeId: "EMP001",
  department: "Engineering"
};

// Combining multiple interfaces
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Identifiable {
  id: string;
}

type Entity = Timestamped & Identifiable & {
  name: string;
};

const entity: Entity = {
  id: "123",
  name: "Document",
  createdAt: new Date(),
  updatedAt: new Date()
};

// Intersection with union
type Admin = Employee & { role: "admin"; permissions: string[] };
type Manager = Employee & { role: "manager"; teamSize: number };
type Staff = Admin | Manager;

function getStaffInfo(staff: Staff): string {
  // Common properties accessible without narrowing
  const base = `${staff.employeeId} - ${staff.department}`;

  if (staff.role === "admin") {
    return `${base} - Admin with ${staff.permissions.length} permissions`;
  } else {
    return `${base} - Manager of team size ${staff.teamSize}`;
  }
}
```

### Example 5: Type Guards

```typescript
// User-defined type guards
interface User {
  id: string;
  name: string;
  email: string;
}

interface Admin extends User {
  adminLevel: number;
}

// Type predicate
function isAdmin(user: User | Admin): user is Admin {
  return (user as Admin).adminLevel !== undefined;
}

function greetUser(user: User | Admin): string {
  if (isAdmin(user)) {
    return `Hello Admin ${user.name}, level ${user.adminLevel}`;
  } else {
    return `Hello ${user.name}`;
  }
}

// Type guard with null check
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processInput(input: unknown): void {
  if (isString(input)) {
    console.log(input.toUpperCase()); // TypeScript knows it's string
  }
}

// Array type guard
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

const data: unknown = ["a", "b", "c"];
if (isStringArray(data)) {
  data.forEach(str => console.log(str.toUpperCase())); // Type-safe
}

// Class instance type guard
class Dog {
  bark() { console.log("Woof!"); }
}

class Cat {
  meow() { console.log("Meow!"); }
}

function isDog(animal: Dog | Cat): animal is Dog {
  return animal instanceof Dog;
}

function makeSound(animal: Dog | Cat): void {
  if (isDog(animal)) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

### Example 6: Literal Union Types

```typescript
// String literal unions
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type Theme = "light" | "dark" | "auto";

function navigate(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

navigate("north"); // OK
// navigate("up"); // Error

// Number literal unions
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

function handleStatusCode(code: StatusCode): string {
  switch (code) {
    case 200:
    case 201:
      return "Success";
    case 400:
    case 401:
    case 403:
    case 404:
      return "Client Error";
    case 500:
      return "Server Error";
  }
}

// Boolean literal unions
type Falsy = false | 0 | "" | null | undefined;
type TrueOnly = true;

// Combining different literal types
type Config = {
  mode: "development" | "production";
  port: 3000 | 8080;
  debug: true | false;
};
```

### Example 7: Exhaustiveness Checking

```typescript
// Ensure all cases are handled
type Action =
  | { type: "ADD"; payload: number }
  | { type: "SUBTRACT"; payload: number }
  | { type: "MULTIPLY"; payload: number }
  | { type: "DIVIDE"; payload: number }
  | { type: "RESET" };

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "ADD":
      return state + action.payload;
    case "SUBTRACT":
      return state - action.payload;
    case "MULTIPLY":
      return state * action.payload;
    case "DIVIDE":
      return state / action.payload;
    case "RESET":
      return 0;
    default:
      return assertNever(action); // TypeScript error if any case is missing
  }
}

// If you add a new action type and don't handle it, TypeScript will error
// type Action = ... | { type: "POWER"; payload: number };
// The default case will now error because action is not assignable to never
```

### Example 8: Advanced Union Patterns

```typescript
// Conditional types with unions
type ExtractString<T> = T extends string ? T : never;
type OnlyStrings = ExtractString<string | number | boolean>; // string

// Exclude utility type
type WithoutNull<T> = Exclude<T, null | undefined>;
type NonNullableString = WithoutNull<string | null>; // string

// Extract utility type
type Extract<T, U> = T extends U ? T : never;
type Numbers = Extract<string | number | boolean, number>; // number

// Union to intersection
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>; // { a: string } & { b: number }

// Optional properties with unions
type OptionalExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
};

type PartialUser = OptionalExcept<User, "id">;
// { id: string; name?: string; email?: string; age?: number; }

// Variadic tuple types with unions
type Action = string | [string, ...any[]];

const action1: Action = "CLICK";
const action2: Action = ["MOVE", 10, 20];
const action3: Action = ["FETCH", "users", { limit: 10 }];
```

## Practical Tasks

### Task 1: Event System with Union Types
Build a type-safe event system:
1. Create discriminated unions for different event types
2. Implement event handlers with proper type narrowing
3. Add type guards for event validation
4. Create event emitter with union types
5. Ensure exhaustive event handling

### Task 2: Form Validation with Unions
Design a form validation system:
1. Define union types for validation states
2. Create discriminated unions for validation results
3. Implement type-safe error handling
4. Build field-specific validators using unions
5. Create form state with union types

### Task 3: API Client with Response Types
Build a type-safe API client:
1. Define union types for response states (loading, success, error)
2. Create discriminated unions for different endpoints
3. Implement request/response type mappings
4. Add type guards for response validation
5. Handle all response states exhaustively

### Task 4: State Machine Implementation
Implement a state machine using unions:
1. Define states as discriminated unions
2. Create transition functions with type safety
3. Implement state guards and validators
4. Build reducers with exhaustive checking
5. Add state history tracking with unions

## Best Practices

1. **Use Discriminated Unions**: Add a discriminant property for better type narrowing
2. **Exhaustive Checking**: Use `never` type to ensure all cases are handled
3. **Type Guards**: Create custom type guards for complex narrowing
4. **Meaningful Discriminants**: Use clear, descriptive discriminant properties
5. **Prefer Unions Over any**: Use union types instead of `any` when possible
6. **Literal Types**: Use literal types for fixed sets of values
7. **Type Narrowing**: Leverage control flow analysis for type narrowing
8. **Document Complex Unions**: Add JSDoc comments for complex union types
9. **Avoid Deep Nesting**: Keep union types reasonably flat
10. **Use Utility Types**: Leverage `Exclude`, `Extract`, `NonNullable` for unions

## Interview Questions

### Question 1: What are union types and how do they work?
**Answer**: Union types allow a value to be one of several types, combined using the `|` operator. TypeScript uses type narrowing to determine the specific type within a union.

```typescript
type StringOrNumber = string | number;

function format(value: StringOrNumber): string {
  // Type narrowing with typeof
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's string
  } else {
    return value.toFixed(2); // TypeScript knows it's number
  }
}
```

Key points:
- Values can be any ONE of the specified types
- Type narrowing required to access type-specific properties
- TypeScript uses control flow analysis to narrow types
- Safer alternative to `any` for flexible typing

Common narrowing techniques:
- `typeof` checks
- `instanceof` checks
- Custom type guards
- Discriminated unions

### Question 2: What are discriminated unions and why use them?
**Answer**: Discriminated unions (tagged unions) are union types with a common property (discriminant) that distinguishes between variants. They enable type-safe exhaustive checking.

```typescript
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string }
  | { status: "loading" };

function handle<T>(result: Result<T>): void {
  switch (result.status) { // Discriminant property
    case "success":
      console.log(result.data); // TypeScript knows data exists
      break;
    case "error":
      console.log(result.error); // TypeScript knows error exists
      break;
    case "loading":
      console.log("Loading..."); // No extra properties
      break;
  }
}
```

Benefits:
- Type-safe pattern matching
- Exhaustive checking
- Clear intent and structure
- Better IDE autocomplete
- Compiler ensures all cases handled

Common use cases:
- State machines
- API responses
- Redux actions
- Error handling

### Question 3: How do type guards work with union types?
**Answer**: Type guards are expressions that perform runtime checks to narrow union types. They use type predicates (`value is Type`) to inform TypeScript of the specific type.

```typescript
// Built-in type guards
function process(value: string | number): void {
  if (typeof value === "string") { // typeof guard
    console.log(value.toUpperCase());
  }
}

// Custom type guards
interface User { name: string; }
interface Admin extends User { adminLevel: number; }

function isAdmin(user: User | Admin): user is Admin {
  return (user as Admin).adminLevel !== undefined;
}

function greet(user: User | Admin): void {
  if (isAdmin(user)) {
    console.log(`Admin level: ${user.adminLevel}`); // Type-safe
  }
}

// Class instance guard
class Dog { bark() {} }
class Cat { meow() {} }

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
```

Types of guards:
- `typeof` - for primitives
- `instanceof` - for classes
- `in` operator - for property checks
- Custom predicates - `value is Type`

### Question 4: What is exhaustiveness checking and how do you implement it?
**Answer**: Exhaustiveness checking ensures all possible cases in a union type are handled. Use the `never` type to catch unhandled cases at compile time.

```typescript
type Action =
  | { type: "ADD"; value: number }
  | { type: "SUBTRACT"; value: number }
  | { type: "RESET" };

function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${value}`);
}

function reduce(state: number, action: Action): number {
  switch (action.type) {
    case "ADD":
      return state + action.value;
    case "SUBTRACT":
      return state - action.value;
    case "RESET":
      return 0;
    default:
      return assertNever(action); // Error if any case missing
  }
}

// If you add a new action type without handling it:
// type Action = ... | { type: "MULTIPLY"; value: number };
// TypeScript will error at assertNever because action is not assignable to never
```

Benefits:
- Compile-time safety when extending unions
- Prevents runtime errors from unhandled cases
- Self-documenting code
- Safe refactoring

Pattern:
1. Handle all known cases
2. Default case calls `assertNever`
3. TypeScript errors if cases missing
4. Forces you to handle new variants

### Question 5: When should you use union types vs intersection types?
**Answer**:

**Union Types** (`|`) - Value is ONE of the types:
```typescript
type StringOrNumber = string | number; // Either string OR number

function print(value: StringOrNumber): void {
  // Must narrow to access type-specific methods
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

**Intersection Types** (`&`) - Value is ALL of the types:
```typescript
type Person = { name: string };
type Employee = { employeeId: string };
type Worker = Person & Employee; // Has BOTH name AND employeeId

const worker: Worker = {
  name: "Alice",
  employeeId: "E001" // Must have both properties
};
```

**Use Union When**:
- Variable can be multiple different types
- Handling different states/variants
- Discriminated unions for state machines
- Optional alternative types

**Use Intersection When**:
- Combining multiple type requirements
- Extending types with additional properties
- Mixing in capabilities
- Composing complex types

**Key Difference**:
- Union: "or" relationship (at least one)
- Intersection: "and" relationship (all)

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Union Types |
|---------|-----------|----------------------|
| Multiple Types | Runtime checking | Compile-time types |
| Type Safety | No | Yes |
| Narrowing | Manual checks | Automatic flow analysis |
| Exhaustiveness | No guarantee | Compile-time checking |
| Discriminated Unions | Manual implementation | Built-in support |

```javascript
// JavaScript - Runtime checking
function process(value) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value.toFixed(2);
  }
}

// TypeScript - Compile-time safety
function process(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase(); // Type-safe
  } else {
    return value.toFixed(2); // Type-safe
  }
}
```

## Additional Resources

- [TypeScript Handbook - Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
- [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
