# TypeScript Advanced

## Overview

This section covers advanced TypeScript features that enable you to write highly sophisticated, type-safe code. These concepts are crucial for building enterprise-level applications and creating powerful type utilities.

## Topics Covered

1. **Advanced Types** - Mapped types, conditional types, and template literal types
2. **Decorators** - Class, method, property, and parameter decorators
3. **Utility Types** - Built-in utility types like Partial, Pick, Omit, Record, etc.
4. **Type Guards** - Type narrowing and custom type guards
5. **Conditional Types** - Advanced conditional type logic and inference

## Why Learn Advanced TypeScript?

- **Type-Level Programming**: Perform computation at the type level
- **Framework Development**: Build libraries and frameworks with strong type guarantees
- **Metaprogramming**: Use decorators for cross-cutting concerns
- **API Design**: Create flexible yet type-safe APIs
- **Type Transformation**: Transform and manipulate types programmatically

## Learning Path

1. Start with **Advanced Types** to understand type manipulation
2. Learn **Decorators** for metaprogramming capabilities
3. Master **Utility Types** to leverage built-in type helpers
4. Explore **Type Guards** for runtime type narrowing
5. Deep dive into **Conditional Types** for complex type logic

## Key Concepts

### Mapped Types Example
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<{ name: string; age: number }>;
```

### Conditional Types Example
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type StringOrNumber<T> = T extends string ? string : number;
```

### Type Guards Example
```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

if (isString(value)) {
  console.log(value.toUpperCase()); // TypeScript knows value is string
}
```

### Decorators Example
```typescript
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey}`);
    return originalMethod.apply(this, args);
  };
}
```

## Prerequisites

- Strong understanding of TypeScript basics and intermediate concepts
- Knowledge of generics and type manipulation
- Familiarity with JavaScript decorators proposal
- Understanding of type inference and type narrowing
- Experience with complex type scenarios

## Common Interview Topics

- Explain mapped types and provide examples
- What are conditional types and when to use them
- How do type guards work
- Difference between Partial, Pick, and Omit
- Decorator execution order
- Type inference with `infer` keyword
- Template literal types
- Variance in TypeScript
- Recursive type definitions

## Best Practices

- Use utility types instead of reinventing them
- Create custom type guards for complex type checking
- Use decorators sparingly and document their behavior
- Leverage conditional types for type-level logic
- Use template literal types for string manipulation at type level
- Avoid overly complex type definitions that harm readability
- Document advanced type utilities for team members
- Test complex types with type assertions

## Real-World Applications

- **Form Libraries**: Use mapped types to create form schemas
- **ORM/Database**: Use decorators for entity definitions
- **State Management**: Use utility types for reducer state typing
- **API Clients**: Use conditional types for request/response typing
- **Validation**: Use type guards for runtime validation

## Advanced Patterns

```typescript
// Recursive conditional types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Template literal types
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<'click'>; // "onClick"

// Type inference with infer
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Discriminated unions with type guards
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number };

function area(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.size ** 2;
  }
}
```

## TypeScript Compiler Internals

Understanding these advanced features requires knowledge of:
- Type checking algorithm
- Structural vs nominal typing
- Type widening and narrowing
- Control flow analysis
- Symbol resolution

## Performance Considerations

- Complex types can slow down compilation
- Deeply nested conditional types may hit recursion limits
- Decorators add runtime overhead
- Use type aliases to cache complex type computations

## Next Steps

After mastering advanced TypeScript, consider:
- Contributing to DefinitelyTyped
- Creating your own type utilities library
- Exploring TypeScript compiler API
- Learning about TypeScript plugin development
- Diving into type-level programming patterns
