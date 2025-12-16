# Polymorphism

## What You'll Learn
- What polymorphism means
- Compile-time polymorphism (method overloading)
- Runtime polymorphism (method overriding)
- Using base class references for derived objects
- Virtual and override keywords
- Polymorphic collections
- Type checking and casting
- The `is` and `as` operators

## Concept Overview

Polymorphism means "many forms." It allows objects of different types to be treated through a common interface. There are two types: **compile-time polymorphism** (method overloading) and **runtime polymorphism** (method overriding).

### Compile-Time Polymorphism (Method Overloading)

```csharp
class Calculator
{
    // Same method name, different parameters
    public int Add(int a, int b)
    {
        return a + b;
    }

    public double Add(double a, double b)
    {
        return a + b;
    }

    public int Add(int a, int b, int c)
    {
        return a + b + c;
    }

    public string Add(string a, string b)
    {
        return a + b;
    }
}

// Usage
Calculator calc = new Calculator();
Console.WriteLine(calc.Add(5, 3));           // 8 (int version)
Console.WriteLine(calc.Add(5.5, 3.2));       // 8.7 (double version)
Console.WriteLine(calc.Add(1, 2, 3));        // 6 (three parameters)
Console.WriteLine(calc.Add("Hello", "World")); // HelloWorld (string version)
```

### Runtime Polymorphism (Method Overriding)

```csharp
class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic animal sound");
    }
}

class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof! Woof!");
    }
}

class Cat : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Meow!");
    }
}

// Usage - polymorphic behavior
Animal animal1 = new Dog();  // Base class reference, derived object
Animal animal2 = new Cat();
Animal animal3 = new Animal();

animal1.MakeSound();  // Woof! Woof! (calls Dog's version)
animal2.MakeSound();  // Meow! (calls Cat's version)
animal3.MakeSound();  // Some generic animal sound (calls Animal's version)
```

### Polymorphic Collections

```csharp
class Shape
{
    public virtual double CalculateArea()
    {
        return 0;
    }
}

class Circle : Shape
{
    public double Radius { get; set; }

    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public override double CalculateArea()
    {
        return Width * Height;
    }
}

// Usage - polymorphic collection
List<Shape> shapes = new List<Shape>
{
    new Circle { Radius = 5 },
    new Rectangle { Width = 4, Height = 6 },
    new Circle { Radius = 3 },
    new Rectangle { Width = 10, Height = 2 }
};

double totalArea = 0;
foreach (Shape shape in shapes)
{
    totalArea += shape.CalculateArea();  // Polymorphic call
}

Console.WriteLine($"Total area: {totalArea}");
```

### Type Checking with `is` Operator

```csharp
class Animal
{
    public string Name { get; set; }
}

class Dog : Animal
{
    public void Bark() => Console.WriteLine("Woof!");
}

class Cat : Animal
{
    public void Meow() => Console.WriteLine("Meow!");
}

// Usage
Animal animal = new Dog { Name = "Buddy" };

if (animal is Dog)
{
    Console.WriteLine("This is a dog!");
    Dog dog = (Dog)animal;  // Safe to cast
    dog.Bark();
}

// Pattern matching (C# 7+)
if (animal is Dog d)
{
    d.Bark();  // d is already cast to Dog
}
```

### Type Casting with `as` Operator

```csharp
Animal animal = new Dog { Name = "Buddy" };

// Using 'as' - returns null if cast fails
Dog dog = animal as Dog;
if (dog != null)
{
    dog.Bark();
}

// Safer alternative to direct casting
Cat cat = animal as Cat;
if (cat != null)
{
    cat.Meow();
}
else
{
    Console.WriteLine("Not a cat!");
}

// Direct casting - throws exception if fails
try
{
    Cat cat2 = (Cat)animal;  // InvalidCastException!
}
catch (InvalidCastException)
{
    Console.WriteLine("Cannot cast to Cat");
}
```

### Abstract Classes and Polymorphism

```csharp
abstract class Employee
{
    public string Name { get; set; }
    public int ID { get; set; }

    // Abstract method - must be overridden
    public abstract double CalculateSalary();

    // Virtual method - can be overridden
    public virtual void DisplayInfo()
    {
        Console.WriteLine($"Employee: {Name}, ID: {ID}");
    }
}

class FullTimeEmployee : Employee
{
    public double MonthlySalary { get; set; }

    public override double CalculateSalary()
    {
        return MonthlySalary * 12;
    }
}

class ContractEmployee : Employee
{
    public double HourlyRate { get; set; }
    public int HoursWorked { get; set; }

    public override double CalculateSalary()
    {
        return HourlyRate * HoursWorked;
    }

    public override void DisplayInfo()
    {
        base.DisplayInfo();
        Console.WriteLine($"Hourly Rate: ${HourlyRate}, Hours: {HoursWorked}");
    }
}

// Usage
List<Employee> employees = new List<Employee>
{
    new FullTimeEmployee { Name = "Alice", ID = 101, MonthlySalary = 5000 },
    new ContractEmployee { Name = "Bob", ID = 102, HourlyRate = 50, HoursWorked = 1000 }
};

foreach (Employee emp in employees)
{
    emp.DisplayInfo();
    Console.WriteLine($"Annual Salary: ${emp.CalculateSalary():N2}\n");
}
```

