# Microservices Architecture Patterns

## Core Patterns

### 1. API Gateway Pattern

**Problem**: Clients need to call multiple services, leading to:
- Multiple round trips
- Complex client logic
- Different protocols

**Solution**: Single entry point that routes requests to appropriate services.

```
┌─────────┐
│ Client  │
└────┬────┘
     │
┌────▼──────────┐
│  API Gateway  │
└──┬──┬──┬──┬──┘
   │  │  │  │
   ▼  ▼  ▼  ▼
  S1 S2 S3 S4  (Services)
```

**C# Implementation (Ocelot)**
```json
// ocelot.json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [
        { "Host": "product-service", "Port": 80 }
      ],
      "UpstreamPathTemplate": "/products/{everything}",
      "UpstreamHttpMethod": [ "GET", "POST", "PUT", "DELETE" ]
    },
    {
      "DownstreamPathTemplate": "/api/orders/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [
        { "Host": "order-service", "Port": 80 }
      ],
      "UpstreamPathTemplate": "/orders/{everything}",
      "UpstreamHttpMethod": [ "GET", "POST", "PUT", "DELETE" ]
    }
  ]
}
```

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);
builder.Services.AddOcelot();

var app = builder.Build();
await app.UseOcelot();
app.Run();
```

**Benefits:**
- Single entry point
- Authentication/authorization centralized
- Rate limiting, caching
- Protocol translation

**Drawbacks:**
- Single point of failure (mitigate with multiple instances)
- Can become bottleneck

### 2. Backend for Frontend (BFF)

**Problem**: Different clients (web, mobile, IoT) have different needs.

**Solution**: Create separate API gateways for each client type.

```
┌──────┐  ┌──────┐  ┌──────┐
│ Web  │  │Mobile│  │ IoT  │
└──┬───┘  └──┬───┘  └──┬───┘
   │         │         │
┌──▼───┐ ┌──▼───┐ ┌──▼───┐
│ BFF  │ │ BFF  │ │ BFF  │
│ Web  │ │Mobile│ │ IoT  │
└──┬───┘ └──┬───┘ └──┬───┘
   └─────┬──┴────┬────┘
         │       │
    ┌────▼───┬───▼────┐
    │Services│Services│
    └────────┴────────┘
```

```csharp
// WebBFF/Controllers/DashboardController.cs
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IOrderService _orderService;
    private readonly IUserService _userService;

    [HttpGet]
    public async Task<ActionResult<WebDashboard>> GetDashboard()
    {
        // Aggregate data from multiple services for web client
        var products = await _productService.GetFeaturedProductsAsync();
        var recentOrders = await _orderService.GetRecentOrdersAsync();
        var userProfile = await _userService.GetCurrentUserAsync();

        return new WebDashboard
        {
            Products = products,
            Orders = recentOrders,
            User = userProfile,
            RecommendedProducts = await _productService.GetRecommendationsAsync()
        };
    }
}

// MobileBFF/Controllers/DashboardController.cs
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<MobileDashboard>> GetDashboard()
    {
        // Lighter payload for mobile
        return new MobileDashboard
        {
            TopProducts = await _productService.GetTopProductsAsync(limit: 5),
            OrderCount = await _orderService.GetOrderCountAsync(),
            UserName = await _userService.GetUserNameAsync()
        };
    }
}
```

### 3. Service Registry & Discovery

**Problem**: Services need to find each other dynamically (IPs change in cloud).

**Solution**: Central registry where services register and discover others.

```
┌──────────────┐
│   Service    │
│   Registry   │
│  (Consul)    │
└──────┬───────┘
       │
   Register & Discover
       │
┌──────┴───────┬─────────┐
│  Service A   │Service B│
└──────────────┴─────────┘
```

**Using Consul**
```csharp
// Service Registration
public class ConsulServiceRegistration : IHostedService
{
    private readonly IConsulClient _consulClient;
    private readonly IConfiguration _configuration;
    private string _registrationId;

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var serviceName = _configuration["ServiceName"];
        var serviceId = $"{serviceName}-{Guid.NewGuid()}";

        var registration = new AgentServiceRegistration
        {
            ID = serviceId,
            Name = serviceName,
            Address = _configuration["ServiceHost"],
            Port = int.Parse(_configuration["ServicePort"]),
            Check = new AgentServiceCheck
            {
                HTTP = $"http://{_configuration["ServiceHost"]}:{_configuration["ServicePort"]}/health",
                Interval = TimeSpan.FromSeconds(10),
                Timeout = TimeSpan.FromSeconds(5)
            }
        };

