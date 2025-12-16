# Utility Types

## Introduction

TypeScript provides a rich set of built-in utility types that perform common type transformations. These utilities help you manipulate and compose types effectively, reducing code duplication and improving type safety. Understanding these utilities is essential for advanced TypeScript development.

## Key Concepts

### Built-in Utility Types

TypeScript includes many utility types out of the box:
- `Partial<T>`, `Required<T>`, `Readonly<T>`
- `Pick<T, K>`, `Omit<T, K>`, `Exclude<T, U>`, `Extract<T, U>`
- `Record<K, T>`, `ReturnType<T>`, `Parameters<T>`
- And many more...

### Type Transformation

Utility types transform existing types into new types:

```typescript
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
```

### Custom Utility Types

You can create your own utility types for specific needs.

## TypeScript-Specific Code Examples

### Example 1: Partial, Required, and Readonly

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; age?: number; }

const partialUser: PartialUser = {
  name: "Alice" // Other properties are optional
};

// Required - makes all properties required
type OptionalUser = {
  id?: string;
  name?: string;
  email?: string;
};

type RequiredUser = Required<OptionalUser>;
// { id: string; name: string; email: string; }

const requiredUser: RequiredUser = {
  id: "1",
  name: "Alice",
  email: "alice@example.com" // All required
};

// Readonly - makes all properties readonly
type ReadonlyUser = Readonly<User>;
// { readonly id: string; readonly name: string; ... }

const readonlyUser: ReadonlyUser = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  age: 30
};

// readonlyUser.name = "Bob"; // Error: Cannot assign to 'name' because it is read-only

// Combining utilities
type PartialReadonlyUser = Partial<Readonly<User>>;
// { readonly id?: string; readonly name?: string; ... }
```

### Example 2: Pick and Omit

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  address: string;
}

// Pick - select specific properties
type UserPreview = Pick<User, "id" | "name" | "email">;
// { id: string; name: string; email: string; }

const preview: UserPreview = {
  id: "1",
  name: "Alice",
  email: "alice@example.com"
};

// Omit - exclude specific properties
type UserWithoutPassword = Omit<User, "password">;
// { id: string; name: string; email: string; age: number; address: string; }

const safeUser: UserWithoutPassword = {
  id: "1",
  name: "Alice",
  email: "alice@example.com",
  age: 30,
  address: "123 Main St"
};

// Omit multiple properties
type UserPublicInfo = Omit<User, "password" | "email">;
// { id: string; name: string; age: number; address: string; }

// Pick for function parameters
type LoginCredentials = Pick<User, "email" | "password">;

function login(credentials: LoginCredentials): void {
  console.log(`Logging in ${credentials.email}`);
}
```

### Example 3: Record, Extract, and Exclude

```typescript
// Record - create an object type with specific keys and value type
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// Record with complex value types
type UserRoles = Record<string, { role: Role; active: boolean }>;

const userRoles: UserRoles = {
  "user1": { role: "admin", active: true },
  "user2": { role: "user", active: false }
};

// Exclude - remove types from union
type AllTypes = string | number | boolean | null;
type NonNullableTypes = Exclude<AllTypes, null>;
// string | number | boolean

type Status = "pending" | "approved" | "rejected" | "cancelled";
type ActiveStatus = Exclude<Status, "cancelled" | "rejected">;
// "pending" | "approved"

// Extract - extract types from union
type ExtractedTypes = Extract<AllTypes, string | number>;
// string | number

type SuccessStatus = Extract<Status, "approved">;
// "approved"

// Practical example
type Event =
  | { type: "click"; x: number; y: number }
  | { type: "keypress"; key: string }
  | { type: "focus" }
  | { type: "blur" };

type MouseEvent = Extract<Event, { type: "click" }>;
// { type: "click"; x: number; y: number }
```

### Example 4: ReturnType, Parameters, and ConstructorParameters

```typescript
// ReturnType - extract function return type
function getUser() {
  return {
    id: "1",
    name: "Alice",
    email: "alice@example.com"
  };
}

type User = ReturnType<typeof getUser>;
// { id: string; name: string; email: string; }

async function fetchData() {
  return { data: "result" };
}

type FetchResult = ReturnType<typeof fetchData>;
// Promise<{ data: string; }>

// Parameters - extract function parameter types
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]

// Use with spread
function callCreateUser(...args: CreateUserParams) {
  return createUser(...args);
}

// ConstructorParameters - extract constructor parameter types
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// [string, number]

function createPerson(...args: PersonParams) {
  return new Person(...args);
}

// InstanceType - extract instance type from constructor
type PersonInstance = InstanceType<typeof Person>;
// Person

function processPerson(person: PersonInstance) {
  console.log(person.name);
}
```

### Example 5: NonNullable, Awaited, and ThisParameterType

