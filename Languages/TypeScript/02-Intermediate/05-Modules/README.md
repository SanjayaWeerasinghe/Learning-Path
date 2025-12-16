# Modules

## Introduction

Modules in TypeScript provide a way to organize code into reusable, maintainable units. TypeScript supports ES6 module syntax and offers additional features like namespaces, module resolution strategies, and declaration files. Proper module organization is crucial for building scalable applications.

## Key Concepts

### ES6 Modules

TypeScript uses ES6 import/export syntax:

```typescript
// Export
export class User {}

// Import
import { User } from './user';
```

### Module Resolution

TypeScript resolves modules using different strategies:
- Classic
- Node (recommended)

### Namespaces

TypeScript namespaces provide logical grouping:

```typescript
namespace Utils {
  export function helper() {}
}
```

## TypeScript-Specific Code Examples

### Example 1: Basic Import/Export

```typescript
// user.ts - Named exports
export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserService {
  getUser(id: string): User {
    return { id, name: "Alice", email: "alice@example.com" };
  }
}

export function validateEmail(email: string): boolean {
  return email.includes("@");
}

export const MAX_USERS = 100;

// app.ts - Named imports
import { User, UserService, validateEmail, MAX_USERS } from './user';

const service = new UserService();
const user: User = service.getUser("1");

if (validateEmail(user.email)) {
  console.log(`Valid email: ${user.email}`);
}

console.log(`Max users: ${MAX_USERS}`);

// Import everything as namespace
import * as UserModule from './user';

const service2 = new UserModule.UserService();
```

### Example 2: Default Exports

```typescript
// calculator.ts - Default export
export default class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

// app.ts - Default import
import Calculator from './calculator';

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8

// Combining default and named exports
// math.ts
export default function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  return a / b;
}

export const PI = 3.14159;

// app.ts
import multiply, { divide, PI } from './math';

console.log(multiply(5, 3)); // 15
console.log(divide(10, 2)); // 5
console.log(PI); // 3.14159
```

### Example 3: Re-exporting Modules

```typescript
// models/user.ts
export interface User {
  id: string;
  name: string;
}

// models/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

// models/order.ts
export interface Order {
  id: string;
  userId: string;
  products: string[];
}

// models/index.ts - Barrel export
export { User } from './user';
export { Product } from './product';
export { Order } from './order';

// Or export everything
export * from './user';
export * from './product';
export * from './order';

// app.ts - Import from barrel
import { User, Product, Order } from './models';

// Re-exporting with renaming
// models/index.ts
export { User as UserModel } from './user';
export { Product as ProductModel } from './product';

// app.ts
import { UserModel, ProductModel } from './models';
```

### Example 4: Namespaces

```typescript
// utils.ts - Namespace
namespace StringUtils {
  export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  export function reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  // Private (not exported)
  function helper(): void {
    console.log("Private helper");
  }
}

// Using namespace
console.log(StringUtils.capitalize("hello")); // "Hello"
console.log(StringUtils.reverse("hello")); // "olleh"

// Nested namespaces
namespace App {
  export namespace Models {
    export interface User {
      id: string;
      name: string;
    }
  }

  export namespace Services {
    export class UserService {
      getUser(id: string): Models.User {
        return { id, name: "Alice" };
      }
    }
  }
}

const userService = new App.Services.UserService();
const user: App.Models.User = userService.getUser("1");

// Namespace merging
namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }
}

namespace MathUtils {
  export function multiply(a: number, b: number): number {
    return a * b;
  }
}

// Both functions available
console.log(MathUtils.add(2, 3)); // 5
console.log(MathUtils.multiply(2, 3)); // 6
```

### Example 5: Module Augmentation

```typescript
// express.d.ts - Extending existing module
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      name: string;
    };
  }
}

// app.ts - Using augmented module
import express, { Request, Response } from 'express';

const app = express();

app.use((req: Request, res: Response, next) => {
  req.user = { id: "1", name: "Alice" }; // TypeScript knows about user property
  next();
});

app.get('/profile', (req: Request, res: Response) => {
  if (req.user) {
    res.json({ name: req.user.name }); // Type-safe access
  }
});

// Global augmentation
// global.d.ts
declare global {
  interface Window {
    myApp: {
      version: string;
      config: any;
    };
  }

  var APP_VERSION: string;
}

export {}; // Make it a module

// app.ts
window.myApp = {
  version: "1.0.0",
  config: {}
};

console.log(APP_VERSION);
```

### Example 6: Declaration Files

