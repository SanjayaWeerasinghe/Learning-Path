# MongoDB Basics

## What is MongoDB?

Document-oriented NoSQL database that stores data in JSON-like BSON format. Most popular NoSQL database.

## Installation

```bash
# Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Connect
mongosh mongodb://localhost:27017
```

## Basic Concepts

### Database
Container for collections.

```javascript
use ecommerce  // Switch to database (creates if doesn't exist)
db  // Show current database
show dbs  // List all databases
```

### Collection
Group of documents (like a table).

```javascript
db.createCollection("products")
show collections
```

### Document
BSON (Binary JSON) record.

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics"
}
```

## CRUD Operations

### Create (Insert)

```javascript
// Insert one
db.products.insertOne({
  name: "Laptop",
  price: 999.99,
  category: "Electronics",
  specs: {
    cpu: "Intel i7",
    ram: "16GB"
  },
  tags: ["electronics", "computers"]
})

// Insert many
db.products.insertMany([
  { name: "Mouse", price: 29.99, category: "Accessories" },
  { name: "Keyboard", price: 79.99, category: "Accessories" }
])
```

### Read (Find)

```javascript
// Find all
db.products.find()

// Find with filter
db.products.find({ category: "Electronics" })

// Find one
db.products.findOne({ name: "Laptop" })

// Projection (select specific fields)
db.products.find({}, { name: 1, price: 1, _id: 0 })

// Comparison operators
db.products.find({ price: { $gt: 50 } })  // Greater than
db.products.find({ price: { $gte: 50 } }) // Greater than or equal
db.products.find({ price: { $lt: 100 } }) // Less than
db.products.find({ price: { $lte: 100 } }) // Less than or equal
db.products.find({ price: { $ne: 99.99 } }) // Not equal

// Logical operators
db.products.find({
  $and: [
    { price: { $gte: 50 } },
    { category: "Electronics" }
  ]
})

db.products.find({
  $or: [
    { category: "Electronics" },
    { category: "Accessories" }
  ]
})

// Array operators
db.products.find({ tags: "electronics" })  // Contains element
db.products.find({ tags: { $in: ["electronics", "gaming"] } })
db.products.find({ tags: { $all: ["electronics", "computers"] } })

// Regex
db.products.find({ name: /^Lap/ })  // Starts with "Lap"
db.products.find({ name: { $regex: "top$" } })  // Ends with "top"

// Sorting
db.products.find().sort({ price: 1 })  // Ascending
db.products.find().sort({ price: -1 }) // Descending

// Limit and skip
db.products.find().limit(10)
db.products.find().skip(20).limit(10)  // Pagination

// Count
db.products.countDocuments({ category: "Electronics" })
```

### Update

```javascript
// Update one
db.products.updateOne(
  { name: "Laptop" },
  { $set: { price: 899.99, stock: 50 } }
)

// Update many
db.products.updateMany(
  { category: "Electronics" },
  { $set: { discount: 10 } }
)

// Update operators
db.products.updateOne(
  { name: "Laptop" },
  {
    $set: { price: 899.99 },      // Set field
    $unset: { discount: "" },      // Remove field
    $inc: { stock: -1 },           // Increment
    $mul: { price: 0.9 },          // Multiply
    $rename: { qty: "quantity" },  // Rename field
    $min: { price: 799.99 },       // Update if less
    $max: { price: 1299.99 }       // Update if greater
  }
)

// Array operators
db.products.updateOne(
  { name: "Laptop" },
  { $push: { tags: "gaming" } }  // Add to array
)

db.products.updateOne(
  { name: "Laptop" },
  { $pull: { tags: "old" } }  // Remove from array
)

db.products.updateOne(
  { name: "Laptop" },
  { $addToSet: { tags: "new" } }  // Add if not exists
)

// Replace document
db.products.replaceOne(
  { name: "Laptop" },
  { name: "Gaming Laptop", price: 1299.99 }
)

// Upsert (update or insert)
db.products.updateOne(
  { name: "Monitor" },
  { $set: { price: 299.99 } },
  { upsert: true }
)
```

### Delete

```javascript
// Delete one
db.products.deleteOne({ name: "Mouse" })

// Delete many
db.products.deleteMany({ category: "Accessories" })

// Delete all
db.products.deleteMany({})

// Drop collection
db.products.drop()
```

## MongoDB in C#

### Setup

```bash
dotnet add package MongoDB.Driver
```

### Connection

```csharp
using MongoDB.Driver;
using MongoDB.Bson;

