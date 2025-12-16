# Decorators

## Introduction

Decorators are a special kind of declaration that can be attached to classes, methods, properties, accessors, or parameters. They provide a way to add metadata, modify behavior, or validate code at design time. Decorators are widely used in frameworks like Angular, NestJS, and TypeORM.

## Key Concepts

### Decorator Syntax

Decorators use the `@` symbol:

```typescript
@sealed
class MyClass {}
```

### Decorator Types

TypeScript supports five types of decorators:
- Class decorators
- Method decorators
- Property decorators
- Accessor decorators
- Parameter decorators

### Decorator Factory

A function that returns a decorator:

```typescript
function Logger(prefix: string) {
  return function(target: any) {
    // decorator logic
  };
}
```

## TypeScript-Specific Code Examples

### Example 1: Class Decorators

```typescript
// Basic class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

// Class decorator factory
function Component(config: { selector: string }) {
  return function<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      selector = config.selector;
    };
  };
}

@Component({ selector: "app-user" })
class UserComponent {
  name = "UserComponent";
}

const component = new UserComponent();
console.log((component as any).selector); // "app-user"

// Class decorator with metadata
function Entity(tableName: string) {
  return function<T extends { new(...args: any[]): {} }>(constructor: T) {
    constructor.prototype.tableName = tableName;
    return constructor;
  };
}

@Entity("users")
class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const user = new User(1, "Alice");
console.log((user as any).tableName); // "users"
```

### Example 2: Method Decorators

```typescript
// Method decorator for logging
function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with args:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @Log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);
// Logs: Calling add with args: [2, 3]
// Logs: Result: 5

// Method decorator factory with options
function Retry(attempts: number) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      for (let i = 0; i < attempts; i++) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          if (i === attempts - 1) throw error;
          console.log(`Retry ${i + 1}/${attempts}`);
        }
      }
    };

    return descriptor;
  };
}

class ApiClient {
  @Retry(3)
  async fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  }
}

// Performance measurement decorator
function Measure(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} took ${end - start}ms`);
    return result;
  };

  return descriptor;
}

class DataProcessor {
  @Measure
  processLargeArray(data: number[]): number {
    return data.reduce((sum, n) => sum + n, 0);
  }
}
```

### Example 3: Property Decorators

```typescript
// Property decorator for validation
function Required(target: any, propertyKey: string) {
  let value: any;

  const getter = function() {
    return value;
  };

  const setter = function(newValue: any) {
    if (newValue === null || newValue === undefined) {
      throw new Error(`${propertyKey} is required`);
    }
    value = newValue;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class User {
  @Required
  name: string;

  @Required
  email: string;
}

const user = new User();
user.name = "Alice"; // OK
// user.email = null; // Error: email is required

// Property decorator with metadata
function Column(options?: { type?: string; nullable?: boolean }) {
  return function(target: any, propertyKey: string) {
    const columns = Reflect.getMetadata("columns", target) || [];
    columns.push({
      name: propertyKey,
      type: options?.type || "string",
      nullable: options?.nullable || false
    });
    Reflect.defineMetadata("columns", columns, target);
  };
}

class Product {
  @Column({ type: "uuid" })
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "decimal", nullable: true })
  price?: number;
}

// Format decorator
function Format(formatter: (value: any) => string) {
  return function(target: any, propertyKey: string) {
    let value: any;

    Object.defineProperty(target, propertyKey, {
      get() {
        return formatter(value);
      },
      set(newValue: any) {
        value = newValue;
      },
      enumerable: true,
      configurable: true
    });
  };
}

class Person {
  @Format((value: string) => value.toUpperCase())
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person("alice");
console.log(person.name); // "ALICE"
```

### Example 4: Accessor Decorators

```typescript
// Accessor decorator for validation
function ValidateRange(min: number, max: number) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalSetter = descriptor.set;

    descriptor.set = function(value: number) {
      if (value < min || value > max) {
        throw new Error(`${propertyKey} must be between ${min} and ${max}`);
      }
      originalSetter?.call(this, value);
    };

    return descriptor;
  };
}

class Temperature {
  private _celsius: number = 0;

  @ValidateRange(-273.15, 1000)
  set celsius(value: number) {
    this._celsius = value;
  }

  get celsius(): number {
    return this._celsius;
  }
}

const temp = new Temperature();
temp.celsius = 25; // OK
// temp.celsius = -300; // Error: celsius must be between -273.15 and 1000

// Memoization accessor decorator
function Memoize(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalGetter = descriptor.get;
  const cache = new Map();

  descriptor.get = function() {
    if (!cache.has(this)) {
      const value = originalGetter?.call(this);
      cache.set(this, value);
      return value;
    }
    return cache.get(this);
  };

  return descriptor;
}

