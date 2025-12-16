# Variables and Data Types

## What You'll Learn
- How to declare and initialize variables
- Understanding Java's primitive data types
- Type conversion and casting
- Variable naming conventions
- Understanding constants with `final`

## Concept Overview

Variables are containers that store data values. Java is a strongly-typed language, meaning every variable must have a declared type.

### Primitive Data Types

Java has 8 primitive data types:

```java
// Integer types
byte age = 25;           // 8-bit: -128 to 127
short year = 2024;       // 16-bit: -32,768 to 32,767
int population = 1000000; // 32-bit: -2^31 to 2^31-1
long distance = 9876543210L; // 64-bit (note the 'L' suffix)

// Floating-point types
float price = 19.99f;    // 32-bit (note the 'f' suffix)
double pi = 3.14159265359; // 64-bit (more precise)

// Other types
char grade = 'A';        // 16-bit Unicode character
boolean isActive = true; // true or false
```

### Variable Declaration and Initialization

```java
// Declaration
int number;

// Initialization
number = 10;

// Declaration + Initialization
int count = 5;

// Multiple variables of same type
int x = 1, y = 2, z = 3;
```

### Constants

```java
final double PI = 3.14159;
final int MAX_USERS = 100;
// PI = 3.14; // Error: cannot reassign
```

### Type Conversion

```java
// Implicit (automatic) - smaller to larger
int num = 100;
double d = num;  // int to double

// Explicit (casting) - larger to smaller
double price = 19.99;
int roundedPrice = (int) price;  // 19 (truncates decimal)
```

### String (Reference Type)

```java
String name = "John";
String message = "Hello, World!";
String empty = "";
```

## Your Tasks

### Task 1: Declare Different Data Types
Create a file named `DataTypes.java` that declares and prints variables of each primitive type.

**Example code:**
```java
public class DataTypes {
    public static void main(String[] args) {
        byte age = 25;
        short year = 2024;
        int salary = 50000;
        long worldPopulation = 7900000000L;
        float temperature = 98.6f;
        double pi = 3.14159265359;
        char grade = 'A';
        boolean isJavaFun = true;

        System.out.println("Age: " + age);
        System.out.println("Year: " + year);
        System.out.println("Salary: " + salary);
        System.out.println("World Population: " + worldPopulation);
        System.out.println("Temperature: " + temperature);
        System.out.println("Pi: " + pi);
        System.out.println("Grade: " + grade);
        System.out.println("Is Java fun? " + isJavaFun);
    }
}
```

**Expected Output:**
```
Age: 25
Year: 2024
Salary: 50000
World Population: 7900000000
Temperature: 98.6
Pi: 3.14159265359
Grade: A
Is Java fun? true
```

### Task 2: Personal Information
Create a file named `PersonalInfo.java` that stores and displays your personal information.

**Expected Output:**
```
Name: John Doe
Age: 25
Height: 5.9 feet
Grade: A
Is Student: true
```

### Task 3: Mathematical Constants
Create a file named `MathConstants.java` that declares constants for mathematical values.

**Example code:**
```java
public class MathConstants {
    public static void main(String[] args) {
        final double PI = 3.14159;
        final double E = 2.71828;
        final double GOLDEN_RATIO = 1.618;

        System.out.println("Pi: " + PI);
        System.out.println("Euler's number: " + E);
        System.out.println("Golden Ratio: " + GOLDEN_RATIO);
    }
}
```

### Task 4: Type Conversion Demo
Create a file named `TypeConversion.java` demonstrating both implicit and explicit type conversion.

**Example code:**
```java
public class TypeConversion {
    public static void main(String[] args) {
        // Implicit conversion
        int num = 100;
        double d = num;
        System.out.println("int to double: " + d);

        // Explicit conversion (casting)
        double price = 19.99;
        int roundedPrice = (int) price;
        System.out.println("double to int: " + roundedPrice);

        // char to int
        char letter = 'A';
        int asciiValue = (int) letter;
        System.out.println("ASCII value of 'A': " + asciiValue);
    }
}
```

**Expected Output:**
```
int to double: 100.0
double to int: 19
ASCII value of 'A': 65
```

### Task 5: Variable Scope
Create a file named `VariableScope.java` that demonstrates variable scope within the main method.

**Example code:**
```java
public class VariableScope {
    public static void main(String[] args) {
        int outerVar = 10;
        System.out.println("Outer variable: " + outerVar);

        {
            int innerVar = 20;
            System.out.println("Inner variable: " + innerVar);
            System.out.println("Can access outer: " + outerVar);
        }

        // System.out.println(innerVar); // Error: innerVar not accessible
        System.out.println("Outer variable still accessible: " + outerVar);
    }
}
```

### Task 6: String Operations
Create a file named `StringDemo.java` showing basic string operations.

**Example code:**
```java
public class StringDemo {
    public static void main(String[] args) {
        String firstName = "John";
        String lastName = "Doe";
        String fullName = firstName + " " + lastName;

        System.out.println("First Name: " + firstName);
        System.out.println("Last Name: " + lastName);
        System.out.println("Full Name: " + fullName);
        System.out.println("Length: " + fullName.length());
        System.out.println("Uppercase: " + fullName.toUpperCase());
        System.out.println("Lowercase: " + fullName.toLowerCase());
    }
}
```

**Expected Output:**
```
First Name: John
Last Name: Doe
Full Name: John Doe
Length: 8
Uppercase: JOHN DOE
Lowercase: john doe
```

