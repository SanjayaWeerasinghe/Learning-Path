# Operators in Java

## What You'll Learn
- Arithmetic operators (+, -, *, /, %)
- Assignment operators (=, +=, -=, etc.)
- Comparison operators (==, !=, <, >, <=, >=)
- Logical operators (&&, ||, !)
- Increment and decrement operators (++, --)
- Operator precedence

## Concept Overview

Operators are special symbols that perform operations on variables and values.

### 1. Arithmetic Operators

```java
int a = 10, b = 3;

System.out.println(a + b);  // Addition: 13
System.out.println(a - b);  // Subtraction: 7
System.out.println(a * b);  // Multiplication: 30
System.out.println(a / b);  // Division: 3 (integer division)
System.out.println(a % b);  // Modulus (remainder): 1

double x = 10.0, y = 3.0;
System.out.println(x / y);  // Division: 3.333...
```

### 2. Assignment Operators

```java
int num = 10;    // Basic assignment

num += 5;   // Same as: num = num + 5;  (15)
num -= 3;   // Same as: num = num - 3;  (12)
num *= 2;   // Same as: num = num * 2;  (24)
num /= 4;   // Same as: num = num / 4;  (6)
num %= 4;   // Same as: num = num % 4;  (2)
```

### 3. Comparison Operators

```java
int a = 10, b = 20;

System.out.println(a == b);  // Equal to: false
System.out.println(a != b);  // Not equal to: true
System.out.println(a > b);   // Greater than: false
System.out.println(a < b);   // Less than: true
System.out.println(a >= b);  // Greater than or equal: false
System.out.println(a <= b);  // Less than or equal: true
```

### 4. Logical Operators

```java
boolean x = true, y = false;

System.out.println(x && y);  // AND: false (both must be true)
System.out.println(x || y);  // OR: true (at least one must be true)
System.out.println(!x);      // NOT: false (inverts the value)

// Practical example
int age = 25;
boolean hasLicense = true;
boolean canDrive = (age >= 18) && hasLicense;  // true
```

### 5. Increment and Decrement

```java
int count = 5;

// Post-increment (use then increment)
System.out.println(count++);  // Prints 5, then becomes 6
System.out.println(count);    // Prints 6

// Pre-increment (increment then use)
count = 5;
System.out.println(++count);  // Becomes 6, then prints 6

// Same for decrement
System.out.println(count--);  // Prints 6, then becomes 5
System.out.println(--count);  // Becomes 4, then prints 4
```

### 6. Operator Precedence

```java
int result = 10 + 5 * 2;  // 20 (multiplication before addition)
int result2 = (10 + 5) * 2;  // 30 (parentheses first)

// Order: (), ++/--, */%,  +/-, <>/<=/>=/==, &&, ||, =
```

## Your Tasks

### Task 1: Basic Arithmetic
Create a file named `Arithmetic.java` that performs all arithmetic operations on two numbers.

**Example code:**
```java
public class Arithmetic {
    public static void main(String[] args) {
        int a = 25;
        int b = 4;

        System.out.println("a = " + a);
        System.out.println("b = " + b);
        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));
    }
}
```

**Expected Output:**
```
a = 25
b = 4
a + b = 29
a - b = 21
a * b = 100
a / b = 6
a % b = 1
```

### Task 2: Temperature Converter
Create a file named `TempConverter.java` that converts Celsius to Fahrenheit.

**Formula:** F = (C × 9/5) + 32

**Example code:**
```java
public class TempConverter {
    public static void main(String[] args) {
        double celsius = 25.0;
        double fahrenheit = (celsius * 9.0 / 5.0) + 32.0;

        System.out.println(celsius + "°C = " + fahrenheit + "°F");
    }
}
```

**Expected Output:**
```
25.0°C = 77.0°F
```

### Task 3: Assignment Operators
Create a file named `AssignmentOps.java` demonstrating compound assignment operators.

**Example code:**
```java
public class AssignmentOps {
    public static void main(String[] args) {
        int num = 10;
        System.out.println("Initial value: " + num);

        num += 5;
        System.out.println("After += 5: " + num);

        num -= 3;
        System.out.println("After -= 3: " + num);

        num *= 2;
        System.out.println("After *= 2: " + num);

        num /= 4;
        System.out.println("After /= 4: " + num);

        num %= 5;
        System.out.println("After %= 5: " + num);
    }
}
```

**Expected Output:**
```
Initial value: 10
After += 5: 15
After -= 3: 12
After *= 2: 24
After /= 4: 6
After %= 5: 1
```

