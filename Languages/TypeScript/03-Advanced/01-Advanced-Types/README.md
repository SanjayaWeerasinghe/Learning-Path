# Advanced Types

## Introduction

Advanced types in TypeScript enable sophisticated type manipulation and transformations. These include mapped types, conditional types, template literal types, and more. Mastering these features allows you to create powerful, reusable type utilities and build highly type-safe applications.

## Key Concepts

### Mapped Types

Transform properties of existing types:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

### Conditional Types

Select types based on conditions:

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

### Template Literal Types

Create string literal types using templates:

```typescript
type Greeting = `Hello ${string}`;
```

## TypeScript-Specific Code Examples

### Example 1: Mapped Types

```typescript
// Basic mapped type - make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; }

// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialUser = Partial<User>;
// { name?: string; age?: number; }

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P]; // -? removes optionality
};

type OptionalUser = {
  name?: string;
  age?: number;
};

type RequiredUser = Required<OptionalUser>;
// { name: string; age: number; }

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserPreview = Pick<User, "name">;
// { name: string; }

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type UserWithoutAge = Omit<User, "age">;
// { name: string; }
```

### Example 2: Conditional Types

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Type extraction with infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): User {
  return { name: "Alice", age: 30 };
}

type UserReturnType = ReturnType<typeof getUser>; // User

// Parameters extraction
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function createUser(name: string, age: number): User {
  return { name, age };
}

type CreateUserParams = Parameters<typeof createUser>; // [string, number]

// Distributive conditional types
type ToArray<T> = T extends any ? T[] : never;

type StrOrNum = string | number;
type ArrayTypes = ToArray<StrOrNum>; // string[] | number[]

// Non-nullable type
type NonNullable<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>; // string

// Nested conditional types
type Flatten<T> = T extends Array<infer U>
  ? U extends Array<infer V>
    ? V
    : U
  : T;

type Nested = string[][];
type Flattened = Flatten<Nested>; // string[]
```

### Example 3: Template Literal Types

```typescript
// Basic template literal types
type Greeting = `Hello ${string}`;

const greeting1: Greeting = "Hello World"; // OK
const greeting2: Greeting = "Hello Alice"; // OK
// const greeting3: Greeting = "Hi there"; // Error

// Combining with union types
type Direction = "top" | "right" | "bottom" | "left";
type Margin = `margin-${Direction}`;

const margin: Margin = "margin-top"; // OK
// const margin2: Margin = "margin-center"; // Error

// Capitalization utilities
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

type UpperGreeting = Uppercase<"hello">; // "HELLO"
type LowerGreeting = Lowercase<"HELLO">; // "hello"
type CapitalizedGreeting = Capitalize<"hello">; // "Hello"
type UncapitalizedGreeting = Uncapitalize<"Hello">; // "hello"

// Event names from action types
type Action = "click" | "focus" | "blur";
type EventName = `on${Capitalize<Action>}`;
// "onClick" | "onFocus" | "onBlur"

// CSS properties
type CSSProperty = "color" | "background" | "border";
type CSSValue = "red" | "blue" | "green";
type CSSRule = `${CSSProperty}: ${CSSValue}`;
// "color: red" | "color: blue" | ... etc

// Path generation
type HTTPMethod = "get" | "post";
type Resource = "users" | "posts";
type APIPath = `/${HTTPMethod}/${Resource}`;
// "/get/users" | "/get/posts" | "/post/users" | "/post/posts"
```

### Example 4: Recursive Types

```typescript
// Recursive array type
type NestedArray<T> = T | NestedArray<T>[];

const nested: NestedArray<number> = [1, [2, [3, [4]]]];

// Recursive object type
type NestedObject<T> = {
  [K: string]: T | NestedObject<T>;
};

const nestedObj: NestedObject<string> = {
  a: "value",
  b: {
    c: "nested",
    d: {
      e: "deeply nested"
    }
  }
};

// Deep partial
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
// All properties at all levels are optional

// Deep readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ReadonlyConfig = DeepReadonly<Config>;
// All properties at all levels are readonly

