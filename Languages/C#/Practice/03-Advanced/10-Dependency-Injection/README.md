# Dependency Injection in C#

## Introduction

Dependency Injection (DI) is a design pattern that implements Inversion of Control (IoC) for resolving dependencies. It promotes loose coupling, testability, and maintainability in applications.

## What is Dependency Injection?

DI is a technique where an object receives its dependencies from external sources rather than creating them itself.

## Key Concepts

### Types of Dependency Injection

**Constructor Injection**
```csharp
public class OrderService
{
    private readonly IRepository _repository;

    public OrderService(IRepository repository)
    {
        _repository = repository;
    }
}
```

**Property Injection**
```csharp
public class OrderService
{
    public IRepository Repository { get; set; }
}
```

**Method Injection**
```csharp
public void ProcessOrder(Order order, IRepository repository)
{
    repository.Save(order);
}
```

### Service Lifetimes

- **Transient** - Created each time requested
- **Scoped** - Created once per request/scope
- **Singleton** - Created once for application lifetime

## Built-in DI Container in .NET

### Registering Services
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddTransient<IEmailService, EmailService>();
    services.AddScoped<IOrderService, OrderService>();
    services.AddSingleton<IConfiguration, Configuration>();
}
```

### Resolving Dependencies
```csharp
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }
}
```

## Benefits

1. Loose Coupling
2. Testability
3. Maintainability
4. Flexibility
5. Single Responsibility

## Best Practices

- Prefer constructor injection
- Depend on abstractions (interfaces)
- Keep constructors simple
- Use appropriate service lifetimes
- Avoid circular dependencies

## Practical Tasks

### Task 1: Basic DI Setup
Create an application with INotificationService interface and multiple implementations.

### Task 2: Service Lifetimes
Create services with different lifetimes and observe behavior.

### Task 3: Testing with DI
Write unit tests using mock dependencies.

## Interview Questions

1. What is Dependency Injection?
2. Explain service lifetimes in .NET
3. How does DI improve testability?
4. What is Inversion of Control?
