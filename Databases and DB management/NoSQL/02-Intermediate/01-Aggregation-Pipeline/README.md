# Aggregation Pipeline

## What is Aggregation?

Process of transforming and combining documents to produce computed results. MongoDB's equivalent of SQL GROUP BY, JOIN, and complex queries.

## Pipeline Concept

Data flows through stages, each stage transforms the documents.

```
Input Documents → Stage 1 → Stage 2 → Stage 3 → Output
```

## Basic Aggregation Stages

### $match - Filter Documents

```javascript
// SQL: WHERE clause
db.orders.aggregate([
  { $match: { status: "completed" } }
])

// With conditions
db.orders.aggregate([
  { $match: {
    status: "completed",
    total: { $gte: 100 }
  }}
])
```

### $project - Select/Transform Fields

```javascript
// SQL: SELECT clause
db.orders.aggregate([
  { $project: {
    orderId: 1,
    customerName: "$customer.name",
    total: 1,
    _id: 0
  }}
])

// Computed fields
db.orders.aggregate([
  { $project: {
    orderId: 1,
    total: 1,
    tax: { $multiply: ["$total", 0.1] }
  }}
])
```

### $group - Group and Aggregate

```javascript
// SQL: GROUP BY
db.orders.aggregate([
  { $group: {
    _id: "$customerId",
    totalOrders: { $sum: 1 },
    totalAmount: { $sum: "$total" },
    avgAmount: { $avg: "$total" },
    maxAmount: { $max: "$total" },
    minAmount: { $min: "$total" }
  }}
])

// Group by multiple fields
db.orders.aggregate([
  { $group: {
    _id: {
      year: { $year: "$orderDate" },
      month: { $month: "$orderDate" }
    },
    count: { $sum: 1 },
    revenue: { $sum: "$total" }
  }}
])
```

### $sort - Sort Results

```javascript
db.orders.aggregate([
  { $group: { _id: "$customerId", total: { $sum: "$total" } }},
  { $sort: { total: -1 } }  // Descending
])
```

### $limit and $skip - Pagination

```javascript
db.orders.aggregate([
  { $sort: { orderDate: -1 } },
  { $skip: 20 },
  { $limit: 10 }
])
```

## Advanced Stages

### $lookup - Join Collections

```javascript
// SQL: LEFT JOIN
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerInfo"
    }
  }
])

// Result:
{
  orderId: "order123",
  customerId: "customer456",
  total: 100.00,
  customerInfo: [
    { _id: "customer456", name: "John Doe", email: "..." }
  ]
}
```

### $unwind - Deconstruct Arrays

```javascript
// Before unwind:
{
  orderId: "order123",
  items: [
    { product: "Laptop", quantity: 1 },
    { product: "Mouse", quantity: 2 }
  ]
}

db.orders.aggregate([
  { $unwind: "$items" }
])

// After unwind (2 documents):
{ orderId: "order123", items: { product: "Laptop", quantity: 1 } }
{ orderId: "order123", items: { product: "Mouse", quantity: 2 } }
```

### $addFields - Add New Fields

```javascript
db.orders.aggregate([
  {
    $addFields: {
      totalWithTax: { $multiply: ["$total", 1.1] },
      year: { $year: "$orderDate" }
    }
  }
])
```

### $bucket - Group into Ranges

```javascript
db.products.aggregate([
  {
    $bucket: {
      groupBy: "$price",
      boundaries: [0, 50, 100, 500, 1000],
      default: "Other",
      output: {
        count: { $sum: 1 },
        products: { $push: "$name" }
      }
    }
  }
])
```

## Complex Examples

### 1. Sales Report by Category

```javascript
db.orders.aggregate([
  // Unwind order items
  { $unwind: "$items" },

  // Lookup product details
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "product"
    }
  },

  // Unwind product (single item)
  { $unwind: "$product" },

  // Group by category
  {
    $group: {
      _id: "$product.category",
      totalRevenue: {
        $sum: { $multiply: ["$items.quantity", "$items.price"] }
      },
      totalQuantity: { $sum: "$items.quantity" },
      orderCount: { $sum: 1 }
    }
  },

  // Sort by revenue
  { $sort: { totalRevenue: -1 } }
])
```

### 2. Customer Lifetime Value

```javascript
db.orders.aggregate([
  // Match completed orders
  { $match: { status: "completed" } },

  // Group by customer
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: "$total" },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: "$total" },
      firstOrder: { $min: "$orderDate" },
      lastOrder: { $max: "$orderDate" }
    }
  },

  // Lookup customer info
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "_id",
      as: "customer"
    }
  },

  { $unwind: "$customer" },

  // Calculate days between first and last order
  {
    $addFields: {
      customerLifetimeDays: {
        $divide: [
          { $subtract: ["$lastOrder", "$firstOrder"] },
          86400000  // milliseconds in a day
        ]
      }
    }
  },

  // Sort by total spent
  { $sort: { totalSpent: -1 } },

  // Top 100 customers
  { $limit: 100 }
])
```

### 3. Product Performance Analysis

```javascript
db.orders.aggregate([
  { $unwind: "$items" },

  {
    $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" },
      revenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
      orderCount: { $sum: 1 }
    }
  },

  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product"
    }
  },

  { $unwind: "$product" },

  {
    $project: {
      productName: "$product.name",
      category: "$product.category",
      totalSold: 1,
      revenue: 1,
      orderCount: 1,
      avgOrderQuantity: { $divide: ["$totalSold", "$orderCount"] }
    }
  },

  { $sort: { revenue: -1 } }
])
```

