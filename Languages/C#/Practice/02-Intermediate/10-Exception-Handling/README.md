# Exception Handling

## What You'll Learn
- What exceptions are and why they occur
- Try-catch-finally blocks
- Catching specific exceptions
- Throwing exceptions
- Creating custom exceptions
- Exception properties
- Best practices for exception handling
- When to use exceptions vs return values

## Concept Overview

An exception is an error that occurs during program execution. Exception handling allows you to handle errors gracefully instead of letting your program crash.

### Basic Try-Catch

```csharp
try
{
    int[] numbers = { 1, 2, 3 };
    Console.WriteLine(numbers[10]);  // Will cause exception
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}

Console.WriteLine("Program continues...");
```

### Catching Specific Exceptions

```csharp
try
{
    Console.Write("Enter a number: ");
    string input = Console.ReadLine();
    int number = int.Parse(input);
    int result = 100 / number;
    Console.WriteLine($"Result: {result}");
}
catch (FormatException ex)
{
    Console.WriteLine("Invalid input! Please enter a valid number.");
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Cannot divide by zero!");
}
catch (Exception ex)
{
    Console.WriteLine($"Unexpected error: {ex.Message}");
}
```

### Finally Block

```csharp
FileStream file = null;
try
{
    file = new FileStream("data.txt", FileMode.Open);
    // Read from file
    Console.WriteLine("File opened successfully");
}
catch (FileNotFoundException ex)
{
    Console.WriteLine("File not found!");
}
finally
{
    // Always executes, even if exception occurs
    if (file != null)
    {
        file.Close();
        Console.WriteLine("File closed");
    }
}
```

### Throwing Exceptions

```csharp
class BankAccount
{
    private double balance;

    public void Withdraw(double amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("Amount must be positive");
        }

        if (amount > balance)
        {
            throw new InvalidOperationException("Insufficient funds");
        }

        balance -= amount;
    }
}

// Usage
BankAccount account = new BankAccount();
try
{
    account.Withdraw(-50);
}
catch (ArgumentException ex)
{
    Console.WriteLine($"Invalid argument: {ex.Message}");
}
catch (InvalidOperationException ex)
{
    Console.WriteLine($"Operation failed: {ex.Message}");
}
```

### Exception Properties

```csharp
try
{
    int[] numbers = { 1, 2, 3 };
    Console.WriteLine(numbers[10]);
}
catch (Exception ex)
{
    Console.WriteLine($"Message: {ex.Message}");
    Console.WriteLine($"Type: {ex.GetType().Name}");
    Console.WriteLine($"Stack Trace:\n{ex.StackTrace}");
    Console.WriteLine($"Source: {ex.Source}");
}
```

### Custom Exceptions

```csharp
// Define custom exception
class InsufficientFundsException : Exception
{
    public double Balance { get; }
    public double RequestedAmount { get; }

    public InsufficientFundsException(double balance, double requestedAmount)
        : base($"Insufficient funds. Balance: ${balance}, Requested: ${requestedAmount}")
    {
        Balance = balance;
        RequestedAmount = requestedAmount;
    }
}

// Use custom exception
class BankAccount
{
    public double Balance { get; private set; }

    public void Withdraw(double amount)
    {
        if (amount > Balance)
        {
            throw new InsufficientFundsException(Balance, amount);
        }
        Balance -= amount;
    }
}

// Usage
BankAccount account = new BankAccount { Balance = 100 };
try
{
    account.Withdraw(150);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine($"You need ${ex.RequestedAmount - ex.Balance} more");
}
```

### Inner Exceptions

```csharp
try
{
    try
    {
        int result = int.Parse("invalid");
    }
    catch (FormatException ex)
    {
        throw new Exception("Failed to process data", ex);  // Inner exception
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Outer: {ex.Message}");
    Console.WriteLine($"Inner: {ex.InnerException?.Message}");
}
```

### Exception Filters (C# 6+)

```csharp
try
{
    // Some operation
    ProcessFile("data.txt");
}
catch (IOException ex) when (ex.Message.Contains("disk"))
{
    Console.WriteLine("Disk error occurred");
}
catch (IOException ex) when (ex.Message.Contains("network"))
{
    Console.WriteLine("Network error occurred");
}
catch (IOException ex)
{
    Console.WriteLine("Other IO error");
}
```

### Using Statement (Auto-Dispose)

