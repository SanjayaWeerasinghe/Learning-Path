# Decorator Pattern

## What You'll Learn
- Understanding the Decorator design pattern
- Adding functionality to objects dynamically
- Extending behavior without modifying original classes
- Creating flexible alternatives to subclassing
- Composing behaviors at runtime
- Building layered functionality systems

## Concept Overview

The Decorator pattern allows you to add new functionality to an object dynamically by wrapping it with decorator objects. It provides a flexible alternative to subclassing for extending functionality.

Think of it like adding toppings to a pizza - each topping decorates the base pizza, and you can add multiple toppings in any combination without changing the pizza itself.

### Key Characteristics
- **Dynamic Behavior**: Add responsibilities to objects at runtime
- **Composition over Inheritance**: Uses object composition instead of subclassing
- **Transparency**: Decorators have the same interface as wrapped objects
- **Flexible**: Combine decorators in different ways
- **Open/Closed Principle**: Open for extension, closed for modification

### When to Use
- Adding responsibilities to individual objects dynamically
- When extension by subclassing is impractical
- When you need to add/remove responsibilities at runtime
- When you want to avoid class explosion from many combinations
- Adding cross-cutting concerns (logging, caching, validation)

### Structure

```
Component (Interface)
    |
    |-- ConcreteComponent
    |-- Decorator (abstract) --> Component
            |
            |-- ConcreteDecoratorA
            |-- ConcreteDecoratorB
```

## Basic Implementation

```java
// Component interface
interface Coffee {
    String getDescription();
    double getCost();
}

// Concrete component
class SimpleCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Simple Coffee";
    }

    @Override
    public double getCost() {
        return 2.0;
    }
}

// Decorator base class
abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription();
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost();
    }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Milk";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Sugar";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.2;
    }
}

class WhipDecorator extends CoffeeDecorator {
    public WhipDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Whip Cream";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.7;
    }
}

// Usage
public class CoffeeShop {
    public static void main(String[] args) {
        Coffee coffee = new SimpleCoffee();
        System.out.println(coffee.getDescription() + " = $" + coffee.getCost());

        // Add milk
        coffee = new MilkDecorator(coffee);
        System.out.println(coffee.getDescription() + " = $" + coffee.getCost());

        // Add sugar
        coffee = new SugarDecorator(coffee);
        System.out.println(coffee.getDescription() + " = $" + coffee.getCost());

        // Add whip cream
        coffee = new WhipDecorator(coffee);
        System.out.println(coffee.getDescription() + " = $" + coffee.getCost());
    }
}
```

**Output:**
```
Simple Coffee = $2.0
Simple Coffee, Milk = $2.5
Simple Coffee, Milk, Sugar = $2.7
Simple Coffee, Milk, Sugar, Whip Cream = $3.4
```

## Your Tasks

### Task 1: Text Formatter Decorator
Create decorators for text formatting (bold, italic, underline).

```java
// Component
interface Text {
    String getContent();
}

// Concrete component
class PlainText implements Text {
    private String text;

    public PlainText(String text) {
        this.text = text;
    }

    @Override
    public String getContent() {
        return text;
    }
}

// Decorator base
abstract class TextDecorator implements Text {
    protected Text decoratedText;

    public TextDecorator(Text text) {
        this.decoratedText = text;
    }

    @Override
    public String getContent() {
        return decoratedText.getContent();
    }
}

// Concrete decorators
class BoldDecorator extends TextDecorator {
    public BoldDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<b>" + decoratedText.getContent() + "</b>";
    }
}

class ItalicDecorator extends TextDecorator {
    public ItalicDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<i>" + decoratedText.getContent() + "</i>";
    }
}

class UnderlineDecorator extends TextDecorator {
    public UnderlineDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<u>" + decoratedText.getContent() + "</u>";
    }
}

// Test
public class TextFormatterTest {
    public static void main(String[] args) {
        Text text = new PlainText("Hello World");
        System.out.println(text.getContent());

        text = new BoldDecorator(text);
        System.out.println(text.getContent());

        text = new ItalicDecorator(text);
        System.out.println(text.getContent());

        text = new UnderlineDecorator(text);
        System.out.println(text.getContent());
    }
}
```

