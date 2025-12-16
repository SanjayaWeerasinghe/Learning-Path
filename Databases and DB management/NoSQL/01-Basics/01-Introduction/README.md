# Introduction to NoSQL

## What is NoSQL?

**NoSQL** (Not Only SQL) refers to non-relational databases that store data in formats other than traditional tables with rows and columns.

## History

- **2000s**: Rise of web-scale companies (Google, Amazon, Facebook)
- **Problem**: Traditional RDBMS couldn't handle massive scale
- **Solution**: New databases designed for:
  - Horizontal scaling
  - High availability
  - Flexible schemas
  - Distributed architecture

## SQL vs NoSQL

### Relational Database (SQL)
```
Customers Table:
+----+-------+-------+
| ID | Name  | Email |
+----+-------+-------+
| 1  | John  | j@... |
| 2  | Jane  | ja... |
+----+-------+-------+

Orders Table:
+----+-------+--------+
| ID | CustID| Amount |
+----+-------+--------+
| 1  | 1     | 100.00 |
| 2  | 1     | 50.00  |
+----+-------+--------+
```

### Document Database (NoSQL)
```json
{
  "_id": 1,
  "name": "John",
  "email": "j@...",
  "orders": [
    { "id": 1, "amount": 100.00 },
    { "id": 2, "amount": 50.00 }
  ]
}
```

## Types of NoSQL Databases

### 1. Document Databases
Store data as documents (JSON, BSON, XML).

**Examples**: MongoDB, CouchDB, DocumentDB

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "category": "Electronics",
  "price": 999.99,
  "specs": {
    "cpu": "Intel i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  },
  "tags": ["electronics", "computers"]
}
```

**Use Cases**:
- Content management
- E-commerce catalogs
- User profiles
- Mobile applications

### 2. Key-Value Stores
Simplest NoSQL, stores data as key-value pairs.

**Examples**: Redis, DynamoDB, Riak

```
SET user:1001 "John Doe"
SET session:abc123 "{ user_id: 1001, login_time: ... }"
```

**Use Cases**:
- Session storage
- Caching
- Shopping carts
- User preferences

### 3. Column-Family Stores
Store data in columns rather than rows.

**Examples**: Cassandra, HBase, ScyllaDB

```
Row Key: user123
Columns:
  name: "John"
  email: "john@example.com"
  city: "NYC"

Row Key: user456
Columns:
  name: "Jane"
  email: "jane@example.com"
  country: "USA"
```

**Use Cases**:
- Time-series data
- IoT data
- Analytics
- Large-scale applications

### 4. Graph Databases
Store data as nodes and relationships.

**Examples**: Neo4j, Amazon Neptune, ArangoDB

```
(Person:John)-[:FRIEND]->(Person:Jane)
(Person:John)-[:WORKS_AT]->(Company:Acme)
(Person:Jane)-[:LIKES]->(Product:Laptop)
```

**Use Cases**:
- Social networks
- Recommendation engines
- Fraud detection
- Network analysis

## CAP Theorem

In distributed systems, you can only guarantee 2 of 3:

### Consistency
Every read receives the most recent write.

### Availability
Every request gets a response (success or failure).

### Partition Tolerance
System continues despite network partitions.

**Trade-offs:**
- **CP (Consistency + Partition Tolerance)**: MongoDB, HBase, Redis
- **AP (Availability + Partition Tolerance)**: Cassandra, DynamoDB, CouchDB
- **CA (Consistency + Availability)**: Traditional RDBMS (not truly distributed)

## BASE vs ACID

### ACID (SQL Databases)
- **A**tomicity: All or nothing transactions
- **C**onsistency: Valid state transitions
- **I**solation: Concurrent transactions don't interfere
- **D**urability: Committed data persists

### BASE (NoSQL Databases)
- **B**asically **A**vailable: System available most of the time
- **S**oft state: State may change over time (even without input)
- **E**ventual consistency: System becomes consistent eventually

## When to Use NoSQL

### Good Fit ✅
- **Massive scale**: Millions of users, petabytes of data
- **Flexible schema**: Data structure evolves frequently
- **High throughput**: Thousands of reads/writes per second
- **Horizontal scaling**: Need to add more servers
- **Unstructured data**: Documents, logs, social media
- **Real-time**: Low-latency requirements
- **Geographically distributed**: Data across multiple regions

### Not a Good Fit ❌
- **Complex transactions**: Multi-table ACID transactions
- **Complex joins**: Heavy relational queries
- **Ad-hoc queries**: Unknown query patterns
- **Strong consistency**: Financial transactions
- **Mature tooling needed**: BI tools, reporting
- **Small scale**: Traditional database works fine

## Common Use Cases

### MongoDB
```csharp
// E-commerce product catalog
{
  "product_id": "LAPTOP001",
  "name": "Gaming Laptop",
  "category": "Electronics",
  "price": 1299.99,
  "attributes": {
    "brand": "ASUS",
    "screen_size": "15.6 inches",
    "processor": "AMD Ryzen 7"
  },
  "reviews": [
    { "user": "john123", "rating": 5, "comment": "Great!" }
  ],
  "inventory": [
    { "warehouse": "NYC", "quantity": 50 },
    { "warehouse": "LA", "quantity": 30 }
  ]
}
```

### Redis
```csharp
// Session management
SET session:abc123 "user_id:1001;cart_items:3;login_time:2024-01-15"
EXPIRE session:abc123 1800  // 30 minutes