### Task 4: Comparison Demo
Create a file named `Comparison.java` that compares two numbers using all comparison operators.

**Example code:**
```java
public class Comparison {
    public static void main(String[] args) {
        int a = 15;
        int b = 20;

        System.out.println("a = " + a + ", b = " + b);
        System.out.println("a == b: " + (a == b));
        System.out.println("a != b: " + (a != b));
        System.out.println("a > b: " + (a > b));
        System.out.println("a < b: " + (a < b));
        System.out.println("a >= b: " + (a >= b));
        System.out.println("a <= b: " + (a <= b));
    }
}
```

**Expected Output:**
```
a = 15, b = 20
a == b: false
a != b: true
a > b: false
a < b: true
a >= b: false
a <= b: true
```

### Task 5: Logical Operators
Create a file named `LogicalOps.java` demonstrating logical operators.

**Example code:**
```java
public class LogicalOps {
    public static void main(String[] args) {
        boolean x = true;
        boolean y = false;

        System.out.println("x = " + x + ", y = " + y);
        System.out.println("x && y: " + (x && y));
        System.out.println("x || y: " + (x || y));
        System.out.println("!x: " + (!x));
        System.out.println("!y: " + (!y));

        // Practical example
        int age = 20;
        boolean hasID = true;
        boolean canEnter = (age >= 18) && hasID;
        System.out.println("\nCan enter (age >= 18 and has ID): " + canEnter);
    }
}
```

**Expected Output:**
```
x = true, y = false
x && y: false
x || y: true
!x: false
!y: true

Can enter (age >= 18 and has ID): true
```

### Task 6: Increment and Decrement
Create a file named `IncrementDecrement.java` showing the difference between pre and post increment/decrement.

**Example code:**
```java
public class IncrementDecrement {
    public static void main(String[] args) {
        int count = 5;
        System.out.println("Initial count: " + count);

        System.out.println("Post-increment (count++): " + (count++));
        System.out.println("After post-increment: " + count);

        count = 5;
        System.out.println("\nReset to: " + count);
        System.out.println("Pre-increment (++count): " + (++count));
        System.out.println("After pre-increment: " + count);

        count = 5;
        System.out.println("\nReset to: " + count);
        System.out.println("Post-decrement (count--): " + (count--));
        System.out.println("After post-decrement: " + count);

        count = 5;
        System.out.println("\nReset to: " + count);
        System.out.println("Pre-decrement (--count): " + (--count));
        System.out.println("After pre-decrement: " + count);
    }
}
```

**Expected Output:**
```
Initial count: 5
Post-increment (count++): 5
After post-increment: 6

Reset to: 5
Pre-increment (++count): 6
After pre-increment: 6

Reset to: 5
Post-decrement (count--): 5
After post-decrement: 4

Reset to: 5
Pre-decrement (--count): 4
After pre-decrement: 4
```

### Task 7: Calculator
Create a file named `SimpleCalculator.java` that performs all operations on two numbers input in the code.

**Expected Output:**
```
Number 1: 20
Number 2: 5
Addition: 25
Subtraction: 15
Multiplication: 100
Division: 4
Remainder: 0
```

### Task 8: Even or Odd Check
Create a file named `EvenOdd.java` that uses the modulus operator to check if a number is even or odd.

**Example code:**
```java
public class EvenOdd {
    public static void main(String[] args) {
        int num1 = 10;
        int num2 = 15;

        System.out.println(num1 + " % 2 = " + (num1 % 2));
        System.out.println("Is " + num1 + " even? " + (num1 % 2 == 0));

        System.out.println(num2 + " % 2 = " + (num2 % 2));
        System.out.println("Is " + num2 + " even? " + (num2 % 2 == 0));
    }
}
```

**Expected Output:**
```
10 % 2 = 0
Is 10 even? true
15 % 2 = 1
Is 15 even? false
```

### Task 9: Operator Precedence
Create a file named `Precedence.java` demonstrating operator precedence.

**Example code:**
```java
public class Precedence {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2;
        int result2 = (10 + 5) * 2;
        int result3 = 10 + 5 * 2 - 3;
        int result4 = ((10 + 5) * 2) - 3;

        System.out.println("10 + 5 * 2 = " + result1);
        System.out.println("(10 + 5) * 2 = " + result2);
        System.out.println("10 + 5 * 2 - 3 = " + result3);
        System.out.println("((10 + 5) * 2) - 3 = " + result4);

        // Complex example
        int x = 5;
        int y = 3;
        boolean result5 = x > 3 && y < 5 || x == 5;
        System.out.println("x > 3 && y < 5 || x == 5: " + result5);
    }
}
```