class ExpensiveCalculation {
  @Memoize
  get result(): number {
    console.log("Calculating...");
    return Math.random() * 1000;
  }
}

const calc2 = new ExpensiveCalculation();
console.log(calc2.result); // Logs "Calculating..." and returns value
console.log(calc2.result); // Returns cached value (no log)
```

### Example 5: Parameter Decorators

```typescript
// Parameter decorator for validation
function Required(target: any, propertyKey: string, parameterIndex: number) {
  const existingRequiredParameters: number[] =
    Reflect.getMetadata("required", target, propertyKey) || [];

  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);
}

function ValidateParameters(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const requiredParameters: number[] =
      Reflect.getMetadata("required", target, propertyKey) || [];

    for (const index of requiredParameters) {
      if (args[index] === undefined || args[index] === null) {
        throw new Error(`Parameter at index ${index} is required`);
      }
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class UserService {
  @ValidateParameters
  createUser(@Required name: string, @Required email: string, age?: number) {
    return { name, email, age };
  }
}

const service = new UserService();
service.createUser("Alice", "alice@example.com", 30); // OK
// service.createUser("Alice", null); // Error: Parameter at index 1 is required

// Parameter type decorator
function Type(type: any) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const types = Reflect.getMetadata("design:paramtypes", target, propertyKey) || [];
    types[parameterIndex] = type;
    Reflect.defineMetadata("design:paramtypes", types, target, propertyKey);
  };
}
```

### Example 6: Decorator Composition

```typescript
// Multiple decorators on same element
function First() {
  console.log("First(): factory evaluated");
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("First(): called");
  };
}

function Second() {
  console.log("Second(): factory evaluated");
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log("Second(): called");
  };
}

class Example {
  @First()
  @Second()
  method() {}
}

// Output:
// First(): factory evaluated
// Second(): factory evaluated
// Second(): called
// First(): called

// Decorator execution order
function ClassDecorator(name: string) {
  return function(constructor: Function) {
    console.log(`Class decorator: ${name}`);
  };
}

function MethodDecorator(name: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`Method decorator: ${name} on ${propertyKey}`);
  };
}

function PropertyDecorator(name: string) {
  return function(target: any, propertyKey: string) {
    console.log(`Property decorator: ${name} on ${propertyKey}`);
  };
}

@ClassDecorator("MyClass")
class MyClass {
  @PropertyDecorator("prop1")
  prop1: string;

  @MethodDecorator("method1")
  method1() {}
}

// Execution order:
// Property decorator: prop1 on prop1
// Method decorator: method1 on method1
// Class decorator: MyClass
```

### Example 7: Real-World Decorator Patterns

```typescript
// Dependency Injection
const container = new Map();

function Injectable() {
  return function<T extends { new(...args: any[]): {} }>(constructor: T) {
    container.set(constructor.name, constructor);
    return constructor;
  };
}

function Inject(token: string) {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const dependencies = Reflect.getMetadata("design:paramtypes", target) || [];
    dependencies[parameterIndex] = token;
    Reflect.defineMetadata("design:paramtypes", dependencies, target);
  };
}

@Injectable()
class Logger {
  log(message: string) {
    console.log(message);
  }
}

@Injectable()
class UserService {
  constructor(@Inject("Logger") private logger: Logger) {}

  getUser(id: string) {
    this.logger.log(`Getting user ${id}`);
    return { id, name: "Alice" };
  }
}

// Route decorator (Express-like)
const routes: any[] = [];

function Controller(prefix: string) {
  return function(constructor: Function) {
    Reflect.defineMetadata("prefix", prefix, constructor);
  };
}

function Get(path: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const prefix = Reflect.getMetadata("prefix", target.constructor) || "";
    routes.push({
      method: "GET",
      path: prefix + path,
      handler: descriptor.value
    });
  };
}

@Controller("/api")
class UserController {
  @Get("/users")
  getUsers() {
    return [{ id: 1, name: "Alice" }];
  }

  @Get("/users/:id")
  getUser() {
    return { id: 1, name: "Alice" };
  }
}

