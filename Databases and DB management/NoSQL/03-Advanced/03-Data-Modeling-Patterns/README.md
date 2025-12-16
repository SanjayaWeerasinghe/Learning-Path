# Data Modeling Patterns

## Advanced Design Patterns

Beyond basic embedding vs referencing, these patterns solve specific data modeling challenges in NoSQL databases.

## 1. Polymorphic Pattern

Store documents with different schemas in the same collection.

```javascript
// Different product types with different attributes
{
  "_id": "prod1",
  "type": "book",
  "name": "MongoDB Guide",
  "author": "John Doe",
  "isbn": "978-1234567890",
  "pages": 350
}

{
  "_id": "prod2",
  "type": "electronics",
  "name": "Laptop",
  "brand": "TechCorp",
  "specs": {
    "cpu": "Intel i7",
    "ram": "16GB"
  },
  "warranty": "2 years"
}

// Single query for all products
db.products.find({ name: /laptop/i })

// Type-specific queries
db.products.find({ type: "book", pages: { $gt: 300 } })
```

### C# Implementation

```csharp
[BsonDiscriminator(RootClass = true)]
[BsonKnownTypes(typeof(Book), typeof(Electronics))]
public abstract class Product
{
    public string Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

[BsonDiscriminator("book")]
public class Book : Product
{
    public string Author { get; set; }
    public string Isbn { get; set; }
    public int Pages { get; set; }
}

[BsonDiscriminator("electronics")]
public class Electronics : Product
{
    public string Brand { get; set; }
    public Dictionary<string, string> Specs { get; set; }
    public string Warranty { get; set; }
}

// Usage
var collection = database.GetCollection<Product>("products");
var products = await collection.Find(_ => true).ToListAsync();

foreach (var product in products)
{
    if (product is Book book)
    {
        Console.WriteLine($"Book: {book.Name} by {book.Author}");
    }
    else if (product is Electronics electronics)
    {
        Console.WriteLine($"Electronics: {electronics.Name} by {electronics.Brand}");
    }
}
```

## 2. Attribute Pattern

Handle sparse fields or products with many variations.

```javascript
// Instead of separate fields for each attribute:
{
  "productId": "laptop1",
  "name": "Gaming Laptop",
  "color": "Black",
  "size": "15 inch",
  "weight": "2.5 kg",
  "cpu": "Intel i7",
  "ram": "16GB",
  // ... hundreds of possible attributes
}

// Use attribute array:
{
  "productId": "laptop1",
  "name": "Gaming Laptop",
  "attributes": [
    { "key": "color", "value": "Black" },
    { "key": "size", "value": "15 inch" },
    { "key": "weight", "value": "2.5 kg" },
    { "key": "cpu", "value": "Intel i7" },
    { "key": "ram", "value": "16GB" }
  ]
}

// Create index for searching
db.products.createIndex({ "attributes.key": 1, "attributes.value": 1 })

// Query by any attribute
db.products.find({
  "attributes": {
    $elemMatch: { "key": "ram", "value": "16GB" }
  }
})
```

### C# Implementation

```csharp
public class Product
{
    public string ProductId { get; set; }
    public string Name { get; set; }
    public List<ProductAttribute> Attributes { get; set; }
}

public class ProductAttribute
{
    public string Key { get; set; }
    public string Value { get; set; }
}

// Create index
var indexKeys = Builders<Product>.IndexKeys
    .Ascending("Attributes.Key")
    .Ascending("Attributes.Value");
await collection.Indexes.CreateOneAsync(new CreateIndexModel<Product>(indexKeys));

// Query
var filter = Builders<Product>.Filter.ElemMatch(
    p => p.Attributes,
    a => a.Key == "ram" && a.Value == "16GB");

var products = await collection.Find(filter).ToListAsync();
```

## 3. Bucket Pattern

Aggregate time-series or sequential data into buckets.

