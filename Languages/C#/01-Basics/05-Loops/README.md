# Loops in C#

## What You'll Learn
- for loops
- while loops
- do-while loops
- foreach loops (introduction)
- break and continue statements
- Nested loops

## Concept Overview

Loops allow you to execute code repeatedly without writing the same code multiple times.

### for Loop
```csharp
// Print numbers 1 to 5
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine(i);
}

// Syntax: for (initialization; condition; increment)
```

### while Loop
```csharp
int count = 1;

while (count <= 5)
{
    Console.WriteLine(count);
    count++;
}
```

### do-while Loop
```csharp
int count = 1;

do
{
    Console.WriteLine(count);
    count++;
} while (count <= 5);

// Difference: Executes at least once, even if condition is false
```

### foreach Loop (Preview)
```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

foreach (int num in numbers)
{
    Console.WriteLine(num);
}
```

### break Statement
```csharp
for (int i = 1; i <= 10; i++)
{
    if (i == 5)
        break; // Exit loop when i is 5

    Console.WriteLine(i); // Prints 1, 2, 3, 4
}
```

### continue Statement
```csharp
for (int i = 1; i <= 5; i++)
{
    if (i == 3)
        continue; // Skip iteration when i is 3

    Console.WriteLine(i); // Prints 1, 2, 4, 5
}
```

### Nested Loops
```csharp
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.WriteLine($"i={i}, j={j}");
    }
}
```

## Your Tasks

### Task 1: Counting
Create programs that:
- Count from 1 to 10 using a for loop
- Count from 10 to 1 (backwards) using a for loop
- Count from 0 to 100 by 5s (0, 5, 10, 15...)

### Task 2: Sum Calculator
Write a program that:
- Uses a for loop to calculate the sum of numbers 1 to 100
- Prints the final sum
- Extension: Calculate sum of even numbers only

### Task 3: Multiplication Table
Create a program that:
- Takes a number (e.g., 5)
- Prints its multiplication table from 1 to 10
- Format: "5 x 1 = 5"

### Task 4: While Loop Practice
Write a program that:
- Uses a while loop to keep asking for a password
- Continues until the correct password is entered
- Use a hardcoded correct password
- Limit attempts to 3

### Task 5: Factorial Calculator
Create a program that:
- Calculates the factorial of a number using a loop
- Example: 5! = 5 × 4 × 3 × 2 × 1 = 120

### Task 6: Pattern Printing
Use nested loops to print these patterns:

Pattern 1 (Square):
```
* * * * *
* * * * *
* * * * *
* * * * *
* * * * *
```

Pattern 2 (Right Triangle):
```
*
* *
* * *
* * * *
* * * * *
```

Pattern 3 (Number Pyramid):
```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```

### Task 7: Prime Number Checker
Write a program that:
- Takes a number
- Uses a loop to check if it's prime
- A prime number is only divisible by 1 and itself

### Task 8: FizzBuzz
Classic programming problem:
- Loop from 1 to 100
- If divisible by 3: print "Fizz"
- If divisible by 5: print "Buzz"
- If divisible by both: print "FizzBuzz"
- Otherwise: print the number

### Task 9: Number Guessing Game
Create a program that:
- Sets a secret number (hardcode it)
- Uses a do-while loop to keep asking for guesses
- Gives hints: "Too high" or "Too low"
- Congratulates when correct

### Task 10: Menu with Loop
Create a menu that keeps running until user chooses exit:
```
1. Say Hello
2. Show Date
3. Exit
```
Use a while loop and switch statement.

## Expected Output Examples

**Task 1:**
```
1
2
3
...
10
```

**Task 3:**
```
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
...
5 x 10 = 50
```

**Task 8:**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
...
```

## Tips
- **for loop**: Use when you know how many iterations you need
- **while loop**: Use when you don't know the exact number of iterations
- **do-while loop**: Use when you need at least one iteration
- Avoid infinite loops: always ensure the condition will eventually be false
- Use descriptive variable names: `i`, `j`, `k` are fine for simple counters

## Common Mistakes
```csharp
// ❌ Infinite loop
while (true)
{
    Console.WriteLine("Forever!"); // No exit condition
}

// ✅ Fixed
int count = 0;
while (count < 5)
{
    Console.WriteLine("Hello");
    count++; // Don't forget to update the condition variable
}

// ❌ Off-by-one error
for (int i = 1; i < 10; i++) // Only goes to 9

// ✅ Correct
for (int i = 1; i <= 10; i++) // Goes to 10
```

## Loop Selection Guide
- Need to iterate exact number of times? → **for loop**
- Need to iterate while condition is true? → **while loop**
- Need at least one iteration? → **do-while loop**
- Iterating through a collection? → **foreach loop**

## Next Steps
Congratulations on completing the basics! Move on to `02-Intermediate/01-Arrays` to start working with collections of data!
