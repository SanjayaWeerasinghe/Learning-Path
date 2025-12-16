# Message Queues

## What are Message Queues?

Asynchronous communication mechanism where messages are stored in a queue until the consumer is ready to process them.

```
Producer → Queue → Consumer
```

## Benefits

- **Decoupling**: Producer and consumer don't need to know about each other
- **Reliability**: Messages not lost if consumer is down
- **Scalability**: Multiple consumers can process messages in parallel
- **Load Leveling**: Handle traffic spikes
- **Asynchronous Processing**: Non-blocking operations

## RabbitMQ with MassTransit

### Installation
```bash
dotnet add package MassTransit
dotnet add package MassTransit.RabbitMQ
```

### Message Contracts
```csharp
public record OrderCreatedEvent
{
    public int OrderId { get; init; }
    public int UserId { get; init; }
    public decimal TotalAmount { get; init; }
    public DateTime CreatedAt { get; init; }
}

public record ProcessPaymentCommand
{
    public int OrderId { get; init; }
    public decimal Amount { get; init; }
}

public record PaymentProcessedEvent
{
    public int OrderId { get; init; }
    public string PaymentId { get; init; }
    public bool Success { get; init; }
}
```

### Publisher
```csharp
public class OrderService
{
    private readonly IPublishEndpoint _publishEndpoint;

    public async Task CreateOrder(CreateOrderRequest request)
    {
        var order = await _repository.CreateAsync(request);

        // Publish event
        await _publishEndpoint.Publish<OrderCreatedEvent>(new
        {
            OrderId = order.Id,
            UserId = request.UserId,
            TotalAmount = order.TotalAmount,
            CreatedAt = DateTime.UtcNow
        });
    }
}
```

### Consumer
```csharp
public class OrderCreatedConsumer : IConsumer<OrderCreatedEvent>
{
    private readonly IEmailService _emailService;
    private readonly ILogger<OrderCreatedConsumer> _logger;

    public async Task Consume(ConsumeContext<OrderCreatedEvent> context)
    {
        _logger.LogInformation($"Order created: {context.Message.OrderId}");

        await _emailService.SendOrderConfirmationAsync(
            context.Message.UserId,
            context.Message.OrderId);
    }
}

// Configure
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

### Request-Response Pattern
```csharp
// Request
public record ValidateInventoryRequest
{
    public int ProductId { get; init; }
    public int Quantity { get; init; }
}

// Response
public record InventoryValidationResponse
{
    public bool IsAvailable { get; init; }
    public int AvailableQuantity { get; init; }
}

// Requester
public class OrderService
{
    private readonly IRequestClient<ValidateInventoryRequest> _client;

    public async Task<bool> ValidateInventory(int productId, int quantity)
    {
        var response = await _client.GetResponse<InventoryValidationResponse>(new
        {
            ProductId = productId,
            Quantity = quantity
        });

        return response.Message.IsAvailable;
    }
}

// Responder
public class ValidateInventoryConsumer : IConsumer<ValidateInventoryRequest>
{
    private readonly IInventoryService _inventoryService;

    public async Task Consume(ConsumeContext<ValidateInventoryRequest> context)
    {
        var available = await _inventoryService.CheckStockAsync(
            context.Message.ProductId,
            context.Message.Quantity);

        await context.RespondAsync<InventoryValidationResponse>(new
        {
            IsAvailable = available,
            AvailableQuantity = await _inventoryService.GetStockAsync(context.Message.ProductId)
        });
    }
}
```

## Apache Kafka

### Installation
```bash
dotnet add package Confluent.Kafka
```

### Producer
```csharp
public class KafkaProducer
{
    private readonly IProducer<string, string> _producer;

    public KafkaProducer()
    {
        var config = new ProducerConfig
        {
            BootstrapServers = "localhost:9092",
            Acks = Acks.All,
            MessageTimeoutMs = 10000
        };

        _producer = new ProducerBuilder<string, string>(config).Build();
    }

    public async Task PublishOrderCreated(OrderCreatedEvent @event)
    {
        var message = new Message<string, string>
        {
            Key = @event.OrderId.ToString(),
            Value = JsonSerializer.Serialize(@event)
        };

        var result = await _producer.ProduceAsync("order-events", message);

        Console.WriteLine($"Message delivered to {result.TopicPartitionOffset}");
    }
}
```

### Consumer
```csharp
public class KafkaConsumerService : BackgroundService
{
    private readonly IConsumer<string, string> _consumer;