```javascript
// Instead of one document per reading:
{ "sensorId": "temp1", "timestamp": "2024-01-15T10:00:00Z", "value": 20.5 }
{ "sensorId": "temp1", "timestamp": "2024-01-15T10:00:01Z", "value": 20.6 }
// ... millions of documents

// Bucket by hour:
{
  "sensorId": "temp1",
  "date": "2024-01-15",
  "hour": 10,
  "measurements": [
    { "minute": 0, "second": 0, "value": 20.5 },
    { "minute": 0, "second": 1, "value": 20.6 },
    // ... 3600 measurements
  ],
  "count": 3600,
  "avgValue": 20.7,
  "maxValue": 21.2,
  "minValue": 20.1
}
```

### C# Implementation

```csharp
public class SensorBucket
{
    public string Id { get; set; }
    public string SensorId { get; set; }
    public string Date { get; set; }
    public int Hour { get; set; }
    public List<Measurement> Measurements { get; set; }
    public int Count { get; set; }
    public double AvgValue { get; set; }
    public double MaxValue { get; set; }
    public double MinValue { get; set; }
}

public class Measurement
{
    public int Minute { get; set; }
    public int Second { get; set; }
    public double Value { get; set; }
}

// Add measurement to bucket
public async Task AddMeasurement(string sensorId, DateTime timestamp, double value)
{
    var date = timestamp.ToString("yyyy-MM-dd");
    var hour = timestamp.Hour;

    var filter = Builders<SensorBucket>.Filter.And(
        Builders<SensorBucket>.Filter.Eq(b => b.SensorId, sensorId),
        Builders<SensorBucket>.Filter.Eq(b => b.Date, date),
        Builders<SensorBucket>.Filter.Eq(b => b.Hour, hour),
        Builders<SensorBucket>.Filter.Lt(b => b.Count, 3600)  // Bucket not full
    );

    var measurement = new Measurement
    {
        Minute = timestamp.Minute,
        Second = timestamp.Second,
        Value = value
    };

    var update = Builders<SensorBucket>.Update
        .Push(b => b.Measurements, measurement)
        .Inc(b => b.Count, 1)
        .Max(b => b.MaxValue, value)
        .Min(b => b.MinValue, value);

    var options = new FindOneAndUpdateOptions<SensorBucket>
    {
        IsUpsert = true,
        ReturnDocument = ReturnDocument.After
    };

    await collection.FindOneAndUpdateAsync(filter, update, options);
}
```

## 4. Approximation Pattern

Trade accuracy for performance.

```javascript
// Exact count (slow for large collections):
db.products.countDocuments({ category: "Electronics" })

// Approximate count (fast):
{
  "category": "Electronics",
  "approximateCount": 125000,  // Updated periodically
  "lastUpdated": "2024-01-15T10:00:00Z"
}

// Views counter example:
{
  "postId": "post123",
  "title": "My Post",
  "exactViews": 1247,  // Updated on every 100th view
  "approximateViews": 1200,  // Shown to users
  "viewBuffer": 47  // Current buffer
}
```

### C# Implementation

```csharp
public async Task IncrementPageView(string postId)
{
    var filter = Builders<Post>.Filter.Eq(p => p.PostId, postId);

    // Increment buffer
    var update = Builders<Post>.Update.Inc(p => p.ViewBuffer, 1);
    var post = await collection.FindOneAndUpdateAsync(filter, update);

    // Flush buffer every 100 views
    if (post.ViewBuffer >= 100)
    {
        var flushUpdate = Builders<Post>.Update
            .Inc(p => p.ExactViews, post.ViewBuffer)
            .Set(p => p.ApproximateViews, post.ExactViews + post.ViewBuffer)
            .Set(p => p.ViewBuffer, 0);

        await collection.UpdateOneAsync(filter, flushUpdate);
    }
}

// Display approximate count
public async Task<int> GetPageViews(string postId)
{
    var post = await collection
        .Find(p => p.PostId == postId)
        .Project(p => p.ApproximateViews + p.ViewBuffer)
        .FirstOrDefaultAsync();

    return post;
}
```

## 5. Schema Versioning Pattern

Handle schema evolution over time.

```javascript
// V1 documents:
{
  "userId": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "schemaVersion": 1
}

// V2 documents (split name):
{
  "userId": 124,
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "schemaVersion": 2
}

// Application handles both versions
```

