# Methods - Reusable Code Blocks

## What You'll Learn
- Understanding what methods are and why they're useful
- Creating and calling methods
- Method parameters and return types
- Method overloading
- Variable scope in methods
- Static vs instance methods

## Concept Overview

Methods are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.

### 1. Basic Method Structure

```java
// Method syntax
returnType methodName(parameters) {
    // method body
    return value;  // if not void
}

// Example
public static int add(int a, int b) {
    return a + b;
}
```

### 2. Method with No Return Value (void)

```java
public static void greet(String name) {
    System.out.println("Hello, " + name + "!");
}

// Calling the method
greet("John");  // Output: Hello, John!
```

### 3. Method with Return Value

```java
public static int multiply(int a, int b) {
    return a * b;
}

// Calling and using return value
int result = multiply(5, 3);
System.out.println(result);  // 15
```

### 4. Method with Multiple Parameters

```java
public static double calculateArea(double length, double width) {
    return length * width;
}

double area = calculateArea(10.5, 5.5);
```

### 5. Method with No Parameters

```java
public static void displayMenu() {
    System.out.println("1. Add");
    System.out.println("2. Subtract");
    System.out.println("3. Exit");
}

displayMenu();
```

### 6. Method Overloading

```java
// Same method name, different parameters
public static int add(int a, int b) {
    return a + b;
}

public static double add(double a, double b) {
    return a + b;
}

public static int add(int a, int b, int c) {
    return a + b + c;
}
```

## Your Tasks

### Task 1: Basic Method
Create a file named `BasicMethod.java` with a simple greeting method.

**Example code:**
```java
public class BasicMethod {
    public static void greet() {
        System.out.println("Hello, World!");
    }

    public static void main(String[] args) {
        greet();
        greet();
        greet();
    }
}
```

**Expected Output:**
```
Hello, World!
Hello, World!
Hello, World!
```

### Task 2: Method with Parameters
Create a file named `MethodParameters.java` with a method that takes parameters.

**Example code:**
```java
public class MethodParameters {
    public static void greetPerson(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static void main(String[] args) {
        greetPerson("Alice");
        greetPerson("Bob");
        greetPerson("Charlie");
    }
}
```

**Expected Output:**
```
Hello, Alice!
Hello, Bob!
Hello, Charlie!
```

### Task 3: Method with Return Value
Create a file named `ReturnValue.java` with methods that return values.

**Example code:**
```java
public class ReturnValue {
    public static int add(int a, int b) {
        return a + b;
    }

    public static int multiply(int a, int b) {
        return a * b;
    }

    public static void main(String[] args) {
        int sum = add(10, 5);
        int product = multiply(10, 5);

        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);
    }
}
```

**Expected Output:**
```
Sum: 15
Product: 50
```

### Task 4: Calculator Methods
Create a file named `Calculator.java` with basic calculator methods.

**Example code:**
```java
public class Calculator {
    public static double add(double a, double b) {
        return a + b;
    }

    public static double subtract(double a, double b) {
        return a - b;
    }

    public static double multiply(double a, double b) {
        return a * b;
    }

    public static double divide(double a, double b) {
        if (b != 0) {
            return a / b;
        } else {
            System.out.println("Error: Division by zero");
            return 0;
        }
    }

    public static void main(String[] args) {
        double x = 20, y = 5;

        System.out.println("x = " + x + ", y = " + y);
        System.out.println("Addition: " + add(x, y));
        System.out.println("Subtraction: " + subtract(x, y));
        System.out.println("Multiplication: " + multiply(x, y));
        System.out.println("Division: " + divide(x, y));
    }
}
```

**Expected Output:**
```
x = 20.0, y = 5.0
Addition: 25.0
Subtraction: 15.0
Multiplication: 100.0
Division: 4.0
```

### Task 5: Even or Odd Method
Create a file named `EvenOddMethod.java` with a method to check if a number is even.

**Example code:**
```java
public class EvenOddMethod {
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }

    public static void main(String[] args) {
        int[] numbers = {10, 15, 22, 7, 30};

        for (int num : numbers) {
            if (isEven(num)) {
                System.out.println(num + " is even");
            } else {
                System.out.println(num + " is odd");
            }
        }
    }
}
```

