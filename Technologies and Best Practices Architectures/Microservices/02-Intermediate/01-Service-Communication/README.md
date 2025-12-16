# Service Communication

## Communication Types

### 1. Synchronous Communication
Service waits for response before continuing.

### 2. Asynchronous Communication
Service doesn't wait for response, continues processing.

## Synchronous Patterns

### REST/HTTP

**Use Case**: Simple request-response, CRUD operations

```csharp
public class OrderService
{
    private readonly HttpClient _productClient;

    public OrderService(IHttpClientFactory httpClientFactory)
    {
        _productClient = httpClientFactory.CreateClient("ProductService");
    }

    public async Task<Order> CreateOrder(CreateOrderRequest request)
    {
        // Synchronous HTTP call
        var response = await _productClient.GetAsync($"/api/products/{request.ProductId}");

        if (!response.IsSuccessStatusCode)
            throw new Exception("Product not found");

        var product = await response.Content.ReadFromJsonAsync<Product>();

        var order = new Order
        {
            ProductId = product.Id,
            Price = product.Price * request.Quantity
        };

        await _orderRepository.SaveAsync(order);
        return order;
    }
}

// Startup configuration
builder.Services.AddHttpClient("ProductService", client =>
{
    client.BaseAddress = new Uri("http://product-service");
    client.Timeout = TimeSpan.FromSeconds(30);
});
```

### gRPC

**Use Case**: High-performance inter-service communication

```protobuf
// product.proto
syntax = "proto3";

package product;

service ProductService {
  rpc GetProduct (GetProductRequest) returns (GetProductResponse);
  rpc GetProducts (GetProductsRequest) returns (stream GetProductResponse);
}

message GetProductRequest {
  int32 id = 1;
}

message GetProductResponse {
  int32 id = 1;
  string name = 2;
  double price = 3;
  int32 stock = 4;
}

message GetProductsRequest {
  repeated int32 ids = 1;
}
```

```csharp
// Server Implementation
public class ProductGrpcService : ProductService.ProductServiceBase
{
    private readonly IProductRepository _repository;

    public override async Task<GetProductResponse> GetProduct(
        GetProductRequest request,
        ServerCallContext context)
    {
        var product = await _repository.GetByIdAsync(request.Id);

        if (product == null)
            throw new RpcException(new Status(StatusCode.NotFound, "Product not found"));

        return new GetProductResponse
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            Stock = product.Stock
        };
    }

    public override async Task GetProducts(
        GetProductsRequest request,
        IServerStreamWriter<GetProductResponse> responseStream,
        ServerCallContext context)
    {
        foreach (var id in request.Ids)
        {
            var product = await _repository.GetByIdAsync(id);

            await responseStream.WriteAsync(new GetProductResponse
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price
            });
        }
    }
}

// Client Usage
public class OrderService
{
    private readonly ProductService.ProductServiceClient _productClient;

    public async Task<decimal> CalculateOrderTotal(List<int> productIds)
    {
        decimal total = 0;

        var request = new GetProductsRequest();
        request.Ids.AddRange(productIds);

        using var call = _productClient.GetProducts(request);

        await foreach (var product in call.ResponseStream.ReadAllAsync())
        {
            total += product.Price;
        }

        return total;
    }
}

// Startup
builder.Services.AddGrpc();
builder.Services.AddGrpcClient<ProductService.ProductServiceClient>(options =>
{
    options.Address = new Uri("https://product-service:5001");
});
```

## Asynchronous Patterns

### Message Queue (RabbitMQ with MassTransit)

