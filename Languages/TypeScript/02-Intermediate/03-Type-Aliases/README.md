# Type Aliases

## Introduction

Type aliases in TypeScript allow you to create custom names for types. They provide a way to define reusable type definitions, make complex types more readable, and create unions, intersections, and other advanced type compositions. While interfaces are great for object shapes, type aliases offer more flexibility for various type scenarios.

## Key Concepts

### Basic Type Alias

Create a new name for any type:

```typescript
type ID = string | number;
type Point = { x: number; y: number };
```

### Type Aliases vs Interfaces

Both can define object shapes, but have different capabilities and use cases.

### Type Composition

Type aliases can be combined using unions (`|`) and intersections (`&`):

```typescript
type Admin = User & { adminLevel: number };
type Result = Success | Error;
```

## TypeScript-Specific Code Examples

### Example 1: Basic Type Aliases

```typescript
// Primitive type aliases
type ID = string | number;
type Age = number;
type Email = string;

// Using type aliases
function getUserById(id: ID): void {
  console.log(`Fetching user with ID: ${id}`);
}

getUserById("abc123"); // OK
getUserById(42); // OK

// Object type alias
type User = {
  id: ID;
  name: string;
  email: Email;
  age: Age;
};

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  age: 30
};

// Array type alias
type StringArray = string[];
type NumberArray = Array<number>;
type UserList = User[];

const users: UserList = [user];
```

### Example 2: Union and Intersection Types

```typescript
// Union types
type Status = "pending" | "approved" | "rejected";
type StringOrNumber = string | number;
type Result = Success | Error;

interface Success {
  success: true;
  data: any;
}

interface Error {
  success: false;
  error: string;
}

function handleResult(result: Result): void {
  if (result.success) {
    console.log(result.data);
  } else {
    console.log(result.error);
  }
}

// Intersection types
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
  name: "John",
  age: 30,
  employeeId: "EMP001",
  department: "Engineering"
};

// Multiple intersections
type Admin = Person & Employee & {
  adminLevel: number;
  permissions: string[];
};
```

### Example 3: Function Type Aliases

```typescript
// Function type aliases
type MathOperation = (a: number, b: number) => number;
type Callback = (error: Error | null, data: any) => void;
type Predicate<T> = (item: T) => boolean;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// Generic function type
type Mapper<T, U> = (item: T) => U;

const toString: Mapper<number, string> = (num) => num.toString();
const toNumber: Mapper<string, number> = (str) => parseInt(str);

// Async function type
type AsyncFetcher<T> = (id: string) => Promise<T>;

const fetchUser: AsyncFetcher<User> = async (id) => {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
};

// Constructor type
type Constructor<T> = new (...args: any[]) => T;

function create<T>(Ctor: Constructor<T>, ...args: any[]): T {
  return new Ctor(...args);
}
```

### Example 4: Conditional Types with Type Aliases

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Exclude null and undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type C = NonNullable<string | null>; // string
type D = NonNullable<number | undefined>; // number

// Extract specific types
type ExtractString<T> = T extends string ? T : never;

type E = ExtractString<string | number>; // string

// Practical example: API response types
type ApiResponse<T> = T extends { error: any }
  ? { success: false; error: string }
  : { success: true; data: T };

type UserResponse = ApiResponse<User>;
type ErrorResponse = ApiResponse<{ error: string }>;
```

### Example 5: Mapped Types with Type Aliases

```typescript
// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type User = {
  id: string;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; }

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserPreview = Pick<User, "id" | "name">;
// { id: string; name: string; }

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type UserWithoutEmail = Omit<User, "email">;
// { id: string; name: string; }

// Record type
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type UserRoles = Record<string, boolean>;
const roles: UserRoles = {
  admin: true,
  editor: false,
  viewer: true
};
```

### Example 6: Complex Type Compositions

```typescript
// Discriminated union
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; size: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.size ** 2;
  }
}

// Nested type aliases
type Address = {
  street: string;
  city: string;
  country: string;
};

type Contact = {
  email: string;
  phone?: string;
};

type PersonalInfo = {
  name: string;
  age: number;
  address: Address;
  contact: Contact;
};

