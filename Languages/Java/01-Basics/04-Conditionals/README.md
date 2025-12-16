# Conditionals - Making Decisions

## What You'll Learn
- Using if statements to make decisions
- Understanding if-else statements
- Working with else-if chains
- Nested conditionals
- Ternary operator
- Switch statements

## Concept Overview

Conditionals allow your program to make decisions and execute different code based on conditions.

### 1. Basic if Statement

```java
int age = 18;

if (age >= 18) {
    System.out.println("You are an adult");
}
```

### 2. if-else Statement

```java
int age = 15;

if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}
```

### 3. else-if Chain

```java
int score = 85;

if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else if (score >= 60) {
    System.out.println("Grade: D");
} else {
    System.out.println("Grade: F");
}
```

### 4. Nested if Statements

```java
int age = 20;
boolean hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        System.out.println("You can drive");
    } else {
        System.out.println("You need a license");
    }
} else {
    System.out.println("You are too young to drive");
}
```

### 5. Ternary Operator

```java
int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";
System.out.println(status);  // Adult

// Equivalent to:
// if (age >= 18) {
//     status = "Adult";
// } else {
//     status = "Minor";
// }
```

### 6. Switch Statement

```java
int day = 3;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Other day");
}
```

### 7. Switch with String (Java 7+)

```java
String color = "red";

switch (color) {
    case "red":
        System.out.println("Stop");
        break;
    case "yellow":
        System.out.println("Slow down");
        break;
    case "green":
        System.out.println("Go");
        break;
    default:
        System.out.println("Invalid color");
}
```

## Your Tasks

### Task 1: Voting Eligibility
Create a file named `VotingAge.java` that checks if a person can vote (age >= 18).

**Example code:**
```java
public class VotingAge {
    public static void main(String[] args) {
        int age = 20;

        if (age >= 18) {
            System.out.println("You are eligible to vote");
        } else {
            System.out.println("You are not eligible to vote");
        }
    }
}
```

**Expected Output:**
```
You are eligible to vote
```

### Task 2: Positive, Negative, or Zero
Create a file named `NumberCheck.java` that checks if a number is positive, negative, or zero.

**Example code:**
```java
public class NumberCheck {
    public static void main(String[] args) {
        int number = -5;

        if (number > 0) {
            System.out.println(number + " is positive");
        } else if (number < 0) {
            System.out.println(number + " is negative");
        } else {
            System.out.println(number + " is zero");
        }
    }
}
```

**Expected Output:**
```
-5 is negative
```

### Task 3: Grade Calculator
Create a file named `GradeCalculator.java` that converts a numeric score to a letter grade.

**Grading scale:**
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: Below 60

**Example code:**
```java
public class GradeCalculator {
    public static void main(String[] args) {
        int score = 85;

        System.out.println("Score: " + score);

        if (score >= 90 && score <= 100) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else if (score >= 60) {
            System.out.println("Grade: D");
        } else if (score >= 0) {
            System.out.println("Grade: F");
        } else {
            System.out.println("Invalid score");
        }
    }
}
```

**Expected Output:**
```
Score: 85
Grade: B
```

### Task 4: Even or Odd
Create a file named `EvenOddChecker.java` that determines if a number is even or odd.

**Example code:**
```java
public class EvenOddChecker {
    public static void main(String[] args) {
        int number = 17;

        if (number % 2 == 0) {
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }
    }
}
```

**Expected Output:**
```
17 is odd
```

### Task 5: Leap Year Checker
Create a file named `LeapYear.java` that checks if a year is a leap year.

**Rules:**
- Divisible by 4 AND (not divisible by 100 OR divisible by 400)

**Example code:**
```java
public class LeapYear {
    public static void main(String[] args) {
        int year = 2024;

        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
            System.out.println(year + " is a leap year");
        } else {
            System.out.println(year + " is not a leap year");
        }
    }
}
```

**Expected Output:**
```
2024 is a leap year
```

### Task 6: Largest of Three Numbers
Create a file named `LargestNumber.java` that finds the largest of three numbers.

**Example code:**
```java
public class LargestNumber {
    public static void main(String[] args) {
        int a = 15, b = 27, c = 19;

        System.out.println("Numbers: " + a + ", " + b + ", " + c);

        if (a >= b && a >= c) {
            System.out.println("Largest: " + a);
        } else if (b >= a && b >= c) {
            System.out.println("Largest: " + b);
        } else {
            System.out.println("Largest: " + c);
        }
    }
}
```

**Expected Output:**
```
Numbers: 15, 27, 19
Largest: 27
```

### Task 7: Nested if - Driving Eligibility
Create a file named `DrivingEligibility.java` using nested if statements.

**Example code:**
```java
public class DrivingEligibility {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;
        boolean hasInsurance = false;

        if (age >= 18) {
            if (hasLicense) {
                if (hasInsurance) {
                    System.out.println("You can drive legally");
                } else {
                    System.out.println("You need insurance to drive");
                }
            } else {
                System.out.println("You need a license");
            }
        } else {
            System.out.println("You must be 18 or older");
        }
    }
}
```

**Expected Output:**
```
You need insurance to drive
```

### Task 8: Ternary Operator
Create a file named `TernaryDemo.java` demonstrating the ternary operator.

**Example code:**
```java
public class TernaryDemo {
    public static void main(String[] args) {
        int age = 20;
        String status = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Status: " + status);

        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println("Maximum: " + max);

        int score = 85;
        String result = (score >= 60) ? "Pass" : "Fail";
        System.out.println("Result: " + result);

        // Nested ternary (not recommended for readability)
        String grade = (score >= 90) ? "A" : (score >= 80) ? "B" : "C";
        System.out.println("Grade: " + grade);
    }
}
```

