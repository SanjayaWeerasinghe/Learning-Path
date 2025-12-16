# Inheritance

## What You'll Learn
- What inheritance is and why it's useful
- Creating base and derived classes
- The `base` keyword
- Method overriding with `virtual` and `override`
- Abstract classes and methods
- The `sealed` keyword
- Access modifiers in inheritance (`protected`)
- Constructor inheritance

## Concept Overview

Inheritance allows a class to inherit members (properties, methods, fields) from another class. The class being inherited from is called the **base class** (or parent class), and the class that inherits is called the **derived class** (or child class).

### Basic Inheritance

```csharp
// Base class
class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }

    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping.");
    }
}

// Derived class
class Dog : Animal  // Dog inherits from Animal
{
    public string Breed { get; set; }

    public void Bark()
    {
        Console.WriteLine($"{Name} says: Woof!");
    }
}

// Usage
Dog dog = new Dog();
dog.Name = "Buddy";
dog.Age = 3;
dog.Breed = "Golden Retriever";
dog.Eat();    // Inherited from Animal
dog.Sleep();  // Inherited from Animal
dog.Bark();   // Defined in Dog
```

### Constructor Inheritance

```csharp
class Animal
{
    public string Name { get; set; }
    public int Age { get; set; }

    public Animal(string name, int age)
    {
        Name = name;
        Age = age;
        Console.WriteLine("Animal constructor called");
    }
}

class Dog : Animal
{
    public string Breed { get; set; }

    // Call base class constructor
    public Dog(string name, int age, string breed) : base(name, age)
    {
        Breed = breed;
        Console.WriteLine("Dog constructor called");
    }
}

// Usage
Dog dog = new Dog("Buddy", 3, "Golden Retriever");
// Output:
// Animal constructor called
// Dog constructor called
```

### Method Overriding

```csharp
class Animal
{
    public string Name { get; set; }

    // Virtual method can be overridden
    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic animal sound");
    }
}

class Dog : Animal
{
    // Override the base method
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

// Usage
Animal animal = new Animal { Name = "Generic" };
animal.MakeSound();  // Some generic animal sound

Dog dog = new Dog { Name = "Buddy" };
dog.MakeSound();     // Woof! Woof!

Cat cat = new Cat { Name = "Whiskers" };
cat.MakeSound();     // Meow!
```

### Using base Keyword

```csharp
class Vehicle
{
    public string Brand { get; set; }

    public virtual void Start()
    {
        Console.WriteLine("Vehicle is starting...");
    }
}

class Car : Vehicle
{
    public override void Start()
    {
        base.Start();  // Call base class method first
        Console.WriteLine("Car engine started.");
    }
}

// Usage
Car car = new Car { Brand = "Toyota" };
car.Start();
// Output:
// Vehicle is starting...
// Car engine started.
```

### Protected Access Modifier

```csharp
class BankAccount
{
    protected double balance;  // Accessible in derived classes

    public void Deposit(double amount)
    {
        balance += amount;
    }

    public double GetBalance()
    {
        return balance;
    }
}

class SavingsAccount : BankAccount
{
    public void AddInterest(double rate)
    {
        balance += balance * rate;  // Can access protected field
    }
}

// Usage
SavingsAccount account = new SavingsAccount();
account.Deposit(1000);
account.AddInterest(0.05);
Console.WriteLine(account.GetBalance());  // 1050
// Console.WriteLine(account.balance);  // ❌ Error! Protected, not public
```

### Abstract Classes

```csharp
// Abstract class cannot be instantiated
abstract class Shape
{
    public string Color { get; set; }

    // Abstract method - must be implemented by derived classes
    public abstract double CalculateArea();

    // Regular method - can be inherited as-is
    public void Display()
    {
        Console.WriteLine($"This is a {Color} shape with area {CalculateArea()}");
    }
}

class Circle : Shape
{
    public double Radius { get; set; }

    // Must implement abstract method
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

// Usage
// Shape shape = new Shape();  // ❌ Error! Cannot instantiate abstract class

Circle circle = new Circle { Radius = 5, Color = "Red" };
circle.Display();  // This is a Red shape with area 78.54...

Rectangle rect = new Rectangle { Width = 4, Height = 6, Color = "Blue" };
rect.Display();    // This is a Blue shape with area 24
```

### Sealed Classes

```csharp
// Sealed class cannot be inherited
sealed class FinalClass
{
    public void DoSomething()
    {
        Console.WriteLine("This class cannot be inherited");
    }
}

// class DerivedClass : FinalClass  // ❌ Error! Cannot inherit from sealed class
// {
// }
```

### Multi-Level Inheritance

