# Interfaces

## What You'll Learn
- What interfaces are and why they're important
- Defining and implementing interfaces
- Multiple interface implementation
- Interface inheritance
- Explicit interface implementation
- Default interface methods (C# 8+)
- Common built-in interfaces (IEnumerable, IComparable, IDisposable)
- Interface segregation principle

## Concept Overview

An interface is a contract that defines a set of methods, properties, and events that a class must implement. Interfaces define "what" a class can do, not "how" it does it.

### Basic Interface

```csharp
// Define interface
interface IDrawable
{
    void Draw();  // No implementation
    string GetColor();
}

// Implement interface
class Circle : IDrawable
{
    public double Radius { get; set; }

    public void Draw()
    {
        Console.WriteLine($"Drawing a circle with radius {Radius}");
    }

    public string GetColor()
    {
        return "Red";
    }
}

// Usage
IDrawable shape = new Circle { Radius = 5 };
shape.Draw();
Console.WriteLine($"Color: {shape.GetColor()}");
```

### Multiple Interface Implementation

```csharp
interface IMovable
{
    void Move();
}

interface IResizable
{
    void Resize(double factor);
}

// Class implementing multiple interfaces
class Rectangle : IDrawable, IMovable, IResizable
{
    public double Width { get; set; }
    public double Height { get; set; }

    public void Draw()
    {
        Console.WriteLine($"Drawing rectangle {Width}x{Height}");
    }

    public string GetColor()
    {
        return "Blue";
    }

    public void Move()
    {
        Console.WriteLine("Moving rectangle");
    }

    public void Resize(double factor)
    {
        Width *= factor;
        Height *= factor;
        Console.WriteLine($"Resized to {Width}x{Height}");
    }
}

// Usage
Rectangle rect = new Rectangle { Width = 10, Height = 5 };
rect.Draw();
rect.Move();
rect.Resize(2);
```

### Interface Properties

```csharp
interface IVehicle
{
    string Brand { get; set; }
    string Model { get; set; }
    int Year { get; }  // Read-only in interface

    void Start();
    void Stop();
}

class Car : IVehicle
{
    public string Brand { get; set; }
    public string Model { get; set; }
    public int Year { get; private set; }

    public Car(int year)
    {
        Year = year;
    }

    public void Start()
    {
        Console.WriteLine($"{Brand} {Model} is starting");
    }

    public void Stop()
    {
        Console.WriteLine($"{Brand} {Model} is stopping");
    }
}
```

### Interface Inheritance

```csharp
interface IShape
{
    double CalculateArea();
}

interface IColoredShape : IShape  // Interface inheriting from interface
{
    string Color { get; set; }
    void ChangeColor(string newColor);
}

class ColoredCircle : IColoredShape
{
    public double Radius { get; set; }
    public string Color { get; set; }

    public double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }

    public void ChangeColor(string newColor)
    {
        Color = newColor;
        Console.WriteLine($"Color changed to {Color}");
    }
}
```

### Explicit Interface Implementation

```csharp
interface IPrinter
{
    void Print();
}

interface IScanner
{
    void Print();  // Same method name as IPrinter
}

class MultiFunctionDevice : IPrinter, IScanner
{
    // Explicit implementation for IPrinter
    void IPrinter.Print()
    {
        Console.WriteLine("Printing document...");
    }

    // Explicit implementation for IScanner
    void IScanner.Print()
    {
        Console.WriteLine("Scanning to printer...");
    }

    // Regular method
    public void Copy()
    {
        Console.WriteLine("Copying document...");
    }
}

// Usage
MultiFunctionDevice device = new MultiFunctionDevice();
// device.Print();  // ❌ Error! Ambiguous

IPrinter printer = device;
printer.Print();  // Printing document...

IScanner scanner = device;
scanner.Print();  // Scanning to printer...

device.Copy();  // Copying document...
```

### IComparable Interface

```csharp
class Person : IComparable<Person>
{
    public string Name { get; set; }
    public int Age { get; set; }

    public int CompareTo(Person other)
    {
        if (other == null) return 1;
        return this.Age.CompareTo(other.Age);
    }
}

// Usage
List<Person> people = new List<Person>
{
    new Person { Name = "Alice", Age = 30 },
    new Person { Name = "Bob", Age = 25 },
    new Person { Name = "Charlie", Age = 35 }
};

people.Sort();  // Uses CompareTo method

foreach (var person in people)
{
    Console.WriteLine($"{person.Name}: {person.Age}");
}
// Output:
// Bob: 25
// Alice: 30
// Charlie: 35
```

### IEnumerable Interface

```csharp
class Playlist : IEnumerable<string>
{
    private List<string> songs = new List<string>();

    public void AddSong(string song)
    {
        songs.Add(song);
    }

    public IEnumerator<string> GetEnumerator()
    {
        return songs.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

// Usage
Playlist playlist = new Playlist();
playlist.AddSong("Song 1");
playlist.AddSong("Song 2");
playlist.AddSong("Song 3");

foreach (string song in playlist)  // IEnumerable allows foreach
{
    Console.WriteLine(song);
}
```

### IDisposable Interface

```csharp
class DatabaseConnection : IDisposable
{
    private bool disposed = false;

    public DatabaseConnection()
    {
        Console.WriteLine("Database connection opened");
    }

    public void ExecuteQuery(string query)
    {
        if (disposed)
            throw new ObjectDisposedException("DatabaseConnection");

        Console.WriteLine($"Executing: {query}");
    }

    public void Dispose()
    {
        if (!disposed)
        {
            Console.WriteLine("Database connection closed");
            disposed = true;
        }
    }
}

// Usage with 'using' statement
using (DatabaseConnection db = new DatabaseConnection())
{
    db.ExecuteQuery("SELECT * FROM Users");
}  // Dispose automatically called
```

## Your Tasks

### Task 1: Basic Interface
Create an `IPlayable` interface with:
- Properties: Title, Duration
- Methods: Play(), Pause(), Stop()

Implement it in classes: Song, Podcast, AudioBook
Test all implementations.

### Task 2: Multiple Interfaces
Create interfaces:
- `IPrintable`: method Print()
- `ISaveable`: methods Save(), Load()
- `IExportable`: method Export(string format)

Create a `Document` class implementing all three interfaces.
Test all functionality.

### Task 3: Payment Interface
Create an `IPayment` interface with:
- Properties: Amount, TransactionID, Status
- Methods: ProcessPayment(), RefundPayment(), GetReceipt()

Implement in classes: CreditCard, PayPal, Cryptocurrency
Create a payment processor that works with any IPayment.

### Task 4: IComparable Implementation
Create a `Product` class with:
- Properties: Name, Price, Rating
- Implement IComparable<Product> to sort by price
- Create a separate class that implements IComparer<Product> to sort by rating
Test sorting a list of products both ways.

### Task 5: Vehicle Interfaces
Create interfaces:
- `IEngine`: methods Start(), Stop(), GetStatus()
- `IRefuelable`: method Refuel(double amount), property FuelLevel
- `IElectric`: method Charge(double kwh), property BatteryLevel

Create classes:
- GasCar: implements IEngine and IRefuelable
- ElectricCar: implements IEngine and IElectric
- HybridCar: implements all three interfaces

Test different vehicle types.

### Task 6: Shape Interface Hierarchy
Create interface hierarchy:
- `IShape`: method CalculateArea()
- `I2DShape`: inherits IShape, adds CalculatePerimeter()
- `I3DShape`: inherits IShape, adds CalculateVolume(), CalculateSurfaceArea()

Implement:
- Circle, Rectangle (implement I2DShape)
- Sphere, Cube (implement I3DShape)

Create a shape calculator that processes any IShape.

### Task 7: IEnumerable Implementation
Create a `Library` class that implements IEnumerable<Book>:
- Store books in a collection
- Methods: AddBook(), RemoveBook(), FindByTitle()
- Implement GetEnumerator() to allow foreach

Create a `Book` class with Title, Author, ISBN.
Test iterating through the library.

### Task 8: IDisposable Pattern
Create a `FileLogger` class implementing IDisposable:
- Opens a log file in constructor
- Method: Log(string message) writes to file
- Dispose() closes the file
- Implement proper disposal pattern with finalizer

Use it with 'using' statement and test proper cleanup.

### Task 9: Notification System
Create an `INotification` interface:
- Properties: Message, Recipient, Timestamp
- Methods: Send(), Validate(), GetStatus()

Implement in classes: Email, SMS, PushNotification
Create a NotificationManager that can send any INotification type.
Add a method to send bulk notifications.

### Task 10: Repository Pattern
Create a generic `IRepository<T>` interface:
- Methods: Add(T item), Remove(T item), GetById(int id), GetAll(), Update(T item)

Implement it in:
- ProductRepository (for Product objects)
- CustomerRepository (for Customer objects)

Test CRUD operations with both repositories.

### Task 11: Explicit Implementation
Create interfaces:
- `IWorker`: method Work()
- `IEater`: method Eat()
- `IRobot`: method Work()

Create a `Human` class implementing IWorker and IEater.
Create a `Robot` class implementing IWorker and IRobot.
Use explicit implementation to handle method name conflicts.

### Task 12: Comprehensive Interface System
Create an interface system for a media library:
- `IMediaItem`: Title, Duration, Year, Play()
- `IRatable`: Rating, AddRating(), AverageRating
- `IDownloadable`: FileSize, Download(), IsDownloaded
- `IStreamable`: StreamingQuality, StartStream(), PauseStream()

Create classes:
- Movie: implements IMediaItem, IRatable, IStreamable
- Music: implements IMediaItem, IRatable, IDownloadable, IStreamable
- Podcast: implements IMediaItem, IDownloadable

Create a MediaManager that handles all types polymorphically.

## Expected Output Examples

**Task 1:**
```
Now Playing: Bohemian Rhapsody
Duration: 5:55
Status: Playing

Paused: Bohemian Rhapsody

Now Playing: Tech Talk Episode 5
Duration: 45:30
Status: Playing
```

**Task 3:**
```
Processing Credit Card Payment
Transaction ID: TXN-12345
Amount: $99.99
Status: Success

Processing PayPal Payment
Transaction ID: TXN-12346
Amount: $49.99
Status: Success

Total Processed: $149.98
```

**Task 5:**
```
Gas Car:
Engine started
Fuel Level: 50 liters
Refueling 20 liters...
Fuel Level: 70 liters

Electric Car:
Engine started
Battery Level: 80%
Charging 15 kWh...
Battery Level: 95%

Hybrid Car:
Engine started
Fuel Level: 30 liters
Battery Level: 60%
```

**Task 7:**
```
Library Catalog:

1. The Great Gatsby by F. Scott Fitzgerald (ISBN: 123456)
2. 1984 by George Orwell (ISBN: 234567)
3. To Kill a Mockingbird by Harper Lee (ISBN: 345678)

Total Books: 3
```

**Task 9:**
```
Sending notifications...

Email sent to: john@example.com
Subject: Welcome
Status: Delivered

SMS sent to: +1234567890
Message: Your code is 12345
Status: Delivered

Push Notification sent to device: DEV123
Message: New message received
Status: Delivered

Total notifications sent: 3
```

## Tips
- Interface names typically start with "I" (IDisposable, IEnumerable)
- Use interfaces to define contracts and enable polymorphism
- A class can implement multiple interfaces but inherit from only one class
- Keep interfaces small and focused (Interface Segregation Principle)
- Use interfaces for dependency injection and loose coupling
- Prefer interfaces over abstract classes when you don't need implementation
- Implement IDisposable for classes managing unmanaged resources
- Use explicit implementation when interfaces have conflicting members

## Common Mistakes

```csharp
// ❌ Implementing interface members as private
class MyClass : IDrawable
{
    private void Draw()  // ❌ Error! Interface members must be public
    {
    }
}

// ✅ Interface members are public
class MyClass : IDrawable
{
    public void Draw()
    {
    }
}

// ❌ Not implementing all interface members
interface IShape
{
    double CalculateArea();
    double CalculatePerimeter();
}

class Circle : IShape
{
    public double CalculateArea()  // Only implements one method
    {
        return 0;
    }
    // ❌ Missing CalculatePerimeter()
}

// ✅ Implement all members
class Circle : IShape
{
    public double CalculateArea()
    {
        return Math.PI * Radius * Radius;
    }

    public double CalculatePerimeter()
    {
        return 2 * Math.PI * Radius;
    }
}

// ❌ Putting implementation in interface (before C# 8)
interface ICalculator
{
    void Calculate()
    {
        Console.WriteLine("Calculating");  // ❌ Not allowed before C# 8
    }
}

// ✅ Interfaces only declare, classes implement
interface ICalculator
{
    void Calculate();
}

class Calculator : ICalculator
{
    public void Calculate()
    {
        Console.WriteLine("Calculating");
    }
}

// ❌ Not disposing IDisposable objects
FileLogger logger = new FileLogger();
logger.Log("Message");
// File never closed!

// ✅ Use 'using' statement
using (FileLogger logger = new FileLogger())
{
    logger.Log("Message");
}  // Automatically disposed

// ❌ Overusing interfaces
interface IPersonNameGetter
{
    string GetName();
}

interface IPersonAgeGetter
{
    int GetAge();
}
// Too granular! Combine related members

// ✅ Cohesive interfaces
interface IPerson
{
    string Name { get; }
    int Age { get; }
}
```

## Key Concepts
- **Interface**: Contract defining members that implementing classes must provide
- **Implementation**: Providing concrete code for interface members
- **Multiple Implementation**: Class implementing several interfaces
- **Explicit Implementation**: Implementing interface members explicitly to avoid conflicts
- **Interface Inheritance**: Interface inheriting from another interface
- **Polymorphism**: Using interface type to reference different implementations
- **IComparable**: Interface for comparing objects
- **IEnumerable**: Interface enabling foreach loops
- **IDisposable**: Interface for releasing resources

## Next Steps
Move on to `10-Exception-Handling` to learn how to handle errors gracefully!
