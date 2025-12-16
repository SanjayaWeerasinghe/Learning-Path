# Type Guards

## Introduction

Type guards are expressions that perform runtime checks to narrow down types within a conditional block. They enable TypeScript to understand the specific type of a variable in different code paths, providing type safety while working with union types, unknown types, and complex type scenarios.

## Key Concepts

### Type Narrowing

TypeScript narrows types based on control flow analysis:

```typescript
function process(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
  }
}
```

### Type Predicates

Custom type guards use type predicates (`value is Type`):

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```

### Built-in Type Guards

TypeScript provides built-in guards:
- `typeof` for primitives
- `instanceof` for classes
- `in` operator for properties

## TypeScript-Specific Code Examples

### Example 1: Built-in Type Guards with typeof

```typescript
// typeof type guard
function processValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // value is string
  } else if (typeof value === "number") {
    return value.toFixed(2); // value is number
  } else {
    return value ? "Yes" : "No"; // value is boolean
  }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(42)); // "42.00"
console.log(processValue(true)); // "Yes"

// Null and undefined checks
function printLength(str: string | null | undefined): void {
  if (str === null) {
    console.log("Value is null");
    return;
  }

  if (str === undefined) {
    console.log("Value is undefined");
    return;
  }

  console.log(`Length: ${str.length}`); // str is string
}

// Truthiness narrowing
function processInput(input: string | null | undefined | ""): void {
  if (input) {
    console.log(input.toUpperCase()); // input is string (non-empty)
  } else {
    console.log("No input"); // input is null | undefined | ""
  }
}

// Array type guard
function processData(data: string | string[]): void {
  if (Array.isArray(data)) {
    data.forEach(item => console.log(item)); // data is string[]
  } else {
    console.log(data); // data is string
  }
}
```

### Example 2: instanceof Type Guard

```typescript
// Class instance type guards
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark(); // animal is Dog
  } else {
    animal.meow(); // animal is Cat
  }
}

const dog = new Dog();
const cat = new Cat();

makeSound(dog); // "Woof!"
makeSound(cat); // "Meow!"

// Built-in class instances
function processDate(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString(); // value is Date
  } else {
    return value; // value is string
  }
}

// Error handling
function handleError(error: unknown): void {
  if (error instanceof Error) {
    console.log(error.message); // error is Error
  } else if (typeof error === "string") {
    console.log(error); // error is string
  } else {
    console.log("Unknown error");
  }
}
```

### Example 3: in Operator Type Guard

```typescript
// Property existence checking
interface Cat {
  meow: () => void;
}

interface Dog {
  bark: () => void;
}

function makeAnimalSound(animal: Cat | Dog): void {
  if ("meow" in animal) {
    animal.meow(); // animal is Cat
  } else {
    animal.bark(); // animal is Dog
  }
}

// Optional property checking
interface User {
  name: string;
  email: string;
  admin?: {
    level: number;
    permissions: string[];
  };
}

function checkAdmin(user: User): void {
  if ("admin" in user && user.admin) {
    console.log(`Admin level: ${user.admin.level}`); // admin exists
  } else {
    console.log("Not an admin");
  }
}

// Discriminated unions with in
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  size: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  if ("radius" in shape) {
    return Math.PI * shape.radius ** 2; // shape is Circle
  } else {
    return shape.size ** 2; // shape is Square
  }
}
```

### Example 4: Custom Type Guards with Type Predicates

```typescript
// Basic type predicate
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processUnknown(value: unknown): void {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value is string
  }
}

// Interface type guard
interface User {
  id: string;
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj &&
    typeof (obj as User).id === "string" &&
    typeof (obj as User).name === "string" &&
    typeof (obj as User).email === "string"
  );
}

function greetUser(data: unknown): void {
  if (isUser(data)) {
    console.log(`Hello, ${data.name}`); // data is User
  } else {
    console.log("Invalid user data");
  }
}

// Array type guard
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(item => typeof item === "string")
  );
}

function processArray(data: unknown): void {
  if (isStringArray(data)) {
    data.forEach(str => console.log(str.toUpperCase())); // data is string[]
  }
}

