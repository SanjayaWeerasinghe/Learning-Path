# Enums

## Introduction

Enums (enumerations) in TypeScript allow you to define a set of named constants. They make it easier to document intent and create a set of distinct cases. TypeScript provides both numeric and string-based enums, each with their own use cases and characteristics.

## Key Concepts

### Numeric Enums

Numeric enums are auto-incremented starting from 0 (or a specified value):

```typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}
```

### String Enums

String enums require each member to be initialized with a string literal:

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

### Const Enums

Const enums are completely removed during compilation and inlined at use sites:

```typescript
const enum Status {
  Active,
  Inactive
}
```

## TypeScript-Specific Code Examples

### Example 1: Numeric Enums

```typescript
// Basic numeric enum (auto-incrementing from 0)
enum Status {
  Pending,   // 0
  Active,    // 1
  Inactive,  // 2
  Deleted    // 3
}

function getStatus(status: Status): string {
  switch (status) {
    case Status.Pending:
      return "Waiting for approval";
    case Status.Active:
      return "Currently active";
    case Status.Inactive:
      return "Temporarily inactive";
    case Status.Deleted:
      return "Permanently deleted";
  }
}

const currentStatus: Status = Status.Active;
console.log(getStatus(currentStatus)); // "Currently active"

// Custom starting value
enum ErrorCode {
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  ServerError = 500
}

function handleError(code: ErrorCode): void {
  console.log(`Error code: ${code}`);
}

handleError(ErrorCode.NotFound); // "Error code: 404"

// Mixed initialization
enum Priority {
  Low = 1,
  Medium,    // 2 (auto-incremented)
  High,      // 3
  Critical = 10
}
```

### Example 2: String Enums

```typescript
// String enum
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

function move(direction: Direction): string {
  return `Moving ${direction}`;
}

console.log(move(Direction.Up)); // "Moving UP"

// String enum for API endpoints
enum ApiEndpoint {
  Users = "/api/users",
  Posts = "/api/posts",
  Comments = "/api/comments",
  Auth = "/api/auth"
}

function fetchData(endpoint: ApiEndpoint): Promise<any> {
  return fetch(endpoint).then(res => res.json());
}

fetchData(ApiEndpoint.Users);

// String enum for event types
enum EventType {
  Click = "click",
  Hover = "hover",
  Focus = "focus",
  Blur = "blur",
  Submit = "submit"
}

function addEventListener(type: EventType, callback: () => void): void {
  document.addEventListener(type, callback);
}

addEventListener(EventType.Click, () => console.log("Clicked"));
```

### Example 3: Heterogeneous Enums

```typescript
// Mixing string and numeric values (not recommended)
enum Mixed {
  No = 0,
  Yes = "YES"
}

// Better: Use separate enums
enum BooleanNumeric {
  False = 0,
  True = 1
}

enum BooleanString {
  False = "FALSE",
  True = "TRUE"
}

// Practical use case: HTTP methods with codes
enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

enum HttpStatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500
}

interface ApiResponse {
  method: HttpMethod;
  status: HttpStatusCode;
  data: any;
}
```

### Example 4: Const Enums

```typescript
// Const enum (removed at compile time, values are inlined)
const enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR"
}

function log(level: LogLevel, message: string): void {
  console.log(`[${level}] ${message}`);
}

log(LogLevel.Info, "Application started");
// Compiled to: log("INFO", "Application started");

// Const enum for performance-critical code
const enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

const backgroundColor = Color.Red;
// Compiled to: const backgroundColor = "#FF0000";

// Note: Can't use const enums with computed members
const enum ComputedEnum {
  A = 1,
  // B = A * 2 // Error: Computed values not allowed in const enum
}
```

### Example 5: Reverse Mapping (Numeric Enums)

```typescript
// Numeric enums have reverse mapping
enum Role {
  Admin,      // 0
  User,       // 1
  Guest       // 2
}

const roleValue: Role = Role.Admin;
const roleName: string = Role[roleValue]; // "Admin"

console.log(Role.Admin); // 0
console.log(Role[0]); // "Admin"
console.log(Role["Admin"]); // 0

// Iterating over enum values
function getAllRoles(): string[] {
  return Object.keys(Role)
    .filter(key => isNaN(Number(key)))
    .map(key => key);
}

console.log(getAllRoles()); // ["Admin", "User", "Guest"]

// String enums don't have reverse mapping
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

console.log(Status.Active); // "ACTIVE"
// console.log(Status["ACTIVE"]); // undefined (no reverse mapping)
```

### Example 6: Enums with Functions

