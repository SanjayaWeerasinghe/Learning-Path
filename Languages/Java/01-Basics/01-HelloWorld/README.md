# Hello World - Your First Java Program

## What You'll Learn
- How to write and run a simple Java program
- Understanding the basic structure of a Java application
- Using `System.out.println()` to output text
- Compiling and running Java programs

## Concept Overview

Every Java program starts with a basic structure. The most fundamental program is "Hello World" which simply displays text on the screen.

### Basic Structure
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### Breakdown:
- `public class HelloWorld` - Defines a public class named HelloWorld (must match filename)
- `public static void main(String[] args)` - The entry point of every Java application
- `System.out.println()` - Outputs text to the console with a new line
- `System.out.print()` - Outputs text without a new line

### Important Notes:
- The class name must match the filename (HelloWorld.java)
- Java is case-sensitive
- Every statement ends with a semicolon (`;`)
- Code blocks are enclosed in curly braces `{}`

### Compiling and Running:
```bash
javac HelloWorld.java  # Compiles to HelloWorld.class
java HelloWorld        # Runs the program
```

## Your Tasks

### Task 1: Basic Hello World
Create a file named `HelloWorld.java` and write a program that prints "Hello, World!" to the console.

**Expected Output:**
```
Hello, World!
```

### Task 2: Personalized Greeting
Create a file named `Greeting.java` that prints your name: "Hello, [Your Name]!"

**Expected Output:**
```
Hello, John!
```

### Task 3: Multiple Lines
Create a file named `Welcome.java` that prints three lines:
- Line 1: "Welcome to Java"
- Line 2: "This is my first program"
- Line 3: "Let's learn together!"

**Expected Output:**
```
Welcome to Java
This is my first program
Let's learn together!
```

### Task 4: Using print vs println
Create a file named `PrintDemo.java` that demonstrates the difference between `System.out.print()` and `System.out.println()`.

**Example code:**
```java
public class PrintDemo {
    public static void main(String[] args) {
        System.out.print("This ");
        System.out.print("is ");
        System.out.print("one line. ");
        System.out.println();
        System.out.println("This is line 1");
        System.out.println("This is line 2");
    }
}
```

**Expected Output:**
```
This is one line.
This is line 1
This is line 2
```

### Task 5: ASCII Art
Create a file named `AsciiArt.java` that prints a simple ASCII art design.

**Example:**
```java
public class AsciiArt {
    public static void main(String[] args) {
        System.out.println("  *  ");
        System.out.println(" *** ");
        System.out.println("*****");
        System.out.println(" *** ");
        System.out.println("  *  ");
    }
}
```

**Expected Output:**
```
  *
 ***
*****
 ***
  *
```

### Task 6: Personal Info Card
Create a file named `InfoCard.java` that prints your personal information in a formatted way.

**Expected Output:**
```
====================
   PERSONAL INFO
====================
Name: John Doe
Age: 25
City: New York
====================
```

### Task 7: Quote Display
Create a file named `Quote.java` that prints a motivational quote with the author's name.

**Expected Output:**
```
"The only way to do great work is to love what you do."
- Steve Jobs
```

### Task 8: Escape Characters
Create a file named `EscapeDemo.java` that demonstrates escape characters like `\n` (newline), `\t` (tab), `\"` (quote).

**Example code:**
```java
public class EscapeDemo {
    public static void main(String[] args) {
        System.out.println("Line 1\nLine 2");
        System.out.println("Column1\tColumn2\tColumn3");
        System.out.println("She said, \"Hello!\"");
        System.out.println("Path: C:\\Users\\Documents");
    }
}
```

**Expected Output:**
```
Line 1
Line 2
Column1	Column2	Column3
She said, "Hello!"
Path: C:\Users\Documents
```

### Task 9: Box Pattern
Create a file named `BoxPattern.java` that prints a rectangular box using asterisks.

**Expected Output:**
```
*********
*       *
*       *
*       *
*********
```

### Task 10: Multiple Classes (Optional Challenge)
Create a file named `MultiClass.java` with multiple classes (only one can be public).

**Example:**
```java
public class MultiClass {
    public static void main(String[] args) {
        System.out.println("Main class");
        Helper.display();
    }
}

class Helper {
    static void display() {
        System.out.println("Helper class");
    }
}
```

**Expected Output:**
```
Main class
Helper class
```

## Tips and Common Mistakes

### Tips:
- Always save the file with the same name as the public class
- Use meaningful class names (start with uppercase)
- Indent your code properly for readability
- Add comments to explain your code: `// This is a comment`
- Use multi-line comments for longer explanations: `/* ... */`

### Common Mistakes:
1. **Filename mismatch**: Class name must match filename
   ```java
   // File: HelloWorld.java
   public class Hello { ... }  // ❌ Wrong
   public class HelloWorld { ... }  // ✅ Correct
   ```

2. **Missing semicolon**: Every statement must end with `;`
   ```java
   System.out.println("Hello")  // ❌ Missing semicolon
   System.out.println("Hello"); // ✅ Correct
   ```

3. **Case sensitivity**: Java is case-sensitive
   ```java
   system.out.println(); // ❌ Wrong
   System.out.println(); // ✅ Correct
   ```

4. **Missing main method**: Must have exactly this signature
   ```java
   public static void main(String[] args) { ... }
   ```

## Next Steps

Once you complete these tasks, move on to `02-Variables-DataTypes` to learn about storing and using data!

**Challenge**: Before moving on, try combining what you've learned to create a program that displays a welcome message with your information formatted nicely using escape characters and multiple println statements.
