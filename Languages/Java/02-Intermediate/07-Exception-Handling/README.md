# Exception Handling - Managing Errors

## What You'll Learn
- Understanding exceptions and errors
- Try-catch blocks
- Multiple catch blocks
- Finally block
- Throwing exceptions
- Creating custom exceptions
- Checked vs unchecked exceptions

## Concept Overview

Exception handling allows you to gracefully handle runtime errors and maintain normal program flow.

### 1. Basic Try-Catch

```java
try {
    int result = 10 / 0;  // ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Error: " + e.getMessage());
}
```

### 2. Multiple Catch Blocks

```java
try {
    int[] arr = new int[5];
    arr[10] = 50;  // ArrayIndexOutOfBoundsException
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index error");
} catch (Exception e) {
    System.out.println("General error");
}
```

### 3. Finally Block

```java
try {
    // Code that may throw exception
} catch (Exception e) {
    // Handle exception
} finally {
    // Always executes (cleanup code)
    System.out.println("Finally block executed");
}
```

### 4. Throwing Exceptions

```java
public static void checkAge(int age) throws IllegalArgumentException {
    if (age < 18) {
        throw new IllegalArgumentException("Age must be 18 or older");
    }
}
```

### 5. Try-with-Resources (Java 7+)

```java
try (Scanner scanner = new Scanner(new File("file.txt"))) {
    // Use scanner
} catch (IOException e) {
    e.printStackTrace();
}
// scanner is automatically closed
```

### 6. Custom Exceptions

```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

// Usage
if (balance < amount) {
    throw new InsufficientFundsException("Not enough funds");
}
```

## Your Tasks

### Task 1: Basic Exception Handling
Create a file named `BasicException.java`.

**Example code:**
```java
public class BasicException {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero");
            System.out.println("Exception: " + e.getMessage());
        }
        System.out.println("Program continues...");
    }
}
```

**Expected Output:**
```
Error: Cannot divide by zero
Exception: / by zero
Program continues...
```

### Task 2-12: Exception Handling Scenarios

Practice with:
- Array index out of bounds
- Null pointer exceptions
- Number format exceptions
- File not found
- Input validation
- Custom exceptions
- Multiple catch blocks
- Finally block usage
- Try-with-resources
- Method throws declaration
- Exception chaining
- Banking withdrawal validation

## Tips and Common Mistakes

### Tips:
- **Catch specific exceptions first**: More specific before general
- **Use finally for cleanup**: Close resources, files, connections
- **Don't catch Exception blindly**: Handle specific exceptions
- **Provide meaningful error messages**: Help debugging
- **Log exceptions**: Use proper logging

### Common Mistakes:

1. **Empty catch block**
   ```java
   try {
       // code
   } catch (Exception e) {
       // ❌ Swallowing exception
   }

   try {
       // code
   } catch (Exception e) {
       e.printStackTrace();  // ✅ At least print it
   }
   ```

2. **Wrong catch order**
   ```java
   try {
       // code
   } catch (Exception e) {  // ❌ Too general first
       // ...
   } catch (IOException e) {  // Unreachable code
       // ...
   }
   ```

## Next Steps

Move on to `08-Collections` to learn about advanced data structures!