// Define model
public class Product
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("price")]
    public decimal Price { get; set; }

    [BsonElement("category")]
    public string Category { get; set; }

    [BsonElement("tags")]
    public List<string> Tags { get; set; }
}

// Connect to MongoDB
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("ecommerce");
var collection = database.GetCollection<Product>("products");
```

### CRUD in C#

```csharp
// Create
var product = new Product
{
    Name = "Laptop",
    Price = 999.99M,
    Category = "Electronics",
    Tags = new List<string> { "electronics", "computers" }
};
await collection.InsertOneAsync(product);

// Read
var laptops = await collection
    .Find(p => p.Category == "Electronics")
    .ToListAsync();

var laptop = await collection
    .Find(p => p.Name == "Laptop")
    .FirstOrDefaultAsync();

// Query builders
var filter = Builders<Product>.Filter.And(
    Builders<Product>.Filter.Gte(p => p.Price, 500),
    Builders<Product>.Filter.Eq(p => p.Category, "Electronics")
);

var products = await collection
    .Find(filter)
    .SortByDescending(p => p.Price)
    .Limit(10)
    .ToListAsync();

// Update
var update = Builders<Product>.Update
    .Set(p => p.Price, 899.99M)
    .Inc(p => p.Stock, -1);

await collection.UpdateOneAsync(
    p => p.Name == "Laptop",
    update);

// Delete
await collection.DeleteOneAsync(p => p.Name == "Mouse");

// Count
long count = await collection.CountDocumentsAsync(p => p.Price > 500);
```

### Pagination

```csharp
public async Task<PagedResult<Product>> GetProducts(
    int page, int pageSize, string category)
{
    var filter = string.IsNullOrEmpty(category)
        ? Builders<Product>.Filter.Empty
        : Builders<Product>.Filter.Eq(p => p.Category, category);

    var totalCount = await collection.CountDocumentsAsync(filter);

    var products = await collection
        .Find(filter)
        .Skip((page - 1) * pageSize)
        .Limit(pageSize)
        .ToListAsync();

    return new PagedResult<Product>
    {
        Items = products,
        TotalCount = totalCount,
        Page = page,
        PageSize = pageSize
    };
}
```

## Embedded Documents vs References

### Embedded (Denormalized)
```javascript
// Good for one-to-few relationships
{
  "_id": ObjectId("..."),
  "name": "John",
  "addresses": [
    { "street": "123 Main St", "city": "NYC" },
    { "street": "456 Oak Ave", "city": "LA" }
  ]
}
```

**Pros**: Single query, better performance
**Cons**: Data duplication, document size limit (16MB)

### Referenced (Normalized)
```javascript
// Users collection
{
  "_id": ObjectId("user1"),
  "name": "John"
}

// Orders collection
{
  "_id": ObjectId("order1"),
  "user_id": ObjectId("user1"),
  "total": 100.00
}
```

**Pros**: No duplication, smaller documents
**Cons**: Multiple queries, application-level joins

## Indexes

```javascript
// Create index
db.products.createIndex({ category: 1 })  // Ascending

// Compound index
db.products.createIndex({ category: 1, price: -1 })

// Unique index
db.products.createIndex({ name: 1 }, { unique: true })

// Text index (for search)
db.products.createIndex({ name: "text", description: "text" })

// Search
db.products.find({ $text: { $search: "gaming laptop" } })

// List indexes
db.products.getIndexes()

// Drop index
db.products.dropIndex("category_1")
```

## Validation

```javascript
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price", "category"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        price: {
          bsonType: "decimal",
          minimum: 0,
          description: "must be a positive decimal"
        },
        category: {
          enum: ["Electronics", "Accessories", "Clothing"],
          description: "can only be one of the enum values"
        }
      }
    }
  }
})
```

## Interview Tips

- Know CRUD operations in both mongosh and C#
- Understand embedded vs referenced documents
- Explain when to use indexes
- Know common query operators ($gt, $in, $regex)
- Understand projection and pagination
- Know 16MB document size limit
- Explain differences from SQL

## Best Practices

1. **Use indexes** for frequently queried fields
2. **Embed** for one-to-few relationships
3. **Reference** for many-to-many relationships
4. **Limit document size** (avoid unbounded arrays)
5. **Use projection** to reduce data transfer
6. **Validate schemas** at application level or with validation
7. **Monitor performance** with explain()

## Key Takeaways

1. MongoDB stores data as flexible JSON documents
2. Collections are like tables, documents like rows
3. No schema required, but consistency is good practice
4. CRUD operations are straightforward
5. Choose embedding vs referencing based on relationship
6. Indexes are critical for performance
7. MongoDB Driver for .NET is well-supported