// Recursive type alias
type NestedArray<T> = T | NestedArray<T>[];

const nested: NestedArray<number> = [1, [2, [3, [4]]]];

// JSON type representation
type JsonPrimitive = string | number | boolean | null;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
type JsonValue = JsonPrimitive | JsonObject | JsonArray;

const jsonData: JsonValue = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    city: "New York",
    zip: 10001
  }
};
```

### Example 7: Utility Type Aliases

```typescript
// Awaited - unwrap Promise type
type Awaited<T> = T extends Promise<infer U> ? U : T;

type A = Awaited<Promise<string>>; // string
type B = Awaited<string>; // string

// ReturnType - get function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): User {
  return { id: "1", name: "Alice", email: "alice@example.com", age: 30 };
}

type UserReturnType = ReturnType<typeof getUser>; // User

// Parameters - get function parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

type GetUserParams = Parameters<typeof getUserById>; // [ID]

// Required - make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

type OptionalUser = {
  id?: string;
  name?: string;
};

type RequiredUser = Required<OptionalUser>;
// { id: string; name: string; }

// Custom utility: DeepPartial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type Config = {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
  };
};

type PartialConfig = DeepPartial<Config>;
```

### Example 8: Type Aliases vs Interfaces

```typescript
// Type alias approach
type UserType = {
  name: string;
  age: number;
};

type AdminType = UserType & {
  adminLevel: number;
};

// Interface approach
interface UserInterface {
  name: string;
  age: number;
}

interface AdminInterface extends UserInterface {
  adminLevel: number;
}

// Type aliases can represent unions (interfaces cannot)
type ID = string | number; // ✓ OK
// interface ID = string | number; // ✗ Error

// Type aliases can represent tuples
type Point = [number, number]; // ✓ OK
// interface Point = [number, number]; // ✗ Error

// Type aliases can represent primitives
type Name = string; // ✓ OK
// interface Name = string; // ✗ Error

// Interfaces can be merged (declaration merging)
interface Window {
  title: string;
}

interface Window {
  size: number;
}

// Window now has both title and size

// Type aliases cannot be merged
type Config = { host: string };
// type Config = { port: number }; // ✗ Error: Duplicate identifier

// Both can be used for object shapes
type PersonType = {
  name: string;
  greet(): void;
};

interface PersonInterface {
  name: string;
  greet(): void;
}

// Both work the same for this use case
```

## Practical Tasks

### Task 1: API Response Type System
Create a comprehensive API response type system:
1. Define type aliases for different response shapes
2. Create discriminated unions for success/error responses
3. Build generic response wrappers
4. Add pagination and metadata types
5. Implement type guards for response validation

### Task 2: Form State Management
Build a form state type system:
1. Create type aliases for form fields and values
2. Define validation error types
3. Build touched/dirty state types
4. Create form submission types
5. Implement utility types for form state transformations

### Task 3: Redux-like State Types
Design a type-safe state management system:
1. Define state shape with type aliases
2. Create action types using discriminated unions
3. Build reducer type signatures
4. Add selector function types
5. Implement middleware types

### Task 4: Component Prop Types
Create reusable component prop types:
1. Define common prop patterns as type aliases
2. Build variant and size type unions
3. Create conditional prop types
4. Implement polymorphic component types
5. Add event handler type aliases

## Best Practices

1. **Use Type Aliases for Unions**: Prefer type aliases for union types
2. **Use Interfaces for Objects**: Prefer interfaces for object shapes (when no unions needed)
3. **Descriptive Names**: Use clear, descriptive names for type aliases
4. **DRY Principle**: Reuse type aliases to avoid duplication
5. **Export Types**: Export type aliases that are used across modules
6. **Document Complex Types**: Add JSDoc comments for complex type aliases
7. **Avoid Circular References**: Be careful with recursive type aliases
8. **Use Utility Types**: Leverage built-in utility types when possible
9. **Type Composition**: Build complex types from simpler ones
10. **Namespace Types**: Group related type aliases in namespaces

## Interview Questions

### Question 1: What's the difference between type aliases and interfaces?
**Answer**:

**Type Aliases**:
- Can represent any type (primitives, unions, tuples, etc.)
- Cannot be merged (no declaration merging)
- Use `&` for intersection
- Better for unions and complex type compositions

```typescript
type ID = string | number; // Union
type Point = [number, number]; // Tuple
type Name = string; // Primitive alias
type Admin = User & { adminLevel: number }; // Intersection
```

**Interfaces**:
- Primarily for object shapes
- Support declaration merging
- Use `extends` for inheritance
- Better for object-oriented patterns

```typescript
interface User {
  name: string;
}