### C# Implementation

```csharp
public class User
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public int SchemaVersion { get; set; }

    // V1 fields
    public string Name { get; set; }

    // V2 fields
    public string FirstName { get; set; }
    public string LastName { get; set; }

    // Computed property
    [BsonIgnore]
    public string FullName
    {
        get
        {
            if (SchemaVersion == 1)
                return Name;
            else
                return $"{FirstName} {LastName}";
        }
    }
}

// Migration strategy
public async Task MigrateUserSchema(int userId)
{
    var user = await collection.Find(u => u.UserId == userId).FirstOrDefaultAsync();

    if (user.SchemaVersion == 1)
    {
        var nameParts = user.Name.Split(' ', 2);

        var update = Builders<User>.Update
            .Set(u => u.FirstName, nameParts[0])
            .Set(u => u.LastName, nameParts.Length > 1 ? nameParts[1] : "")
            .Set(u => u.SchemaVersion, 2)
            .Unset(u => u.Name);

        await collection.UpdateOneAsync(u => u.UserId == userId, update);
    }
}
```

## 6. Tree Patterns

Model hierarchical data.

### Parent Reference

```javascript
// Categories: Electronics > Computers > Laptops
{
  "_id": "laptops",
  "name": "Laptops",
  "parent": "computers"
}

{
  "_id": "computers",
  "name": "Computers",
  "parent": "electronics"
}

{
  "_id": "electronics",
  "name": "Electronics",
  "parent": null
}

// Find all children
db.categories.find({ parent: "computers" })

// Find ancestors (requires multiple queries or aggregation)
```

### Child Reference

```javascript
{
  "_id": "electronics",
  "name": "Electronics",
  "children": ["computers", "phones", "cameras"]
}

// Find all descendants (one query)
db.categories.findOne({ _id: "electronics" })
```

### Array of Ancestors

```javascript
{
  "_id": "laptops",
  "name": "Laptops",
  "ancestors": ["electronics", "computers"],
  "parent": "computers"
}

// Find all descendants
db.categories.find({ ancestors: "computers" })

// Find path to root
db.categories.findOne({ _id: "laptops" }).ancestors
```

### C# Implementation

```csharp
public class Category
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Parent { get; set; }
    public List<string> Ancestors { get; set; }
    public List<string> Children { get; set; }
}

// Get all descendants
public async Task<List<Category>> GetDescendants(string categoryId)
{
    var filter = Builders<Category>.Filter.AnyEq(c => c.Ancestors, categoryId);
    return await collection.Find(filter).ToListAsync();
}

// Get breadcrumb path
public async Task<List<Category>> GetBreadcrumb(string categoryId)
{
    var category = await collection.Find(c => c.Id == categoryId).FirstOrDefaultAsync();

    if (category?.Ancestors == null || category.Ancestors.Count == 0)
        return new List<Category> { category };

    var filter = Builders<Category>.Filter.In(c => c.Id, category.Ancestors);
    var ancestors = await collection.Find(filter).ToListAsync();

    ancestors.Add(category);
    return ancestors.OrderBy(c => category.Ancestors.IndexOf(c.Id)).ToList();
}
```

## 7. Preallocation Pattern

Reserve space for future updates.

```javascript
// Preallocate array slots
{
  "gameId": "game123",
  "scores": [
    { "round": 1, "score": 150 },
    { "round": 2, "score": null },
    { "round": 3, "score": null },
    { "round": 4, "score": null },
    { "round": 5, "score": null }
  ]
}

// Update specific round (in-place, no document growth)
db.games.updateOne(
  { gameId: "game123", "scores.round": 2 },
  { $set: { "scores.$.score": 200 } }
)
```

### C# Implementation

