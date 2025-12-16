# Redis Basics

## What is Redis?

**R**emote **D**ictionary **S**erver - In-memory data structure store used as database, cache, and message broker.

## Key Features

- **In-memory**: Extremely fast (microsecond latency)
- **Data structures**: Strings, Hashes, Lists, Sets, Sorted Sets
- **Persistence**: Optional disk persistence
- **Pub/Sub**: Messaging patterns
- **Atomic operations**: Thread-safe
- **TTL**: Automatic expiration

## Installation

```bash
# Docker
docker run -d -p 6379:6379 --name redis redis

# Connect
redis-cli
```

## Data Structures

### 1. Strings
Binary-safe strings up to 512MB.

```bash
# Set and get
SET user:1001:name "John Doe"
GET user:1001:name

# Set with expiration
SET session:abc123 "data" EX 3600  # 3600 seconds (1 hour)

# Set if not exists
SETNX lock:resource1 "locked"

# Increment/Decrement
SET counter 10
INCR counter  # Returns 11
INCRBY counter 5  # Returns 16
DECR counter  # Returns 15

# Multiple operations
MSET key1 "value1" key2 "value2"
MGET key1 key2

# Delete
DEL user:1001:name
```

### 2. Hashes
Maps of field-value pairs (like objects).

```bash
# Set fields
HSET user:1001 name "John" email "john@example.com" age 30

# Get field
HGET user:1001 name

# Get all
HGETALL user:1001

# Get multiple fields
HMGET user:1001 name email

# Check field exists
HEXISTS user:1001 name

# Increment field
HINCRBY user:1001 age 1

# Delete field
HDEL user:1001 email
```

### 3. Lists
Ordered collections (linked lists).

```bash
# Push to list
LPUSH recent:products "LAPTOP001"  # Left (head)
RPUSH recent:products "MOUSE001"   # Right (tail)

# Pop from list
LPOP recent:products
RPOP recent:products

# Get range
LRANGE recent:products 0 9  # First 10 items

# Get by index
LINDEX recent:products 0

# Length
LLEN recent:products

# Trim list
LTRIM recent:products 0 99  # Keep only 100 items

# Blocking pop (useful for queues)
BLPOP queue:tasks 30  # Wait up to 30 seconds
```

### 4. Sets
Unordered collection of unique strings.

```bash
# Add members
SADD user:1001:interests "gaming" "coding" "music"

# Get members
SMEMBERS user:1001:interests

# Check membership
SISMEMBER user:1001:interests "gaming"

# Remove member
SREM user:1001:interests "music"

# Count
SCARD user:1001:interests

# Set operations
SADD user:1001:friends "alice" "bob"
SADD user:1002:friends "bob" "charlie"

SINTER user:1001:friends user:1002:friends  # Intersection: bob
SUNION user:1001:friends user:1002:friends  # Union: alice, bob, charlie
SDIFF user:1001:friends user:1002:friends   # Difference: alice

# Random member
SRANDMEMBER user:1001:interests
SPOP user:1001:interests  # Random + remove
```

### 5. Sorted Sets
Sets ordered by score.

```bash
# Add with score
ZADD leaderboard 100 "player1"
ZADD leaderboard 200 "player2"
ZADD leaderboard 150 "player3"

# Get by rank
ZRANGE leaderboard 0 -1  # All, ascending
ZRANGE leaderboard 0 -1 WITHSCORES

# Get by score
ZRANGEBYSCORE leaderboard 100 200

# Reverse order
ZREVRANGE leaderboard 0 9  # Top 10

# Rank
ZRANK leaderboard "player1"  # Position (0-based)

# Score
ZSCORE leaderboard "player1"

# Increment score
ZINCRBY leaderboard 10 "player1"

# Count
ZCARD leaderboard

# Remove
ZREM leaderboard "player3"
```

## Redis in C#

### Installation
```bash
dotnet add package StackExchange.Redis
```

### Connection

```csharp
using StackExchange.Redis;

var redis = ConnectionMultiplexer.Connect("localhost:6379");
var db = redis.GetDatabase();
```

### Strings

```csharp
// Set and get
db.StringSet("user:1001:name", "John Doe");
string name = db.StringGet("user:1001:name");

// With expiration
db.StringSet("session:abc", "data", TimeSpan.FromMinutes(30));

// Increment
long counter = db.StringIncrement("counter");
db.StringDecrement("counter");

// Conditional set
bool wasSet = db.StringSet("lock:resource1", "locked", when: When.NotExists);
```

### Hashes

```csharp
// Set fields
db.HashSet("user:1001", new HashEntry[]
{
    new HashEntry("name", "John"),
    new HashEntry("email", "john@example.com"),
    new HashEntry("age", "30")
});

// Get field
string email = db.HashGet("user:1001", "email");

// Get all
HashEntry[] user = db.HashGetAll("user:1001");

// Increment
long newAge = db.HashIncrement("user:1001", "age");
```

### Lists

```csharp
// Push
db.ListLeftPush("recent:products", "LAPTOP001");
db.ListRightPush("queue:tasks", "task1");

// Pop
string product = db.ListLeftPop("recent:products");

// Range
RedisValue[] products = db.ListRange("recent:products", 0, 9);

// Length
long length = db.ListLength("recent:products");
```

### Sets

```csharp
// Add
db.SetAdd("user:1001:interests", new RedisValue[] { "gaming", "coding" });

// Members
RedisValue[] interests = db.SetMembers("user:1001:interests");

// Contains
bool hasGaming = db.SetContains("user:1001:interests", "gaming");

// Set operations
RedisValue[] common = db.SetCombine(SetOperation.Intersect,
    "user:1001:friends", "user:1002:friends");
```

