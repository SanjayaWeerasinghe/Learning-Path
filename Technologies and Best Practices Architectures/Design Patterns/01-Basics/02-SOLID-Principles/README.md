# SOLID Principles

Five fundamental principles of object-oriented design that make software more maintainable, flexible, and scalable.

## S - Single Responsibility Principle (SRP)

**A class should have only one reason to change.**

### Bad Example

```csharp
// Violates SRP: Multiple responsibilities
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    // Responsibility 1: User logic
    public void UpdateEmail(string newEmail)
    {
        Email = newEmail;
    }

    // Responsibility 2: Database access
    public void Save()
    {
        using var connection = new SqlConnection("...");
        // Save to database
    }

    // Responsibility 3: Email sending
    public void SendWelcomeEmail()
    {
        var client = new SmtpClient();
        // Send email
    }

    // Responsibility 4: Validation
    public bool IsValid()
    {
        return !string.IsNullOrEmpty(Name) && Email.Contains("@");
    }
}
```

### Good Example

```csharp
// Each class has single responsibility
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

public class UserRepository
{
    public void Save(User user)
    {
        using var connection = new SqlConnection("...");
        // Save to database
    }

    public User GetById(int id)
    {
        // Get from database
        return new User();
    }
}

public class UserValidator
{
    public bool IsValid(User user)
    {
        return !string.IsNullOrEmpty(user.Name) &&
               user.Email.Contains("@");
    }
}

public class EmailService
{
    public void SendWelcomeEmail(User user)
    {
        var client = new SmtpClient();
        // Send email
    }
}

// Usage
var user = new User { Name = "John", Email = "john@example.com" };
var validator = new UserValidator();
var repository = new UserRepository();
var emailService = new EmailService();

if (validator.IsValid(user))
{
    repository.Save(user);
    emailService.SendWelcomeEmail(user);
}
```

### Benefits
- ✅ Easier to understand
- ✅ Easier to test
- ✅ Easier to maintain
- ✅ Less coupling

## O - Open/Closed Principle (OCP)

**Software entities should be open for extension but closed for modification.**

### Bad Example

```csharp
// Violates OCP: Must modify class to add new shapes
public class AreaCalculator
{
    public double CalculateArea(object shape)
    {
        if (shape is Rectangle rectangle)
        {
            return rectangle.Width * rectangle.Height;
        }
        else if (shape is Circle circle)
        {
            return Math.PI * circle.Radius * circle.Radius;
        }
        // Need to modify this method to add new shapes ❌
        else if (shape is Triangle triangle)
        {
            return 0.5 * triangle.Base * triangle.Height;
        }

        return 0;
    }
}
```

### Good Example

```csharp
// Follows OCP: Extend by adding new classes, not modifying existing
public interface IShape
{
    double CalculateArea();
}

public class Rectangle : IShape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public double CalculateArea()
    {
        return Width * Height;
    }
}

public class Circle : IShape
{
    public double Radius { get; set; }

    public double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Triangle : IShape
{
    public double Base { get; set; }
    public double Height { get; set; }

    public double CalculateArea()
    {
        return 0.5 * Base * Height;
    }
}

// Area calculator doesn't need modification
public class AreaCalculator
{
    public double CalculateArea(IShape shape)
    {
        return shape.CalculateArea();  // ✅ Works for any IShape
    }
}

// Can add new shapes without modifying existing code
public class Pentagon : IShape
{
    public double CalculateArea()
    {
        // Pentagon area calculation
        return 0;
    }
}
```

### Benefits
- ✅ Add new features without breaking existing code
- ✅ Reduce risk of introducing bugs
- ✅ Easier to extend functionality

## L - Liskov Substitution Principle (LSP)

**Objects of a superclass should be replaceable with objects of its subclasses without breaking the application.**

### Bad Example

```csharp
// Violates LSP: Ostrich can't fly, breaks contract
public class Bird
{
    public virtual void Fly()
    {
        Console.WriteLine("Flying in the sky");
    }
}

public class Sparrow : Bird
{
    public override void Fly()
    {
        Console.WriteLine("Sparrow flying");
    }
}

public class Ostrich : Bird
{
    public override void Fly()
    {
        throw new NotImplementedException("Ostrich can't fly!");  // ❌ Breaks LSP
    }
}

// This will crash for Ostrich
public void MakeBirdFly(Bird bird)
{
    bird.Fly();  // Throws exception for Ostrich
}
```

### Good Example