**Expected Output:**
```
Hello World
<b>Hello World</b>
<i><b>Hello World</b></i>
<u><i><b>Hello World</b></i></u>
```

### Task 2: Pizza Order System
Create a pizza ordering system with various toppings.

```java
// Component
interface Pizza {
    String getDescription();
    double getPrice();
}

// Concrete component
class MargheritaPizza implements Pizza {
    @Override
    public String getDescription() {
        return "Margherita Pizza";
    }

    @Override
    public double getPrice() {
        return 8.99;
    }
}

class VeggiePizza implements Pizza {
    @Override
    public String getDescription() {
        return "Veggie Pizza";
    }

    @Override
    public double getPrice() {
        return 9.99;
    }
}

// Decorator base
abstract class ToppingDecorator implements Pizza {
    protected Pizza pizza;

    public ToppingDecorator(Pizza pizza) {
        this.pizza = pizza;
    }

    @Override
    public String getDescription() {
        return pizza.getDescription();
    }

    @Override
    public double getPrice() {
        return pizza.getPrice();
    }
}

// Concrete decorators
class CheeseTopping extends ToppingDecorator {
    public CheeseTopping(Pizza pizza) {
        super(pizza);
    }

    @Override
    public String getDescription() {
        return pizza.getDescription() + ", Extra Cheese";
    }

    @Override
    public double getPrice() {
        return pizza.getPrice() + 1.50;
    }
}

class MushroomTopping extends ToppingDecorator {
    public MushroomTopping(Pizza pizza) {
        super(pizza);
    }

    @Override
    public String getDescription() {
        return pizza.getDescription() + ", Mushrooms";
    }

    @Override
    public double getPrice() {
        return pizza.getPrice() + 1.00;
    }
}

class OliveTopping extends ToppingDecorator {
    public OliveTopping(Pizza pizza) {
        super(pizza);
    }

    @Override
    public String getDescription() {
        return pizza.getDescription() + ", Olives";
    }

    @Override
    public double getPrice() {
        return pizza.getPrice() + 0.75;
    }
}

class PepperoniTopping extends ToppingDecorator {
    public PepperoniTopping(Pizza pizza) {
        super(pizza);
    }

    @Override
    public String getDescription() {
        return pizza.getDescription() + ", Pepperoni";
    }

    @Override
    public double getPrice() {
        return pizza.getPrice() + 2.00;
    }
}

// Test
public class PizzaOrderTest {
    public static void main(String[] args) {
        Pizza pizza = new MargheritaPizza();
        pizza = new CheeseTopping(pizza);
        pizza = new MushroomTopping(pizza);
        pizza = new OliveTopping(pizza);

        System.out.println(pizza.getDescription());
        System.out.println("Total: $" + pizza.getPrice());
    }
}
```

**Expected Output:**
```
Margherita Pizza, Extra Cheese, Mushrooms, Olives
Total: $12.24
```

### Task 3: Data Stream Decorators
Create decorators for data streams (compression, encryption).

```java
// Component
interface DataStream {
    void writeData(String data);
    String readData();
}

// Concrete component
class FileDataStream implements DataStream {
    private String data = "";

    @Override
    public void writeData(String data) {
        this.data = data;
        System.out.println("Writing to file: " + data);
    }

    @Override
    public String readData() {
        System.out.println("Reading from file");
        return data;
    }
}

// Decorator base
abstract class DataStreamDecorator implements DataStream {
    protected DataStream wrappedStream;

    public DataStreamDecorator(DataStream stream) {
        this.wrappedStream = stream;
    }

    @Override
    public void writeData(String data) {
        wrappedStream.writeData(data);
    }

    @Override
    public String readData() {
        return wrappedStream.readData();
    }
}

// Concrete decorators
class CompressionDecorator extends DataStreamDecorator {
    public CompressionDecorator(DataStream stream) {
        super(stream);
    }

    @Override
    public void writeData(String data) {
        String compressed = compress(data);
        wrappedStream.writeData(compressed);
    }

    @Override
    public String readData() {
        String data = wrappedStream.readData();
        return decompress(data);
    }

    private String compress(String data) {
        System.out.println("Compressing data");
        return data + "_compressed";
    }

    private String decompress(String data) {
        System.out.println("Decompressing data");
        return data.replace("_compressed", "");
    }
}

class EncryptionDecorator extends DataStreamDecorator {
    public EncryptionDecorator(DataStream stream) {
        super(stream);
    }

    @Override
    public void writeData(String data) {
        String encrypted = encrypt(data);
        wrappedStream.writeData(encrypted);
    }

    @Override
    public String readData() {
        String data = wrappedStream.readData();
        return decrypt(data);
    }

    private String encrypt(String data) {
        System.out.println("Encrypting data");
        return data + "_encrypted";
    }

    private String decrypt(String data) {
        System.out.println("Decrypting data");
        return data.replace("_encrypted", "");
    }
}

// Test
public class DataStreamTest {
    public static void main(String[] args) {
        DataStream stream = new FileDataStream();
        stream = new CompressionDecorator(stream);
        stream = new EncryptionDecorator(stream);

        stream.writeData("Hello World");
        System.out.println("\nReading data:");
        String data = stream.readData();
        System.out.println("Final data: " + data);
    }
}
```

