# Loops - Repeating Code

## What You'll Learn
- Using for loops to repeat code a specific number of times
- Understanding while loops
- Working with do-while loops
- Nested loops
- Break and continue statements
- Loop control techniques

## Concept Overview

Loops allow you to execute a block of code repeatedly without writing it multiple times.

### 1. For Loop

```java
// Basic for loop
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}
// Output: Count: 0, Count: 1, Count: 2, Count: 3, Count: 4

// Syntax: for (initialization; condition; update) { }
```

### 2. While Loop

```java
int count = 0;
while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}
// Same output as above
```

### 3. Do-While Loop

```java
int count = 0;
do {
    System.out.println("Count: " + count);
    count++;
} while (count < 5);
// Executes at least once, even if condition is false
```

### 4. Enhanced For Loop (For-Each)

```java
int[] numbers = {10, 20, 30, 40, 50};
for (int num : numbers) {
    System.out.println(num);
}
```

### 5. Break Statement

```java
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // Exit loop when i is 5
    }
    System.out.println(i);
}
// Output: 0, 1, 2, 3, 4
```

### 6. Continue Statement

```java
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue;  // Skip iteration when i is 2
    }
    System.out.println(i);
}
// Output: 0, 1, 3, 4
```

### 7. Nested Loops

```java
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.println("i=" + i + ", j=" + j);
    }
}
```

## Your Tasks

### Task 1: Basic For Loop
Create a file named `ForLoopBasic.java` that prints numbers from 1 to 10.

**Example code:**
```java
public class ForLoopBasic {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
        }
    }
}
```

**Expected Output:**
```
1
2
3
4
5
6
7
8
9
10
```

### Task 2: Sum of Numbers
Create a file named `SumNumbers.java` that calculates the sum of numbers from 1 to 100.

**Example code:**
```java
public class SumNumbers {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
        }
        System.out.println("Sum of numbers from 1 to 100: " + sum);
    }
}
```

**Expected Output:**
```
Sum of numbers from 1 to 100: 5050
```

### Task 3: While Loop - Countdown
Create a file named `Countdown.java` that counts down from 10 to 1 using a while loop.

**Example code:**
```java
public class Countdown {
    public static void main(String[] args) {
        int count = 10;
        while (count >= 1) {
            System.out.println(count);
            count--;
        }
        System.out.println("Blast off!");
    }
}
```

**Expected Output:**
```
10
9
8
7
6
5
4
3
2
1
Blast off!
```

### Task 4: Do-While Loop
Create a file named `DoWhileDemo.java` demonstrating that do-while executes at least once.

**Example code:**
```java
public class DoWhileDemo {
    public static void main(String[] args) {
        // This will execute once even though condition is false
        int count = 10;
        do {
            System.out.println("Count: " + count);
            count++;
        } while (count < 5);

        System.out.println("\nCompare with while loop:");
        count = 10;
        while (count < 5) {
            System.out.println("Count: " + count);
            count++;
        }
        System.out.println("While loop didn't execute");
    }
}
```

**Expected Output:**
```
Count: 10

Compare with while loop:
While loop didn't execute
```

### Task 5: Multiplication Table
Create a file named `MultiplicationTable.java` that prints the multiplication table for a number.

**Example code:**
```java
public class MultiplicationTable {
    public static void main(String[] args) {
        int number = 7;
        System.out.println("Multiplication table for " + number + ":");

        for (int i = 1; i <= 10; i++) {
            System.out.println(number + " x " + i + " = " + (number * i));
        }
    }
}
```

**Expected Output:**
```
Multiplication table for 7:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```

### Task 6: Even Numbers
Create a file named `EvenNumbers.java` that prints even numbers from 1 to 20.

**Example code:**
```java
public class EvenNumbers {
    public static void main(String[] args) {
        System.out.println("Even numbers from 1 to 20:");
        for (int i = 1; i <= 20; i++) {
            if (i % 2 == 0) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }
}
```

