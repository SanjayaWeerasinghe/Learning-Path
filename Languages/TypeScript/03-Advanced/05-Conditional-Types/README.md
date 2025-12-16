# Conditional Types

## Introduction

Conditional types in TypeScript allow you to create types that depend on a condition, similar to ternary expressions in JavaScript. They enable powerful type-level programming, allowing types to select different forms based on type relationships. Conditional types are fundamental to many advanced TypeScript patterns and utility types.

## Key Concepts

### Basic Syntax

Conditional types use the ternary operator syntax at the type level:

```typescript
type TypeName<T> = T extends SomeType ? TypeA : TypeB;
```

### Type Inference with infer

The `infer` keyword extracts types within conditional types:

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### Distributive Conditional Types

Conditional types distribute over union types:

```typescript
type ToArray<T> = T extends any ? T[] : never;
// ToArray<string | number> = string[] | number[]
```

## TypeScript-Specific Code Examples

### Example 1: Basic Conditional Types

```typescript
// Simple conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
type C = IsString<"hello">; // true

// Type selection based on condition
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : "object";

type T1 = TypeName<string>; // "string"
type T2 = TypeName<42>; // "number"
type T3 = TypeName<true>; // "boolean"
type T4 = TypeName<{}>; // "object"

// Exclude null and undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type T5 = NonNullable<string | null>; // string
type T6 = NonNullable<number | undefined>; // number
type T7 = NonNullable<string | null | undefined>; // string

// Extract specific types from union
type ExtractString<T> = T extends string ? T : never;

type T8 = ExtractString<string | number>; // string
type T9 = ExtractString<boolean | string>; // string
```

### Example 2: Type Inference with infer

```typescript
// Extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: "1", name: "Alice" };
}

type User = ReturnType<typeof getUser>;
// { id: string; name: string; }

// Extract parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number) {
  return { name, age };
}

type Params = Parameters<typeof createUser>;
// [string, number]

// Extract array element type
type ArrayElement<T> = T extends (infer E)[] ? E : never;

type T1 = ArrayElement<string[]>; // string
type T2 = ArrayElement<number[]>; // number

// Extract Promise value
type Awaited<T> = T extends Promise<infer U> ? U : T;

type T3 = Awaited<Promise<string>>; // string
type T4 = Awaited<number>; // number

// Nested Promise unwrapping
type DeepAwaited<T> = T extends Promise<infer U>
  ? DeepAwaited<U>
  : T;

type T5 = DeepAwaited<Promise<Promise<string>>>; // string

// Extract first element of tuple
type First<T> = T extends [infer F, ...any[]] ? F : never;

type T6 = First<[string, number, boolean]>; // string
type T7 = First<[number]>; // number
```

### Example 3: Distributive Conditional Types

```typescript
// Distributive behavior over unions
type ToArray<T> = T extends any ? T[] : never;

type T1 = ToArray<string | number>;
// Distributes to: ToArray<string> | ToArray<number>
// Result: string[] | number[]

// Boxing types
type Boxed<T> = T extends any ? { value: T } : never;

type T2 = Boxed<string | number>;
// { value: string } | { value: number }

// Exclude type from union (built-in Exclude)
type MyExclude<T, U> = T extends U ? never : T;

type T3 = MyExclude<"a" | "b" | "c", "a">;
// "b" | "c"

type T4 = MyExclude<string | number | boolean, number>;
// string | boolean

// Extract type from union (built-in Extract)
type MyExtract<T, U> = T extends U ? T : never;

type T5 = MyExtract<"a" | "b" | "c", "a" | "c">;
// "a" | "c"

type T6 = MyExtract<string | number | boolean, number | boolean>;
// number | boolean

// Non-distributive conditional (using tuple)
type NoDistribute<T> = [T] extends [any] ? T[] : never;

type T7 = NoDistribute<string | number>;
// (string | number)[] - single array, not distributed
```

### Example 4: Advanced Inference Patterns

```typescript
// Infer function this parameter
type ThisParameter<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : never;

function greet(this: { name: string }) {
  return `Hello, ${this.name}`;
}

type GreetThis = ThisParameter<typeof greet>;
// { name: string }

// Infer constructor parameters
type ConstructorParameters<T> = T extends new (...args: infer P) => any
  ? P
  : never;

class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;
// [string, number]

// Infer instance type
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never;

type PersonInstance = InstanceType<typeof Person>;
// Person

// Infer object value types
type ValueOf<T> = T extends { [key: string]: infer V } ? V : never;

interface User {
  id: string;
  name: string;
  age: number;
}

type UserValue = ValueOf<User>;
// string | number

// Infer from getter
type GetterType<T> = T extends { get(): infer R } ? R : never;

interface Container {
  get(): string;
}

type Contained = GetterType<Container>;
// string
```

