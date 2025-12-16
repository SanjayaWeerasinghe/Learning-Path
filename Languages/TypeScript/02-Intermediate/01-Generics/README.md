# Generics

## Introduction

Generics are one of TypeScript's most powerful features, allowing you to create reusable, type-safe components that work with multiple types. They enable you to write flexible code while maintaining strong type checking, eliminating the need for `any` types in many scenarios.

## Key Concepts

### Generic Types

Generics use type parameters (usually `T`, `U`, `V`, etc.) to represent types that will be specified later:

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

### Generic Constraints

Constraints limit what types can be used with generics using `extends`:

```typescript
function process<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

### Multiple Type Parameters

Generics can use multiple type parameters:

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
```

## TypeScript-Specific Code Examples

### Example 1: Basic Generic Functions

```typescript
// Generic identity function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42); // Explicit type
const str = identity("hello"); // Type inferred as string
const bool = identity(true); // Type inferred as boolean

// Generic array function
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = getFirstElement([1, 2, 3]); // Type: number | undefined
const firstString = getFirstElement(["a", "b"]); // Type: string | undefined

// Generic function with multiple parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30 });
// Type: { name: string } & { age: number }
console.log(merged.name, merged.age);
```

### Example 2: Generic Constraints

```typescript
// Constraint using interface
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

logLength("hello"); // OK - string has length
logLength([1, 2, 3]); // OK - array has length
logLength({ length: 10, value: 5 }); // OK - object has length
// logLength(42); // Error - number doesn't have length

// Constraint using type
type HasId = { id: number };

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

const user = findById(users, 1); // Type: { id: number; name: string } | undefined

// Constraint with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
const name = getProperty(person, "name"); // Type: string
const age = getProperty(person, "age"); // Type: number
// const invalid = getProperty(person, "email"); // Error
```

### Example 3: Generic Classes

```typescript
// Generic class
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberContainer = new Container<number>(42);
console.log(numberContainer.getValue()); // 42
numberContainer.setValue(100);

const stringContainer = new Container("hello");
console.log(stringContainer.getValue()); // "hello"

// Generic class with constraints
class DataStore<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const productStore = new DataStore<Product>();
productStore.add({ id: 1, name: "Laptop", price: 999 });
const product = productStore.findById(1);
```

### Example 4: Generic Interfaces

```typescript
// Generic interface
interface Repository<T> {
  create(item: T): T;
  read(id: string): T | null;
  update(id: string, item: T): T;
  delete(id: string): boolean;
}

// Implementing generic interface
class UserRepository implements Repository<User> {
  private users: Map<string, User> = new Map();

  create(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  read(id: string): User | null {
    return this.users.get(id) || null;
  }

  update(id: string, user: User): User {
    this.users.set(id, user);
    return user;
  }

  delete(id: string): boolean {
    return this.users.delete(id);
  }
}

interface User {
  id: string;
  name: string;
  email: string;
}

// Generic interface with multiple type parameters
interface Pair<K, V> {
  key: K;
  value: V;
}

const stringNumberPair: Pair<string, number> = {
  key: "age",
  value: 30
};

const numberBooleanPair: Pair<number, boolean> = {
  key: 1,
  value: true
};
```

### Example 5: Generic Type Aliases

```typescript
// Generic type alias
type Result<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

function fetchUser(id: number): Result<User> {
  if (id > 0) {
    return {
      success: true,
      data: { id: id.toString(), name: "User " + id, email: "user@example.com" }
    };
  } else {
    return {
      success: false,
      error: "Invalid user ID"
    };
  }
}

const result = fetchUser(1);
if (result.success) {
  console.log(result.data.name); // TypeScript knows data is available
} else {
  console.log(result.error); // TypeScript knows error is available
}

// Generic array wrapper
type AsyncArray<T> = {
  items: T[];
  loading: boolean;
  error: string | null;
};

const userList: AsyncArray<User> = {
  items: [],
  loading: true,
  error: null
};
```

### Example 6: Default Generic Types

