# Introduction to Design Patterns

## What are Design Patterns?

Reusable solutions to commonly occurring problems in software design. They represent best practices evolved over time by experienced software developers.

## History

- **1994**: Gang of Four (GoF) published "Design Patterns: Elements of Reusable Object-Oriented Software"
- **23 Patterns**: Catalogued classic patterns still used today
- **Foundation**: Object-oriented design principles

## Why Use Design Patterns?

### 1. Proven Solutions
```csharp
// Without pattern: Tightly coupled code
public class OrderService
{
    private EmailNotifier _notifier = new EmailNotifier();  // ❌ Tight coupling

    public void PlaceOrder(Order order)
    {
        // Process order
        _notifier.Send("Order placed");  // Locked to email
    }
}

// With pattern (Strategy): Flexible, testable
public class OrderService
{
    private readonly INotifier _notifier;  // ✅ Dependency injection

    public OrderService(INotifier notifier)
    {
        _notifier = notifier;
    }

    public void PlaceOrder(Order order)
    {
        // Process order
        _notifier.Send("Order placed");  // Can be email, SMS, push, etc.
    }
}
```

### 2. Common Vocabulary

Instead of explaining complex architecture:
- "We're using the Observer pattern for event handling"
- "The API Gateway is implementing the Facade pattern"
- "We use Factory pattern for creating different payment processors"

### 3. Prevent Common Mistakes

```csharp
// Mistake: Multiple instances causing issues
public class Configuration
{
    public string ConnectionString { get; set; }

    public Configuration()
    {
        // Load from file every time
        ConnectionString = File.ReadAllText("config.txt");
    }
}

// Usage creates multiple instances, multiple file reads
var config1 = new Configuration();
var config2 = new Configuration();  // Reads file again!

// Solution: Singleton pattern
public class Configuration
{
    private static Configuration _instance;
    private static readonly object _lock = new object();

    public string ConnectionString { get; private set; }

    private Configuration()
    {
        ConnectionString = File.ReadAllText("config.txt");
    }

    public static Configuration Instance
    {
        get
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new Configuration();
                    }
                }
            }
            return _instance;
        }
    }
}

// Usage: Always same instance
var config1 = Configuration.Instance;
var config2 = Configuration.Instance;  // Same instance!
```

## Pattern Categories

### Creational Patterns
**Purpose**: Object creation mechanisms

| Pattern | Purpose | Use When |
|---------|---------|----------|
| Singleton | One instance globally | Logger, Config, Cache |
| Factory Method | Create objects via interface | Type unknown at compile-time |
| Abstract Factory | Create families of objects | Multiple related products |
| Builder | Construct complex objects | Many optional parameters |
| Prototype | Clone existing objects | Expensive creation |

### Structural Patterns
**Purpose**: Object composition and relationships

| Pattern | Purpose | Use When |
|---------|---------|----------|
| Adapter | Make incompatible interfaces compatible | Integrate legacy/third-party code |
| Decorator | Add behavior dynamically | Enhance object without inheritance |
| Facade | Simplify complex interfaces | Hide complexity |
| Proxy | Control access to object | Lazy loading, access control |
| Composite | Tree structures | Hierarchical data |

### Behavioral Patterns
**Purpose**: Object interaction and responsibility

| Pattern | Purpose | Use When |
|---------|---------|----------|
| Strategy | Encapsulate algorithms | Algorithm varies |
| Observer | Notify dependents | Event-driven systems |
| Command | Encapsulate requests | Undo/redo, queuing |
| Template Method | Define algorithm skeleton | Common algorithm steps |
| State | Change behavior by state | Behavior depends on state |

## Pattern Elements

Every pattern has:

1. **Name**: Common vocabulary
2. **Problem**: When to apply
3. **Solution**: Design elements
4. **Consequences**: Trade-offs

### Example: Singleton Pattern

```csharp
// Problem: Need exactly one instance
// Solution: Private constructor + static instance
// Consequences: Global state (can be anti-pattern)

public class Logger
{
    private static Logger _instance;
    private static readonly object _lock = new object();

    private Logger() { }  // Private constructor

    public static Logger Instance
    {
        get
        {
            lock (_lock)
            {
                if (_instance == null)
                {
                    _instance = new Logger();
                }
                return _instance;
            }
        }
    }

    public void Log(string message)
    {
        Console.WriteLine($"{DateTime.Now}: {message}");
    }
}

// Usage
Logger.Instance.Log("Application started");
```

## When NOT to Use Patterns

### 1. Simple Problems

```csharp
// Overkill: Factory for simple object creation
public interface IGreetingFactory
{
    string CreateGreeting();
}

public class EnglishGreetingFactory : IGreetingFactory
{
    public string CreateGreeting() => "Hello";
}

// Just use:
public string GetGreeting() => "Hello";
```

### 2. Premature Optimization

```csharp
// Don't create complex patterns before you need them
// Start simple, refactor to patterns when complexity grows

// Start with this:
public class PaymentService
{
    public void ProcessPayment(decimal amount)
    {
        // Process with credit card
    }
}

// Refactor to pattern when you need multiple payment methods:
public interface IPaymentStrategy { }
public class PaymentService
{
    private readonly IPaymentStrategy _strategy;
    // ...
}
```