### Example 5: Conditional Type Chains

```typescript
// Chained conditionals
type UnwrapArray<T> = T extends Array<infer U>
  ? U extends Array<infer V>
    ? V extends Array<infer W>
      ? W
      : V
    : U
  : T;

type T1 = UnwrapArray<string[][][]>; // string
type T2 = UnwrapArray<number[][]>; // number
type T3 = UnwrapArray<boolean>; // boolean

// Recursive unwrapping
type DeepUnwrap<T> = T extends Array<infer U>
  ? DeepUnwrap<U>
  : T;

type T4 = DeepUnwrap<string[][][][]>; // string

// Type conversion chain
type ToString<T> = T extends string
  ? T
  : T extends number
  ? `${T}`
  : T extends boolean
  ? `${T}`
  : never;

type T5 = ToString<42>; // "42"
type T6 = ToString<true>; // "true"
type T7 = ToString<"hello">; // "hello"

// Nested object path extraction
type PathValue<T, P> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : P extends keyof T
  ? T[P]
  : never;

interface NestedObj {
  user: {
    name: string;
    address: {
      city: string;
      zip: number;
    };
  };
}

type City = PathValue<NestedObj, "user.address.city">; // string
type Zip = PathValue<NestedObj, "user.address.zip">; // number
```

### Example 6: Mapped Types with Conditional Types

```typescript
// Filter properties by type
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface Data {
  id: number;
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type StringProps = PickByType<Data, string>;
// { name: string; email: string; }

type NumberProps = PickByType<Data, number>;
// { id: number; age: number; }

// Exclude properties by type
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

type NonStringProps = OmitByType<Data, string>;
// { id: number; age: number; active: boolean; }

// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface User {
  id: string;
  name: string;
  email: string;
}

type UserWithOptionalEmail = PartialBy<User, "email">;
// { id: string; name: string; email?: string; }

// Make specific properties required
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

interface OptionalUser {
  id?: string;
  name?: string;
  email?: string;
}

type UserWithRequiredId = RequiredBy<OptionalUser, "id">;
// { id: string; name?: string; email?: string; }

// Readonly for specific properties
type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

type UserWithReadonlyId = ReadonlyBy<User, "id">;
// { readonly id: string; name: string; email: string; }
```

### Example 7: Function Overload Resolution

```typescript
// Resolve function overload
type OverloadedReturnType<T> = T extends {
  (...args: infer A1): infer R1;
  (...args: infer A2): infer R2;
  (...args: infer A3): infer R3;
}
  ? R1 | R2 | R3
  : T extends (...args: any[]) => infer R
  ? R
  : never;

function overloaded(x: string): string;
function overloaded(x: number): number;
function overloaded(x: string | number): string | number {
  return x;
}

type Return = OverloadedReturnType<typeof overloaded>;
// string | number

// Extract all parameter combinations
type OverloadedParameters<T> = T extends {
  (...args: infer A1): any;
  (...args: infer A2): any;
}
  ? A1 | A2
  : T extends (...args: infer A) => any
  ? A
  : never;

type Params = OverloadedParameters<typeof overloaded>;
// [string] | [number]

// Create union of all overload signatures
type FunctionSignatures<T> = T extends {
  (...args: infer A1): infer R1;
  (...args: infer A2): infer R2;
}
  ? ((...args: A1) => R1) | ((...args: A2) => R2)
  : T;
```

### Example 8: Real-World Conditional Type Patterns

```typescript
// API response type based on method
type ApiResponse<
  Method extends "GET" | "POST" | "PUT" | "DELETE",
  Data
> = Method extends "GET"
  ? { data: Data }
  : Method extends "POST"
  ? { data: Data; id: string }
  : Method extends "PUT"
  ? { data: Data; updated: true }
  : Method extends "DELETE"
  ? { success: true }
  : never;

type GetResponse = ApiResponse<"GET", User>;
// { data: User }

type PostResponse = ApiResponse<"POST", User>;
// { data: User; id: string }

// Component props based on variant
type ButtonProps<Variant extends "primary" | "secondary" | "link"> =
  Variant extends "link"
    ? { variant: "link"; href: string; onClick?: never }
    : { variant: Variant; onClick: () => void; href?: never };

const primaryButton: ButtonProps<"primary"> = {
  variant: "primary",
  onClick: () => {}
};

const linkButton: ButtonProps<"link"> = {
  variant: "link",
  href: "/path"
};

// Form field type based on field type
type FormField<Type extends "text" | "number" | "select"> = {
  type: Type;
  name: string;
  value: Type extends "text"
    ? string
    : Type extends "number"
    ? number
    : Type extends "select"
    ? string
    : never;
  options?: Type extends "select" ? string[] : never;
};

const textField: FormField<"text"> = {
  type: "text",
  name: "username",
  value: "alice"
};

const selectField: FormField<"select"> = {
  type: "select",
  name: "role",
  value: "admin",
  options: ["admin", "user"]
};

// Database query result based on query type
type QueryResult<
  T,
  Mode extends "single" | "many"
> = Mode extends "single" ? T | null : T[];

function query<T, Mode extends "single" | "many">(
  sql: string,
  mode: Mode
): QueryResult<T, Mode> {
  // Implementation
  return null as any;
}

const user = query<User, "single">("SELECT ...", "single"); // User | null
const users = query<User, "many">("SELECT ...", "many"); // User[]
```

