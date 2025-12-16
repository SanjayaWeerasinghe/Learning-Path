# C# Fundamentals - Interview Questions & Answers

## Table of Contents
1. [C# Basics](#c-basics)
2. [Object-Oriented Programming](#object-oriented-programming)
3. [LINQ](#linq)
4. [Async/Await](#asyncawait)
5. [Collections and Generics](#collections-and-generics)
6. [Exception Handling](#exception-handling)

---

## C# Basics

### Question
**What is C# and what are its key features?**

### Answer
C# is a modern, object-oriented programming language developed by Microsoft. It's part of the .NET ecosystem.

**Key Features:**
- **Type-safe**: Strong typing prevents type errors
- **Object-Oriented**: Classes, inheritance, polymorphism
- **Garbage Collection**: Automatic memory management
- **Cross-platform**: Runs on Windows, Linux, macOS (.NET Core/.NET 5+)
- **Rich Standard Library**: Comprehensive BCL (Base Class Library)

### Better Explanation

**Basic Syntax:**
```csharp
using System;

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            // Variables
            int age = 25;
            string name = "John";
            bool isActive = true;
            var salary = 50000.0; // Type inference

            // String interpolation
            Console.WriteLine($"{name} is {age} years old");

            // Nullable types
            int? nullableAge = null;
            if (nullableAge.HasValue)
            {
                Console.WriteLine(nullableAge.Value);
            }

            // Null-coalescing operator
            int displayAge = nullableAge ?? 0;
        }
    }
}
```

**Value Types vs Reference Types:**
```csharp
// Value Types (stored on stack)
int x = 10;
int y = x;  // Copies the value
y = 20;     // x is still 10

struct Point
{
    public int X { get; set; }
    public int Y { get; set; }
}

// Reference Types (stored on heap)
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

Person person1 = new Person { Name = "John", Age = 25 };
Person person2 = person1; // Copies the reference
person2.Age = 30;         // person1.Age is also 30
```

**Properties:**
```csharp
public class User
{
    // Auto-property
    public string Name { get; set; }

    // Property with backing field
    private int _age;
    public int Age
    {
        get { return _age; }
        set
        {
            if (value >= 0)
                _age = value;
        }
    }

    // Read-only property
    public string FullName => $"{FirstName} {LastName}";

    // Init-only property (C# 9+)
    public string Id { get; init; }
}

// Usage
var user = new User
{
    Name = "John",
    Age = 25,
    Id = "123"
};
// user.Id = "456"; // Error: init-only
```

**Methods:**
```csharp
public class Calculator
{
    // Regular method
    public int Add(int a, int b)
    {
        return a + b;
    }

    // Expression-bodied method
    public int Subtract(int a, int b) => a - b;

    // Method with optional parameters
    public int Multiply(int a, int b = 1)
    {
        return a * b;
    }

    // Method with out parameter
    public bool TryParse(string input, out int result)
    {
        return int.TryParse(input, out result);
    }

    // Method with ref parameter
    public void Increment(ref int value)
    {
        value++;
    }
}
```

---

## Object-Oriented Programming

### Question
**Explain OOP principles in C#.**

### Answer

**1. Encapsulation:**
```csharp
public class BankAccount
{
    // Private fields
    private decimal _balance;
    private string _accountNumber;

    // Public properties
    public string AccountNumber
    {
        get { return _accountNumber; }
        private set { _accountNumber = value; }
    }

    public decimal Balance => _balance; // Read-only

    public BankAccount(string accountNumber)
    {
        _accountNumber = accountNumber;
        _balance = 0;
    }

    // Public methods to interact with private data
    public void Deposit(decimal amount)
    {
        if (amount > 0)
            _balance += amount;
    }

    public bool Withdraw(decimal amount)
    {
        if (amount > 0 && _balance >= amount)
        {
            _balance -= amount;
            return true;
        }
        return false;
    }
}
```

**2. Inheritance:**
```csharp
// Base class
public class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }

    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic sound");
    }

    public void Sleep()
    {
        Console.WriteLine("Sleeping...");
    }
}

// Derived class
public class Dog : Animal
{
    public string Breed { get; set; }

    // Override base method
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }

    // New method
    public void Fetch()
    {
        Console.WriteLine("Fetching...");
    }
}

// Usage
Dog dog = new Dog
{
    Name = "Buddy",
    Age = 3,
    Breed = "Golden Retriever"
};
dog.MakeSound(); // Woof!
dog.Sleep();     // Sleeping...
```

**3. Polymorphism:**
```csharp
public abstract class Shape
{
    public abstract double GetArea();
    public abstract double GetPerimeter();
}

public class Circle : Shape
{
    public double Radius { get; set; }

    public Circle(double radius)
    {
        Radius = radius;
    }

    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }

    public override double GetPerimeter()
    {
        return 2 * Math.PI * Radius;
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }

    public override double GetArea()
    {
        return Width * Height;
    }

    public override double GetPerimeter()
    {
        return 2 * (Width + Height);
    }
}

// Usage - Polymorphism in action
List<Shape> shapes = new List<Shape>
{
    new Circle(5),
    new Rectangle(4, 6)
};

foreach (Shape shape in shapes)
{
    Console.WriteLine($"Area: {shape.GetArea()}");
}
```

**4. Interfaces:**
```csharp
public interface IRepository<T>
{
    T GetById(int id);
    IEnumerable<T> GetAll();
    void Add(T entity);
    void Update(T entity);
    void Delete(int id);
}

public class UserRepository : IRepository<User>
{
    private List<User> _users = new List<User>();

    public User GetById(int id)
    {
        return _users.FirstOrDefault(u => u.Id == id);
    }

    public IEnumerable<User> GetAll()
    {
        return _users;
    }

    public void Add(User entity)
    {
        _users.Add(entity);
    }

    public void Update(User entity)
    {
        var existing = GetById(entity.Id);
        if (existing != null)
        {
            // Update properties
        }
    }

    public void Delete(int id)
    {
        var user = GetById(id);
        if (user != null)
            _users.Remove(user);
    }
}
```

---

## LINQ

### Question
**What is LINQ and how do you use it?**

### Answer
LINQ (Language Integrated Query) provides a consistent way to query data from different sources.

### Better Explanation

**Query Syntax vs Method Syntax:**
```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Query Syntax
var queryResult = from n in numbers
                  where n % 2 == 0
                  select n;

// Method Syntax (more common)
var methodResult = numbers.Where(n => n % 2 == 0);
```

**Common LINQ Operations:**
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
}

List<Product> products = GetProducts();

// Where - Filtering
var expensiveProducts = products.Where(p => p.Price > 100);

// Select - Projection
var productNames = products.Select(p => p.Name);
var productDtos = products.Select(p => new
{
    p.Id,
    p.Name,
    PriceInEuros = p.Price * 0.85m
});

// OrderBy / OrderByDescending
var sortedProducts = products.OrderBy(p => p.Price);
var sortedDesc = products.OrderByDescending(p => p.Price);

// ThenBy - Secondary sort
var sorted = products
    .OrderBy(p => p.Category)
    .ThenBy(p => p.Name);

// First / FirstOrDefault
var first = products.First(); // Throws if empty
var firstOrNull = products.FirstOrDefault(); // Returns null if empty
var firstExpensive = products.First(p => p.Price > 100);

// Single / SingleOrDefault
var single = products.Single(p => p.Id == 1); // Throws if not exactly one

// Any / All
bool hasExpensive = products.Any(p => p.Price > 1000);
bool allExpensive = products.All(p => p.Price > 10);

// Count / Sum / Average / Min / Max
int count = products.Count();
int expensiveCount = products.Count(p => p.Price > 100);
decimal total = products.Sum(p => p.Price);
decimal average = products.Average(p => p.Price);
decimal min = products.Min(p => p.Price);
decimal max = products.Max(p => p.Price);

// GroupBy
var grouped = products.GroupBy(p => p.Category);
foreach (var group in grouped)
{
    Console.WriteLine($"Category: {group.Key}");
    foreach (var product in group)
    {
        Console.WriteLine($"  - {product.Name}");
    }
}

// Distinct
var categories = products.Select(p => p.Category).Distinct();

// Skip / Take (Pagination)
var page2 = products.Skip(10).Take(10);

// Join
var orders = GetOrders();
var orderDetails = from o in orders
                   join p in products on o.ProductId equals p.Id
                   select new
                   {
                       o.OrderId,
                       p.Name,
                       p.Price
                   };
```

**LINQ to Objects, SQL, XML:**
```csharp
// LINQ to Objects (in-memory collections)
var result = list.Where(x => x > 5);

// LINQ to Entities (Entity Framework)
var users = dbContext.Users
    .Where(u => u.IsActive)
    .OrderBy(u => u.Name)
    .ToList();

// Deferred Execution
var query = products.Where(p => p.Price > 100); // Not executed yet
// Executed when:
var list = query.ToList();
var first = query.First();
foreach (var item in query) { }
```

---

## Async/Await

### Question
**How does async/await work in C#?**

### Answer

**Basic Async Methods:**
```csharp
// Async method returns Task
public async Task<string> FetchDataAsync(string url)
{
    using (HttpClient client = new HttpClient())
    {
        string response = await client.GetStringAsync(url);
        return response;
    }
}

// Async method without return value
public async Task SaveDataAsync(string data)
{
    await File.WriteAllTextAsync("data.txt", data);
}

// Calling async methods
public async Task ProcessDataAsync()
{
    string data = await FetchDataAsync("https://api.example.com");
    await SaveDataAsync(data);
}
```

**Parallel Execution:**
```csharp
public async Task<(string, string, string)> FetchMultipleAsync()
{
    // Sequential (slow)
    var data1 = await FetchDataAsync("url1"); // Wait
    var data2 = await FetchDataAsync("url2"); // Wait
    var data3 = await FetchDataAsync("url3"); // Wait

    // Parallel (fast)
    Task<string> task1 = FetchDataAsync("url1"); // Start
    Task<string> task2 = FetchDataAsync("url2"); // Start
    Task<string> task3 = FetchDataAsync("url3"); // Start

    await Task.WhenAll(task1, task2, task3); // Wait for all

    return (task1.Result, task2.Result, task3.Result);
}
```

**Error Handling:**
```csharp
public async Task<User> GetUserAsync(int id)
{
    try
    {
        var response = await httpClient.GetAsync($"/api/users/{id}");
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<User>(content);
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"Request error: {ex.Message}");
        throw;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
        throw;
    }
}
```

**ConfigureAwait:**
```csharp
// In library code, use ConfigureAwait(false)
public async Task<string> LibraryMethodAsync()
{
    var result = await SomeOperationAsync().ConfigureAwait(false);
    return result;
}

// In UI code, don't use ConfigureAwait (or use true)
public async Task ButtonClickAsync()
{
    var data = await FetchDataAsync(); // Resumes on UI thread
    textBox.Text = data; // Can access UI controls
}
```

---

## Collections and Generics

### Question
**What are the main collection types and how do generics work?**

### Answer

**Collections:**
```csharp
// List<T> - Dynamic array
List<string> names = new List<string> { "John", "Jane", "Bob" };
names.Add("Alice");
names.Remove("Bob");
string first = names[0];

// Dictionary<TKey, TValue> - Key-value pairs
Dictionary<int, string> users = new Dictionary<int, string>
{
    { 1, "John" },
    { 2, "Jane" }
};
users[3] = "Bob";
if (users.ContainsKey(1))
{
    string name = users[1];
}

// HashSet<T> - Unique elements
HashSet<int> numbers = new HashSet<int> { 1, 2, 3 };
numbers.Add(4);
numbers.Add(2); // Ignored (already exists)

// Queue<T> - FIFO
Queue<string> queue = new Queue<string>();
queue.Enqueue("First");
queue.Enqueue("Second");
string item = queue.Dequeue(); // "First"

// Stack<T> - LIFO
Stack<int> stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
int top = stack.Pop(); // 2
```

**Generics:**
```csharp
// Generic class
public class Repository<T> where T : class
{
    private List<T> _items = new List<T>();

    public void Add(T item)
    {
        _items.Add(item);
    }

    public T Get(int index)
    {
        return _items[index];
    }

    public List<T> GetAll()
    {
        return new List<T>(_items);
    }
}

// Generic method
public T FindById<T>(int id, List<T> items) where T : IEntity
{
    return items.FirstOrDefault(item => item.Id == id);
}

// Generic constraints
public class Manager<T> where T : Employee, IManager, new()
{
    // T must:
    // - Inherit from Employee
    // - Implement IManager
    // - Have parameterless constructor
}
```

---

## Exception Handling

### Question
**How do you handle exceptions in C#?**

### Answer

**Try-Catch-Finally:**
```csharp
public void ProcessFile(string filePath)
{
    StreamReader reader = null;

    try
    {
        reader = new StreamReader(filePath);
        string content = reader.ReadToEnd();
        ProcessContent(content);
    }
    catch (FileNotFoundException ex)
    {
        Console.WriteLine($"File not found: {ex.Message}");
    }
    catch (IOException ex)
    {
        Console.WriteLine($"IO error: {ex.Message}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Unexpected error: {ex.Message}");
        throw; // Re-throw
    }
    finally
    {
        reader?.Dispose(); // Always executes
    }
}

// Better with using statement
public void ProcessFileBetter(string filePath)
{
    try
    {
        using (StreamReader reader = new StreamReader(filePath))
        {
            string content = reader.ReadToEnd();
            ProcessContent(content);
        } // Automatically disposes
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }
}
```

**Custom Exceptions:**
```csharp
public class UserNotFoundException : Exception
{
    public int UserId { get; }

    public UserNotFoundException(int userId)
        : base($"User with ID {userId} not found")
    {
        UserId = userId;
    }

    public UserNotFoundException(int userId, Exception innerException)
        : base($"User with ID {userId} not found", innerException)
    {
        UserId = userId;
    }
}

// Usage
public User GetUser(int id)
{
    var user = _repository.FindById(id);
    if (user == null)
    {
        throw new UserNotFoundException(id);
    }
    return user;
}
```

---

## Key Takeaways for Jeneva Interview

### C# Priorities:
1. **OOP fundamentals**: Classes, inheritance, interfaces
2. **LINQ**: Query and manipulate collections
3. **Async/await**: Asynchronous programming
4. **Collections**: List, Dictionary, HashSet
5. **Error handling**: Try-catch, custom exceptions

### Common Questions:
- Value types vs reference types
- Virtual vs abstract vs interface
- LINQ query examples
- When to use async/await
- Generic constraints

### Demonstrate:
- Strong OOP knowledge
- LINQ proficiency
- Async programming understanding
- Clean, maintainable code
- Exception handling best practices