## Real-World Example: E-commerce Application

```csharp
// Multiple patterns working together

// 1. Singleton: Configuration
public class AppConfig
{
    private static AppConfig _instance;
    public string DatabaseConnection { get; set; }

    private AppConfig() { }

    public static AppConfig Instance
    {
        get
        {
            if (_instance == null)
                _instance = new AppConfig();
            return _instance;
        }
    }
}

// 2. Factory: Create payment processors
public interface IPaymentProcessor
{
    void Process(decimal amount);
}

public class PaymentProcessorFactory
{
    public IPaymentProcessor Create(string paymentType)
    {
        return paymentType switch
        {
            "CreditCard" => new CreditCardProcessor(),
            "PayPal" => new PayPalProcessor(),
            "Crypto" => new CryptoProcessor(),
            _ => throw new ArgumentException("Unknown payment type")
        };
    }
}

// 3. Strategy: Shipping calculation
public interface IShippingStrategy
{
    decimal CalculateCost(Order order);
}

public class StandardShipping : IShippingStrategy
{
    public decimal CalculateCost(Order order) => 5.99m;
}

public class ExpressShipping : IShippingStrategy
{
    public decimal CalculateCost(Order order) => 15.99m;
}

// 4. Observer: Order events
public class Order
{
    private List<IOrderObserver> _observers = new();

    public void Attach(IOrderObserver observer)
    {
        _observers.Add(observer);
    }

    public void PlaceOrder()
    {
        // Process order
        NotifyObservers();
    }

    private void NotifyObservers()
    {
        foreach (var observer in _observers)
        {
            observer.Update(this);
        }
    }
}

public interface IOrderObserver
{
    void Update(Order order);
}

public class EmailNotification : IOrderObserver
{
    public void Update(Order order)
    {
        Console.WriteLine("Sending email notification");
    }
}

public class InventoryUpdate : IOrderObserver
{
    public void Update(Order order)
    {
        Console.WriteLine("Updating inventory");
    }
}

// Usage: All patterns together
var config = AppConfig.Instance;

var factory = new PaymentProcessorFactory();
var processor = factory.Create("CreditCard");

var order = new Order();
order.Attach(new EmailNotification());
order.Attach(new InventoryUpdate());

IShippingStrategy shipping = new ExpressShipping();
var shippingCost = shipping.CalculateCost(order);

order.PlaceOrder();
```

## Pattern Relationships

```
Patterns often work together:

Factory + Singleton:
- Factory creates objects
- Singleton ensures one factory instance

Strategy + Factory:
- Factory creates strategies
- Strategy encapsulates algorithms

Decorator + Composite:
- Both use recursive composition
- Decorator adds responsibilities
- Composite creates tree structures

Observer + Mediator:
- Both handle communication
- Observer: one-to-many
- Mediator: many-to-many
```

## Common Mistakes

### 1. Pattern Overuse

```csharp
// Don't turn simple code into complex pattern soup
// Bad: Unnecessary abstraction
public interface IStringConcatenator
{
    string Concatenate(string a, string b);
}

public class StringConcatenatorFactory
{
    public IStringConcatenator Create() => new DefaultStringConcatenator();
}

// Good: Just use built-in functionality
var result = string.Concat(a, b);
```

### 2. Forcing Patterns

```csharp
// Bad: Using Singleton when dependency injection is better
public class Logger
{
    private static Logger _instance;
    public static Logger Instance => _instance ??= new Logger();
}

// Better: Dependency injection
public class OrderService
{
    private readonly ILogger<OrderService> _logger;

    public OrderService(ILogger<OrderService> logger)
    {
        _logger = logger;
    }
}

// Register in DI container
services.AddSingleton<ILogger, Logger>();
```

### 3. Ignoring Modern Language Features

```csharp
// Old way: Visitor pattern for operations
public interface IVisitor
{
    void Visit(Employee emp);
    void Visit(Manager mgr);
}

// Modern way: Pattern matching (C# 8+)
public decimal CalculateSalary(Person person) => person switch
{
    Employee emp => emp.BaseSalary,
    Manager mgr => mgr.BaseSalary + mgr.Bonus,
    _ => 0
};
```

## Interview Tips

- **Know the basics**: Name, purpose, when to use
- **Explain trade-offs**: Every pattern has pros and cons
- **Real examples**: Use practical scenarios
- **Code on whiteboard**: Be ready to implement
- **Recognize overuse**: Know when NOT to use patterns
- **Combine patterns**: Show how they work together

## Best Practices

1. **Understand the problem first**: Don't apply patterns blindly
2. **Keep it simple**: Start simple, refactor to patterns
3. **Use dependency injection**: Instead of Singleton in many cases
4. **Test your patterns**: Patterns should make testing easier
5. **Document why**: Explain why you chose a pattern
6. **Learn from examples**: Study real codebases
7. **Refactor, don't predict**: Apply patterns when needed

## Key Takeaways

1. Patterns are reusable solutions to common problems
2. They provide a common vocabulary for developers
3. There are 3 categories: Creational, Structural, Behavioral
4. Don't overuse patterns - apply when they solve real problems
5. Patterns work together in real applications
6. Modern languages offer alternatives to some patterns
7. Understand trade-offs of each pattern
