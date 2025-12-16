# Indexing in NoSQL

## What are Indexes?

Data structures that improve query performance by allowing the database to quickly locate documents without scanning the entire collection.

## MongoDB Indexes

### Single Field Index

```javascript
// Create index
db.products.createIndex({ price: 1 })  // 1 = ascending, -1 = descending

// Query uses index
db.products.find({ price: { $gt: 100 } })
```

### Compound Index

```javascript
// Index on multiple fields
db.products.createIndex({ category: 1, price: -1 })

// Good queries (use index):
db.products.find({ category: "Electronics" })
db.products.find({ category: "Electronics", price: { $lt: 500 } })
db.products.find({ category: "Electronics" }).sort({ price: -1 })

// Bad query (doesn't use index efficiently):
db.products.find({ price: 100 })  // Missing category (prefix)
```

### Multikey Index (Arrays)

```javascript
db.products.createIndex({ tags: 1 })

// Automatically handles array queries
db.products.find({ tags: "electronics" })
db.products.find({ tags: { $in: ["gaming", "computers"] } })
```

### Text Index

```javascript
// Create text index
db.products.createIndex({ name: "text", description: "text" })

// Text search
db.products.find({ $text: { $search: "gaming laptop" } })

// With score
db.products.find(
  { $text: { $search: "gaming laptop" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

### Geospatial Index

```javascript
// Create 2dsphere index for location data
db.stores.createIndex({ location: "2dsphere" })

// Find nearby
db.stores.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-73.9667, 40.78]  // [longitude, latitude]
      },
      $maxDistance: 5000  // meters
    }
  }
})
```

### Unique Index

```javascript
// Ensure unique values
db.users.createIndex({ email: 1 }, { unique: true })

// Insert fails if email exists
db.users.insertOne({ email: "john@example.com" })  // Error if duplicate
```

### Partial Index

```javascript
// Index only documents matching condition
db.orders.createIndex(
  { customerId: 1 },
  { partialFilterExpression: { status: "active" } }
)

// Only active orders are indexed
db.orders.find({ customerId: 123, status: "active" })  // Uses index
db.orders.find({ customerId: 123, status: "completed" })  // No index
```

### TTL Index

```javascript
// Automatically delete documents after expiration
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })

// Documents deleted 1 hour after createdAt
```

## Index Management

```javascript
// List indexes
db.products.getIndexes()

// Drop index
db.products.dropIndex("price_1")
db.products.dropIndex({ category: 1, price: -1 })

// Drop all indexes (except _id)
db.products.dropIndexes()

// Rebuild indexes
db.products.reIndex()
```

## Explain Plan

```javascript
// See query execution plan
db.products.find({ category: "Electronics" }).explain("executionStats")

// Check if index used
{
  "executionStats": {
    "executionSuccess": true,
    "nReturned": 100,
    "executionTimeMillis": 5,
    "totalDocsExamined": 100,  // Should be close to nReturned
    "executionStages": {
      "stage": "IXSCAN",  // Index scan (good!)
      "indexName": "category_1"
    }
  }
}

// Bad execution (full collection scan)
{
  "executionStages": {
    "stage": "COLLSCAN"  // Collection scan (bad for large collections)
  }
}
```

## Indexing in C#

```csharp
var collection = database.GetCollection<Product>("products");

// Create single field index
var indexKeys = Builders<Product>.IndexKeys.Ascending(p => p.Price);
await collection.Indexes.CreateOneAsync(new CreateIndexModel<Product>(indexKeys));

// Create compound index
var compoundKeys = Builders<Product>.IndexKeys
    .Ascending(p => p.Category)
    .Descending(p => p.Price);
await collection.Indexes.CreateOneAsync(new CreateIndexModel<Product>(compoundKeys));

// Create unique index
var uniqueKeys = Builders<Product>.IndexKeys.Ascending(p => p.Sku);
var uniqueOptions = new CreateIndexOptions { Unique = true };
await collection.Indexes.CreateOneAsync(
    new CreateIndexModel<Product>(uniqueKeys, uniqueOptions));

