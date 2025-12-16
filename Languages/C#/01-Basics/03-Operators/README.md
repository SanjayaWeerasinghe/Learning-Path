# Operators in C#

## What You'll Learn
- Arithmetic operators (+, -, *, /, %)
- Comparison operators (==, !=, <, >, <=, >=)
- Logical operators (&&, ||, !)
- Assignment operators (=, +=, -=, etc.)
- Increment/Decrement operators (++, --)

## Concept Overview

Operators are symbols that perform operations on variables and values.

### Arithmetic Operators
```csharp
int a = 10, b = 3;

int sum = a + b;        // 13 (Addition)
int diff = a - b;       // 7  (Subtraction)
int product = a * b;    // 30 (Multiplication)
int quotient = a / b;   // 3  (Division - integer division)
int remainder = a % b;  // 1  (Modulus - remainder)
```

### Comparison Operators
```csharp
int x = 5, y = 10;

bool isEqual = (x == y);      // false
bool isNotEqual = (x != y);   // true
bool isLess = (x < y);        // true
bool isGreater = (x > y);     // false
bool isLessOrEqual = (x <= 5); // true
bool isGreaterOrEqual = (y >= 10); // true
```

### Logical Operators
```csharp
bool a = true, b = false;

bool and = a && b;  // false (AND - both must be true)
bool or = a || b;   // true  (OR - at least one must be true)
bool not = !a;      // false (NOT - inverts the value)
```

### Assignment Operators
```csharp
int x = 10;

x += 5;  // x = x + 5  → 15
x -= 3;  // x = x - 3  → 12
x *= 2;  // x = x * 2  → 24
x /= 4;  // x = x / 4  → 6
x %= 4;  // x = x % 4  → 2
```

### Increment/Decrement
```csharp
int count = 5;

count++;  // Increment by 1 → 6
count--;  // Decrement by 1 → 5

// Prefix vs Postfix
int a = 5;
int b = ++a;  // a becomes 6, then b = 6 (prefix)

int c = 5;
int d = c++;  // d = 5, then c becomes 6 (postfix)
```

## Your Tasks

### Task 1: Calculator
Create a program that:
- Takes two numbers (you can hardcode them)
- Performs all arithmetic operations (+, -, *, /, %)
- Prints the results with labels

### Task 2: Even or Odd
Write a program that:
- Takes a number
- Uses the modulus operator to check if it's even or odd
- Print "Even" if number % 2 == 0, otherwise "Odd"

### Task 3: Comparison Checker
Create a program that:
- Declares two numbers
- Tests all comparison operators
- Prints the results (e.g., "10 == 5: false")

### Task 4: Grade Checker
Write a program that:
- Takes a score (0-100)
- Uses logical operators to check:
  - Is it passing? (score >= 60)
  - Is it excellent? (score >= 90)
  - Is it failing but close? (score >= 50 && score < 60)
- Print the results

### Task 5: Counter
Create a program that:
- Initializes a counter at 0
- Uses increment operator to count to 10
- Uses compound assignment operators (+=, -=) to manipulate the counter
- Print the counter value after each operation

### Task 6: Temperature Converter
Write a program that:
- Converts Celsius to Fahrenheit: F = C * 9/5 + 32
- Converts Fahrenheit to Celsius: C = (F - 32) * 5/9
- Test with values: 0°C, 100°C, 32°F, 212°F

## Expected Output Examples

**Task 1:**
```
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3
10 % 3 = 1
```

**Task 2:**
```
Number: 7
Result: Odd
```

**Task 6:**
```
0°C = 32°F
100°C = 212°F
32°F = 0°C
212°F = 100°C
```

## Tips
- Integer division truncates: `7 / 2 = 3` not `3.5`
- Use `double` for decimal results: `7.0 / 2.0 = 3.5`
- `%` is great for checking divisibility
- Use parentheses to control operation order: `(a + b) * c`

## Common Pitfalls
```csharp
// ❌ Integer division loses precision
int result = 5 / 2;  // result = 2

// ✅ Use doubles for precision
double result = 5.0 / 2.0;  // result = 2.5
```

## Next Steps
Move on to `04-Conditionals` to learn how to make decisions in your programs!
