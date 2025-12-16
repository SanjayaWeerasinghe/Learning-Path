# Factory Pattern

## What You'll Learn
- Understanding the Factory design pattern
- Simple Factory vs Factory Method
- When and why to use Factory
- Creating objects without exposing creation logic
- Reducing coupling between classes

## Concept Overview

The Factory pattern provides an interface for creating objects without specifying their exact classes. It encapsulates object creation logic and promotes loose coupling.

### Types of Factory Patterns
1. **Simple Factory**: Not a true design pattern, but common idiom
2. **Factory Method**: Defines interface for creating object, lets subclasses decide which class to instantiate
3. **Abstract Factory**: Creates families of related objects (covered in next section)

### Benefits
- **Encapsulation**: Object creation logic is centralized
- **Flexibility**: Easy to introduce new types
- **Loose Coupling**: Client code doesn't depend on concrete classes
- **Single Responsibility**: Creation logic separated from business logic

## Simple Factory

```java
// Product interface
interface Animal {
    void makeSound();
}

// Concrete products
class Dog implements Animal {
    public void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat implements Animal {
    public void makeSound() {
        System.out.println("Meow!");
    }
}

// Simple Factory
class AnimalFactory {
    public static Animal createAnimal(String type) {
        if (type.equalsIgnoreCase("dog")) {
            return new Dog();
        } else if (type.equalsIgnoreCase("cat")) {
            return new Cat();
        }
        throw new IllegalArgumentException("Unknown animal type");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Animal dog = AnimalFactory.createAnimal("dog");
        dog.makeSound();  // Output: Woof!

        Animal cat = AnimalFactory.createAnimal("cat");
        cat.makeSound();  // Output: Meow!
    }
}
```

## Factory Method Pattern

```java
// Product interface
interface Document {
    void open();
    void save();
}

// Concrete products
class PDFDocument implements Document {
    public void open() {
        System.out.println("Opening PDF document");
    }

    public void save() {
        System.out.println("Saving PDF document");
    }
}

class WordDocument implements Document {
    public void open() {
        System.out.println("Opening Word document");
    }

    public void save() {
        System.out.println("Saving Word document");
    }
}

// Creator (abstract class or interface)
abstract class Application {
    // Factory method
    abstract Document createDocument();

    public void newDocument() {
        Document doc = createDocument();
        doc.open();
    }
}

// Concrete creators
class PDFApplication extends Application {
    Document createDocument() {
        return new PDFDocument();
    }
}

class WordApplication extends Application {
    Document createDocument() {
        return new WordDocument();
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Application pdfApp = new PDFApplication();
        pdfApp.newDocument();  // Opens PDF

        Application wordApp = new WordApplication();
        wordApp.newDocument();  // Opens Word
    }
}
```

## Your Tasks

### Task 1: Simple Factory - Shape Creator
Create a shape factory that creates different geometric shapes.

```java
interface Shape {
    void draw();
    double area();
}

class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public void draw() {
        System.out.println("Drawing Circle");
    }

    public double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public void draw() {
        System.out.println("Drawing Rectangle");
    }

    public double area() {
        return width * height;
    }
}

class ShapeFactory {
    // Create factory method
}

// Test
public class ShapeTest {
    public static void main(String[] args) {
        Shape circle = ShapeFactory.createShape("circle", 5.0);
        circle.draw();
        System.out.println("Area: " + circle.area());

        Shape rectangle = ShapeFactory.createShape("rectangle", 4.0, 5.0);
        rectangle.draw();
        System.out.println("Area: " + rectangle.area());
    }
}
```

**Expected Output:**
```
Drawing Circle
Area: 78.53981633974483
Drawing Rectangle
Area: 20.0
```

### Task 2: Vehicle Factory
Create a vehicle factory with different vehicle types.

```java
interface Vehicle {
    void start();
    void stop();
    int getWheels();
}

class Car implements Vehicle {
    public void start() {
        System.out.println("Car starting...");
    }

    public void stop() {
        System.out.println("Car stopped");
    }

    public int getWheels() {
        return 4;
    }
}

class Motorcycle implements Vehicle {
    public void start() {
        System.out.println("Motorcycle starting...");
    }

    public void stop() {
        System.out.println("Motorcycle stopped");
    }

    public int getWheels() {
        return 2;
    }
}

class Truck implements Vehicle {
    public void start() {
        System.out.println("Truck starting...");
    }

    public void stop() {
        System.out.println("Truck stopped");
    }

    public int getWheels() {
        return 6;
    }
}

class VehicleFactory {
    // Implement factory
}
```

### Task 3: Factory Method - Notification System
Implement a notification system using Factory Method pattern.