    public KafkaConsumerService()
    {
        var config = new ConsumerConfig
        {
            BootstrapServers = "localhost:9092",
            GroupId = "notification-service",
            AutoOffsetReset = AutoOffsetReset.Earliest,
            EnableAutoCommit = false
        };

        _consumer = new ConsumerBuilder<string, string>(config).Build();
        _consumer.Subscribe("order-events");
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var consumeResult = _consumer.Consume(stoppingToken);

                var orderEvent = JsonSerializer.Deserialize<OrderCreatedEvent>(
                    consumeResult.Message.Value);

                await ProcessEvent(orderEvent);

                _consumer.Commit(consumeResult);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error consuming message");
            }
        }
    }
}
```

## Azure Service Bus

```csharp
// Install: dotnet add package Azure.Messaging.ServiceBus

public class ServiceBusPublisher
{
    private readonly ServiceBusClient _client;

    public async Task PublishAsync(OrderCreatedEvent @event)
    {
        var sender = _client.CreateSender("orders");

        var message = new ServiceBusMessage(JsonSerializer.Serialize(@event))
        {
            MessageId = Guid.NewGuid().ToString(),
            ContentType = "application/json"
        };

        await sender.SendMessageAsync(message);
    }
}

public class ServiceBusConsumer : BackgroundService
{
    private readonly ServiceBusProcessor _processor;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _processor.ProcessMessageAsync += MessageHandler;
        _processor.ProcessErrorAsync += ErrorHandler;

        await _processor.StartProcessingAsync(stoppingToken);
    }

    private async Task MessageHandler(ProcessMessageEventArgs args)
    {
        var orderEvent = JsonSerializer.Deserialize<OrderCreatedEvent>(
            args.Message.Body.ToString());

        await ProcessEvent(orderEvent);

        await args.CompleteMessageAsync(args.Message);
    }
}
```

## Message Patterns

### Publish-Subscribe
```
Publisher → Topic → [Subscriber 1, Subscriber 2, Subscriber 3]
```

### Point-to-Point
```
Sender → Queue → Single Receiver
```

### Request-Reply
```
Requester → Request Queue → Processor
Processor → Reply Queue → Requester
```

## Dead Letter Queue

```csharp
public class OrderCreatedConsumer : IConsumer<OrderCreatedEvent>
{
    public async Task Consume(ConsumeContext<OrderCreatedEvent> context)
    {
        try
        {
            await ProcessOrder(context.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process order");

            // Move to dead letter queue after retries
            if (context.GetRetryAttempt() >= 3)
            {
                await context.Redeliver(TimeSpan.FromSeconds(30));
            }
            else
            {
                throw; // Will go to error queue
            }
        }
    }
}

// Configure DLQ
cfg.ReceiveEndpoint("order-events", e =>
{
    e.UseMessageRetry(r => r.Intervals(100, 500, 1000));
    e.UseInMemoryOutbox();
    e.ConfigureConsumer<OrderCreatedConsumer>(context);
});
```

## Message Deduplication

```csharp
public class IdempotentConsumer : IConsumer<OrderCreatedEvent>
{
    private readonly IDistributedCache _cache;

    public async Task Consume(ConsumeContext<OrderCreatedEvent> context)
    {
        var messageId = context.MessageId.ToString();

        // Check if already processed
        var processed = await _cache.GetStringAsync(messageId);

        if (processed != null)
        {
            _logger.LogInformation($"Message {messageId} already processed");
            return;
        }

        await ProcessOrder(context.Message);

        // Mark as processed
        await _cache.SetStringAsync(
            messageId,
            "processed",
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24)
            });
    }
}
```

## Comparison Table

| Feature | RabbitMQ | Kafka | Azure Service Bus |
|---------|----------|-------|-------------------|
| Type | Message Broker | Event Stream | Message Broker |
| Throughput | Medium | Very High | Medium-High |
| Retention | Until consumed | Configurable (days) | Time-based |
| Ordering | Per queue | Per partition | Sessions |
| Best For | Request-response, tasks | Event streaming, logs | Enterprise, Azure |

## Interview Tips

- Understand pub-sub vs point-to-point
- Know message delivery guarantees (at-most-once, at-least-once, exactly-once)
- Explain idempotency importance
- Discuss dead letter queues
- Know when to use queues vs events
- Understand Kafka partitions and consumer groups

## Best Practices

1. **Idempotent consumers**: Handle duplicate messages
2. **Use DLQ**: Don't lose failed messages
3. **Monitor queue depth**: Alert on backlog
4. **Set message TTL**: Prevent old messages
5. **Version messages**: Support schema evolution
6. **Use correlation IDs**: Track message flow
7. **Implement retries**: With exponential backoff

## Key Takeaways

1. Queues enable asynchronous communication
2. Decouples services for better scalability
3. Always implement idempotency
4. Use DLQ for failed messages
5. Kafka for high-throughput event streams
6. RabbitMQ for traditional messaging
7. Monitor and alert on queue metrics
