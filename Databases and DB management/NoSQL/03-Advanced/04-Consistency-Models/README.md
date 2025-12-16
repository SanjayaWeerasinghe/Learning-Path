# Consistency Models

## CAP Theorem Revisited

```
CAP Theorem: Choose 2 of 3

┌─────────────┐
│ Consistency │ ◄─┐
└─────────────┘   │
                  │  Can only
┌─────────────┐   │  guarantee 2
│ Availability│ ◄─┤
└─────────────┘   │
                  │
┌─────────────┐   │
│ Partition   │ ◄─┘
│ Tolerance   │
└─────────────┘

Reality: Partitions will happen, so choose:
- CP: Consistency + Partition Tolerance (MongoDB, HBase)
- AP: Availability + Partition Tolerance (Cassandra, DynamoDB)
```

## Consistency Levels

### Strong Consistency

Every read receives the most recent write.

```
Write: X = 10
  ↓
All replicas updated
  ↓
Read: X = 10 ✅ (always latest)
```

**MongoDB with Write/Read Concern Majority:**

```csharp
// Strong consistency
var collection = database.GetCollection<Order>("orders");

// Write to majority
await collection.InsertOneAsync(
    order,
    new InsertOneOptions
    {
        WriteConcern = WriteConcern.WMajority
    });

// Read from majority
var orders = await collection
    .WithReadConcern(ReadConcern.Majority)
    .WithReadPreference(ReadPreference.Primary)
    .Find(o => o.CustomerId == 123)
    .ToListAsync();
```

### Eventual Consistency

Replicas will eventually converge, but reads may return stale data.

```
Write: X = 10
  ↓
Primary updated
  ↓ (replication lag)
Read from secondary: X = 5 (stale)
  ↓ (after some time)
Read from secondary: X = 10 ✅
```

**MongoDB with Eventual Consistency:**

```csharp
// Eventual consistency (faster, may be stale)
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.ReadPreference = ReadPreference.SecondaryPreferred;
settings.WriteConcern = WriteConcern.W1;  // Primary only

var client = new MongoClient(settings);
var collection = client.GetDatabase("ecommerce").GetCollection<Product>("products");

// May read stale data from secondary
var products = await collection
    .Find(p => p.Category == "Electronics")
    .ToListAsync();
```

### Causal Consistency

Reads respect causality (if read A caused write B, all subsequent reads see B).

```
Session 1: Write A → Read A (sees A)
              ↓
Session 2:    Read A (sees A) → Write B → Read B (sees B)
```

**MongoDB Causal Consistency:**

```csharp
// Start session with causal consistency
using var session = await client.StartSessionAsync(new ClientSessionOptions
{
    CausalConsistency = true
});

// Write in session
await collection.InsertOneAsync(session, order);

// Subsequent reads in same session see causally consistent data
var orders = await collection
    .Find(session, o => o.CustomerId == order.CustomerId)
    .ToListAsync();
// Guaranteed to see the order just inserted
```

### Read Your Writes

You always see your own writes.

```csharp
// Use session to guarantee read-your-writes
using var session = await client.StartSessionAsync();

// Write
await collection.InsertOneAsync(session, new Product { Id = 123, Name = "Laptop" });

// Read (same session)
var product = await collection
    .Find(session, p => p.Id == 123)
    .FirstOrDefaultAsync();
// Guaranteed to see the product just inserted
```

## MongoDB Consistency Levels

### Write Concern

Controls acknowledgment level for writes.

```csharp
// w: 1 - Primary only (default, fast but risky)
WriteConcern.W1

// w: "majority" - Majority of replica set (safe, slower)
WriteConcern.WMajority

// w: 2 - At least 2 members
new WriteConcern(2)

// w: "majority" with journal
new WriteConcern("majority", journal: true)

// w: "majority" with timeout
new WriteConcern("majority", wTimeout: TimeSpan.FromSeconds(5))

// Example usage
await collection.InsertOneAsync(
    product,
    new InsertOneOptions
    {
        WriteConcern = new WriteConcern(
            "majority",
            journal: true,
            wTimeout: TimeSpan.FromSeconds(5))
    });
```

### Read Concern

Controls consistency of reads.

```csharp
// local - Default, may return stale data
ReadConcern.Local

// majority - Data acknowledged by majority (consistent)
ReadConcern.Majority

// linearizable - Read-your-writes guarantee
ReadConcern.Linearizable

// snapshot - Point-in-time snapshot (transactions)
ReadConcern.Snapshot

// Example usage
var products = await collection
    .WithReadConcern(ReadConcern.Majority)
    .Find(p => p.Category == "Electronics")
    .ToListAsync();
```

### Read Preference

Controls which replica set members to read from.

```csharp
// primary - Read from primary only (strong consistency)
ReadPreference.Primary

// primaryPreferred - Prefer primary, fallback to secondary
ReadPreference.PrimaryPreferred

// secondary - Read from secondary only (eventual consistency)
ReadPreference.Secondary

// secondaryPreferred - Prefer secondary, fallback to primary
ReadPreference.SecondaryPreferred

// nearest - Lowest network latency
ReadPreference.Nearest

// Example usage
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.ReadPreference = new ReadPreference(
    ReadPreferenceMode.SecondaryPreferred,
    new[] { new TagSet(new[] { new Tag("datacenter", "east") }) });

var client = new MongoClient(settings);
```