**Expected Output:**
```
Even numbers from 1 to 20:
2 4 6 8 10 12 14 16 18 20
```

### Task 7: Break Statement
Create a file named `BreakDemo.java` that uses break to exit a loop early.

**Example code:**
```java
public class BreakDemo {
    public static void main(String[] args) {
        System.out.println("Finding first number divisible by 7 and 5:");
        for (int i = 1; i <= 100; i++) {
            if (i % 7 == 0 && i % 5 == 0) {
                System.out.println("Found: " + i);
                break;  // Exit loop after finding first match
            }
        }

        System.out.println("\nLoop with break at specific value:");
        for (int i = 1; i <= 10; i++) {
            if (i == 6) {
                System.out.println("Breaking at " + i);
                break;
            }
            System.out.println(i);
        }
    }
}
```

**Expected Output:**
```
Finding first number divisible by 7 and 5:
Found: 35

Loop with break at specific value:
1
2
3
4
5
Breaking at 6
```

### Task 8: Continue Statement
Create a file named `ContinueDemo.java` that uses continue to skip specific iterations.

**Example code:**
```java
public class ContinueDemo {
    public static void main(String[] args) {
        System.out.println("Numbers from 1 to 10, skipping multiples of 3:");
        for (int i = 1; i <= 10; i++) {
            if (i % 3 == 0) {
                continue;  // Skip this iteration
            }
            System.out.print(i + " ");
        }
        System.out.println();

        System.out.println("\nPrinting only positive numbers:");
        int[] numbers = {5, -2, 8, -7, 3, -1, 9};
        for (int num : numbers) {
            if (num < 0) {
                continue;
            }
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

**Expected Output:**
```
Numbers from 1 to 10, skipping multiples of 3:
1 2 4 5 7 8 10