        await _consulClient.Agent.ServiceRegister(registration, cancellationToken);
        _registrationId = serviceId;
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await _consulClient.Agent.ServiceDeregister(_registrationId, cancellationToken);
    }
}

// Service Discovery
public class ProductServiceClient
{
    private readonly IConsulClient _consulClient;
    private readonly HttpClient _httpClient;

    public async Task<Product> GetProductAsync(int id)
    {
        // Discover service
        var services = await _consulClient.Health.Service("product-service", "", true);
        var service = services.Response.FirstOrDefault();

        if (service == null)
            throw new Exception("Product service not available");

        var serviceUri = $"http://{service.Service.Address}:{service.Service.Port}";
        var response = await _httpClient.GetAsync($"{serviceUri}/api/products/{id}");

        return await response.Content.ReadFromJsonAsync<Product>();
    }
}
```

### 4. Database per Service

**Problem**: Shared database creates tight coupling.

**Solution**: Each service has its own database.

```
Service A  →  Database A
Service B  →  Database B
Service C  →  Database C
```

```csharp
// Product Service
public class ProductDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=product-db;Database=ProductDB");
    }
}

// Order Service
public class OrderDbContext : DbContext
{
    public DbSet<Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql("Host=order-db;Database=OrderDB");
    }
}
```

**Benefits:**
- Loose coupling
- Independent scaling
- Technology diversity

**Challenges:**
- No ACID transactions across services
- Data consistency (use Saga pattern)

### 5. Saga Pattern

**Problem**: Distributed transactions across services.

**Solution**: Sequence of local transactions with compensating transactions on failure.

#### Choreography-based Saga
```csharp
// Order Service creates order
public class OrderService
{
    private readonly IEventBus _eventBus;

    public async Task<Order> CreateOrder(CreateOrderRequest request)
    {
        var order = new Order { Status = OrderStatus.Pending };
        await _orderRepository.SaveAsync(order);

        // Publish event
        await _eventBus.PublishAsync(new OrderCreatedEvent
        {
            OrderId = order.Id,
            ProductId = request.ProductId,
            Amount = request.Amount
        });

        return order;
    }
}

// Payment Service listens and processes payment
public class PaymentEventHandler
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        var result = await ProcessPaymentAsync(@event.Amount);

        if (result.Success)
        {
            await _eventBus.PublishAsync(new PaymentCompletedEvent
            {
                OrderId = @event.OrderId
            });
        }
        else
        {
            await _eventBus.PublishAsync(new PaymentFailedEvent
            {
                OrderId = @event.OrderId
            });
        }
    }
}

// Order Service listens for completion/failure
public class OrderEventHandler
{
    public async Task Handle(PaymentCompletedEvent @event)
    {
        await _orderRepository.UpdateStatusAsync(@event.OrderId, OrderStatus.Confirmed);
    }

    public async Task Handle(PaymentFailedEvent @event)
    {
        // Compensating transaction
        await _orderRepository.UpdateStatusAsync(@event.OrderId, OrderStatus.Cancelled);
    }
}
```

#### Orchestration-based Saga
```csharp
public class OrderSagaOrchestrator
{
    private readonly IOrderService _orderService;
    private readonly IPaymentService _paymentService;
    private readonly IInventoryService _inventoryService;

    public async Task<SagaResult> ExecuteOrderSaga(CreateOrderRequest request)
    {
        Order order = null;
        Payment payment = null;
        Reservation reservation = null;

        try
        {
            // Step 1: Create order
            order = await _orderService.CreateOrderAsync(request);

            // Step 2: Reserve inventory
            reservation = await _inventoryService.ReserveAsync(request.ProductId, request.Quantity);

            // Step 3: Process payment
            payment = await _paymentService.ProcessAsync(order.Id, request.Amount);

            // All succeeded
            await _orderService.ConfirmOrderAsync(order.Id);
            return SagaResult.Success(order.Id);
        }
        catch (Exception ex)
        {
            // Compensate in reverse order
            if (payment != null)
                await _paymentService.RefundAsync(payment.Id);

            if (reservation != null)
                await _inventoryService.ReleaseAsync(reservation.Id);

            if (order != null)
                await _orderService.CancelOrderAsync(order.Id);

            return SagaResult.Failed(ex.Message);
        }
    }
}
```

### 6. CQRS (Command Query Responsibility Segregation)

**Problem**: Different requirements for read and write operations.

**Solution**: Separate models for reads and writes.

```
      Commands              Queries
         │                     │
         ▼                     ▼
   ┌──────────┐          ┌─────────┐
   │  Write   │─────────▶│  Read   │
   │  Model   │  Events  │  Model  │
   │ (SQL DB) │          │ (NoSQL) │
   └──────────┘          └─────────┘