**Expected Output:**
```
Encrypting data
Compressing data
Writing to file: Hello World_encrypted_compressed

Reading data:
Reading from file
Decompressing data
Decrypting data
Final data: Hello World
```

### Task 4: Window System Decorators
Create decorators for window features (scrollbar, border).

```java
// Component
interface Window {
    void draw();
    String getDescription();
}

// Concrete component
class SimpleWindow implements Window {
    @Override
    public void draw() {
        System.out.println("Drawing simple window");
    }

    @Override
    public String getDescription() {
        return "Simple Window";
    }
}

// Decorator base
abstract class WindowDecorator implements Window {
    protected Window decoratedWindow;

    public WindowDecorator(Window window) {
        this.decoratedWindow = window;
    }

    @Override
    public void draw() {
        decoratedWindow.draw();
    }

    @Override
    public String getDescription() {
        return decoratedWindow.getDescription();
    }
}

// Concrete decorators
class ScrollBarDecorator extends WindowDecorator {
    public ScrollBarDecorator(Window window) {
        super(window);
    }

    @Override
    public void draw() {
        decoratedWindow.draw();
        drawScrollBar();
    }

    @Override
    public String getDescription() {
        return decoratedWindow.getDescription() + " with Scrollbar";
    }

    private void drawScrollBar() {
        System.out.println("  Adding vertical scrollbar");
    }
}

class BorderDecorator extends WindowDecorator {
    public BorderDecorator(Window window) {
        super(window);
    }

    @Override
    public void draw() {
        decoratedWindow.draw();
        drawBorder();
    }

    @Override
    public String getDescription() {
        return decoratedWindow.getDescription() + " with Border";
    }

    private void drawBorder() {
        System.out.println("  Adding decorative border");
    }
}

class TitleBarDecorator extends WindowDecorator {
    private String title;

    public TitleBarDecorator(Window window, String title) {
        super(window);
        this.title = title;
    }

    @Override
    public void draw() {
        drawTitleBar();
        decoratedWindow.draw();
    }

    @Override
    public String getDescription() {
        return decoratedWindow.getDescription() + " with Title Bar";
    }

    private void drawTitleBar() {
        System.out.println("  Drawing title bar: " + title);
    }
}

// Test
public class WindowTest {
    public static void main(String[] args) {
        Window window = new SimpleWindow();
        window = new BorderDecorator(window);
        window = new ScrollBarDecorator(window);
        window = new TitleBarDecorator(window, "My Application");

        System.out.println(window.getDescription());
        window.draw();
    }
}
```

**Expected Output:**
```
Simple Window with Border with Scrollbar with Title Bar
  Drawing title bar: My Application
Drawing simple window
  Adding decorative border
  Adding vertical scrollbar
```

### Task 5: Notification Decorators
Create decorators for different notification channels.

