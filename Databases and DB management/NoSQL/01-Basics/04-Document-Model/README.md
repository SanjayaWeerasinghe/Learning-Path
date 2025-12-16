# Document Model

## What is the Document Model?

A database model that stores data in documents (typically JSON/BSON format) instead of tables and rows.

## Document Structure

### JSON Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "NYC",
    "zip": "10001"
  },
  "hobbies": ["reading", "gaming", "coding"],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Key Characteristics

1. **Self-describing**: Document contains both data and structure
2. **Hierarchical**: Nested objects and arrays
3. **Flexible schema**: Different documents can have different fields
4. **No joins**: Related data embedded or referenced

## Document vs Relational Model

### Relational (SQL)
```sql
-- Customers table
CREATE TABLE customers (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100)
);

-- Addresses table
CREATE TABLE addresses (
    id INT PRIMARY KEY,
    customer_id INT,
    street VARCHAR(100),
    city VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Orders table
CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Query with joins
SELECT c.first_name, a.city, o.order_date
FROM customers c
JOIN addresses a ON c.id = a.customer_id
JOIN orders o ON c.id = o.customer_id;
```

### Document (NoSQL)
```json
{
  "_id": "customer123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "addresses": [
    { "street": "123 Main St", "city": "NYC", "type": "home" },
    { "street": "456 Work Ave", "city": "LA", "type": "work" }
  ],
  "orders": [
    { "orderId": "order1", "date": "2024-01-15", "total": 99.99 },
    { "orderId": "order2", "date": "2024-01-20", "total": 149.99 }
  ]
}
```

**Single Query - No Joins!**

## Schema Design Patterns

### 1. Embedding (Denormalization)

**When to use:**
- One-to-few relationships
- Data accessed together
- Data doesn't change often

```json
{
  "_id": "blog123",
  "title": "Introduction to NoSQL",
  "author": "John Doe",
  "comments": [
    {
      "user": "Alice",
      "text": "Great post!",
      "date": "2024-01-15"
    },
    {
      "user": "Bob",
      "text": "Very helpful",
      "date": "2024-01-16"
    }
  ]
}
```

**Pros:**
- Single query retrieval
- Better performance
- Atomic updates

**Cons:**
- Data duplication
- Document size limits
- Harder to query embedded data

### 2. Referencing (Normalization)

**When to use:**
- One-to-many or many-to-many
- Data accessed separately
- Data changes frequently
- Large subdocuments

```json
// Users collection
{
  "_id": "user123",
  "name": "John Doe",
  "email": "john@example.com"
}

// Posts collection
{
  "_id": "post456",
  "title": "My Post",
  "authorId": "user123",  // Reference
  "content": "..."
}
```

**Pros:**
- No duplication
- Smaller documents
- Easier updates

**Cons:**
- Multiple queries
- Application-level joins
- Complex queries

### 3. Hybrid Approach

Store frequently accessed data embedded, reference the rest.

```json
{
  "_id": "post123",
  "title": "Introduction to NoSQL",
  "author": {
    "id": "user456",
    "name": "John Doe"  // Embedded for quick access
  },
  "commentIds": ["comment1", "comment2"]  // Referenced for full details
}
```

## Common Design Patterns

### 1. Attribute Pattern
Handle varying attributes efficiently.

```json
// Instead of:
{
  "product": "Laptop",
  "screen_size": "15 inches",
  "cpu": "Intel i7",
  "ram": "16GB"
}

// Use:
{
  "product": "Laptop",
  "attributes": [
    { "key": "screen_size", "value": "15 inches" },
    { "key": "cpu", "value": "Intel i7" },
    { "key": "ram", "value": "16GB" }
  ]
}
```

**Benefits**: Easy to query any attribute, flexible schema

### 2. Bucket Pattern
Group data into time-based buckets.

```json
// Instead of one document per measurement:
{ "sensorId": "sensor1", "timestamp": "2024-01-15T10:00:00Z", "temp": 20 }
{ "sensorId": "sensor1", "timestamp": "2024-01-15T10:01:00Z", "temp": 21 }

// Use buckets (one document per hour):
{
  "sensorId": "sensor1",
  "date": "2024-01-15",
  "hour": 10,
  "measurements": [
    { "minute": 0, "temp": 20 },
    { "minute": 1, "temp": 21 },
    { "minute": 2, "temp": 20.5 }
  ]
}
```