// JSON type (recursive)
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const json: JSONValue = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    city: "NYC",
    coordinates: [40.7128, -74.0060]
  }
};
```

### Example 5: Index Access Types

```typescript
// Access type by key
interface Person {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type PersonName = Person["name"]; // string
type PersonAge = Person["age"]; // number
type PersonAddress = Person["address"]; // { street: string; city: string; }

// Multiple key access
type NameOrAge = Person["name" | "age"]; // string | number

// Nested access
type PersonCity = Person["address"]["city"]; // string

// Array element type
type StringArray = string[];
type StringType = StringArray[number]; // string

type TupleType = [string, number, boolean];
type TupleElements = TupleType[number]; // string | number | boolean

// Using with keyof
type PersonValues = Person[keyof Person];
// string | number | { street: string; city: string; }

// Practical example: Extract function return types
interface API {
  getUser: () => Promise<User>;
  getPost: () => Promise<Post>;
  getComment: () => Promise<Comment>;
}

type APIReturnTypes = {
  [K in keyof API]: ReturnType<API[K]>;
};
// { getUser: Promise<User>; getPost: Promise<Post>; ... }

type UnwrappedAPI = {
  [K in keyof API]: Awaited<ReturnType<API[K]>>;
};
// { getUser: User; getPost: Post; ... }
```

### Example 6: Utility Type Combinations

```typescript
// Combine multiple utility types
type PartialReadonly<T> = Partial<Readonly<T>>;

type User = {
  id: string;
  name: string;
  email: string;
};

type PartialReadonlyUser = PartialReadonly<User>;
// { readonly id?: string; readonly name?: string; readonly email?: string; }

// Required and Readonly
type RequiredReadonly<T> = Required<Readonly<T>>;

// Pick and Partial
type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>;

type OptionalNameAge = PartialPick<User, "name" | "age">;
// { name?: string; age?: string; }

// Exclude specific types from union
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

interface Mixed {
  name: string;
  age: number;
  greet: () => void;
  toString: () => string;
}

type DataKeys = NonFunctionKeys<Mixed>; // "name" | "age"

// Mutable (opposite of Readonly)
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
type MutableUser = Mutable<ReadonlyUser>;
// { id: string; name: string; email: string; }

// Nullable properties
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
// { id: string | null; name: string | null; email: string | null; }
```

### Example 7: Advanced Mapped Type Patterns

```typescript
// Getters type
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = {
  name: string;
  age: number;
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; }

// Setters type
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserSetters = Setters<User>;
// { setName: (value: string) => void; setAge: (value: number) => void; }

// Filter properties by value type
type PickByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

interface Data {
  id: number;
  name: string;
  age: number;
  active: boolean;
  email: string;
}

type StringProps = PickByType<Data, string>;
// { name: string; email: string; }

type NumberProps = PickByType<Data, number>;
// { id: number; age: number; }

// Remove specific properties
type OmitByType<T, V> = {
  [K in keyof T as T[K] extends V ? never : K]: T[K];
};

type NonStringProps = OmitByType<Data, string>;
// { id: number; age: number; active: boolean; }

// Prefix keys
type PrefixKeys<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};

type PrefixedUser = PrefixKeys<User, "user_">;
// { user_name: string; user_age: number; }
```

### Example 8: Type Inference and Constraints

```typescript
// Constrained type parameters
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30 };
const name = getProperty(user, "name"); // Type: string
const age = getProperty(user, "age"); // Type: number

// Multiple constraints
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ a: 1 }, { b: "2" });
// Type: { a: number } & { b: string }

// Infer from function arguments
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

const numbers = createArray(5, 0); // Type: number[]
const strings = createArray(3, ""); // Type: string[]

// Infer from complex structures
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type A = UnwrapPromise<Promise<string>>; // string
type B = UnwrapPromise<number>; // number

// Infer array element type
type ArrayElement<T> = T extends (infer E)[] ? E : T;

type C = ArrayElement<string[]>; // string
type D = ArrayElement<number>; // number

// Variadic tuple types
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type Result = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// Named tuple elements
type Point = [x: number, y: number, z?: number];

function distance(...point: Point): number {
  const [x, y, z = 0] = point;
  return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
}
```

## Practical Tasks

### Task 1: Build Type-Safe Form System
Create a comprehensive form type system:
1. Build mapped types for form fields
2. Create validation result types with conditional types
3. Implement error types using template literals
4. Build form state transformations
5. Create type-safe event handlers

### Task 2: Implement Deep Utility Types
Create advanced utility types:
1. DeepPartial for nested objects
2. DeepRequired for nested required properties
3. DeepPick for nested property selection
4. DeepOmit for nested property exclusion
5. PathsToProps for getting all possible paths

### Task 3: Type-Safe API Client
Build an API client with advanced types:
1. Map endpoint definitions to types
2. Create response transformers using mapped types
3. Implement request/response type inference
4. Build error handling with discriminated unions
5. Create type-safe middleware system

### Task 4: State Management Types
Design Redux-like state types:
1. Action creators with template literals
2. Reducer type inference
3. Selector return type extraction
4. Async action type handling
5. Store type composition

## Best Practices

1. **Keep Types Simple**: Don't over-complicate type definitions
2. **Document Complex Types**: Add JSDoc comments for advanced types
3. **Use Built-in Utilities**: Leverage TypeScript's built-in utility types
4. **Test Edge Cases**: Test complex types with various inputs
5. **Avoid Deep Recursion**: Be mindful of recursion depth limits
6. **Name Clearly**: Use descriptive names for custom utility types
7. **Compose Types**: Build complex types from simpler ones
8. **Performance**: Complex types can slow compilation
9. **Readability**: Prioritize code readability over cleverness
10. **Version Compatibility**: Check TypeScript version for feature support

## Interview Questions

### Question 1: Explain mapped types and provide examples
**Answer**: Mapped types create new types by transforming properties of existing types. They iterate over keys using `[P in keyof T]` syntax.

```typescript
// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface User {
  id: string;
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly id: string; readonly name: string; readonly age: number; }