```typescript
// Enum with helper functions
enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED"
}

namespace OrderStatus {
  export function canCancel(status: OrderStatus): boolean {
    return status === OrderStatus.Pending || status === OrderStatus.Processing;
  }

  export function isComplete(status: OrderStatus): boolean {
    return status === OrderStatus.Delivered || status === OrderStatus.Cancelled;
  }

  export function getNextStatus(status: OrderStatus): OrderStatus | null {
    switch (status) {
      case OrderStatus.Pending:
        return OrderStatus.Processing;
      case OrderStatus.Processing:
        return OrderStatus.Shipped;
      case OrderStatus.Shipped:
        return OrderStatus.Delivered;
      default:
        return null;
    }
  }
}

const order = OrderStatus.Pending;
console.log(OrderStatus.canCancel(order)); // true
console.log(OrderStatus.getNextStatus(order)); // OrderStatus.Processing
```

### Example 7: Enums in Interfaces and Classes

```typescript
// Enum in interface
enum PaymentMethod {
  CreditCard = "CREDIT_CARD",
  DebitCard = "DEBIT_CARD",
  PayPal = "PAYPAL",
  Cash = "CASH"
}

interface Payment {
  id: string;
  amount: number;
  method: PaymentMethod;
  timestamp: Date;
}

const payment: Payment = {
  id: "PAY-123",
  amount: 99.99,
  method: PaymentMethod.CreditCard,
  timestamp: new Date()
};

// Enum in class
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER"
}

class User {
  constructor(
    public name: string,
    public role: UserRole
  ) {}

  hasPermission(requiredRole: UserRole): boolean {
    const roleHierarchy = {
      [UserRole.Viewer]: 1,
      [UserRole.Editor]: 2,
      [UserRole.Admin]: 3
    };

    return roleHierarchy[this.role] >= roleHierarchy[requiredRole];
  }
}

const user = new User("Alice", UserRole.Editor);
console.log(user.hasPermission(UserRole.Viewer)); // true
console.log(user.hasPermission(UserRole.Admin)); // false
```

### Example 8: Enum Best Practices and Patterns

```typescript
// Pattern 1: Use string enums for better debugging
enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production"
}

// Pattern 2: Use const enums for performance when possible
const enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

// Pattern 3: Type-safe enum validation
enum FileType {
  Image = "image",
  Video = "video",
  Document = "document"
}

function isValidFileType(value: string): value is FileType {
  return Object.values(FileType).includes(value as FileType);
}

const userInput = "image";
if (isValidFileType(userInput)) {
  const fileType: FileType = userInput; // Safe conversion
}

// Pattern 4: Enum to array conversion
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

const colorOptions: string[] = Object.values(Color);
console.log(colorOptions); // ["red", "green", "blue"]

// Pattern 5: Exhaustive checking with never
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function handleStatus(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return "Order is pending";
    case OrderStatus.Processing:
      return "Processing order";
    case OrderStatus.Shipped:
      return "Order shipped";
    case OrderStatus.Delivered:
      return "Order delivered";
    case OrderStatus.Cancelled:
      return "Order cancelled";
    default:
      return assertNever(status); // Ensures all cases are handled
  }
}
```

## Practical Tasks

### Task 1: Application State Management
Create an enum-based state management system:
1. Define enums for different application states
2. Create state transition functions
3. Implement state validation
4. Add helper methods to check state capabilities
5. Create a state machine using enums

### Task 2: API Response Handler
Build an API response handler using enums:
1. Define enums for HTTP methods and status codes
2. Create request/response type definitions
3. Implement error handling based on status codes
4. Use enums for API endpoints
5. Create utility functions for API operations

### Task 3: User Permission System
Design a role-based permission system:
1. Create enums for user roles and permissions
2. Implement role hierarchy logic
3. Create permission checking functions
4. Use enums in user authentication
5. Build access control lists using enums

### Task 4: Configuration Management
Build a type-safe configuration system:
1. Use enums for environment types
2. Create configuration interfaces with enum properties
3. Implement environment-specific configurations
4. Add validation for configuration values
5. Create helper functions for config access

## Best Practices

1. **Prefer String Enums**: They're easier to debug and more readable in logs
2. **Use Const Enums for Performance**: When you don't need reverse mapping
3. **Avoid Heterogeneous Enums**: Stick to either numeric or string values
4. **Use PascalCase for Enum Names**: Follow TypeScript naming conventions
5. **Add Namespace for Utilities**: Use namespaces to add helper functions to enums
6. **Exhaustive Checking**: Use `never` type to ensure all enum cases are handled
7. **Don't Compute Enum Members**: Keep enum values simple and constant
8. **Document Enum Values**: Add comments for non-obvious enum members
9. **Use Enums for Fixed Sets**: Only use enums for truly fixed, known sets of values
10. **Consider Union Types**: Sometimes union types of literals are better than enums

## Interview Questions

### Question 1: What's the difference between numeric and string enums?
**Answer**:

**Numeric Enums**:
- Auto-incremented values starting from 0
- Support reverse mapping (can get name from value)
- Slightly smaller compiled output