**Benefits**: Fewer documents, better performance

### 3. Outlier Pattern
Handle exceptions differently.

```json
// Most products have few reviews (embedded)
{
  "productId": "laptop1",
  "name": "Laptop",
  "reviews": [
    { "user": "alice", "rating": 5 },
    { "user": "bob", "rating": 4 }
  ]
}

// Popular products with many reviews (referenced)
{
  "productId": "bestseller1",
  "name": "Popular Laptop",
  "reviewCount": 5000,
  "hasExternalReviews": true  // Reviews in separate collection
}
```

### 4. Computed Pattern
Store pre-calculated values.

```json
{
  "orderId": "order123",
  "items": [
    { "product": "Laptop", "price": 999.99, "quantity": 1 },
    { "product": "Mouse", "price": 29.99, "quantity": 2 }
  ],
  "subtotal": 999.99,
  "tax": 100.00,
  "total": 1099.99,  // Pre-computed
  "itemCount": 2     // Pre-computed
}
```

### 5. Extended Reference Pattern
Store frequently accessed fields from referenced document.

```json
{
  "orderId": "order123",
  "customer": {
    "id": "customer456",
    "name": "John Doe",  // Denormalized for quick access
    "email": "john@example.com"  // Denormalized
  },
  "items": [...]
}
```

## Document Size Limits

### MongoDB
- **Maximum**: 16 MB per document
- **Reason**: Performance and efficiency

**Solutions for large data:**
1. Use GridFS for files
2. Reference instead of embed
3. Use bucket pattern
4. Split into multiple documents

```json
// Bad: Large array
{
  "userId": "user123",
  "activities": [
    // Thousands of activities... will exceed 16MB
  ]
}

// Good: Reference or bucket
{
  "userId": "user123",
  "activityCount": 10000,
  "recentActivities": [
    // Last 10 activities embedded
  ]
}
// Full activities in separate collection
```

## Schema Design Considerations

### 1. Access Patterns
Design based on how data is queried.

```json
// If you always show user with orders:
{
  "_id": "user123",
  "name": "John",
  "recentOrders": [
    // Embed last 5 orders
  ],
  "totalOrders": 50
}

// If orders queried separately:
// Users collection
{ "_id": "user123", "name": "John" }

// Orders collection
{ "orderId": "order1", "userId": "user123" }
```

### 2. Data Growth
Consider how data will grow over time.

```json
// Will comments grow unbounded?
{
  "postId": "post123",
  "comments": []  // Could grow to thousands
}

// Better: Reference if unbounded growth expected
{
  "postId": "post123",
  "commentCount": 150
}
// Comments in separate collection
```

### 3. Update Patterns
How often and what fields are updated?

```json
// Frequently updated: Separate
// User profile (rarely updated)
{ "_id": "user123", "name": "John", "email": "..." }

// User stats (frequently updated)
{ "userId": "user123", "loginCount": 500, "lastLogin": "..." }
```

## Indexing Embedded Fields

```javascript
// Create index on embedded field
db.users.createIndex({ "address.city": 1 })

// Query
db.users.find({ "address.city": "NYC" })

// Array index
db.products.createIndex({ "tags": 1 })
db.products.find({ "tags": "electronics" })
```

## Interview Tips

- Explain embedding vs referencing trade-offs
- Know common design patterns
- Understand 16MB document limit
- Discuss access patterns importance
- Know when to denormalize
- Explain schema flexibility benefits/challenges

## Best Practices

1. **Design for your queries**: Schema should match access patterns
2. **Embed related data** accessed together
3. **Reference** frequently changing or large data
4. **Avoid unbounded arrays**: Use references or bucket pattern
5. **Denormalize strategically**: For performance where needed
6. **Consider document size**: Stay well under 16MB limit
7. **Index properly**: Index fields used in queries

## Key Takeaways

1. Document model stores self-contained documents
2. Flexible schema allows varying structures
3. Embed for performance, reference for flexibility
4. Design based on access patterns
5. No joins - data accessed in single query
6. Document size limits (16MB in MongoDB)
7. Schema design is critical for performance
