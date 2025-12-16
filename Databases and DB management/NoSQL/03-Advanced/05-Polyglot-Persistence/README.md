# Polyglot Persistence

## What is Polyglot Persistence?

Using multiple database technologies in a single application, choosing the best database for each specific use case.

```
┌─────────────────────────────────────────┐
│         E-commerce Application          │
└─────────────────────────────────────────┘
              │
    ┌─────────┼─────────┬────────────┐
    │         │         │            │
┌───▼────┐ ┌──▼───┐ ┌──▼──────┐ ┌───▼──────┐
│MongoDB │ │Redis │ │Postgres │ │Elastic   │
│        │ │      │ │         │ │Search    │
│Products│ │Cache │ │Orders   │ │Search    │
│Reviews │ │Session│ │Users    │ │Logs      │
└────────┘ └──────┘ └─────────┘ └──────────┘
```

## Database Selection Matrix

| Use Case | Best Database | Why |
|----------|---------------|-----|
| Product Catalog | MongoDB | Flexible schema, varied attributes |
| User Transactions | PostgreSQL | ACID guarantees, relational |
| Session Storage | Redis | Fast, in-memory, TTL support |
| Full-Text Search | Elasticsearch | Powerful search, analytics |
| Time-Series Data | InfluxDB/TimescaleDB | Optimized for time-series |
| Graph Relationships | Neo4j | Social networks, recommendations |
| Event Logs | Cassandra | High write throughput |
| File Storage | S3/GridFS | Large binary files |

## E-commerce Example

### Architecture

```csharp
public class EcommerceArchitecture
{
    // 1. Product catalog - MongoDB (flexible schema)
    private readonly IMongoCollection<Product> _products;

    // 2. User accounts & orders - PostgreSQL (ACID transactions)
    private readonly DbContext _sqlContext;

    // 3. Cache - Redis (fast access)
    private readonly IDatabase _cache;

    // 4. Search - Elasticsearch (full-text search)
    private readonly IElasticClient _search;

    // 5. Analytics - Cassandra (time-series data)
    private readonly ISession _analytics;
}
```

### Product Catalog - MongoDB

```csharp
public class ProductService
{
    private readonly IMongoCollection<Product> _products;
    private readonly IDatabase _cache;

    public async Task<Product> GetProduct(string productId)
    {
        // Try cache first
        var cached = await _cache.StringGetAsync($"product:{productId}");
        if (cached.HasValue)
        {
            return JsonSerializer.Deserialize<Product>(cached);
        }

        // MongoDB for flexible product schema
        var product = await _products
            .Find(p => p.Id == productId)
            .FirstOrDefaultAsync();

        if (product != null)
        {
            // Cache for 1 hour
            await _cache.StringSetAsync(
                $"product:{productId}",
                JsonSerializer.Serialize(product),
                TimeSpan.FromHours(1));
        }

        return product;
    }
}

// MongoDB - Different product types
public class Product
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }  // "book", "electronics", "clothing"
    public Dictionary<string, object> Attributes { get; set; }  // Flexible attributes
}
```

### Orders - PostgreSQL

```csharp
// SQL for transactional integrity
public class OrderService
{
    private readonly ApplicationDbContext _context;

    public async Task<Order> PlaceOrder(CreateOrderRequest request)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // Create order
            var order = new Order
            {
                UserId = request.UserId,
                Total = request.Total,
                Status = OrderStatus.Pending
            };

            _context.Orders.Add(order);

            // Update inventory
            foreach (var item in request.Items)
            {
                var product = await _context.Products.FindAsync(item.ProductId);

                if (product.Stock < item.Quantity)
                {
                    throw new InvalidOperationException("Insufficient stock");
                }

                product.Stock -= item.Quantity;
            }

            // Deduct from user balance
            var user = await _context.Users.FindAsync(request.UserId);
            user.Balance -= request.Total;

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return order;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}

// EF Core models
public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public decimal Total { get; set; }
    public OrderStatus Status { get; set; }
    public List<OrderItem> Items { get; set; }
}
```