// Create text index
var textKeys = Builders<Product>.IndexKeys
    .Text(p => p.Name)
    .Text(p => p.Description);
await collection.Indexes.CreateOneAsync(new CreateIndexModel<Product>(textKeys));

// List indexes
var indexes = await collection.Indexes.List().ToListAsync();

// Drop index
await collection.Indexes.DropOneAsync("price_1");
```

## Redis Indexing (RediSearch)

```bash
# Install RediSearch module

# Create index
FT.CREATE products:index ON HASH PREFIX 1 product: SCHEMA name TEXT price NUMERIC category TAG

# Search
FT.SEARCH products:index "@category:{Electronics}" SORTBY price ASC

# Aggregate
FT.AGGREGATE products:index "*" GROUPBY 1 @category REDUCE AVG 1 @price AS avg_price
```

## Index Design Best Practices

### 1. Index Selectivity

```javascript
// High selectivity (good)
db.users.createIndex({ email: 1 })  // Unique values

// Low selectivity (bad)
db.users.createIndex({ gender: 1 })  // Only 2-3 values
```

### 2. Compound Index Order

```javascript
// ESR Rule: Equality, Sort, Range

// Query: category = "Electronics", sort by price, price > 100
db.products.createIndex({ category: 1, price: 1 })

// Good queries:
db.products.find({ category: "Electronics" }).sort({ price: 1 })
db.products.find({ category: "Electronics", price: { $gt: 100 } })
```

### 3. Covered Queries

```javascript
// Index includes all queried fields
db.products.createIndex({ category: 1, price: 1, name: 1 })

// Covered query (doesn't access documents)
db.products.find(
  { category: "Electronics" },
  { _id: 0, price: 1, name: 1 }
)
```

### 4. Index Intersection

```javascript
// MongoDB can use multiple indexes
db.products.createIndex({ category: 1 })
db.products.createIndex({ price: 1 })

// Can use both indexes
db.products.find({ category: "Electronics", price: { $gt: 100 } })
```

## Performance Considerations

### Index Size

```javascript
// Check index size
db.products.stats()

// Output shows:
{
  "indexSizes": {
    "_id_": 204800,
    "category_1": 102400,
    "price_1": 98304
  }
}
```

### Too Many Indexes

```
Pros of Indexes:
✅ Faster reads

Cons of Indexes:
❌ Slower writes (index must be updated)
❌ More disk space
❌ More memory usage
```

### Index Selection

```javascript
// Force index usage (when optimizer chooses wrong index)
db.products.find({ category: "Electronics" }).hint({ category: 1 })

// Disable index
db.products.find({ category: "Electronics" }).hint({ $natural: 1 })
```

## Common Indexing Mistakes

1. **No indexes on frequently queried fields**
2. **Too many indexes** (slows writes)
3. **Wrong compound index order**
4. **Indexing low-selectivity fields**
5. **Not using covered queries**
6. **Forgetting to index foreign keys** ($lookup fields)

## Interview Tips

- Explain index types (single, compound, multikey, text)
- Know when compound index is used
- Understand ESR rule (Equality, Sort, Range)
- Explain covered queries
- Know how to use explain()
- Discuss index trade-offs (read vs write performance)
- Understand partial indexes for optimization

## Best Practices

1. **Index queries, not collections**: Create based on queries
2. **Monitor index usage**: Remove unused indexes
3. **Use compound indexes**: Better than multiple single indexes
4. **Follow ESR rule**: For compound index order
5. **Use partial indexes**: For large collections with filtered queries
6. **Set up text indexes**: For search functionality
7. **Check explain()**: Ensure indexes are used

## Key Takeaways

1. Indexes dramatically improve read performance
2. Compound indexes are powerful but order matters
3. Every index slows down writes
4. Use explain() to verify index usage
5. Text indexes enable full-text search
6. Partial indexes save space
7. Monitor and remove unused indexes
