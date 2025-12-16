# Event-Driven Architecture

## What is Event-Driven Architecture?

Architecture pattern where services communicate by producing and consuming events representing state changes.

```
Service A (state change) → Event → [Service B, Service C, Service D] react
```

## Core Concepts

### Event
Immutable record of something that happened.

```csharp
public record OrderPlacedEvent
{
    public int OrderId { get; init; }
    public int UserId { get; init; }
    public DateTime PlacedAt { get; init; }
    public List<OrderItem> Items { get; init; }
}
```

### Event Producer
Service that publishes events when state changes.

```csharp
public class OrderService
{
    private readonly IEventBus _eventBus;

    public async Task PlaceOrder(PlaceOrderRequest request)
    {
        var order = await _repository.CreateOrderAsync(request);

        await _eventBus.PublishAsync(new OrderPlacedEvent
        {
            OrderId = order.Id,
            UserId = request.UserId,
            PlacedAt = DateTime.UtcNow,
            Items = order.Items
        });
    }
}
```

### Event Consumer
Service that reacts to events.

```csharp
public class InventoryService : IEventHandler<OrderPlacedEvent>
{
    public async Task HandleAsync(OrderPlacedEvent @event)
    {
        foreach (var item in @event.Items)
        {
            await _inventory.ReserveStockAsync(item.ProductId, item.Quantity);
        }
    }
}

public class NotificationService : IEventHandler<OrderPlacedEvent>
{
    public async Task HandleAsync(OrderPlacedEvent @event)
    {
        await _emailService.SendOrderConfirmationAsync(@event.UserId, @event.OrderId);
    }
}
```

## Event Sourcing

Store all changes as sequence of events instead of current state.

```csharp
// Events
public abstract record OrderEvent
{
    public int OrderId { get; init; }
    public DateTime Timestamp { get; init; }
}

public record OrderCreatedEvent : OrderEvent
{
    public int UserId { get; init; }
}

public record OrderItemAddedEvent : OrderEvent
{
    public int ProductId { get; init; }
    public int Quantity { get; init; }
    public decimal Price { get; init; }
}

public record OrderConfirmedEvent : OrderEvent { }

// Aggregate
public class Order
{
    private readonly List<OrderEvent> _events = new();

    public int Id { get; private set; }
    public OrderStatus Status { get; private set; }
    public List<OrderItem> Items { get; private set; } = new();

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
            Quantity = @event.Quantity,
            Price = @event.Price
        });
    }

    public void Apply(OrderConfirmedEvent @event)
    {
        Status = OrderStatus.Confirmed;
    }

    // Rebuild state from events
    public static Order FromEvents(IEnumerable<OrderEvent> events)
    {
        var order = new Order();

        foreach (var @event in events)
        {
            ((dynamic)order).Apply((dynamic)@event);
        }

        return order;
    }
}

// Repository
public class EventSourcedOrderRepository
{
    private readonly IEventStore _eventStore;

    public async Task SaveAsync(Order order)
    {
        await _eventStore.SaveEventsAsync(order.Id, order.GetUncommittedEvents());
    }

    public async Task<Order> GetByIdAsync(int orderId)
    {
        var events = await _eventStore.GetEventsAsync(orderId);
        return Order.FromEvents(events);
    }
}
```

## CQRS with Event-Driven

```csharp
// Command Side (Write Model)
public class CreateOrderCommandHandler
{
    private readonly IEventStore _eventStore;
    private readonly IEventBus _eventBus;

    public async Task<int> Handle(CreateOrderCommand command)
    {
        var order = Order.Create(command);
        var events = order.GetUncommittedEvents();

        await _eventStore.SaveEventsAsync(order.Id, events);

        foreach (var @event in events)
        {
            await _eventBus.PublishAsync(@event);
        }

        return order.Id;
    }
}

// Query Side (Read Model)
public class OrderReadModel
{
    public int OrderId { get; set; }
    public string CustomerName { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Projection (builds read model from events)
public class OrderProjection : IEventHandler<OrderCreatedEvent>,
                               IEventHandler<OrderConfirmedEvent>
{
    private readonly OrderReadDbContext _context;

    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        _context.Orders.Add(new OrderReadModel
        {
            OrderId = @event.OrderId,
            CustomerName = @event.CustomerName,
            Status = "Created",
            CreatedAt = @event.Timestamp
        });

        await _context.SaveChangesAsync();
    }

    public async Task HandleAsync(OrderConfirmedEvent @event)
    {
        var order = await _context.Orders.FindAsync(@event.OrderId);
        order.Status = "Confirmed";

        await _context.SaveChangesAsync();
    }
}
```

## Saga Pattern (Event Choreography)