```java
// Component
interface Notifier {
    void send(String message);
}

// Concrete component
class BasicNotifier implements Notifier {
    @Override
    public void send(String message) {
        System.out.println("Sending basic notification: " + message);
    }
}

// Decorator base
abstract class NotifierDecorator implements Notifier {
    protected Notifier wrappedNotifier;

    public NotifierDecorator(Notifier notifier) {
        this.wrappedNotifier = notifier;
    }

    @Override
    public void send(String message) {
        wrappedNotifier.send(message);
    }
}

// Concrete decorators
class EmailNotifierDecorator extends NotifierDecorator {
    public EmailNotifierDecorator(Notifier notifier) {
        super(notifier);
    }

    @Override
    public void send(String message) {
        wrappedNotifier.send(message);
        sendEmail(message);
    }

    private void sendEmail(String message) {
        System.out.println("  Also sending email: " + message);
    }
}

class SMSNotifierDecorator extends NotifierDecorator {
    public SMSNotifierDecorator(Notifier notifier) {
        super(notifier);
    }

    @Override
    public void send(String message) {
        wrappedNotifier.send(message);
        sendSMS(message);
    }

    private void sendSMS(String message) {
        System.out.println("  Also sending SMS: " + message);
    }
}

class SlackNotifierDecorator extends NotifierDecorator {
    public SlackNotifierDecorator(Notifier notifier) {
        super(notifier);
    }

    @Override
    public void send(String message) {
        wrappedNotifier.send(message);
        sendSlack(message);
    }

    private void sendSlack(String message) {
        System.out.println("  Also sending Slack message: " + message);
    }
}

// Test
public class NotificationTest {
    public static void main(String[] args) {
        Notifier notifier = new BasicNotifier();
        notifier = new EmailNotifierDecorator(notifier);
        notifier = new SMSNotifierDecorator(notifier);
        notifier = new SlackNotifierDecorator(notifier);

        notifier.send("Server is down!");
    }
}
```

**Expected Output:**
```
Sending basic notification: Server is down!
  Also sending email: Server is down!
  Also sending SMS: Server is down!
  Also sending Slack message: Server is down!
```

### Task 6: Logging Decorator
Create decorators to add logging capabilities.

```java
// Component
interface Service {
    String execute(String input);
}

// Concrete component
class DataService implements Service {
    @Override
    public String execute(String input) {
        return "Processed: " + input;
    }
}

// Decorator base
abstract class ServiceDecorator implements Service {
    protected Service service;

    public ServiceDecorator(Service service) {
        this.service = service;
    }

    @Override
    public String execute(String input) {
        return service.execute(input);
    }
}

// Concrete decorators
class LoggingDecorator extends ServiceDecorator {
    public LoggingDecorator(Service service) {
        super(service);
    }

    @Override
    public String execute(String input) {
        System.out.println("[LOG] Executing service with input: " + input);
        long startTime = System.currentTimeMillis();

        String result = service.execute(input);

        long endTime = System.currentTimeMillis();
        System.out.println("[LOG] Execution completed in " + (endTime - startTime) + "ms");
        System.out.println("[LOG] Result: " + result);

        return result;
    }
}

class ValidationDecorator extends ServiceDecorator {
    public ValidationDecorator(Service service) {
        super(service);
    }

    @Override
    public String execute(String input) {
        System.out.println("[VALIDATION] Checking input");
        if (input == null || input.isEmpty()) {
            throw new IllegalArgumentException("Input cannot be null or empty");
        }
        System.out.println("[VALIDATION] Input is valid");
        return service.execute(input);
    }
}

class CachingDecorator extends ServiceDecorator {
    private Map<String, String> cache = new HashMap<>();

    public CachingDecorator(Service service) {
        super(service);
    }

    @Override
    public String execute(String input) {
        if (cache.containsKey(input)) {
            System.out.println("[CACHE] Returning cached result for: " + input);
            return cache.get(input);
        }

        System.out.println("[CACHE] Cache miss, executing service");
        String result = service.execute(input);
        cache.put(input, result);
        return result;
    }
}

// Test
public class ServiceTest {
    public static void main(String[] args) {
        Service service = new DataService();
        service = new ValidationDecorator(service);
        service = new CachingDecorator(service);
        service = new LoggingDecorator(service);

        System.out.println("First call:");
        service.execute("test");

        System.out.println("\nSecond call (should use cache):");
        service.execute("test");
    }
}
```

