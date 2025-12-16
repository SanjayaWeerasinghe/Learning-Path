# LINQ (Language Integrated Query)

## What You'll Learn
- What LINQ is and why it's powerful
- Query syntax vs Method syntax
- Filtering with Where
- Projection with Select
- Sorting with OrderBy
- Grouping with GroupBy
- Aggregation (Sum, Count, Average, etc.)
- Joining collections
- Quantifiers (Any, All, Contains)
- Common LINQ methods and patterns

## Concept Overview

LINQ (Language Integrated Query) provides a consistent way to query data from different sources (collections, databases, XML) using C# syntax.

### Basic LINQ - Method Syntax

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Filter - Where
var evenNumbers = numbers.Where(n => n % 2 == 0);
// Result: 2, 4, 6, 8, 10

// Transform - Select
var squares = numbers.Select(n => n * n);
// Result: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100

// First
int firstEven = numbers.First(n => n % 2 == 0);  // 2

// Single
int[] oneItem = { 42 };
int single = oneItem.Single();  // 42

// Count
int count = numbers.Count(n => n > 5);  // 5
```

### Query Syntax

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Query syntax
var evenNumbers = from n in numbers
                  where n % 2 == 0
                  select n;

// Method syntax (equivalent)
var evenNumbersMethod = numbers.Where(n => n % 2 == 0);

// Both produce the same result: 2, 4, 6, 8, 10
```

### Filtering with Where

```csharp
class Product
{
    public string Name { get; set; }
    public double Price { get; set; }
    public string Category { get; set; }
}

List<Product> products = new List<Product>
{
    new Product { Name = "Laptop", Price = 999, Category = "Electronics" },
    new Product { Name = "Mouse", Price = 25, Category = "Electronics" },
    new Product { Name = "Desk", Price = 300, Category = "Furniture" },
    new Product { Name = "Chair", Price = 150, Category = "Furniture" }
};

// Single condition
var expensive = products.Where(p => p.Price > 100);

// Multiple conditions
var expensiveElectronics = products.Where(p => p.Price > 100 && p.Category == "Electronics");

// Complex condition
var filtered = products.Where(p =>
{
    if (p.Category == "Electronics") return p.Price > 50;
    if (p.Category == "Furniture") return p.Price < 200;
    return false;
});
```

### Projection with Select

```csharp
// Select single property
var names = products.Select(p => p.Name);
// Result: "Laptop", "Mouse", "Desk", "Chair"

// Select with transformation
var prices = products.Select(p => p.Price * 1.1);  // Add 10% tax

// Select anonymous type
var productSummary = products.Select(p => new
{
    p.Name,
    p.Price,
    PriceWithTax = p.Price * 1.1
});

// Select with index
var indexed = products.Select((p, index) => new
{
    Index = index,
    Name = p.Name
});
```

### Sorting

```csharp
// OrderBy (ascending)
var sorted = products.OrderBy(p => p.Price);

// OrderByDescending
var sortedDesc = products.OrderByDescending(p => p.Price);

// ThenBy (secondary sort)
var multiSort = products
    .OrderBy(p => p.Category)
    .ThenBy(p => p.Price);

// ThenByDescending
var multiSort2 = products
    .OrderBy(p => p.Category)
    .ThenByDescending(p => p.Price);
```

### Grouping

```csharp
// Group by category
var grouped = products.GroupBy(p => p.Category);

foreach (var group in grouped)
{
    Console.WriteLine($"Category: {group.Key}");
    foreach (var product in group)
    {
        Console.WriteLine($"  {product.Name}: ${product.Price}");
    }
}

// Group with aggregation
var categoryStats = products
    .GroupBy(p => p.Category)
    .Select(g => new
    {
        Category = g.Key,
        Count = g.Count(),
        AveragePrice = g.Average(p => p.Price),
        TotalValue = g.Sum(p => p.Price)
    });
```

### Aggregation

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Count
int count = numbers.Count();  // 10
int evenCount = numbers.Count(n => n % 2 == 0);  // 5

// Sum
int sum = numbers.Sum();  // 55
double totalPrice = products.Sum(p => p.Price);

// Average
double avg = numbers.Average();  // 5.5
double avgPrice = products.Average(p => p.Price);

// Min / Max
int min = numbers.Min();  // 1
int max = numbers.Max();  // 10
double cheapest = products.Min(p => p.Price);
double mostExpensive = products.Max(p => p.Price);

// Aggregate (custom accumulation)
int product = numbers.Aggregate((a, b) => a * b);  // 1*2*3*...*10
```

### Quantifiers

```csharp
// Any - checks if any element matches condition
bool hasExpensive = products.Any(p => p.Price > 500);  // true
bool hasBooks = products.Any(p => p.Category == "Books");  // false

// All - checks if all elements match condition
bool allExpensive = products.All(p => p.Price > 100);  // false
bool allHaveNames = products.All(p => !string.IsNullOrEmpty(p.Name));  // true

// Contains
bool hasLaptop = products.Select(p => p.Name).Contains("Laptop");  // true
```

### Joining Collections

```csharp
class Customer
{
    public int ID { get; set; }
    public string Name { get; set; }
}

