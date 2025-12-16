# API Gateway

## What is an API Gateway?

A **single entry point** for all clients that sits between clients and microservices, routing requests to appropriate backend services.

```
┌─────────────────────┐
│  Client (Web/Mobile)│
└──────────┬──────────┘
           │
    ┌──────▼──────┐
    │ API Gateway │
    └──┬───┬───┬──┘
       │   │   │
  ┌────▼┐ │ ┌─▼────┐
  │Auth │ │ │Order │
  │Svc  │ │ │Svc   │
  └─────┘ │ └──────┘
    ┌─────▼─────┐
    │Product Svc│
    └───────────┘
```

## Key Responsibilities

1. **Request Routing**: Route to correct microservice
2. **Authentication & Authorization**: Centralized security
3. **Rate Limiting**: Prevent abuse
4. **Load Balancing**: Distribute traffic
5. **Caching**: Improve performance
6. **Request/Response Transformation**: Adapt protocols
7. **Monitoring & Logging**: Centralized observability

## Implementation with Ocelot

### Installation
```bash
dotnet add package Ocelot
dotnet add package Ocelot.Provider.Consul  # For service discovery
```

### Basic Configuration

```json
// ocelot.json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [
        {
          "Host": "localhost",
          "Port": 5001
        }
      ],
      "UpstreamPathTemplate": "/products/{everything}",
      "UpstreamHttpMethod": [ "GET", "POST", "PUT", "DELETE" ]
    },
    {
      "DownstreamPathTemplate": "/api/orders/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [
        {
          "Host": "localhost",
          "Port": 5002
        }
      ],
      "UpstreamPathTemplate": "/orders/{everything}",
      "UpstreamHttpMethod": [ "GET", "POST", "PUT", "DELETE" ]
    }
  ],
  "GlobalConfiguration": {
    "BaseUrl": "https://api.mycompany.com"
  }
}
```

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile(
    "ocelot.json",
    optional: false,
    reloadOnChange: true);

builder.Services.AddOcelot();

var app = builder.Build();

await app.UseOcelot();

app.Run();
```

## Advanced Features

### 1. Authentication

```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/orders/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [
        { "Host": "localhost", "Port": 5002 }
      ],
      "UpstreamPathTemplate": "/orders/{everything}",
      "UpstreamHttpMethod": [ "GET", "POST" ],
      "AuthenticationOptions": {
        "AuthenticationProviderKey": "Bearer",
        "AllowedScopes": []
      }
    }
  ]
}
```

```csharp
// Program.cs
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://your-identity-server";
        options.Audience = "api";
    });

builder.Services.AddOcelot();

var app = builder.Build();

app.UseAuthentication();
await app.UseOcelot();
```

### 2. Rate Limiting

```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products",
      "UpstreamPathTemplate": "/products",
      "RateLimitOptions": {
        "ClientWhitelist": [],
        "EnableRateLimiting": true,
        "Period": "1m",
        "PeriodTimespan": 60,
        "Limit": 100
      }
    }
  ]
}
```

### 3. Caching

```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{id}",
      "UpstreamPathTemplate": "/products/{id}",
      "FileCacheOptions": {
        "TtlSeconds": 60,
        "Region": "products"
      }
    }
  ]
}
```

```csharp
builder.Services.AddOcelot()
    .AddCacheManager(x =>
    {
        x.WithDictionaryHandle();
    });
```

### 4. Load Balancing

```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{everything}",
      "DownstreamScheme": "http",
      "DownstreamHostAndPorts": [
        { "Host": "product-service-1", "Port": 80 },
        { "Host": "product-service-2", "Port": 80 },
        { "Host": "product-service-3", "Port": 80 }
      ],
      "UpstreamPathTemplate": "/products/{everything}",
      "LoadBalancerOptions": {
        "Type": "RoundRobin"
      }
    }
  ]
}
```

**Load Balancer Types:**
- `RoundRobin`: Distribute evenly
- `LeastConnection`: Send to server with fewest connections
- `NoLoadBalancer`: Use first available

### 5. Service Discovery (Consul)

```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{everything}",
      "DownstreamScheme": "http",
      "ServiceName": "product-service",
      "UpstreamPathTemplate": "/products/{everything}",
      "LoadBalancerOptions": {
        "Type": "RoundRobin"
      }
    }
  ],
  "GlobalConfiguration": {
    "ServiceDiscoveryProvider": {
      "Host": "localhost",
      "Port": 8500,
      "Type": "Consul"
    }
  }
}
```

```csharp
builder.Services.AddOcelot()
    .AddConsul();