```typescript
// types/custom-library.d.ts - Type declarations for JS library
declare module 'custom-library' {
  export interface Options {
    debug: boolean;
    timeout: number;
  }

  export class CustomClass {
    constructor(options: Options);
    doSomething(): void;
  }

  export function helper(value: string): string;
}

// app.ts - Using the declared module
import { CustomClass, helper, Options } from 'custom-library';

const options: Options = {
  debug: true,
  timeout: 5000
};

const instance = new CustomClass(options);
instance.doSomething();

console.log(helper("test"));

// Ambient declarations
// global.d.ts
declare const API_URL: string;
declare function legacyFunction(param: string): void;

declare namespace LegacyLib {
  function doSomething(): void;
  const VERSION: string;
}

// app.ts - Using ambient declarations
console.log(API_URL);
legacyFunction("test");
LegacyLib.doSomething();
console.log(LegacyLib.VERSION);
```

### Example 7: Dynamic Imports

```typescript
// Dynamic import with type safety
async function loadModule() {
  // Type-safe dynamic import
  const { UserService } = await import('./services/user');
  const service = new UserService();
  return service;
}

// Conditional module loading
async function loadPlugin(name: string) {
  if (name === 'analytics') {
    const module = await import('./plugins/analytics');
    return module.default;
  } else if (name === 'logging') {
    const module = await import('./plugins/logging');
    return module.default;
  }
}

// Code splitting with dynamic imports
button.addEventListener('click', async () => {
  const { Modal } = await import('./components/Modal');
  const modal = new Modal();
  modal.show();
});

// Type-safe dynamic import with interface
interface PluginModule {
  default: {
    init(): void;
    cleanup(): void;
  };
}

async function loadTypedPlugin(path: string): Promise<PluginModule['default']> {
  const module = await import(path) as PluginModule;
  return module.default;
}
```

### Example 8: Module Resolution Configuration

```typescript
// tsconfig.json - Module resolution settings
{
  "compilerOptions": {
    // Module system
    "module": "ESNext",
    "target": "ES2020",

    // Module resolution
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    // Base URL for module resolution
    "baseUrl": "./",

    // Path mapping
    "paths": {
      "@models/*": ["src/models/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@components/*": ["src/components/*"]
    },

    // Type roots
    "typeRoots": ["./node_modules/@types", "./types"],

    // Allow importing JSON
    "resolveJsonModule": true,

    // Strict module checking
    "skipLibCheck": true,
    "forceConsistentCasingInFilenames": true
  }
}

// Using path aliases
// app.ts
import { User } from '@models/user';
import { UserService } from '@services/user';
import { logger } from '@utils/logger';
import { Button } from '@components/Button';

// Importing JSON with types
import config from './config.json';
console.log(config.apiUrl);

// Triple-slash directives
/// <reference path="./types/custom.d.ts" />
/// <reference types="node" />

// Using referenced types
import { CustomType } from 'custom-types';
import { Buffer } from 'buffer';
```

## Practical Tasks

### Task 1: Build a Modular Application Structure
Create a well-organized module structure:
1. Set up barrel exports for models, services, and utilities
2. Implement proper import/export patterns
3. Configure path aliases in tsconfig.json
4. Create index files for clean imports
5. Organize code by feature modules

### Task 2: Create Type Declarations
Build type declarations for a JavaScript library:
1. Create .d.ts files for external libraries
2. Define module declarations
3. Add ambient type declarations
4. Extend existing module types
5. Create global type augmentations

### Task 3: Implement Plugin System
Design a plugin architecture using modules:
1. Create a plugin interface
2. Implement dynamic plugin loading
3. Use type-safe module imports
4. Build a plugin registry
5. Add plugin lifecycle management

### Task 4: Module Federation Setup
Set up a micro-frontend architecture:
1. Configure module federation
2. Create shared modules
3. Implement remote module loading
4. Add type safety for remote modules
5. Build a shell application

## Best Practices

1. **Use ES6 Modules**: Prefer ES6 import/export over namespaces
2. **Barrel Exports**: Create index files for clean imports
3. **Path Aliases**: Use path mapping for cleaner imports
4. **Single Responsibility**: Each module should have one purpose
5. **Explicit Exports**: Only export what's needed
6. **Type-Only Imports**: Use `import type` for type-only imports
7. **Avoid Circular Dependencies**: Design modules to prevent circular imports
8. **Module Organization**: Group related functionality together
9. **Declaration Files**: Create .d.ts files for JavaScript libraries
10. **Consistent Naming**: Use consistent naming conventions across modules

## Interview Questions

### Question 1: What's the difference between namespaces and modules?
**Answer**:

**Modules** (ES6):
- File-based organization
- Each file is a module
- Use import/export
- Better for modern applications
- Support code splitting

```typescript
// user.ts - Module
export class User {
  name: string;
}

// app.ts
import { User } from './user';
```

**Namespaces**:
- Logical grouping within files
- Use namespace keyword
- Global scope by default
- Legacy feature from older TypeScript
- All code loaded upfront

```typescript
// utils.ts - Namespace
namespace StringUtils {
  export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Usage (in same file or after loading script)
StringUtils.capitalize("hello");
```