// Caching
SET product:LAPTOP001 "{name:'Gaming Laptop', price:1299.99}"
EXPIRE product:LAPTOP001 3600  // 1 hour

// Rate limiting
INCR api:user:1001:requests
EXPIRE api:user:1001:requests 60  // 1 minute window
```

### Cassandra
```sql
-- Time-series data (IoT sensors)
CREATE TABLE sensor_data (
  sensor_id text,
  timestamp timestamp,
  temperature double,
  humidity double,
  PRIMARY KEY (sensor_id, timestamp)
) WITH CLUSTERING ORDER BY (timestamp DESC);
```

## NoSQL in .NET

### MongoDB
```csharp
// Install: MongoDB.Driver
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("ecommerce");
var products = database.GetCollection<Product>("products");

// Insert
var product = new Product
{
    Name = "Laptop",
    Category = "Electronics",
    Price = 999.99M
};
await products.InsertOneAsync(product);

// Query
var laptops = await products
    .Find(p => p.Category == "Electronics")
    .ToListAsync();
```

### Redis
```csharp
// Install: StackExchange.Redis
var redis = ConnectionMultiplexer.Connect("localhost");
var db = redis.GetDatabase();

// String operations
db.StringSet("user:1001:name", "John Doe");
string name = db.StringGet("user:1001:name");

// Hash operations
db.HashSet("user:1001", new HashEntry[]
{
    new HashEntry("name", "John"),
    new HashEntry("email", "john@example.com")
});

// Lists
db.ListLeftPush("recent:products", "LAPTOP001");

// Sets
db.SetAdd("user:1001:interests", "gaming");
```

## Advantages of NoSQL

1. **Scalability**: Add more servers horizontally
2. **Performance**: Optimized for specific use cases
3. **Flexibility**: Schema-less or flexible schemas
4. **Availability**: Built-in replication and fault tolerance
5. **Developer productivity**: Natural data structures (JSON)
6. **Cost-effective**: Commodity hardware

## Disadvantages of NoSQL

1. **Limited ACID**: Weaker transaction guarantees
2. **No joins**: Data duplication common
3. **Eventual consistency**: Not always up-to-date
4. **Learning curve**: Different from traditional SQL
5. **Tooling**: Less mature than SQL ecosystem
6. **Data integrity**: Application-level enforcement

## Interview Tips

- Explain CAP theorem clearly
- Know when to use NoSQL vs SQL
- Understand eventual consistency
- Know different NoSQL types
- Explain BASE vs ACID
- Discuss scaling strategies
- Know real-world examples

## Key Takeaways

1. NoSQL is for specific use cases, not a SQL replacement
2. Different NoSQL types for different needs
3. CAP theorem: can't have all three
4. Trade consistency for availability and scalability
5. Schema flexibility is both advantage and challenge
6. Choose based on use case, not hype
7. Many systems use both SQL and NoSQL (polyglot persistence)
