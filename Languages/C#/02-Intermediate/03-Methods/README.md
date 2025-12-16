# Methods (Functions) in C#

## What You'll Learn
- Creating and calling methods
- Parameters and arguments
- Return values
- Method overloading
- Optional and named parameters
- ref, out, and params keywords

## Concept Overview

Methods are reusable blocks of code that perform specific tasks.

### Basic Method Syntax

```csharp
// Method with no parameters, no return value
void SayHello()
{
    Console.WriteLine("Hello!");
}

// Method with parameters
void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

// Method with return value
int Add(int a, int b)
{
    return a + b;
}

// Calling methods
SayHello();
Greet("Alice");
int sum = Add(5, 3);
```

### Return Types

```csharp
int GetNumber() { return 42; }
string GetName() { return "Alice"; }
bool IsEven(int num) { return num % 2 == 0; }
void DoSomething() { /* no return */ }
```

### Method Overloading

```csharp
int Add(int a, int b) { return a + b; }
double Add(double a, double b) { return a + b; }
int Add(int a, int b, int c) { return a + b + c; }
```

### Optional Parameters

```csharp
void Greet(string name, string greeting = "Hello")
{
    Console.WriteLine($"{greeting}, {name}!");
}

Greet("Alice");              // Uses default "Hello"
Greet("Bob", "Hi");          // Uses "Hi"
```

### ref and out Keywords

```csharp
// ref: variable must be initialized before passing
void Double(ref int number)
{
    number *= 2;
}

int x = 5;
Double(ref x);  // x is now 10

// out: method must assign value before returning
void GetValues(out int x, out int y)
{
    x = 10;
    y = 20;
}

GetValues(out int a, out int b);
```

## Your Tasks

### Task 1: Basic Methods
Create methods for:
- `PrintLine()` - prints a line of dashes
- `PrintMessage(string msg)` - prints a message
- `GetSquare(int n)` - returns n²

### Task 2: Calculator
Create these methods:
- `Add(int a, int b)`
- `Subtract(int a, int b)`
- `Multiply(int a, int b)`
- `Divide(double a, double b)`
Use them in a calculator program.

### Task 3: String Methods
Create:
- `ReverseString(string text)` - returns reversed string
- `IsPalindrome(string text)` - checks if palindrome
- `CountVowels(string text)` - counts vowels

### Task 4: Array Methods
Create:
- `GetMax(int[] arr)` - returns maximum value
- `GetMin(int[] arr)` - returns minimum value
- `GetAverage(int[] arr)` - returns average
- `PrintArray(int[] arr)` - prints array elements

### Task 5: Method Overloading
Create overloaded `Print()` methods for:
- `Print(int n)`
- `Print(string s)`
- `Print(int[] arr)`
- `Print(string s, int times)` - prints string multiple times

### Task 6: Temperature Converter
Create:
- `CelsiusToFahrenheit(double celsius)`
- `FahrenheitToCelsius(double fahrenheit)`
- `CelsiusToKelvin(double celsius)`
- `KelvinToCelsius(double kelvin)`

### Task 7: Validation Methods
Create:
- `IsValidEmail(string email)` - basic validation
- `IsValidPassword(string pwd)` - checks length >= 8
- `IsInRange(int num, int min, int max)` - range check

### Task 8: ref and out Practice
Create:
- `Swap(ref int a, ref int b)` - swaps two numbers
- `GetMinMax(int[] arr, out int min, out int max)` - finds both

### Task 9: Menu System
Create a menu-driven program with methods:
- `ShowMenu()` - displays menu
- `GetChoice()` - gets user input
- `ProcessChoice(int choice)` - handles choice
- Methods for each menu option

### Task 10: Number Methods
Create:
- `IsPrime(int n)` - checks if prime
- `Factorial(int n)` - calculates factorial
- `Fibonacci(int n)` - returns nth Fibonacci number
- `SumOfDigits(int n)` - sums digits (123 → 6)

## Expected Output Examples

**Task 2:**
```csharp
Add(5, 3);       // Returns 8
Subtract(10, 4); // Returns 6
Multiply(6, 7);  // Returns 42
Divide(10, 3);   // Returns 3.333...
```

**Task 3:**
```csharp
ReverseString("hello");      // Returns "olleh"
IsPalindrome("radar");       // Returns true
CountVowels("programming");  // Returns 3
```

## Tips
- Use meaningful method names: verbs for actions
- Keep methods focused on one task
- Methods should be 5-50 lines ideally
- Use parameters instead of global variables
- Always specify return type (or `void`)

## Next Steps
Move on to `04-Classes-Objects` to learn Object-Oriented Programming!
