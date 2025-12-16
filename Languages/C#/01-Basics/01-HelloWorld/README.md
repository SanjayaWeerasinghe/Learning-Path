# Hello World - Your First C# Program

## What You'll Learn
- How to write and run a simple C# program
- Understanding the basic structure of a C# application
- Using `Console.WriteLine()` to output text

## Concept Overview

Every C# program starts with a basic structure. The most fundamental program is "Hello World" which simply displays text on the screen.

### Basic Structure
```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
    }
}
```

### Breakdown:
- `using System;` - Imports the System namespace (collection of classes)
- `class Program` - Defines a class named Program
- `static void Main(string[] args)` - The entry point of every C# application
- `Console.WriteLine()` - Outputs text to the console

## Your Tasks

### Task 1: Basic Hello World
Create a file named `HelloWorld.cs` and write a program that prints "Hello, World!" to the console.

### Task 2: Personalized Greeting
Modify your program to print your name: "Hello, [Your Name]!"

### Task 3: Multiple Lines
Write a program that prints three lines:
- Line 1: "Welcome to C#"
- Line 2: "This is my first program"
- Line 3: "Let's learn together!"

### Task 4: Using Console.Write vs Console.WriteLine
Create a program that demonstrates the difference between `Console.Write()` and `Console.WriteLine()` by printing text on the same line and different lines.

## Expected Output Examples

**Task 1:**
```
Hello, World!
```

**Task 3:**
```
Welcome to C#
This is my first program
Let's learn together!
```

## Tips
- Make sure to save your file with `.cs` extension
- To run: `dotnet run` or use your IDE's run button
- Don't forget the semicolon (`;`) at the end of statements
- C# is case-sensitive: `Console` is different from `console`

## Next Steps
Once you complete these tasks, move on to `02-Variables-DataTypes` to learn about storing and using data!