class Order
{
    public int ID { get; set; }
    public int CustomerID { get; set; }
    public double Amount { get; set; }
}

List<Customer> customers = new List<Customer>
{
    new Customer { ID = 1, Name = "Alice" },
    new Customer { ID = 2, Name = "Bob" }
};

List<Order> orders = new List<Order>
{
    new Order { ID = 101, CustomerID = 1, Amount = 100 },
    new Order { ID = 102, CustomerID = 1, Amount = 200 },
    new Order { ID = 103, CustomerID = 2, Amount = 150 }
};

// Join
var customerOrders = from c in customers
                     join o in orders on c.ID equals o.CustomerID
                     select new
                     {
                         CustomerName = c.Name,
                         OrderID = o.ID,
                         Amount = o.Amount
                     };

// Group join
var customersWithOrders = from c in customers
                          join o in orders on c.ID equals o.CustomerID into customerOrders
                          select new
                          {
                              Customer = c.Name,
                              Orders = customerOrders.ToList()
                          };
```

### Skip and Take (Pagination)

```csharp
List<int> numbers = Enumerable.Range(1, 100).ToList();

// Take first 10
var first10 = numbers.Take(10);

// Skip first 10, take next 10
var second10 = numbers.Skip(10).Take(10);

// Pagination helper
int pageSize = 10;
int pageNumber = 3;
var page = numbers.Skip((pageNumber - 1) * pageSize).Take(pageSize);

// TakeWhile / SkipWhile
var takeWhile = numbers.TakeWhile(n => n < 5);  // 1, 2, 3, 4
var skipWhile = numbers.SkipWhile(n => n < 5).Take(5);  // 5, 6, 7, 8, 9
```

### Distinct, Union, Intersect, Except

```csharp
List<int> list1 = new List<int> { 1, 2, 3, 4, 5 };
List<int> list2 = new List<int> { 4, 5, 6, 7, 8 };
List<int> duplicates = new List<int> { 1, 1, 2, 2, 3, 3 };

// Distinct
var unique = duplicates.Distinct();  // 1, 2, 3

// Union (all unique elements from both)
var union = list1.Union(list2);  // 1, 2, 3, 4, 5, 6, 7, 8

// Intersect (common elements)
var intersect = list1.Intersect(list2);  // 4, 5

// Except (elements in first but not in second)
var except = list1.Except(list2);  // 1, 2, 3
```

## Your Tasks

### Task 1: Basic Filtering
Create a list of integers from 1 to 50.
- Find all even numbers
- Find all numbers divisible by 3
- Find all numbers between 10 and 30
- Find all prime numbers (create helper method)
Display results for each query.

### Task 2: Student Grade Analysis
Create a `Student` class with Name, Age, Grade, Major.
Create a list of 10 students.
- Find all students with grade > 80
- Find all students studying "Computer Science"
- Find students aged between 18 and 22
- Get names of top 5 students by grade
Display results.

### Task 3: Product Catalog
Create a `Product` class with Name, Price, Category, InStock.
Create a list of 15 products across 3 categories.
- Find all products in stock under $50
- Group products by category and show count
- Find most expensive product in each category
- Calculate average price per category
Display formatted results.

### Task 4: String Manipulation
Create a list of 20 random words.
- Find all words longer than 5 characters
- Find all words starting with 'A'
- Sort words alphabetically
- Group words by first letter
- Find words containing 'e'
Display results.

### Task 5: Projection and Transformation
Create an `Employee` class with Name, Salary, Department, YearsOfService.
Create a list of 12 employees.
- Project to anonymous type with Name and Annual Salary
- Calculate bonus (5% × Salary × YearsOfService)
- Create summary: Name, Department, Total Compensation
- Transform to uppercase names
Display transformed data.

### Task 6: Complex Filtering
Create an `Order` class with OrderID, CustomerName, Amount, Date, Status.
Create a list of 20 orders.
- Find orders from last 30 days with amount > $100
- Find pending orders grouped by customer
- Calculate total sales per month
- Find customers with more than 3 orders
Display analysis.

### Task 7: Aggregation Operations
Create a list of 100 random numbers (1-1000).
- Calculate sum, average, min, max
- Count numbers in ranges: 1-250, 251-500, 501-750, 751-1000
- Find median value
- Calculate standard deviation
Display statistics.

### Task 8: Joining Data
Create `Customer` and `Order` classes with relationship.
Create lists of customers and orders.
- Join customers with their orders
- Show customers with total order amounts
- Find customers with no orders
- Show top 5 customers by total spending
Display customer order summary.

### Task 9: Grouping and Analysis
Create a `Book` class with Title, Author, Genre, Year, Rating.
Create a list of 25 books.
- Group books by genre, show average rating
- Group books by decade
- Find top-rated book in each genre
- Show authors with multiple books
Display comprehensive analysis.

### Task 10: Advanced Queries
Create a `Transaction` class with ID, Account, Type (Deposit/Withdrawal), Amount, Date.
Create a list of 30 transactions.
- Calculate running balance for each account
- Find accounts with total deposits > total withdrawals
- Show daily transaction summary
- Detect suspicious transactions (amount > $1000)
Display financial analysis.

### Task 11: Pagination System
Create a list of 100 products.
Implement pagination:
- Method: `GetPage(int pageNumber, int pageSize)`
- Show total pages
- Navigate: first page, last page, next, previous
- Search within pages
Display paginated results with navigation.

### Task 12: Comprehensive LINQ System
Create a complete student management system:
- Classes: Student, Course, Enrollment, Grade
- Students enroll in multiple courses
- Each enrollment has grades
Queries:
- Students with GPA > 3.5
- Courses with most enrollments
- Students failing any course
- Average grade per course
- Students not enrolled in any course
- Course difficulty ranking by average grade
Display complete academic report.

## Expected Output Examples

**Task 1:**
```
Even numbers: 2, 4, 6, 8, 10... (25 total)
Divisible by 3: 3, 6, 9, 12, 15... (16 total)
Between 10 and 30: 10, 11, 12... 30 (21 total)
Prime numbers: 2, 3, 5, 7, 11, 13... (15 total)
```

**Task 3:**
```
Products in stock under $50:
1. Mouse - $25.00 (Electronics)
2. Keyboard - $45.00 (Electronics)
3. Notepad - $5.00 (Office)