// Nullable type guard
function isNonNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const values = ["hello", null, "world", undefined, "!"];
const nonNullValues = values.filter(isNonNull);
// nonNullValues is string[]
```

### Example 5: Discriminated Union Type Guards

```typescript
// Discriminated union
interface SuccessResponse {
  status: "success";
  data: any;
}

interface ErrorResponse {
  status: "error";
  error: string;
}

interface LoadingResponse {
  status: "loading";
}

type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse;

function handleResponse(response: ApiResponse): void {
  // Type guard using discriminant property
  if (response.status === "success") {
    console.log(response.data); // response is SuccessResponse
  } else if (response.status === "error") {
    console.log(response.error); // response is ErrorResponse
  } else {
    console.log("Loading..."); // response is LoadingResponse
  }
}

// Switch statement with discriminated union
function processResponse(response: ApiResponse): string {
  switch (response.status) {
    case "success":
      return `Data: ${response.data}`;
    case "error":
      return `Error: ${response.error}`;
    case "loading":
      return "Loading...";
  }
}

// Complex discriminated union
type Event =
  | { type: "click"; x: number; y: number }
  | { type: "keypress"; key: string }
  | { type: "focus"; element: HTMLElement }
  | { type: "scroll"; offset: number };

function handleEvent(event: Event): void {
  switch (event.type) {
    case "click":
      console.log(`Clicked at ${event.x}, ${event.y}`);
      break;
    case "keypress":
      console.log(`Key pressed: ${event.key}`);
      break;
    case "focus":
      console.log(`Focused element:`, event.element);
      break;
    case "scroll":
      console.log(`Scrolled to: ${event.offset}`);
      break;
  }
}
```

### Example 6: Type Guards with Generics

```typescript
// Generic type guard
function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

function processGeneric<T>(value: T | T[]): void {
  if (isArray(value)) {
    value.forEach(item => console.log(item)); // value is T[]
  } else {
    console.log(value); // value is T
  }
}

// Generic nullable guard
function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function useValue<T>(value: T | null | undefined): void {
  if (isDefined(value)) {
    // value is T (guaranteed non-null)
    console.log(value);
  }
}

// Generic instance check
function isInstanceOf<T>(
  value: unknown,
  constructor: new (...args: any[]) => T
): value is T {
  return value instanceof constructor;
}

class MyClass {
  myMethod() {}
}

function processValue(value: unknown): void {
  if (isInstanceOf(value, MyClass)) {
    value.myMethod(); // value is MyClass
  }
}

// Generic property check
function hasProperty<T, K extends string>(
  obj: T,
  key: K
): obj is T & Record<K, unknown> {
  return typeof obj === "object" && obj !== null && key in obj;
}

function getValue(obj: unknown): void {
  if (hasProperty(obj, "name")) {
    console.log(obj.name); // obj has name property
  }
}
```

### Example 7: Assertion Functions

```typescript
// Assertion function (throws if false)
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function processString(value: unknown): void {
  assertIsString(value);
  console.log(value.toUpperCase()); // value is string after assertion
}

// Assertion for non-null
function assertNonNull<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
}

function useNonNull<T>(value: T | null | undefined): void {
  assertNonNull(value);
  // value is T (guaranteed non-null)
  console.log(value);
}

// Assertion for type guard
function assertIsUser(obj: unknown): asserts obj is User {
  if (!isUser(obj)) {
    throw new Error("Object is not a User");
  }
}

function processUser(data: unknown): void {
  assertIsUser(data);
  console.log(data.name); // data is User after assertion
}

// Assertion with condition
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function divide(a: number, b: number): number {
  assert(b !== 0, "Division by zero");
  return a / b; // b is guaranteed non-zero
}
```

### Example 8: Advanced Type Guard Patterns

```typescript
// Type guard with exhaustiveness checking
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status): string {
  if (status === "pending") {
    return "Waiting for approval";
  } else if (status === "approved") {
    return "Approved";
  } else if (status === "rejected") {
    return "Rejected";
  } else {
    return assertNever(status); // Compile error if status not handled
  }
}

// Branded types with type guards
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function isUserId(value: string): value is UserId {
  // Validation logic
  return value.startsWith("USER_");
}

function isProductId(value: string): value is ProductId {
  return value.startsWith("PROD_");
}

function getUserById(id: UserId): void {
  console.log(`Getting user ${id}`);
}

