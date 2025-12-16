# REST vs Microservices

## Understanding the Difference

**REST (Representational State Transfer)**: An architectural style for designing APIs
**Microservices**: An architectural style for designing entire systems

They are **not mutually exclusive** - microservices often use REST for communication!

## REST API

### What is REST?

Architectural constraints for web services:
1. **Client-Server**: Separation of concerns
2. **Stateless**: Each request contains all information needed
3. **Cacheable**: Responses explicitly indicate cacheability
4. **Uniform Interface**: Standard HTTP methods
5. **Layered System**: Client can't tell if connected directly to server
6. **Code on Demand** (optional): Server can send executable code

### REST Example (C#)

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        return Ok(await _productService.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        var created = await _productService.CreateAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(int id, Product product)
    {
        if (id != product.Id) return BadRequest();
        await _productService.UpdateAsync(product);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _productService.DeleteAsync(id);
        return NoContent();
    }
}
```

### HTTP Methods & Status Codes

```
GET    /api/products        → 200 OK (list)
GET    /api/products/1      → 200 OK (single) or 404 Not Found
POST   /api/products        → 201 Created
PUT    /api/products/1      → 200 OK or 204 No Content
PATCH  /api/products/1      → 200 OK or 204 No Content
DELETE /api/products/1      → 204 No Content or 200 OK
```

## Microservices

### What are Microservices?

An architectural approach where application is composed of small, independent services.

**Key Characteristics:**
- Each service is a separate deployable unit
- Services communicate via APIs (often REST)
- Each service has its own database
- Services can use different technologies

### Microservices Example

```csharp
// Product Service (separate project/container)
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductDbContext _context;

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }
}

// Order Service (separate project/container)
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrderDbContext _context;
    private readonly IProductServiceClient _productClient;

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderRequest request)
    {
        // Inter-service communication via REST
        var product = await _productClient.GetProductAsync(request.ProductId);

        if (product == null)
            return BadRequest("Product not found");

        var order = new Order
        {
            ProductId = request.ProductId,
            Quantity = request.Quantity,
            TotalPrice = product.Price * request.Quantity
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();
        return order;
    }
}

// Product Service Client (using HttpClient)
public class ProductServiceClient : IProductServiceClient
{
    private readonly HttpClient _httpClient;

    public ProductServiceClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("http://product-service");
    }

    public async Task<Product> GetProductAsync(int id)
    {
        var response = await _httpClient.GetAsync($"/api/products/{id}");

        if (!response.IsSuccessStatusCode)
            return null;

        return await response.Content.ReadFromJsonAsync<Product>();
    }
}
```

## Key Differences

| Aspect | REST API | Microservices |
|--------|----------|---------------|
| **Scope** | API design | System architecture |
| **What it defines** | How to expose endpoints | How to structure entire application |
| **Deployment** | Single application | Multiple independent services |
| **Database** | Often shared | Database per service |
| **Communication** | HTTP methods | Various (REST, gRPC, messaging) |
| **Scaling** | Scale entire API | Scale individual services |
| **Technology** | Single stack | Polyglot (multiple languages/frameworks) |

## Communication Patterns in Microservices

### 1. Synchronous REST (HTTP)

```csharp
public class OrderService
{
    private readonly HttpClient _productClient;
    private readonly HttpClient _userClient;

    public async Task<OrderDetails> GetOrderDetails(int orderId)
    {
        var order = await _orderRepository.GetAsync(orderId);

        // Synchronous calls to other services
        var product = await _productClient.GetFromJsonAsync<Product>(
            $"http://product-service/api/products/{order.ProductId}");

        var user = await _userClient.GetFromJsonAsync<User>(
            $"http://user-service/api/users/{order.UserId}");

        return new OrderDetails
        {
            Order = order,
            Product = product,
            User = user
        };
    }
}
```

**Pros:**
- Simple to implement
- Easy to understand
- Immediate response

**Cons:**
- Tight coupling
- Chain of failures (if one service down, all fail)
- Increased latency

### 2. Asynchronous Messaging

```csharp
// Order Service publishes event
public class OrderService
{
    private readonly IEventBus _eventBus;

    public async Task CreateOrder(CreateOrderRequest request)
    {
        var order = new Order { ... };
        await _orderRepository.SaveAsync(order);

        // Publish event (fire and forget)
        await _eventBus.PublishAsync(new OrderCreatedEvent
        {
            OrderId = order.Id,
            ProductId = request.ProductId,
            UserId = request.UserId
        });
    }
}

// Inventory Service listens for event
public class InventoryEventHandler
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        await _inventoryService.ReserveStockAsync(@event.ProductId);
    }
}

// Notification Service listens for event
public class NotificationEventHandler
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        await _emailService.SendOrderConfirmationAsync(@event.UserId, @event.OrderId);
    }
}
```

**Pros:**
- Loose coupling
- Better fault tolerance
- Can process asynchronously

**Cons:**
- More complex
- Eventual consistency
- Debugging is harder

### 3. gRPC (Alternative to REST)

```csharp
// product.proto
syntax = "proto3";

service ProductService {
  rpc GetProduct (ProductRequest) returns (ProductResponse);
}

