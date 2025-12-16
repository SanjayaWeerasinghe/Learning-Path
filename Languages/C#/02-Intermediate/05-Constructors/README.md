# Constructors

## What You'll Learn
- What constructors are and why they're important
- Default constructors
- Parameterized constructors
- Constructor overloading
- Constructor chaining with `this`
- Static constructors
- Object initialization best practices

## Concept Overview

A constructor is a special method that is automatically called when an object is created. It's used to initialize the object's fields and properties.

### Default Constructor

```csharp
class Person
{
    public string Name;
    public int Age;

    // Default constructor
    public Person()
    {
        Name = "Unknown";
        Age = 0;
        Console.WriteLine("Person object created!");
    }
}

// Usage
Person p = new Person();  // Calls constructor
// Output: Person object created!
```

### Parameterized Constructor

```csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    // Constructor with parameters
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

// Usage
Person p = new Person("Alice", 25);
Console.WriteLine($"{p.Name} is {p.Age} years old.");
// Output: Alice is 25 years old.
```

### Constructor Overloading

```csharp
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    // Default constructor - creates a square
    public Rectangle()
    {
        Width = 1;
        Height = 1;
    }

    // Constructor with one parameter - creates a square
    public Rectangle(double side)
    {
        Width = side;
        Height = side;
    }

    // Constructor with two parameters
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }
}

// Usage
Rectangle r1 = new Rectangle();           // 1x1
Rectangle r2 = new Rectangle(5);          // 5x5 square
Rectangle r3 = new Rectangle(4, 6);       // 4x6 rectangle
```

### Constructor Chaining

```csharp
class Employee
{
    public string Name { get; set; }
    public int ID { get; set; }
    public string Department { get; set; }

    // Most detailed constructor
    public Employee(string name, int id, string department)
    {
        Name = name;
        ID = id;
        Department = department;
    }

    // Chains to the main constructor
    public Employee(string name, int id) : this(name, id, "General")
    {
    }

    // Chains to the two-parameter constructor
    public Employee(string name) : this(name, 0)
    {
    }
}

// Usage
Employee e1 = new Employee("Alice", 101, "IT");
Employee e2 = new Employee("Bob", 102);      // Department = "General"
Employee e3 = new Employee("Charlie");        // ID = 0, Department = "General"
```

### Static Constructor

```csharp
class Configuration
{
    public static string AppName { get; set; }
    public static string Version { get; set; }

    // Static constructor - runs once when class is first used
    static Configuration()
    {
        AppName = "MyApp";
        Version = "1.0.0";
        Console.WriteLine("Configuration initialized");
    }
}

// Usage
Console.WriteLine(Configuration.AppName);  // Triggers static constructor first
// Output:
// Configuration initialized
// MyApp
```

### Read-Only Fields with Constructors

```csharp
class BankAccount
{
    public readonly string AccountNumber;  // Can only be set in constructor
    public string Owner { get; set; }
    private double balance;

    public BankAccount(string accountNumber, string owner)
    {
        AccountNumber = accountNumber;  // OK in constructor
        Owner = owner;
        balance = 0;
    }

    public void ChangeAccountNumber(string newNumber)
    {
        // AccountNumber = newNumber;  // ❌ Error! Can't change readonly field
    }
}
```

## Your Tasks

### Task 1: Basic Constructor
Create a `Book` class with:
- Properties: Title, Author, Pages
- Constructor that takes all three parameters
- Method: `DisplayInfo()` to show book details
Create 3 books using the constructor.

### Task 2: Constructor Overloading
Create a `Product` class with:
- Properties: Name, Price, Category
- Three constructors:
  1. Default (sets Name = "Unknown", Price = 0, Category = "General")
  2. Takes name and price (Category = "General")
  3. Takes all three parameters
- Method: `Display()` to show product details
Create one product using each constructor.

### Task 3: Car Constructor
Create a `Car` class with:
- Properties: Brand, Model, Year, Color, Mileage
- Constructor that takes brand, model, and year
- Set Color = "White" and Mileage = 0 by default in constructor
- Method: `GetInfo()` returns formatted string
Create 2 cars and display their info.

### Task 4: Constructor Chaining
Create a `Student` class with:
- Properties: Name, ID, Grade, Email
- Three constructors using chaining:
  1. Takes name, id, grade, email
  2. Takes name, id, grade (email = "not provided")
  3. Takes name, id (grade = 0, email = "not provided")
- Method: `PrintInfo()` to display all details
Test all three constructors.

### Task 5: BankAccount with Validation
Create a `BankAccount` class with:
- Properties: AccountNumber (readonly), Owner, Balance (private)
- Constructor that takes accountNumber and owner
- Validate in constructor:
  - AccountNumber must be exactly 10 digits
  - Owner cannot be empty
  - Initialize balance to 0
- Methods: Deposit, Withdraw, GetBalance
- Handle invalid inputs by setting defaults or throwing errors

### Task 6: Circle Class
Create a `Circle` class with:
- Property: Radius
- Computed properties: Area, Circumference (calculated, not stored)
- Two constructors:
  1. Default (radius = 1)
  2. Takes radius parameter
- Method: `Display()` shows radius, area, and circumference
Calculate: Area = π × r², Circumference = 2 × π × r