const id = "USER_123";
if (isUserId(id)) {
  getUserById(id); // id is UserId
}

// Recursive type guard
type NestedArray<T> = T | NestedArray<T>[];

function isNestedArray<T>(
  value: unknown,
  typeCheck: (v: unknown) => v is T
): value is NestedArray<T> {
  if (typeCheck(value)) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(item => isNestedArray(item, typeCheck));
  }
  return false;
}

const data: unknown = [1, [2, [3, 4]]];
if (isNestedArray(data, (v): v is number => typeof v === "number")) {
  // data is NestedArray<number>
  console.log(data);
}

// Type guard composition
function isBoth<T, U>(
  value: unknown,
  guard1: (v: unknown) => v is T,
  guard2: (v: unknown) => v is U
): value is T & U {
  return guard1(value) && guard2(value);
}

interface Named { name: string; }
interface Aged { age: number; }

function isNamed(obj: unknown): obj is Named {
  return typeof obj === "object" && obj !== null && "name" in obj;
}

function isAged(obj: unknown): obj is Aged {
  return typeof obj === "object" && obj !== null && "age" in obj;
}

const person: unknown = { name: "Alice", age: 30 };
if (isBoth(person, isNamed, isAged)) {
  console.log(person.name, person.age); // person is Named & Aged
}
```

## Practical Tasks

### Task 1: Form Validation with Type Guards
Build a form validation system:
1. Create type guards for different field types
2. Implement validation type guards
3. Build error type guards for error handling
4. Create assertion functions for required fields
5. Implement discriminated unions for validation results

### Task 2: API Response Handler
Design an API response handling system:
1. Create type guards for different response types
2. Implement success/error type narrowing
3. Build status-based type guards
4. Add assertion functions for required data
5. Handle nested response structures

### Task 3: Event System Type Guards
Build a type-safe event system:
1. Create type guards for different event types
2. Implement event data type narrowing
3. Build custom event type guards
4. Add assertion functions for event validation
5. Handle event delegation with type safety

### Task 4: Data Parser with Type Guards
Implement a data parsing system:
1. Create type guards for JSON validation
2. Build schema-based type guards
3. Implement recursive type guards for nested data
4. Add assertion functions for data integrity
5. Handle parsing errors with type safety

## Best Practices

1. **Use Built-in Guards First**: Leverage typeof, instanceof, and in operators
2. **Explicit Type Predicates**: Use `value is Type` syntax for custom guards
3. **Thorough Validation**: Check all properties in custom type guards
4. **Assertion Functions**: Use assertion functions for guaranteed type narrowing
5. **Discriminated Unions**: Use discriminant properties for complex unions
6. **Exhaustiveness Checking**: Use never type to ensure all cases handled
7. **Generic Type Guards**: Create reusable generic type guards
8. **Error Handling**: Handle edge cases in type guards
9. **Performance**: Keep type guards efficient
10. **Documentation**: Document complex type guard logic

## Interview Questions

### Question 1: What are type guards and how do they work?
**Answer**: Type guards are expressions that perform runtime checks to narrow down types within conditional blocks. TypeScript uses control flow analysis to understand the specific type in different code paths.

**Built-in Type Guards**:
```typescript
// typeof guard
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // value is string
  } else {
    return value.toFixed(2); // value is number
  }
}

// instanceof guard
function process(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString(); // value is Date
  } else {
    return value; // value is string
  }
}

// in operator guard
interface Cat { meow: () => void; }
interface Dog { bark: () => void; }

function makeSound(animal: Cat | Dog): void {
  if ("meow" in animal) {
    animal.meow(); // animal is Cat
  } else {
    animal.bark(); // animal is Dog
  }
}
```

How they work:
1. Perform runtime check
2. TypeScript analyzes control flow
3. Type is narrowed in respective branches
4. Provides compile-time type safety with runtime validation

### Question 2: How do you create custom type guards?
**Answer**: Custom type guards use type predicates with the `value is Type` syntax to tell TypeScript what type a value is after the check passes.

```typescript
// Basic type predicate
function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(value)) {
  console.log(value.toUpperCase()); // value is string
}

// Interface type guard
interface User {
  id: string;
  name: string;
  email: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "email" in obj &&
    typeof (obj as User).id === "string" &&
    typeof (obj as User).name === "string" &&
    typeof (obj as User).email === "string"
  );
}