**Recommendation**: Use ES6 modules for new projects. Namespaces are mainly for:
- Legacy codebases
- Browser globals
- Organizing ambient declarations

### Question 2: How does module resolution work in TypeScript?
**Answer**: TypeScript uses two main module resolution strategies:

**Node Resolution** (Recommended):
```typescript
// Import statement
import { User } from './models/user';

// Resolution steps:
// 1. ./models/user.ts
// 2. ./models/user.tsx
// 3. ./models/user.d.ts
// 4. ./models/user/package.json (check "types" field)
// 5. ./models/user/index.ts
// 6. ./models/user/index.tsx
// 7. ./models/user/index.d.ts

// For node_modules:
import express from 'express';

// Resolution:
// 1. node_modules/express/package.json ("types" field)
// 2. node_modules/express/index.d.ts
// 3. node_modules/@types/express/index.d.ts
```

**Classic Resolution** (Legacy):
```typescript
// Relative imports: same as Node
// Non-relative imports: walks up directory tree
```

**Configuration**:
```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/*"]
    }
  }
}
```

### Question 3: What are barrel exports and why use them?
**Answer**: Barrel exports are index files that re-export multiple modules, providing a single import point for related functionality.

**Without Barrel**:
```typescript
// Multiple imports
import { User } from './models/user';
import { Product } from './models/product';
import { Order } from './models/order';
```

**With Barrel** (models/index.ts):
```typescript
// models/index.ts
export { User } from './user';
export { Product } from './product';
export { Order } from './order';

// Or export all
export * from './user';
export * from './product';
export * from './order';

// app.ts - Clean single import
import { User, Product, Order } from './models';
```

**Benefits**:
- Cleaner imports
- Single source of truth
- Easier refactoring
- Better organization
- Controlled public API

**Drawbacks**:
- Can impact tree-shaking
- May increase bundle size if not careful
- Circular dependency risk

**Best Practice**: Use for organizing related exports, but be mindful of bundle size.

### Question 4: How do you extend existing module types?
**Answer**: Use module augmentation to extend types from existing modules or libraries.

**Extending Third-Party Library**:
```typescript
// express.d.ts
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}

// app.ts
import { Request, Response } from 'express';

app.use((req: Request, res: Response) => {
  req.user = { id: "1", email: "user@example.com" }; // Type-safe
});
```

**Global Augmentation**:
```typescript
// global.d.ts
declare global {
  interface Window {
    analytics: {
      track(event: string): void;
    };
  }
}

export {}; // Make it a module

// app.ts
window.analytics.track("page_view"); // Type-safe
```

**Adding to Namespace**:
```typescript
declare namespace App {
  interface Config {
    apiUrl: string;
  }
}

// Later
declare namespace App {
  interface Config {
    timeout: number; // Merged with existing
  }
}
```

Key points:
- Use `declare module` for module augmentation
- Use `declare global` for global scope
- File must be a module (have import/export)
- Changes apply project-wide

### Question 5: What are type-only imports and when should you use them?
**Answer**: Type-only imports (`import type`) import only type information, not runtime values. They're erased during compilation.

**Regular Import**:
```typescript
import { User } from './user'; // Imports both type and value
```

**Type-Only Import**:
```typescript
import type { User } from './user'; // Type only, erased at runtime

function processUser(user: User): void {
  // Can use User as type
}

// const user = new User(); // Error: User only refers to a type
```

**Mixed Import**:
```typescript
import { UserService, type User } from './user';

const service = new UserService(); // Runtime value
function process(user: User): void {} // Type only
```

**Benefits**:
1. **Clearer Intent**: Shows what's used at runtime vs compile-time
2. **Avoid Circular Dependencies**: Type-only imports don't create circular dependencies
3. **Better Tree-Shaking**: Helps bundlers remove unused code
4. **Smaller Bundles**: No runtime overhead for type imports

**Use When**:
- Importing only for type annotations
- Breaking circular dependencies
- Optimizing bundle size
- Working with type-only re-exports

**Configuration**:
```json
{
  "compilerOptions": {
    "importsNotUsedAsValues": "error" // Enforce type-only imports
  }
}
```

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Modules |
|---------|-----------|-------------------|
| Import/Export | ES6 modules | ES6 + type imports |
| Type Checking | No | Yes |
| Module Resolution | Runtime | Compile-time |
| Declaration Files | No | .d.ts files |
| Namespaces | No | Yes (legacy) |
| Path Aliases | Bundler config | tsconfig.json |
| Type Augmentation | No | Yes |

```javascript
// JavaScript
export class User {}
import { User } from './user';

// TypeScript - Additional features
export type { User }; // Type-only export
import type { User } from './user'; // Type-only import
```

## Additional Resources

- [TypeScript Handbook - Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html)
- [Module Resolution](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
