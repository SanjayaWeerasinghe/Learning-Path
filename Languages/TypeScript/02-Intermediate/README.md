# TypeScript Intermediate

## Overview

This section builds upon TypeScript basics and introduces more powerful features for writing flexible, reusable, and maintainable code. These intermediate concepts are essential for real-world TypeScript applications.

## Topics Covered

1. **Generics** - Generic types, constraints, and generic functions
2. **Enums** - Numeric and string enumerations
3. **Type Aliases** - Creating custom types and comparing with interfaces
4. **Union Types** - Union and intersection types for flexible type definitions
5. **Modules** - TypeScript modules, imports/exports, and namespaces

## Why Learn Intermediate TypeScript?

- **Code Reusability**: Write generic components that work with multiple types
- **Better Type Modeling**: Model complex domain logic accurately
- **Organized Code**: Properly structure large applications with modules
- **Flexible APIs**: Create APIs that accept multiple type combinations
- **Enhanced Type Safety**: Leverage advanced type features for stronger guarantees

## Learning Path

1. Start with **Generics** to write reusable type-safe code
2. Learn **Enums** for defining named constants
3. Master **Type Aliases** for creating custom type definitions
4. Explore **Union Types** for flexible type combinations
5. Practice **Modules** to organize your codebase

## Key Concepts

### Generics Example
```typescript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");
```

### Union Types Example
```typescript
type Result = Success | Error;
type ID = string | number;

function processId(id: ID) {
  // Handle both string and number
}
```

### Modules Example
```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

// app.ts
import { add } from './math';
```

## Prerequisites

- Solid understanding of TypeScript basics
- Knowledge of interfaces and classes
- Familiarity with ES6 modules
- Understanding of JavaScript closures and scope

## Common Interview Topics

- Explain generics and their benefits
- When to use type aliases vs interfaces
- Difference between union and intersection types
- Numeric vs string enums
- Module resolution strategies
- Generic constraints with `extends`
- Default generic type parameters

## Best Practices

- Use generics to avoid code duplication
- Prefer string enums over numeric enums for clarity
- Use union types for variables that can be multiple types
- Organize code into modules for better maintainability
- Use type aliases for complex type definitions
- Avoid deeply nested generic types
- Use meaningful generic type parameter names (not just T, U, V)

## Real-World Applications

- **API Responses**: Use union types for success/error responses
- **Form Validation**: Use enums for validation states
- **Data Structures**: Use generics for reusable collections
- **Large Projects**: Use modules to organize code
- **Type Utilities**: Use type aliases to create custom utility types

## Advanced Patterns

```typescript
// Generic constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Intersection types
type Admin = { admin: true };
type User = { name: string };
type AdminUser = Admin & User;
```

## Next Steps

After mastering intermediate concepts, proceed to the **Advanced** section to learn about mapped types, conditional types, decorators, utility types, and type guards.