```csharp
// Old way - manual cleanup
StreamReader reader = null;
try
{
    reader = new StreamReader("file.txt");
    string content = reader.ReadToEnd();
}
finally
{
    reader?.Dispose();
}

// Better way - using statement
using (StreamReader reader = new StreamReader("file.txt"))
{
    string content = reader.ReadToEnd();
}  // Automatically disposed, even if exception occurs

// C# 8+ - using declaration
using StreamReader reader = new StreamReader("file.txt");
string content = reader.ReadToEnd();
// Automatically disposed at end of scope
```

## Your Tasks

### Task 1: Basic Exception Handling
Create a calculator program that:
- Takes two numbers as input
- Performs division
- Handles FormatException (invalid input)
- Handles DivideByZeroException
- Uses finally to print "Calculation complete"
Test with valid and invalid inputs.

### Task 2: Array Exception Handling
Create a program that:
- Creates an array of 5 integers
- Asks user for an index to access
- Handles IndexOutOfRangeException
- Handles FormatException
- Continues asking until valid input
Display the value at valid index.

### Task 3: File Reading with Exceptions
Create a method `ReadFileContent(string filePath)` that:
- Tries to read a file
- Handles FileNotFoundException
- Handles UnauthorizedAccessException
- Handles IOException
- Uses finally to log "File operation completed"
Test with existing and non-existing files.

### Task 4: Custom Exception - Age Validation
Create a custom exception `InvalidAgeException`:
- Properties: AttemptedAge, MinAge, MaxAge
- Constructor with appropriate message

Create a `Person` class with:
- Property: Age (with validation)
- Throws InvalidAgeException if age < 0 or age > 150

Test with various age values.

### Task 5: Bank Account with Exceptions
Create a `BankAccount` class with:
- Properties: AccountNumber, Balance
- Custom exceptions:
  - `InsufficientFundsException`
  - `InvalidAmountException` (negative amounts)
  - `AccountClosedException`
- Methods: Deposit, Withdraw, Close
Handle all exceptions properly when testing.

### Task 6: Multiple Catch Blocks
Create a method `ProcessData(string input)` that:
- Converts input to integer
- Divides 100 by the number
- Stores result in array[10]
- Handles FormatException, DivideByZeroException, IndexOutOfRangeException
- Each catch block has specific message
Test with different inputs to trigger different exceptions.

### Task 7: Exception Rethrowing
Create a data processing pipeline:
- Method `ReadData()` - may throw IOException
- Method `ProcessData(data)` - catches IOException, logs it, rethrows
- Method `SaveData(data)` - handles any exception
Demonstrate exception propagation through layers.

### Task 8: Custom Exception Hierarchy
Create exception hierarchy:
- `DataException` (base)
  - `DataNotFoundException` (derived)
  - `DataCorruptedException` (derived)
  - `DataValidationException` (derived)

Create a `DataManager` class using these exceptions.
Test catching specific vs base exception.

### Task 9: Student Grade Validator
Create a `GradeValidator` class with:
- Custom exception: `InvalidGradeException`
- Method: `ValidateGrade(int grade)` throws exception if not 0-100
- Method: `ValidateLetterGrade(string grade)` throws exception if not A-F
- Method: `CalculateGPA(List<int> grades)` validates each grade

Test with valid and invalid grades.

### Task 10: Configuration Manager
Create a `ConfigurationManager` class that:
- Reads configuration from file
- Custom exceptions:
  - `ConfigurationFileNotFoundException`
  - `InvalidConfigurationException`
  - `ConfigurationKeyNotFoundException`
- Method: `LoadConfiguration(string path)`
- Method: `GetValue(string key)`
Handle exceptions appropriately with proper cleanup.

### Task 11: Exception Logging System
Create an exception logging system:
- Interface: `ILogger` with Log(Exception ex)
- Class: `FileLogger` implements ILogger
- Class: `ConsoleLogger` implements ILogger
- Method: `ExecuteWithLogging(Action action, ILogger logger)`
  - Executes action
  - Catches any exception
  - Logs using provided logger
Test with different loggers.

### Task 12: Order Processing System
Create a comprehensive order processing system:
- Custom exceptions:
  - `InvalidOrderException`
  - `OutOfStockException` (includes ProductName, Requested, Available)
  - `PaymentFailedException`
  - `ShippingException`
- Class: `Order` with validation
- Class: `OrderProcessor` with methods:
  - `ValidateOrder(Order order)`
  - `ProcessPayment(Order order)`
  - `ShipOrder(Order order)`
  - `ProcessOrder(Order order)` - calls all methods
