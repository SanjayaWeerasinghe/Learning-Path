# Clean Code & OOP Principles - Interview Questions & Answers

## Table of Contents
1. [Clean Code Fundamentals](#clean-code-fundamentals)
2. [SOLID Principles](#solid-principles)
3. [Design Patterns](#design-patterns)
4. [Code Smells and Refactoring](#code-smells-and-refactoring)
5. [Testing Best Practices](#testing-best-practices)
6. [Code Review Guidelines](#code-review-guidelines)

---

## Clean Code Fundamentals

### Question
**What makes code "clean" and why is it important?**

### Answer

Clean code is code that is easy to read, understand, and maintain. It's self-explanatory and follows consistent patterns.

**Principles:**
- **Readability**: Code is read more often than written
- **Simplicity**: Keep it simple (KISS principle)
- **No duplication**: DRY (Don't Repeat Yourself)
- **Single responsibility**: Each function/class does one thing
- **Testability**: Easy to test

### Better Explanation

**Bad vs Good Code Examples:**

**❌ Bad: Poor naming and structure**
```typescript
function x(a, b) {
  let c = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i].p > b) {
      c++;
    }
  }
  return c;
}
```

**✅ Good: Clear naming and purpose**
```typescript
function countExpensiveProducts(products: Product[], priceThreshold: number): number {
  let expensiveCount = 0;

  for (const product of products) {
    if (product.price > priceThreshold) {
      expensiveCount++;
    }
  }

  return expensiveCount;
}

// Even better with LINQ/filter
function countExpensiveProducts(products: Product[], priceThreshold: number): number {
  return products.filter(product => product.price > priceThreshold).length;
}
```

**1. Meaningful Names:**
```typescript
// ❌ Bad
function calc(a, b) {
  return a * b * 0.2;
}

// ✅ Good
function calculateProductTax(price: number, quantity: number): number {
  const TAX_RATE = 0.2;
  return price * quantity * TAX_RATE;
}

// ❌ Bad variable names
let d = new Date();
let x = user.getName();

// ✅ Good variable names
const currentDate = new Date();
const userName = user.getName();
```

**2. Functions Should Be Small:**
```typescript
// ❌ Bad: One function doing everything
function processOrder(order) {
  // Validate order (20 lines)
  if (!order.items || order.items.length === 0) {
    throw new Error('No items');
  }
  // ... more validation

  // Calculate total (15 lines)
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  // ... more calculations

  // Apply discounts (20 lines)
  // ... discount logic

  // Save to database (10 lines)
  // ... database code

  // Send email (15 lines)
  // ... email code

  return order;
}

// ✅ Good: Separated concerns
function processOrder(order: Order): ProcessedOrder {
  validateOrder(order);
  const total = calculateOrderTotal(order);
  const discountedTotal = applyDiscounts(total, order.customerId);
  const savedOrder = saveOrder(order, discountedTotal);
  sendOrderConfirmation(savedOrder);

  return savedOrder;
}

function validateOrder(order: Order): void {
  if (!order.items || order.items.length === 0) {
    throw new ValidationError('Order must have at least one item');
  }

  if (!order.customerId) {
    throw new ValidationError('Customer ID is required');
  }
}

function calculateOrderTotal(order: Order): number {
  return order.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}
```

**3. Comments Should Explain "Why", Not "What":**
```typescript
// ❌ Bad: Comments explaining obvious code
// Increment i by 1
i++;

// Loop through users
for (const user of users) {
  // ...
}

// ✅ Good: Comments explaining reasoning
// Use a delay to prevent API rate limiting (max 100 requests/minute)
await sleep(600);

// Calculate tax differently for international orders due to VAT requirements
if (order.isInternational) {
  total = calculateInternationalTax(total, order.country);
}

// ✅ Better: Self-documenting code that doesn't need comments
const RATE_LIMIT_DELAY_MS = 600;
await preventRateLimiting(RATE_LIMIT_DELAY_MS);

function calculateTotalWithTax(order: Order): number {
  return order.isInternational
    ? calculateInternationalTax(order.total, order.country)
    : calculateDomesticTax(order.total);
}
```

**4. Error Handling:**
```typescript
// ❌ Bad: Silent failures
function getUser(id: number) {
  try {
    return database.findUser(id);
  } catch (error) {
    return null; // Swallows error
  }
}

// ✅ Good: Explicit error handling
function getUser(id: number): User {
  try {
    const user = database.findUser(id);

    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }

    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    logger.error('Database error while fetching user', { id, error });
    throw new DatabaseError('Failed to fetch user', error);
  }
}
```

**5. DRY (Don't Repeat Yourself):**
```typescript
// ❌ Bad: Duplication
function createUser(name: string, email: string) {
  const user = {
    id: generateId(),
    name: name,
    email: email,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  database.save(user);
  sendWelcomeEmail(email);
  logUserCreated(user);
  return user;
}

function createAdmin(name: string, email: string, permissions: string[]) {
  const admin = {
    id: generateId(),
    name: name,
    email: email,
    permissions: permissions,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  database.save(admin);
  sendWelcomeEmail(email);
  logUserCreated(admin);
  return admin;
}

// ✅ Good: Reusable logic
interface CreateUserOptions {
  name: string;
  email: string;
  permissions?: string[];
}

function createUser(options: CreateUserOptions): User {
  const user = {
    id: generateId(),
    ...options,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  database.save(user);
  sendWelcomeEmail(user.email);
  logUserCreated(user);

  return user;
}

function createAdmin(name: string, email: string, permissions: string[]): User {
  return createUser({ name, email, permissions });
}
```

---

## SOLID Principles

### Question
**Explain the SOLID principles with examples.**

### Answer

SOLID is an acronym for five design principles that make software more maintainable and flexible.

### 1. Single Responsibility Principle (SRP)

**A class should have only one reason to change.**

```typescript
// ❌ Bad: Multiple responsibilities
class User {
  constructor(public name: string, public email: string) {}

  save() {
    // Database logic
    database.save(this);
  }

  sendEmail(message: string) {
    // Email logic
    emailService.send(this.email, message);
  }

  generateReport() {
    // Report logic
    return `Report for ${this.name}`;
  }
}

// ✅ Good: Single responsibility
class User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}
}

class UserRepository {
  save(user: User): void {
    database.save(user);
  }

  findById(id: number): User | null {
    return database.findById(id);
  }
}

class EmailService {
  sendToUser(user: User, message: string): void {
    this.send(user.email, message);
  }

  private send(email: string, message: string): void {
    // Email logic
  }
}

class UserReportGenerator {
  generate(user: User): string {
    return `Report for ${user.name}`;
  }
}
```

### 2. Open/Closed Principle (OCP)

**Software entities should be open for extension but closed for modification.**

```typescript
// ❌ Bad: Must modify class to add new payment types
class PaymentProcessor {
  processPayment(amount: number, type: string) {
    if (type === 'credit_card') {
      // Credit card logic
    } else if (type === 'paypal') {
      // PayPal logic
    } else if (type === 'bitcoin') {
      // Bitcoin logic
    }
  }
}

// ✅ Good: Open for extension, closed for modification
interface PaymentMethod {
  process(amount: number): Promise<PaymentResult>;
}

class CreditCardPayment implements PaymentMethod {
  async process(amount: number): Promise<PaymentResult> {
    // Credit card logic
    return { success: true, transactionId: '123' };
  }
}

class PayPalPayment implements PaymentMethod {
  async process(amount: number): Promise<PaymentResult> {
    // PayPal logic
    return { success: true, transactionId: '456' };
  }
}

class BitcoinPayment implements PaymentMethod {
  async process(amount: number): Promise<PaymentResult> {
    // Bitcoin logic
    return { success: true, transactionId: '789' };
  }
}

class PaymentProcessor {
  constructor(private paymentMethod: PaymentMethod) {}

  async processPayment(amount: number): Promise<PaymentResult> {
    return this.paymentMethod.process(amount);
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardPayment());
await processor.processPayment(100);
```

### 3. Liskov Substitution Principle (LSP)

**Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.**

```typescript
// ❌ Bad: Violates LSP
class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
    this.height = width; // Breaks LSP
  }

  setHeight(height: number) {
    this.width = height; // Breaks LSP
    this.height = height;
  }
}

// This breaks when using Square
function resizeRectangle(rectangle: Rectangle) {
  rectangle.setWidth(5);
  rectangle.setHeight(4);
  console.log(rectangle.getArea()); // Expected: 20, but Square gives 16
}

// ✅ Good: Proper abstraction
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  constructor(private side: number) {}

  getArea(): number {
    return this.side * this.side;
  }
}
```

### 4. Interface Segregation Principle (ISP)

**No client should be forced to depend on methods it doesn't use.**

```typescript
// ❌ Bad: Fat interface
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Human implements Worker {
  work() { console.log('Working'); }
  eat() { console.log('Eating'); }
  sleep() { console.log('Sleeping'); }
}

class Robot implements Worker {
  work() { console.log('Working'); }
  eat() { throw new Error('Robots don\'t eat'); } // Forced to implement
  sleep() { throw new Error('Robots don\'t sleep'); } // Forced to implement
}

// ✅ Good: Segregated interfaces
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() { console.log('Working'); }
  eat() { console.log('Eating'); }
  sleep() { console.log('Sleeping'); }
}

class Robot implements Workable {
  work() { console.log('Working'); }
}
```

### 5. Dependency Inversion Principle (DIP)

**Depend on abstractions, not concretions.**

```typescript
// ❌ Bad: High-level module depends on low-level module
class MySQLDatabase {
  save(data: any) {
    console.log('Saving to MySQL');
  }
}

class UserService {
  private database = new MySQLDatabase(); // Tight coupling

  saveUser(user: User) {
    this.database.save(user);
  }
}

// ✅ Good: Depend on abstraction
interface Database {
  save(data: any): void;
  find(id: number): any;
}

class MySQLDatabase implements Database {
  save(data: any) {
    console.log('Saving to MySQL');
  }

  find(id: number) {
    return { id, name: 'John' };
  }
}

class MongoDatabase implements Database {
  save(data: any) {
    console.log('Saving to MongoDB');
  }

  find(id: number) {
    return { id, name: 'John' };
  }
}

class UserService {
  constructor(private database: Database) {} // Dependency injection

  saveUser(user: User) {
    this.database.save(user);
  }

  getUser(id: number) {
    return this.database.find(id);
  }
}

// Usage - Easy to swap implementations
const mysqlService = new UserService(new MySQLDatabase());
const mongoService = new UserService(new MongoDatabase());
```

---

## Design Patterns

### Question
**What are common design patterns and when should you use them?**

### Answer

**1. Singleton Pattern:**
```typescript
// Ensures a class has only one instance
class Database {
  private static instance: Database;
  private constructor() {
    // Private constructor prevents instantiation
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query(sql: string) {
    console.log(`Executing: ${sql}`);
  }
}

// Usage
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true - same instance
```

**2. Factory Pattern:**
```typescript
// Creates objects without specifying exact class
interface Animal {
  speak(): string;
}

class Dog implements Animal {
  speak() { return 'Woof!'; }
}

class Cat implements Animal {
  speak() { return 'Meow!'; }
}

class AnimalFactory {
  static createAnimal(type: 'dog' | 'cat'): Animal {
    switch (type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        throw new Error('Unknown animal type');
    }
  }
}

// Usage
const dog = AnimalFactory.createAnimal('dog');
console.log(dog.speak()); // Woof!
```

**3. Observer Pattern:**
```typescript
// Define subject and observers
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}

// Implementation
class UserService extends Subject {
  createUser(user: User) {
    // Create user logic
    this.notify({ event: 'user_created', user });
  }
}

class EmailObserver implements Observer {
  update(data: any) {
    if (data.event === 'user_created') {
      console.log(`Sending welcome email to ${data.user.email}`);
    }
  }
}

class LogObserver implements Observer {
  update(data: any) {
    console.log(`Log: ${data.event}`, data);
  }
}

// Usage
const userService = new UserService();
userService.subscribe(new EmailObserver());
userService.subscribe(new LogObserver());

userService.createUser({ id: 1, email: 'john@example.com' });
```

**4. Strategy Pattern:**
```typescript
// Define strategy interface
interface CompressionStrategy {
  compress(file: File): CompressedFile;
}

class ZipCompression implements CompressionStrategy {
  compress(file: File): CompressedFile {
    console.log('Compressing with ZIP');
    return { name: `${file.name}.zip`, size: file.size * 0.5 };
  }
}

class RarCompression implements CompressionStrategy {
  compress(file: File): CompressedFile {
    console.log('Compressing with RAR');
    return { name: `${file.name}.rar`, size: file.size * 0.4 };
  }
}

class FileCompressor {
  constructor(private strategy: CompressionStrategy) {}

  setStrategy(strategy: CompressionStrategy) {
    this.strategy = strategy;
  }

  compressFile(file: File): CompressedFile {
    return this.strategy.compress(file);
  }
}

// Usage
const compressor = new FileCompressor(new ZipCompression());
compressor.compressFile(myFile);

compressor.setStrategy(new RarCompression());
compressor.compressFile(myFile);
```

**5. Decorator Pattern:**
```typescript
// Add behavior to objects dynamically
interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost() { return 5; }
  description() { return 'Simple coffee'; }
}

class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  cost() { return this.coffee.cost(); }
  description() { return this.coffee.description(); }
}

class MilkDecorator extends CoffeeDecorator {
  cost() { return this.coffee.cost() + 2; }
  description() { return this.coffee.description() + ', milk'; }
}

class SugarDecorator extends CoffeeDecorator {
  cost() { return this.coffee.cost() + 1; }
  description() { return this.coffee.description() + ', sugar'; }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
console.log(`${coffee.description()}: $${coffee.cost()}`);
// Simple coffee: $5

coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(`${coffee.description()}: $${coffee.cost()}`);
// Simple coffee, milk, sugar: $8
```

---

## Code Smells and Refactoring

### Question
**What are code smells and how do you refactor them?**

### Answer

**1. Long Method:**
```typescript
// ❌ Code smell
function processUserRegistration(data: any) {
  // 100+ lines of validation, processing, database operations, email sending
}

// ✅ Refactored
function processUserRegistration(data: RegistrationData): User {
  validateRegistrationData(data);
  const user = createUserAccount(data);
  sendWelcomeEmail(user);
  logUserRegistration(user);
  return user;
}
```

**2. Duplicate Code:**
```typescript
// ❌ Code smell
function calculateDiscountForUser(user: User, amount: number) {
  if (user.isPremium) {
    return amount * 0.8;
  }
  return amount;
}

function calculateDiscountForOrder(order: Order) {
  if (order.user.isPremium) {
    return order.total * 0.8;
  }
  return order.total;
}

// ✅ Refactored
function applyPremiumDiscount(amount: number, isPremium: boolean): number {
  const PREMIUM_DISCOUNT = 0.2;
  return isPremium ? amount * (1 - PREMIUM_DISCOUNT) : amount;
}

function calculateDiscountForUser(user: User, amount: number) {
  return applyPremiumDiscount(amount, user.isPremium);
}

function calculateDiscountForOrder(order: Order) {
  return applyPremiumDiscount(order.total, order.user.isPremium);
}
```

**3. Large Class:**
```typescript
// ❌ Code smell: God object
class UserManager {
  createUser() {}
  updateUser() {}
  deleteUser() {}
  sendEmail() {}
  generateReport() {}
  processPayment() {}
  // 50+ methods
}

// ✅ Refactored: Separated concerns
class UserService {
  createUser() {}
  updateUser() {}
  deleteUser() {}
}

class EmailService {
  sendEmail() {}
}

class ReportService {
  generateReport() {}
}

class PaymentService {
  processPayment() {}
}
```

---

## Testing Best Practices

### Question
**What are testing best practices?**

### Answer

**1. Unit Tests:**
```typescript
// Function to test
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Test
describe('calculateTotal', () => {
  it('should return 0 for empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('should calculate total for single item', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(calculateTotal(items)).toBe(20);
  });

  it('should calculate total for multiple items', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];
    expect(calculateTotal(items)).toBe(35);
  });
});
```

**2. Test Doubles (Mocks, Stubs):**
```typescript
// Service with dependency
class UserService {
  constructor(private database: Database) {}

  async getUser(id: number): Promise<User> {
    return this.database.findById(id);
  }
}

// Test with mock
describe('UserService', () => {
  it('should fetch user from database', async () => {
    const mockDatabase = {
      findById: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
    };

    const service = new UserService(mockDatabase as any);
    const user = await service.getUser(1);

    expect(mockDatabase.findById).toHaveBeenCalledWith(1);
    expect(user.name).toBe('John');
  });
});
```

**3. Integration Tests:**
```typescript
describe('User API', () => {
  it('should create user via API', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201);

    expect(response.body.name).toBe('John');
    expect(response.body.email).toBe('john@example.com');
  });
});
```

---

## Key Takeaways for Jeneva Interview

### Clean Code & OOP Priorities:
1. **SOLID principles**: Especially SRP and DIP
2. **Clean code**: Meaningful names, small functions
3. **Design patterns**: Know common patterns and when to use them
4. **Code smells**: Recognize and refactor bad code
5. **Testing**: Write testable, maintainable code

### Demonstrate:
- Understanding of OOP principles
- Ability to write clean, maintainable code
- Knowledge of design patterns
- Experience with refactoring
- Test-driven development mindset

### For Jeneva Interview:
- They value **clean, composable server-side code**
- Understanding of **object-oriented principles**
- Ability to write **maintainable, testable code**
- Experience with **code reviews** and **best practices**