**Expected Output:**
```
10 is even
15 is odd
22 is even
7 is odd
30 is even
```

### Task 6: Array Operations
Create a file named `ArrayOperations.java` with methods for array operations.

**Example code:**
```java
public class ArrayOperations {
    public static int findMax(int[] arr) {
        int max = arr[0];
        for (int num : arr) {
            if (num > max) {
                max = num;
            }
        }
        return max;
    }

    public static int findMin(int[] arr) {
        int min = arr[0];
        for (int num : arr) {
            if (num < min) {
                min = num;
            }
        }
        return min;
    }

    public static double calculateAverage(int[] arr) {
        int sum = 0;
        for (int num : arr) {
            sum += num;
        }
        return (double) sum / arr.length;
    }

    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34};

        System.out.println("Maximum: " + findMax(numbers));
        System.out.println("Minimum: " + findMin(numbers));
        System.out.println("Average: " + calculateAverage(numbers));
    }
}
```

**Expected Output:**
```
Maximum: 89
Minimum: 12
Average: 45.0
```

### Task 7: Method Overloading
Create a file named `MethodOverloading.java` demonstrating method overloading.

**Example code:**
```java
public class MethodOverloading {
    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static String add(String a, String b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("add(5, 3) = " + add(5, 3));
        System.out.println("add(5.5, 3.2) = " + add(5.5, 3.2));
        System.out.println("add(5, 3, 2) = " + add(5, 3, 2));
        System.out.println("add(\"Hello\", \"World\") = " + add("Hello", "World"));
    }
}
```

**Expected Output:**
```
add(5, 3) = 8
add(5.5, 3.2) = 8.7
add(5, 3, 2) = 10
add("Hello", "World") = HelloWorld
```

### Task 8: Temperature Conversion
Create a file named `TemperatureConverter.java` with conversion methods.

**Example code:**
```java
public class TemperatureConverter {
    public static double celsiusToFahrenheit(double celsius) {
        return (celsius * 9 / 5) + 32;
    }

    public static double fahrenheitToCelsius(double fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }

    public static void main(String[] args) {
        double tempC = 25.0;
        double tempF = 77.0;

        System.out.println(tempC + "°C = " + celsiusToFahrenheit(tempC) + "°F");
        System.out.println(tempF + "°F = " + fahrenheitToCelsius(tempF) + "°C");
    }
}
```

**Expected Output:**
```
25.0°C = 77.0°F
77.0°F = 25.0°C
```

### Task 9: Factorial Method
Create a file named `FactorialMethod.java` with a factorial calculation method.

**Example code:**
```java
public class FactorialMethod {
    public static long factorial(int n) {
        long result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        int[] numbers = {5, 7, 10};

        for (int num : numbers) {
            System.out.println(num + "! = " + factorial(num));
        }
    }
}
```

**Expected Output:**
```
5! = 120
7! = 5040
10! = 3628800
```

### Task 10: String Utilities
Create a file named `StringUtils.java` with string utility methods.

**Example code:**
```java
public class StringUtils {
    public static int countVowels(String str) {
        int count = 0;
        str = str.toLowerCase();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                count++;
            }
        }
        return count;
    }

    public static String reverse(String str) {
        String reversed = "";
        for (int i = str.length() - 1; i >= 0; i--) {
            reversed += str.charAt(i);
        }
        return reversed;
    }

    public static boolean isPalindrome(String str) {
        String reversed = reverse(str);
        return str.equalsIgnoreCase(reversed);
    }

    public static void main(String[] args) {
        String word = "Hello";
        System.out.println("Word: " + word);
        System.out.println("Vowels: " + countVowels(word));
        System.out.println("Reversed: " + reverse(word));
        System.out.println("Is palindrome? " + isPalindrome(word));

        System.out.println();
        String palindrome = "radar";
        System.out.println("Word: " + palindrome);
        System.out.println("Is palindrome? " + isPalindrome(palindrome));
    }
}
```

**Expected Output:**
```
Word: Hello
Vowels: 2
Reversed: olleH
Is palindrome? false

Word: radar
Is palindrome? true
```

