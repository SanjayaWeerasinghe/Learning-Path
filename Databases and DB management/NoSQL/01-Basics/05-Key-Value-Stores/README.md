# Key-Value Stores

## What are Key-Value Stores?

Simplest NoSQL database model that stores data as a collection of key-value pairs, like a hash table or dictionary.

```
Key          →  Value
"user:1001"  →  "{ name: 'John', email: 'john@example.com' }"
"session:abc"→  "{ userId: 1001, loginTime: ... }"
"counter:api"→  "12345"
```

## Characteristics

- **Simple**: Just key and value
- **Fast**: O(1) lookups
- **Scalable**: Easy to partition by key
- **Flexible**: Value can be any data type
- **No queries**: Only key-based retrieval

## Popular Key-Value Stores

### Redis
- **In-memory**: Extremely fast
- **Data structures**: Strings, Lists, Sets, Hashes
- **Use**: Caching, sessions, real-time

### Amazon DynamoDB
- **Fully managed**: AWS service
- **Auto-scaling**: Handles traffic spikes
- **Use**: Web applications, mobile backends

### Riak
- **Distributed**: Built for high availability
- **Fault-tolerant**: No single point of failure
- **Use**: Large-scale distributed systems

### etcd
- **Distributed**: Consistent key-value store
- **Kubernetes**: Used for cluster configuration
- **Use**: Configuration management, service discovery

## Basic Operations

### Put (Set)
```
PUT user:1001 "John Doe"
```

### Get (Retrieve)
```
GET user:1001
→ "John Doe"
```

### Delete
```
DELETE user:1001
```

### Exists
```
EXISTS user:1001
→ true or false
```

## Value Types

### 1. Simple Values

```csharp
// String
db.StringSet("config:api_key", "abc123xyz");

// Number
db.StringSet("counter:visits", "1000");
db.StringIncrement("counter:visits");
```

### 2. Serialized Objects

```csharp
var user = new User
{
    Id = 1001,
    Name = "John Doe",
    Email = "john@example.com"
};

string json = JsonSerializer.Serialize(user);
db.StringSet("user:1001", json);

// Retrieve
string value = db.StringGet("user:1001");
User retrievedUser = JsonSerializer.Deserialize<User>(value);
```

### 3. Binary Data

```csharp
byte[] imageData = File.ReadAllBytes("profile.jpg");
db.StringSet("image:profile:1001", imageData);
```

## Use Cases

### 1. Caching

```csharp
public async Task<Product> GetProductAsync(int id)
{
    string key = $"product:{id}";

    // Try cache
    string cached = db.StringGet(key);
    if (cached != null)
    {
        return JsonSerializer.Deserialize<Product>(cached);
    }

    // Cache miss - fetch from database
    var product = await _database.GetProductAsync(id);

    // Store in cache with TTL
    db.StringSet(key, JsonSerializer.Serialize(product), TimeSpan.FromHours(1));

    return product;
}
```

### 2. Session Management

```csharp
public class SessionStore
{
    public void SaveSession(string sessionId, SessionData data)
    {
        string key = $"session:{sessionId}";
        string value = JsonSerializer.Serialize(data);

        db.StringSet(key, value, TimeSpan.FromMinutes(30));
    }

    public SessionData GetSession(string sessionId)
    {
        string key = $"session:{sessionId}";
        string value = db.StringGet(key);

        return value != null
            ? JsonSerializer.Deserialize<SessionData>(value)
            : null;
    }

    public void DeleteSession(string sessionId)
    {
        db.KeyDelete($"session:{sessionId}");
    }
}
```

### 3. Configuration Management

```csharp
public class ConfigService
{
    public void SetConfig(string key, string value)
    {
        db.StringSet($"config:{key}", value);
    }

    public string GetConfig(string key, string defaultValue = null)
    {
        string value = db.StringGet($"config:{key}");
        return value ?? defaultValue;
    }

    public Dictionary<string, string> GetAllConfigs()
    {
        var server = db.Multiplexer.GetServer("localhost:6379");
        var keys = server.Keys(pattern: "config:*");

        var configs = new Dictionary<string, string>();
        foreach (var key in keys)
        {
            configs[key] = db.StringGet(key);
        }

        return configs;
    }
}
```

### 4. Rate Limiting

```csharp
public class RateLimiter
{
    public bool IsAllowed(string userId, int maxRequests = 100, int windowSeconds = 60)
    {
        string key = $"ratelimit:{userId}";

        long current = db.StringIncrement(key);

        if (current == 1)
        {
            db.KeyExpire(key, TimeSpan.FromSeconds(windowSeconds));
        }

        return current <= maxRequests;
    }
}

// Usage
if (!rateLimiter.IsAllowed("user123", maxRequests: 100))
{
    return StatusCode(429, "Too Many Requests");
}
```

### 5. Feature Flags