### Virtual vs Non-Virtual Methods

```csharp
class Animal
{
    // Non-virtual - cannot override, but can hide
    public void Eat()
    {
        Console.WriteLine("Animal is eating");
    }

    // Virtual - can override
    public virtual void Sleep()
    {
        Console.WriteLine("Animal is sleeping");
    }
}

class Dog : Animal
{
    // Hides base method (warning)
    public new void Eat()
    {
        Console.WriteLine("Dog is eating");
    }

    // Overrides base method
    public override void Sleep()
    {
        Console.WriteLine("Dog is sleeping");
    }
}

// Usage
Dog dog = new Dog();
dog.Eat();    // Dog is eating
dog.Sleep();  // Dog is sleeping

Animal animal = new Dog();  // Polymorphic reference
animal.Eat();   // Animal is eating (not polymorphic!)
animal.Sleep(); // Dog is sleeping (polymorphic)
```

## Your Tasks

### Task 1: Calculator Overloading
Create a `Calculator` class with overloaded methods:
- `Calculate(int a, int b)` - adds two integers
- `Calculate(double a, double b)` - adds two doubles
- `Calculate(int a, int b, int c)` - adds three integers
- `Calculate(string operation, int a, int b)` - performs operation (+, -, *, /)
Test all overloaded versions.

### Task 2: Shape Polymorphism
Create an abstract `Shape` class with:
- Property: Name
- Abstract method: `CalculateArea()`
- Abstract method: `CalculatePerimeter()`

Create derived classes: Circle, Rectangle, Triangle
Create a list of shapes and calculate total area and perimeter.

### Task 3: Payment System
Create an abstract `Payment` class with:
- Properties: Amount, TransactionID
- Abstract method: `ProcessPayment()`
- Virtual method: `PrintReceipt()`

Create derived classes:
- `CreditCardPayment`: adds CardNumber, ExpiryDate
- `PayPalPayment`: adds Email
- `CashPayment`: adds AmountGiven, CalculateChange()

Process multiple payments polymorphically.

### Task 4: Vehicle Fleet Management
Create a base `Vehicle` class with:
- Properties: Brand, Model, Year
- Virtual methods: `Start()`, `Stop()`, `GetMaintenanceCost()`

Create derived classes: Car, Truck, Motorcycle
Each has different maintenance costs and behaviors.
Create a fleet list and calculate total maintenance costs.

### Task 5: Employee Payroll System
Create an abstract `Employee` class with:
- Properties: Name, ID, Department
- Abstract method: `CalculatePay()`
- Virtual method: `GetDetails()`

Create derived classes:
- `SalariedEmployee`: fixed monthly salary
- `HourlyEmployee`: hourly rate × hours worked
- `CommissionEmployee`: base salary + commission rate × sales

Create a payroll system that processes all employee types.

### Task 6: Media Player
Create an abstract `MediaFile` class with:
- Properties: Title, Duration, FileSize
- Abstract methods: `Play()`, `Pause()`, `Stop()`
- Virtual method: `GetInfo()`

Create derived classes: AudioFile, VideoFile, StreamingContent
Each implements play/pause/stop differently.
Create a playlist and test polymorphic behavior.

### Task 7: Banking System
Create an abstract `Account` class with:
- Properties: AccountNumber, Balance, Owner
- Abstract method: `CalculateInterest()`
- Virtual methods: `Deposit()`, `Withdraw()`

Create derived classes:
- `SavingsAccount`: 5% interest, minimum balance $100
- `CheckingAccount`: no interest, monthly fee $10
- `MoneyMarketAccount`: tiered interest rates

Use polymorphic collection to manage multiple accounts.

### Task 8: Notification System
Create an abstract `Notification` class with:
- Properties: Message, Timestamp, Priority
- Abstract method: `Send()`
- Virtual method: `Format()`

Create derived classes: EmailNotification, SMSNotification, PushNotification
Each sends differently and formats messages differently.
Create a notification queue and send all notifications.

### Task 9: Game Character System
Create an abstract `Character` class with:
- Properties: Name, Health, Level, Damage
- Abstract method: `Attack(Character target)`
- Abstract method: `SpecialAbility()`
- Virtual method: `TakeDamage(int amount)`

Create character types: Warrior, Mage, Archer
Implement different attack styles and special abilities.
Simulate a battle between different character types.

### Task 10: Document Processing
Create an abstract `Document` class with:
- Properties: Title, Author, CreatedDate
- Abstract method: `Open()`
- Abstract method: `Save()`
- Virtual method: `Print()`

Create derived classes: TextDocument, SpreadsheetDocument, PDFDocument
Each opens, saves, and prints differently.
Create document management system using polymorphism.

### Task 11: Type Checking Exercise
Using the animal hierarchy (Animal, Dog, Cat, Bird):
- Create a method `IdentifyAnimal(Animal animal)` that uses `is` operator
- Create a method `FeedAnimal(Animal animal)` that casts appropriately
- Create a method `ProcessAnimals(List<Animal> animals)` that handles each type differently
Test with mixed animal types.

