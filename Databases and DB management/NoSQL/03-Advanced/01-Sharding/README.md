# Sharding

## What is Sharding?

Horizontal partitioning that distributes data across multiple servers (shards) to handle large datasets and high throughput that a single server cannot handle.

## Why Shard?

- **Scalability**: Handle data beyond single server capacity
- **Performance**: Distribute load across multiple servers
- **High Availability**: Isolate failures to specific shards
- **Geographic Distribution**: Data closer to users

## Sharding vs Replication

```
Replication:
Server 1: [All Data]
Server 2: [All Data] (copy)
Server 3: [All Data] (copy)
Purpose: Redundancy & availability

Sharding:
Server 1: [Data A-F]
Server 2: [Data G-M]
Server 3: [Data N-Z]
Purpose: Scale storage & throughput
```

## MongoDB Sharding Architecture

```
                    ┌─────────────┐
                    │   mongos    │ (Query Router)
                    └─────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐        ┌────▼────┐       ┌────▼────┐
   │ Shard 1 │        │ Shard 2 │       │ Shard 3 │
   │ (RS)    │        │ (RS)    │       │ (RS)    │
   └─────────┘        └─────────┘       └─────────┘

   Config Servers (metadata about chunk locations)
```

### Components

1. **Shards**: Each shard is a replica set containing subset of data
2. **mongos**: Query router that directs operations to appropriate shards
3. **Config Servers**: Store metadata and configuration

## Shard Key Selection

### Critical Decision: Shard Key

```javascript
// Shard key determines how data is distributed
sh.shardCollection("ecommerce.orders", { customerId: 1 })
```

### Good Shard Keys

```javascript
// 1. High Cardinality (many distinct values)
sh.shardCollection("ecommerce.orders", { orderId: 1 })  // UUID or auto-increment

// 2. Compound shard key (better distribution)
sh.shardCollection("ecommerce.orders", { customerId: 1, orderDate: 1 })

// 3. Hashed shard key (even distribution)
sh.shardCollection("ecommerce.products", { _id: "hashed" })
```

### Bad Shard Keys

```javascript
// 1. Low cardinality (few distinct values)
sh.shardCollection("ecommerce.orders", { status: 1 })  // Only: pending, completed, cancelled

// 2. Monotonically increasing (hotspot)
sh.shardCollection("ecommerce.logs", { timestamp: 1 })  // All new writes go to same shard

// 3. Non-unique field with skewed distribution
sh.shardCollection("ecommerce.products", { category: 1 })  // Electronics might have 80% of data
```

## Shard Key Patterns

### Range-Based Sharding

```javascript
sh.shardCollection("ecommerce.orders", { customerId: 1 })

// Distribution:
// Shard 1: customerId 1-1000
// Shard 2: customerId 1001-2000
// Shard 3: customerId 2001-3000
```

**Pros**: Range queries efficient
**Cons**: Risk of hotspots

### Hashed Sharding

```javascript
sh.shardCollection("ecommerce.products", { _id: "hashed" })

// Distribution:
// Shard 1: hash(_id) % 3 == 0
// Shard 2: hash(_id) % 3 == 1
// Shard 3: hash(_id) % 3 == 2
```

**Pros**: Even distribution
**Cons**: Range queries scatter across all shards

### Zone/Tag-Based Sharding

```javascript
// Geographic sharding
sh.addShardTag("shard01", "US")
sh.addShardTag("shard02", "EU")
sh.addShardTag("shard03", "ASIA")

sh.addTagRange(
  "ecommerce.users",
  { country: "US", userId: MinKey },
  { country: "US", userId: MaxKey },
  "US"
)

sh.shardCollection("ecommerce.users", { country: 1, userId: 1 })
```

## MongoDB Sharding Setup

```javascript
// 1. Enable sharding on database
sh.enableSharding("ecommerce")

// 2. Shard collection
sh.shardCollection("ecommerce.orders", { customerId: 1, orderDate: 1 })

// 3. Check sharding status
sh.status()

// 4. Check collection distribution
db.orders.getShardDistribution()
```

## Sharding in C#

```csharp
// Connection to sharded cluster (connect to mongos)
var connectionString = "mongodb://mongos1:27017,mongos2:27017/";
var client = new MongoClient(connectionString);
var database = client.GetDatabase("ecommerce");

// Application code remains the same
var collection = database.GetCollection<Order>("orders");

// Queries automatically routed to correct shard(s)
var order = await collection.Find(o => o.CustomerId == 123).FirstOrDefaultAsync();

// Targeted query (goes to single shard)
var customerOrders = await collection
    .Find(o => o.CustomerId == 123)  // Shard key in filter
    .ToListAsync();

// Scatter-gather query (goes to all shards)
var expensiveOrders = await collection
    .Find(o => o.Total > 1000)  // No shard key
    .ToListAsync();
```