## Cassandra Consistency Levels

### Write Consistency

```csharp
// ONE - One replica acknowledges (fast, least consistent)
ConsistencyLevel.One

// TWO - Two replicas acknowledge
ConsistencyLevel.Two

// THREE - Three replicas acknowledge
ConsistencyLevel.Three

// QUORUM - Majority of replicas (balance)
ConsistencyLevel.Quorum

// ALL - All replicas (slow, most consistent)
ConsistencyLevel.All

// LOCAL_QUORUM - Majority in local datacenter
ConsistencyLevel.LocalQuorum

// EACH_QUORUM - Majority in each datacenter
ConsistencyLevel.EachQuorum

// Example usage
var statement = new SimpleStatement(
    "INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
    userId, name, email)
    .SetConsistencyLevel(ConsistencyLevel.Quorum);

await session.ExecuteAsync(statement);
```

### Read Consistency

```csharp
// Read with different consistency
var selectStatement = new SimpleStatement(
    "SELECT * FROM users WHERE id = ?",
    userId);

// Eventual consistency (fast)
selectStatement.SetConsistencyLevel(ConsistencyLevel.One);
var result1 = await session.ExecuteAsync(selectStatement);

// Strong consistency (slower)
selectStatement.SetConsistencyLevel(ConsistencyLevel.Quorum);
var result2 = await session.ExecuteAsync(selectStatement);
```

### Quorum Formula

```
Quorum = (Replication Factor / 2) + 1

Examples:
RF = 3: Quorum = (3/2) + 1 = 2
RF = 5: Quorum = (5/2) + 1 = 3

Strong Consistency:
Write Quorum + Read Quorum > Replication Factor

Example:
RF = 3, Write QUORUM (2), Read QUORUM (2)
2 + 2 > 3 ✅ Strong consistency
```

## Tunable Consistency

### MongoDB Tunable Consistency

```csharp
public class TunableRepository
{
    private readonly IMongoCollection<Order> _collection;

    // Strong consistency for critical operations
    public async Task<Order> CreateOrder(Order order)
    {
        await _collection.InsertOneAsync(
            order,
            new InsertOneOptions
            {
                WriteConcern = WriteConcern.WMajority
            });

        return await _collection
            .WithReadConcern(ReadConcern.Majority)
            .Find(o => o.Id == order.Id)
            .FirstOrDefaultAsync();
    }

    // Eventual consistency for analytics
    public async Task<List<Order>> GetOrdersForAnalytics()
    {
        return await _collection
            .WithReadPreference(ReadPreference.SecondaryPreferred)
            .WithReadConcern(ReadConcern.Local)
            .Find(_ => true)
            .ToListAsync();
    }
}
```

### Cassandra Tunable Consistency

```csharp
public class TunableRepository
{
    private readonly ISession _session;

    // Strong consistency for account balance
    public async Task<decimal> GetAccountBalance(int accountId)
    {
        var statement = new SimpleStatement(
            "SELECT balance FROM accounts WHERE account_id = ?",
            accountId)
            .SetConsistencyLevel(ConsistencyLevel.Quorum);  // Strong

        var result = await _session.ExecuteAsync(statement);
        return result.First().GetValue<decimal>("balance");
    }

    // Eventual consistency for product catalog
    public async Task<List<Product>> GetProducts()
    {
        var statement = new SimpleStatement("SELECT * FROM products")
            .SetConsistencyLevel(ConsistencyLevel.One);  // Eventual

        var result = await _session.ExecuteAsync(statement);
        return result.Select(row => MapToProduct(row)).ToList();
    }
}
```

## Handling Conflicts

### Last Write Wins (LWW)

```csharp
public class TimestampedDocument
{
    public string Id { get; set; }
    public string Value { get; set; }
    public long Timestamp { get; set; }  // Unix timestamp
}

// Update only if newer
var filter = Builders<TimestampedDocument>.Filter.And(
    Builders<TimestampedDocument>.Filter.Eq(d => d.Id, id),
    Builders<TimestampedDocument>.Filter.Lt(d => d.Timestamp, newTimestamp));

var update = Builders<TimestampedDocument>.Update
    .Set(d => d.Value, newValue)
    .Set(d => d.Timestamp, newTimestamp);

var result = await collection.UpdateOneAsync(filter, update);

if (result.ModifiedCount == 0)
{
    // Conflict: newer write already exists
}
```

### Vector Clocks

