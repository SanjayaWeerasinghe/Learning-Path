# Entity Framework Core

## Introduction

Entity Framework Core (EF Core) is a modern object-relational mapper (ORM) that enables .NET developers to work with databases using .NET objects, eliminating the need for most data-access code.

## Installing EF Core

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet tool install --global dotnet-ef
```

## DbContext

### Creating DbContext
```csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
}
```

### Configuring DbContext
```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));
```

## Models

### Entity Class
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Product> Products { get; set; }
}
```

## Migrations

### Create Migration
```bash
dotnet ef migrations add InitialCreate
```

### Update Database
```bash
dotnet ef database update
```

### Remove Migration
```bash
dotnet ef migrations remove
```

### List Migrations
```bash
dotnet ef migrations list
```

## CRUD Operations

### Create
```csharp
var product = new Product { Name = "Laptop", Price = 999.99m };
_context.Products.Add(product);
await _context.SaveChangesAsync();
```

### Read
```csharp
// Get all
var products = await _context.Products.ToListAsync();

// Get by ID
var product = await _context.Products.FindAsync(id);

// Query with filter
var expensiveProducts = await _context.Products
    .Where(p => p.Price > 500)
    .ToListAsync();
```

### Update
```csharp
var product = await _context.Products.FindAsync(id);
product.Name = "Updated Name";
await _context.SaveChangesAsync();
```

### Delete
```csharp
var product = await _context.Products.FindAsync(id);
_context.Products.Remove(product);
await _context.SaveChangesAsync();
```

## Relationships

### One-to-Many
```csharp
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Product> Products { get; set; }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
```

### Many-to-Many
```csharp
public class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<Course> Courses { get; set; }
}

public class Course
{
    public int Id { get; set; }
    public string Title { get; set; }
    public List<Student> Students { get; set; }
}
```

## Querying

### Eager Loading
```csharp
var products = await _context.Products
    .Include(p => p.Category)
    .ToListAsync();
```

### Explicit Loading
```csharp
var category = await _context.Categories.FindAsync(id);
await _context.Entry(category)
    .Collection(c => c.Products)
    .LoadAsync();
```

### Lazy Loading
```csharp
// Install: Microsoft.EntityFrameworkCore.Proxies
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseLazyLoadingProxies()
           .UseSqlServer(connectionString));

public class Category
{
    public virtual List<Product> Products { get; set; }
}
```

## LINQ Queries

```csharp
// Filtering
var products = await _context.Products
    .Where(p => p.Price > 100)
    .ToListAsync();

// Ordering
var products = await _context.Products
    .OrderBy(p => p.Name)
    .ThenByDescending(p => p.Price)
    .ToListAsync();

// Projection
var productNames = await _context.Products
    .Select(p => p.Name)
    .ToListAsync();

// Grouping
var grouped = await _context.Products
    .GroupBy(p => p.CategoryId)
    .Select(g => new { CategoryId = g.Key, Count = g.Count() })
    .ToListAsync();
```

## Fluent API

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>(entity =>
    {
        entity.HasKey(e => e.Id);
        entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
        entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
        entity.HasOne(e => e.Category)
              .WithMany(c => c.Products)
              .HasForeignKey(e => e.CategoryId);
    });
}
```

## Practical Tasks

### Task 1: Setup EF Core
- Install EF Core packages
- Create DbContext
- Configure connection string
- Create initial migration

### Task 2: CRUD Operations
- Implement Create operations
- Implement Read operations
- Implement Update operations
- Implement Delete operations

### Task 3: Relationships
- Create one-to-many relationship
- Create many-to-many relationship
- Query related data
- Use Include for eager loading

### Task 4: Advanced Queries
- Write complex LINQ queries
- Implement filtering and sorting
- Use projections
- Implement paging

## Best Practices

1. Use async operations
2. Dispose DbContext properly
3. Use migrations for schema changes
4. Avoid lazy loading in loops (N+1 problem)
5. Use projections to select only needed data
6. Implement repository pattern for abstraction
7. Use transactions for multiple operations

## Interview Questions

1. What is Entity Framework Core?
2. Explain migrations in EF Core
3. What are the different loading strategies?
4. How do you implement relationships?
5. What is the N+1 problem?
6. Difference between DbSet and DbContext?
7. When to use Fluent API vs Data Annotations?

## Next Steps

- Build Web APIs with EF Core
- Implement Repository pattern
- Learn authentication and authorization
- Explore advanced EF Core features
