# Distributed Tracing

## The Problem

In microservices, a single request flows through multiple services:

```
Client → API Gateway → Order Service → Product Service → Inventory Service
                    → Payment Service
```

**Challenges:**
- How to track request across services?
- Where did the request fail?
- Which service is slow?
- What's the complete request flow?

## Solution: Distributed Tracing

Track requests across service boundaries using **Trace ID** and **Span ID**.

### Key Concepts

- **Trace**: End-to-end journey of a request
- **Span**: Single operation within a trace
- **Trace ID**: Unique identifier for entire request
- **Span ID**: Unique identifier for each operation
- **Parent Span ID**: Links spans together

## OpenTelemetry

Industry standard for observability.

### Installation
```bash
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.AspNetCore
dotnet add package OpenTelemetry.Instrumentation.Http
dotnet add package OpenTelemetry.Exporter.Jaeger
```

### Basic Setup
```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracerProviderBuilder =>
    {
        tracerProviderBuilder
            .AddSource("OrderService")
            .SetResourceBuilder(ResourceBuilder.CreateDefault()
                .AddService("OrderService"))
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddJaegerExporter(options =>
            {
                options.AgentHost = "localhost";
                options.AgentPort = 6831;
            });
    });
```

### Manual Instrumentation
```csharp
public class OrderService
{
    private static readonly ActivitySource ActivitySource = new("OrderService");

    public async Task<Order> CreateOrder(CreateOrderRequest request)
    {
        using var activity = ActivitySource.StartActivity("CreateOrder");

        activity?.SetTag("order.userId", request.UserId);
        activity?.SetTag("order.itemCount", request.Items.Count);

        try
        {
            var order = await _repository.CreateAsync(request);

            activity?.SetTag("order.id", order.Id);
            activity?.SetStatus(ActivityStatusCode.Ok);

            return order;
        }
        catch (Exception ex)
        {
            activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
            activity?.RecordException(ex);
            throw;
        }
    }
}
```

### Propagating Trace Context
```csharp
public class ProductServiceClient
{
    private readonly HttpClient _httpClient;

    public async Task<Product> GetProductAsync(int id)
    {
        // Trace context automatically propagated in headers
        var response = await _httpClient.GetAsync($"/api/products/{id}");

        return await response.Content.ReadFromJsonAsync<Product>();
    }
}
```

## Correlation IDs

Simpler alternative for tracking requests.

```csharp
// Middleware to add correlation ID
public class CorrelationIdMiddleware
{
    private readonly RequestDelegate _next;
    private const string CorrelationIdHeader = "X-Correlation-ID";

    public async Task InvokeAsync(HttpContext context)
    {
        var correlationId = context.Request.Headers[CorrelationIdHeader].FirstOrDefault()
                           ?? Guid.NewGuid().ToString();

        context.Items["CorrelationId"] = correlationId;
        context.Response.Headers.Add(CorrelationIdHeader, correlationId);

        using (_logger.BeginScope(new Dictionary<string, object>
        {
            ["CorrelationId"] = correlationId
        }))
        {
            await _next(context);
        }
    }
}

// Propagate to downstream services
public class CorrelationIdDelegatingHandler : DelegatingHandler
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        var correlationId = _httpContextAccessor.HttpContext?
            .Items["CorrelationId"] as string;

        if (!string.IsNullOrEmpty(correlationId))
        {
            request.Headers.Add("X-Correlation-ID", correlationId);
        }

        return await base.SendAsync(request, cancellationToken);
    }
}

builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddHttpMessageHandler<CorrelationIdDelegatingHandler>();
```

## Jaeger Setup

```yaml
# docker-compose.yml
version: '3.8'
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "6831:6831/udp"  # Jaeger agent
      - "16686:16686"    # Jaeger UI
    environment:
      - COLLECTOR_ZIPKIN_HTTP_PORT=9411
```

## Application Insights (Azure)

```csharp
builder.Services.AddApplicationInsightsTelemetry(options =>
{
    options.ConnectionString = builder.Configuration["ApplicationInsights:ConnectionString"];
});

// Automatic tracking of:
// - HTTP requests
// - Dependencies
// - Exceptions
// - Custom events

// Custom tracking
public class OrderService
{
    private readonly TelemetryClient _telemetry;

    public async Task CreateOrder(CreateOrderRequest request)
    {
        var operation = _telemetry.StartOperation<RequestTelemetry>("CreateOrder");

        try
        {
            var order = await _repository.CreateAsync(request);

            _telemetry.TrackEvent("OrderCreated", new Dictionary<string, string>
            {
                ["OrderId"] = order.Id.ToString(),
                ["UserId"] = request.UserId.ToString()
            });

            operation.Telemetry.Success = true;
        }
        catch (Exception ex)
        {
            _telemetry.TrackException(ex);
            operation.Telemetry.Success = false;
            throw;
        }
        finally
        {
            _telemetry.StopOperation(operation);
        }
    }
}
```

## Structured Logging

```csharp
public class OrderService
{
    private readonly ILogger<OrderService> _logger;

    public async Task CreateOrder(CreateOrderRequest request)
    {
        using (_logger.BeginScope(new Dictionary<string, object>
        {
            ["UserId"] = request.UserId,
            ["OrderItems"] = request.Items.Count
        }))
        {
            _logger.LogInformation("Creating order for user {UserId}", request.UserId);

            try
            {
                var order = await _repository.CreateAsync(request);

                _logger.LogInformation(
                    "Order {OrderId} created successfully",
                    order.Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create order");
                throw;
            }
        }
    }
}
```

## ELK Stack Integration

```csharp
// Install: dotnet add package Serilog.Sinks.Elasticsearch

Log.Logger = new LoggerConfiguration()
    .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("http://localhost:9200"))
    {
        AutoRegisterTemplate = true,
        IndexFormat = "order-service-{0:yyyy.MM.dd}",
        ModifyConnectionSettings = x => x.BasicAuthentication("user", "pass")
    })
    .CreateLogger();

builder.Host.UseSerilog();
```

## Interview Tips

- Explain trace vs span vs log
- Know OpenTelemetry vs vendor-specific tools
- Understand sampling strategies
- Discuss correlation ID propagation
- Know popular tools: Jaeger, Zipkin, Application Insights
- Explain performance impact of tracing

## Best Practices

1. **Use standard headers**: W3C Trace Context
2. **Sample intelligently**: Don't trace everything in prod
3. **Include business context**: Add custom tags
4. **Correlate with logs**: Use same trace ID
5. **Monitor trace latency**: Alert on slow operations
6. **Tag errors properly**: Status codes, error types
7. **Visualize dependencies**: Service dependency graphs

## Key Takeaways

1. Distributed tracing is essential for microservices
2. OpenTelemetry is the standard
3. Propagate trace context across services
4. Correlation IDs are simpler alternative
5. Combine tracing with logging and metrics
6. Sample to reduce overhead
7. Use tools like Jaeger or Application Insights
