# Performance Tuning

## Performance Fundamentals

### Key Metrics

- **Latency**: Time to complete single operation
- **Throughput**: Operations per second
- **Resource Utilization**: CPU, memory, disk I/O, network
- **Hit Rate**: Cache hits / total requests

## MongoDB Performance Tuning

### 1. Indexing Strategy

```javascript
// Identify slow queries
db.setProfilingLevel(2)  // Log all operations
db.system.profile.find().sort({ millis: -1 }).limit(10)

// Create appropriate indexes
db.products.createIndex({ category: 1, price: -1 })

// Verify index usage
db.products.find({ category: "Electronics" }).explain("executionStats")

// Look for:
// - executionTimeMillis
// - totalDocsExamined (should be close to nReturned)
// - stage: "IXSCAN" (good) vs "COLLSCAN" (bad)
```

### 2. Query Optimization

```javascript
// Bad: No index, large result set
db.orders.find({ status: "pending" })

// Good: Indexed field, limited results
db.orders.find({ customerId: 123, status: "pending" })
  .limit(100)

// Bad: Retrieving unnecessary fields
db.products.find({ category: "Electronics" })

// Good: Project only needed fields
db.products.find(
  { category: "Electronics" },
  { name: 1, price: 1, _id: 0 }
)
```

### 3. Covered Queries

```javascript
// Index includes all queried fields
db.products.createIndex({ category: 1, price: 1, name: 1 })

// Query doesn't need to access documents
db.products.find(
  { category: "Electronics" },
  { _id: 0, price: 1, name: 1 }
).explain()

// Look for: totalDocsExamined: 0 (covered query)
```

### 4. Aggregation Optimization

```javascript
// Bad: Late filtering
db.orders.aggregate([
  { $lookup: { from: "customers", ... } },
  { $match: { status: "completed" } }  // Filter after expensive lookup
])

// Good: Early filtering
db.orders.aggregate([
  { $match: { status: "completed" } },  // Filter first
  { $lookup: { from: "customers", ... } }
])

// Use indexes in aggregation
db.orders.aggregate([
  { $match: { customerId: 123 } },  // Uses index on customerId
  { $group: { _id: "$status", count: { $sum: 1 } } }
])
```

### 5. Bulk Operations

```csharp
// Bad: Individual inserts
foreach (var product in products)
{
    await collection.InsertOneAsync(product);  // Network round-trip for each
}

// Good: Bulk insert
await collection.InsertManyAsync(products);

// Best: Ordered bulk writes
var bulkOps = new List<WriteModel<Product>>();

foreach (var product in products)
{
    bulkOps.Add(new InsertOneModel<Product>(product));
}

await collection.BulkWriteAsync(bulkOps, new BulkWriteOptions { IsOrdered = false });
```

## MongoDB Profiler

```csharp
public class MongoProfiler
{
    public async Task EnableProfiling(IMongoDatabase database)
    {
        // Level 0: Off
        // Level 1: Log slow operations (>100ms default)
        // Level 2: Log all operations

        var command = new BsonDocument
        {
            { "profile", 1 },
            { "slowms", 50 }  // Log queries slower than 50ms
        };

        await database.RunCommandAsync<BsonDocument>(command);
    }

    public async Task<List<BsonDocument>> GetSlowQueries(IMongoDatabase database)
    {
        var profile = database.GetCollection<BsonDocument>("system.profile");

        return await profile
            .Find(p => p["millis"] > 100)
            .SortByDescending(p => p["millis"])
            .Limit(20)
            .ToListAsync();
    }
}
```

## Connection Pooling

```csharp
// Bad: Create new client for each request
public class BadRepository
{
    public async Task<Product> GetProduct(int id)
    {
        var client = new MongoClient("mongodb://localhost");  // ❌ New connection
        var database = client.GetDatabase("ecommerce");
        var collection = database.GetCollection<Product>("products");
        return await collection.Find(p => p.Id == id).FirstOrDefaultAsync();
    }
}

// Good: Reuse client (singleton)
public class GoodRepository
{
    private readonly IMongoCollection<Product> _collection;

    public GoodRepository(IMongoClient client)  // ✅ Injected singleton
    {
        var database = client.GetDatabase("ecommerce");
        _collection = database.GetCollection<Product>("products");
    }

    public async Task<Product> GetProduct(int id)
    {
        return await _collection.Find(p => p.Id == id).FirstOrDefaultAsync();
    }
}

// Configure in DI
services.AddSingleton<IMongoClient>(sp =>
{
    var settings = MongoClientSettings.FromConnectionString("mongodb://localhost");
    settings.MaxConnectionPoolSize = 500;
    settings.MinConnectionPoolSize = 10;
    settings.WaitQueueTimeout = TimeSpan.FromSeconds(30);
    return new MongoClient(settings);
});
```