// Authorization decorator
function Authorize(roles: string[]) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const user = (this as any).currentUser;

      if (!user || !roles.includes(user.role)) {
        throw new Error("Unauthorized");
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class AdminController {
  currentUser = { role: "admin" };

  @Authorize(["admin"])
  deleteUser(id: string) {
    console.log(`Deleting user ${id}`);
  }
}
```

### Example 8: Metadata Reflection

```typescript
// Using reflect-metadata
import "reflect-metadata";

// Design-time type metadata
function LogType(target: any, propertyKey: string) {
  const type = Reflect.getMetadata("design:type", target, propertyKey);
  console.log(`${propertyKey} type: ${type.name}`);
}

class Demo {
  @LogType
  name: string;

  @LogType
  age: number;
}

// Custom metadata
const formatMetadataKey = Symbol("format");

function Format(format: string) {
  return Reflect.metadata(formatMetadataKey, format);
}

function GetFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeting {
  @Format("Hello, %s")
  name: string;
}

const greeting = new Greeting();
const format = GetFormat(greeting, "name");
console.log(format); // "Hello, %s"

// Validation metadata
const requiredMetadataKey = Symbol("required");

function Required(target: any, propertyKey: string) {
  Reflect.defineMetadata(requiredMetadataKey, true, target, propertyKey);
}

function validate(obj: any): boolean {
  for (const key in obj) {
    const isRequired = Reflect.getMetadata(requiredMetadataKey, obj, key);
    if (isRequired && (obj[key] === null || obj[key] === undefined)) {
      return false;
    }
  }
  return true;
}

class Form {
  @Required
  username: string;

  @Required
  password: string;
}
```

## Practical Tasks

### Task 1: Build Validation Decorators
Create a validation system using decorators:
1. Implement @Required, @MinLength, @MaxLength decorators
2. Create @Email and @Pattern validation decorators
3. Build a validate() function to check all constraints
4. Add custom error messages
5. Support async validation

### Task 2: Create Logging System
Design a comprehensive logging decorator system:
1. Create @Log decorator for method calls
2. Implement @LogAsync for async methods
3. Add @LogError for error tracking
4. Build configurable log levels
5. Create performance monitoring decorators

### Task 3: Dependency Injection Container
Implement a DI system with decorators:
1. Create @Injectable class decorator
2. Implement @Inject parameter decorator
3. Build a service container
4. Add scope management (singleton, transient)
5. Implement circular dependency detection

### Task 4: API Route Decorators
Build Express-like routing decorators:
1. Create @Controller class decorator
2. Implement @Get, @Post, @Put, @Delete
3. Add @Param and @Body decorators
4. Build middleware decorator support
5. Generate OpenAPI documentation from decorators

## Best Practices

1. **Enable Experimental Decorators**: Set `experimentalDecorators: true` in tsconfig.json
2. **Use Decorator Factories**: For configurable decorators
3. **Preserve Metadata**: Use `emitDecoratorMetadata: true` when needed
4. **Document Behavior**: Clearly document what decorators do
5. **Type Safety**: Ensure decorators maintain type safety
6. **Composition Order**: Understand decorator execution order
7. **Side Effects**: Minimize side effects in decorators
8. **Testing**: Test decorated classes thoroughly
9. **Performance**: Be aware of decorator overhead
10. **Standards**: Follow TC39 decorator proposal for future compatibility

## Interview Questions

### Question 1: What are decorators in TypeScript?
**Answer**: Decorators are special declarations that can be attached to classes, methods, properties, accessors, or parameters. They provide a way to add metadata, modify behavior, or validate code at design time using the `@expression` syntax.

```typescript
// Class decorator
@sealed
class BugReport {
  type = "report";
}

// Method decorator
class Calculator {
  @Log
  add(a: number, b: number) {
    return a + b;
  }
}

// Property decorator
class User {
  @Required
  name: string;
}
```

Key points:
- Require `experimentalDecorators: true` in tsconfig
- Execute at class definition time, not instance creation
- Can modify or replace decorated elements
- Widely used in frameworks (Angular, NestJS, TypeORM)
- Based on stage 3 TC39 proposal

Types:
- Class decorators
- Method decorators
- Property decorators
- Accessor decorators
- Parameter decorators

### Question 2: How do decorator factories work?
**Answer**: Decorator factories are functions that return decorators, allowing you to customize decorator behavior with parameters.

```typescript
// Without factory (no parameters)
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // decorator logic
}

// With factory (accepts parameters)
function Log(prefix: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      console.log(`${prefix}: Calling ${propertyKey}`);
      return originalMethod.apply(this, args);
    };
  };
}

class Example {
  @Log("DEBUG")
  method1() {}

  @Log("INFO")
  method2() {}
}
```

Benefits:
- Configurable decorators
- Reusable with different options
- Cleaner syntax with parameters
- Can create complex decorator combinations

Pattern:
1. Outer function accepts parameters
2. Returns actual decorator function
3. Decorator function uses parameters from closure

### Question 3: What is the execution order of decorators?
**Answer**: Decorators execute in a specific order based on their type and position.

**Evaluation Order** (top to bottom):
1. Parameter decorators, then Method/Accessor/Property decorators
2. Class decorators

**Application Order** (bottom to top for same element):

```typescript
function First() {
  console.log("First(): evaluated");
  return function() {
    console.log("First(): called");
  };
}