## Chunk Management

### What are Chunks?

Contiguous ranges of shard key values (default 128MB).

```javascript
// View chunks
use config
db.chunks.find({ ns: "ecommerce.orders" }).pretty()

// Example chunk:
{
  "_id": ObjectId("..."),
  "ns": "ecommerce.orders",
  "min": { "customerId": 1 },
  "max": { "customerId": 1000 },
  "shard": "shard01"
}
```

### Chunk Splitting

```javascript
// Automatic splitting when chunk exceeds size limit
// Manual split
sh.splitAt("ecommerce.orders", { customerId: 5000 })

// Split at specific point
sh.splitFind("ecommerce.orders", { customerId: 7500 })
```

### Balancer

Automatically migrates chunks between shards for even distribution.

```javascript
// Check balancer status
sh.getBalancerState()

// Enable/disable balancer
sh.setBalancerState(true)
sh.setBalancerState(false)

// Schedule balancer window
use config
db.settings.update(
  { _id: "balancer" },
  { $set: { activeWindow: { start: "01:00", stop: "05:00" } } },
  { upsert: true }
)
```

## Query Routing

### Targeted Query (Single Shard)

```javascript
// Query includes shard key
db.orders.find({ customerId: 123 })

// Execution:
mongos → checks config → routes to Shard 2 only
```

### Broadcast Query (All Shards)

```javascript
// Query doesn't include shard key
db.orders.find({ status: "pending" })

// Execution:
mongos → broadcasts to all shards → merges results
```

### Performance Implications

```csharp
// Good: Targeted query (includes shard key)
var orders = await collection
    .Find(o => o.CustomerId == 123 && o.Status == "pending")
    .ToListAsync();
// Hits: 1 shard

// Bad: Broadcast query (no shard key)
var pendingOrders = await collection
    .Find(o => o.Status == "pending")
    .ToListAsync();
// Hits: All shards (slower)
```

## Cassandra Sharding (Partitioning)

### Partition Key

```sql
CREATE TABLE orders (
    customer_id INT,
    order_date DATE,
    order_id UUID,
    total DECIMAL,
    PRIMARY KEY ((customer_id), order_date, order_id)
);
-- Partition key: customer_id
-- Clustering columns: order_date, order_id
```

### Token Ring

```
Cassandra uses consistent hashing:

Token Range:    -2^63 to 2^63-1

Node 1: -2^63 to -1
Node 2: 0 to 2^63/2
Node 3: 2^63/2 to 2^63-1

Hash(customer_id) → Token → Node
```

### C# with Cassandra

```csharp
var cluster = Cluster.Builder()
    .AddContactPoints("node1", "node2", "node3")
    .Build();
var session = cluster.Connect("ecommerce");

// Query with partition key (efficient - single node)
var statement = new SimpleStatement(
    "SELECT * FROM orders WHERE customer_id = ?",
    123);
var result = await session.ExecuteAsync(statement);

// Query without partition key (inefficient - all nodes)
var allOrders = await session.ExecuteAsync(
    "SELECT * FROM orders WHERE status = 'pending' ALLOW FILTERING");
```

## Redis Cluster Sharding

### Hash Slots

```
Redis Cluster divides keyspace into 16,384 hash slots

Slot = CRC16(key) % 16384

Master 1: slots 0-5460
Master 2: slots 5461-10922
Master 3: slots 10923-16383
```

### Configuration

```bash
# Create cluster
redis-cli --cluster create \
  node1:6379 node2:6379 node3:6379 \
  node4:6379 node5:6379 node6:6379 \
  --cluster-replicas 1

# Check cluster info
redis-cli cluster info
redis-cli cluster nodes
```

### C# with Redis Cluster

```csharp
var connection = ConnectionMultiplexer.Connect("node1:6379,node2:6379,node3:6379");
var db = connection.GetDatabase();

// Automatic routing to correct node
await db.StringSetAsync("user:123", "John Doe");
await db.StringSetAsync("user:456", "Jane Smith");

// Hash tags for multi-key operations (same slot)
await db.StringSetAsync("{user:123}:name", "John");
await db.StringSetAsync("{user:123}:email", "john@example.com");

// Both keys go to same node (hash of "user:123")
var batch = db.CreateBatch();
batch.StringGetAsync("{user:123}:name");
batch.StringGetAsync("{user:123}:email");
batch.Execute();
```

