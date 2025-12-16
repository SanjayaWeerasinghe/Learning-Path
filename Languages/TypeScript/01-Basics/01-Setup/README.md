# TypeScript Setup

## Introduction

Setting up TypeScript properly is the first step to leveraging its powerful type system. This guide covers installation, configuration, and compilation of TypeScript projects.

## Key Concepts

### Installation

TypeScript can be installed globally or locally in your project:

```bash
# Global installation
npm install -g typescript

# Local installation (recommended)
npm install --save-dev typescript

# Check version
tsc --version
```

### tsconfig.json

The `tsconfig.json` file is the configuration file for TypeScript projects. It specifies compiler options and project settings.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFilenames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

### Compilation Process

TypeScript code must be compiled to JavaScript before execution:

```bash
# Compile a single file
tsc index.ts

# Compile entire project
tsc

# Watch mode (recompile on changes)
tsc --watch

# Compile with specific config
tsc --project tsconfig.prod.json
```

## TypeScript-Specific Code Examples

### Example 1: Basic Project Structure

```
my-project/
├── src/
│   ├── index.ts
│   └── utils.ts
├── dist/
├── tsconfig.json
├── package.json
└── node_modules/
```

### Example 2: Compiler Options Explained

```json
{
  "compilerOptions": {
    // Target JavaScript version
    "target": "ES2020",

    // Module system
    "module": "commonjs",

    // Output directory
    "outDir": "./dist",

    // Source directory
    "rootDir": "./src",

    // Enable all strict type checking options
    "strict": true,

    // Allow default imports from modules with no default export
    "esModuleInterop": true,

    // Generate source maps for debugging
    "sourceMap": true,

    // Disallow inconsistently-cased references
    "forceConsistentCasingInFilenames": true,

    // Skip type checking of declaration files
    "skipLibCheck": true,

    // Enable decorators
    "experimentalDecorators": true,

    // Emit decorator metadata
    "emitDecoratorMetadata": true,

    // Module resolution strategy
    "moduleResolution": "node",

    // Base directory for resolving non-relative modules
    "baseUrl": "./",

    // Path mapping for module resolution
    "paths": {
      "@utils/*": ["src/utils/*"],
      "@models/*": ["src/models/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

### Example 3: package.json Scripts

```json
{
  "name": "my-typescript-project",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js",
    "clean": "rm -rf dist"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
```

### Example 4: Simple TypeScript File

```typescript
// src/index.ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message: string = greet("TypeScript");
console.log(message);

export { greet };
```

### Example 5: Using ts-node for Development

```bash
# Install ts-node
npm install --save-dev ts-node

# Run TypeScript directly without compilation
npx ts-node src/index.ts
```

Update package.json:
```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "start": "node dist/index.js"
  }
}
```

## Practical Tasks

### Task 1: Initialize a TypeScript Project
Create a new TypeScript project from scratch with proper configuration:
1. Create a new directory and initialize npm
2. Install TypeScript locally
3. Create a tsconfig.json with strict mode enabled
4. Create a src folder with an index.ts file
5. Compile and run the project

### Task 2: Configure Path Aliases
Set up path aliases in tsconfig.json to avoid relative import hell:
1. Configure baseUrl and paths in tsconfig.json
2. Create folders for utils, models, and services
3. Create modules in each folder
4. Import modules using aliases (e.g., @utils/logger)

### Task 3: Multi-Environment Configuration
Create different TypeScript configurations for development and production:
1. Create tsconfig.json (base configuration)
2. Create tsconfig.dev.json (extends base, includes source maps)
3. Create tsconfig.prod.json (extends base, optimized for production)
4. Add npm scripts to build with different configs

### Task 4: Watch Mode and Live Reloading
Set up a development environment with automatic recompilation:
1. Use tsc --watch to monitor file changes
2. Install nodemon to restart the application
3. Create a combined script that watches TypeScript files and restarts the app
4. Test the setup by making changes to your TypeScript files

## Best Practices

1. **Use Local TypeScript Installation**: Ensures consistent versions across team members
2. **Enable Strict Mode**: Catch more errors at compile time with `"strict": true`
3. **Organize Source Code**: Keep all TypeScript files in a `src` directory
4. **Generate Source Maps**: Enable `"sourceMap": true` for easier debugging
5. **Use Path Aliases**: Configure path mapping to avoid deeply nested relative imports
6. **Exclude Unnecessary Files**: Use `exclude` to skip node_modules and test files
7. **Version Control**: Commit tsconfig.json but not compiled JavaScript files
8. **Use ts-node for Development**: Faster development workflow without manual compilation
9. **Set Appropriate Target**: Choose ES version based on your runtime environment
10. **Incremental Compilation**: Enable `"incremental": true` for faster rebuilds

## Interview Questions

### Question 1: What is the purpose of tsconfig.json?
**Answer**: The tsconfig.json file is the configuration file for TypeScript projects. It specifies:
- Compiler options (target, module, strict mode, etc.)
- Which files to include/exclude from compilation
- Path resolution settings
- Output directory and other build settings

It allows you to configure the TypeScript compiler behavior and ensures consistent compilation across different environments.

### Question 2: Explain the difference between "target" and "lib" in tsconfig.json
**Answer**:
- **target**: Specifies which JavaScript version the TypeScript code will be compiled to (e.g., ES5, ES2015, ES2020). This affects the output JavaScript.
- **lib**: Specifies which library type definitions to include (e.g., ES2020, DOM). This affects what APIs TypeScript knows about during type checking but doesn't change the compilation output.

Example:
```json
{
  "compilerOptions": {
    "target": "ES5",  // Output ES5 JavaScript
    "lib": ["ES2020", "DOM"]  // Use ES2020 and DOM types
  }
}
```

### Question 3: What does the "strict" flag do?
**Answer**: The `"strict": true` flag enables all strict type-checking options in TypeScript:
- `strictNullChecks`: null and undefined are not assignable to other types
- `strictFunctionTypes`: Function types are checked more strictly
- `strictBindCallApply`: Check that bind, call, and apply have correct arguments
- `strictPropertyInitialization`: Class properties must be initialized
- `noImplicitAny`: Error on expressions with implied 'any' type
- `noImplicitThis`: Error when 'this' has type 'any'
- `alwaysStrict`: Parse in strict mode and emit "use strict"

It's recommended to enable this for maximum type safety.

### Question 4: How do you compile TypeScript files?
**Answer**: TypeScript files can be compiled using the `tsc` command:

```bash
# Compile a single file
tsc index.ts

