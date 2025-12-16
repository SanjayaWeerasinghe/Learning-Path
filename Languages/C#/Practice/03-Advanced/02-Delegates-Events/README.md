# Delegates and Events

## What You'll Learn
- What delegates are and how they work
- Built-in delegates (Action, Func, Predicate)
- Multicast delegates
- Anonymous methods
- Lambda expressions
- Events and event handlers
- Event best practices
- Publisher-subscriber pattern

## Concept Overview

A delegate is a type-safe function pointer that references methods. Events are a way to provide notifications when something happens, built on top of delegates.

### Basic Delegates

```csharp
// Define delegate type
delegate int MathOperation(int a, int b);

class Calculator
{
    public static int Add(int a, int b)
    {
        return a + b;
    }

    public static int Multiply(int a, int b)
    {
        return a * b;
    }
}

// Usage
MathOperation operation = Calculator.Add;
int result = operation(5, 3);  // 8

operation = Calculator.Multiply;
result = operation(5, 3);  // 15
```

### Built-in Delegates

```csharp
// Action - returns void, can have 0-16 parameters
Action<string> printMessage = message => Console.WriteLine(message);
printMessage("Hello!");  // Hello!

Action<int, int> printSum = (a, b) => Console.WriteLine(a + b);
printSum(5, 3);  // 8

// Func - returns a value, last type parameter is return type
Func<int, int, int> add = (a, b) => a + b;
int sum = add(5, 3);  // 8

Func<string, int> getLength = str => str.Length;
int length = getLength("Hello");  // 5

// Predicate - returns bool, takes one parameter
Predicate<int> isEven = x => x % 2 == 0;
bool result = isEven(4);  // true
```

### Multicast Delegates

```csharp
delegate void Notify(string message);

class Notification
{
    public static void EmailNotification(string message)
    {
        Console.WriteLine($"Email: {message}");
    }

    public static void SMSNotification(string message)
    {
        Console.WriteLine($"SMS: {message}");
    }

    public static void PushNotification(string message)
    {
        Console.WriteLine($"Push: {message}");
    }
}

// Usage - multicast delegate
Notify notify = Notification.EmailNotification;
notify += Notification.SMSNotification;  // Add another method
notify += Notification.PushNotification;  // Add another

notify("Hello World!");
// Output:
// Email: Hello World!
// SMS: Hello World!
// Push: Hello World!

notify -= Notification.SMSNotification;  // Remove method
notify("Test");
// Output:
// Email: Test
// Push: Test
```

### Lambda Expressions

```csharp
// No parameters
Action sayHello = () => Console.WriteLine("Hello!");

// One parameter (parentheses optional)
Func<int, int> square = x => x * x;
Func<int, int> squareAlt = (x) => x * x;  // Same thing

// Multiple parameters
Func<int, int, int> add = (a, b) => a + b;

// Multiple statements (need braces and return)
Func<int, int, bool> isInRange = (value, max) =>
{
    if (value < 0) return false;
    if (value > max) return false;
    return true;
};

// Usage with LINQ
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6 };
var evenNumbers = numbers.Where(x => x % 2 == 0).ToList();
```

### Events - Basic

```csharp
// Publisher class
class Button
{
    // Define event
    public event Action OnClick;

    public void Click()
    {
        Console.WriteLine("Button clicked!");
        OnClick?.Invoke();  // Trigger event (null-safe)
    }
}

// Usage
Button button = new Button();

// Subscribe to event
button.OnClick += () => Console.WriteLine("Handler 1 executed");
button.OnClick += () => Console.WriteLine("Handler 2 executed");

button.Click();
// Output:
// Button clicked!
// Handler 1 executed
// Handler 2 executed
```

### Events with EventArgs

```csharp
// Custom event arguments
class TemperatureChangedEventArgs : EventArgs
{
    public double OldTemperature { get; set; }
    public double NewTemperature { get; set; }
    public DateTime Timestamp { get; set; }
}

// Publisher
class Thermostat
{
    private double temperature;

    // Define event with EventHandler
    public event EventHandler<TemperatureChangedEventArgs> TemperatureChanged;

    public double Temperature
    {
        get { return temperature; }
        set
        {
            if (temperature != value)
            {
                var args = new TemperatureChangedEventArgs
                {
                    OldTemperature = temperature,
                    NewTemperature = value,
                    Timestamp = DateTime.Now
                };

                temperature = value;
                OnTemperatureChanged(args);
            }
        }
    }

    protected virtual void OnTemperatureChanged(TemperatureChangedEventArgs e)
    {
        TemperatureChanged?.Invoke(this, e);
    }
}

// Subscriber
class Display
{
    public void Subscribe(Thermostat thermostat)
    {
        thermostat.TemperatureChanged += Thermostat_TemperatureChanged;
    }

    private void Thermostat_TemperatureChanged(object sender, TemperatureChangedEventArgs e)
    {
        Console.WriteLine($"Temperature changed from {e.OldTemperature}°C to {e.NewTemperature}°C");
    }
}

// Usage
Thermostat thermostat = new Thermostat();
Display display = new Display();
display.Subscribe(thermostat);

thermostat.Temperature = 20;  // Triggers event
thermostat.Temperature = 25;  // Triggers event
```