### Task 7: Employee System
Create an `Employee` class with:
- Properties: Name, ID, HireDate (DateTime), Salary
- Constructor that takes name and salary
- Automatically generate ID (use static counter)
- Set HireDate to current date in constructor
- Method: `GetYearsOfService()` returns years since hire
- Method: `GetDetails()` displays all information

### Task 8: Temperature Converter
Create a `Temperature` class with:
- Private field: celsius
- Two constructors:
  1. Takes celsius value
  2. Takes value and unit ("C", "F", or "K") - converts to celsius
- Properties: Celsius, Fahrenheit, Kelvin (all with get/set)
- Method: `Display()` shows all three formats
Test with different constructor options.

### Task 9: Rectangle with Validation
Create a `Rectangle` class with:
- Properties: Width, Height
- Constructor that takes width and height
- Validation in constructor:
  - Both must be positive
  - If invalid, set to 1
- Methods: CalculateArea(), CalculatePerimeter(), IsSquare()
- Method: `Resize(width, height)` with same validation
Test with valid and invalid values.

### Task 10: Static Constructor Usage
Create a `Database` class with:
- Static properties: ConnectionString, MaxConnections, IsInitialized
- Static constructor that:
  - Sets ConnectionString = "Server=localhost;Database=MyDB"
  - Sets MaxConnections = 100
  - Sets IsInitialized = true
  - Prints "Database configuration loaded"
- Regular property: QueryCount
- Regular constructor that sets QueryCount = 0
- Method: `ExecuteQuery(string query)` increments QueryCount
Create multiple Database instances and observe static constructor behavior.

### Task 11: Person Contact System
Create a `Person` class with:
- Properties: FirstName, LastName, Email, Phone
- Property: FullName (computed from FirstName + LastName)
- Four constructors using chaining:
  1. Takes all four parameters
  2. Takes firstName, lastName, email (phone = "N/A")
  3. Takes firstName, lastName (email and phone = "N/A")
  4. Default (all = "Unknown")
- Method: `DisplayContact()` shows formatted contact card
Test all constructor variations.

### Task 12: Shopping Cart Item
Create a `CartItem` class with:
- Properties: ProductName, UnitPrice, Quantity
- Property: TotalPrice (computed, readonly)
- Constructor takes productName, unitPrice, quantity
- Validation:
  - Quantity must be >= 1
  - UnitPrice must be >= 0
  - ProductName cannot be empty
- Method: `UpdateQuantity(int newQuantity)` with validation
- Method: `Display()` shows item details and total
Create a shopping cart with multiple items.

## Expected Output Examples

**Task 1:**
```
Book 1:
Title: The Great Gatsby
Author: F. Scott Fitzgerald
Pages: 180

Book 2:
Title: 1984
Author: George Orwell
Pages: 328
```

**Task 2:**
```
Product 1: Unknown, $0.00, Category: General
Product 2: Laptop, $999.99, Category: General
Product 3: Mouse, $25.00, Category: Electronics
```

**Task 4:**
```
Student: Alice Johnson
ID: 101
Grade: 95
Email: alice@school.com

Student: Bob Smith
ID: 102
Grade: 88
Email: not provided

Student: Charlie Brown
ID: 103
Grade: 0
Email: not provided
```

**Task 7:**
```
Employee #1001: John Doe
Hired: 2025-10-02
Salary: $50,000
Years of Service: 0

Employee #1002: Jane Smith
Hired: 2025-10-02
Salary: $60,000
Years of Service: 0
```

**Task 10:**
```
Database configuration loaded
Database instance created
Query executed: SELECT * FROM Users
Query Count: 1

Database instance created
Query executed: SELECT * FROM Products
Query Count: 1
```

## Tips
- Constructor names must match the class name exactly
- Constructors have no return type (not even void)
- Use constructor chaining to avoid code duplication
- Initialize all required fields in constructors
- Validate constructor parameters to ensure object integrity
- Use readonly fields for values that shouldn't change after creation
- Static constructors run only once, before any instance is created

## Common Mistakes

```csharp
// ❌ Constructor with return type
class Person
{
    public void Person()  // This is a method, not a constructor!
    {
    }
}

// ✅ Correct constructor
class Person
{
    public Person()  // No return type
    {
    }
}

// ❌ Not initializing required fields
class BankAccount
{
    public string AccountNumber { get; set; }

    public BankAccount()
    {
        // AccountNumber is null!
    }
}

// ✅ Initialize in constructor
class BankAccount
{
    public string AccountNumber { get; set; }

    public BankAccount(string accountNumber)
    {
        AccountNumber = accountNumber;
    }
}

// ❌ Redundant code in overloaded constructors
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name)
    {
        Name = name;
        Age = 0;
    }

    public Person(string name, int age)
    {
        Name = name;  // Duplicated code
        Age = age;
    }
}

// ✅ Use constructor chaining
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Person(string name) : this(name, 0)
    {
    }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```

## Key Concepts
- **Constructor**: Special method called when creating an object
- **Default Constructor**: Constructor with no parameters
- **Parameterized Constructor**: Constructor that accepts parameters
- **Overloading**: Multiple constructors with different parameters
- **Chaining**: Calling one constructor from another using `this`
- **Static Constructor**: Runs once to initialize static members
- **Object Initializer**: Alternative syntax for setting properties

## Next Steps
Move on to `06-Properties` to learn advanced property features like validation, computed properties, and property initializers!