## Read Preferences for Performance

```csharp
// Primary: All reads from primary (strong consistency, higher load)
var primarySettings = MongoClientSettings.FromConnectionString(connectionString);
primarySettings.ReadPreference = ReadPreference.Primary;

// Secondary Preferred: Read from secondary if available (eventual consistency, better distribution)
var secondarySettings = MongoClientSettings.FromConnectionString(connectionString);
secondarySettings.ReadPreference = ReadPreference.SecondaryPreferred;

// Use case: Analytics queries
var analyticsCollection = database
    .GetCollection<Order>("orders")
    .WithReadPreference(ReadPreference.Secondary);

var salesReport = await analyticsCollection
    .Aggregate()
    .Group(o => o.Category, g => new { Category = g.Key, Total = g.Sum(o => o.Total) })
    .ToListAsync();
```

## Redis Performance Tuning

### 1. Pipeline Commands

```csharp
// Bad: Individual commands
for (int i = 0; i < 1000; i++)
{
    await db.StringSetAsync($"key:{i}", $"value{i}");  // 1000 network round-trips
}

// Good: Pipeline
var tasks = new List<Task>();
for (int i = 0; i < 1000; i++)
{
    tasks.Add(db.StringSetAsync($"key:{i}", $"value{i}", flags: CommandFlags.FireAndForget));
}
await Task.WhenAll(tasks);

// Best: Batch
var batch = db.CreateBatch();
var batchTasks = new List<Task>();
for (int i = 0; i < 1000; i++)
{
    batchTasks.Add(batch.StringSetAsync($"key:{i}", $"value{i}"));
}
batch.Execute();
await Task.WhenAll(batchTasks);
```

### 2. Data Structure Selection

```csharp
// Bad: String for counters (serialize/deserialize overhead)
var counter = await db.StringGetAsync("page_views");
var count = int.Parse(counter) + 1;
await db.StringSetAsync("page_views", count.ToString());

// Good: Use increment
await db.StringIncrementAsync("page_views");

// Bad: String for objects (large serialization)
var user = new User { Id = 1, Name = "John", Email = "john@example.com", /* 50 fields */ };
await db.StringSetAsync("user:1", JsonSerializer.Serialize(user));

// Good: Hash for objects (update individual fields)
await db.HashSetAsync("user:1", new HashEntry[]
{
    new HashEntry("name", "John"),
    new HashEntry("email", "john@example.com")
});

// Update single field
await db.HashSetAsync("user:1", "email", "newemail@example.com");
```

### 3. Key Expiration

```csharp
// Set TTL to prevent memory bloat
await db.StringSetAsync("session:abc123", sessionData, TimeSpan.FromHours(1));

// Check memory usage
var info = await connection.GetServer("localhost:6379").InfoAsync("memory");
Console.WriteLine(info);
```

### 4. Avoid Expensive Operations

```csharp
// Bad: KEYS command (blocks server, scans all keys)
var server = connection.GetServer("localhost:6379");
var keys = server.Keys(pattern: "user:*");  // ❌ Blocks Redis

// Good: SCAN command (non-blocking, iterative)
var cursor = 0L;
var pageSize = 1000;
var matchingKeys = new List<RedisKey>();

do
{
    var result = await db.ExecuteAsync("SCAN", cursor, "MATCH", "user:*", "COUNT", pageSize);
    var resultArray = (RedisResult[])result;
    cursor = long.Parse((string)resultArray[0]);
    var keys = (RedisKey[])resultArray[1];
    matchingKeys.AddRange(keys);
} while (cursor != 0);
```

## Cassandra Performance Tuning

### 1. Partition Design

```sql
-- Bad: Large partition (millions of rows per customer)
CREATE TABLE customer_activities (
    customer_id INT,
    timestamp TIMESTAMP,
    activity_type TEXT,
    PRIMARY KEY (customer_id, timestamp)
);
-- All activities for a customer in one partition = slow reads

-- Good: Time-bucketed partitions
CREATE TABLE customer_activities (
    customer_id INT,
    year_month TEXT,  -- "2024-01"
    timestamp TIMESTAMP,
    activity_type TEXT,
    PRIMARY KEY ((customer_id, year_month), timestamp)
);
-- Partitions limited by month = faster reads
```

### 2. Query Patterns

