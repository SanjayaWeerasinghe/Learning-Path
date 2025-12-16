# Replication

## What is Replication?

Process of synchronizing data across multiple servers to ensure high availability, fault tolerance, and data redundancy.

## MongoDB Replica Sets

### Architecture

```
Primary (Read/Write)
    ↓ (replicates to)
Secondary (Read only)
    ↓ (replicates to)
Secondary (Read only)
```

### Benefits

- **High Availability**: Automatic failover if primary fails
- **Data Redundancy**: Multiple copies of data
- **Read Scalability**: Distribute reads across secondaries
- **Disaster Recovery**: Geographic distribution

### Replica Set Setup

```javascript
// Initialize replica set
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb1:27017", priority: 2 },  // Primary (higher priority)
    { _id: 1, host: "mongodb2:27017", priority: 1 },  // Secondary
    { _id: 2, host: "mongodb3:27017", priority: 1 }   // Secondary
  ]
})

// Check status
rs.status()

// Add member
rs.add("mongodb4:27017")

// Remove member
rs.remove("mongodb4:27017")
```

### Primary Election

- **Heartbeat**: Members ping each other every 2 seconds
- **Election**: If primary fails, secondaries elect new primary
- **Majority**: Requires majority of members to elect
- **Priority**: Higher priority members preferred

### Read Preferences

```javascript
// Primary only (default)
db.products.find().readPref("primary")

// Primary preferred
db.products.find().readPref("primaryPreferred")

// Secondary only
db.products.find().readPref("secondary")

// Secondary preferred
db.products.find().readPref("secondaryPreferred")

// Nearest (lowest latency)
db.products.find().readPref("nearest")
```

### Write Concern

```javascript
// Wait for acknowledgment from majority
db.products.insertOne(
  { name: "Laptop" },
  { writeConcern: { w: "majority", wtimeout: 5000 } }
)

// Options:
// w: 1 - Primary only (default)
// w: "majority" - Majority of members
// w: 2 - At least 2 members
// w: "all" - All members
```

### Read Concern

```javascript
// Local - return most recent data (may rollback)
db.products.find().readConcern("local")

// Majority - return data acknowledged by majority
db.products.find().readConcern("majority")

// Linearizable - read own writes
db.products.find().readConcern("linearizable")
```

## MongoDB Replication in C#

```csharp
// Connection string with replica set
var connectionString = "mongodb://mongodb1:27017,mongodb2:27017,mongodb3:27017/?replicaSet=rs0";
var client = new MongoClient(connectionString);

// Read preference
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.ReadPreference = ReadPreference.SecondaryPreferred;
var client = new MongoClient(settings);

// Write concern
var collection = database.GetCollection<Product>("products");
var product = new Product { Name = "Laptop" };

await collection.InsertOneAsync(
    product,
    new InsertOneOptions
    {
        WriteConcern = WriteConcern.WMajority
    });

// Read concern
var products = await collection
    .WithReadConcern(ReadConcern.Majority)
    .Find(p => p.Category == "Electronics")
    .ToListAsync();
```

## Redis Replication

### Master-Slave Architecture

```
Master (Read/Write)
    ↓ (async replication)
Replica (Read only)
    ↓
Replica (Read only)
```

### Configuration

```bash
# On replica server (redis.conf)
replicaof master-host 6379
masterauth password  # if master has password

# Or runtime
REPLICAOF master-host 6379

# Check replication status
INFO replication
```

### Redis Sentinel (High Availability)

```bash
# sentinel.conf
sentinel monitor mymaster 127.0.0.1 6379 2  # 2 = quorum
sentinel down-after-milliseconds mymaster 5000
sentinel parallel-syncs mymaster 1
sentinel failover-timeout mymaster 10000

# Start sentinel
redis-sentinel /path/to/sentinel.conf
```

### Connecting to Redis with Sentinel (C#)

```csharp
var connection = ConnectionMultiplexer.Connect(
    "master-name,sentinel-host1:26379,sentinel-host2:26379,serviceName=mymaster");

var db = connection.GetDatabase();
```

## Cassandra Replication

### Replication Factor

```sql
-- Create keyspace with replication
CREATE KEYSPACE ecommerce
WITH REPLICATION = {
  'class': 'SimpleStrategy',
  'replication_factor': 3
};

-- NetworkTopologyStrategy (multi-datacenter)
CREATE KEYSPACE ecommerce
WITH REPLICATION = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 3,
  'datacenter2': 2
};
```

### Consistency Levels

```csharp
// Write consistency
await session.Execute(
    statement,
    ConsistencyLevel.Quorum);  // Majority must acknowledge

// Read consistency
await session.Execute(
    query,
    ConsistencyLevel.One);  // Read from any replica

// Consistency levels:
// ONE, TWO, THREE - Fixed number of replicas
// QUORUM - Majority
// ALL - All replicas
// LOCAL_QUORUM - Majority in local datacenter
```

## Conflict Resolution

### Last Write Wins (LWW)

```
Replica 1: Update field to "A" at timestamp 100
Replica 2: Update field to "B" at timestamp 101

Result: "B" wins (latest timestamp)
```

### Version Vectors

```javascript
// Each replica tracks version
{
  value: "data",
  vector: {
    replica1: 5,
    replica2: 3,
    replica3: 4
  }
}
```

### Application-Level Resolution

```csharp
public class ConflictResolver
{
    public Product Resolve(Product local, Product remote)
    {
        return new Product
        {
            // Merge logic
            Name = remote.ModifiedDate > local.ModifiedDate
                ? remote.Name
                : local.Name,

            Price = Math.Max(local.Price, remote.Price),  // Business rule

            Stock = local.Stock + remote.Stock  // Combine
        };
    }
}
```

## Monitoring Replication

### MongoDB

```javascript
// Replication lag
rs.printReplicationInfo()
rs.printSecondaryReplicationInfo()

// Oplog size
db.getReplicationInfo()
```

### Redis

```bash
# Replication offset (lag indicator)
INFO replication

# Output shows:
master_repl_offset:12345
slave_repl_offset:12340  # 5 bytes behind
```

## Replication Lag

### Causes

- High write load on primary
- Slow network between replicas
- Insufficient replica resources
- Large operations (index builds)

### Solutions

```javascript
// MongoDB: Increase oplog size
db.adminCommand({
  replSetResizeOplog: 1,
  size: 16000  // MB
})

// Use write concern with timeout
db.products.insertOne(
  { name: "Product" },
  { writeConcern: { w: "majority", wtimeout: 5000 } }
)
```

## Failover Testing

```javascript
// MongoDB: Step down primary
rs.stepDown(60)  // Step down for 60 seconds

// Application should automatically reconnect to new primary
```

## Interview Tips

- Explain replica set architecture
- Know primary election process
- Understand read/write concerns
- Discuss replication lag
- Know failover mechanism
- Explain CAP theorem in context
- Understand consistency levels

## Best Practices

1. **Odd number of members**: 3, 5, or 7 for election
2. **Geographically distributed**: Different datacenters
3. **Monitor replication lag**: Alert on high lag
4. **Use write concern "majority"**: For critical data
5. **Test failover**: Regularly test recovery
6. **Size oplog appropriately**: Based on write volume
7. **Use read preferences**: Distribute load

## Key Takeaways

1. Replication provides high availability
2. Automatic failover prevents downtime
3. Read preferences distribute load
4. Write concerns ensure data durability
5. Replication lag can cause stale reads
6. Majority write concern prevents data loss
7. Always use replica sets in production