## Sharding Challenges

### 1. Joins Across Shards

```csharp
// Problem: Can't efficiently join data across shards
// Solution: Denormalize or use application-level joins

public async Task<OrderWithCustomer> GetOrderWithCustomer(int orderId)
{
    // Two separate queries
    var order = await _ordersCollection.Find(o => o.Id == orderId).FirstOrDefaultAsync();
    var customer = await _customersCollection.Find(c => c.Id == order.CustomerId).FirstOrDefaultAsync();

    return new OrderWithCustomer
    {
        Order = order,
        Customer = customer
    };
}
```

### 2. Transactions Across Shards

```csharp
// MongoDB supports multi-shard transactions (4.2+)
using var session = await client.StartSessionAsync();
session.StartTransaction();

try
{
    // Operations can span multiple shards
    await collection1.InsertOneAsync(session, doc1);
    await collection2.UpdateOneAsync(session, filter, update);

    await session.CommitTransactionAsync();
}
catch
{
    await session.AbortTransactionAsync();
    throw;
}
```

### 3. Hotspot Shards

```javascript
// Problem: One shard gets more traffic
// Cause: Poor shard key (e.g., timestamp)

// Solution: Use compound shard key
sh.shardCollection("logs", { appId: 1, timestamp: 1 })
// Or hashed shard key
sh.shardCollection("logs", { _id: "hashed" })
```

### 4. Rebalancing

```javascript
// Adding new shard
sh.addShard("shard04/mongodb4:27017")

// Balancer automatically redistributes chunks
// Monitor migration progress
sh.status()
```

## Monitoring Sharded Cluster

```javascript
// Shard distribution
db.orders.getShardDistribution()

// Output:
// Shard shard01: 450000 docs (33%)
// Shard shard02: 500000 docs (37%)
// Shard shard03: 400000 docs (30%)

// Chunk distribution
use config
db.chunks.aggregate([
  { $group: { _id: "$shard", count: { $sum: 1 } } }
])

// Current operations on shards
db.currentOp()
```

### C# Monitoring

```csharp
public async Task<ShardStats> GetShardStatistics()
{
    var adminDb = client.GetDatabase("admin");
    var command = new BsonDocument("shardDistribution", "ecommerce.orders");
    var result = await adminDb.RunCommandAsync<BsonDocument>(command);

    return new ShardStats
    {
        TotalDocs = result["totalDocs"].AsInt64,
        TotalSize = result["totalSize"].AsInt64,
        ShardDistribution = result["shards"].AsBsonArray
            .Select(s => new ShardInfo
            {
                Name = s["name"].AsString,
                Docs = s["docs"].AsInt64,
                Size = s["size"].AsInt64
            }).ToList()
    };
}
```

## Best Practices

1. **Choose shard key carefully**: Cannot be changed later
2. **High cardinality**: Many distinct values
3. **Even distribution**: Avoid hotspots
4. **Query patterns**: Include shard key in queries
5. **Monitor balancer**: Ensure chunks are balanced
6. **Plan for growth**: Consider future data volume
7. **Test before production**: Simulate real workload

## Anti-Patterns

```javascript
// 1. Monotonically increasing shard key
sh.shardCollection("logs", { timestamp: 1 })  // ❌ All writes to one shard

// 2. Low cardinality
sh.shardCollection("users", { country: 1 })  // ❌ Few unique values

// 3. Shard key not in queries
sh.shardCollection("orders", { customerId: 1 })
db.orders.find({ orderId: "12345" })  // ❌ Broadcasts to all shards

// 4. Small collection
sh.shardCollection("config", { key: 1 })  // ❌ Overhead not worth it
```

## Interview Tips

- Explain sharding vs replication
- Know shard key selection criteria
- Understand chunk migration
- Explain targeted vs broadcast queries
- Discuss sharding challenges (joins, transactions)
- Know when NOT to shard
- Understand consistent hashing (Cassandra, Redis)

## Key Takeaways

1. Sharding enables horizontal scalability
2. Shard key is most critical decision
3. Good shard key: high cardinality, even distribution
4. Include shard key in queries for performance
5. Sharding adds complexity (joins, transactions)
6. Monitor chunk distribution
7. Different databases use different sharding strategies