```typescript
// NonNullable - remove null and undefined
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// string

type MaybeUser = User | null | undefined;
type DefinitelyUser = NonNullable<MaybeUser>;
// User

// Awaited - unwrap Promise type
type AsyncString = Promise<string>;
type UnwrappedString = Awaited<AsyncString>;
// string

type NestedPromise = Promise<Promise<number>>;
type UnwrappedNumber = Awaited<NestedPromise>;
// number

async function getData(): Promise<User> {
  return { id: "1", name: "Alice", email: "alice@example.com", age: 30 };
}

type DataType = Awaited<ReturnType<typeof getData>>;
// User

// ThisParameterType - extract 'this' parameter type
function greet(this: User) {
  return `Hello, ${this.name}`;
}

type GreetThis = ThisParameterType<typeof greet>;
// User

// OmitThisParameter - remove 'this' parameter
type GreetWithoutThis = OmitThisParameter<typeof greet>;
// () => string

const user = { id: "1", name: "Alice", email: "alice@example.com", age: 30 };
greet.call(user); // "Hello, Alice"
```

### Example 6: Custom Utility Types

```typescript
// DeepPartial - make all properties optional recursively
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
}

type PartialConfig = DeepPartial<Config>;
// All nested properties are optional

const config: PartialConfig = {
  server: {
    ssl: {
      enabled: true
    }
  }
};

// DeepReadonly - make all properties readonly recursively
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ReadonlyConfig = DeepReadonly<Config>;

// Nullable - add null to all properties
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
// { id: string | null; name: string | null; ... }

// PickByType - pick properties by their type
type PickByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

interface Mixed {
  id: number;
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type StringProps = PickByType<Mixed, string>;
// { name: string; email: string; }

type NumberProps = PickByType<Mixed, number>;
// { id: number; age: number; }

// Mutable - remove readonly modifier
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type MutableConfig = Mutable<ReadonlyConfig>;
```

### Example 7: Advanced Utility Combinations

```typescript
// Flatten - flatten nested unions
type Flatten<T> = T extends Array<infer U> ? U : T;

type NestedArray = string[][];
type FlattenedArray = Flatten<NestedArray>;
// string[]

// UnionToIntersection - convert union to intersection
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>;
// { a: string } & { b: number }

// PromiseValue - extract value from Promise
type PromiseValue<T> = T extends Promise<infer U> ? U : T;

type Value = PromiseValue<Promise<string>>;
// string

// Merge - merge two types
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

type A = { a: string; b: number };
type B = { b: string; c: boolean };
type Merged = Merge<A, B>;
// { a: string; b: string; c: boolean }

// PathsToProps - get all possible paths in object
type PathsToProps<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? PathsToProps<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];

interface NestedObject {
  user: {
    name: string;
    address: {
      city: string;
      zip: number;
    };
  };
}

type Paths = PathsToProps<NestedObject>;
// "user.name" | "user.address.city" | "user.address.zip"
```

### Example 8: Practical Utility Type Patterns

```typescript
// API Response wrapper
type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  error: string;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Form state utility
type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
};

type UserForm = FormState<User>;

// Async state utility
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

type UserState = AsyncState<User>;

// Event handler types
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]?: (value: T[K]) => void;
};

type UserEventHandlers = EventHandlers<User>;
// { onId?: (value: string) => void; onName?: (value: string) => void; ... }

// Required properties only
type RequiredOnly<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
};

type OptionalProps = {
  id: string;
  name?: string;
  age?: number;
};

type Required = RequiredOnly<OptionalProps>;
// { id: string }

// Optional properties only
type OptionalOnly<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: T[K];
};

type Optional = OptionalOnly<OptionalProps>;
// { name?: string; age?: number }
```

## Practical Tasks

### Task 1: Build Form Utilities
Create utility types for form handling:
1. FormState<T> for form values, errors, and touched fields
2. FormValidation<T> for validation rules
3. FormHandlers<T> for event handlers
4. FormHelpers for common form operations
5. Type-safe field accessors

### Task 2: API Response Types
Design API response utility types:
1. AsyncState<T> for loading states
2. ApiResponse<T> for success/error responses
3. PaginatedResponse<T> for paginated data
4. CachedResponse<T> with metadata
5. Type-safe error handling

### Task 3: State Management Utilities
Create state management helper types:
1. Action creators with type inference
2. Reducer type utilities
3. Selector return type extraction
4. Middleware type helpers
5. Store composition utilities

### Task 4: Database Model Types
Build ORM-like type utilities:
1. Model<T> for entity definitions
2. Relations<T> for relationship types
3. QueryBuilder<T> for type-safe queries
4. Migration<T> for schema changes
5. Repository<T> for CRUD operations

## Best Practices

1. **Use Built-in Utilities First**: Leverage TypeScript's built-in utilities before creating custom ones
2. **Compose Utilities**: Build complex types from simpler utility types
3. **Document Custom Utilities**: Add JSDoc comments explaining usage
4. **Test Edge Cases**: Verify utilities work with edge cases
5. **Keep It Simple**: Don't over-engineer utility types
6. **Reuse Patterns**: Create reusable utility type patterns
7. **Type Safety**: Ensure utilities maintain type safety
8. **Performance**: Be aware of complex utility type compilation time
9. **Naming**: Use clear, descriptive names for custom utilities
10. **Version Compatibility**: Check TypeScript version for utility support