### Delegate as Callback

```csharp
class DataProcessor
{
    public void ProcessData(int[] data, Action<int> callback)
    {
        foreach (int item in data)
        {
            // Process item
            int processed = item * 2;
            callback(processed);  // Call the callback
        }
    }
}

// Usage
DataProcessor processor = new DataProcessor();
int[] data = { 1, 2, 3, 4, 5 };

processor.ProcessData(data, result =>
{
    Console.WriteLine($"Processed: {result}");
});
```

### Anonymous Methods

```csharp
// Anonymous method (older syntax)
Func<int, int, int> add = delegate(int a, int b)
{
    return a + b;
};

// With event
button.Click += delegate(object sender, EventArgs e)
{
    Console.WriteLine("Button clicked!");
};

// Lambda expression (modern, preferred)
button.Click += (sender, e) => Console.WriteLine("Button clicked!");
```

## Your Tasks

### Task 1: Basic Delegate
Create a delegate `Calculate` that takes two integers and returns an integer.
Create methods: Add, Subtract, Multiply, Divide.
Test using the delegate to call each method.
Demonstrate passing delegate as parameter.

### Task 2: Built-in Delegates
Create a `NumberProcessor` class with:
- Method: `ProcessNumbers(List<int> numbers, Func<int, int> transformer)`
- Method: `FilterNumbers(List<int> numbers, Predicate<int> filter)`
- Method: `ForEachNumber(List<int> numbers, Action<int> action)`
Test with lambda expressions for each method.

### Task 3: Multicast Delegates
Create a logging system with delegate `LogHandler`:
- Methods: LogToConsole, LogToFile, LogToDatabase
- Create multicast delegate combining all three
- Add method to add/remove log handlers dynamically
Test logging with different combinations of handlers.

### Task 4: Simple Event System
Create a `VideoPlayer` class with:
- Events: PlayStarted, PlayPaused, PlayStopped
- Methods: Play(), Pause(), Stop()
- Each method triggers appropriate event

Create a `Display` class that subscribes to all events and shows messages.
Test the video player with display subscriber.

### Task 5: Stock Price Monitor
Create a `Stock` class with:
- Property: Price (triggers event when changed)
- Event: PriceChanged with custom EventArgs containing OldPrice, NewPrice, ChangePercentage
Create `Investor` and `Broker` classes that subscribe to price changes.
Test with multiple price changes.

### Task 6: Button Click Event
Create a `Button` class with:
- Event: Click (includes x, y coordinates)
- Custom EventArgs: ButtonClickEventArgs with X, Y, ClickTime, Button (left/right)
- Method: PerformClick(int x, int y, string button)

Create subscriber that logs all clicks and counts total clicks.
Test with multiple clicks.

### Task 7: Timer with Events
Create a `CountdownTimer` class with:
- Events: Tick (every second), Completed (when timer reaches zero)
- Properties: RemainingSeconds, IsRunning
- Methods: Start(int seconds), Stop(), Reset()

Create subscriber that displays countdown and completion message.
Simulate timer countdown.

### Task 8: Message Broadcasting
Create a `MessageBroadcaster` class with:
- Event: MessageReceived with custom EventArgs (Message, Sender, Priority)
- Method: SendMessage(string message, string sender, int priority)

Create multiple subscriber classes: Logger, Notifier, Analyzer.
Each subscriber handles messages differently based on priority.
Test with various messages.

### Task 9: File Watcher Simulation
Create a `FileWatcher` class with:
- Events: FileCreated, FileDeleted, FileModified
- Custom EventArgs with FileName, FilePath, Timestamp
- Methods: SimulateCreate, SimulateDelete, SimulateModify

Create `FileLogger` subscriber that logs all file operations.
Test simulating various file operations.

### Task 10: Order Processing System
Create an `Order` class with:
- Events: OrderPlaced, OrderProcessed, OrderShipped, OrderDelivered
- Properties: OrderID, Status, Customer
- Methods: PlaceOrder(), ProcessOrder(), ShipOrder(), DeliverOrder()

Create subscribers: EmailNotifier, SMSNotifier, InventoryManager.
Test complete order lifecycle with multiple subscribers.