```csharp
// Bad: Query without partition key (scans all nodes)
var query = "SELECT * FROM orders WHERE status = 'pending' ALLOW FILTERING";
var result = await session.ExecuteAsync(new SimpleStatement(query));  // ❌ Slow

// Good: Include partition key
var query = "SELECT * FROM orders WHERE customer_id = ? AND status = 'pending'";
var statement = new SimpleStatement(query, 123);
var result = await session.ExecuteAsync(statement);  // ✅ Fast
```

### 3. Batch Statements

```csharp
// Batch for same partition only
var batch = new BatchStatement();

// Good: All same partition key
batch.Add(new SimpleStatement("INSERT INTO orders (customer_id, order_id, ...) VALUES (?, ?, ...)", 123, order1));
batch.Add(new SimpleStatement("INSERT INTO orders (customer_id, order_id, ...) VALUES (?, ?, ...)", 123, order2));

await session.ExecuteAsync(batch);  // Single partition, atomic

// Bad: Different partitions (slower, not atomic)
batch.Add(new SimpleStatement("INSERT INTO orders (customer_id, order_id, ...) VALUES (?, ?, ...)", 123, order1));
batch.Add(new SimpleStatement("INSERT INTO orders (customer_id, order_id, ...) VALUES (?, ?, ...)", 456, order2));
// Goes to different nodes, coordinator overhead
```

### 4. Consistency Level

```csharp
// Trade consistency for performance
var statement = new SimpleStatement("SELECT * FROM products WHERE product_id = ?", productId)
    .SetConsistencyLevel(ConsistencyLevel.One);  // Read from any replica (faster)

var result = await session.ExecuteAsync(statement);

// For critical reads
var criticalStatement = new SimpleStatement("SELECT * FROM accounts WHERE account_id = ?", accountId)
    .SetConsistencyLevel(ConsistencyLevel.Quorum);  // Read from majority (slower, more consistent)
```

## Caching Strategies

### 1. Cache-Aside with Metrics

```csharp
public class CachedRepository
{
    private readonly IDatabase _cache;
    private readonly IMongoCollection<Product> _db;
    private long _cacheHits;
    private long _cacheMisses;

    public async Task<Product> GetProduct(int id)
    {
        var cacheKey = $"product:{id}";

        // Try cache
        var cached = await _cache.StringGetAsync(cacheKey);
        if (cached.HasValue)
        {
            Interlocked.Increment(ref _cacheHits);
            return JsonSerializer.Deserialize<Product>(cached);
        }

        Interlocked.Increment(ref _cacheMisses);

        // Cache miss - query database
        var product = await _db.Find(p => p.Id == id).FirstOrDefaultAsync();

        if (product != null)
        {
            await _cache.StringSetAsync(
                cacheKey,
                JsonSerializer.Serialize(product),
                TimeSpan.FromHours(1));
        }

        return product;
    }

    public double GetCacheHitRate()
    {
        var total = _cacheHits + _cacheMisses;
        return total == 0 ? 0 : (double)_cacheHits / total * 100;
    }
}
```

### 2. Multi-Level Cache

```csharp
public class MultiLevelCache
{
    private readonly IMemoryCache _l1Cache;  // In-process (fastest)
    private readonly IDatabase _l2Cache;     // Redis (fast)
    private readonly IMongoCollection<Product> _db;  // MongoDB (slow)

    public async Task<Product> GetProduct(int id)
    {
        var key = $"product:{id}";

        // L1: In-process cache
        if (_l1Cache.TryGetValue(key, out Product product))
        {
            return product;
        }

        // L2: Redis
        var cached = await _l2Cache.StringGetAsync(key);
        if (cached.HasValue)
        {
            product = JsonSerializer.Deserialize<Product>(cached);

            // Populate L1
            _l1Cache.Set(key, product, TimeSpan.FromMinutes(5));

            return product;
        }

        // L3: Database
        product = await _db.Find(p => p.Id == id).FirstOrDefaultAsync();

        if (product != null)
        {
            // Populate both caches
            _l1Cache.Set(key, product, TimeSpan.FromMinutes(5));
            await _l2Cache.StringSetAsync(key, JsonSerializer.Serialize(product), TimeSpan.FromHours(1));
        }

        return product;
    }
}
```

## Monitoring and Diagnostics

### MongoDB Monitoring