**Expected Output:**
```
Status: Adult
Maximum: 20
Result: Pass
Grade: B
```

### Task 9: Switch Statement - Day of Week
Create a file named `DayOfWeek.java` using a switch statement.

**Example code:**
```java
public class DayOfWeek {
    public static void main(String[] args) {
        int day = 3;

        System.out.print("Day " + day + " is: ");

        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}
```

**Expected Output:**
```
Day 3 is: Wednesday
```

### Task 10: Switch with String - Menu System
Create a file named `MenuSystem.java` using switch with strings.

**Example code:**
```java
public class MenuSystem {
    public static void main(String[] args) {
        String choice = "add";

        System.out.println("Selected operation: " + choice);

        switch (choice) {
            case "add":
                System.out.println("Performing addition");
                break;
            case "subtract":
                System.out.println("Performing subtraction");
                break;
            case "multiply":
                System.out.println("Performing multiplication");
                break;
            case "divide":
                System.out.println("Performing division");
                break;
            default:
                System.out.println("Invalid operation");
        }
    }
}
```

**Expected Output:**
```
Selected operation: add
Performing addition
```

### Task 11: Multiple Conditions - Admission System
Create a file named `AdmissionSystem.java` checking multiple criteria.

**Example code:**
```java
public class AdmissionSystem {
    public static void main(String[] args) {
        int mathScore = 85;
        int scienceScore = 78;
        int englishScore = 90;
        int totalScore = mathScore + scienceScore + englishScore;
        double average = totalScore / 3.0;

        System.out.println("Math: " + mathScore);
        System.out.println("Science: " + scienceScore);
        System.out.println("English: " + englishScore);
        System.out.println("Average: " + average);

        if (average >= 80 && mathScore >= 70 && scienceScore >= 70) {
            System.out.println("Admission Status: ACCEPTED");
        } else if (average >= 70) {
            System.out.println("Admission Status: WAITLISTED");
        } else {
            System.out.println("Admission Status: REJECTED");
        }
    }
}
```

**Expected Output:**
```
Math: 85
Science: 78
English: 90
Average: 84.33333333333333
Admission Status: ACCEPTED
```

### Task 12: Calculator with Switch
Create a file named `SwitchCalculator.java` that performs calculations based on an operator.

**Example code:**
```java
public class SwitchCalculator {
    public static void main(String[] args) {
        double num1 = 10;
        double num2 = 5;
        char operator = '+';

        System.out.println("num1 = " + num1);
        System.out.println("num2 = " + num2);
        System.out.println("operator = " + operator);

        double result;

        switch (operator) {
            case '+':
                result = num1 + num2;
                System.out.println("Result: " + result);
                break;
            case '-':
                result = num1 - num2;
                System.out.println("Result: " + result);
                break;
            case '*':
                result = num1 * num2;
                System.out.println("Result: " + result);
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                    System.out.println("Result: " + result);
                } else {
                    System.out.println("Error: Division by zero");
                }
                break;
            default:
                System.out.println("Invalid operator");
        }
    }
}
```

**Expected Output:**
```
num1 = 10.0
num2 = 5.0
operator = +
Result: 15.0
```

## Tips and Common Mistakes

### Tips:
- **Use meaningful conditions**: Make your conditions clear and readable
- **Avoid deep nesting**: More than 3 levels becomes hard to read
- **Use else-if for mutually exclusive conditions**: More efficient than multiple ifs
- **Break in switch**: Don't forget break statements in switch cases
- **Ternary for simple conditions**: Use for simple assignments, not complex logic

### Common Mistakes:

1. **Missing curly braces**
   ```java
   if (x > 5)
       System.out.println("Greater");
       System.out.println("Than 5");  // ❌ Always executes!

   if (x > 5) {
       System.out.println("Greater");
       System.out.println("Than 5");  // ✅ Both in if block
   }
   ```

2. **Assignment instead of comparison**
   ```java
   if (x = 5) { }   // ❌ Assignment (won't compile)
   if (x == 5) { }  // ✅ Comparison
   ```

3. **Missing break in switch**
   ```java
   switch (day) {
       case 1:
           System.out.println("Monday");
           // ❌ Missing break - falls through to case 2!
       case 2:
           System.out.println("Tuesday");
           break;  // ✅ Correct
   }
   ```

4. **Floating-point comparison**
   ```java
   double x = 0.1 + 0.2;
   if (x == 0.3) { }  // ❌ May not work due to precision
   if (Math.abs(x - 0.3) < 0.0001) { }  // ✅ Better approach
   ```

5. **Logical operator confusion**
   ```java
   if (age >= 18 && age <= 65) { }  // ✅ Correct
   if (age >= 18 || age <= 65) { }  // ❌ Always true!
   ```

6. **Unreachable code**
   ```java
   if (x > 5) {
       return;
       System.out.println("Test");  // ❌ Unreachable
   }
   ```

7. **String comparison**
   ```java
   String s = "hello";
   if (s == "hello") { }      // ❌ Compares references
   if (s.equals("hello")) { } // ✅ Compares content
   ```

## Next Steps

Once you complete these tasks, move on to `05-Loops` to learn how to repeat code efficiently!

**Challenge**: Create a comprehensive program that acts as a simple banking system. It should check account balance, age for different account types (savings, checking, investment), and display appropriate messages based on multiple conditions. Use nested if statements, switch statements, and the ternary operator where appropriate.
