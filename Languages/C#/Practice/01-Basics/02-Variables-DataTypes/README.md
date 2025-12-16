# Variables and Data Types

## What You'll Learn
- How to declare and initialize variables
- Different data types in C# (int, string, bool, double, etc.)
- Type conversion and casting
- Constants

## Concept Overview

Variables are containers that store data. In C#, every variable has a specific type that determines what kind of data it can hold.

### Common Data Types

| Type | Description | Example |
|------|-------------|---------|
| `int` | Whole numbers | 42, -10, 0 |
| `double` | Decimal numbers | 3.14, -0.5 |
| `string` | Text | "Hello", "C#" |
| `bool` | True/False | true, false |
| `char` | Single character | 'A', '5' |
| `decimal` | High-precision decimals | 99.99m |

### Declaring Variables
```csharp
// Declare and initialize
int age = 25;
string name = "Alice";
bool isStudent = true;
double price = 19.99;

// Declare first, assign later
int count;
count = 10;

// Using var (type inference)
var city = "New York"; // Compiler infers string
```

### Constants
```csharp
const double PI = 3.14159;
const int MAX_USERS = 100;
```

## Your Tasks

### Task 1: Basic Variable Declaration
Create a program that:
- Declares variables for your age (int), name (string), and height in meters (double)
- Assigns values to them
- Prints each variable with a label

### Task 2: Type Exploration
Create variables of each type: `int`, `double`, `string`, `bool`, `char`, and `decimal`. Print them all with descriptive labels.

### Task 3: Variable Operations
Create a program that:
- Declares two int variables with values 10 and 20
- Calculates and prints their sum, difference, product, and quotient
- Declares two string variables with your first and last name
- Combines them and prints your full name

### Task 4: Type Conversion
Write a program that:
- Converts a string to an int: `string numStr = "42";` → convert to int
- Converts an int to a string
- Converts a double to an int (note: this truncates decimals)
- Use `Convert.ToInt32()`, `int.Parse()`, and casting `(int)`

### Task 5: Constants
Create a program that:
- Defines constants for PI, speed of light, or days in a week
- Uses them in calculations
- Prints the results

## Expected Output Examples

**Task 1:**
```
Name: John Doe
Age: 30
Height: 1.75 meters
```

**Task 3:**
```
Sum: 30
Difference: -10
Product: 200
Quotient: 0
Full Name: John Doe
```

## Tips
- Variable names should be descriptive: `age` not `a`
- Use camelCase for variable names: `firstName`, `totalCount`
- Constants use UPPER_CASE: `MAX_VALUE`
- Strings use double quotes `"text"`, chars use single quotes `'c'`
- Add `m` suffix for decimal: `decimal price = 99.99m;`

## Common Errors to Avoid
```csharp
// ❌ Wrong
int age = "25"; // Type mismatch

// ✅ Correct
int age = 25;
```

## Next Steps
Move on to `03-Operators` to learn how to perform operations on your variables!