### Session & Cache - Redis

```csharp
public class SessionService
{
    private readonly IDatabase _redis;

    public async Task CreateSession(string userId, string sessionId)
    {
        var session = new UserSession
        {
            UserId = userId,
            SessionId = sessionId,
            CreatedAt = DateTime.UtcNow,
            Cart = new List<CartItem>()
        };

        // Store with 30-minute TTL
        await _redis.StringSetAsync(
            $"session:{sessionId}",
            JsonSerializer.Serialize(session),
            TimeSpan.FromMinutes(30));
    }

    public async Task AddToCart(string sessionId, CartItem item)
    {
        var sessionKey = $"session:{sessionId}";
        var session = await GetSession(sessionId);

        session.Cart.Add(item);

        // Update session with sliding expiration
        await _redis.StringSetAsync(
            sessionKey,
            JsonSerializer.Serialize(session),
            TimeSpan.FromMinutes(30));
    }
}
```

### Search - Elasticsearch

```csharp
public class SearchService
{
    private readonly IElasticClient _elastic;

    public async Task<List<Product>> SearchProducts(string query)
    {
        var response = await _elastic.SearchAsync<Product>(s => s
            .Query(q => q
                .MultiMatch(m => m
                    .Fields(f => f
                        .Field(p => p.Name, boost: 2.0)
                        .Field(p => p.Description)
                        .Field(p => p.Category))
                    .Query(query)
                    .Fuzziness(Fuzziness.Auto)))
            .Highlight(h => h
                .Fields(f => f
                    .Field(p => p.Name)
                    .Field(p => p.Description))));

        return response.Documents.ToList();
    }

    public async Task IndexProduct(Product product)
    {
        // Index product in Elasticsearch
        await _elastic.IndexDocumentAsync(product);
    }
}
```

### Analytics - Cassandra

```csharp
public class AnalyticsService
{
    private readonly ISession _cassandra;

    public async Task RecordPageView(string productId, string userId)
    {
        // Cassandra optimized for time-series writes
        var statement = new SimpleStatement(@"
            INSERT INTO page_views (product_id, user_id, timestamp, page)
            VALUES (?, ?, ?, ?)",
            productId,
            userId,
            DateTime.UtcNow,
            "product_detail");

        await _cassandra.ExecuteAsync(statement);
    }

    public async Task<List<PopularProduct>> GetPopularProducts(DateTime startDate, DateTime endDate)
    {
        var statement = new SimpleStatement(@"
            SELECT product_id, COUNT(*) as views
            FROM page_views
            WHERE timestamp >= ? AND timestamp <= ?
            GROUP BY product_id
            ORDER BY views DESC
            LIMIT 100
            ALLOW FILTERING",
            startDate,
            endDate);

        var result = await _cassandra.ExecuteAsync(statement);

        return result.Select(row => new PopularProduct
        {
            ProductId = row.GetValue<string>("product_id"),
            Views = row.GetValue<long>("views")
        }).ToList();
    }
}
```

## Data Synchronization

### Event-Driven Synchronization

```csharp
public class ProductEventHandler
{
    private readonly IMongoCollection<Product> _mongo;
    private readonly IElasticClient _elastic;
    private readonly IDatabase _redis;

    public async Task HandleProductCreated(ProductCreatedEvent evt)
    {
        // 1. Save to MongoDB (source of truth)
        await _mongo.InsertOneAsync(evt.Product);

        // 2. Index in Elasticsearch (search)
        await _elastic.IndexDocumentAsync(evt.Product);

        // 3. Invalidate cache
        await _redis.KeyDeleteAsync($"product:{evt.Product.Id}");
    }

    public async Task HandleProductUpdated(ProductUpdatedEvent evt)
    {
        // Update all databases
        await Task.WhenAll(
            _mongo.ReplaceOneAsync(p => p.Id == evt.ProductId, evt.Product),
            _elastic.UpdateAsync<Product>(evt.ProductId, u => u.Doc(evt.Product)),
            _redis.KeyDeleteAsync($"product:{evt.ProductId}"));
    }
}
```