Products by Category:
Electronics: 6 products, Avg: $350.00
Furniture: 5 products, Avg: $250.00
Office: 4 products, Avg: $15.00

Most Expensive by Category:
Electronics: Laptop ($999.99)
Furniture: Executive Desk ($450.00)
Office: Printer Paper ($25.00)
```

**Task 8:**
```
Customer Order Summary:

Alice Johnson
  Order #1001: $150.00
  Order #1003: $75.00
  Total: $225.00

Bob Smith
  Order #1002: $300.00
  Order #1004: $120.00
  Total: $420.00

Top 5 Customers by Spending:
1. Bob Smith: $420.00
2. Alice Johnson: $225.00
```

**Task 12:**
```
Academic Report:

High Achievers (GPA > 3.5):
1. Alice Johnson - GPA: 3.8
2. Bob Smith - GPA: 3.6

Most Popular Courses:
1. Introduction to Programming - 45 students
2. Data Structures - 38 students

Course Difficulty Ranking:
1. Advanced Algorithms - Avg: 72.5 (Hard)
2. Database Systems - Avg: 78.3 (Medium)
3. Web Development - Avg: 85.2 (Easy)
```

## Tips
- Use method syntax for most queries (more flexible)
- Use query syntax for complex queries with multiple from/join
- LINQ queries are deferred - they execute when enumerated
- Use `.ToList()` or `.ToArray()` to execute immediately
- Chain multiple LINQ operations for complex queries
- Use `FirstOrDefault()` instead of `First()` to avoid exceptions
- Take advantage of type inference with `var`
- Use `Any()` instead of `Count() > 0` for better performance
- Consider performance for large datasets

## Common Mistakes

```csharp
// ❌ Multiple enumeration
var query = numbers.Where(n => n > 5);
int count = query.Count();  // Enumerates
int sum = query.Sum();      // Enumerates again!

// ✅ Materialize once
var list = numbers.Where(n => n > 5).ToList();
int count = list.Count();
int sum = list.Sum();

// ❌ Using First when item might not exist
var product = products.First(p => p.Name == "NonExistent");  // Exception!

// ✅ Use FirstOrDefault
var product = products.FirstOrDefault(p => p.Name == "NonExistent");
if (product != null)
{
    // Use product
}

// ❌ Forgetting deferred execution
var query = numbers.Where(n => n > 5);
numbers.Add(10);  // Query will include 10!
var result = query.ToList();

// ✅ Materialize immediately if needed
var result = numbers.Where(n => n > 5).ToList();
numbers.Add(10);  // Result won't include 10

// ❌ Inefficient queries
var maxPrice = products.Max(p => p.Price);
var maxProduct = products.First(p => p.Price == maxPrice);  // Iterates twice

// ✅ Single iteration
var maxProduct = products.OrderByDescending(p => p.Price).First();

// ❌ Using Count() for existence check
if (products.Count(p => p.Price > 100) > 0)  // Counts all!

// ✅ Use Any()
if (products.Any(p => p.Price > 100))  // Stops at first match
```

## Key Concepts
- **LINQ**: Language Integrated Query for querying collections
- **Deferred Execution**: Query executes when enumerated, not when defined
- **Method Syntax**: Using method calls and lambda expressions
- **Query Syntax**: Using SQL-like syntax with from/where/select
- **Projection**: Transforming data with Select
- **Filtering**: Selecting subset with Where
- **Aggregation**: Computing single value from collection
- **Grouping**: Organizing data into groups
- **Joining**: Combining data from multiple sources
- **Quantifiers**: Testing conditions (Any, All, Contains)

## Next Steps
Move on to `04-Async-Await` to learn asynchronous programming!