```csharp
// Message Contracts
public class OrderCreatedEvent
{
    public int OrderId { get; set; }
    public int UserId { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ProcessPaymentCommand
{
    public int OrderId { get; set; }
    public decimal Amount { get; set; }
}

// Publisher (Order Service)
public class OrderService
{
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly ISendEndpointProvider _sendEndpointProvider;

    public async Task CreateOrder(CreateOrderRequest request)
    {
        var order = new Order { ... };
        await _orderRepository.SaveAsync(order);

        // Publish event (fan-out to multiple consumers)
        await _publishEndpoint.Publish(new OrderCreatedEvent
        {
            OrderId = order.Id,
            UserId = request.UserId,
            TotalAmount = order.TotalAmount,
            CreatedAt = DateTime.UtcNow
        });

        // Send command (point-to-point)
        var endpoint = await _sendEndpointProvider.GetSendEndpoint(
            new Uri("queue:process-payment"));

        await endpoint.Send(new ProcessPaymentCommand
        {
            OrderId = order.Id,
            Amount = order.TotalAmount
        });
    }
}

// Consumer (Notification Service)
public class OrderCreatedConsumer : IConsumer<OrderCreatedEvent>
{
    private readonly IEmailService _emailService;

    public async Task Consume(ConsumeContext<OrderCreatedEvent> context)
    {
        var message = context.Message;

        await _emailService.SendOrderConfirmationAsync(
            message.UserId,
            message.OrderId,
            message.TotalAmount);
    }
}

// Consumer (Payment Service)
public class ProcessPaymentConsumer : IConsumer<ProcessPaymentCommand>
{
    private readonly IPaymentGateway _paymentGateway;
    private readonly IPublishEndpoint _publishEndpoint;

    public async Task Consume(ConsumeContext<ProcessPaymentCommand> context)
    {
        var command = context.Message;

        var result = await _paymentGateway.ProcessPaymentAsync(command.Amount);

        if (result.Success)
        {
            await _publishEndpoint.Publish(new PaymentCompletedEvent
            {
                OrderId = command.OrderId,
                PaymentId = result.PaymentId
            });
        }
        else
        {
            await _publishEndpoint.Publish(new PaymentFailedEvent
            {
                OrderId = command.OrderId,
                Reason = result.ErrorMessage
            });
        }
    }
}

// Startup Configuration
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<OrderCreatedConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("rabbitmq://localhost", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ConfigureEndpoints(context);
    });
});
```

### Apache Kafka

```csharp
// Producer
public class OrderEventProducer
{
    private readonly IProducer<string, OrderCreatedEvent> _producer;

    public async Task PublishOrderCreated(OrderCreatedEvent @event)
    {
        var message = new Message<string, OrderCreatedEvent>
        {
            Key = @event.OrderId.ToString(),
            Value = @event
        };

        await _producer.ProduceAsync("order-events", message);
    }
}

// Consumer
public class OrderEventConsumer : BackgroundService
{
    private readonly IConsumer<string, OrderCreatedEvent> _consumer;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _consumer.Subscribe("order-events");

        while (!stoppingToken.IsCancellationRequested)
        {
            var consumeResult = _consumer.Consume(stoppingToken);

            var orderEvent = consumeResult.Message.Value;

            // Process event
            await ProcessOrderEvent(orderEvent);

            _consumer.Commit(consumeResult);
        }
    }
}
```

## Communication Patterns

### 1. Request-Response

```csharp
// Synchronous
public async Task<Product> GetProduct(int id)
{
    var response = await _httpClient.GetAsync($"/api/products/{id}");
    return await response.Content.ReadFromJsonAsync<Product>();
}

// Asynchronous with Correlation
public class OrderService
{
    public async Task<Order> CreateOrderAsync(CreateOrderRequest request)
    {
        var orderId = await _repository.CreateOrderAsync(request);

        // Send command and wait for response
        var response = await _requestClient.GetResponse<OrderConfirmed, OrderRejected>(
            new CreateOrderCommand { OrderId = orderId });

        if (response.Is(out Response<OrderConfirmed> confirmed))
        {
            return await _repository.GetOrderAsync(confirmed.Message.OrderId);
        }

        throw new Exception("Order was rejected");
    }
}
```

### 2. Fire and Forget

```csharp
public async Task CreateOrder(CreateOrderRequest request)
{
    var order = await _repository.CreateAsync(request);

    // Just publish, don't wait for response
    await _publishEndpoint.Publish(new OrderCreatedEvent
    {
        OrderId = order.Id
    });

    // Return immediately
    return order;
}
```

### 3. Request-Reply Pattern (Async)

