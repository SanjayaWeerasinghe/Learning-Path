# Caching Strategies

## What is Caching?

Storing frequently accessed data in fast storage (usually in-memory) to reduce database load and improve response time.

## Why Cache?

- **Performance**: Microsecond latency vs milliseconds
- **Reduced database load**: Fewer expensive queries
- **Cost savings**: Less database resources needed
- **Scalability**: Handle more requests

## Cache-Aside (Lazy Loading)

Application manages cache manually.

```csharp
public async Task<Product> GetProduct(int id)
{
    string cacheKey = $"product:{id}";

    // 1. Try cache first
    string cached = await _cache.StringGetAsync(cacheKey);
    if (cached != null)
    {
        return JsonSerializer.Deserialize<Product>(cached);
    }

    // 2. Cache miss - query database
    var product = await _database.GetProductAsync(id);

    if (product != null)
    {
        // 3. Store in cache
        await _cache.StringSetAsync(
            cacheKey,
            JsonSerializer.Serialize(product),
            TimeSpan.FromHours(1));
    }

    return product;
}
```

**Pros**: Simple, handles cache failures gracefully
**Cons**: Cache miss penalty, possible stale data

## Write-Through

Write to cache and database simultaneously.

```csharp
public async Task UpdateProduct(Product product)
{
    string cacheKey = $"product:{product.Id}";

    // 1. Update database
    await _database.UpdateProductAsync(product);

    // 2. Update cache
    await _cache.StringSetAsync(
        cacheKey,
        JsonSerializer.Serialize(product),
        TimeSpan.FromHours(1));
}
```

**Pros**: Cache always up-to-date, no stale reads
**Cons**: Slower writes, cache churn for rarely read data

## Write-Behind (Write-Back)

Write to cache, asynchronously write to database.

```csharp
public async Task UpdateProduct(Product product)
{
    string cacheKey = $"product:{product.Id}";

    // 1. Update cache immediately
    await _cache.StringSetAsync(
        cacheKey,
        JsonSerializer.Serialize(product));

    // 2. Queue for database update
    await _queue.EnqueueAsync(new UpdateProductCommand { Product = product });
}

// Background worker
public class DatabaseSyncWorker : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var commands = await _queue.DequeueAsync();

            foreach (var command in commands)
            {
                await _database.UpdateProductAsync(command.Product);
            }
        }
    }
}
```

**Pros**: Fast writes, handles write spikes
**Cons**: Data loss risk if cache fails, complex

## Read-Through

Cache loads data automatically on miss.

```csharp
// Implemented by caching library
var product = await _cache.GetOrCreateAsync(
    $"product:{id}",
    async entry =>
    {
        entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1);
        return await _database.GetProductAsync(id);
    });
```

**Pros**: Application code simpler
**Cons**: Requires caching library support

## Refresh-Ahead

Refresh cache before expiration.

```csharp
public async Task<Product> GetProduct(int id)
{
    string cacheKey = $"product:{id}";

    var cached = await _cache.StringGetWithExpiryAsync(cacheKey);

    if (cached.Value.HasValue)
    {
        var product = JsonSerializer.Deserialize<Product>(cached.Value);

        // Refresh if within 10 minutes of expiration
        if (cached.Expiry.HasValue && cached.Expiry.Value < TimeSpan.FromMinutes(10))
        {
            _ = Task.Run(async () =>
            {
                var fresh = await _database.GetProductAsync(id);
                await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(fresh), TimeSpan.FromHours(1));
            });
        }

        return product;
    }

    // Cache miss - load and cache
    var productFromDb = await _database.GetProductAsync(id);
    await _cache.StringSetAsync(cacheKey, JsonSerializer.Serialize(productFromDb), TimeSpan.FromHours(1));

    return productFromDb;
}
```

## Cache Invalidation

### Time-Based (TTL)

```csharp
// Set expiration
await _cache.StringSetAsync("key", "value", TimeSpan.FromMinutes(30));

// Sliding expiration (Redis doesn't support natively - use application logic)
public async Task<string> GetWithSlidingExpiration(string key)
{
    var value = await _cache.StringGetAsync(key);

    if (value.HasValue)
    {
        // Reset expiration on access
        await _cache.KeyExpireAsync(key, TimeSpan.FromMinutes(30));
    }

    return value;
}
```

### Event-Based

```csharp
public async Task UpdateProduct(Product product)
{
    // Update database
    await _database.UpdateProductAsync(product);

    // Invalidate cache
    await _cache.KeyDeleteAsync($"product:{product.Id}");

    // Or update cache
    await _cache.StringSetAsync(
        $"product:{product.Id}",
        JsonSerializer.Serialize(product),
        TimeSpan.FromHours(1));
}
```

### Pattern-Based

```csharp
// Delete all product caches
var server = _cache.Multiplexer.GetServer("localhost:6379");
var keys = server.Keys(pattern: "product:*");

foreach (var key in keys)
{
    await _cache.KeyDeleteAsync(key);
}

// Or use Redis keyspace notifications
```

## Cache Stampede Prevention

Problem: Many requests try to rebuild cache simultaneously.

### Solution: Lock Pattern

