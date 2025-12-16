# Properties

## What You'll Learn
- Auto-implemented properties
- Properties with backing fields
- Read-only and write-only properties
- Computed properties
- Property validation
- Property initializers
- Expression-bodied properties
- Init-only properties (C# 9+)

## Concept Overview

Properties provide a flexible way to read, write, or compute the values of private fields. They use accessors (get and set) to control how values are accessed and modified.

### Auto-Implemented Properties

```csharp
class Person
{
    // Auto-implemented properties
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
}

// Usage
Person person = new Person();
person.Name = "Alice";    // Calls set accessor
person.Age = 25;
Console.WriteLine(person.Name);  // Calls get accessor
```

### Properties with Backing Fields

```csharp
class BankAccount
{
    private double balance;  // Backing field

    public double Balance
    {
        get { return balance; }
        set
        {
            if (value >= 0)
                balance = value;
            else
                Console.WriteLine("Balance cannot be negative!");
        }
    }
}

// Usage
BankAccount account = new BankAccount();
account.Balance = 1000;   // OK
account.Balance = -500;   // Validation prevents this
```

### Read-Only Properties

```csharp
class Product
{
    public string Name { get; set; }
    public double Price { get; set; }

    // Read-only property (no set accessor)
    public double PriceWithTax
    {
        get { return Price * 1.10; }
    }
}

// Usage
Product product = new Product { Name = "Laptop", Price = 1000 };
Console.WriteLine(product.PriceWithTax);  // 1100
// product.PriceWithTax = 1200;  // ❌ Error! No setter
```

### Computed Properties

```csharp
class Rectangle
{
    public double Width { get; set; }
    public double Height { get; set; }

    // Computed properties
    public double Area
    {
        get { return Width * Height; }
    }

    public double Perimeter
    {
        get { return 2 * (Width + Height); }
    }
}

// Usage
Rectangle rect = new Rectangle { Width = 5, Height = 10 };
Console.WriteLine($"Area: {rect.Area}");          // 50
Console.WriteLine($"Perimeter: {rect.Perimeter}"); // 30
```

### Expression-Bodied Properties

```csharp
class Circle
{
    public double Radius { get; set; }

    // Expression-bodied property (concise syntax)
    public double Area => Math.PI * Radius * Radius;
    public double Circumference => 2 * Math.PI * Radius;
    public double Diameter => 2 * Radius;
}

// Usage
Circle circle = new Circle { Radius = 5 };
Console.WriteLine(circle.Area);  // 78.54...
```

### Property with Validation

```csharp
class Student
{
    private int age;
    private double grade;

    public string Name { get; set; }

    public int Age
    {
        get { return age; }
        set
        {
            if (value >= 0 && value <= 120)
                age = value;
            else
                throw new ArgumentException("Age must be between 0 and 120");
        }
    }

    public double Grade
    {
        get { return grade; }
        set
        {
            if (value >= 0 && value <= 100)
                grade = value;
            else
                Console.WriteLine("Grade must be between 0 and 100");
        }
    }
}
```

### Private Setters

```csharp
class Employee
{
    public string Name { get; set; }
    public int ID { get; private set; }  // Can only be set within the class
    public DateTime HireDate { get; private set; }

    public Employee(string name, int id)
    {
        Name = name;
        ID = id;
        HireDate = DateTime.Now;
    }
}

// Usage
Employee emp = new Employee("Alice", 101);
Console.WriteLine(emp.ID);  // OK - can read
// emp.ID = 102;  // ❌ Error! Cannot set from outside
```

### Init-Only Properties (C# 9+)

```csharp
class Person
{
    public string FirstName { get; init; }  // Can only be set during initialization
    public string LastName { get; init; }
    public string FullName => $"{FirstName} {LastName}";
}

// Usage
Person person = new Person
{
    FirstName = "Alice",
    LastName = "Smith"
};
Console.WriteLine(person.FullName);  // Alice Smith
// person.FirstName = "Bob";  // ❌ Error! Can't change after initialization
```

### Property Initializers

```csharp
class Configuration
{
    public string AppName { get; set; } = "MyApp";
    public string Version { get; set; } = "1.0.0";
    public int MaxUsers { get; set; } = 100;
    public bool IsActive { get; set; } = true;
}

// Usage
var config = new Configuration();
Console.WriteLine(config.AppName);  // MyApp (default value)

var customConfig = new Configuration { AppName = "CustomApp" };
Console.WriteLine(customConfig.AppName);  // CustomApp (overridden)
```

## Your Tasks

### Task 1: Person with Validation
Create a `Person` class with:
- Properties: FirstName, LastName, Age
- Age validation: must be between 0 and 150
- Computed property: FullName (returns FirstName + LastName)
- Method: `Display()` to show all information
Test with valid and invalid ages.

### Task 2: Temperature Class
Create a `Temperature` class with:
- Private field: celsius
- Property: Celsius (with get/set)
- Computed properties: Fahrenheit, Kelvin (read-only)
- Formulas: F = C × 9/5 + 32, K = C + 273.15
- Method: `Display()` shows all three temperatures
Test by setting Celsius and reading other values.

### Task 3: BankAccount with Properties
Create a `BankAccount` class with:
- Properties: AccountNumber (init-only), Owner
- Private field: balance
- Property: Balance with validation (cannot be negative)
- Computed property: AccountStatus (returns "Active" if balance > 0, else "Inactive")
- Methods: Deposit, Withdraw
Test deposits and withdrawals with validation.

### Task 4: Product Inventory
Create a `Product` class with:
- Properties: Name, UnitPrice, Quantity
- Validation: UnitPrice and Quantity cannot be negative
- Computed properties:
  - TotalValue (UnitPrice × Quantity)
  - IsInStock (true if Quantity > 0)
  - StockStatus (returns "In Stock", "Low Stock" if < 10, "Out of Stock")
- Method: `Display()` shows all information
Test with different quantities.

### Task 5: Rectangle with Properties
Create a `Rectangle` class with:
- Properties: Width, Height (both must be positive)
- Expression-bodied properties:
  - Area
  - Perimeter
  - IsSquare
  - Diagonal (√(width² + height²))
- Method: `Display()` shows all calculations
Test with various dimensions.

### Task 6: Employee Payroll
Create an `Employee` class with:
- Properties: Name, ID (private set), BaseSalary
- Private fields: bonus, deductions
- Properties with backing fields:
  - Bonus (cannot be negative)
  - Deductions (cannot be negative or exceed salary)
- Computed properties:
  - GrossPay (BaseSalary + Bonus)
  - NetPay (GrossPay - Deductions)
- Method: `PrintPayslip()` displays all pay information
Test with different bonus and deduction values.

### Task 7: Student Grade System
Create a `Student` class with:
- Properties: Name, ID (init-only)
- Private array or list: grades (5 test scores)
- Properties with validation:
  - Test1, Test2, Test3, Test4, Test5 (each 0-100)
- Computed properties:
  - Average (average of all tests)
  - LetterGrade (A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60)
  - IsPassing (true if average >= 60)
- Method: `DisplayReport()` shows all grades and statistics
Test with various grade combinations.

### Task 8: Car with Properties
Create a `Car` class with:
- Properties: Brand, Model, Year (init-only)
- Property: Mileage with validation (cannot decrease)
- Private field: fuelLevel (0-100)
- Property: FuelLevel with validation (0-100 range)
- Computed properties:
  - FuelStatus ("Full", "Good", "Low", "Empty")
  - Age (current year - Year)
- Methods: Drive(miles), Refuel(liters)
Test driving and refueling.

### Task 9: Book Rating System
Create a `Book` class with:
- Properties: Title, Author, ISBN (init-only)
- Private list: ratings
- Property: AverageRating (computed from ratings list)
- Property: RatingCount (number of ratings)
- Computed property: PopularityLevel:
  - "Highly Popular" if RatingCount > 100 and AverageRating > 4
  - "Popular" if RatingCount > 50
  - "New" if RatingCount < 10
  - "Moderate" otherwise
- Methods: AddRating(int rating), Display()
Test with multiple ratings.

### Task 10: User Account
Create a `UserAccount` class with:
- Properties: Username (init-only), Email
- Private field: password
- Write-only property: Password (can set but not get)
- Property: IsEmailVerified (private set, default false)
- Computed property: AccountStatus
- Method: VerifyEmail() sets IsEmailVerified to true
- Method: UpdatePassword(oldPass, newPass) with validation
Test account creation and verification.

### Task 11: Shopping Cart
Create a `ShoppingCart` class with:
- Property: CustomerName
- Private list: items (list of prices)
- Property: ItemCount (read-only, returns items.Count)
- Computed properties:
  - Subtotal (sum of all items)
  - Tax (Subtotal × 0.08)
  - Total (Subtotal + Tax)
  - AverageItemPrice
- Methods: AddItem(price), RemoveLastItem(), Clear(), Display()
Test adding and removing items.

### Task 12: Time Tracker
Create a `TimeEntry` class with:
- Properties: TaskName, StartTime (init-only)
- Property: EndTime (can only be set after StartTime)
- Computed properties:
  - Duration (TimeSpan between Start and End)
  - DurationInHours (total hours)
  - DurationInMinutes (total minutes)
  - Status ("In Progress" if EndTime not set, else "Completed")
- Method: Complete() sets EndTime to now
- Method: Display() shows all information
Test with different time spans.

## Expected Output Examples

**Task 1:**
```
Person: John Doe
Age: 30

Attempting to set age to -5...
Error: Age must be between 0 and 150

Attempting to set age to 200...
Error: Age must be between 0 and 150
```

**Task 3:**
```
Account: 1234567890
Owner: Alice Johnson
Balance: $1000.00
Status: Active

After withdrawal of $200:
Balance: $800.00

Attempting to withdraw $1000...
Error: Insufficient funds
Balance: $800.00
Status: Active
```

**Task 4:**
```
Product: Laptop
Unit Price: $999.99
Quantity: 25
Total Value: $24,999.75
Stock Status: In Stock
Is In Stock: True
```

**Task 7:**
```
Student: Alice Johnson
ID: 12345

Test Scores:
Test 1: 95
Test 2: 88
Test 3: 92
Test 4: 85
Test 5: 90

Average: 90.0
Letter Grade: A
Passing: Yes
```

**Task 11:**
```
Shopping Cart for: John Doe
Items: 4
Subtotal: $125.50
Tax: $10.04
Total: $135.54
Average Item Price: $31.38
```

## Tips
- Use auto-implemented properties for simple cases
- Use backing fields when you need validation or complex logic
- Make computed properties read-only (no setter)
- Use expression-bodied properties for simple calculations
- Validate in setters to maintain object integrity
- Use init-only properties for immutable data
- Use private setters when values should only change internally
- Property names should be PascalCase

## Common Mistakes

```csharp
// ❌ Computing value in getter repeatedly (inefficient)
public double Total
{
    get
    {
        double sum = 0;
        foreach (var item in items)  // Recalculates every time!
            sum += item.Price;
        return sum;
    }
}

// ✅ Cache computed values if expensive
private double totalCache;
private bool isTotalCacheValid;

public double Total
{
    get
    {
        if (!isTotalCacheValid)
        {
            totalCache = items.Sum(i => i.Price);
            isTotalCacheValid = true;
        }
        return totalCache;
    }
}

// ❌ Forgetting to validate in setter
public int Age { get; set; }  // Can be set to negative!

// ✅ Validate in setter
private int age;
public int Age
{
    get { return age; }
    set
    {
        if (value >= 0 && value <= 150)
            age = value;
        else
            throw new ArgumentException("Invalid age");
    }
}

// ❌ Using properties for expensive operations
public List<Customer> AllCustomers
{
    get { return database.GetAllCustomers(); }  // Database call!
}

// ✅ Use methods for expensive operations
public List<Customer> GetAllCustomers()
{
    return database.GetAllCustomers();
}

// ❌ Mutating objects in getters
public string Name
{
    get
    {
        counter++;  // Side effect! Getters should not change state
        return name;
    }
}

// ✅ Getters should be side-effect free
public string Name
{
    get { return name; }
}
```

## Key Concepts
- **Property**: Member that provides a flexible mechanism to read/write field values
- **Accessor**: get (read) and set (write) methods in a property
- **Auto-Property**: Property without explicit backing field
- **Backing Field**: Private field that stores property value
- **Computed Property**: Property that calculates value instead of storing it
- **Read-Only Property**: Property with only get accessor
- **Write-Only Property**: Property with only set accessor
- **Init-Only Property**: Property that can only be set during object initialization
- **Expression-Bodied Property**: Concise syntax using =>

## Next Steps
Move on to `07-Inheritance` to learn how to create class hierarchies and reuse code!
