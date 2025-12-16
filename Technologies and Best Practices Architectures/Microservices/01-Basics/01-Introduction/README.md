# Introduction to Microservices

## What are Microservices?

An architectural style that structures an application as a **collection of small, independent services** that:
- Are organized around business capabilities
- Can be deployed independently
- Communicate via lightweight protocols (HTTP, messaging)
- Are owned by small teams
- Use different technologies/languages

## Monolithic vs Microservices

### Monolithic Architecture
```
┌─────────────────────────────┐
│     Single Application      │
│                             │
│  ┌─────────────────────┐   │
│  │   User Interface    │   │
│  ├─────────────────────┤   │
│  │  Business Logic     │   │
│  ├─────────────────────┤   │
│  │   Data Access       │   │
│  └─────────────────────┘   │
│           ↓                 │
│  ┌─────────────────────┐   │
│  │     Database        │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
```

**Pros:**
- Simple to develop initially
- Easy to test (single application)
- Simple deployment (one package)
- Easy to scale horizontally (replicate entire app)

**Cons:**
- Large codebase becomes hard to maintain
- Slow development and deployment cycles
- Must redeploy entire app for small changes
- Difficult to scale specific components
- Technology lock-in
- Long startup time

### Microservices Architecture
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  User    │  │ Product  │  │  Order   │
│ Service  │  │ Service  │  │ Service  │
│   API    │  │   API    │  │   API    │
└────┬─────┘  └────┬─────┘  └────┬─────┘
     │             │             │
┌────▼─────┐  ┌───▼──────┐  ┌───▼──────┐
│  User    │  │ Product  │  │  Order   │
│   DB     │  │   DB     │  │   DB     │
└──────────┘  └──────────┘  └──────────┘
```

**Pros:**
- Independent deployment and scaling
- Technology diversity (best tool for each job)
- Fault isolation (one service failure doesn't crash all)
- Small, focused teams
- Easier to understand and maintain small services
- Faster development cycles

**Cons:**
- Distributed system complexity
- Network latency and failures
- Data consistency challenges
- More difficult testing (integration)
- Operational overhead (deployment, monitoring)
- Complex inter-service communication

## When to Use Microservices?

### Good Fit ✅
- Large, complex applications
- Multiple teams working independently
- Need to scale different components differently
- Rapid deployment requirements
- Different parts use different technologies
- Long-term projects with evolving requirements

### Not a Good Fit ❌
- Small applications
- Single team or startup (start with monolith)
- Tight coupling between components
- Simple CRUD applications
- Limited operational capabilities
- When network latency is critical

## Key Characteristics

### 1. Componentization via Services
```csharp
// Each service is a separate component
public class OrderService
{
    private readonly IProductService _productService;
    private readonly IUserService _userService;

    // Services communicate via APIs, not in-process calls
    public async Task<Order> CreateOrder(OrderRequest request)
    {
        var user = await _userService.GetUserAsync(request.UserId);
        var products = await _productService.GetProductsAsync(request.ProductIds);

        // Business logic
        return new Order { ... };
    }
}
```

### 2. Organized Around Business Capabilities
```
❌ Technical Layers:
- UI Layer
- Business Layer
- Data Layer

✅ Business Capabilities:
- User Management Service
- Product Catalog Service
- Order Management Service
- Payment Service
- Notification Service
```

### 3. Decentralized Data Management
```csharp
// Each service owns its data
public class UserService
{
    private readonly UserDbContext _userDb; // User service DB
}

public class OrderService
{
    private readonly OrderDbContext _orderDb; // Order service DB
}

// No shared database between services
```

### 4. Smart Endpoints, Dumb Pipes
```csharp
// Simple HTTP/REST communication
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _productService.GetByIdAsync(id);
        return Ok(product);
    }
}

// Or simple messaging
public class OrderCreatedHandler
{
    public async Task Handle(OrderCreatedEvent @event)
    {
        // Handle event
    }
}
```

## Simple Microservices Example (C#)

### Product Service
```csharp
// Product.API/Program.cs
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<ProductDbContext>();

