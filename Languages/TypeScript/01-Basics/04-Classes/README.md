# Classes

## Introduction

Classes in TypeScript are blueprints for creating objects with specific properties and methods. TypeScript enhances JavaScript classes with type annotations, access modifiers, abstract classes, and interfaces, providing robust object-oriented programming capabilities.

## Key Concepts

### Class Definition

Classes define the structure and behavior of objects:

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### Access Modifiers

TypeScript provides three access modifiers:
- `public`: Accessible everywhere (default)
- `private`: Accessible only within the class
- `protected`: Accessible within the class and subclasses

### Inheritance

Classes can extend other classes using the `extends` keyword.

## TypeScript-Specific Code Examples

### Example 1: Basic Class with Access Modifiers

```typescript
class User {
  // Public property (accessible everywhere)
  public name: string;

  // Private property (accessible only within this class)
  private password: string;

  // Protected property (accessible within class and subclasses)
  protected email: string;

  constructor(name: string, password: string, email: string) {
    this.name = name;
    this.password = password;
    this.email = email;
  }

  // Public method
  public greet(): string {
    return `Hello, I'm ${this.name}`;
  }

  // Private method
  private validatePassword(password: string): boolean {
    return this.password === password;
  }

  // Public method using private method
  public login(password: string): boolean {
    return this.validatePassword(password);
  }
}

const user = new User("Alice", "secret123", "alice@example.com");
console.log(user.name); // Accessible
// console.log(user.password); // Error: Property 'password' is private
// console.log(user.email); // Error: Property 'email' is protected
```

### Example 2: Constructor Shorthand

```typescript
// Traditional way
class Product1 {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

// Shorthand using parameter properties
class Product {
  constructor(
    public name: string,
    public price: number,
    private id: string
  ) {}

  getProductInfo(): string {
    return `${this.name}: $${this.price} (ID: ${this.id})`;
  }
}

const product = new Product("Laptop", 999.99, "PROD-001");
console.log(product.name); // Accessible
// console.log(product.id); // Error: Property 'id' is private
```

### Example 3: Inheritance and Method Overriding

```typescript
// Base class
class Animal {
  constructor(
    public name: string,
    protected age: number
  ) {}

  makeSound(): string {
    return "Some generic sound";
  }

  getInfo(): string {
    return `${this.name} is ${this.age} years old`;
  }
}

// Derived class
class Dog extends Animal {
  constructor(
    name: string,
    age: number,
    public breed: string
  ) {
    super(name, age); // Call parent constructor
  }

  // Override parent method
  makeSound(): string {
    return "Woof! Woof!";
  }

  // Add new method
  fetch(): string {
    return `${this.name} is fetching the ball`;
  }

  // Access protected property from parent
  getAge(): number {
    return this.age;
  }
}

const dog = new Dog("Buddy", 5, "Golden Retriever");
console.log(dog.makeSound()); // "Woof! Woof!"
console.log(dog.getInfo()); // "Buddy is 5 years old"
console.log(dog.fetch()); // "Buddy is fetching the ball"
```

### Example 4: Getters and Setters

```typescript
class BankAccount {
  private _balance: number = 0;

  constructor(private accountNumber: string) {}

  // Getter
  get balance(): number {
    return this._balance;
  }

  // Setter with validation
  set balance(amount: number) {
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }
    this._balance = amount;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
  }
}

const account = new BankAccount("ACC-12345");
account.deposit(1000);
console.log(account.balance); // 1000 (using getter)
account.withdraw(500);
console.log(account.balance); // 500
// account.balance = -100; // Error: Balance cannot be negative
```

### Example 5: Static Members

```typescript
class MathUtils {
  static readonly PI: number = 3.14159;
  static instanceCount: number = 0;

  constructor() {
    MathUtils.instanceCount++;
  }

  // Static method
  static circleArea(radius: number): number {
    return this.PI * radius * radius;
  }

  static circleCircumference(radius: number): number {
    return 2 * this.PI * radius;
  }

  // Instance method can access static members
  getPi(): number {
    return MathUtils.PI;
  }
}

// Access static members without creating an instance
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.circleArea(5)); // 78.53975