```csharp
// Follows LSP: Separate flying and non-flying birds
public abstract class Bird
{
    public string Name { get; set; }
}

public interface IFlyable
{
    void Fly();
}

public class Sparrow : Bird, IFlyable
{
    public void Fly()
    {
        Console.WriteLine("Sparrow flying");
    }
}

public class Eagle : Bird, IFlyable
{
    public void Fly()
    {
        Console.WriteLine("Eagle soaring");
    }
}

public class Ostrich : Bird
{
    // Ostrich doesn't implement IFlyable ✅
    public void Run()
    {
        Console.WriteLine("Ostrich running fast");
    }
}

// Only accepts flying birds
public void MakeBirdFly(IFlyable bird)
{
    bird.Fly();  // ✅ Safe, only flying birds
}

// Usage
var sparrow = new Sparrow();
var ostrich = new Ostrich();

MakeBirdFly(sparrow);  // ✅ Works
// MakeBirdFly(ostrich);  // ❌ Compile error (good!)
```

### Rectangle-Square Problem

```csharp
// Classic LSP violation
public class Rectangle
{
    public virtual int Width { get; set; }
    public virtual int Height { get; set; }

    public int CalculateArea()
    {
        return Width * Height;
    }
}

public class Square : Rectangle
{
    public override int Width
    {
        get => base.Width;
        set
        {
            base.Width = value;
            base.Height = value;  // Coupled
        }
    }

    public override int Height
    {
        get => base.Height;
        set
        {
            base.Width = value;  // Coupled
            base.Height = value;
        }
    }
}

// Breaks expectation
public void TestRectangle(Rectangle rect)
{
    rect.Width = 5;
    rect.Height = 10;
    Assert.Equal(50, rect.CalculateArea());  // ❌ Fails for Square (100 instead of 50)
}

// Better solution: Composition over inheritance
public interface IShape
{
    int CalculateArea();
}

public class Rectangle : IShape
{
    public int Width { get; set; }
    public int Height { get; set; }

    public int CalculateArea() => Width * Height;
}

public class Square : IShape
{
    public int Side { get; set; }

    public int CalculateArea() => Side * Side;
}
```

### Benefits
- ✅ Predictable behavior
- ✅ Safer inheritance
- ✅ Better polymorphism

## I - Interface Segregation Principle (ISP)

**No client should be forced to depend on methods it does not use.**

### Bad Example

```csharp
// Violates ISP: Bloated interface
public interface IWorker
{
    void Work();
    void Eat();
    void Sleep();
    void GetPaid();
}

public class HumanWorker : IWorker
{
    public void Work() { Console.WriteLine("Working"); }
    public void Eat() { Console.WriteLine("Eating lunch"); }
    public void Sleep() { Console.WriteLine("Sleeping"); }
    public void GetPaid() { Console.WriteLine("Getting paid"); }
}

public class RobotWorker : IWorker
{
    public void Work() { Console.WriteLine("Working 24/7"); }

    // ❌ Robots don't eat or sleep
    public void Eat() { throw new NotImplementedException(); }
    public void Sleep() { throw new NotImplementedException(); }

    public void GetPaid() { Console.WriteLine("Maintenance cost"); }
}
```

### Good Example

```csharp
// Follows ISP: Small, focused interfaces
public interface IWorkable
{
    void Work();
}

public interface IFeedable
{
    void Eat();
}

public interface ISleepable
{
    void Sleep();
}

public interface IPayable
{
    void GetPaid();
}

public class HumanWorker : IWorkable, IFeedable, ISleepable, IPayable
{
    public void Work() { Console.WriteLine("Working"); }
    public void Eat() { Console.WriteLine("Eating lunch"); }
    public void Sleep() { Console.WriteLine("Sleeping"); }
    public void GetPaid() { Console.WriteLine("Getting paid"); }
}

public class RobotWorker : IWorkable, IPayable
{
    public void Work() { Console.WriteLine("Working 24/7"); }
    public void GetPaid() { Console.WriteLine("Maintenance cost"); }
    // ✅ Doesn't implement IFeedable or ISleepable
}

// Client code uses only needed interfaces
public class WorkManager
{
    public void ManageWork(IWorkable worker)
    {
        worker.Work();  // ✅ Only depends on IWorkable
    }
}

public class PayrollManager
{
    public void ProcessPayroll(IPayable worker)
    {
        worker.GetPaid();  // ✅ Only depends on IPayable
    }
}
```

### Benefits
- ✅ Smaller, focused interfaces
- ✅ Less coupling
- ✅ Easier to implement

## D - Dependency Inversion Principle (DIP)

**High-level modules should not depend on low-level modules. Both should depend on abstractions.**

### Bad Example