**Expected Output:**
```
10 + 5 * 2 = 20
(10 + 5) * 2 = 30
10 + 5 * 2 - 3 = 17
((10 + 5) * 2) - 3 = 27
x > 3 && y < 5 || x == 5: true
```

### Task 10: Area and Perimeter Calculator
Create a file named `RectangleCalc.java` that calculates area and perimeter of a rectangle.

**Formulas:**
- Area = length × width
- Perimeter = 2 × (length + width)

**Example code:**
```java
public class RectangleCalc {
    public static void main(String[] args) {
        double length = 10.5;
        double width = 5.5;

        double area = length * width;
        double perimeter = 2 * (length + width);

        System.out.println("Rectangle dimensions:");
        System.out.println("Length: " + length);
        System.out.println("Width: " + width);
        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);
    }
}
```

**Expected Output:**
```
Rectangle dimensions:
Length: 10.5
Width: 5.5
Area: 57.75
Perimeter: 32.0
```

### Task 11: Swap Two Numbers
Create a file named `SwapNumbers.java` that swaps two numbers using a temporary variable.

**Example code:**
```java
public class SwapNumbers {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        System.out.println("Before swap:");
        System.out.println("a = " + a + ", b = " + b);

        // Swap using temporary variable
        int temp = a;
        a = b;
        b = temp;

        System.out.println("After swap:");
        System.out.println("a = " + a + ", b = " + b);
    }
}
```

**Expected Output:**
```
Before swap:
a = 10, b = 20
After swap:
a = 20, b = 10
```

### Task 12: Age Eligibility Checker
Create a file named `Eligibility.java` that uses logical operators to check multiple conditions.

**Example code:**
```java
public class Eligibility {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;
        boolean hasInsurance = true;

        boolean canDrive = (age >= 18) && hasLicense;
        boolean canRentCar = (age >= 21) && hasLicense && hasInsurance;

        System.out.println("Age: " + age);
        System.out.println("Has License: " + hasLicense);
        System.out.println("Has Insurance: " + hasInsurance);
        System.out.println("\nCan drive: " + canDrive);
        System.out.println("Can rent car: " + canRentCar);
    }
}
```

**Expected Output:**
```
Age: 20
Has License: true
Has Insurance: true

Can drive: true
Can rent car: false
```

## Tips and Common Mistakes

### Tips:
- **Use parentheses** for clarity, even when not required
- **Be careful with integer division**: 5/2 = 2 (not 2.5)
- **Use modulus (%)** to find remainders and check divisibility
- **Compound assignments** (+=, -=) are shorter and cleaner
- **Logical short-circuiting**: `&&` and `||` don't evaluate second operand if not needed

### Common Mistakes:

1. **Integer division confusion**
   ```java
   int result = 5 / 2;     // ❌ Result is 2 (integer division)
   double result = 5 / 2;  // ❌ Still 2.0 (integers divided first)
   double result = 5.0 / 2;  // ✅ Result is 2.5
   ```

2. **Assignment vs. Comparison**
   ```java
   if (x = 5) { }   // ❌ Assignment, not comparison
   if (x == 5) { }  // ✅ Comparison
   ```

3. **Increment/Decrement confusion**
   ```java
   int x = 5;
   int y = x++;  // y = 5, x = 6 (post-increment)
   int y = ++x;  // y = 6, x = 6 (pre-increment)
   ```

4. **Modulus with negative numbers**
   ```java
   System.out.println(-5 % 3);  // -2 (not 1)
   System.out.println(5 % -3);  // 2
   ```

5. **Floating-point precision**
   ```java
   double result = 0.1 + 0.2;  // 0.30000000000000004 (not exactly 0.3)
   // Use BigDecimal for precise decimal arithmetic
   ```

6. **Logical operator confusion**
   ```java
   if (x > 5 && < 10) { }        // ❌ Invalid syntax
   if (x > 5 && x < 10) { }      // ✅ Correct
   ```

## Next Steps

Once you complete these tasks, move on to `04-Conditionals` to learn how to make decisions in your programs!

**Challenge**: Create a program that calculates the compound interest using the formula: A = P(1 + r/n)^(nt), where P is principal, r is rate, n is number of times interest is compounded per year, and t is time in years. Use appropriate operators and data types.
