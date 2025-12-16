# Schema Design in NoSQL

## NoSQL vs SQL Schema Design

### SQL (Normalized)
```sql
-- Separate tables with foreign keys
Users: id, name, email
Orders: id, user_id, total
OrderItems: id, order_id, product_id, quantity
Products: id, name, price
```

### NoSQL (Denormalized)
```json
{
  "userId": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "orders": [
    {
      "orderId": 456,
      "total": 100.00,
      "items": [
        { "productId": 789, "name": "Laptop", "price": 999.99, "quantity": 1 }
      ]
    }
  ]
}
```

## Key Design Principles

### 1. Design for Your Queries

```javascript
// If you always show user with their orders:
// Embed orders
{
  "userId": 123,
  "name": "John",
  "orders": [...]  // Embedded
}

// If orders queried separately:
// Reference orders
{
  "userId": 123,
  "name": "John"
}
// Separate orders collection
```

### 2. One-to-Few: Embed

```javascript
// User with few addresses
{
  "userId": 123,
  "name": "John Doe",
  "addresses": [
    { "street": "123 Main St", "city": "NYC", "type": "home" },
    { "street": "456 Work Ave", "city": "LA", "type": "work" }
  ]
}
```

### 3. One-to-Many: Reference

```javascript
// Blog with many comments
// Posts collection
{
  "postId": 456,
  "title": "My Post",
  "commentCount": 150
}

// Comments collection (separate)
{
  "commentId": 789,
  "postId": 456,  // Reference
  "text": "Great post!",
  "user": "alice"
}
```

### 4. One-to-Squillions: Parent Referencing

```javascript
// Log entries (millions per host)
// Hosts collection
{
  "hostId": "server1",
  "name": "Web Server 1"
}

// Logs collection (references parent)
{
  "logId": "log123",
  "hostId": "server1",  // Reference to parent
  "timestamp": "2024-01-15T10:00:00Z",
  "message": "..."
}
```

### 5. Many-to-Many: Array of References

```javascript
// Products and Categories
{
  "productId": 123,
  "name": "Laptop",
  "categoryIds": [1, 5, 10]  // Array of category references
}

{
  "categoryId": 1,
  "name": "Electronics",
  "productIds": [123, 456, 789]  // Bidirectional
}
```

## Design Patterns

### Extended Reference Pattern

Store frequently accessed fields with reference.

```javascript
// Orders collection
{
  "orderId": 123,
  "customer": {
    "id": 456,
    "name": "John Doe",  // Denormalized
    "email": "john@example.com"  // Denormalized
  },
  "items": [...]
}

// Full customer data in customers collection
{
  "customerId": 456,
  "name": "John Doe",
  "email": "john@example.com",
  "address": {...},
  "preferences": {...}
  // ... more fields
}
```

### Subset Pattern

Store subset of data in document.

```javascript
// Product collection
{
  "productId": 123,
  "name": "Laptop",
  "recentReviews": [
    // Last 10 reviews embedded
    { "user": "alice", "rating": 5, "text": "Great!" }
  ],
  "reviewCount": 500,
  "averageRating": 4.5
}

// All reviews in separate collection
{
  "reviewId": 456,
  "productId": 123,
  "user": "alice",
  "rating": 5,
  "text": "Great product!",
  "helpful": 10
}
```

### Computed Pattern

Pre-calculate values.

```javascript
{
  "orderId": 123,
  "items": [
    { "product": "Laptop", "price": 999.99, "quantity": 1 },
    { "product": "Mouse", "price": 29.99, "quantity": 2 }
  ],
  // Pre-computed
  "subtotal": 1059.97,
  "tax": 106.00,
  "total": 1165.97,
  "itemCount": 2
}
```

### Bucket Pattern

Group time-series data.

```javascript
// Instead of one document per measurement
{
  "sensorId": "sensor1",
  "date": "2024-01-15",
  "hour": 10,
  "measurements": [
    { "minute": 0, "temperature": 20.5, "humidity": 65 },
    { "minute": 1, "temperature": 20.6, "humidity": 64 },
    // ... 60 measurements per hour
  ],
  "avgTemp": 20.7,
  "maxTemp": 21.2,
  "minTemp": 20.1
}
```

### Outlier Pattern

Handle exceptions differently.