### Task 11: Delegate Chain Processing
Create a data processing pipeline using delegates:
- Delegate: `DataTransformer` that takes and returns data
- Create chain of transformers: Uppercase, RemoveSpaces, AddTimestamp
- Method: `ProcessData(string data, params DataTransformer[] transformers)`
Test chaining multiple transformers.

### Task 12: Event Aggregator Pattern
Create an `EventAggregator` class that:
- Maintains dictionary of event types and subscribers
- Methods: Subscribe<T>(Action<T> handler), Publish<T>(T data), Unsubscribe<T>(Action<T> handler)

Create different event types: UserLoggedIn, OrderCreated, PaymentProcessed.
Create multiple subscriber classes for each event type.
Test publishing events and multiple subscribers receiving them.

## Expected Output Examples

**Task 1:**
```
Using Add: 5 + 3 = 8
Using Subtract: 5 - 3 = 2
Using Multiply: 5 * 3 = 15
Using Divide: 6 / 3 = 2
```

**Task 3:**
```
Logging message: "System started"
[Console] System started
[File] System started
[Database] System started

Removing file logger...

Logging message: "User logged in"
[Console] User logged in
[Database] User logged in
```

**Task 5:**
```
Stock: AAPL
Initial Price: $150.00

Price changed: $150.00 -> $155.00 (+3.33%)
[Investor] AAPL increased! New price: $155.00
[Broker] Price alert for AAPL: $155.00

Price changed: $155.00 -> $148.00 (-4.52%)
[Investor] AAPL decreased! New price: $148.00
[Broker] Price alert for AAPL: $148.00
```

**Task 7:**
```
Timer started: 5 seconds

5...
4...
3...
2...
1...
Timer completed!
```

**Task 10:**
```
Order #1001 Status: New

Order placed!
[Email] Order confirmation sent to customer@email.com
[SMS] Order #1001 placed

Order processed!
[Email] Processing notification sent
[Inventory] Inventory updated for Order #1001

Order shipped!
[Email] Shipping notification sent
[SMS] Order #1001 shipped - Tracking: TRK123

Order delivered!
[Email] Delivery confirmation sent
[SMS] Order #1001 delivered
```

## Tips
- Use built-in delegates (Action, Func) instead of custom delegates
- Use lambda expressions for concise delegate implementations
- Events should be declared with `event` keyword to restrict external invocation
- Use `?.Invoke()` to safely invoke events (handles null subscribers)
- Unsubscribe from events to prevent memory leaks
- Event handlers should be fast and not throw exceptions
- Use EventArgs-derived classes for event data
- Follow naming convention: OnEventName for event-raising methods
- Make event-raising methods virtual or protected virtual

## Common Mistakes

```csharp
// ❌ Not checking for null before invoking
public event Action MyEvent;
public void TriggerEvent()
{
    MyEvent();  // NullReferenceException if no subscribers!
}

// ✅ Null-safe invocation
public void TriggerEvent()
{
    MyEvent?.Invoke();
}

// ❌ Forgetting to unsubscribe from events
button.Click += HandleClick;
// ... later, button still exists but subscriber doesn't
// Memory leak!

// ✅ Unsubscribe when done
button.Click += HandleClick;
// ... later
button.Click -= HandleClick;

// ❌ Direct event invocation (without event keyword)
public Action MyEvent;  // Not an event, can be invoked externally!

external.MyEvent();  // Anyone can trigger it!

// ✅ Use event keyword
public event Action MyEvent;  // True event, cannot be invoked externally

// external.MyEvent();  // ❌ Compile error!

// ❌ Event handler throwing exceptions
button.Click += () =>
{
    throw new Exception("Error!");  // Breaks event chain!
};

button.Click += () =>
{
    Console.WriteLine("Never executed!");
};

// ✅ Handle exceptions in event handlers
button.Click += () =>
{
    try
    {
        // Risky code
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }
};

// ❌ Creating new delegate instance when unsubscribing
button.Click += () => Console.WriteLine("Click");  // Lambda
button.Click -= () => Console.WriteLine("Click");  // Different lambda! Doesn't work

// ✅ Use named method or store lambda in variable
Action handler = () => Console.WriteLine("Click");
button.Click += handler;
button.Click -= handler;  // Works!
```

## Key Concepts
- **Delegate**: Type-safe function pointer that references methods
- **Multicast Delegate**: Delegate that references multiple methods
- **Action**: Built-in delegate that returns void
- **Func**: Built-in delegate that returns a value
- **Predicate**: Built-in delegate that returns bool
- **Lambda Expression**: Anonymous function with concise syntax
- **Event**: Notification mechanism built on delegates
- **EventArgs**: Base class for event data
- **Publisher**: Object that raises events
- **Subscriber**: Object that handles events

## Next Steps
Move on to `03-LINQ` to learn powerful query syntax for collections!
