# Dependency Injection in ASP.NET Core

## Introduction

ASP.NET Core has built-in support for dependency injection (DI). DI is a design pattern for achieving Inversion of Control (IoC) between classes and their dependencies.

## Service Lifetimes

### Transient
Created each time requested
```csharp
services.AddTransient<IEmailService, EmailService>();
```

### Scoped
Created once per request
```csharp
services.AddScoped<IOrderService, OrderService>();
```

### Singleton
Created once per application lifetime
```csharp
services.AddSingleton<IConfiguration, Configuration>();
```

## Registering Services

### Program.cs (.NET 6+)
```csharp
var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddSingleton<ICacheService, CacheService>();

var app = builder.Build();
```

## Using Dependency Injection

### Constructor Injection
```csharp
public class ProductController : Controller
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductController> _logger;

    public ProductController(
        IProductService productService,
        ILogger<ProductController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    public IActionResult Index()
    {
        var products = _productService.GetAll();
        return View(products);
    }
}
```

## Service Interface and Implementation

### Define Interface
```csharp
public interface IProductService
{
    List<Product> GetAll();
    Product GetById(int id);
    void Create(Product product);
}
```

### Implement Interface
```csharp
public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public List<Product> GetAll() => _context.Products.ToList();

    public Product GetById(int id) => _context.Products.Find(id);

    public void Create(Product product)
    {
        _context.Products.Add(product);
        _context.SaveChanges();
    }
}
```

## Multiple Implementations

```csharp
services.AddTransient<INotificationService, EmailNotificationService>();
services.AddTransient<INotificationService, SmsNotificationService>();

// Inject all implementations
public class NotificationManager
{
    private readonly IEnumerable<INotificationService> _services;

    public NotificationManager(IEnumerable<INotificationService> services)
    {
        _services = services;
    }
}
```

## Practical Tasks

### Task 1: Basic DI
- Create service interface
- Implement service
- Register in DI container
- Inject into controller

### Task 2: Service Lifetimes
- Create services with different lifetimes
- Observe instance creation behavior
- Understand when to use each

### Task 3: Multiple Dependencies
- Create service with multiple dependencies
- Chain dependency injection
- Test the implementation

## Best Practices

1. Depend on abstractions (interfaces)
2. Use constructor injection
3. Choose appropriate lifetime
4. Avoid service locator pattern
5. Keep constructors simple

## Interview Questions

1. What is dependency injection?
2. Explain service lifetimes in ASP.NET Core
3. How do you register services?
4. What are the benefits of DI?

## Next Steps

- Learn configuration management
- Explore middleware pipeline
- Study Entity Framework Core