```csharp
// Violates DIP: High-level depends on low-level
public class EmailService
{
    public void SendEmail(string to, string message)
    {
        // Send email via SMTP
        Console.WriteLine($"Email sent to {to}: {message}");
    }
}

public class Notification  // High-level
{
    private EmailService _emailService;  // ❌ Depends on concrete implementation

    public Notification()
    {
        _emailService = new EmailService();  // ❌ Tight coupling
    }

    public void Send(string to, string message)
    {
        _emailService.SendEmail(to, message);
        // Can't easily switch to SMS or Push notifications
    }
}
```

### Good Example

```csharp
// Follows DIP: Both depend on abstraction
public interface IMessageService  // Abstraction
{
    void Send(string to, string message);
}

public class EmailService : IMessageService  // Low-level
{
    public void Send(string to, string message)
    {
        Console.WriteLine($"Email sent to {to}: {message}");
    }
}

public class SmsService : IMessageService  // Low-level
{
    public void Send(string to, string message)
    {
        Console.WriteLine($"SMS sent to {to}: {message}");
    }
}

public class PushNotificationService : IMessageService  // Low-level
{
    public void Send(string to, string message)
    {
        Console.WriteLine($"Push notification sent to {to}: {message}");
    }
}

public class Notification  // High-level
{
    private readonly IMessageService _messageService;  // ✅ Depends on abstraction

    public Notification(IMessageService messageService)  // ✅ Dependency injection
    {
        _messageService = messageService;
    }

    public void Send(string to, string message)
    {
        _messageService.Send(to, message);  // ✅ Works with any IMessageService
    }
}

// Usage with dependency injection
var emailNotification = new Notification(new EmailService());
emailNotification.Send("user@example.com", "Hello via Email");

var smsNotification = new Notification(new SmsService());
smsNotification.Send("+1234567890", "Hello via SMS");

// Configure in DI container
services.AddScoped<IMessageService, EmailService>();
services.AddScoped<Notification>();
```

### Real-World Example: Data Access

```csharp
// Bad: Direct database dependency
public class OrderService
{
    private SqlConnection _connection;  // ❌ Depends on SQL Server

    public OrderService()
    {
        _connection = new SqlConnection("connection string");
    }

    public void SaveOrder(Order order)
    {
        using var command = new SqlCommand("INSERT INTO Orders...", _connection);
        // SQL-specific code
    }
}

// Good: Repository pattern with DIP
public interface IOrderRepository
{
    Task SaveAsync(Order order);
    Task<Order> GetByIdAsync(int id);
}

public class SqlOrderRepository : IOrderRepository
{
    private readonly string _connectionString;

    public SqlOrderRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task SaveAsync(Order order)
    {
        using var connection = new SqlConnection(_connectionString);
        // SQL implementation
    }

    public async Task<Order> GetByIdAsync(int id)
    {
        // SQL implementation
        return new Order();
    }
}

public class MongoOrderRepository : IOrderRepository
{
    private readonly IMongoCollection<Order> _collection;

    public MongoOrderRepository(IMongoCollection<Order> collection)
    {
        _collection = collection;
    }

    public async Task SaveAsync(Order order)
    {
        await _collection.InsertOneAsync(order);
    }

    public async Task<Order> GetByIdAsync(int id)
    {
        return await _collection.Find(o => o.Id == id).FirstOrDefaultAsync();
    }
}

public class OrderService
{
    private readonly IOrderRepository _repository;  // ✅ Depends on abstraction

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task ProcessOrder(Order order)
    {
        // Business logic
        await _repository.SaveAsync(order);
        // Can switch between SQL, Mongo, etc. without changing this code
    }
}

// DI Configuration
services.AddScoped<IOrderRepository, SqlOrderRepository>();
// Or switch to MongoDB:
// services.AddScoped<IOrderRepository, MongoOrderRepository>();
```

### Benefits
- ✅ Loose coupling
- ✅ Easy to test (mock dependencies)
- ✅ Easy to swap implementations
- ✅ Better separation of concerns

## SOLID in Action: Complete Example