const util1 = new MathUtils();
const util2 = new MathUtils();
console.log(MathUtils.instanceCount); // 2
```

### Example 6: Abstract Classes

```typescript
// Abstract class cannot be instantiated
abstract class Shape {
  constructor(public color: string) {}

  // Abstract method (must be implemented by subclasses)
  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;

  // Concrete method (inherited by subclasses)
  describe(): string {
    return `This is a ${this.color} shape with area ${this.calculateArea()}`;
  }
}

class Circle extends Shape {
  constructor(
    color: string,
    private radius: number
  ) {
    super(color);
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    private width: number,
    private height: number
  ) {
    super(color);
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// const shape = new Shape("red"); // Error: Cannot create an instance of an abstract class
const circle = new Circle("blue", 5);
const rectangle = new Rectangle("red", 10, 5);

console.log(circle.describe());
console.log(rectangle.describe());
```

### Example 7: Implementing Interfaces

```typescript
// Interface definition
interface Printable {
  print(): void;
}

interface Saveable {
  save(): void;
}

// Class implementing multiple interfaces
class Document implements Printable, Saveable {
  constructor(
    private title: string,
    private content: string
  ) {}

  print(): void {
    console.log(`Printing: ${this.title}`);
    console.log(this.content);
  }

  save(): void {
    console.log(`Saving document: ${this.title}`);
    // Save logic here
  }

  getTitle(): string {
    return this.title;
  }
}

const doc = new Document("Report", "This is the content");
doc.print();
doc.save();
```

### Example 8: Readonly Properties

```typescript
class Point {
  // Readonly property
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // Alternative using parameter properties
  // constructor(
  //   readonly x: number,
  //   readonly y: number
  // ) {}
}

const point = new Point(10, 20);
console.log(point.x, point.y);
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

class Configuration {
  constructor(
    readonly host: string,
    readonly port: number,
    public timeout: number = 5000
  ) {}
}

const config = new Configuration("localhost", 3000);
// config.host = "example.com"; // Error
config.timeout = 10000; // OK - not readonly
```

## Practical Tasks

### Task 1: Employee Management System
Create an employee management system using classes:
1. Create a base `Employee` class with name, id, and salary (protected)
2. Create `Manager` and `Developer` subclasses with specific properties
3. Implement methods to calculate bonuses (different for each type)
4. Use access modifiers appropriately
5. Add getters and setters for salary with validation

### Task 2: Shopping Cart System
Build a shopping cart with classes:
1. Create a `Product` class with name, price, and id
2. Create a `CartItem` class that includes product and quantity
3. Create a `ShoppingCart` class with private items array
4. Implement methods: addItem, removeItem, getTotalPrice, clear
5. Use static methods for discount calculations

### Task 3: Abstract Vehicle Hierarchy
Design a vehicle hierarchy using abstract classes:
1. Create an abstract `Vehicle` class with abstract methods
2. Create concrete classes: `Car`, `Motorcycle`, `Truck`
3. Implement different behaviors for each vehicle type
4. Use protected properties that subclasses can access
5. Create a fleet management class to manage vehicles

### Task 4: Bank Account System
Implement a banking system with proper encapsulation:
1. Create an abstract `Account` class
2. Create `CheckingAccount` and `SavingsAccount` subclasses
3. Use private properties for sensitive data
4. Implement deposit, withdraw, and transfer methods
5. Use getters/setters with validation logic
6. Implement static methods for utility functions

## Best Practices

1. **Use Access Modifiers**: Always specify `public`, `private`, or `protected` explicitly
2. **Prefer Constructor Shorthand**: Use parameter properties to reduce boilerplate
3. **Encapsulation**: Keep data private and expose through methods
4. **Single Responsibility**: Each class should have one clear purpose
5. **Use Abstract Classes**: For shared behavior with required implementations
6. **Implement Interfaces**: Define contracts for class behavior
7. **Use Readonly**: Mark properties that shouldn't change after initialization
8. **Static for Utilities**: Use static methods for utility functions
9. **Proper Inheritance**: Use inheritance for "is-a" relationships
10. **Avoid Deep Hierarchies**: Keep inheritance hierarchies shallow

## Interview Questions

### Question 1: What are access modifiers in TypeScript?
**Answer**: TypeScript provides three access modifiers to control the visibility of class members:

- **`public`** (default): Accessible from anywhere
- **`private`**: Accessible only within the class
- **`protected`**: Accessible within the class and its subclasses

```typescript
class Example {
  public publicProp: string;      // Accessible everywhere
  private privateProp: string;    // Only within this class
  protected protectedProp: string; // Within class and subclasses

  constructor() {
    this.publicProp = "public";
    this.privateProp = "private";
    this.protectedProp = "protected";
  }
}

const example = new Example();
console.log(example.publicProp); // OK
// console.log(example.privateProp); // Error
// console.log(example.protectedProp); // Error
```

Note: These are compile-time only. JavaScript doesn't have true private members (though ES2022 added private fields with `#`).

### Question 2: What's the difference between abstract classes and interfaces?
**Answer**:

**Abstract Classes:**
- Can contain implementation (concrete methods)
- Can have constructors
- Support access modifiers
- Use `extends` keyword (single inheritance)
- Can have abstract and non-abstract members

**Interfaces:**
- Cannot contain implementation
- No constructors
- All members are public
- Use `implements` keyword (multiple implementation)
- All members are abstract by definition

```typescript
// Abstract class
abstract class Animal {
  constructor(public name: string) {}

  abstract makeSound(): string; // Must be implemented

  move(): void { // Inherited as-is
    console.log("Moving...");
  }
}

// Interface
interface Flyable {
  fly(): void; // Must be implemented
}

class Bird extends Animal implements Flyable {
  makeSound(): string {
    return "Chirp";
  }

  fly(): void {
    console.log("Flying...");
  }
}
```

### Question 3: Explain the constructor parameter properties shorthand
**Answer**: TypeScript allows you to declare and initialize class properties directly in the constructor parameters by using access modifiers.

```typescript
// Traditional way
class User1 {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// Shorthand with parameter properties
class User2 {
  constructor(
    public name: string,
    public age: number,
    private id: string
  ) {}
}

// Both create the same result
const user = new User2("Alice", 30, "ID-123");
console.log(user.name); // "Alice"
```

Benefits:
- Less boilerplate code
- Clearer intent
- Automatic property declaration and initialization
- Works with all access modifiers and readonly

### Question 4: How do getters and setters work in TypeScript classes?
**Answer**: Getters and setters allow you to control access to class properties. They're accessed like properties but executed like methods.

```typescript
class Temperature {
  private _celsius: number = 0;

  // Getter
  get celsius(): number {
    return this._celsius;
  }

  // Setter with validation
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero");
    }
    this._celsius = value;
  }

  // Computed property
  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature();
temp.celsius = 25; // Calls setter
console.log(temp.celsius); // Calls getter: 25
console.log(temp.fahrenheit); // Calls getter: 77
```

Use cases:
- Validation before setting values
- Computed properties
- Logging or side effects
- Backwards compatibility when refactoring

### Question 5: What are static members in classes?
**Answer**: Static members belong to the class itself rather than to instances. They're accessed using the class name and shared across all instances.

```typescript
class Counter {
  static count: number = 0;

  constructor() {
    Counter.count++; // Access via class name
  }

  static getCount(): number {
    return Counter.count;
  }

  static reset(): void {
    Counter.count = 0;
  }
}

const c1 = new Counter();
const c2 = new Counter();
console.log(Counter.getCount()); // 2
Counter.reset();
console.log(Counter.count); // 0
```

Common uses:
- Utility functions (e.g., `Math.max()`)
- Factory methods
- Singleton pattern
- Shared constants
- Instance counting

## Comparison with JavaScript

| Feature | JavaScript (ES6+) | TypeScript |
|---------|------------------|------------|
| Access Modifiers | No (only # for private) | public, private, protected |
| Type Annotations | No | Yes |
| Abstract Classes | No | Yes |
| Interfaces | No | Yes |
| Parameter Properties | No | Yes |
| Readonly | No (use getters) | readonly keyword |
| Compile-time Checking | No | Yes |

```javascript
// JavaScript
class User {
  constructor(name) {
    this.name = name;
  }
}

// TypeScript
class User {
  constructor(
    public name: string,
    private password: string
  ) {}
}
```

## Additional Resources

- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [OOP Principles in TypeScript](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Abstract Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members)