## Practical Tasks

### Task 1: Build Type-Safe Router
Create a routing system with conditional types:
1. Route path types with parameter extraction
2. Handler types based on route definition
3. Request/response types from routes
4. Type-safe route building
5. Nested route support

### Task 2: Form Builder Types
Design form types with conditional logic:
1. Field types based on input type
2. Validation types conditional on field type
3. Value types from field definitions
4. Error types based on validation
5. Submission types from form schema

### Task 3: State Machine Types
Implement state machine with conditional types:
1. State transition types
2. Event types based on current state
3. Context types conditional on state
4. Action types from state/event pairs
5. Reducer types with type safety

### Task 4: GraphQL-like Type System
Build a query type system:
1. Query result types from schema
2. Nested selection types
3. Fragment types
4. Variable types from query
5. Response types with type inference

## Best Practices

1. **Understand Distribution**: Know when conditional types distribute over unions
2. **Use infer Wisely**: Extract types meaningfully with infer keyword
3. **Avoid Deep Nesting**: Keep conditional type chains manageable
4. **Document Complex Logic**: Add comments for complex conditional types
5. **Test Edge Cases**: Verify conditional types with various inputs
6. **Use Helper Types**: Break complex conditionals into helper types
7. **Leverage Built-ins**: Use TypeScript's built-in conditional utilities
8. **Type Constraints**: Add constraints to prevent invalid inputs
9. **Performance**: Be aware of compilation performance
10. **Readability**: Prioritize clear, maintainable types

## Interview Questions

### Question 1: What are conditional types and how do they work?
**Answer**: Conditional types select one of two types based on a condition, using syntax similar to JavaScript's ternary operator at the type level.

**Basic Syntax**:
```typescript
type TypeName<T> = T extends SomeType ? TypeA : TypeB;
```

**Examples**:
```typescript
// Check if type is string
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Extract or exclude types
type NonNullable<T> = T extends null | undefined ? never : T;

type C = NonNullable<string | null>; // string

// Type transformation
type ArrayOrSingle<T> = T extends any[] ? T : T[];

type D = ArrayOrSingle<string>; // string[]
type E = ArrayOrSingle<number[]>; // number[]
```

**How They Work**:
1. TypeScript checks if `T` extends `SomeType`
2. If true, resolves to `TypeA`
3. If false, resolves to `TypeB`
4. Can be nested for complex logic
5. Distribute over union types by default

Use cases:
- Type extraction and transformation
- Building utility types
- Conditional property types
- Type narrowing based on conditions

### Question 2: Explain the infer keyword in conditional types
**Answer**: The `infer` keyword is used within conditional types to extract and capture types for use in the true branch.

```typescript
// Extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): User {
  return { id: "1", name: "Alice", email: "alice@example.com", age: 30 };
}

type UserType = ReturnType<typeof getUser>; // User

// Extract parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number): User {
  return { id: "1", name, age, email: "" };
}

type Params = Parameters<typeof createUser>; // [string, number]

// Extract array element type
type ArrayElement<T> = T extends (infer E)[] ? E : never;

type Element = ArrayElement<string[]>; // string

// Extract Promise value
type Awaited<T> = T extends Promise<infer U> ? U : T;

type Value = Awaited<Promise<number>>; // number

// Multiple infer in same type
type FirstAndRest<T> = T extends [infer F, ...infer R] ? [F, R] : never;

type Split = FirstAndRest<[string, number, boolean]>;
// [string, [number, boolean]]
```

Key points:
- `infer R` declares type variable R
- R is only available in true branch
- Can infer from function signatures, arrays, objects
- Multiple infer keywords can be used
- Useful for building utility types

### Question 3: What is distributive conditional type behavior?
**Answer**: Distributive conditional types automatically distribute over union types, applying the conditional type to each union member individually.