```typescript
enum NumericStatus {
  Pending,   // 0
  Active,    // 1
  Inactive   // 2
}

console.log(NumericStatus.Active); // 1
console.log(NumericStatus[1]); // "Active" (reverse mapping)
```

**String Enums**:
- Must explicitly initialize each member
- No reverse mapping
- More readable in runtime values and debugging

```typescript
enum StringStatus {
  Pending = "PENDING",
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

console.log(StringStatus.Active); // "ACTIVE"
// console.log(StringStatus["ACTIVE"]); // undefined (no reverse mapping)
```

**Recommendation**: Use string enums for better debugging and clearer intent.

### Question 2: What are const enums and when should you use them?
**Answer**: Const enums are completely removed during compilation, and their values are inlined at usage sites. This provides performance benefits but with some limitations.

```typescript
// Regular enum
enum Color {
  Red = "red"
}
const c = Color.Red;
// Compiled: const c = Color.Red;

// Const enum
const enum Color {
  Red = "red"
}
const c = Color.Red;
// Compiled: const c = "red"; (value inlined, no enum object)
```

**Benefits**:
- Smaller bundle size
- Better runtime performance
- No generated code for the enum

**Limitations**:
- No reverse mapping
- Can't use with computed members
- Not suitable when you need to iterate over enum values
- Issues with module boundaries

**Use When**:
- Performance is critical
- You only need the values, not the enum object
- Working with constants that won't be accessed dynamically

### Question 3: How do you iterate over enum values?
**Answer**: Iteration depends on whether you're using numeric or string enums.

**Numeric Enums** (with reverse mapping):
```typescript
enum Role {
  Admin,
  User,
  Guest
}

// Get enum keys (names)
const keys = Object.keys(Role).filter(key => isNaN(Number(key)));
console.log(keys); // ["Admin", "User", "Guest"]

// Get enum values
const values = Object.keys(Role)
  .filter(key => !isNaN(Number(key)))
  .map(key => Number(key));
console.log(values); // [0, 1, 2]
```

**String Enums** (no reverse mapping):
```typescript
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

// Get keys
const keys = Object.keys(Status);
console.log(keys); // ["Active", "Inactive"]

// Get values
const values = Object.values(Status);
console.log(values); // ["ACTIVE", "INACTIVE"]
```

**Type-safe iteration**:
```typescript
function getEnumValues<T extends string>(enumObj: { [key: string]: T }): T[] {
  return Object.values(enumObj);
}
```

### Question 4: How do you ensure exhaustive checking with enums?
**Answer**: Use the `never` type with a helper function to ensure all enum cases are handled in switch statements or conditional logic.

```typescript
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Completed = "COMPLETED"
}

function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${value}`);
}

function handleStatus(status: Status): string {
  switch (status) {
    case Status.Pending:
      return "Waiting";
    case Status.Active:
      return "In Progress";
    case Status.Completed:
      return "Done";
    default:
      return assertNever(status); // TypeScript error if cases missing
  }
}

// If you add a new enum member and don't handle it,
// TypeScript will show an error at the assertNever call
```

This pattern:
- Ensures compile-time checking for all cases
- Prevents bugs when enums are extended
- Makes refactoring safer
- Provides runtime error if somehow reached

### Question 5: When should you use enums vs union types of literals?
**Answer**:

**Use Enums When**:
- You need a namespace for related constants
- You want reverse mapping (numeric enums)
- You need to attach utility functions (using namespace)
- The set of values is truly fixed and known
- You want autocomplete for all possible values

```typescript
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

namespace Color {
  export function toHex(color: Color): string {
    const hexMap = {
      [Color.Red]: "#FF0000",
      [Color.Green]: "#00FF00",
      [Color.Blue]: "#0000FF"
    };
    return hexMap[color];
  }
}
```

**Use Union Types When**:
- You just need a type constraint
- You want a lighter-weight solution
- You're defining API response types
- You want better JSON serialization
- You don't need enum object features

```typescript
type Color = "red" | "green" | "blue";

function setColor(color: Color): void {
  // ...
}
```

**Trade-offs**:
- Enums: Compiled to objects, nominal typing, namespace support
- Unions: No runtime code, structural typing, simpler

## Comparison with JavaScript

| Feature | JavaScript | TypeScript Enums |
|---------|-----------|-----------------|
| Named Constants | Object with properties | Enum keyword |
| Type Safety | No | Yes |
| Reverse Mapping | Manual implementation | Automatic (numeric) |
| Auto-increment | No | Yes (numeric enums) |
| Namespace | Manual | Built-in |
| Compile-time Checking | No | Yes |

```javascript
// JavaScript - Object as enum
const Status = {
  Active: "ACTIVE",
  Inactive: "INACTIVE"
};

// TypeScript - Enum
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
```

## Additional Resources

- [TypeScript Handbook - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
- [Const Enums](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)
- [Enums vs Union Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