var app = builder.Build();
app.MapControllers();
app.Run();

// Product.API/Controllers/ProductsController.cs
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductDbContext _context;

    public ProductsController(ProductDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
    {
        return await _context.Products.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }
}
```

### Order Service
```csharp
// Order.API/Controllers/OrdersController.cs
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrderDbContext _context;
    private readonly HttpClient _httpClient;

    public OrdersController(OrderDbContext context, IHttpClientFactory httpClientFactory)
    {
        _context = context;
        _httpClient = httpClientFactory.CreateClient();
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderRequest request)
    {
        // Call Product Service to verify products exist
        var productResponse = await _httpClient.GetAsync(
            $"http://product-service/api/products/{request.ProductId}");

        if (!productResponse.IsSuccessStatusCode)
            return BadRequest("Product not found");

        var order = new Order
        {
            ProductId = request.ProductId,
            Quantity = request.Quantity,
            CreatedDate = DateTime.UtcNow
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetById(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();
        return order;
    }
}
```

## Docker Configuration

### Product Service Dockerfile
```dockerfile
# Product.API/Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Product.API/Product.API.csproj", "Product.API/"]
RUN dotnet restore "Product.API/Product.API.csproj"
COPY . .
WORKDIR "/src/Product.API"
RUN dotnet build "Product.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Product.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Product.API.dll"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  product-service:
    build:
      context: .
      dockerfile: Product.API/Dockerfile
    ports:
      - "5001:80"
    environment:
      - ConnectionStrings__DefaultConnection=Server=product-db;Database=ProductDB;
    depends_on:
      - product-db

  order-service:
    build:
      context: .
      dockerfile: Order.API/Dockerfile
    ports:
      - "5002:80"
    environment:
      - ConnectionStrings__DefaultConnection=Server=order-db;Database=OrderDB;
      - ProductServiceUrl=http://product-service
    depends_on:
      - order-db

  product-db:
    image: postgres:15
    environment:
      POSTGRES_DB: ProductDB
      POSTGRES_PASSWORD: password

  order-db:
    image: postgres:15
    environment:
      POSTGRES_DB: OrderDB
      POSTGRES_PASSWORD: password
```

## Design Principles

### 1. High Cohesion, Low Coupling
- Services should be highly focused (single responsibility)
- Minimal dependencies between services

### 2. Domain-Driven Design (DDD)
- Services aligned with business domains
- Bounded contexts define service boundaries

### 3. API First
- Design APIs before implementation
- Well-documented contracts

### 4. Automation
- Automated testing
- CI/CD pipelines
- Infrastructure as Code

## Common Challenges

### 1. Distributed Data
❌ **Problem**: No ACID transactions across services
✅ **Solution**: Eventual consistency, Saga pattern

### 2. Network Reliability
❌ **Problem**: Services can fail, network can be slow
✅ **Solution**: Retry, timeout, circuit breaker patterns

### 3. Service Discovery
❌ **Problem**: How do services find each other?
✅ **Solution**: Service registry (Consul, Eureka)

### 4. Monitoring
❌ **Problem**: Distributed logs and metrics
✅ **Solution**: Centralized logging (ELK), distributed tracing

## Interview Tips

- Understand trade-offs: complexity vs scalability
- Know when NOT to use microservices
- Explain Conway's Law (team structure mirrors system architecture)
- Discuss data consistency challenges
- Be familiar with common patterns (API Gateway, Service Discovery)
- Know deployment and monitoring challenges

## Key Takeaways

1. Microservices are **not a silver bullet**
2. Start with monolith, migrate to microservices when needed
3. Requires strong DevOps culture
4. Organizational structure matters (small, autonomous teams)
5. Data consistency is harder than in monoliths
6. Network reliability is crucial

## Next Steps

- Learn service communication patterns
- Understand API Gateway pattern
- Explore Docker and Kubernetes
- Study distributed system challenges