```

```csharp
// Command Model
public class CreateOrderCommand
{
    public int UserId { get; set; }
    public List<OrderItem> Items { get; set; }
}

public class CreateOrderCommandHandler
{
    private readonly OrderDbContext _context;
    private readonly IEventBus _eventBus;

    public async Task<int> Handle(CreateOrderCommand command)
    {
        var order = new Order
        {
            UserId = command.UserId,
            Items = command.Items,
            CreatedDate = DateTime.UtcNow
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Publish event for read model
        await _eventBus.PublishAsync(new OrderCreatedEvent
        {
            OrderId = order.Id,
            UserId = order.UserId,
            TotalAmount = order.TotalAmount
        });

        return order.Id;
    }
}

// Query Model (separate database, optimized for reads)
public class OrderQueryHandler
{
    private readonly IMongoDatabase _database;

    public async Task<OrderSummary> GetOrderSummary(int orderId)
    {
        var collection = _database.GetCollection<OrderSummary>("OrderSummaries");
        return await collection.Find(o => o.OrderId == orderId).FirstOrDefaultAsync();
    }
}

// Event Handler updates read model
public class OrderCreatedEventHandler
{
    private readonly IMongoDatabase _database;

    public async Task Handle(OrderCreatedEvent @event)
    {
        var collection = _database.GetCollection<OrderSummary>("OrderSummaries");

        var summary = new OrderSummary
        {
            OrderId = @event.OrderId,
            UserId = @event.UserId,
            TotalAmount = @event.TotalAmount,
            Status = "Created"
        };

        await collection.InsertOneAsync(summary);
    }
}
```

### 7. Event Sourcing

**Problem**: Track all changes to application state.

**Solution**: Store events instead of current state.

```csharp
// Event Store
public class OrderEvent
{
    public Guid Id { get; set; }
    public int OrderId { get; set; }
    public string EventType { get; set; }
    public string Data { get; set; }
    public DateTime Timestamp { get; set; }
}

// Events
public class OrderCreatedEvent
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
}

public class OrderItemAddedEvent
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class OrderConfirmedEvent
{
    public int OrderId { get; set; }
}

// Aggregate
public class Order
{
    public int Id { get; private set; }
    public List<OrderItem> Items { get; private set; } = new();
    public OrderStatus Status { get; private set; }

    // Apply events to rebuild state
    public void Apply(OrderCreatedEvent @event)
    {
        Id = @event.OrderId;
        Status = OrderStatus.Created;
    }

    public void Apply(OrderItemAddedEvent @event)
    {
        Items.Add(new OrderItem
        {
            ProductId = @event.ProductId,
            Quantity = @event.Quantity
        });
    }

    public void Apply(OrderConfirmedEvent @event)
    {
        Status = OrderStatus.Confirmed;
    }

    // Rebuild from events
    public static Order FromEvents(IEnumerable<object> events)
    {
        var order = new Order();
        foreach (var @event in events)
        {
            ((dynamic)order).Apply((dynamic)@event);
        }
        return order;
    }
}
```

## Comparison Table

| Pattern | Use Case | Complexity | Benefits |
|---------|----------|------------|----------|
| API Gateway | Single entry point | Low | Simplified client, centralized auth |
| BFF | Different client needs | Medium | Optimized per client type |
| Service Registry | Dynamic service discovery | Medium | Flexible, cloud-ready |
| Database per Service | Data isolation | Low | Independence, scalability |
| Saga | Distributed transactions | High | Data consistency across services |
| CQRS | Different read/write needs | Medium | Performance, scalability |
| Event Sourcing | Audit trail, event replay | High | Complete history, debugging |

## Interview Tips

- Understand trade-offs of each pattern
- Know when to apply each pattern
- Explain how patterns work together (e.g., CQRS + Event Sourcing)
- Discuss implementation challenges
- Be familiar with tools (Consul, Ocelot, RabbitMQ)

## Key Takeaways

1. No single pattern solves all problems
2. Patterns often used in combination
3. Start simple, add complexity as needed
4. Consider team expertise and operational capability
5. Each pattern has trade-offs

## Practice Exercise

Design a simple e-commerce system using:
- API Gateway for client access
- Database per service
- Saga pattern for order processing
- Service discovery for dynamic scaling