### Sorted Sets

```csharp
// Add with score
db.SortedSetAdd("leaderboard", "player1", 100);
db.SortedSetAdd("leaderboard", "player2", 200);

// Get by rank
SortedSetEntry[] top10 = db.SortedSetRangeByRankWithScores("leaderboard", 0, 9, Order.Descending);

// Get rank
long? rank = db.SortedSetRank("leaderboard", "player1");

// Get score
double? score = db.SortedSetScore("leaderboard", "player1");

// Increment
double newScore = db.SortedSetIncrement("leaderboard", "player1", 10);
```

## Common Use Cases

### 1. Caching

```csharp
public async Task<Product> GetProduct(int id)
{
    string cacheKey = $"product:{id}";

    // Try cache first
    string cached = await db.StringGetAsync(cacheKey);
    if (cached != null)
    {
        return JsonSerializer.Deserialize<Product>(cached);
    }

    // Cache miss - get from database
    var product = await _repository.GetByIdAsync(id);

    // Store in cache
    await db.StringSetAsync(
        cacheKey,
        JsonSerializer.Serialize(product),
        TimeSpan.FromHours(1));

    return product;
}
```

### 2. Session Store

```csharp
public class SessionService
{
    public async Task SetSessionAsync(string sessionId, SessionData data)
    {
        await db.HashSetAsync($"session:{sessionId}", new HashEntry[]
        {
            new HashEntry("userId", data.UserId),
            new HashEntry("loginTime", data.LoginTime.ToString()),
            new HashEntry("cartItems", data.CartItems)
        });

        await db.KeyExpireAsync($"session:{sessionId}", TimeSpan.FromMinutes(30));
    }

    public async Task<SessionData> GetSessionAsync(string sessionId)
    {
        var hash = await db.HashGetAllAsync($"session:{sessionId}");
        if (hash.Length == 0) return null;

        return new SessionData
        {
            UserId = (int)hash.First(h => h.Name == "userId").Value,
            LoginTime = DateTime.Parse(hash.First(h => h.Name == "loginTime").Value),
            CartItems = (int)hash.First(h => h.Name == "cartItems").Value
        };
    }
}
```

### 3. Rate Limiting

```csharp
public async Task<bool> IsRateLimitedAsync(string userId, int maxRequests = 100)
{
    string key = $"ratelimit:{userId}:{DateTime.UtcNow:yyyyMMddHH}";

    long count = await db.StringIncrementAsync(key);

    if (count == 1)
    {
        await db.KeyExpireAsync(key, TimeSpan.FromHours(1));
    }

    return count > maxRequests;
}
```

### 4. Leaderboard

```csharp
public class LeaderboardService
{
    public async Task AddScoreAsync(string playerId, double score)
    {
        await db.SortedSetAddAsync("leaderboard", playerId, score);
    }

    public async Task<List<LeaderboardEntry>> GetTopAsync(int count)
    {
        var entries = await db.SortedSetRangeByRankWithScoresAsync(
            "leaderboard",
            0,
            count - 1,
            Order.Descending);

        return entries.Select((e, index) => new LeaderboardEntry
        {
            Rank = index + 1,
            PlayerId = e.Element,
            Score = e.Score
        }).ToList();
    }
}
```

### 5. Distributed Lock

```csharp
public async Task<bool> AcquireLockAsync(string resource, string lockId, TimeSpan expiry)
{
    return await db.StringSetAsync(
        $"lock:{resource}",
        lockId,
        expiry,
        When.NotExists);
}

public async Task ReleaseLockAsync(string resource, string lockId)
{
    var script = @"
        if redis.call('get', KEYS[1]) == ARGV[1] then
            return redis.call('del', KEYS[1])
        else
            return 0
        end";

    await db.ScriptEvaluateAsync(script,
        new RedisKey[] { $"lock:{resource}" },
        new RedisValue[] { lockId });
}
```

## Pub/Sub

```csharp
// Publisher
await db.PublishAsync("notifications", "New message!");

// Subscriber
var subscriber = redis.GetSubscriber();
await subscriber.SubscribeAsync("notifications", (channel, message) =>
{
    Console.WriteLine($"Received: {message}");
});
```

## Persistence

### RDB (Snapshot)
Periodic snapshots of dataset.

```bash
SAVE  # Blocking save
BGSAVE  # Background save
```

### AOF (Append-Only File)
Logs every write operation.

```bash
# redis.conf
appendonly yes
appendfsync everysec  # or always, or no
```

## Key Expiration

```csharp
// Set TTL
db.StringSet("temp:data", "value");
db.KeyExpire("temp:data", TimeSpan.FromSeconds(60));

// Get TTL
TimeSpan? ttl = db.KeyTimeToLive("temp:data");

// Remove expiration
db.KeyPersist("temp:data");
```

## Interview Tips

- Know different data structures and use cases
- Understand in-memory vs persistent storage
- Explain caching strategies (cache-aside, write-through)
- Know common patterns (rate limiting, session, leaderboard)
- Understand pub/sub messaging
- Know persistence options (RDB vs AOF)
- Explain atomic operations

## Best Practices

1. **Use appropriate data structure** for the use case
2. **Set TTL** on cache entries
3. **Use pipelining** for multiple commands
4. **Avoid large keys** (memory fragmentation)
5. **Monitor memory** usage
6. **Use connection pooling** (StackExchange.Redis does this)
7. **Handle failures** gracefully (cache miss should work)

## Key Takeaways

1. Redis is extremely fast (in-memory)
2. Choose right data structure for use case
3. Perfect for caching, sessions, real-time
4. All operations are atomic
5. TTL for automatic expiration
6. Persistence is optional
7. Great for distributed systems (cache, locks, pub/sub)
