# TypeScript Basics

## Overview

This section covers the fundamental concepts of TypeScript, the typed superset of JavaScript that compiles to plain JavaScript. These basics form the foundation for writing type-safe code and understanding more advanced TypeScript features.

## Topics Covered

1. **Setup** - TypeScript installation, tsconfig.json configuration, and compilation process
2. **Type Annotations** - Basic type annotations and type inference
3. **Interfaces** - Defining contracts with interfaces and optional properties
4. **Classes** - TypeScript classes with access modifiers and inheritance
5. **Functions** - Function types, optional parameters, and overloads

## Why Learn TypeScript Basics?

- **Type Safety**: Catch errors at compile-time rather than runtime
- **Better IDE Support**: Improved autocomplete and intellisense
- **Self-Documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Confidence when making changes to your codebase
- **Enhanced Collaboration**: Clear contracts between different parts of your application

## Learning Path

1. Start with **Setup** to configure your TypeScript environment
2. Learn **Type Annotations** to understand TypeScript's type system
3. Master **Interfaces** for defining object shapes
4. Explore **Classes** for object-oriented programming
5. Practice **Functions** to write type-safe function signatures

## Key Differences from JavaScript

```typescript
// JavaScript
function greet(name) {
  return "Hello, " + name;
}

// TypeScript
function greet(name: string): string {
  return "Hello, " + name;
}
```

TypeScript adds static type checking, interfaces, access modifiers, and many other features that help write more maintainable code.

## Prerequisites

- Basic understanding of JavaScript (ES6+)
- Node.js and npm installed
- Familiarity with command line basics
- Understanding of basic programming concepts

## Getting Started

Navigate to each topic folder to dive deep into specific concepts. Each folder contains detailed explanations, code examples, and practical tasks to reinforce your learning.

## Common Interview Topics

- What is TypeScript and why use it?
- Difference between `type` and `interface`
- Understanding type inference
- Access modifiers in classes
- Optional vs required properties
- Function overloading basics

## Best Practices

- Always enable strict mode in tsconfig.json
- Use explicit types for function parameters and return values
- Prefer interfaces for object shapes
- Use classes when you need inheritance and encapsulation
- Let TypeScript infer types when obvious
- Avoid using `any` type unless absolutely necessary

## Next Steps

After mastering the basics, proceed to the **Intermediate** section to learn about generics, enums, type aliases, union types, and modules.
