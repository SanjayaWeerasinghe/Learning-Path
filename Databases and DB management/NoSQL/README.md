# NoSQL Databases

A comprehensive guide to NoSQL databases covering MongoDB, Redis, Cassandra, and key concepts for modern application development.

## Table of Contents

### 01 - Basics
- [Introduction to NoSQL](01-Basics/01-Introduction/README.md)
- [MongoDB Basics](01-Basics/02-MongoDB-Basics/README.md)
- [Redis Basics](01-Basics/03-Redis-Basics/README.md)
- [Document Model](01-Basics/04-Document-Model/README.md)
- [Key-Value Stores](01-Basics/05-Key-Value-Stores/README.md)

### 02 - Intermediate
- [Aggregation Pipeline](02-Intermediate/01-Aggregation-Pipeline/README.md)
- [Indexing](02-Intermediate/02-Indexing/README.md)
- [Replication](02-Intermediate/03-Replication/README.md)
- [Schema Design](02-Intermediate/04-Schema-Design/README.md)
- [Caching Strategies](02-Intermediate/05-Caching-Strategies/README.md)

### 03 - Advanced
- [Sharding](03-Advanced/01-Sharding/README.md)
- [Performance Tuning](03-Advanced/02-Performance-Tuning/README.md)
- [Data Modeling Patterns](03-Advanced/03-Data-Modeling-Patterns/README.md)
- [Consistency Models](03-Advanced/04-Consistency-Models/README.md)
- [Polyglot Persistence](03-Advanced/05-Polyglot-Persistence/README.md)

## NoSQL Database Types

### Document Databases
- **MongoDB**: Flexible JSON-like documents
- **CouchDB**: Multi-version concurrency control
- **DocumentDB**: AWS managed document database

### Key-Value Stores
- **Redis**: In-memory data structure store
- **Amazon DynamoDB**: Fully managed NoSQL
- **etcd**: Distributed key-value store

### Column-Family Stores
- **Cassandra**: Wide-column store for big data
- **HBase**: Hadoop database
- **ScyllaDB**: Compatible with Cassandra

### Graph Databases
- **Neo4j**: Native graph database
- **Amazon Neptune**: Managed graph database
- **ArangoDB**: Multi-model database

## Why NoSQL?

### Advantages ✅
- **Scalability**: Horizontal scaling (add more servers)
- **Flexibility**: Schema-less or flexible schemas
- **Performance**: Optimized for specific use cases
- **High Availability**: Built-in replication
- **Big Data**: Handle massive volumes
- **Variety**: Different data models for different needs

### When to Use NoSQL
- High scalability requirements
- Flexible or evolving data models
- High read/write throughput
- Unstructured or semi-structured data
- Real-time analytics
- Caching layer
- Session management

### When to Use SQL
- Complex transactions (ACID required)
- Complex joins and relationships
- Data integrity critical
- Mature ecosystem needed
- Standard reporting

## CAP Theorem

You can only have 2 out of 3:

- **C**onsistency: All nodes see same data at same time
- **A**vailability: Every request gets a response
- **P**artition tolerance: System works despite network issues

**Examples:**
- **MongoDB**: CP (Consistency + Partition tolerance)
- **Cassandra**: AP (Availability + Partition tolerance)
- **Redis**: CP or AP depending on configuration

## Common Technologies

### MongoDB (.NET)
```csharp
// Install: MongoDB.Driver
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("mydb");
var collection = database.GetCollection<Product>("products");

var product = new Product { Name = "Laptop", Price = 999.99M };
await collection.InsertOneAsync(product);

var products = await collection.Find(p => p.Price > 500).ToListAsync();
```

### Redis (.NET)
```csharp
// Install: StackExchange.Redis
var redis = ConnectionMultiplexer.Connect("localhost");
var db = redis.GetDatabase();

db.StringSet("user:1:name", "John");
string name = db.StringGet("user:1:name");

// Set with expiration
db.StringSet("session:abc", "data", TimeSpan.FromMinutes(30));
```

## Learning Path

1. **Basics**: Understand NoSQL concepts and why they exist
2. **MongoDB**: Learn document-oriented database (most popular)
3. **Redis**: Master caching and in-memory storage
4. **Intermediate**: Indexing, aggregation, replication
5. **Advanced**: Sharding, consistency, design patterns

## Interview Focus Areas

- **CAP Theorem**: Understand trade-offs
- **MongoDB**: CRUD, aggregation pipeline, indexing
- **Redis**: Data structures, caching patterns, persistence
- **Schema Design**: Embedding vs referencing
- **Scaling**: Sharding, replication
- **Consistency**: Eventual vs strong consistency
- **Use Cases**: When to use which NoSQL database

## Tools and Resources

### MongoDB Tools
- MongoDB Compass (GUI)
- mongosh (Shell)
- MongoDB Atlas (Cloud)
- Robo 3T / Studio 3T

### Redis Tools
- redis-cli (Command line)
- RedisInsight (GUI)
- Redis Commander

### Practice
- Try MongoDB University (free courses)
- Redis University
- Practice on local instances
- Build real projects

## Sample Project Ideas

1. **E-commerce Catalog** (MongoDB)
   - Products with varying attributes
   - Reviews and ratings
   - Category hierarchy

2. **Session Store** (Redis)
   - User sessions with TTL
   - Shopping cart
   - Rate limiting

3. **Social Network** (Graph DB)
   - User connections
   - Friend recommendations
   - Activity feed

4. **Analytics Dashboard** (Time-series DB)
   - Metrics tracking
   - Real-time analytics
   - Event logging

## NoSQL vs SQL Comparison

| Aspect | SQL | NoSQL |
|--------|-----|-------|
| Schema | Fixed | Flexible |
| Scaling | Vertical (better hardware) | Horizontal (more servers) |
| ACID | Full ACID | Eventually consistent (mostly) |
| Joins | Complex joins supported | Limited or no joins |
| Best For | Relational data, complex queries | Unstructured data, scalability |
| Examples | PostgreSQL, MySQL | MongoDB, Redis, Cassandra |

## Getting Started

### MongoDB Setup
```bash
# Install MongoDB (Docker)
docker run -d -p 27017:27017 --name mongodb mongo

# Connect
mongosh mongodb://localhost:27017
```

### Redis Setup
```bash
# Install Redis (Docker)
docker run -d -p 6379:6379 --name redis redis

# Connect
redis-cli
```

## Key Takeaways

1. NoSQL is not a replacement for SQL, it's complementary
2. Choose the right database for your use case
3. Understand CAP theorem trade-offs
4. MongoDB for flexible documents
5. Redis for caching and real-time data
6. Schema design is critical in NoSQL
7. Always consider consistency requirements

---

**Ready to start?** Begin with [Introduction to NoSQL](01-Basics/01-Introduction/README.md)!