```csharp
public class VectorClock
{
    public Dictionary<string, int> Clock { get; set; } = new();

    public void Increment(string nodeId)
    {
        if (Clock.ContainsKey(nodeId))
            Clock[nodeId]++;
        else
            Clock[nodeId] = 1;
    }

    public bool HappenedBefore(VectorClock other)
    {
        bool atLeastOneLess = false;

        foreach (var nodeId in Clock.Keys.Union(other.Clock.Keys))
        {
            var thisValue = Clock.GetValueOrDefault(nodeId, 0);
            var otherValue = other.Clock.GetValueOrDefault(nodeId, 0);

            if (thisValue > otherValue)
                return false;

            if (thisValue < otherValue)
                atLeastOneLess = true;
        }

        return atLeastOneLess;
    }

    public bool IsConcurrent(VectorClock other)
    {
        return !HappenedBefore(other) && !other.HappenedBefore(this);
    }
}

public class VersionedDocument
{
    public string Id { get; set; }
    public string Value { get; set; }
    public VectorClock Version { get; set; }
}
```

### Application-Level Conflict Resolution

```csharp
public class ConflictResolver
{
    public Product ResolveConflict(Product local, Product remote)
    {
        // Business rules for conflict resolution
        return new Product
        {
            Id = local.Id,

            // Take the latest name
            Name = remote.ModifiedDate > local.ModifiedDate
                ? remote.Name
                : local.Name,

            // Take the lower price (business rule)
            Price = Math.Min(local.Price, remote.Price),

            // Sum the quantities (inventory)
            Stock = local.Stock + remote.Stock,

            // Use latest timestamp
            ModifiedDate = remote.ModifiedDate > local.ModifiedDate
                ? remote.ModifiedDate
                : local.ModifiedDate
        };
    }
}
```

## Redis Consistency

### Master-Replica Replication

```csharp
// Redis is eventually consistent by default
var connection = ConnectionMultiplexer.Connect("master:6379,replica1:6379,replica2:6379");

var db = connection.GetDatabase();

// Write to master
await db.StringSetAsync("key", "value");

// Read from replica (may be stale)
var value = await db.StringGetAsync("key");
```

### WAIT Command

```csharp
// Wait for replication before continuing
public async Task<bool> WriteWithReplication(string key, string value)
{
    var db = connection.GetDatabase();

    // Write to master
    await db.StringSetAsync(key, value);

    // Wait for at least 2 replicas to acknowledge
    var server = connection.GetServer(connection.GetEndPoints().First());
    var replicated = await server.ExecuteAsync("WAIT", 2, 1000);  // 2 replicas, 1000ms timeout

    return (int)replicated >= 2;
}
```

## Consistency Guarantees in Transactions

### MongoDB Multi-Document Transactions

```csharp
// ACID transactions (strong consistency)
using var session = await client.StartSessionAsync();
session.StartTransaction(new TransactionOptions(
    readConcern: ReadConcern.Snapshot,
    writeConcern: WriteConcern.WMajority,
    readPreference: ReadPreference.Primary));

try
{
    // Deduct from account A
    await accounts.UpdateOneAsync(
        session,
        a => a.Id == accountA,
        Builders<Account>.Update.Inc(a => a.Balance, -amount));

    // Add to account B
    await accounts.UpdateOneAsync(
        session,
        a => a.Id == accountB,
        Builders<Account>.Update.Inc(a => a.Balance, amount));

    await session.CommitTransactionAsync();
}
catch
{
    await session.AbortTransactionAsync();
    throw;
}
```

## Consistency vs Performance Trade-offs

```csharp
public class OrderService
{
    // Critical: Strong consistency (slower)
    public async Task PlaceOrder(Order order)
    {
        await _collection.InsertOneAsync(
            order,
            new InsertOneOptions
            {
                WriteConcern = WriteConcern.WMajority  // Wait for majority
            });
    }

    // Non-critical: Eventual consistency (faster)
    public async Task RecordPageView(string productId)
    {
        await _analytics.UpdateOneAsync(
            a => a.ProductId == productId,
            Builders<Analytics>.Update.Inc(a => a.Views, 1),
            new UpdateOptions
            {
                WriteConcern = WriteConcern.W1  // Fire and forget
            });
    }
}
```

## Interview Tips

- Explain CAP theorem and trade-offs
- Understand strong vs eventual consistency
- Know write/read concerns in MongoDB
- Explain quorum calculation in Cassandra
- Discuss conflict resolution strategies
- Understand tunable consistency
- Know when to choose each consistency level
- Explain consistency in transactions

## Best Practices

1. **Choose consistency based on use case**: Critical vs non-critical data
2. **Use majority write concern**: For important writes
3. **Use transactions when needed**: For multi-document consistency
4. **Monitor replication lag**: Eventual consistency depends on it
5. **Understand trade-offs**: Consistency vs availability vs latency
6. **Use causal consistency**: For related operations
7. **Test failure scenarios**: Network partitions, node failures
8. **Document consistency requirements**: Make it explicit in code

## Key Takeaways

1. Consistency is tunable in NoSQL databases
2. Strong consistency: Latest data, higher latency
3. Eventual consistency: May be stale, lower latency
4. Write concern controls write acknowledgment
5. Read concern controls read consistency
6. Quorum provides balance between consistency and availability
7. Different use cases need different consistency levels
8. Transactions provide ACID guarantees when needed