```csharp
public class MongoMonitoring
{
    public async Task<DatabaseStats> GetDatabaseStats(IMongoDatabase database)
    {
        var command = new BsonDocument("dbStats", 1);
        var stats = await database.RunCommandAsync<BsonDocument>(command);

        return new DatabaseStats
        {
            Collections = stats["collections"].AsInt32,
            DataSize = stats["dataSize"].AsInt64,
            IndexSize = stats["indexSize"].AsInt64,
            StorageSize = stats["storageSize"].AsInt64
        };
    }

    public async Task<ServerStatus> GetServerStatus(IMongoClient client)
    {
        var adminDb = client.GetDatabase("admin");
        var command = new BsonDocument("serverStatus", 1);
        var status = await adminDb.RunCommandAsync<BsonDocument>(command);

        var connections = status["connections"].AsBsonDocument;
        var opcounters = status["opcounters"].AsBsonDocument;

        return new ServerStatus
        {
            CurrentConnections = connections["current"].AsInt32,
            TotalConnections = connections["totalCreated"].AsInt64,
            InsertOps = opcounters["insert"].AsInt64,
            QueryOps = opcounters["query"].AsInt64,
            UpdateOps = opcounters["update"].AsInt64,
            DeleteOps = opcounters["delete"].AsInt64
        };
    }
}
```

### Redis Monitoring

```csharp
public class RedisMonitoring
{
    public async Task<RedisInfo> GetRedisInfo(IConnectionMultiplexer connection)
    {
        var server = connection.GetServer(connection.GetEndPoints().First());
        var info = await server.InfoAsync();

        var memory = info.First(g => g.Key == "Memory");
        var stats = info.First(g => g.Key == "Stats");

        return new RedisInfo
        {
            UsedMemory = long.Parse(memory.First(kv => kv.Key == "used_memory").Value),
            MaxMemory = long.Parse(memory.First(kv => kv.Key == "maxmemory").Value),
            ConnectedClients = int.Parse(stats.First(kv => kv.Key == "connected_clients").Value),
            TotalCommandsProcessed = long.Parse(stats.First(kv => kv.Key == "total_commands_processed").Value),
            OpsPerSecond = long.Parse(stats.First(kv => kv.Key == "instantaneous_ops_per_sec").Value)
        };
    }
}
```

## Load Testing

```csharp
public class LoadTester
{
    public async Task<LoadTestResults> RunLoadTest(int concurrentUsers, int durationSeconds)
    {
        var results = new ConcurrentBag<RequestResult>();
        var stopwatch = Stopwatch.StartNew();
        var endTime = DateTime.UtcNow.AddSeconds(durationSeconds);

        var tasks = Enumerable.Range(0, concurrentUsers)
            .Select(async userId =>
            {
                while (DateTime.UtcNow < endTime)
                {
                    var requestSw = Stopwatch.StartNew();

                    try
                    {
                        await MakeRequest(userId);
                        results.Add(new RequestResult
                        {
                            Success = true,
                            Duration = requestSw.ElapsedMilliseconds
                        });
                    }
                    catch (Exception ex)
                    {
                        results.Add(new RequestResult
                        {
                            Success = false,
                            Duration = requestSw.ElapsedMilliseconds,
                            Error = ex.Message
                        });
                    }

                    await Task.Delay(100);  // Think time
                }
            });

        await Task.WhenAll(tasks);

        var successfulRequests = results.Where(r => r.Success).ToList();

        return new LoadTestResults
        {
            TotalRequests = results.Count,
            SuccessfulRequests = successfulRequests.Count,
            FailedRequests = results.Count - successfulRequests.Count,
            AverageLatency = successfulRequests.Average(r => r.Duration),
            P95Latency = successfulRequests.OrderBy(r => r.Duration).ElementAt((int)(successfulRequests.Count * 0.95)).Duration,
            P99Latency = successfulRequests.OrderBy(r => r.Duration).ElementAt((int)(successfulRequests.Count * 0.99)).Duration,
            RequestsPerSecond = results.Count / stopwatch.Elapsed.TotalSeconds
        };
    }
}
```

## Interview Tips

- Know how to identify slow queries
- Understand index impact on performance
- Explain covered queries
- Discuss connection pooling importance
- Know caching strategies and hit rates
- Understand bulk operations vs individual
- Explain read preferences trade-offs
- Know monitoring metrics

## Best Practices

1. **Index strategically**: Based on query patterns
2. **Use connection pooling**: Reuse connections
3. **Batch operations**: Reduce network round-trips
4. **Cache frequently accessed data**: Multi-level caching
5. **Monitor continuously**: Track metrics and slow queries
6. **Use appropriate read preferences**: Balance consistency and performance
7. **Optimize queries**: Include necessary fields only
8. **Load test**: Before production deployment

## Key Takeaways

1. Indexing is critical for query performance
2. Connection pooling prevents overhead
3. Bulk operations are faster than individual
4. Caching dramatically improves read performance
5. Monitor metrics to identify bottlenecks
6. Different data structures have different performance
7. Trade consistency for performance when appropriate