```csharp
public class Game
{
    public string GameId { get; set; }
    public List<RoundScore> Scores { get; set; }
}

public class RoundScore
{
    public int Round { get; set; }
    public int? Score { get; set; }
}

// Create game with preallocated rounds
public async Task<Game> CreateGame(string gameId, int totalRounds)
{
    var game = new Game
    {
        GameId = gameId,
        Scores = Enumerable.Range(1, totalRounds)
            .Select(round => new RoundScore { Round = round, Score = null })
            .ToList()
    };

    await collection.InsertOneAsync(game);
    return game;
}

// Update specific round
public async Task UpdateRoundScore(string gameId, int round, int score)
{
    var filter = Builders<Game>.Filter.And(
        Builders<Game>.Filter.Eq(g => g.GameId, gameId),
        Builders<Game>.Filter.ElemMatch(g => g.Scores, s => s.Round == round)
    );

    var update = Builders<Game>.Update.Set("Scores.$.Score", score);

    await collection.UpdateOneAsync(filter, update);
}
```

## 8. Document Versioning Pattern

Keep history of document changes.

```javascript
// Current document
{
  "_id": "doc123",
  "title": "My Document",
  "content": "Updated content",
  "version": 3,
  "modifiedBy": "user456",
  "modifiedAt": "2024-01-15T10:00:00Z"
}

// Version history collection
{
  "documentId": "doc123",
  "version": 1,
  "title": "My Document",
  "content": "Original content",
  "modifiedBy": "user123",
  "modifiedAt": "2024-01-10T10:00:00Z"
}

{
  "documentId": "doc123",
  "version": 2,
  "title": "My Document",
  "content": "First update",
  "modifiedBy": "user456",
  "modifiedAt": "2024-01-12T10:00:00Z"
}
```

### C# Implementation

```csharp
public class Document
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Version { get; set; }
    public string ModifiedBy { get; set; }
    public DateTime ModifiedAt { get; set; }
}

public class DocumentVersion
{
    public string Id { get; set; }
    public string DocumentId { get; set; }
    public int Version { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string ModifiedBy { get; set; }
    public DateTime ModifiedAt { get; set; }
}

public async Task UpdateDocument(string documentId, string newContent, string userId)
{
    var document = await docCollection.Find(d => d.Id == documentId).FirstOrDefaultAsync();

    // Save current version to history
    var version = new DocumentVersion
    {
        DocumentId = documentId,
        Version = document.Version,
        Title = document.Title,
        Content = document.Content,
        ModifiedBy = document.ModifiedBy,
        ModifiedAt = document.ModifiedAt
    };

    await versionCollection.InsertOneAsync(version);

    // Update current document
    var update = Builders<Document>.Update
        .Set(d => d.Content, newContent)
        .Inc(d => d.Version, 1)
        .Set(d => d.ModifiedBy, userId)
        .Set(d => d.ModifiedAt, DateTime.UtcNow);

    await docCollection.UpdateOneAsync(d => d.Id == documentId, update);
}

// Get document at specific version
public async Task<DocumentVersion> GetDocumentVersion(string documentId, int version)
{
    return await versionCollection
        .Find(v => v.DocumentId == documentId && v.Version == version)
        .FirstOrDefaultAsync();
}
```

## Interview Tips

- Explain when to use each pattern
- Understand trade-offs (flexibility vs complexity)
- Know polymorphic pattern for varied schemas
- Understand bucket pattern for time-series
- Explain schema versioning for evolution
- Know tree patterns for hierarchical data
- Discuss approximation for performance

## Best Practices

1. **Choose patterns based on access patterns**: How will data be queried?
2. **Polymorphic pattern**: For documents with varying schemas
3. **Attribute pattern**: For sparse or highly variable fields
4. **Bucket pattern**: For time-series or sequential data
5. **Approximation pattern**: When exact accuracy isn't critical
6. **Schema versioning**: Plan for schema evolution
7. **Tree patterns**: Match to your query needs
8. **Document versioning**: For audit trails and history

## Key Takeaways

1. Advanced patterns solve specific modeling challenges
2. Polymorphic pattern handles different schemas in one collection
3. Attribute pattern handles sparse fields efficiently
4. Bucket pattern optimizes time-series data
5. Approximation pattern trades accuracy for performance
6. Schema versioning enables smooth migrations
7. Tree patterns model hierarchies differently
8. Choose pattern based on access patterns