Handle exceptions at each stage with proper error messages.

## Expected Output Examples

**Task 1:**
```
Enter first number: 10
Enter second number: 0
Error: Cannot divide by zero!
Calculation complete

Enter first number: abc
Enter second number: 5
Error: Invalid input format!
Calculation complete

Enter first number: 10
Enter second number: 2
Result: 5
Calculation complete
```

**Task 4:**
```
Creating person with age 25...
Person created successfully.

Creating person with age -5...
Error: Invalid age -5. Age must be between 0 and 150.

Creating person with age 200...
Error: Invalid age 200. Age must be between 0 and 150.
```

**Task 5:**
```
Account: 12345, Balance: $1000

Depositing $500...
New balance: $1500

Withdrawing $2000...
Error: Insufficient funds. Balance: $1500, Requested: $2000

Withdrawing $-100...
Error: Invalid amount. Amount must be positive.

Withdrawing $500...
New balance: $1000

Closing account...
Account closed.

Attempting withdrawal on closed account...
Error: Account is closed.
```

**Task 12:**
```
Processing order #1001...

Validating order...
Checking stock for Product: Laptop
Error: Out of stock! Product: Laptop, Requested: 5, Available: 3

Processing order #1002...

Validating order...
Processing payment...
Error: Payment failed. Insufficient funds.

Processing order #1003...

Validating order...
Processing payment...
Payment successful: $999.99
Shipping order...
Order shipped successfully!

Order completed: #1003
```

## Tips
- Always catch specific exceptions before general ones
- Use finally for cleanup code that must always run
- Don't catch exceptions you can't handle properly
- Use custom exceptions for business logic errors
- Include meaningful error messages
- Log exceptions for debugging
- Don't use exceptions for flow control
- Dispose resources properly (use using statement)
- Don't swallow exceptions silently
- Include context in exception messages

## Common Mistakes

```csharp
// ❌ Catching general exception first
try
{
    // code
}
catch (Exception ex)  // This catches everything!
{
    Console.WriteLine("Error");
}
catch (FileNotFoundException ex)  // This will never be reached!
{
    Console.WriteLine("File not found");
}

// ✅ Catch specific exceptions first
try
{
    // code
}
catch (FileNotFoundException ex)
{
    Console.WriteLine("File not found");
}
catch (Exception ex)
{
    Console.WriteLine("Error");
}

// ❌ Swallowing exceptions
try
{
    // code
}
catch (Exception ex)
{
    // Silent failure - very bad!
}

// ✅ Handle or log exceptions
try
{
    // code
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    // Or log it
}

// ❌ Using exceptions for flow control
public int FindIndex(int[] array, int value)
{
    try
    {
        for (int i = 0; i < array.Length; i++)
        {
            if (array[i] == value)
                throw new Exception(i.ToString());  // Bad!
        }
        return -1;
    }
    catch (Exception ex)
    {
        return int.Parse(ex.Message);
    }
}

// ✅ Use normal return values
public int FindIndex(int[] array, int value)
{
    for (int i = 0; i < array.Length; i++)
    {
        if (array[i] == value)
            return i;
    }
    return -1;
}

// ❌ Not disposing resources
FileStream file = new FileStream("data.txt", FileMode.Open);
// Use file
file.Close();  // What if exception occurs before this?

// ✅ Use using statement
using (FileStream file = new FileStream("data.txt", FileMode.Open))
{
    // Use file
}  // Automatically disposed

// ❌ Throwing System.Exception
throw new Exception("Something went wrong");  // Too generic!

// ✅ Throw specific or custom exceptions
throw new InvalidOperationException("Cannot withdraw from closed account");
throw new InsufficientFundsException(balance, amount);

// ❌ Not providing context
throw new Exception("Error");  // What error? Where?

// ✅ Include meaningful context
throw new Exception($"Failed to process order {orderId}: Invalid payment method");
```

## Key Concepts
- **Exception**: Object representing an error or unexpected condition
- **Try Block**: Code that might throw an exception
- **Catch Block**: Code that handles specific exceptions
- **Finally Block**: Code that always executes, even if exception occurs
- **Throw**: Raise an exception
- **Custom Exception**: User-defined exception class
- **Inner Exception**: Exception that caused another exception
- **Stack Trace**: List of methods called leading to exception
- **Exception Handling**: Process of responding to exceptions

## Next Steps
Congratulations! You've completed the Intermediate level! Move on to `03-Advanced/01-Generics` to learn advanced C# features!