function greet(data: unknown): void {
  if (isUser(data)) {
    console.log(`Hello, ${data.name}`); // data is User
  }
}

// Array type guard
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}
```

Key points:
- Return type must be `value is Type`
- Perform thorough runtime validation
- TypeScript trusts the type predicate
- Can be used with filter, find, etc.

### Question 3: What are assertion functions and when should you use them?
**Answer**: Assertion functions throw an error if a condition is false and use `asserts` syntax to narrow types. Unlike type guards that return boolean, assertions either throw or narrow the type.

```typescript
// Basic assertion
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value is not a string");
  }
}

function process(value: unknown): void {
  assertIsString(value);
  console.log(value.toUpperCase()); // value is string (guaranteed)
}

// Non-null assertion
function assertNonNull<T>(value: T | null | undefined): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
}

const maybeUser: User | null = getUser();
assertNonNull(maybeUser);
console.log(maybeUser.name); // maybeUser is User

// Condition assertion
function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function divide(a: number, b: number): number {
  assert(b !== 0, "Division by zero");
  return a / b; // b is guaranteed non-zero
}
```

**When to use**:
- When failure should throw an error
- For validating function preconditions
- When you want guaranteed type narrowing
- For defensive programming

**Difference from type guards**:
- Type guards return boolean
- Assertions throw on failure
- Assertions narrow type for rest of function
- Type guards narrow only in if block

### Question 4: Explain discriminated unions and type guards
**Answer**: Discriminated unions use a common discriminant property to distinguish between union members, enabling type-safe narrowing.

```typescript
// Discriminated union
interface SuccessResponse {
  status: "success";
  data: any;
}

interface ErrorResponse {
  status: "error";
  error: string;
}

interface LoadingResponse {
  status: "loading";
}

type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse;

// Type guard using discriminant
function handleResponse(response: ApiResponse): void {
  switch (response.status) {
    case "success":
      console.log(response.data); // response is SuccessResponse
      break;
    case "error":
      console.log(response.error); // response is ErrorResponse
      break;
    case "loading":
      console.log("Loading..."); // response is LoadingResponse
      break;
  }
}

// Shape example
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}
```

Benefits:
- Type-safe pattern matching
- Exhaustive checking
- Clear, self-documenting code
- Better IDE support
- Compiler ensures all cases handled

Pattern:
1. Create union of interfaces
2. Add common discriminant property with literal types
3. Use switch or if-else on discriminant
4. TypeScript narrows type automatically

### Question 5: How do you handle unknown types safely?
**Answer**: Use type guards and assertion functions to validate and narrow unknown types before using them.

```typescript
// Type guard for unknown
function processUnknown(value: unknown): void {
  // Check primitive types
  if (typeof value === "string") {
    console.log(value.toUpperCase());
    return;
  }

  if (typeof value === "number") {
    console.log(value.toFixed(2));
    return;
  }

  // Check for object
  if (typeof value === "object" && value !== null) {
    // Check specific properties
    if ("name" in value && typeof (value as any).name === "string") {
      console.log((value as { name: string }).name);
    }
  }
}

// Custom type guard for unknown
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as User).id === "string" &&
    typeof (value as User).name === "string"
  );
}

function handleData(data: unknown): void {
  if (isUser(data)) {
    console.log(data.name); // data is User
  } else {
    console.log("Invalid data");
  }
}

// Assertion for unknown
function assertIsUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error("Value is not a User");
  }
}

function processUser(data: unknown): void {
  assertIsUser(data);
  console.log(data.email); // data is User (guaranteed)
}
```

Best practices:
- Always validate unknown types
- Use type guards for conditional logic
- Use assertions when failure should throw
- Build reusable validation functions
- Handle all possible types
- Never use type assertions without validation

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Type Guards |
|---------|-----------|----------------------|
| Runtime Checks | Manual checks | Type-aware checks |
| Type Safety | No | Yes |
| Type Narrowing | No | Automatic |
| Custom Guards | Functions | Type predicates |
| Assertions | Throw errors | Type assertions |
| Exhaustiveness | No checking | Compile-time |

## Additional Resources

- [TypeScript Handbook - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Type Guards and Differentiating Types](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
- [Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions)
- [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