function Second() {
  console.log("Second(): evaluated");
  return function() {
    console.log("Second(): called");
  };
}

class Example {
  @First()
  @Second()
  method() {}
}

// Output:
// First(): evaluated
// Second(): evaluated
// Second(): called  <- Applied bottom-to-top
// First(): called
```

**Complete order**:
```typescript
@ClassDecorator
class Example {
  @PropertyDecorator
  property: string;

  @AccessorDecorator
  get accessor() { return ""; }

  @MethodDecorator
  method(@ParameterDecorator param: string) {}
}

// Execution:
// 1. PropertyDecorator
// 2. ParameterDecorator
// 3. MethodDecorator
// 4. AccessorDecorator
// 5. ClassDecorator
```

### Question 4: How do you use decorators for validation?
**Answer**: Decorators can add validation metadata and logic to class properties and methods.

```typescript
// Property validation
const validators = new Map<any, Map<string, Function[]>>();

function Required(target: any, propertyKey: string) {
  const classValidators = validators.get(target) || new Map();
  const propValidators = classValidators.get(propertyKey) || [];

  propValidators.push((value: any) => {
    if (value === null || value === undefined) {
      throw new Error(`${propertyKey} is required`);
    }
  });

  classValidators.set(propertyKey, propValidators);
  validators.set(target, classValidators);
}

function MinLength(length: number) {
  return function(target: any, propertyKey: string) {
    const classValidators = validators.get(target) || new Map();
    const propValidators = classValidators.get(propertyKey) || [];

    propValidators.push((value: string) => {
      if (value.length < length) {
        throw new Error(`${propertyKey} must be at least ${length} characters`);
      }
    });

    classValidators.set(propertyKey, propValidators);
    validators.set(target, classValidators);
  };
}

function validate(obj: any): boolean {
  const classValidators = validators.get(obj.constructor.prototype);
  if (!classValidators) return true;

  for (const [key, validatorFns] of classValidators) {
    for (const validatorFn of validatorFns) {
      validatorFn(obj[key]);
    }
  }

  return true;
}

class User {
  @Required
  @MinLength(3)
  name: string;

  @Required
  email: string;
}

const user = new User();
user.name = "Alice";
user.email = "alice@example.com";
validate(user); // OK

// user.name = "Al"; // Error: name must be at least 3 characters
```

Common patterns:
- Store validation rules in metadata
- Run validation in a validate() function
- Support async validation
- Return detailed error messages

### Question 5: What is reflect-metadata and how is it used with decorators?
**Answer**: reflect-metadata is a library that enables storing and retrieving metadata about decorated elements, particularly useful for design-time type information.

```typescript
import "reflect-metadata";

// Automatic type metadata (with emitDecoratorMetadata: true)
function LogType(target: any, propertyKey: string) {
  const type = Reflect.getMetadata("design:type", target, propertyKey);
  console.log(`${propertyKey} type: ${type.name}`);
}

class Example {
  @LogType
  name: string; // Logs: "name type: String"

  @LogType
  age: number; // Logs: "age type: Number"
}

// Custom metadata
const formatKey = Symbol("format");

function Format(format: string) {
  return Reflect.metadata(formatKey, format);
}

class Greeting {
  @Format("Hello, %s")
  name: string;
}

const format = Reflect.getMetadata(formatKey, Greeting.prototype, "name");
console.log(format); // "Hello, %s"

// Method parameter types
function Injectable() {
  return function(target: any) {
    const types = Reflect.getMetadata("design:paramtypes", target);
    console.log("Constructor parameter types:", types);
  };
}

@Injectable()
class UserService {
  constructor(private logger: Logger, private db: Database) {}
}
// Logs constructor parameter types
```

Metadata keys:
- `design:type` - Property type
- `design:paramtypes` - Parameter types
- `design:returntype` - Return type
- Custom keys via Symbol or string

Use cases:
- Dependency injection
- Serialization/deserialization
- Validation
- ORM mapping

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Decorators |
|---------|-----------|---------------------|
| Decorators | Stage 3 proposal | Experimental feature |
| Syntax | @decorator | @decorator |
| Types | No type info | Full type support |
| Metadata | Manual | reflect-metadata |
| Compile Config | None | experimentalDecorators |
| Parameter Decorators | Yes | Yes |

```javascript
// JavaScript (Stage 3 proposal)
@sealed
class MyClass {}

// TypeScript (with types and metadata)
@sealed
class MyClass {
  @validate
  name: string;
}
```

## Additional Resources

- [TypeScript Handbook - Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
- [TC39 Decorator Proposal](https://github.com/tc39/proposal-decorators)
- [Decorator Patterns](https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-factories)