```typescript
// Generic with default type
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
}

// Using default type
const response1: ApiResponse = {
  data: "anything",
  status: 200,
  message: "OK"
};

// Specifying type
const response2: ApiResponse<User> = {
  data: { id: "1", name: "Alice", email: "alice@example.com" },
  status: 200,
  message: "OK"
};

// Generic with multiple defaults
class Collection<T = string, U = number> {
  constructor(
    public items: T[],
    public metadata: U
  ) {}
}

const collection1 = new Collection(["a", "b"], 2); // Uses defaults
const collection2 = new Collection<number, boolean>([1, 2], true); // Override defaults
```

### Example 7: Generic Utility Functions

```typescript
// Generic map function
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers = [1, 2, 3];
const doubled = map(numbers, n => n * 2); // Type: number[]
const strings = map(numbers, n => n.toString()); // Type: string[]

// Generic filter function
function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

const evens = filter([1, 2, 3, 4], n => n % 2 === 0); // Type: number[]

// Generic reduce function
function reduce<T, U>(
  arr: T[],
  fn: (acc: U, item: T) => U,
  initial: U
): U {
  return arr.reduce(fn, initial);
}

const sum = reduce([1, 2, 3], (acc, n) => acc + n, 0); // Type: number
const concatenated = reduce(["a", "b", "c"], (acc, s) => acc + s, ""); // Type: string

// Generic find function with type guard
function find<T>(
  arr: T[],
  predicate: (item: T) => boolean
): T | undefined {
  return arr.find(predicate);
}

const found = find([1, 2, 3], n => n > 2); // Type: number | undefined
```

### Example 8: Advanced Generic Patterns

```typescript
// Generic factory pattern
interface Constructor<T> {
  new(...args: any[]): T;
}

function create<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args);
}

class Person {
  constructor(public name: string, public age: number) {}
}

const person = create(Person, "Alice", 30);

// Generic builder pattern
class Builder<T> {
  private obj: Partial<T> = {};

  set<K extends keyof T>(key: K, value: T[K]): this {
    this.obj[key] = value;
    return this;
  }

  build(): T {
    return this.obj as T;
  }
}

interface Config {
  host: string;
  port: number;
  secure: boolean;
}

const config = new Builder<Config>()
  .set("host", "localhost")
  .set("port", 3000)
  .set("secure", true)
  .build();

// Generic promise wrapper
async function asyncMap<T, U>(
  arr: T[],
  fn: (item: T) => Promise<U>
): Promise<U[]> {
  return Promise.all(arr.map(fn));
}

const ids = [1, 2, 3];
const users = await asyncMap(ids, async id => {
  return { id, name: `User ${id}` };
});
```

## Practical Tasks

### Task 1: Generic Data Structure
Build a generic Stack and Queue data structure:
1. Create a generic Stack<T> class with push, pop, peek methods
2. Create a generic Queue<T> class with enqueue, dequeue methods
3. Add size and isEmpty methods
4. Implement proper type safety for all operations
5. Add constraints where necessary

### Task 2: Generic API Client
Create a type-safe API client using generics:
1. Create a generic ApiClient<T> class
2. Implement get, post, put, delete methods with proper typing
3. Use generic Result<T> type for responses
4. Add request/response interceptors with generics
5. Handle error cases with proper types

### Task 3: Generic Form Validation
Build a generic validation system:
1. Create a Validator<T> interface with validation rules
2. Implement validators for different data types
3. Create a generic validate function
4. Return properly typed validation results
5. Support nested object validation

### Task 4: Generic Event Emitter
Implement a type-safe event emitter:
1. Create an EventEmitter<T> class where T is event map
2. Implement on, off, emit methods with proper types
3. Ensure event names and payloads are type-safe
4. Support multiple listeners per event
5. Add once method for one-time listeners

## Best Practices

1. **Use Meaningful Names**: Beyond T, use descriptive type parameter names (e.g., TKey, TValue)
2. **Prefer Type Inference**: Let TypeScript infer types when possible
3. **Add Constraints**: Use extends to add constraints when needed
4. **Default Types**: Provide default types for common cases
5. **Avoid Over-Genericization**: Don't use generics if a concrete type works
6. **Document Complex Generics**: Add JSDoc comments for complex generic types
7. **Use Multiple Parameters**: When needed, don't force everything into one type parameter
8. **Leverage keyof**: Use keyof for type-safe property access
9. **Generic Constraints Order**: Put more specific constraints first
10. **Test Edge Cases**: Test generics with various types to ensure correctness

