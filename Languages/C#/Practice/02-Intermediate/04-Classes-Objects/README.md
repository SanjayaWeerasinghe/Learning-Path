# Classes and Objects

## What You'll Learn
- Object-Oriented Programming (OOP) basics
- Creating classes
- Properties and fields
- Creating objects (instances)
- Access modifiers (public, private)
- this keyword

## Concept Overview

A class is a blueprint for creating objects. An object is an instance of a class.

### Creating a Class

```csharp
class Person
{
    // Fields (private)
    private string name;
    private int age;

    // Properties (public)
    public string Name { get; set; }
    public int Age { get; set; }

    // Methods
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name} and I'm {Age} years old.");
    }
}
```

### Creating Objects

```csharp
// Create instance
Person person1 = new Person();
person1.Name = "Alice";
person1.Age = 25;
person1.Introduce();

// Another instance
Person person2 = new Person();
person2.Name = "Bob";
person2.Age = 30;
person2.Introduce();
```

### Access Modifiers

```csharp
class BankAccount
{
    public string AccountNumber;    // Accessible everywhere
    private double balance;         // Only within class

    public void Deposit(double amount)
    {
        balance += amount;  // Can access private field
    }

    public double GetBalance()
    {
        return balance;
    }
}
```

### Auto-Implemented Properties

```csharp
class Product
{
    public string Name { get; set; }
    public double Price { get; set; }
    public int Stock { get; set; }
}

// Usage
Product product = new Product();
product.Name = "Laptop";
product.Price = 999.99;
product.Stock = 50;
```

### this Keyword

```csharp
class Student
{
    private string name;

    public void SetName(string name)
    {
        this.name = name;  // this.name refers to field, name refers to parameter
    }
}
```

## Your Tasks

### Task 1: Create Person Class
Create a `Person` class with:
- Properties: Name, Age, Email
- Method: `DisplayInfo()` - prints all information
Create 3 person objects and display their info.

### Task 2: Car Class
Create a `Car` class with:
- Properties: Brand, Model, Year, Color
- Method: `StartEngine()` - prints "Engine started"
- Method: `GetInfo()` - returns formatted string
Create 2 cars and test all methods.

### Task 3: Bank Account
Create a `BankAccount` class with:
- Private field: `balance`
- Properties: AccountNumber, OwnerName
- Methods:
  - `Deposit(double amount)` - adds to balance
  - `Withdraw(double amount)` - subtracts from balance
  - `GetBalance()` - returns balance
  - `PrintStatement()` - shows account info
Create account and perform transactions.

### Task 4: Student Grade System
Create a `Student` class with:
- Properties: Name, ID, Grade
- Methods:
  - `GetLetterGrade()` - converts number to letter
  - `IsPassing()` - returns true if grade >= 60
  - `DisplayReport()` - shows full report
Create multiple students and display reports.

### Task 5: Rectangle Class
Create a `Rectangle` class with:
- Properties: Width, Height
- Methods:
  - `CalculateArea()` - returns width × height
  - `CalculatePerimeter()` - returns 2 × (width + height)
  - `IsSquare()` - returns true if width == height
  - `Display()` - shows dimensions and calculations

### Task 6: Book Class
Create a `Book` class with:
- Properties: Title, Author, Pages, ISBN
- Private field: `isAvailable`
- Methods:
  - `CheckOut()` - sets available to false
  - `Return()` - sets available to true
  - `GetInfo()` - displays book information
Create a small library system.

### Task 7: Product Inventory
Create a `Product` class with:
- Properties: Name, Price, Stock
- Methods:
  - `Sell(int quantity)` - reduces stock
  - `Restock(int quantity)` - adds to stock
  - `GetTotalValue()` - returns price × stock
  - `IsInStock()` - checks if stock > 0
Create products and manage inventory.

### Task 8: Temperature Class
Create a `Temperature` class with:
- Private field: `celsius`
- Properties:
  - `Celsius` (get/set)
  - `Fahrenheit` (get/set - converts to/from celsius)
  - `Kelvin` (get/set - converts to/from celsius)
- Method: `Display()` - shows all three values

### Task 9: Contact List
Create a `Contact` class with:
- Properties: Name, Phone, Email
- Method: `Display()` - formatted output
Create a List<Contact> and add multiple contacts.
Create methods to:
- Add contact
- Remove contact
- Search by name
- Display all contacts

### Task 10: Employee Management
Create an `Employee` class with:
- Properties: Name, ID, Department, Salary
- Private field: `bonus`
- Methods:
  - `GiveRaise(double percentage)` - increases salary
  - `SetBonus(double amount)` - sets bonus
  - `GetTotalPay()` - returns salary + bonus
  - `PrintPayslip()` - displays payment details
Create employee management system.

## Expected Output Examples

**Task 1:**
```
Person 1:
Name: Alice
Age: 25
Email: alice@email.com

Person 2:
Name: Bob
Age: 30
Email: bob@email.com
```

**Task 3:**
```
Account: 12345
Owner: John Doe
Balance: $0.00

Deposited: $1000.00
Withdrew: $200.00
Current Balance: $800.00
```

**Task 5:**
```
Rectangle:
Width: 5
Height: 10
Area: 50
Perimeter: 30
Is Square: False
```

## Tips
- Use PascalCase for class names: `BankAccount`
- Use PascalCase for properties: `FirstName`
- Use camelCase for fields: `firstName`
- Make fields private, properties public
- One class per file is best practice
- Keep classes focused (Single Responsibility Principle)

## Common Mistakes
```csharp
// ❌ Public fields
class Person
{
    public string name;  // Direct access, no control
}

// ✅ Use properties
class Person
{
    public string Name { get; set; }  // Encapsulated
}

// ❌ Forgetting 'new' keyword
Person p = Person();  // Error

// ✅ Correct
Person p = new Person();
```

## Key Concepts
- **Class**: Blueprint/template
- **Object**: Instance of a class
- **Field**: Variable in a class (usually private)
- **Property**: Public accessor for data
- **Method**: Function in a class
- **Encapsulation**: Hiding internal details

## Next Steps
Move on to `05-Constructors` to learn how to initialize objects properly!