## Aggregation in C#

```csharp
using MongoDB.Driver;

var collection = database.GetCollection<Order>("orders");

// Simple aggregation
var result = await collection.Aggregate()
    .Match(o => o.Status == "completed")
    .Group(
        o => o.CustomerId,
        g => new
        {
            CustomerId = g.Key,
            TotalOrders = g.Count(),
            TotalAmount = g.Sum(o => o.Total)
        })
    .SortByDescending(r => r.TotalAmount)
    .ToListAsync();

// Complex aggregation with lookup
var pipeline = new[]
{
    new BsonDocument("$match", new BsonDocument("status", "completed")),
    new BsonDocument("$lookup", new BsonDocument
    {
        { "from", "customers" },
        { "localField", "customerId" },
        { "foreignField", "_id" },
        { "as", "customer" }
    }),
    new BsonDocument("$unwind", "$customer"),
    new BsonDocument("$group", new BsonDocument
    {
        { "_id", "$customer.country" },
        { "totalOrders", new BsonDocument("$sum", 1) },
        { "totalRevenue", new BsonDocument("$sum", "$total") }
    }),
    new BsonDocument("$sort", new BsonDocument("totalRevenue", -1))
};

var aggregateResult = await collection
    .Aggregate<BsonDocument>(pipeline)
    .ToListAsync();
```

### Typed Aggregation in C#

```csharp
public class SalesReport
{
    public string Category { get; set; }
    public decimal TotalRevenue { get; set; }
    public int TotalQuantity { get; set; }
}

var salesReport = await collection.Aggregate()
    .Unwind<Order, UnwindedOrder>(o => o.Items)
    .Lookup<UnwindedOrder, Product, LookupResult>(
        database.GetCollection<Product>("products"),
        r => r.Items.ProductId,
        p => p.Id,
        r => r.Product)
    .Unwind<LookupResult, UnwindedProduct>(r => r.Product)
    .Group(
        r => r.Product.Category,
        g => new SalesReport
        {
            Category = g.Key,
            TotalRevenue = g.Sum(r => r.Items.Quantity * r.Items.Price),
            TotalQuantity = g.Sum(r => r.Items.Quantity)
        })
    .SortByDescending(r => r.TotalRevenue)
    .ToListAsync();
```

## Performance Optimization

### 1. Use $match Early

```javascript
// Bad: Filter after lookup
db.orders.aggregate([
  { $lookup: { from: "customers", ... } },
  { $match: { status: "completed" } }  // Late filtering
])

// Good: Filter first
db.orders.aggregate([
  { $match: { status: "completed" } },  // Early filtering
  { $lookup: { from: "customers", ... } }
])
```

### 2. Use Indexes

```javascript
// Create index on frequently matched fields
db.orders.createIndex({ status: 1 })
db.orders.createIndex({ customerId: 1 })

db.orders.aggregate([
  { $match: { status: "completed" } },  // Uses index
  { $group: { _id: "$customerId", total: { $sum: "$total" } } }
])
```

### 3. Project Early

```javascript
// Bad: Carry unnecessary fields
db.orders.aggregate([
  { $lookup: { from: "customers", ... } },
  { $project: { orderId: 1, total: 1 } }  // Late projection
])

// Good: Project only needed fields
db.orders.aggregate([
  { $project: { customerId: 1, total: 1 } },  // Early projection
  { $lookup: { from: "customers", ... } }
])
```

### 4. Limit Results

```javascript
// Always limit if you don't need all results
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$total" } } },
  { $sort: { total: -1 } },
  { $limit: 100 }  // Top 100 only
])
```

## Common Aggregation Patterns

### Moving Average

```javascript
db.sales.aggregate([
  { $sort: { date: 1 } },
  {
    $setWindowFields: {
      sortBy: { date: 1 },
      output: {
        movingAvg: {
          $avg: "$amount",
          window: { documents: [-6, 0] }  // 7-day moving average
        }
      }
    }
  }
])
```

### Running Total

```javascript
db.transactions.aggregate([
  { $sort: { date: 1 } },
  {
    $group: {
      _id: null,
      transactions: { $push: "$$ROOT" }
    }
  },
  { $unwind: { path: "$transactions", includeArrayIndex: "index" } },
  {
    $group: {
      _id: "$transactions._id",
      date: { $first: "$transactions.date" },
      amount: { $first: "$transactions.amount" },
      runningTotal: {
        $sum: {
          $cond: [
            { $lte: ["$$ROOT.index", "$index"] },
            "$transactions.amount",
            0
          ]
        }
      }
    }
  }
])
```

## Interview Tips

- Explain pipeline stages concept
- Know common stages ($match, $group, $project, $lookup)
- Understand when to use $unwind
- Know performance optimization (early $match, indexes)
- Explain $lookup as JOIN equivalent
- Understand aggregation operators ($sum, $avg, etc.)
- Know how to use in C#

## Best Practices

1. **$match early**: Filter as soon as possible
2. **Use indexes**: On matched and grouped fields
3. **$project early**: Remove unnecessary fields
4. **Limit results**: Use $limit when appropriate
5. **Avoid $lookup** if possible (denormalize instead)
6. **Use explain()**: Check query performance
7. **Test with real data**: Aggregations can be slow

## Key Takeaways

1. Aggregation pipeline processes documents through stages
2. Each stage transforms the data
3. Similar to SQL GROUP BY and JOIN
4. $match filters, $group aggregates, $lookup joins
5. Performance depends on pipeline order
6. Use indexes for better performance
7. C# driver supports typed aggregations