```csharp
// E-commerce order processing with all SOLID principles

// S - Single Responsibility
public class Order
{
    public int Id { get; set; }
    public List<OrderItem> Items { get; set; }
    public decimal Total { get; set; }
}

// O - Open/Closed: Extensible discount strategies
public interface IDiscountStrategy
{
    decimal ApplyDiscount(decimal total);
}

public class NoDiscount : IDiscountStrategy
{
    public decimal ApplyDiscount(decimal total) => total;
}

public class PercentageDiscount : IDiscountStrategy
{
    private readonly decimal _percentage;

    public PercentageDiscount(decimal percentage)
    {
        _percentage = percentage;
    }

    public decimal ApplyDiscount(decimal total) => total * (1 - _percentage / 100);
}

public class FixedDiscount : IDiscountStrategy
{
    private readonly decimal _amount;

    public FixedDiscount(decimal amount)
    {
        _amount = amount;
    }

    public decimal ApplyDiscount(decimal total) => total - _amount;
}

// I - Interface Segregation: Focused interfaces
public interface IOrderRepository
{
    Task SaveAsync(Order order);
    Task<Order> GetByIdAsync(int id);
}

public interface INotificationService
{
    Task NotifyAsync(string recipient, string message);
}

public interface IPaymentService
{
    Task<bool> ProcessPaymentAsync(decimal amount);
}

// D - Dependency Inversion: Depend on abstractions
public class OrderService
{
    private readonly IOrderRepository _repository;
    private readonly INotificationService _notificationService;
    private readonly IPaymentService _paymentService;
    private readonly IDiscountStrategy _discountStrategy;

    public OrderService(
        IOrderRepository repository,
        INotificationService notificationService,
        IPaymentService paymentService,
        IDiscountStrategy discountStrategy)
    {
        _repository = repository;
        _notificationService = notificationService;
        _paymentService = paymentService;
        _discountStrategy = discountStrategy;
    }

    public async Task<bool> ProcessOrderAsync(Order order)
    {
        // Apply discount
        order.Total = _discountStrategy.ApplyDiscount(order.Total);

        // Process payment
        var paymentSuccess = await _paymentService.ProcessPaymentAsync(order.Total);

        if (!paymentSuccess)
            return false;

        // Save order
        await _repository.SaveAsync(order);

        // Notify customer
        await _notificationService.NotifyAsync("customer@example.com", "Order confirmed");

        return true;
    }
}

// L - Liskov Substitution: Implementations are interchangeable
public class EmailNotificationService : INotificationService
{
    public Task NotifyAsync(string recipient, string message)
    {
        Console.WriteLine($"Email to {recipient}: {message}");
        return Task.CompletedTask;
    }
}

public class SmsNotificationService : INotificationService
{
    public Task NotifyAsync(string recipient, string message)
    {
        Console.WriteLine($"SMS to {recipient}: {message}");
        return Task.CompletedTask;
    }
}

// Configure dependencies
services.AddScoped<IOrderRepository, SqlOrderRepository>();
services.AddScoped<INotificationService, EmailNotificationService>();
services.AddScoped<IPaymentService, StripePaymentService>();
services.AddScoped<IDiscountStrategy, PercentageDiscount>(_ => new PercentageDiscount(10));
services.AddScoped<OrderService>();
```

## Interview Tips

### Common Questions

1. **"Explain SOLID principles"**
   - Know all 5, with examples
   - Explain benefits of each

2. **"Why is SRP important?"**
   - Easier to test, maintain, understand
   - Changes isolated to single class

3. **"What's the difference between OCP and DIP?"**
   - OCP: Design for extension without modification
   - DIP: Depend on abstractions, not concretions

4. **"Give example of LSP violation"**
   - Rectangle-Square problem
   - Bird-Ostrich problem

5. **"How does ISP improve design?"**
   - Smaller interfaces, less coupling
   - Clients depend only on what they need

### Quick Reference

| Principle | Question to Ask |
|-----------|----------------|
| SRP | Does this class have more than one reason to change? |
| OCP | Can I add new features without modifying existing code? |
| LSP | Can I substitute derived classes without breaking code? |
| ISP | Am I forcing clients to implement unused methods? |
| DIP | Am I depending on abstractions or concrete classes? |

## Best Practices

1. **Start with SRP**: Foundation for other principles
2. **Use dependency injection**: Enables DIP naturally
3. **Prefer composition over inheritance**: Helps LSP and OCP
4. **Keep interfaces small**: Follow ISP
5. **Refactor gradually**: Don't rewrite everything at once
6. **Balance pragmatism**: SOLID is a guide, not dogma
7. **Write tests**: SOLID code is testable code

## Key Takeaways

1. **S**ingle Responsibility: One class, one purpose
2. **O**pen/Closed: Open for extension, closed for modification
3. **L**iskov Substitution: Subtypes must be substitutable
4. **I**nterface Segregation: Many small interfaces better than one large
5. **D**ependency Inversion: Depend on abstractions, not concretions
6. SOLID principles work together
7. Apply principles to solve problems, not for their own sake
8. Testability is a good indicator of SOLID compliance