# Compile all files based on tsconfig.json
tsc

# Watch mode (recompile on changes)
tsc --watch

# Specify a custom config file
tsc --project tsconfig.prod.json

# Compile without emitting files (type checking only)
tsc --noEmit
```

For development, you can also use `ts-node` to run TypeScript files directly without manual compilation.

### Question 5: What is the difference between include and exclude in tsconfig.json?
**Answer**:
- **include**: Specifies an array of file glob patterns to include in compilation. If not specified, all .ts, .tsx files in the directory are included.
- **exclude**: Specifies an array of file glob patterns to exclude from compilation. By default, node_modules is excluded.

Example:
```json
{
  "include": ["src/**/*"],  // Include all files in src folder
  "exclude": ["node_modules", "**/*.spec.ts"]  // Exclude node_modules and test files
}
```

Files specified in `include` can be overridden by `exclude`. Files referenced by included files are also included regardless of exclude patterns.

## Comparison with JavaScript

| Aspect | JavaScript | TypeScript |
|--------|-----------|------------|
| Setup | No compilation needed | Requires TypeScript compiler |
| Configuration | None required | tsconfig.json needed |
| Execution | Run directly with Node.js | Must compile to JS first |
| Type Checking | Runtime only | Compile-time + Runtime |
| Tooling | Basic | Advanced (IntelliSense, refactoring) |
| Development Workflow | Edit and run | Edit, compile, run (or use ts-node) |

## Additional Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions for JavaScript libraries