## Interview Questions

### Question 1: What are generics in TypeScript and why use them?
**Answer**: Generics are a way to create reusable components that work with multiple types while maintaining type safety. They allow you to write flexible code without sacrificing type checking.

```typescript
// Without generics (using any - loses type safety)
function identity(arg: any): any {
  return arg;
}

// With generics (maintains type safety)
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42); // Type: number
const str = identity("hello"); // Type: string
```

Benefits:
- Type safety without hard-coding types
- Code reusability
- Better IDE support and autocomplete
- Self-documenting code
- Eliminates need for `any` in many cases

### Question 2: How do generic constraints work?
**Answer**: Generic constraints limit what types can be used with a generic parameter using the `extends` keyword. This ensures the type has required properties or capabilities.

```typescript
// Constraint to ensure type has length property
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // OK - we know T has length
  return arg;
}

logLength("hello"); // OK - string has length
logLength([1, 2, 3]); // OK - array has length
// logLength(42); // Error - number doesn't have length

// Using keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
getProperty(person, "name"); // OK
// getProperty(person, "email"); // Error - "email" not in person
```

Common constraint patterns:
- `T extends SomeType` - T must be compatible with SomeType
- `K extends keyof T` - K must be a key of T
- `T extends Constructor<U>` - T must be a constructor of U

### Question 3: Explain the difference between generic functions and generic classes
**Answer**:

**Generic Functions**: Type parameters are scoped to the function call
```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Type specified per call
const num = identity<number>(42);
const str = identity<string>("hello");
```

**Generic Classes**: Type parameters are scoped to the entire class instance
```typescript
class Container<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }
}

// Type specified at instantiation
const numContainer = new Container<number>(42);
const strContainer = new Container<string>("hello");
```

Key differences:
- Functions: Type determined per call
- Classes: Type fixed at instantiation
- Functions: Can infer types from arguments
- Classes: Often need explicit type arguments
- Classes: Type persists across all methods
- Functions: Each call can have different types

### Question 4: What are default generic types?
**Answer**: Default generic types provide a fallback type when no type argument is specified, similar to default function parameters.

```typescript
// Generic with default type
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

// Using default (T is unknown)
const response1: ApiResponse = {
  data: "anything",
  status: 200
};

// Specifying type
const response2: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200
};

// Multiple defaults
class Collection<T = string, U = number> {
  constructor(
    public items: T[],
    public count: U
  ) {}
}

const col1 = new Collection(["a"], 1); // Uses defaults
const col2 = new Collection<number, boolean>([1], true); // Override
```

Benefits:
- Backward compatibility
- Sensible defaults for common cases
- Progressive type specificity
- Reduced boilerplate

### Question 5: How do you use generics with React components in TypeScript?
**Answer**: Generics are commonly used in React to create reusable, type-safe components, especially for lists, forms, and data display components.

```typescript
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
/>

// Generic form field
interface FormFieldProps<T> {
  value: T;
  onChange: (value: T) => void;
  validator?: (value: T) => boolean;
}

function FormField<T>({ value, onChange, validator }: FormFieldProps<T>) {
  // Implementation
}
```

Common patterns:
- Generic list/table components
- Generic form components
- Generic modal/dialog components
- Generic data fetching hooks

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Generics |
|---------|-----------|-------------------|
| Type Parameters | Not available | Full support |
| Type Constraints | Not available | extends keyword |
| Type Inference | N/A | Automatic |
| Reusability | Functions only | Functions, classes, interfaces |
| Type Safety | Runtime only | Compile-time |
| Default Types | N/A | Supported |

```javascript
// JavaScript - No type safety
function identity(arg) {
  return arg;
}

// TypeScript - Type-safe with generics
function identity<T>(arg: T): T {
  return arg;
}
```

## Additional Resources

- [TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
- [Advanced Generic Patterns](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