### Task 11: Prime Number Checker
Create a file named `PrimeChecker.java` with a method to check if a number is prime.

**Example code:**
```java
public class PrimeChecker {
    public static boolean isPrime(int number) {
        if (number <= 1) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void displayPrimes(int limit) {
        System.out.println("Prime numbers up to " + limit + ":");
        for (int i = 2; i <= limit; i++) {
            if (isPrime(i)) {
                System.out.print(i + " ");
            }
        }
        System.out.println();
    }

    public static void main(String[] args) {
        displayPrimes(50);

        System.out.println();
        int[] testNumbers = {17, 20, 23, 30};
        for (int num : testNumbers) {
            System.out.println(num + " is prime? " + isPrime(num));
        }
    }
}
```

**Expected Output:**
```
Prime numbers up to 50:
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47

17 is prime? true
20 is prime? false
23 is prime? true
30 is prime? false
```

### Task 12: Grade Calculator
Create a file named `GradeCalculator.java` with methods to calculate and convert grades.

**Example code:**
```java
public class GradeCalculator {
    public static double calculateAverage(int[] scores) {
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        return (double) sum / scores.length;
    }

    public static char getLetterGrade(double average) {
        if (average >= 90) return 'A';
        else if (average >= 80) return 'B';
        else if (average >= 70) return 'C';
        else if (average >= 60) return 'D';
        else return 'F';
    }

    public static void displayReport(String name, int[] scores) {
        double avg = calculateAverage(scores);
        char grade = getLetterGrade(avg);

        System.out.println("Student: " + name);
        System.out.print("Scores: ");
        for (int score : scores) {
            System.out.print(score + " ");
        }
        System.out.println();
        System.out.println("Average: " + avg);
        System.out.println("Letter Grade: " + grade);
        System.out.println("---");
    }

    public static void main(String[] args) {
        displayReport("Alice", new int[]{85, 92, 88, 95});
        displayReport("Bob", new int[]{75, 68, 72, 70});
        displayReport("Charlie", new int[]{95, 98, 93, 97});
    }
}
```

**Expected Output:**
```
Student: Alice
Scores: 85 92 88 95
Average: 90.0
Letter Grade: A
---
Student: Bob
Scores: 75 68 72 70
Average: 71.25
Letter Grade: C
---
Student: Charlie
Scores: 95 98 93 97
Average: 95.75
Letter Grade: A
---
```

## Tips and Common Mistakes

### Tips:
- **Use meaningful method names**: `calculateTotal()` not `calc()`
- **Keep methods focused**: One method should do one thing
- **Add comments**: Explain what the method does
- **Return early**: If possible, return as soon as you have the result
- **Use parameters**: Avoid relying on global variables

### Common Mistakes:

1. **Missing return statement**
   ```java
   public static int add(int a, int b) {
       int sum = a + b;
       // ❌ Missing return
   }

   public static int add(int a, int b) {
       return a + b;  // ✅ Correct
   }
   ```

2. **Not using return value**
   ```java
   public static int add(int a, int b) {
       return a + b;
   }

   add(5, 3);  // ❌ Return value not used
   int result = add(5, 3);  // ✅ Using return value
   ```

3. **Void method with return value**
   ```java
   public static void greet() {
       return "Hello";  // ❌ Error: void method can't return value
   }

   public static String greet() {
       return "Hello";  // ✅ Correct
   }
   ```

4. **Parameter mismatch**
   ```java
   public static int add(int a, int b) {
       return a + b;
   }

   add(5);  // ❌ Error: missing second parameter
   add(5, 3);  // ✅ Correct
   ```

5. **Variable scope confusion**
   ```java
   public static void test() {
       int x = 5;
   }

   public static void main(String[] args) {
       System.out.println(x);  // ❌ Error: x not accessible
   }
   ```

## Next Steps

Once you complete these tasks, move on to `04-OOP-Classes` to learn about Object-Oriented Programming!

**Challenge**: Create a program with methods to implement a simple banking system with deposit, withdraw, checkBalance, and calculateInterest methods. Include method overloading for different types of transactions.