interface User {
  age: number;
} // Merges with above

interface Admin extends User {
  adminLevel: number;
}
```

**When to use each**:
- Type aliases: Unions, tuples, primitives, complex compositions
- Interfaces: Object shapes, class contracts, extendable APIs

### Question 2: How do union and intersection types work?
**Answer**:

**Union Types** (`|`): Value can be any ONE of the types
```typescript
type Result = Success | Error;
type ID = string | number;

let id: ID;
id = "abc"; // OK
id = 123; // OK

// Type narrowing required to use specific properties
function print(id: ID): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

**Intersection Types** (`&`): Value must have ALL properties
```typescript
type Person = { name: string };
type Employee = { employeeId: string };
type Worker = Person & Employee;

const worker: Worker = {
  name: "Alice",
  employeeId: "E001" // Must have both
};
```

**Key differences**:
- Union: "or" relationship (either/or)
- Intersection: "and" relationship (both/all)
- Union: Need type narrowing to access specific properties
- Intersection: Can access all properties directly

### Question 3: What are mapped types in type aliases?
**Answer**: Mapped types transform existing types by iterating over properties. They use the `in keyof` syntax to create new types based on existing ones.

```typescript
// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Transform property types
type Stringify<T> = {
  [P in keyof T]: string;
};

interface User {
  id: number;
  name: string;
  active: boolean;
}

type StringUser = Stringify<User>;
// { id: string; name: string; active: string; }
```

Common patterns:
- Adding/removing modifiers (`readonly`, `?`)
- Transforming property types
- Filtering properties
- Creating variations of types

### Question 4: How do conditional types work with type aliases?
**Answer**: Conditional types select one of two types based on a condition, using the `extends` keyword with ternary syntax.

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// With infer keyword
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): User { /* ... */ }
type UserType = ReturnType<typeof getUser>; // User

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type StrOrNum = string | number;
type ArrayType = ToArray<StrOrNum>; // string[] | number[]

// Practical example: Extract nullable types
type Nullable<T> = T | null | undefined;
type NonNullable<T> = T extends null | undefined ? never : T;

type A = NonNullable<string | null>; // string
```

Key concepts:
- `T extends U ? X : Y` syntax
- `infer` keyword for type inference
- Distributive over union types
- Used in many utility types

### Question 5: When should you use type aliases for complex type compositions?
**Answer**: Type aliases excel at complex type compositions. Use them when:

**1. Creating Discriminated Unions**:
```typescript
type Action =
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number }
  | { type: "RESET" };
```

**2. Building API Response Types**:
```typescript
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

**3. Recursive Type Definitions**:
```typescript
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};
```

**4. Complex Conditional Types**:
```typescript
type Flatten<T> = T extends Array<infer U> ? U : T;
```

**5. Multiple Type Transformations**:
```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};
```

Benefits:
- Better type inference
- Reusability
- Self-documenting code
- Compile-time safety

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Type Aliases |
|---------|-----------|------------------------|
| Type Definitions | No | Yes |
| Unions | Runtime checks | Compile-time types |
| Intersections | Object spreading | Type composition |
| Type Reusability | No | Full support |
| Complex Types | Manual validation | Type system |
| Conditional Types | Runtime logic | Compile-time types |

```javascript
// JavaScript - Runtime checking
function process(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    // ...
  }
}

// TypeScript - Compile-time types
type StringOrNumber = string | number;
function process(value: StringOrNumber): void {
  // Type-safe at compile time
}
```

## Additional Resources

- [TypeScript Handbook - Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