**Expected Output:**
```
First call:
[LOG] Executing service with input: test
[CACHE] Cache miss, executing service
[VALIDATION] Checking input
[VALIDATION] Input is valid
[LOG] Execution completed in Xms
[LOG] Result: Processed: test

Second call (should use cache):
[LOG] Executing service with input: test
[CACHE] Returning cached result for: test
[LOG] Execution completed in Xms
[LOG] Result: Processed: test
```

### Task 7: Car Feature Decorators
Create decorators for car features (GPS, parking sensors, etc.).

```java
// Component
interface Car {
    String getDescription();
    double getPrice();
    void assemble();
}

// Concrete component
class BasicCar implements Car {
    @Override
    public String getDescription() {
        return "Basic Car";
    }

    @Override
    public double getPrice() {
        return 15000.0;
    }

    @Override
    public void assemble() {
        System.out.println("Assembling basic car");
    }
}

// Decorator base
abstract class CarDecorator implements Car {
    protected Car decoratedCar;

    public CarDecorator(Car car) {
        this.decoratedCar = car;
    }

    @Override
    public String getDescription() {
        return decoratedCar.getDescription();
    }

    @Override
    public double getPrice() {
        return decoratedCar.getPrice();
    }

    @Override
    public void assemble() {
        decoratedCar.assemble();
    }
}

// Concrete decorators
class GPSDecorator extends CarDecorator {
    public GPSDecorator(Car car) {
        super(car);
    }

    @Override
    public String getDescription() {
        return decoratedCar.getDescription() + ", GPS Navigation";
    }

    @Override
    public double getPrice() {
        return decoratedCar.getPrice() + 500.0;
    }

    @Override
    public void assemble() {
        decoratedCar.assemble();
        System.out.println("  Installing GPS system");
    }
}

class ParkingSensorDecorator extends CarDecorator {
    public ParkingSensorDecorator(Car car) {
        super(car);
    }

    @Override
    public String getDescription() {
        return decoratedCar.getDescription() + ", Parking Sensors";
    }

    @Override
    public double getPrice() {
        return decoratedCar.getPrice() + 300.0;
    }

    @Override
    public void assemble() {
        decoratedCar.assemble();
        System.out.println("  Installing parking sensors");
    }
}

class SunroofDecorator extends CarDecorator {
    public SunroofDecorator(Car car) {
        super(car);
    }

    @Override
    public String getDescription() {
        return decoratedCar.getDescription() + ", Sunroof";
    }

    @Override
    public double getPrice() {
        return decoratedCar.getPrice() + 800.0;
    }

    @Override
    public void assemble() {
        decoratedCar.assemble();
        System.out.println("  Installing sunroof");
    }
}

// Test
public class CarTest {
    public static void main(String[] args) {
        Car car = new BasicCar();
        car = new GPSDecorator(car);
        car = new ParkingSensorDecorator(car);
        car = new SunroofDecorator(car);

        System.out.println(car.getDescription());
        System.out.println("Total Price: $" + car.getPrice());
        System.out.println("\nAssembly process:");
        car.assemble();
    }
}
```

**Expected Output:**
```
Basic Car, GPS Navigation, Parking Sensors, Sunroof
Total Price: $16600.0

Assembly process:
Assembling basic car
  Installing GPS system
  Installing parking sensors
  Installing sunroof
```

### Task 8: Report Generator Decorators
Create decorators for different report formats and features.

```java
// Component
interface Report {
    String generate();
}

// Concrete component
class SimpleReport implements Report {
    private String content;

    public SimpleReport(String content) {
        this.content = content;
    }

    @Override
    public String generate() {
        return content;
    }
}

// Decorator base
abstract class ReportDecorator implements Report {
    protected Report report;

    public ReportDecorator(Report report) {
        this.report = report;
    }

    @Override
    public String generate() {
        return report.generate();
    }
}

// Concrete decorators
class HTMLDecorator extends ReportDecorator {
    public HTMLDecorator(Report report) {
        super(report);
    }

    @Override
    public String generate() {
        return "<html><body>" + report.generate() + "</body></html>";
    }
}

class HeaderDecorator extends ReportDecorator {
    private String header;

    public HeaderDecorator(Report report, String header) {
        super(report);
        this.header = header;
    }

    @Override
    public String generate() {
        return "=== " + header + " ===\n" + report.generate();
    }
}

class FooterDecorator extends ReportDecorator {
    private String footer;

    public FooterDecorator(Report report, String footer) {
        super(report);
        this.footer = footer;
    }

    @Override
    public String generate() {
        return report.generate() + "\n--- " + footer + " ---";
    }
}

class DateStampDecorator extends ReportDecorator {
    public DateStampDecorator(Report report) {
        super(report);
    }

    @Override
    public String generate() {
        return "[Date: " + new java.util.Date() + "]\n" + report.generate();
    }
}

// Test
public class ReportTest {
    public static void main(String[] args) {
        Report report = new SimpleReport("Sales Report: $100,000");
        report = new HeaderDecorator(report, "Monthly Report");
        report = new FooterDecorator(report, "End of Report");
        report = new DateStampDecorator(report);

        System.out.println(report.generate());
    }
}
```

