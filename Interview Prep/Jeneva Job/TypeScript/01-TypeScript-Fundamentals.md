# TypeScript Fundamentals - Interview Questions & Answers

## Table of Contents
1. [What is TypeScript?](#what-is-typescript)
2. [Type Annotations and Inference](#type-annotations-and-inference)
3. [Interfaces vs Types](#interfaces-vs-types)
4. [Generics](#generics)
5. [Union and Intersection Types](#union-and-intersection-types)
6. [Enums](#enums)
7. [Type Guards](#type-guards)

---

## What is TypeScript?

### Question
**What is TypeScript and what are its advantages over JavaScript?**

### Answer
TypeScript is a strongly typed programming language that builds on JavaScript. It adds static typing to JavaScript and compiles down to plain JavaScript.

**Key Features:**
- Static type checking
- Enhanced IDE support (IntelliSense, autocompletion)
- Early error detection (at compile time, not runtime)
- Better code documentation
- Improved refactoring capabilities
- Object-oriented features (interfaces, enums, generics)

### Better Explanation

**JavaScript (Dynamic Typing):**
```javascript
// Runtime error - won't know until code runs
function add(a, b) {
  return a + b;
}

add(5, "10"); // "510" - unexpected string concatenation
add({ x: 5 }, { x: 10 }); // "[object Object][object Object]"
```

**TypeScript (Static Typing):**
```typescript
// Compile-time error - caught before running
function add(a: number, b: number): number {
  return a + b;
}

add(5, "10"); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
add({ x: 5 }, { x: 10 }); // ❌ Error: Type error
add(5, 10); // ✅ Correct: 15
```

**Real Benefits:**

1. **Catch Errors Early:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  // TypeScript ensures you return the correct shape
  return {
    id: id,
    name: "John",
    // ❌ Error: Property 'email' is missing
  };
}
```

2. **Better IDE Support:**
```typescript
const user: User = getUser(1);

// IDE shows: id, name, email (autocomplete)
user.

// IDE warns if property doesn't exist
user.age; // ❌ Property 'age' does not exist on type 'User'
```

3. **Self-Documenting Code:**
```typescript
// Clear contract - no need to guess parameter types
function createUser(
  name: string,
  email: string,
  age: number,
  isAdmin: boolean
): User {
  // Implementation
}
```

---

## Type Annotations and Inference

### Question
**Explain type annotations and type inference in TypeScript.**

### Answer

**Type Annotation:** Explicitly specifying the type
**Type Inference:** TypeScript automatically determines the type

### Better Explanation

**Type Inference (Implicit):**
```typescript
// TypeScript infers type based on value
let name = "John"; // inferred as string
let age = 25; // inferred as number
let isActive = true; // inferred as boolean

// TypeScript infers return type
function add(a: number, b: number) {
  return a + b; // inferred as number
}

// TypeScript infers array type
let numbers = [1, 2, 3]; // inferred as number[]
let mixed = [1, "two", true]; // inferred as (string | number | boolean)[]
```

**Type Annotation (Explicit):**
```typescript
// Explicitly declare types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;

// Function with explicit return type
function add(a: number, b: number): number {
  return a + b;
}

// Explicit array types
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["one", "two", "three"];
```

**When to Use Each:**

**Use Type Inference (Recommended):**
```typescript
// Clear from context
const PI = 3.14; // number
const message = "Hello"; // string

// Clear from function
const result = add(5, 10); // number (if add returns number)

// Clear from initialization
const users = fetchUsers(); // User[] (if fetchUsers returns User[])
```

**Use Type Annotation:**
```typescript
// When inference isn't clear
let value: string | number;
value = "hello";
value = 42;

// Function parameters (required)
function greet(name: string) {
  console.log(`Hello ${name}`);
}

// When variable is declared without initialization
let user: User;
// ... later
user = fetchUser();

// Complex types
let config: { apiKey: string; timeout: number };
```

**Primitive Types:**
```typescript
let str: string = "Hello";
let num: number = 42;
let bool: boolean = true;
let nothing: null = null;
let undef: undefined = undefined;
let sym: symbol = Symbol("key");
let big: bigint = 100n;
```

**Array Types:**
```typescript
let numbers: number[] = [1, 2, 3];
let strings: string[] = ["a", "b", "c"];

// Alternative syntax
let numbers: Array<number> = [1, 2, 3];

// Read-only array
let readOnly: readonly number[] = [1, 2, 3];
// readOnly.push(4); // ❌ Error: Property 'push' does not exist on type 'readonly number[]'
```

**Object Types:**
```typescript
// Inline object type
let user: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Optional properties
let config: { host: string; port?: number } = {
  host: "localhost"
  // port is optional
};

// Readonly properties
let point: { readonly x: number; readonly y: number } = {
  x: 10,
  y: 20
};
// point.x = 5; // ❌ Error: Cannot assign to 'x' because it is a read-only property
```

**Function Types:**
```typescript
// Function type annotation
let greet: (name: string) => string;

greet = (name: string) => {
  return `Hello ${name}`;
};

// Function with optional parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// Function with default parameters
function createUser(name: string, role: string = "user"): User {
  return { name, role };
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}
```

**Any and Unknown:**
```typescript
// any - disables type checking (avoid when possible)
let anything: any = "hello";
anything = 42;
anything = true;
anything.foo.bar(); // No error, but dangerous

// unknown - safer alternative to any
let value: unknown = "hello";

// Must check type before using
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ OK after type guard
}
// value.toUpperCase(); // ❌ Error without type guard
```

**Never and Void:**
```typescript
// void - function returns nothing
function log(message: string): void {
  console.log(message);
  // no return statement
}

// never - function never returns (throws or infinite loop)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // infinite loop
  }
}
```

---

## Interfaces vs Types

### Question
**What's the difference between interfaces and type aliases?**

### Answer

Both interfaces and type aliases can be used to define object shapes, but they have some differences.

### Better Explanation

**Interface:**
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Extending interfaces
interface Admin extends User {
  role: string;
  permissions: string[];
}

// Declaration merging
interface User {
  createdAt: Date; // Adds to existing User interface
}
```

**Type Alias:**
```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

// Extending with intersection
type Admin = User & {
  role: string;
  permissions: string[];
};

// No declaration merging
// type User = { ... } // ❌ Error: Duplicate identifier 'User'
```

**Key Differences:**

| Feature | Interface | Type Alias |
|---------|-----------|------------|
| Declaration Merging | ✅ Yes | ❌ No |
| Extends | `extends` keyword | `&` intersection |
| Primitives | ❌ No | ✅ Yes |
| Union Types | ❌ No | ✅ Yes |
| Tuples | ❌ Less intuitive | ✅ Better |
| Mapped Types | ❌ No | ✅ Yes |
| Performance | Slightly better | Slightly slower |

**When to Use Interface:**
```typescript
// Object shapes and class contracts
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound() {
    console.log("Woof!");
  }
}

// When you need declaration merging (libraries)
interface Window {
  myCustomProperty: string;
}

// Extending is clear and readable
interface Cat extends Animal {
  purr(): void;
}
```

**When to Use Type Alias:**
```typescript
// Union types
type ID = string | number;

type Status = "pending" | "approved" | "rejected";

// Primitives
type Email = string;
type Age = number;

// Tuples
type Coordinate = [number, number];
type RGB = [number, number, number];

// Complex types
type Nullable<T> = T | null;
type Response<T> = {
  data: T;
  error: string | null;
  loading: boolean;
};

// Function types
type Callback = (value: string) => void;
type Comparator<T> = (a: T, b: T) => number;

// Mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

**Real-World Examples:**

**API Response Types:**
```typescript
// Use type for unions and complex types
type APIResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

type UserResponse = APIResponse<User>;

function getUser(id: number): Promise<UserResponse> {
  // Implementation
}

// Use interface for object shapes
interface User {
  id: number;
  name: string;
  email: string;
}
```

**React Component Props:**
```typescript
// Both work, but type is more common for React props
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}

// Interface also works
interface CardProps {
  title: string;
  children: React.ReactNode;
}
```

**Combining Both:**
```typescript
// Interface for main shape
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Type for specific entities
type User = BaseEntity & {
  name: string;
  email: string;
};

type Product = BaseEntity & {
  name: string;
  price: number;
  stock: number;
};
```

**Recommendation:**
- Use **interface** for object/class shapes (default choice)
- Use **type** for unions, primitives, tuples, and complex types
- Be consistent within your codebase

---

## Generics

### Question
**What are generics in TypeScript and why are they useful?**

### Answer
Generics allow you to create reusable components that work with multiple types while maintaining type safety.

### Better Explanation

**Without Generics (Type-specific):**
```typescript
// Have to create separate functions for each type
function getFirstNumber(arr: number[]): number {
  return arr[0];
}

function getFirstString(arr: string[]): string {
  return arr[0];
}

// Or lose type safety with any
function getFirst(arr: any[]): any {
  return arr[0]; // Lost type information
}
```

**With Generics (Reusable and Type-safe):**
```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// TypeScript infers the type
const firstNumber = getFirst([1, 2, 3]); // number
const firstString = getFirst(["a", "b", "c"]); // string

// Or explicitly specify
const firstUser = getFirst<User>([user1, user2]); // User
```

**Real-World Examples:**

**1. Generic Functions:**
```typescript
// Array utilities
function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

// Usage
const numbers = [1, 2, 3, 4];
const doubled = map(numbers, n => n * 2); // number[]
const strings = map(numbers, n => n.toString()); // string[]
```

**2. Generic Interfaces:**
```typescript
interface Response<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

// Usage
const userResponse: Response<User> = {
  data: { id: 1, name: "John" },
  status: 200,
  message: "Success"
};

const productResponse: Response<Product[]> = {
  data: [{ id: 1, name: "Item", price: 99 }],
  status: 200,
  message: "Success"
};
```

**3. Generic Classes:**
```typescript
class DataStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  remove(item: T): void {
    const index = this.data.indexOf(item);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  getAll(): T[] {
    return [...this.data];
  }
}

// Usage
const userStore = new DataStore<User>();
userStore.add({ id: 1, name: "John" });

const productStore = new DataStore<Product>();
productStore.add({ id: 1, name: "Item", price: 99 });
```

**4. Generic Constraints:**
```typescript
// Constrain T to have an 'id' property
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Can use with any type that has 'id'
const user = findById(users, 1); // User | undefined
const product = findById(products, 1); // Product | undefined

// ❌ Error if type doesn't have 'id'
// const result = findById(["a", "b"], 1);
```

**5. Multiple Generic Parameters:**
```typescript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

function createPair<K, V>(key: K, value: V): KeyValuePair<K, V> {
  return { key, value };
}

// Usage
const stringNumber = createPair("age", 25); // KeyValuePair<string, number>
const numberBoolean = createPair(1, true); // KeyValuePair<number, boolean>

// Dictionary/Map
class Dictionary<K, V> {
  private items: Map<K, V> = new Map();

  set(key: K, value: V): void {
    this.items.set(key, value);
  }

  get(key: K): V | undefined {
    return this.items.get(key);
  }

  has(key: K): boolean {
    return this.items.has(key);
  }
}
```

**6. Generic React Components:**
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage - TypeScript knows the types!
<List
  items={users}
  renderItem={(user) => <div>{user.name}</div>} // user is User
  keyExtractor={(user) => user.id.toString()}
/>

<List
  items={products}
  renderItem={(product) => <div>{product.name}</div>} // product is Product
  keyExtractor={(product) => product.id.toString()}
/>
```

**7. Utility Types with Generics:**
```typescript
// Built-in utility types use generics
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Usage
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>; // All properties optional
type RequiredUser = Required<PartialUser>; // All properties required
type ReadonlyUser = Readonly<User>; // All properties readonly
type UserPreview = Pick<User, "id" | "name">; // Only id and name
```

**Generic Constraints Examples:**
```typescript
// Extends for constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "John", email: "john@example.com" };

const name = getProperty(user, "name"); // string
const id = getProperty(user, "id"); // number
// getProperty(user, "age"); // ❌ Error: "age" doesn't exist on user

// Multiple constraints
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "John" }, { age: 30 });
// merged has both name and age properties
```

---

## Union and Intersection Types

### Question
**Explain Union and Intersection types in TypeScript.**

### Answer

**Union Types (`|`):** A value can be one of several types
**Intersection Types (`&`):** A value must be all of the specified types

### Better Explanation

**Union Types - "OR" Logic:**
```typescript
// Can be string OR number
type ID = string | number;

let userId: ID;
userId = "abc123"; // ✅ OK
userId = 123; // ✅ OK
// userId = true; // ❌ Error

// Function accepting multiple types
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}

formatId("abc"); // "ABC"
formatId(123); // "123"
```

**Literal Union Types:**
```typescript
type Status = "pending" | "approved" | "rejected";
type Direction = "north" | "south" | "east" | "west";

function setStatus(status: Status) {
  // Can only be one of the literal values
}

setStatus("pending"); // ✅ OK
setStatus("approved"); // ✅ OK
// setStatus("cancelled"); // ❌ Error
```

**Discriminated Unions (Tagged Unions):**
```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Triangle {
  kind: "triangle";
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

// TypeScript knows the exact type in each case
```

**Intersection Types - "AND" Logic:**
```typescript
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: number;
  name: string;
}

// Must have ALL properties from both types
type TimestampedUser = User & Timestamped;

const user: TimestampedUser = {
  id: 1,
  name: "John",
  createdAt: new Date(),
  updatedAt: new Date()
};
```

**Combining Mixins:**
```typescript
interface Loggable {
  log(): void;
}

interface Serializable {
  serialize(): string;
}

class Entity implements Loggable, Serializable {
  log() {
    console.log("Logging...");
  }

  serialize() {
    return JSON.stringify(this);
  }
}

type EnhancedEntity = Entity & Loggable & Serializable;
```

**Real-World Example - API Response:**
```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
  };
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: { message: "Failed to fetch", code: "FETCH_ERROR" }
    };
  }
}

// Usage with type narrowing
const result = await fetchUser(1);

if (result.success) {
  console.log(result.data.name); // TypeScript knows data exists
} else {
  console.error(result.error.message); // TypeScript knows error exists
}
```

---

## Enums

### Question
**What are enums in TypeScript and when should you use them?**

### Answer
Enums allow you to define a set of named constants. They make code more readable and maintainable.

### Better Explanation

**Numeric Enums:**
```typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let dir: Direction = Direction.Up;

function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    // ...
  }
}

move(Direction.Right);
```

**String Enums:**
```typescript
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED"
}

// More readable and debuggable
const orderStatus: Status = Status.Pending;

// Works with string comparison
if (orderStatus === Status.Pending) {
  console.log("Order is pending");
}
```

**Const Enums (More Efficient):**
```typescript
const enum Size {
  Small = "S",
  Medium = "M",
  Large = "L"
}

const mySize = Size.Medium; // Inlined to "M" at compile time
```

**When to Use Enums vs Union Types:**

**Use Enums:**
- Need to iterate over values
- Need reverse mapping (number to name)
- Want to group related constants
- Need a proper namespace

**Use Union Types:**
- Simple string literals
- Don't need iteration
- Want lighter bundle size
- More flexible

```typescript
// Union type alternative (lighter)
type Status = "pending" | "approved" | "rejected";

// Enum (more features, slightly heavier)
enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected"
}
```

---

## Type Guards

### Question
**What are type guards and how do you use them?**

### Answer
Type guards are expressions that perform runtime checks and narrow down types within a conditional block.

### Better Explanation

**typeof Type Guard:**
```typescript
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's number
  }
}
```

**instanceof Type Guard:**
```typescript
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

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows it's Dog
  } else {
    animal.meow(); // TypeScript knows it's Cat
  }
}
```

**in Type Guard:**
```typescript
interface Car {
  drive(): void;
}

interface Boat {
  sail(): void;
}

function move(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive(); // TypeScript knows it's Car
  } else {
    vehicle.sail(); // TypeScript knows it's Boat
  }
}
```

**Custom Type Guards:**
```typescript
interface User {
  id: number;
  name: string;
}

interface Admin {
  id: number;
  name: string;
  role: "admin";
  permissions: string[];
}

// Custom type guard function
function isAdmin(user: User | Admin): user is Admin {
  return (user as Admin).role === "admin";
}

function handleUser(user: User | Admin) {
  if (isAdmin(user)) {
    console.log(user.permissions); // TypeScript knows it's Admin
  } else {
    console.log(user.name); // TypeScript knows it's User
  }
}
```

---

## Key Takeaways for Jeneva Interview

### TypeScript Priority Topics:
1. **Strong typing**: Understand why TypeScript is valuable
2. **Interfaces/Types**: Know when to use each
3. **Generics**: Create reusable, type-safe components
4. **Type narrowing**: Use type guards effectively
5. **React + TypeScript**: Type props, hooks, and components

### Common Mistakes to Avoid:
- Overusing `any` (defeats the purpose of TypeScript)
- Not leveraging type inference
- Creating overly complex types
- Ignoring compiler errors
- Not using strict mode

### Interview Tips:
- Show you understand the **why**, not just the **how**
- Demonstrate real-world usage with React
- Explain trade-offs between approaches
- Show you can write maintainable, typed code