```csharp
// Order Service
public class OrderService : IEventHandler<PaymentCompletedEvent>
{
    public async Task CreateOrderAsync(CreateOrderRequest request)
    {
        var order = await _repository.CreateAsync(request);

        await _eventBus.PublishAsync(new OrderCreatedEvent
        {
            OrderId = order.Id,
            TotalAmount = order.TotalAmount
        });
    }

    public async Task HandleAsync(PaymentCompletedEvent @event)
    {
        await _repository.ConfirmOrderAsync(@event.OrderId);

        await _eventBus.PublishAsync(new OrderConfirmedEvent
        {
            OrderId = @event.OrderId
        });
    }
}

// Payment Service
public class PaymentService : IEventHandler<OrderCreatedEvent>
{
    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        var result = await _paymentGateway.ChargeAsync(@event.TotalAmount);

        if (result.Success)
        {
            await _eventBus.PublishAsync(new PaymentCompletedEvent
            {
                OrderId = @event.OrderId,
                PaymentId = result.PaymentId
            });
        }
        else
        {
            await _eventBus.PublishAsync(new PaymentFailedEvent
            {
                OrderId = @event.OrderId,
                Reason = result.ErrorMessage
            });
        }
    }
}

// Inventory Service
public class InventoryService : IEventHandler<OrderConfirmedEvent>
{
    public async Task HandleAsync(OrderConfirmedEvent @event)
    {
        await _inventory.CommitReservationAsync(@event.OrderId);
    }
}
```

## Event Bus Implementation

```csharp
public interface IEventBus
{
    Task PublishAsync<TEvent>(TEvent @event) where TEvent : class;
    void Subscribe<TEvent, THandler>()
        where TEvent : class
        where THandler : IEventHandler<TEvent>;
}

public class InMemoryEventBus : IEventBus
{
    private readonly Dictionary<Type, List<Type>> _handlers = new();
    private readonly IServiceProvider _serviceProvider;

    public async Task PublishAsync<TEvent>(TEvent @event) where TEvent : class
    {
        var eventType = typeof(TEvent);

        if (!_handlers.ContainsKey(eventType))
            return;

        foreach (var handlerType in _handlers[eventType])
        {
            var handler = _serviceProvider.GetService(handlerType) as IEventHandler<TEvent>;
            await handler.HandleAsync(@event);
        }
    }

    public void Subscribe<TEvent, THandler>()
        where TEvent : class
        where THandler : IEventHandler<TEvent>
    {
        var eventType = typeof(TEvent);

        if (!_handlers.ContainsKey(eventType))
        {
            _handlers[eventType] = new List<Type>();
        }

        _handlers[eventType].Add(typeof(THandler));
    }
}
```

## Eventual Consistency

```csharp
// Write happens immediately
public async Task<Order> CreateOrder(CreateOrderRequest request)
{
    var order = await _repository.CreateAsync(request);

    // Event published asynchronously
    await _eventBus.PublishAsync(new OrderCreatedEvent { OrderId = order.Id });

    return order; // Returns before all consumers process
}

// Consumers process eventually
public class InventoryService : IEventHandler<OrderCreatedEvent>
{
    public async Task HandleAsync(OrderCreatedEvent @event)
    {
        // Processed some time after order created
        await _inventory.ReserveStockAsync(@event.OrderId);
    }
}
```

## Outbox Pattern

Ensures events are published even if message broker is down.

```csharp
public class OrderService
{
    private readonly IDbContext _dbContext;

    public async Task CreateOrderAsync(CreateOrderRequest request)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();

        try
        {
            // Save order
            var order = new Order { ... };
            _dbContext.Orders.Add(order);

            // Save event to outbox
            _dbContext.OutboxEvents.Add(new OutboxEvent
            {
                EventType = nameof(OrderCreatedEvent),
                Payload = JsonSerializer.Serialize(new OrderCreatedEvent { OrderId = order.Id }),
                CreatedAt = DateTime.UtcNow
            });

            await _dbContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}

// Background worker publishes events from outbox
public class OutboxPublisher : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var events = await _dbContext.OutboxEvents
                .Where(e => !e.Published)
                .ToListAsync();

            foreach (var @event in events)
            {
                await _eventBus.PublishAsync(@event.EventType, @event.Payload);

                @event.Published = true;
                @event.PublishedAt = DateTime.UtcNow;
            }

            await _dbContext.SaveChangesAsync();
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
        }
    }
}
```

## Interview Tips

- Understand event-driven vs request-driven
- Know event sourcing benefits and challenges
- Explain CQRS pattern
- Discuss eventual consistency
- Know Saga choreography vs orchestration
- Understand outbox pattern
- Explain event versioning strategies

## Best Practices

1. **Events are immutable**: Never change published events
2. **Events are facts**: Past tense naming (OrderPlaced, not PlaceOrder)
3. **Include context**: Timestamp, correlation ID, causation ID
4. **Version events**: Support schema evolution
5. **Idempotent handlers**: Handle duplicate events
6. **Monitor event lag**: Alert on delayed processing
7. **Use outbox pattern**: Ensure reliable event publishing

## Key Takeaways

1. Events decouple services effectively
2. Enables reactive, scalable systems
3. Eventual consistency is trade-off
4. Event sourcing provides complete audit trail
5. CQRS separates read and write concerns
6. Saga pattern handles distributed transactions
7. Outbox pattern ensures reliable messaging