## Common Pitfalls

### 1. Breaking Interface Contract
```java
// ❌ Adding methods not in the interface
class BadDecorator extends Decorator {
    public void newMethod() {  // Breaks transparency
        // ...
    }
}

// ✅ Keep the same interface
class GoodDecorator extends Decorator {
    @Override
    public void method() {
        // Enhanced behavior
    }
}
```

### 2. Too Many Small Decorators
```java
// ❌ Creating too many tiny decorators
class AddOneDecorator extends Decorator { }
class AddTwoDecorator extends Decorator { }
class AddThreeDecorator extends Decorator { }

// ✅ Create configurable decorators
class AddDecorator extends Decorator {
    private int amount;
    public AddDecorator(Component c, int amount) {
        super(c);
        this.amount = amount;
    }
}
```

### 3. Order Dependency Issues
```java
// ❌ Be aware of decorator order
stream = new EncryptionDecorator(
    new CompressionDecorator(stream)
);
// Encrypts compressed data

stream = new CompressionDecorator(
    new EncryptionDecorator(stream)
);
// Compresses encrypted data (less effective!)
```

### 4. Memory Leaks with Many Layers
```java
// ❌ Creating too many wrapper layers
Component c = new ConcreteComponent();
for (int i = 0; i < 1000; i++) {
    c = new Decorator(c);  // Creates deep nesting
}

// ✅ Limit decoration depth or flatten when possible
```

## When NOT to Use Decorator

- When you need to change the core behavior (use inheritance)
- When decorator order matters but is not clear to users
- When the number of small objects becomes unwieldy
- When you need to remove decorations dynamically (complex)

## Best Practices

1. **Keep decorators focused**: Each decorator should add one responsibility
2. **Maintain interface compatibility**: Decorators must be substitutable
3. **Document decorator order**: When order matters, document it clearly
4. **Use abstract decorator class**: Provides default implementations
5. **Consider immutability**: Make decorated objects immutable when possible
6. **Provide clear names**: `LoggingDecorator`, not `Decorator1`
7. **Avoid decorator explosion**: Combine related decorations when appropriate
8. **Test combinations**: Ensure decorators work together correctly

## Real-World Examples

### Java I/O Classes
```java
InputStream in = new FileInputStream("file.txt");
in = new BufferedInputStream(in);
in = new DataInputStream(in);
```

### Java Collections
```java
List<String> list = new ArrayList<>();
list = Collections.synchronizedList(list);
list = Collections.unmodifiableList(list);
```

### Other Examples
- `java.io` package - All stream decorators
- `javax.servlet.http.HttpServletRequestWrapper`
- Spring's `BeanWrapper`
- UI frameworks - Component decorators

## Decorator vs Similar Patterns

### Decorator vs Adapter
- **Decorator**: Adds responsibilities, same interface
- **Adapter**: Converts interface to another

### Decorator vs Proxy
- **Decorator**: Adds functionality
- **Proxy**: Controls access

### Decorator vs Composite
- **Decorator**: Linear wrapping
- **Composite**: Tree structure

## Next Steps

After mastering Decorator, move on to `03-Facade` to learn about providing simplified interfaces to complex subsystems!

**Challenge**: Create a comprehensive text editor system with decorators for various features: spell checking, auto-save, syntax highlighting, line numbering, word count, and encryption. The decorators should be combinable in any order, and each should add its specific functionality without interfering with others.