```

### 6. Request Aggregation

```json
{
  "Routes": [
    {
      "DownstreamPathTemplate": "/api/products/{id}",
      "UpstreamPathTemplate": "/product/{id}",
      "Key": "Product"
    },
    {
      "DownstreamPathTemplate": "/api/reviews/product/{id}",
      "UpstreamPathTemplate": "/reviews/{id}",
      "Key": "Reviews"
    }
  ],
  "Aggregates": [
    {
      "RouteKeys": [ "Product", "Reviews" ],
      "UpstreamPathTemplate": "/productdetails/{id}"
    }
  ]
}
```

Custom aggregator:
```csharp
public class ProductDetailsAggregator : IDefinedAggregator
{
    public async Task<DownstreamResponse> Aggregate(
        List<HttpContext> responses)
    {
        var productResponse = responses[0];
        var reviewsResponse = responses[1];

        var product = await productResponse.Items
            .DownstreamResponse().Content
            .ReadFromJsonAsync<Product>();

        var reviews = await reviewsResponse.Items
            .DownstreamResponse().Content
            .ReadFromJsonAsync<List<Review>>();

        var aggregatedResult = new
        {
            Product = product,
            Reviews = reviews
        };

        var json = JsonSerializer.Serialize(aggregatedResult);

        return new DownstreamResponse(
            new StringContent(json, Encoding.UTF8, "application/json"),
            HttpStatusCode.OK,
            new List<Header>(),
            "OK");
    }
}

// Register
builder.Services.AddSingleton<IDefinedAggregator, ProductDetailsAggregator>();
```

## Custom Middleware

```csharp
public class RequestLoggingMiddleware
{
    private readonly OcelotRequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(
        OcelotRequestDelegate next,
        ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        _logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

        await _next(context);

        _logger.LogInformation($"Response: {context.Response.StatusCode}");
    }
}

// Register
app.UseOcelot((ocelotBuilder, pipelineConfiguration) =>
{
    ocelotBuilder.UseMiddleware<RequestLoggingMiddleware>();
});
```

## YARP (Yet Another Reverse Proxy)

Microsoft's alternative to Ocelot:

```csharp
// appsettings.json
{
  "ReverseProxy": {
    "Routes": {
      "product-route": {
        "ClusterId": "product-cluster",
        "Match": {
          "Path": "/products/{**catch-all}"
        }
      },
      "order-route": {
        "ClusterId": "order-cluster",
        "Match": {
          "Path": "/orders/{**catch-all}"
        }
      }
    },
    "Clusters": {
      "product-cluster": {
        "Destinations": {
          "destination1": {
            "Address": "http://localhost:5001/"
          }
        }
      },
      "order-cluster": {
        "Destinations": {
          "destination1": {
            "Address": "http://localhost:5002/"
          }
        }
      }
    }
  }
}
```

```csharp
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy();
app.Run();
```

## API Gateway vs Backend for Frontend (BFF)

### Single API Gateway
```
Web/Mobile → API Gateway → Services
```

### BFF Pattern
```
Web → Web BFF → Services
Mobile → Mobile BFF → Services
```

```csharp
// Web BFF
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ProductDetailView> GetProduct(int id)
    {
        // Rich data for web
        var product = await _productService.GetAsync(id);
        var reviews = await _reviewService.GetByProductAsync(id);
        var recommendations = await _recommendationService.GetAsync(id);

        return new ProductDetailView
        {
            Product = product,
            Reviews = reviews,
            Recommendations = recommendations
        };
    }
}

// Mobile BFF
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ProductMobileView> GetProduct(int id)
    {
        // Lightweight for mobile
        var product = await _productService.GetAsync(id);

        return new ProductMobileView
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            ImageUrl = product.ThumbnailUrl
        };
    }
}
```

## Benefits & Drawbacks

### Benefits ✅
- Single entry point for clients
- Simplified client code
- Centralized cross-cutting concerns
- Can aggregate responses
- Protocol translation (REST to gRPC)
- Version management

### Drawbacks ❌
- Single point of failure (mitigate with HA)
- Potential bottleneck
- Additional network hop
- Added complexity
- Must be highly available

## Interview Tips

- Explain API Gateway vs direct service calls
- Know common features (auth, rate limiting, caching)
- Understand BFF pattern
- Discuss single point of failure mitigation
- Know tools: Ocelot, YARP, Kong, AWS API Gateway
- Explain request aggregation
- Discuss service discovery integration

## Best Practices

1. **High Availability**: Deploy multiple instances
2. **Monitoring**: Track latency, errors, throughput
3. **Versioning**: Support API versioning
4. **Security**: Implement auth/authz at gateway
5. **Caching**: Cache responses when possible
6. **Timeouts**: Set appropriate timeouts
7. **Observability**: Centralized logging and tracing

## Key Takeaways

1. API Gateway simplifies client-side complexity
2. Centralizes cross-cutting concerns
3. Must be highly available and performant
4. Consider BFF for different client types
5. Use service discovery for dynamic routing
6. Monitor and optimize for performance