### CDC (Change Data Capture)

```csharp
public class MongoChangeStreamListener
{
    public async Task WatchProductChanges(IMongoCollection<Product> collection)
    {
        var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<Product>>()
            .Match(change =>
                change.OperationType == ChangeStreamOperationType.Insert ||
                change.OperationType == ChangeStreamOperationType.Update ||
                change.OperationType == ChangeStreamOperationType.Replace);

        using var cursor = await collection.WatchAsync(pipeline);

        await cursor.ForEachAsync(async change =>
        {
            // Sync to Elasticsearch
            await _elastic.IndexDocumentAsync(change.FullDocument);

            // Invalidate Redis cache
            await _redis.KeyDeleteAsync($"product:{change.FullDocument.Id}");
        });
    }
}
```

## Repository Pattern for Polyglot

```csharp
public interface IProductRepository
{
    Task<Product> GetByIdAsync(string id);
    Task<List<Product>> SearchAsync(string query);
    Task CreateAsync(Product product);
    Task UpdateAsync(Product product);
}

public class ProductRepository : IProductRepository
{
    private readonly IMongoCollection<Product> _mongo;
    private readonly IDatabase _redis;
    private readonly IElasticClient _elastic;

    public async Task<Product> GetByIdAsync(string id)
    {
        // Try cache
        var cached = await _redis.StringGetAsync($"product:{id}");
        if (cached.HasValue)
        {
            return JsonSerializer.Deserialize<Product>(cached);
        }

        // Get from MongoDB
        var product = await _mongo.Find(p => p.Id == id).FirstOrDefaultAsync();

        if (product != null)
        {
            // Cache it
            await _redis.StringSetAsync(
                $"product:{id}",
                JsonSerializer.Serialize(product),
                TimeSpan.FromHours(1));
        }

        return product;
    }

    public async Task<List<Product>> SearchAsync(string query)
    {
        // Use Elasticsearch for search
        var response = await _elastic.SearchAsync<Product>(s => s
            .Query(q => q.QueryString(qs => qs.Query(query))));

        return response.Documents.ToList();
    }

    public async Task CreateAsync(Product product)
    {
        // Save to MongoDB (source of truth)
        await _mongo.InsertOneAsync(product);

        // Index in Elasticsearch
        await _elastic.IndexDocumentAsync(product);

        // No cache yet (will be cached on first read)
    }

    public async Task UpdateAsync(Product product)
    {
        // Update MongoDB
        await _mongo.ReplaceOneAsync(p => p.Id == product.Id, product);

        // Update Elasticsearch
        await _elastic.UpdateAsync<Product>(product.Id, u => u.Doc(product));

        // Invalidate cache
        await _redis.KeyDeleteAsync($"product:{product.Id}");
    }
}
```

## CQRS with Polyglot Persistence

```csharp
// Command side: PostgreSQL (writes, transactions)
public class OrderCommandHandler
{
    private readonly ApplicationDbContext _context;
    private readonly IEventBus _eventBus;

    public async Task<Order> CreateOrder(CreateOrderCommand command)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var order = new Order { /* ... */ };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            // Publish event for read model update
            await _eventBus.PublishAsync(new OrderCreatedEvent { Order = order });

            return order;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}

// Query side: MongoDB (reads, denormalized)
public class OrderQueryHandler
{
    private readonly IMongoCollection<OrderReadModel> _orders;

    public async Task<OrderReadModel> GetOrder(string orderId)
    {
        // Denormalized read model with all related data
        return await _orders.Find(o => o.Id == orderId).FirstOrDefaultAsync();
    }

    public async Task<List<OrderReadModel>> GetUserOrders(string userId)
    {
        return await _orders
            .Find(o => o.UserId == userId)
            .SortByDescending(o => o.CreatedAt)
            .ToListAsync();
    }
}

// Event handler to sync
public class OrderEventHandler
{
    private readonly IMongoCollection<OrderReadModel> _readModel;

    public async Task Handle(OrderCreatedEvent evt)
    {
        // Create denormalized read model
        var readModel = new OrderReadModel
        {
            Id = evt.Order.Id,
            UserId = evt.Order.UserId,
            UserName = evt.Order.User.Name,  // Denormalized
            Total = evt.Order.Total,
            Items = evt.Order.Items.Select(i => new OrderItemReadModel
            {
                ProductId = i.ProductId,
                ProductName = i.Product.Name,  // Denormalized
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };

        await _readModel.InsertOneAsync(readModel);
    }
}
```