```csharp
// Requester
public class OrderService
{
    private readonly IRequestClient<ValidateInventory> _requestClient;

    public async Task<bool> CheckInventory(int productId, int quantity)
    {
        var response = await _requestClient.GetResponse<InventoryValidated>(
            new ValidateInventory
            {
                ProductId = productId,
                Quantity = quantity
            });

        return response.Message.IsAvailable;
    }
}

// Responder
public class ValidateInventoryConsumer : IConsumer<ValidateInventory>
{
    private readonly IInventoryService _inventoryService;

    public async Task Consume(ConsumeContext<ValidateInventory> context)
    {
        var isAvailable = await _inventoryService.CheckStockAsync(
            context.Message.ProductId,
            context.Message.Quantity);

        await context.RespondAsync(new InventoryValidated
        {
            IsAvailable = isAvailable
        });
    }
}
```

## Service Mesh (Istio/Linkerd)

```yaml
# Service mesh handles communication concerns
apiVersion: v1
kind: Service
metadata:
  name: product-service
spec:
  selector:
    app: product
  ports:
    - port: 80
      targetPort: 8080

---
# Istio VirtualService
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: product-service
spec:
  hosts:
    - product-service
  http:
    - match:
        - headers:
            version:
              exact: v2
      route:
        - destination:
            host: product-service
            subset: v2
    - route:
        - destination:
            host: product-service
            subset: v1
```

## Resilience Patterns

### Retry with Polly

```csharp
builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddTransientHttpErrorPolicy(policy =>
        policy.WaitAndRetryAsync(
            retryCount: 3,
            sleepDurationProvider: retryAttempt =>
                TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
            onRetry: (outcome, timespan, retryCount, context) =>
            {
                _logger.LogWarning($"Retry {retryCount} after {timespan}");
            }));
```

### Timeout

```csharp
builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddPolicyHandler(Policy.TimeoutAsync<HttpResponseMessage>(TimeSpan.FromSeconds(10)));
```

### Circuit Breaker

```csharp
builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddTransientHttpErrorPolicy(policy =>
        policy.CircuitBreakerAsync(
            handledEventsAllowedBeforeBreaking: 5,
            durationOfBreak: TimeSpan.FromSeconds(30),
            onBreak: (result, duration) =>
            {
                _logger.LogError("Circuit breaker opened");
            },
            onReset: () =>
            {
                _logger.LogInformation("Circuit breaker reset");
            }));
```

### Combined Policies

```csharp
var retryPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

var circuitBreakerPolicy = Policy<HttpResponseMessage>
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(5, TimeSpan.FromSeconds(30));

var combinedPolicy = Policy.WrapAsync(retryPolicy, circuitBreakerPolicy);

builder.Services.AddHttpClient<IProductService, ProductService>()
    .AddPolicyHandler(combinedPolicy);
```

## Comparison Table

| Pattern | Latency | Coupling | Reliability | Use Case |
|---------|---------|----------|-------------|----------|
| REST/HTTP | Low | High | Medium | Simple CRUD, public APIs |
| gRPC | Very Low | High | High | Internal high-perf communication |
| Message Queue | High | Low | High | Async processing, events |
| Kafka | Medium | Low | Very High | Event streaming, audit logs |

## Interview Tips

- Understand sync vs async trade-offs
- Know when to use each pattern
- Explain resilience patterns (retry, circuit breaker, timeout)
- Discuss message delivery guarantees (at-least-once, exactly-once)
- Explain idempotency
- Know gRPC advantages over REST
- Understand service mesh benefits

## Best Practices

1. **Use async for long-running operations**
2. **Implement idempotency** for retries
3. **Always set timeouts** on HTTP calls
4. **Use circuit breakers** to prevent cascading failures
5. **Version your contracts** (APIs, messages)
6. **Monitor communication** (latency, errors, retries)
7. **Use correlation IDs** for tracking across services

## Key Takeaways

1. Choose sync for immediate response needs
2. Choose async for better decoupling
3. Always implement resilience patterns
4. gRPC is faster than REST but less flexible
5. Message queues enable scalability
6. Service mesh simplifies cross-cutting concerns