```csharp
public async Task<Product> GetProduct(int id)
{
    string cacheKey = $"product:{id}";
    string lockKey = $"lock:product:{id}";

    // Try cache
    var cached = await _cache.StringGetAsync(cacheKey);
    if (cached.HasValue)
    {
        return JsonSerializer.Deserialize<Product>(cached);
    }

    // Acquire lock
    var lockAcquired = await _cache.StringSetAsync(
        lockKey,
        "locked",
        TimeSpan.FromSeconds(10),
        When.NotExists);

    if (lockAcquired)
    {
        try
        {
            // Load from database
            var product = await _database.GetProductAsync(id);

            // Update cache
            await _cache.StringSetAsync(
                cacheKey,
                JsonSerializer.Serialize(product),
                TimeSpan.FromHours(1));

            return product;
        }
        finally
        {
            // Release lock
            await _cache.KeyDeleteAsync(lockKey);
        }
    }
    else
    {
        // Wait and retry
        await Task.Delay(100);
        return await GetProduct(id);  // Recursive retry
    }
}
```

## Caching Layers

### Multi-Level Cache

```csharp
public class MultiLevelCache
{
    private readonly IMemoryCache _l1Cache;  // In-process
    private readonly IConnectionMultiplexer _l2Cache;  // Redis

    public async Task<T> GetAsync<T>(string key)
    {
        // L1: In-process cache
        if (_l1Cache.TryGetValue(key, out T value))
        {
            return value;
        }

        // L2: Redis
        var db = _l2Cache.GetDatabase();
        var redisValue = await db.StringGetAsync(key);

        if (redisValue.HasValue)
        {
            value = JsonSerializer.Deserialize<T>(redisValue);

            // Populate L1
            _l1Cache.Set(key, value, TimeSpan.FromMinutes(5));

            return value;
        }

        return default;
    }

    public async Task SetAsync<T>(string key, T value)
    {
        // Set both layers
        _l1Cache.Set(key, value, TimeSpan.FromMinutes(5));

        var db = _l2Cache.GetDatabase();
        await db.StringSetAsync(
            key,
            JsonSerializer.Serialize(value),
            TimeSpan.FromHours(1));
    }
}
```

## Cache Warming

Pre-populate cache with frequently accessed data.

```csharp
public class CacheWarmer : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        // Load popular products
        var popularProducts = await _database.GetPopularProductsAsync(100);

        foreach (var product in popularProducts)
        {
            await _cache.StringSetAsync(
                $"product:{product.Id}",
                JsonSerializer.Serialize(product),
                TimeSpan.FromHours(24));
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
}
```

## Query Result Caching

```csharp
public async Task<List<Product>> SearchProducts(string category, decimal minPrice, decimal maxPrice)
{
    string cacheKey = $"search:{category}:{minPrice}:{maxPrice}";

    var cached = await _cache.StringGetAsync(cacheKey);
    if (cached.HasValue)
    {
        return JsonSerializer.Deserialize<List<Product>>(cached);
    }

    var products = await _database.SearchProductsAsync(category, minPrice, maxPrice);

    await _cache.StringSetAsync(
        cacheKey,
        JsonSerializer.Serialize(products),
        TimeSpan.FromMinutes(10));  // Shorter TTL for queries

    return products;
}
```

## Cache Aside with Distributed Lock

```csharp
public async Task<Product> GetProductWithLock(int id)
{
    string cacheKey = $"product:{id}";

    // Try cache
    var cached = await _cache.StringGetAsync(cacheKey);
    if (cached.HasValue)
    {
        return JsonSerializer.Deserialize<Product>(cached);
    }

    // Use RedLock for distributed locking
    using var redLock = await _redLockFactory.CreateLockAsync(
        $"lock:product:{id}",
        TimeSpan.FromSeconds(10));

    if (redLock.IsAcquired)
    {
        // Double-check cache
        cached = await _cache.StringGetAsync(cacheKey);
        if (cached.HasValue)
        {
            return JsonSerializer.Deserialize<Product>(cached);
        }

        // Load from database
        var product = await _database.GetProductAsync(id);

        await _cache.StringSetAsync(
            cacheKey,
            JsonSerializer.Serialize(product),
            TimeSpan.FromHours(1));

        return product;
    }

    // Failed to acquire lock - retry
    await Task.Delay(50);
    return await GetProductWithLock(id);
}
```

## Cache Monitoring

```csharp
public class CacheMetrics
{
    private long _hits;
    private long _misses;

    public async Task<T> GetWithMetrics<T>(string key)
    {
        var value = await _cache.StringGetAsync(key);

        if (value.HasValue)
        {
            Interlocked.Increment(ref _hits);
            return JsonSerializer.Deserialize<T>(value);
        }

        Interlocked.Increment(ref _misses);
        return default;
    }

    public double HitRate => _hits + _misses == 0 ? 0 : (double)_hits / (_hits + _misses);
}
```

## Interview Tips

- Explain cache-aside vs write-through
- Know cache stampede problem and solutions
- Understand TTL vs event-based invalidation
- Discuss cache invalidation challenges
- Know multi-level caching benefits
- Explain when to use each strategy
- Understand cache warming

## Best Practices

1. **Set appropriate TTL**: Balance freshness vs load
2. **Handle cache failures**: Degrade gracefully
3. **Monitor hit rate**: Aim for >80%
4. **Avoid cache stampede**: Use locking
5. **Invalidate proactively**: On updates
6. **Use multi-level cache**: For hot data
7. **Warm cache on startup**: For critical data

## Key Takeaways

1. Caching dramatically improves performance
2. Cache-aside is most common pattern
3. Write-through ensures consistency
4. Cache invalidation is hardest problem
5. Prevent cache stampede with locking
6. Monitor cache hit rate
7. Always handle cache failures gracefully