## Challenges and Solutions

### 1. Data Consistency

**Challenge**: Keeping multiple databases in sync

**Solution**: Event sourcing + eventual consistency

```csharp
public class EventStore
{
    private readonly IMongoCollection<Event> _events;

    public async Task<List<Event>> GetEvents(string aggregateId)
    {
        return await _events
            .Find(e => e.AggregateId == aggregateId)
            .SortBy(e => e.Timestamp)
            .ToListAsync();
    }

    public async Task SaveEvent(Event evt)
    {
        await _events.InsertOneAsync(evt);

        // Publish to message bus
        await _messageBus.PublishAsync(evt);
    }
}
```

### 2. Distributed Transactions

**Challenge**: ACID across multiple databases

**Solution**: Saga pattern

```csharp
public class OrderSaga
{
    public async Task<bool> ProcessOrder(Order order)
    {
        try
        {
            // Step 1: Reserve inventory (MongoDB)
            await _inventory.ReserveAsync(order.Items);

            // Step 2: Charge payment (PostgreSQL)
            await _payment.ChargeAsync(order.UserId, order.Total);

            // Step 3: Create order (PostgreSQL)
            await _orders.CreateAsync(order);

            // Step 4: Update analytics (Cassandra)
            await _analytics.RecordOrderAsync(order);

            return true;
        }
        catch (Exception ex)
        {
            // Compensate: rollback all steps
            await _inventory.ReleaseAsync(order.Items);
            await _payment.RefundAsync(order.UserId, order.Total);

            return false;
        }
    }
}
```

### 3. Query Complexity

**Challenge**: Joining data across databases

**Solution**: Denormalization + application-level joins

```csharp
public class OrderService
{
    public async Task<OrderDetails> GetOrderDetails(string orderId)
    {
        // Get order from PostgreSQL
        var order = await _sqlContext.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == orderId);

        // Get product details from MongoDB (parallel)
        var productTasks = order.Items.Select(async item =>
        {
            var product = await _products.Find(p => p.Id == item.ProductId).FirstOrDefaultAsync();
            return new OrderItemDetails
            {
                ProductId = item.ProductId,
                ProductName = product.Name,
                ProductImage = product.ImageUrl,
                Quantity = item.Quantity,
                Price = item.Price
            };
        });

        var items = await Task.WhenAll(productTasks);

        return new OrderDetails
        {
            Order = order,
            Items = items.ToList()
        };
    }
}
```

## Interview Tips

- Explain benefits of polyglot persistence
- Know when to use each database type
- Understand data synchronization challenges
- Discuss eventual consistency trade-offs
- Know CQRS pattern
- Explain Saga pattern for distributed transactions
- Understand event sourcing
- Discuss operational complexity

## Best Practices

1. **Choose database per use case**: Not one-size-fits-all
2. **Define source of truth**: One database owns each entity
3. **Use event-driven sync**: Keep databases eventually consistent
4. **Embrace eventual consistency**: Don't fight it
5. **Denormalize for reads**: Optimize query-side databases
6. **Monitor all databases**: Different metrics for each
7. **Plan for failures**: Compensating transactions
8. **Document data flow**: Which database owns what

## Key Takeaways

1. Polyglot persistence uses best database for each use case
2. MongoDB for flexible schemas, PostgreSQL for transactions
3. Redis for caching, Elasticsearch for search
4. Cassandra for time-series, Neo4j for graphs
5. Data synchronization via events
6. CQRS separates reads and writes
7. Saga pattern for distributed transactions
8. Eventual consistency is acceptable for many use cases