### Task 7: Calculator Variables
Create a file named `Calculator.java` that declares variables for two numbers and displays their basic properties.

**Expected Output:**
```
Number 1: 15
Number 2: 4
Sum will be calculated in next lesson!
```

### Task 8: Character Operations
Create a file named `CharDemo.java` exploring character variables and their ASCII values.

**Example code:**
```java
public class CharDemo {
    public static void main(String[] args) {
        char ch1 = 'A';
        char ch2 = 'B';
        char ch3 = '1';
        char ch4 = '$';

        System.out.println("Character: " + ch1 + ", ASCII: " + (int)ch1);
        System.out.println("Character: " + ch2 + ", ASCII: " + (int)ch2);
        System.out.println("Character: " + ch3 + ", ASCII: " + (int)ch3);
        System.out.println("Character: " + ch4 + ", ASCII: " + (int)ch4);

        // Character arithmetic
        char next = (char)(ch1 + 1);
        System.out.println("Next character after A: " + next);
    }
}
```

**Expected Output:**
```
Character: A, ASCII: 65
Character: B, ASCII: 66
Character: 1, ASCII: 49
Character: $, ASCII: 36
Next character after A: B
```

### Task 9: Boolean Logic
Create a file named `BooleanDemo.java` demonstrating boolean variables.

**Example code:**
```java
public class BooleanDemo {
    public static void main(String[] args) {
        boolean isRaining = false;
        boolean isSunny = true;
        boolean hasUmbrella = true;

        System.out.println("Is it raining? " + isRaining);
        System.out.println("Is it sunny? " + isSunny);
        System.out.println("Do I have an umbrella? " + hasUmbrella);

        // We'll use these in the conditionals lesson!
    }
}
```

### Task 10: Data Type Limits
Create a file named `DataTypeLimits.java` that shows the minimum and maximum values of numeric types.

**Example code:**
```java
public class DataTypeLimits {
    public static void main(String[] args) {
        System.out.println("byte: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("short: " + Short.MIN_VALUE + " to " + Short.MAX_VALUE);
        System.out.println("int: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("long: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
        System.out.println("float: " + Float.MIN_VALUE + " to " + Float.MAX_VALUE);
        System.out.println("double: " + Double.MIN_VALUE + " to " + Double.MAX_VALUE);
    }
}
```

### Task 11: Variable Reassignment
Create a file named `Reassignment.java` showing how variables can be reassigned.

**Example code:**
```java
public class Reassignment {
    public static void main(String[] args) {
        int score = 0;
        System.out.println("Initial score: " + score);

        score = 10;
        System.out.println("After first update: " + score);

        score = score + 5;
        System.out.println("After second update: " + score);

        // Constants cannot be reassigned
        final int MAX_SCORE = 100;
        System.out.println("Maximum score: " + MAX_SCORE);
        // MAX_SCORE = 200; // This would cause an error
    }
}
```

**Expected Output:**
```
Initial score: 0
After first update: 10
After second update: 15
Maximum score: 100
```

### Task 12: Overflow Example
Create a file named `Overflow.java` demonstrating what happens when a value exceeds the data type's limit.

**Example code:**
```java
public class Overflow {
    public static void main(String[] args) {
        byte b = 127;  // Maximum byte value
        System.out.println("Byte value: " + b);

        b = (byte)(b + 1);  // Overflow
        System.out.println("After overflow: " + b);

        // Better practice: use appropriate data type
        short s = 127;
        s = (short)(s + 1);
        System.out.println("Short value (no overflow): " + s);
    }
}
```

**Expected Output:**
```
Byte value: 127
After overflow: -128
Short value (no overflow): 128
```

## Tips and Common Mistakes

### Tips:
- **Use meaningful variable names**: `age` is better than `a`
- **Follow naming conventions**:
  - Variables: camelCase (firstName, totalScore)
  - Constants: UPPER_SNAKE_CASE (MAX_VALUE, PI)
- **Choose the right data type**: Don't use `long` when `int` is sufficient
- **Use `final` for constants**: Values that shouldn't change
- **Initialize before use**: Declare and initialize variables before using them

### Common Mistakes:

1. **Forgetting suffixes for long and float**
   ```java
   long big = 9876543210;   // ❌ Error
   long big = 9876543210L;  // ✅ Correct

   float price = 19.99;     // ❌ Error
   float price = 19.99f;    // ✅ Correct
   ```

2. **Precision loss without casting**
   ```java
   int x = 10;
   int y = 3;
   double result = x / y;   // ❌ Result is 3.0 (integer division)
   double result = (double)x / y;  // ✅ Result is 3.333...
   ```

3. **Using uninitialized variables**
   ```java
   int count;
   System.out.println(count);  // ❌ Error: variable not initialized

   int count = 0;
   System.out.println(count);  // ✅ Correct
   ```

4. **Modifying constants**
   ```java
   final int MAX = 100;
   MAX = 200;  // ❌ Error: cannot assign a value to final variable
   ```

5. **String comparison with ==**
   ```java
   String s1 = "Hello";
   String s2 = "Hello";
   if (s1 == s2) { }  // ❌ Wrong (compares references)
   if (s1.equals(s2)) { }  // ✅ Correct (compares content)
   ```

## Next Steps

Once you complete these tasks, move on to `03-Operators` to learn how to perform operations with your variables!

**Challenge**: Create a program that declares variables for a student's information (name, age, grade, GPA) and prints them in a formatted card layout. Use appropriate data types and include at least one constant.