**Distributive** (default):
```typescript
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// Distributes to: ToArray<string> | ToArray<number>
// Result: string[] | number[]

// Exclude (distributes)
type MyExclude<T, U> = T extends U ? never : T;

type Remaining = MyExclude<"a" | "b" | "c", "a">;
// "a" extends "a" ? never : "a" = never
// "b" extends "a" ? never : "b" = "b"
// "c" extends "a" ? never : "c" = "c"
// Result: "b" | "c"
```

**Non-Distributive** (using tuple):
```typescript
type NoDistribute<T> = [T] extends [any] ? T[] : never;

type Result2 = NoDistribute<string | number>;
// [string | number] extends [any] ? (string | number)[] : never
// Result: (string | number)[] - single array type

// Practical: boxed union vs distributed boxes
type Boxed<T> = { value: T };
type DistributedBox<T> = T extends any ? { value: T } : never;

type A = Boxed<string | number>; // { value: string | number }
type B = DistributedBox<string | number>; // { value: string } | { value: number }
```

**Rules**:
1. Conditional type must be `T extends ...`
2. T must be naked type parameter (not in array, object, etc.)
3. Each union member processed individually
4. Results combined back into union

**Prevent distribution**:
- Wrap in tuple: `[T] extends [U]`
- Wrap in array: `T[] extends U[]`
- Use type alias before conditional

### Question 4: How do you build complex type transformations with conditional types?
**Answer**: Complex transformations combine conditional types, mapped types, and inference patterns.

**Pattern 1: Deep Type Transformation**
```typescript
// Deep partial (all levels optional)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  server: {
    port: number;
    ssl: { enabled: boolean; };
  };
}

type PartialConfig = DeepPartial<Config>;
// All properties at all levels optional
```

**Pattern 2: Property Filtering**
```typescript
// Pick properties by type
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type StringProps = PickByType<User, string>;
// { name: string; email: string }
```

**Pattern 3: Path-based Access**
```typescript
// Get type from object path
type PathValue<T, P> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? PathValue<T[K], R>
    : never
  : P extends keyof T
  ? T[P]
  : never;

interface Nested {
  user: {
    address: {
      city: string;
    };
  };
}

type City = PathValue<Nested, "user.address.city">; // string
```

**Pattern 4: Function Transformation**
```typescript
// Async version of functions
type Asyncify<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<R>
  : never;

type SyncFn = (x: number) => string;
type AsyncFn = Asyncify<SyncFn>; // (x: number) => Promise<string>
```

**Pattern 5: Union to Intersection**
```typescript
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>;
// { a: string } & { b: number }
```

### Question 5: What are practical use cases for conditional types?
**Answer**: Conditional types enable many real-world type-safety patterns.

**Use Case 1: API Response Types**
```typescript
type ApiResponse<
  Method extends "GET" | "POST" | "PUT" | "DELETE",
  Data
> = Method extends "GET"
  ? { data: Data }
  : Method extends "POST"
  ? { data: Data; id: string }
  : Method extends "PUT"
  ? { data: Data; updated: boolean }
  : { success: boolean };

type GetResponse = ApiResponse<"GET", User>; // { data: User }
type PostResponse = ApiResponse<"POST", User>; // { data: User; id: string }
```

**Use Case 2: Form Field Types**
```typescript
type FormField<Type extends "text" | "number" | "checkbox"> = {
  type: Type;
  value: Type extends "text"
    ? string
    : Type extends "number"
    ? number
    : boolean;
};

const textField: FormField<"text"> = {
  type: "text",
  value: "hello" // Must be string
};
```

**Use Case 3: Query Result Types**
```typescript
type QueryResult<T, Single extends boolean> =
  Single extends true ? T | null : T[];

function query<T, S extends boolean>(
  sql: string,
  single: S
): QueryResult<T, S> {
  // Implementation
  return null as any;
}

const user = query<User, true>("...", true); // User | null
const users = query<User, false>("...", false); // User[]
```

**Use Case 4: Event Handler Types**
```typescript
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}`]?: (
    value: T[K]
  ) => void;
};

type UserHandlers = EventHandlers<User>;
// { onId?: (value: string) => void; onName?: (value: string) => void; ... }
```

**Use Case 5: Utility Type Composition**
```typescript
// Make specific properties required
type RequireKeys<T, K extends keyof T> =
  Omit<T, K> & Required<Pick<T, K>>;

type UserWithRequiredEmail = RequireKeys<User, "email">;
// email is required, others remain as-is
```

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Conditional Types |
|---------|-----------|----------------------------|
| Conditional Logic | if/else, ternary | Type-level ternary |
| Type Checking | Runtime | Compile-time |
| Type Extraction | N/A | infer keyword |
| Distribution | N/A | Over union types |
| Composition | Functions | Type operators |

## Additional Resources

- [TypeScript Handbook - Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
- [Type Inference in Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
- [Advanced Type Patterns](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