## Interview Questions

### Question 1: Explain Partial, Required, and Readonly utility types
**Answer**: These are fundamental utility types that modify property modifiers.

**Partial<T>** - Makes all properties optional:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; }

// Useful for updates
function updateUser(id: string, updates: Partial<User>) {
  // Apply partial updates
}

updateUser("1", { name: "Alice" }); // Only update name
```

**Required<T>** - Makes all properties required:
```typescript
type OptionalUser = {
  id?: string;
  name?: string;
};

type RequiredUser = Required<OptionalUser>;
// { id: string; name: string; }

// Useful for ensuring complete objects
function saveUser(user: RequiredUser) {
  // All fields guaranteed
}
```

**Readonly<T>** - Makes all properties readonly:
```typescript
type ReadonlyUser = Readonly<User>;
// { readonly id: string; readonly name: string; readonly email: string; }

const user: ReadonlyUser = { id: "1", name: "Alice", email: "alice@example.com" };
// user.name = "Bob"; // Error
```

Implementation:
```typescript
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

### Question 2: What's the difference between Pick and Omit?
**Answer**: Pick and Omit are opposite operations for selecting properties.

**Pick<T, K>** - Select specific properties:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type UserPreview = Pick<User, "id" | "name">;
// { id: string; name: string; }

// Use when you want specific properties
const preview: UserPreview = {
  id: "1",
  name: "Alice"
};
```

**Omit<T, K>** - Exclude specific properties:
```typescript
type UserWithoutPassword = Omit<User, "password">;
// { id: string; name: string; email: string; }

// Use when you want most properties except some
const safeUser: UserWithoutPassword = {
  id: "1",
  name: "Alice",
  email: "alice@example.com"
};
```

**When to use**:
- Pick: When selecting few properties from many
- Omit: When excluding few properties from many

Implementation:
```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

### Question 3: How do ReturnType and Parameters work?
**Answer**: These utilities extract types from functions.

**ReturnType<T>** - Extract return type:
```typescript
function getUser() {
  return {
    id: "1",
    name: "Alice",
    email: "alice@example.com"
  };
}

type User = ReturnType<typeof getUser>;
// { id: string; name: string; email: string; }

// Works with async functions
async function fetchData() {
  return { data: "result" };
}

type FetchResult = ReturnType<typeof fetchData>;
// Promise<{ data: string }>

type UnwrappedResult = Awaited<ReturnType<typeof fetchData>>;
// { data: string }
```

**Parameters<T>** - Extract parameter types as tuple:
```typescript
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// [string, number, string]

// Use for type-safe wrappers
function wrappedCreateUser(...args: CreateUserParams) {
  console.log("Creating user...");
  return createUser(...args);
}
```

Implementation:
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
```

### Question 4: What is Record and when should you use it?
**Answer**: Record<K, T> creates an object type with specific keys and value type.

```typescript
// Basic usage
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"]
};

// With string keys
type UserMap = Record<string, User>;

const users: UserMap = {
  "user1": { id: "1", name: "Alice", email: "alice@example.com", age: 30 },
  "user2": { id: "2", name: "Bob", email: "bob@example.com", age: 25 }
};

// Complex value types
type Config = Record<string, string | number | boolean>;

const config: Config = {
  host: "localhost",
  port: 3000,
  secure: true
};
```

**When to use**:
- Creating dictionaries/maps
- Ensuring all keys of a union are present
- Type-safe key-value pairs
- Configuration objects

**Compared to index signature**:
```typescript
// Index signature - any string key
interface AnyStringKey {
  [key: string]: string;
}

// Record - specific keys
type SpecificKeys = Record<"a" | "b" | "c", string>;
// Must have exactly keys: a, b, c
```

### Question 5: How do you create custom utility types?
**Answer**: Custom utility types use mapped types, conditional types, and type inference to create reusable type transformations.

**Pattern 1: Mapped Types**
```typescript
// Make properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Pick properties by type
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface Data {
  id: number;
  name: string;
  count: number;
}

type StringProps = PickByType<Data, string>;
// { name: string }
```

**Pattern 2: Conditional Types**
```typescript
// Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Unwrap arrays
type Flatten<T> = T extends Array<infer U> ? U : T;
```

**Pattern 3: Template Literals**
```typescript
// Event handlers
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]?: (value: T[K]) => void;
};

type UserHandlers = EventHandlers<User>;
// { onId?: (value: string) => void; onName?: (value: string) => void; ... }
```

**Best Practices**:
- Start with built-in utilities
- Compose simple utilities into complex ones
- Test with various types
- Document usage with examples
- Consider edge cases (undefined, null, nested objects)

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Utility Types |
|---------|-----------|-------------------------|
| Type Transformation | Runtime only | Compile-time |
| Property Selection | Object destructuring | Pick/Omit |
| Optional Properties | Manual checks | Partial |
| Readonly | Object.freeze() | Readonly |
| Type Extraction | N/A | ReturnType, Parameters |
| Type Composition | N/A | Record, Merge utilities |

## Additional Resources

- [TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Type Manipulation](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