message ProductRequest {
  int32 id = 1;
}

message ProductResponse {
  int32 id = 1;
  string name = 2;
  double price = 3;
}

// Generated C# code
public class ProductServiceImpl : ProductService.ProductServiceBase
{
    public override async Task<ProductResponse> GetProduct(
        ProductRequest request,
        ServerCallContext context)
    {
        var product = await _repository.GetAsync(request.Id);

        return new ProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price
        };
    }
}

// Client usage
public class OrderService
{
    private readonly ProductService.ProductServiceClient _client;

    public async Task<Product> GetProduct(int id)
    {
        var response = await _client.GetProductAsync(new ProductRequest { Id = id });

        return new Product
        {
            Id = response.Id,
            Name = response.Name,
            Price = response.Price
        };
    }
}
```

## REST in Microservices Context

### Best Practices

#### 1. Versioning
```csharp
[ApiController]
[Route("api/v1/[controller]")]
public class ProductsV1Controller : ControllerBase { }

[ApiController]
[Route("api/v2/[controller]")]
public class ProductsV2Controller : ControllerBase { }
```

#### 2. Health Checks
```csharp
// Program.cs
builder.Services.AddHealthChecks()
    .AddDbContextCheck<ProductDbContext>();

app.MapHealthChecks("/health");

// Advanced health check
public class ProductServiceHealthCheck : IHealthCheck
{
    private readonly ProductDbContext _context;

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await _context.Database.CanConnectAsync(cancellationToken);
            return HealthCheckResult.Healthy("Database is accessible");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Database is not accessible", ex);
        }
    }
}
```

#### 3. Resilience Patterns (Polly)
```csharp
// Retry + Circuit Breaker
builder.Services.AddHttpClient<IProductServiceClient, ProductServiceClient>()
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)))
    .AddTransientHttpErrorPolicy(p => p.CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));
```

#### 4. Request/Response DTOs
```csharp
// Don't expose domain entities directly
public class ProductResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

public class CreateProductRequest
{
    [Required]
    public string Name { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal Price { get; set; }
}

[HttpPost]
public async Task<ActionResult<ProductResponse>> Create(CreateProductRequest request)
{
    var product = _mapper.Map<Product>(request);
    await _productService.CreateAsync(product);

    var response = _mapper.Map<ProductResponse>(product);
    return CreatedAtAction(nameof(GetById), new { id = product.Id }, response);
}
```

#### 5. HATEOAS (Hypermedia)
```csharp
public class ProductResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public List<Link> Links { get; set; }
}

public class Link
{
    public string Href { get; set; }
    public string Rel { get; set; }
    public string Method { get; set; }
}

[HttpGet("{id}")]
public async Task<ActionResult<ProductResponse>> GetById(int id)
{
    var product = await _productService.GetByIdAsync(id);

    var response = _mapper.Map<ProductResponse>(product);
    response.Links = new List<Link>
    {
        new Link { Href = $"/api/products/{id}", Rel = "self", Method = "GET" },
        new Link { Href = $"/api/products/{id}", Rel = "update", Method = "PUT" },
        new Link { Href = $"/api/products/{id}", Rel = "delete", Method = "DELETE" }
    };

    return Ok(response);
}
```

## When to Use What?

### Use REST for:
✅ Public APIs
✅ Simple request/response
✅ Wide compatibility needed
✅ Human-readable format preferred

### Use gRPC for:
✅ Internal microservice communication
✅ High performance needed
✅ Strongly-typed contracts
✅ Bi-directional streaming

### Use Messaging for:
✅ Asynchronous processing
✅ Event-driven architecture
✅ Loose coupling required
✅ Handling spikes in traffic

## REST API Design for Microservices

```csharp
// Good: Resource-based URLs
GET    /api/products
POST   /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}

// Good: Nested resources
GET    /api/products/{id}/reviews
POST   /api/products/{id}/reviews

// Bad: Verb-based URLs (not RESTful)
GET    /api/getProducts
POST   /api/createProduct
POST   /api/updateProduct

// Query parameters for filtering/sorting
GET    /api/products?category=electronics&sort=price&order=asc
```

## Interview Tips

- REST is about API design; microservices is about system architecture
- Microservices can use REST, gRPC, or messaging
- Understand trade-offs: REST (simple) vs gRPC (performant) vs Messaging (async)
- Know when to use synchronous vs asynchronous communication
- Explain resilience patterns (retry, circuit breaker, timeout)
- Discuss API versioning strategies
- Understand service contracts and backward compatibility

## Key Takeaways

1. REST and microservices are complementary, not competing
2. Most microservices use REST for external APIs
3. Internal communication can use gRPC or messaging for better performance
4. Always implement resilience patterns
5. Version your APIs from the start
6. Health checks are critical for microservices
7. Use DTOs to decouple API from internal models

## Practice Exercise

Design a microservices system with:
- Product Service (REST API)
- Order Service (REST API)
- Notification Service (event-driven)
- Payment Service (synchronous communication)

Implement:
- REST endpoints for Product and Order
- gRPC for Order → Product communication
- Events for Order → Notification
- Resilience patterns (Polly)