```csharp
class Animal
{
    public void Breathe()
    {
        Console.WriteLine("Breathing...");
    }
}

class Mammal : Animal
{
    public void ProduceMilk()
    {
        Console.WriteLine("Producing milk...");
    }
}

class Dog : Mammal
{
    public void Bark()
    {
        Console.WriteLine("Barking...");
    }
}

// Usage
Dog dog = new Dog();
dog.Breathe();       // From Animal
dog.ProduceMilk();   // From Mammal
dog.Bark();          // From Dog
```

## Your Tasks

### Task 1: Basic Inheritance
Create a base class `Person` with:
- Properties: Name, Age
- Method: `Introduce()` that prints introduction

Create a derived class `Student` with:
- Additional property: StudentID, Grade
- Method: `Study()` that prints studying message

Create a derived class `Teacher` with:
- Additional property: Subject, YearsExperience
- Method: `Teach()` that prints teaching message

Test both derived classes.

### Task 2: Vehicle Hierarchy
Create a base class `Vehicle` with:
- Properties: Brand, Model, Year
- Virtual method: `Start()`, `Stop()`
- Method: `GetInfo()` returns vehicle details

Create derived classes:
- `Car`: adds NumDoors, override Start() to include engine sound
- `Motorcycle`: adds HasSidecar, override Start() differently
- `Truck`: adds LoadCapacity, override Start()

Test all vehicle types.

### Task 3: Shape Calculator
Create an abstract class `Shape` with:
- Property: Color
- Abstract methods: `CalculateArea()`, `CalculatePerimeter()`
- Regular method: `Display()` shows color, area, and perimeter

Create derived classes:
- `Circle`: has Radius
- `Rectangle`: has Width, Height
- `Triangle`: has Base, Height (perimeter = base + 2 × √(height² + (base/2)²))

Implement all abstract methods and test.

### Task 4: Employee System
Create a base class `Employee` with:
- Properties: Name, ID, BaseSalary
- Constructor that takes name and baseSalary
- Virtual method: `CalculateSalary()` returns BaseSalary
- Method: `DisplayInfo()` shows employee details

Create derived classes:
- `Manager`: has Bonus, override CalculateSalary() to include bonus
- `Developer`: has ProjectCount, bonus = ProjectCount × 500
- `Intern`: override CalculateSalary() to return half of BaseSalary

Test salary calculations for each employee type.

### Task 5: Bank Account Hierarchy
Create a base class `BankAccount` with:
- Protected field: balance
- Properties: AccountNumber, Owner
- Methods: Deposit(), Withdraw(), GetBalance()
- Virtual method: `CalculateInterest()`

Create derived classes:
- `SavingsAccount`: has InterestRate, override CalculateInterest()
- `CheckingAccount`: has MonthlyFee, override Withdraw() to include fee
- `BusinessAccount`: has TransactionLimit, validate in Withdraw()

Test all account types with transactions.

### Task 6: Animal Kingdom
Create a class hierarchy:
- `Animal` (abstract): Name, Age, abstract MakeSound(), abstract Move()
- `Mammal` (abstract): inherits Animal, adds FurColor
- `Bird` (abstract): inherits Animal, adds WingSpan
- `Dog`: inherits Mammal, implements MakeSound() and Move()
- `Cat`: inherits Mammal, implements MakeSound() and Move()
- `Eagle`: inherits Bird, implements MakeSound() and Move()

Create multiple animals and demonstrate polymorphism.

### Task 7: Product Inventory
Create a base class `Product` with:
- Properties: Name, Price, SKU
- Constructor with parameters
- Virtual method: `CalculateTotal(int quantity)`
- Method: `Display()`

Create derived classes:
- `ElectronicsProduct`: adds WarrantyYears, override CalculateTotal() to add warranty cost
- `FoodProduct`: adds ExpirationDate, override Display() to show expiration
- `ClothingProduct`: adds Size, Color, override CalculateTotal() for bulk discount

Test with different product types.

### Task 8: Game Characters
Create an abstract class `GameCharacter` with:
- Properties: Name, Health, Level
- Abstract methods: `Attack()`, `Defend()`, `UseSpecialAbility()`
- Regular method: `TakeDamage(int damage)` reduces health

Create character classes:
- `Warrior`: high health, strong attack
- `Mage`: lower health, magic attack, special: fireball
- `Archer`: medium health, ranged attack, special: multi-shot

Implement all methods and simulate a battle.

### Task 9: Media Library
Create a base class `MediaItem` with:
- Properties: Title, Duration, ReleaseYear
- Virtual methods: `Play()`, `Pause()`, `GetInfo()`

Create derived classes:
- `Song`: adds Artist, Album, override Play()
- `Podcast`: adds Host, Episode, override Play()
- `Movie`: adds Director, Genre, override Play() and GetInfo()

Create a media library and test playing different items.

### Task 10: University System
Create a class hierarchy:
- `UniversityMember` (abstract): Name, ID, Email
- `Student`: inherits UniversityMember, adds Major, GPA, EnrolledCourses
- `Professor`: inherits UniversityMember, adds Department, CoursesTaught
- `Staff`: inherits UniversityMember, adds JobTitle, Department