```javascript
// Normal products (few reviews - embedded)
{
  "productId": 123,
  "name": "Regular Product",
  "reviews": [
    { "user": "alice", "rating": 5 },
    { "user": "bob", "rating": 4 }
  ]
}

// Popular products (many reviews - referenced)
{
  "productId": 456,
  "name": "Bestseller",
  "reviewCount": 5000,
  "hasExternalReviews": true  // Reviews in separate collection
}
```

## Schema Evolution

### Adding Fields

```javascript
// Old documents
{ "userId": 123, "name": "John" }

// New documents
{ "userId": 124, "name": "Jane", "email": "jane@example.com" }

// Application handles both
var email = user.email ?? "no-email@example.com";
```

### Migrating Data

```javascript
// Update all documents
db.users.updateMany(
  { email: { $exists: false } },
  { $set: { email: "" } }
)

// Or lazy migration
var user = db.users.findOne({ userId: 123 });
if (!user.email) {
  user.email = "";
  db.users.updateOne({ userId: 123 }, { $set: { email: "" } });
}
```

## Anti-Patterns

### Massive Arrays

```javascript
// BAD: Unbounded array growth
{
  "userId": 123,
  "activities": [
    // Thousands of activities... will exceed 16MB
  ]
}

// GOOD: Reference or bucket
{
  "userId": 123,
  "recentActivities": [
    // Last 10 activities
  ],
  "totalActivities": 5000
}
// Full activities in separate collection
```

### Massive Number of Collections

```javascript
// BAD: Collection per user
users_123_activities
users_124_activities
users_125_activities

// GOOD: Single collection with user field
activities: { userId: 123, ... }
```

### Storing Large Files

```javascript
// BAD: Binary data in document
{
  "userId": 123,
  "profilePicture": "<binary data 5MB>"  // Will hit 16MB limit quickly
}

// GOOD: Use GridFS or cloud storage
{
  "userId": 123,
  "profilePictureUrl": "https://s3.amazonaws.com/..."
}
```

## Real-World Examples

### E-commerce Product Catalog

```javascript
{
  "productId": "LAPTOP001",
  "name": "Gaming Laptop",
  "category": "Electronics",
  "price": 1299.99,
  "stock": 50,

  // Embedded (one-to-few)
  "specs": {
    "cpu": "Intel i7",
    "ram": "16GB",
    "storage": "512GB SSD"
  },

  // Embedded (subset pattern)
  "recentReviews": [
    { "user": "john123", "rating": 5, "text": "Great!" }
  ],

  // Computed
  "averageRating": 4.5,
  "reviewCount": 150,

  // Extended reference
  "supplier": {
    "id": "SUP001",
    "name": "Tech Supplier Inc"  // Denormalized
  }
}
```

### Social Media Post

```javascript
{
  "postId": "post123",
  "userId": "user456",

  // Extended reference (frequently accessed)
  "author": {
    "id": "user456",
    "name": "John Doe",
    "avatar": "https://..."
  },

  "content": "Check out this awesome post!",
  "timestamp": "2024-01-15T10:00:00Z",

  // Embedded (one-to-few)
  "media": [
    { "type": "image", "url": "https://..." }
  ],

  // Computed
  "likeCount": 42,
  "commentCount": 15,
  "shareCount": 3,

  // Reference (one-to-many)
  // Comments in separate collection
}
```

## Interview Tips

- Explain embedding vs referencing trade-offs
- Know design patterns (extended reference, subset, bucket)
- Understand when to denormalize
- Discuss 16MB document limit
- Know how to handle unbounded growth
- Explain schema evolution strategies
- Recognize anti-patterns

## Best Practices

1. **Design for access patterns**: How will data be queried?
2. **Embed for atomicity**: Related data updated together
3. **Reference for flexibility**: Data used independently
4. **Denormalize strategically**: For read performance
5. **Avoid unbounded arrays**: Use references for large sets
6. **Pre-compute when possible**: Store calculated values
7. **Plan for growth**: Consider future data volume

## Key Takeaways

1. NoSQL schema design is query-driven
2. Embed for one-to-few relationships
3. Reference for one-to-many relationships
4. Denormalization improves read performance
5. Document size limit (16MB) impacts design
6. Schema flexibility allows evolution
7. Choose patterns based on access patterns