```csharp
public class FeatureFlagService
{
    public void EnableFeature(string featureName)
    {
        db.StringSet($"feature:{featureName}", "enabled");
    }

    public void DisableFeature(string featureName)
    {
        db.StringSet($"feature:{featureName}", "disabled");
    }

    public bool IsFeatureEnabled(string featureName)
    {
        string value = db.StringGet($"feature:{featureName}");
        return value == "enabled";
    }
}

// Usage
if (featureFlags.IsFeatureEnabled("new-checkout"))
{
    // Use new checkout flow
}
```

## Key Design Patterns

### 1. Namespacing

Use prefixes to organize keys:

```
user:1001:profile
user:1001:settings
user:1001:sessions

product:5678:details
product:5678:inventory

cache:api:weather
cache:api:stocks
```

### 2. Hierarchical Keys

```
app:production:database:host
app:production:database:port
app:staging:database:host
app:staging:database:port
```

### 3. Expiring Keys

```csharp
// Temporary data with TTL
db.StringSet("otp:user123", "123456", TimeSpan.FromMinutes(5));
db.StringSet("token:reset:abc", "token_value", TimeSpan.FromHours(24));
```

### 4. Counter Pattern

```csharp
// Page views
db.StringIncrement("pageviews:home");
db.StringIncrement("pageviews:about");

// Analytics
db.StringIncrement($"analytics:{DateTime.UtcNow:yyyyMMdd}:visits");
```

## Limitations

### 1. No Complex Queries
```csharp
// Can't do: Find all users in city "NYC"
// Must know the exact key

// Workaround: Use secondary index
db.SetAdd("users:city:NYC", "user:1001");
db.SetAdd("users:city:NYC", "user:1002");

// Retrieve all NYC users
var userKeys = db.SetMembers("users:city:NYC");
```

### 2. No Transactions Across Keys
```csharp
// Redis transactions work on single key or predefined operations
var tran = db.CreateTransaction();
tran.StringSetAsync("key1", "value1");
tran.StringSetAsync("key2", "value2");
await tran.ExecuteAsync();
```

### 3. No Relationships
```csharp
// Can't JOIN users and orders
// Must handle in application code

var user = db.StringGet("user:1001");
var orderKeys = db.SetMembers("user:1001:orders");

foreach (var orderKey in orderKeys)
{
    var order = db.StringGet(orderKey);
    // Process order
}
```

## Performance Considerations

### 1. Key Size
```csharp
// Bad: Long keys waste memory
db.StringSet("application:production:user:profile:1001:settings", "value");

// Good: Short but descriptive
db.StringSet("app:prod:user:1001:settings", "value");
```

### 2. Value Size
```csharp
// Bad: Storing large objects
db.StringSet("user:1001", JsonSerializer.Serialize(userWithAllData)); // 1MB

// Good: Store only needed data
db.StringSet("user:1001:profile", JsonSerializer.Serialize(basicProfile)); // 1KB
db.StringSet("user:1001:orders", JsonSerializer.Serialize(orderIds)); // Separate
```

### 3. Pipelining

```csharp
// Bad: Multiple round trips
for (int i = 0; i < 1000; i++)
{
    db.StringSet($"key:{i}", $"value:{i}");
}

// Good: Batch operations
var batch = db.CreateBatch();
var tasks = new List<Task>();

for (int i = 0; i < 1000; i++)
{
    tasks.Add(batch.StringSetAsync($"key:{i}", $"value:{i}"));
}

batch.Execute();
await Task.WhenAll(tasks);
```

## Amazon DynamoDB Example

```csharp
// Install: AWSSDK.DynamoDBv2

var client = new AmazonDynamoDBClient();

// Put item
await client.PutItemAsync(new PutItemRequest
{
    TableName = "Users",
    Item = new Dictionary<string, AttributeValue>
    {
        { "UserId", new AttributeValue { S = "user123" } },
        { "Name", new AttributeValue { S = "John Doe" } },
        { "Email", new AttributeValue { S = "john@example.com" } }
    }
});

// Get item
var response = await client.GetItemAsync(new GetItemRequest
{
    TableName = "Users",
    Key = new Dictionary<string, AttributeValue>
    {
        { "UserId", new AttributeValue { S = "user123" } }
    }
});

string name = response.Item["Name"].S;
```

## Interview Tips

- Explain O(1) lookup performance
- Know use cases (caching, sessions, config)
- Understand limitations (no complex queries)
- Discuss key naming conventions
- Know TTL for automatic expiration
- Explain when to use vs document stores
- Discuss scaling strategies

## Best Practices

1. **Use descriptive key names**: Include context in key
2. **Namespace keys**: Organize with prefixes
3. **Set TTL appropriately**: Avoid memory bloat
4. **Keep values small**: Split large objects
5. **Use batch operations**: Reduce network overhead
6. **Monitor memory usage**: Keys and values consume RAM
7. **Plan for growth**: Consider partitioning strategy

## Key Takeaways

1. Key-value stores are simplest NoSQL type
2. Extremely fast O(1) lookups by key
3. Perfect for caching and sessions
4. Limited querying capabilities
5. Scale by partitioning keys
6. Redis is most popular in-memory KV store
7. DynamoDB is fully managed cloud option