```java
interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SMSNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class PushNotification implements Notification {
    public void send(String message) {
        System.out.println("Push: " + message);
    }
}

abstract class NotificationService {
    abstract Notification createNotification();

    public void notify(String message) {
        Notification notification = createNotification();
        notification.send(message);
    }
}

class EmailNotificationService extends NotificationService {
    // Implement
}

class SMSNotificationService extends NotificationService {
    // Implement
}
```

### Task 4: Database Connection Factory
Create a factory for different database connections.

```java
interface DatabaseConnection {
    void connect();
    void disconnect();
    void executeQuery(String query);
}

class MySQLConnection implements DatabaseConnection {
    public void connect() {
        System.out.println("Connecting to MySQL...");
    }

    public void disconnect() {
        System.out.println("Disconnecting from MySQL");
    }

    public void executeQuery(String query) {
        System.out.println("Executing MySQL query: " + query);
    }
}

class PostgreSQLConnection implements DatabaseConnection {
    public void connect() {
        System.out.println("Connecting to PostgreSQL...");
    }

    public void disconnect() {
        System.out.println("Disconnecting from PostgreSQL");
    }

    public void executeQuery(String query) {
        System.out.println("Executing PostgreSQL query: " + query);
    }
}

class DatabaseFactory {
    // Implement
}
```

### Task 5: Payment Processor Factory
Create a payment processing system with different payment methods.

```java
interface PaymentProcessor {
    void processPayment(double amount);
    boolean validatePayment();
}

class CreditCardProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via Credit Card");
    }

    public boolean validatePayment() {
        return true;
    }
}

class PayPalProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        System.out.println("Processing $" + amount + " via PayPal");
    }

    public boolean validatePayment() {
        return true;
    }
}

class PaymentFactory {
    // Implement factory with enum
    enum PaymentMethod {
        CREDIT_CARD, PAYPAL, BITCOIN
    }
}
```

### Task 6: Logger Factory
Create different types of loggers (Console, File, Database).

```java
interface Logger {
    void log(String message);
    void error(String message);
    void warn(String message);
}

class ConsoleLogger implements Logger {
    // Implement
}

class FileLogger implements Logger {
    // Implement
}

class LoggerFactory {
    // Implement with configuration
}
```

### Task 7: UI Component Factory
Create a factory for different UI themes.

```java
interface Button {
    void render();
}

interface TextField {
    void render();
}

class DarkButton implements Button {
    public void render() {
        System.out.println("Rendering dark theme button");
    }
}

class LightButton implements Button {
    public void render() {
        System.out.println("Rendering light theme button");
    }
}

abstract class UIFactory {
    abstract Button createButton();
    abstract TextField createTextField();
}
```

### Task 8: Employee Factory with Salary Calculation
Create different employee types with factory.

```java
abstract class Employee {
    protected String name;
    protected double baseSalary;

    abstract double calculateSalary();
    abstract String getRole();
}

class Developer extends Employee {
    public double calculateSalary() {
        return baseSalary * 1.2;  // 20% bonus
    }

    public String getRole() {
        return "Developer";
    }
}

class Manager extends Employee {
    public double calculateSalary() {
        return baseSalary * 1.5;  // 50% bonus
    }

    public String getRole() {
        return "Manager";
    }
}

class EmployeeFactory {
    // Implement
}
```

## Common Pitfalls

### 1. Too Many Conditionals
```java
// ❌ Difficult to maintain
public Product createProduct(String type) {
    if (type.equals("A")) return new ProductA();
    else if (type.equals("B")) return new ProductB();
    else if (type.equals("C")) return new ProductC();
    // ... many more conditions
}

// ✅ Use map or strategy
private static final Map<String, Supplier<Product>> productMap = Map.of(
    "A", ProductA::new,
    "B", ProductB::new,
    "C", ProductC::new
);

public Product createProduct(String type) {
    return productMap.get(type).get();
}
```

### 2. Violating Open/Closed Principle
Make your factory extensible without modifying existing code.

## Best Practices

1. **Use enums for types**: More type-safe than strings
2. **Return interfaces**: Not concrete classes
3. **Use static factory methods**: For simple cases
4. **Consider parameterized factory**: For complex object creation
5. **Handle invalid input**: Gracefully with exceptions or null object pattern

## Real-World Examples

- `Calendar.getInstance()` in Java
- `NumberFormat.getInstance()` in Java
- `Collections.synchronizedList()` in Java
- JDBC `DriverManager.getConnection()`

## Next Steps

After mastering Factory, move on to `03-Abstract-Factory` to learn about creating families of related objects!

**Challenge**: Create a comprehensive logging system with multiple logger types, log levels, and formatters, all created using the Factory pattern.
