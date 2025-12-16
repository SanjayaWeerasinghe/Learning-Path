# Conditional Statements

## What You'll Learn
- if statements
- if-else statements
- else if (chained conditionals)
- switch statements
- Ternary operator

## Concept Overview

Conditional statements allow your program to make decisions and execute different code based on conditions.

### if Statement
```csharp
int age = 18;

if (age >= 18)
{
    Console.WriteLine("You are an adult");
}
```

### if-else Statement
```csharp
int age = 16;

if (age >= 18)
{
    Console.WriteLine("You can vote");
}
else
{
    Console.WriteLine("You cannot vote yet");
}
```

### else if (Multiple Conditions)
```csharp
int score = 85;

if (score >= 90)
{
    Console.WriteLine("Grade: A");
}
else if (score >= 80)
{
    Console.WriteLine("Grade: B");
}
else if (score >= 70)
{
    Console.WriteLine("Grade: C");
}
else
{
    Console.WriteLine("Grade: F");
}
```

### switch Statement
```csharp
int dayNumber = 3;

switch (dayNumber)
{
    case 1:
        Console.WriteLine("Monday");
        break;
    case 2:
        Console.WriteLine("Tuesday");
        break;
    case 3:
        Console.WriteLine("Wednesday");
        break;
    default:
        Console.WriteLine("Invalid day");
        break;
}
```

### Ternary Operator
```csharp
int age = 20;
string status = (age >= 18) ? "Adult" : "Minor";
// If age >= 18, status = "Adult", otherwise status = "Minor"
```

### Nested Conditionals
```csharp
int age = 25;
bool hasLicense = true;

if (age >= 18)
{
    if (hasLicense)
    {
        Console.WriteLine("You can drive");
    }
    else
    {
        Console.WriteLine("You need a license");
    }
}
```

## Your Tasks

### Task 1: Age Classifier
Create a program that:
- Takes an age value
- Classifies the person as:
  - Baby (0-2)
  - Child (3-12)
  - Teenager (13-19)
  - Adult (20-59)
  - Senior (60+)

### Task 2: Grade Calculator
Write a program that:
- Takes a numerical score (0-100)
- Converts it to a letter grade:
  - A: 90-100
  - B: 80-89
  - C: 70-79
  - D: 60-69
  - F: 0-59
- Prints the grade with a message

### Task 3: Login Validator
Create a program that:
- Defines a correct username and password
- Takes user input (you can hardcode for now)
- Checks if both username AND password match
- Prints "Login successful" or "Invalid credentials"

### Task 4: Calculator with Switch
Write a program that:
- Takes two numbers and an operator (+, -, *, /)
- Uses a switch statement to perform the operation
- Prints the result
- Handles invalid operators

### Task 5: Leap Year Checker
Create a program that checks if a year is a leap year:
- Divisible by 4 AND
- (Not divisible by 100 OR divisible by 400)
- Test with: 2000, 2020, 2100, 2024

### Task 6: Ticket Pricing
Write a program that calculates ticket price based on:
- Age: Child (<12) = $5, Adult (12-64) = $10, Senior (65+) = $7
- Day: Weekend adds $2 to all tickets
- Use nested conditionals

### Task 7: Menu System
Create a simple menu using switch:
```
1. Start Game
2. Load Game
3. Settings
4. Exit
```
Take a choice and print the corresponding action.

### Task 8: Ternary Practice
Rewrite Task 1 (Age Classifier) using multiple ternary operators.

## Expected Output Examples

**Task 1:**
```
Age: 15
Category: Teenager
```

**Task 2:**
```
Score: 87
Grade: B
You passed with a B!
```

**Task 4:**
```
Number 1: 10
Number 2: 5
Operator: +
Result: 10 + 5 = 15
```

**Task 5:**
```
Year: 2024
2024 is a leap year
```

## Tips
- Always use braces `{}` even for single-line if statements (better practice)
- Remember `break;` in switch cases
- Conditions are evaluated top to bottom - order matters
- Use logical operators (&&, ||) to combine conditions
- Switch works with int, char, string, and enums

## Common Mistakes
```csharp
// ❌ Assignment instead of comparison
if (age = 18) // Wrong! This assigns 18 to age

// ✅ Correct
if (age == 18)

// ❌ Forgetting break in switch
switch(day)
{
    case 1:
        Console.WriteLine("Monday");
        // Missing break! Will fall through to next case
}
```

## Next Steps
Move on to `05-Loops` to learn how to repeat code execution!