Add appropriate methods and test the system.

### Task 11: Notification System
Create an abstract class `Notification` with:
- Properties: Message, Timestamp, Sender
- Abstract method: `Send()`
- Method: `Log()` writes to console

Create derived classes:
- `EmailNotification`: adds Recipient email, Subject, override Send()
- `SMSNotification`: adds PhoneNumber, override Send()
- `PushNotification`: adds DeviceID, AppName, override Send()

Test sending different notification types.

### Task 12: Transportation System
Create a comprehensive hierarchy:
- `Vehicle` (abstract): Brand, Model, MaxSpeed, abstract Start(), Stop()
- `LandVehicle`: inherits Vehicle, adds NumWheels
- `WaterVehicle`: inherits Vehicle, adds Displacement
- `Car`: inherits LandVehicle, adds FuelType
- `Boat`: inherits WaterVehicle, adds HasSail
- `Amphibious`: inherits both features, can operate on land and water

Implement all methods and demonstrate different vehicle operations.

## Expected Output Examples

**Task 1:**
```
Student: Alice
Age: 20
Student ID: S12345
Grade: A
Alice is studying hard!

Teacher: Mr. Smith
Age: 45
Subject: Mathematics
Years of Experience: 20
Mr. Smith is teaching Mathematics.
```

**Task 3:**
```
Circle:
Color: Red
Radius: 5
Area: 78.54
Perimeter: 31.42

Rectangle:
Color: Blue
Width: 4, Height: 6
Area: 24
Perimeter: 20
```

**Task 4:**
```
Manager: John Doe
ID: 101
Base Salary: $60,000
Bonus: $10,000
Total Salary: $70,000

Developer: Jane Smith
ID: 102
Base Salary: $50,000
Projects Completed: 5
Total Salary: $52,500

Intern: Bob Johnson
ID: 103
Base Salary: $20,000
Total Salary: $10,000
```

**Task 6:**
```
Dog: Buddy
Fur Color: Brown
Sound: Woof! Woof!
Movement: Running on four legs

Eagle: Sky
Wing Span: 2.5 meters
Sound: Screech!
Movement: Soaring through the sky
```

## Tips
- Use inheritance to model "is-a" relationships (Dog IS-A Animal)
- Use the most specific access modifier (protected when inheritance needs it)
- Call base constructors explicitly with `: base()`
- Mark methods as `virtual` if you want them overridable
- Use `abstract` for classes that should never be instantiated
- Use `sealed` to prevent further inheritance
- Don't create deep inheritance hierarchies (prefer composition)
- Override `ToString()` for better object representation

## Common Mistakes

```csharp
// ❌ Forgetting to call base constructor
class Animal
{
    public Animal(string name)
    {
        Name = name;
    }
}

class Dog : Animal
{
    public Dog(string name)  // Error! No parameterless constructor in Animal
    {
    }
}

// ✅ Call base constructor
class Dog : Animal
{
    public Dog(string name) : base(name)
    {
    }
}

// ❌ Forgetting virtual keyword
class Animal
{
    public void MakeSound()  // Not virtual!
    {
        Console.WriteLine("Generic sound");
    }
}

class Dog : Animal
{
    public override void MakeSound()  // ❌ Error! Can't override non-virtual
    {
    }
}

// ✅ Mark as virtual
class Animal
{
    public virtual void MakeSound()
    {
        Console.WriteLine("Generic sound");
    }
}

// ❌ Not implementing abstract methods
abstract class Shape
{
    public abstract double CalculateArea();
}

class Circle : Shape  // ❌ Error! Must implement CalculateArea
{
}

// ✅ Implement all abstract methods
class Circle : Shape
{
    public double Radius { get; set; }

    public override double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }
}

// ❌ Using private in base class when derived class needs access
class BankAccount
{
    private double balance;  // Derived class can't access!
}

class SavingsAccount : BankAccount
{
    public void AddInterest()
    {
        // balance += ...;  // ❌ Error! Can't access private member
    }
}

// ✅ Use protected
class BankAccount
{
    protected double balance;  // Derived class can access
}
```

## Key Concepts
- **Inheritance**: Mechanism to create new classes from existing ones
- **Base Class**: Class being inherited from (parent)
- **Derived Class**: Class that inherits (child)
- **Virtual Method**: Method that can be overridden in derived classes
- **Override**: Provide new implementation for virtual method
- **Abstract Class**: Class that cannot be instantiated
- **Abstract Method**: Method with no implementation (must be overridden)
- **Sealed Class**: Class that cannot be inherited from
- **Protected**: Accessible in class and derived classes
- **Base Keyword**: Reference to base class members

## Next Steps
Move on to `08-Polymorphism` to learn how to use inheritance for flexible, dynamic behavior!