Printing only positive numbers:
5 8 3 9
```

### Task 9: Factorial Calculator
Create a file named `Factorial.java` that calculates the factorial of a number.

**Example code:**
```java
public class Factorial {
    public static void main(String[] args) {
        int number = 5;
        long factorial = 1;

        for (int i = 1; i <= number; i++) {
            factorial *= i;
        }

        System.out.println("Factorial of " + number + " is: " + factorial);

        // Show the calculation
        System.out.print(number + "! = ");
        for (int i = 1; i <= number; i++) {
            System.out.print(i);
            if (i < number) {
                System.out.print(" x ");
            }
        }
        System.out.println(" = " + factorial);
    }
}
```

**Expected Output:**
```
Factorial of 5 is: 120
5! = 1 x 2 x 3 x 4 x 5 = 120
```

### Task 10: Nested Loops - Rectangle Pattern
Create a file named `RectanglePattern.java` that prints a rectangle using nested loops.

**Example code:**
```java
public class RectanglePattern {
    public static void main(String[] args) {
        int rows = 5;
        int cols = 8;

        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

**Expected Output:**
```
* * * * * * * *
* * * * * * * *
* * * * * * * *
* * * * * * * *
* * * * * * * *
```

### Task 11: Nested Loops - Pyramid Pattern
Create a file named `PyramidPattern.java` that prints a pyramid pattern.

**Example code:**
```java
public class PyramidPattern {
    public static void main(String[] args) {
        int rows = 5;

        for (int i = 1; i <= rows; i++) {
            // Print spaces
            for (int j = 1; j <= rows - i; j++) {
                System.out.print(" ");
            }
            // Print stars
            for (int k = 1; k <= 2 * i - 1; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
```

**Expected Output:**
```
    *
   ***
  *****
 *******
*********
```

### Task 12: Number Guessing Game
Create a file named `NumberGuessing.java` that simulates a number guessing game.

**Example code:**
```java
public class NumberGuessing {
    public static void main(String[] args) {
        int secretNumber = 7;
        int[] guesses = {3, 5, 7, 9};  // Simulated guesses

        System.out.println("Guessing the number between 1 and 10...");

        for (int i = 0; i < guesses.length; i++) {
            int guess = guesses[i];
            System.out.println("Guess " + (i + 1) + ": " + guess);

            if (guess == secretNumber) {
                System.out.println("Correct! You found it in " + (i + 1) + " tries!");
                break;
            } else if (guess < secretNumber) {
                System.out.println("Too low!");
            } else {
                System.out.println("Too high!");
            }
        }
    }
}
```

**Expected Output:**
```
Guessing the number between 1 and 10...
Guess 1: 3
Too low!
Guess 2: 5
Too low!
Guess 3: 7
Correct! You found it in 3 tries!
```

## Tips and Common Mistakes

### Tips:
- **Choose the right loop**:
  - For loop: When you know the number of iterations
  - While loop: When the number of iterations is unknown
  - Do-while: When you need at least one execution
- **Avoid infinite loops**: Make sure your condition eventually becomes false
- **Use meaningful loop variables**: `i`, `j`, `k` for simple counters; descriptive names for others
- **Be careful with loop boundaries**: Off-by-one errors are common
- **Use enhanced for loop** for iterating through arrays when you don't need the index

### Common Mistakes:

1. **Infinite loops**
   ```java
   // ❌ Infinite loop - count never changes
   int count = 0;
   while (count < 5) {
       System.out.println(count);
       // Missing: count++;
   }

   // ✅ Correct
   while (count < 5) {
       System.out.println(count);
       count++;
   }
   ```

2. **Off-by-one errors**
   ```java
   // ❌ Prints 0-4 instead of 1-5
   for (int i = 0; i < 5; i++) {
       System.out.println(i);
   }

   // ✅ Prints 1-5
   for (int i = 1; i <= 5; i++) {
       System.out.println(i);
   }
   ```

3. **Modifying loop variable incorrectly**
   ```java
   // ❌ May cause unexpected behavior
   for (int i = 0; i < 10; i++) {
       System.out.println(i);
       i++;  // Incrementing twice!
   }

   // ✅ Let the loop handle incrementing
   for (int i = 0; i < 10; i++) {
       System.out.println(i);
   }
   ```

4. **Semicolon after for/while**
   ```java
   // ❌ Empty loop body due to semicolon
   for (int i = 0; i < 5; i++);
   {
       System.out.println(i);  // This is not in the loop!
   }

   // ✅ Correct
   for (int i = 0; i < 5; i++) {
       System.out.println(i);
   }
   ```

5. **Confusing break and continue**
   ```java
   // break - exits the loop entirely
   for (int i = 0; i < 10; i++) {
       if (i == 5) break;  // Stops at 5
   }

   // continue - skips current iteration, continues loop
   for (int i = 0; i < 10; i++) {
       if (i == 5) continue;  // Skips 5, continues with 6
   }
   ```

6. **Nested loop confusion**
   ```java
   // ❌ Wrong - break only exits inner loop
   for (int i = 0; i < 3; i++) {
       for (int j = 0; j < 3; j++) {
           if (j == 1) break;  // Only exits inner loop
       }
   }

   // ✅ Use a flag to exit both loops
   boolean exit = false;
   for (int i = 0; i < 3 && !exit; i++) {
       for (int j = 0; j < 3; j++) {
           if (j == 1) {
               exit = true;
               break;
           }
       }
   }
   ```

## Next Steps

Congratulations! You've completed the Basics section. Now move on to `02-Intermediate/01-Arrays` to learn about working with collections of data!

**Challenge**: Create a program that prints the Fibonacci sequence up to the 15th number using a loop. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the previous two numbers (0, 1, 1, 2, 3, 5, 8, 13, ...).

**Bonus Challenge**: Create a program that prints all prime numbers between 1 and 100 using nested loops and the break/continue statements.