### Task 12: E-Commerce Product System
Create an abstract `Product` class with:
- Properties: Name, Price, SKU
- Abstract method: `CalculateShippingCost()`
- Virtual method: `GetDescription()`
- Virtual method: `ApplyDiscount(double percentage)`

Create derived classes:
- `PhysicalProduct`: weight, dimensions affect shipping
- `DigitalProduct`: no shipping, instant delivery
- `SubscriptionProduct`: recurring payment, no shipping

Create a shopping cart with mixed product types and calculate total costs.

## Expected Output Examples

**Task 1:**
```
Calculate(5, 3) = 8
Calculate(5.5, 3.2) = 8.7
Calculate(1, 2, 3) = 6
Calculate("+", 10, 5) = 15
Calculate("-", 10, 5) = 5
Calculate("*", 10, 5) = 50
Calculate("/", 10, 5) = 2
```

**Task 2:**
```
Shapes in collection:

Circle (Radius: 5)
Area: 78.54
Perimeter: 31.42

Rectangle (4 x 6)
Area: 24.00
Perimeter: 20.00

Triangle (Base: 6, Height: 4)
Area: 12.00
Perimeter: 16.00

Total Area: 114.54
Total Perimeter: 67.42
```

**Task 5:**
```
Payroll Report:

Salaried Employee: Alice Smith
Department: IT
Monthly Salary: $5,000
Annual Pay: $60,000

Hourly Employee: Bob Jones
Department: Sales
Hourly Rate: $25, Hours: 160
Pay: $4,000

Commission Employee: Charlie Davis
Department: Sales
Base: $2,000, Sales: $50,000, Rate: 5%
Pay: $4,500

Total Payroll: $68,500
```

**Task 9:**
```
Battle Start!

Warrior attacks Mage for 50 damage!
Mage Health: 50/100

Mage casts Fireball on Warrior for 70 damage!
Warrior Health: 130/200

Warrior uses Shield Bash!
Mage is stunned!

Mage Health: 0
Warrior wins!
```

## Tips
- Use polymorphism when you want to treat different types uniformly
- Always mark base methods as `virtual` if you want polymorphic behavior
- Use abstract classes when the base class shouldn't be instantiated
- Use `is` for type checking, `as` for safe casting
- Prefer polymorphism over type checking when possible
- Design interfaces/base classes carefully - they're hard to change later
- Use polymorphic collections to process different types uniformly
- Override `ToString()` for better debugging

## Common Mistakes

```csharp
// ❌ Forgetting 'virtual' keyword
class Animal
{
    public void MakeSound()  // Not virtual!
    {
        Console.WriteLine("Generic sound");
    }
}

class Dog : Animal
{
    public new void MakeSound()  // Hides, doesn't override
    {
        Console.WriteLine("Woof");
    }
}

Animal animal = new Dog();
animal.MakeSound();  // Generic sound (not polymorphic!)

// ✅ Use virtual and override
class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Generic sound");
    }
}

class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof");
    }
}

// ❌ Direct casting without checking
Animal animal = GetAnimal();
Dog dog = (Dog)animal;  // May throw InvalidCastException!

// ✅ Check before casting
if (animal is Dog dog)
{
    dog.Bark();
}
// Or use 'as'
Dog dog = animal as Dog;
if (dog != null)
{
    dog.Bark();
}

// ❌ Type checking instead of polymorphism
void ProcessAnimal(Animal animal)
{
    if (animal is Dog)
    {
        ((Dog)animal).Bark();
    }
    else if (animal is Cat)
    {
        ((Cat)animal).Meow();
    }
}

// ✅ Use polymorphism
abstract class Animal
{
    public abstract void MakeSound();
}

void ProcessAnimal(Animal animal)
{
    animal.MakeSound();  // Polymorphic call
}

// ❌ Not calling base implementation when needed
class Employee
{
    public virtual void CalculatePay()
    {
        // Important calculation logic
    }
}

class Manager : Employee
{
    public override void CalculatePay()
    {
        // Forgot to call base.CalculatePay()!
        // Add bonus
    }
}

// ✅ Call base when needed
class Manager : Employee
{
    public override void CalculatePay()
    {
        base.CalculatePay();  // Execute base logic first
        // Add bonus
    }
}
```

## Key Concepts
- **Polymorphism**: Ability to treat objects of different types through a common interface
- **Method Overloading**: Multiple methods with same name, different parameters (compile-time)
- **Method Overriding**: Derived class provides new implementation for virtual method (runtime)
- **Virtual Method**: Method that can be overridden in derived classes
- **Override**: Keyword to provide new implementation for virtual method
- **Abstract Method**: Method with no implementation that must be overridden
- **Type Checking**: Using `is` operator to check object type
- **Type Casting**: Converting base type reference to derived type
- **Polymorphic Collection**: Collection of base type holding different derived types

## Next Steps
Move on to `09-Interfaces` to learn about contracts that classes must implement!