type UserPreview = Pick<User, "id" | "name">;
// { id: string; name: string; }

// Custom mapped type with transformation
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getId: () => string; getName: () => string; getAge: () => number; }
```

Key concepts:
- `keyof T` gets all property keys
- `[P in keyof T]` iterates over keys
- Can add/remove modifiers (`readonly`, `?`)
- Can transform keys with `as` clause

### Question 2: How do conditional types work with the `infer` keyword?
**Answer**: Conditional types select types based on conditions, and `infer` allows extracting (inferring) types from within conditional types.

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

// With infer - extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): User {
  return { id: "1", name: "Alice", age: 30 };
}

type UserType = ReturnType<typeof getUser>; // User

// Extract parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function create(name: string, age: number): User {
  return { id: "1", name, age };
}

type Params = Parameters<typeof create>; // [string, number]

// Extract array element type
type ArrayElement<T> = T extends (infer E)[] ? E : never;

type Element = ArrayElement<string[]>; // string

// Unwrap Promise
type Awaited<T> = T extends Promise<infer U> ? U : T;

type A = Awaited<Promise<string>>; // string
type B = Awaited<number>; // number
```

`infer` is used to:
- Extract types from generics
- Capture types in conditions
- Build utility types
- Type transformation

### Question 3: What are template literal types?
**Answer**: Template literal types use template string syntax to create string literal types, enabling sophisticated string type manipulations.

```typescript
// Basic template literal type
type Greeting = `Hello ${string}`;

const a: Greeting = "Hello World"; // OK
const b: Greeting = "Hello Alice"; // OK

// With union types
type Direction = "top" | "right" | "bottom" | "left";
type Padding = `padding-${Direction}`;
// "padding-top" | "padding-right" | "padding-bottom" | "padding-left"

// String manipulation utilities
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

type Upper = Uppercase<"hello">; // "HELLO"
type Capitalized = Capitalize<"hello">; // "Hello"

// Event names
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"

// Path generation
type HTTP = "get" | "post";
type Resource = "users" | "posts";
type API = `/${HTTP}/${Resource}`;
// "/get/users" | "/get/posts" | "/post/users" | "/post/users"

// Practical use: Type-safe CSS
type Color = "red" | "blue";
type Size = "sm" | "lg";
type ClassName = `${Color}-${Size}`;
// "red-sm" | "red-lg" | "blue-sm" | "blue-lg"
```

Use cases:
- API endpoint types
- CSS class names
- Event names
- Internationalization keys
- Type-safe string formatting

### Question 4: How do you create recursive types?
**Answer**: Recursive types reference themselves in their definition, useful for tree structures and nested data.

```typescript
// Recursive array
type NestedArray<T> = T | NestedArray<T>[];

const nested: NestedArray<number> = [1, [2, [3, [4]]]];

// Recursive object
type NestedObject<T> = {
  [K: string]: T | NestedObject<T>;
};

// Tree structure
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

const tree: TreeNode<string> = {
  value: "root",
  children: [
    {
      value: "child1",
      children: [{ value: "grandchild1" }]
    },
    { value: "child2" }
  ]
};

// Deep partial (all levels optional)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  server: {
    port: number;
    ssl: {
      enabled: boolean;
    };
  };
}

type PartialConfig = DeepPartial<Config>;
// All properties at all levels are optional

// JSON type
type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];
```

Cautions:
- TypeScript has recursion depth limits
- Can slow down compilation
- Test with realistic data structures

### Question 5: What are index access types and how are they used?
**Answer**: Index access types allow accessing the type of a property using bracket notation, similar to property access in JavaScript.

```typescript
interface Person {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  };
}

// Access single property type
type Name = Person["name"]; // string
type Age = Person["age"]; // number

// Access nested property
type City = Person["address"]["city"]; // string

// Access multiple properties (union)
type NameOrAge = Person["name" | "age"]; // string | number

// Access all property types
type PersonValues = Person[keyof Person];
// string | number | { city: string; country: string; }

// Array element type
type StringArray = string[];
type ElementType = StringArray[number]; // string

// Tuple types
type Tuple = [string, number, boolean];
type TupleTypes = Tuple[number]; // string | number | boolean

// Practical: Extract function types from interface
interface API {
  getUser(): User;
  getPost(): Post;
}

type GetUserReturn = ReturnType<API["getUser"]>; // User

// Map over keys
type APIReturnTypes = {
  [K in keyof API]: ReturnType<API[K]>;
};
// { getUser: User; getPost: Post; }
```

Use cases:
- Extracting property types
- Working with tuple types
- Building mapped types
- Type transformations

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Advanced Types |
|---------|-----------|--------------------------|
| Type Transformation | Runtime only | Compile-time |
| Mapped Objects | Object methods | Mapped types |
| Conditional Logic | if/else | Conditional types |
| String Templates | Template literals | Template literal types |
| Recursion | Functions | Recursive types |
| Type Extraction | Manual | Built-in utilities |

## Additional Resources

- [TypeScript Handbook - Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
