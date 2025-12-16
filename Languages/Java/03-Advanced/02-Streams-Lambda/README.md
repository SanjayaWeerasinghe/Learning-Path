# Streams and Lambda Expressions - Functional Programming

## What You'll Learn
- Understanding lambda expressions
- Functional interfaces
- Stream API basics
- Stream operations (filter, map, reduce)
- Collectors
- Method references
- Optional class

## Concept Overview

Lambda expressions and Streams (introduced in Java 8) enable functional programming style, making code more concise and expressive.

### 1. Lambda Expressions

```java
// Traditional way
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

// Lambda way
Runnable r2 = () -> System.out.println("Hello");

// Lambda with parameters
Comparator<Integer> comp = (a, b) -> a.compareTo(b);

// Lambda with block
Consumer<String> printer = (s) -> {
    System.out.println("Processing: " + s);
    System.out.println("Length: " + s.length());
};
```

### 2. Functional Interfaces

```java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

// Usage
Calculator add = (a, b) -> a + b;
Calculator multiply = (a, b) -> a * b;

System.out.println(add.calculate(5, 3));      // 8
System.out.println(multiply.calculate(5, 3)); // 15
```

### 3. Stream Basics

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Create stream and process
numbers.stream()
       .filter(n -> n % 2 == 0)  // Keep even numbers
       .forEach(System.out::println);  // Print each
```

### 4. Common Stream Operations

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Filter
List<Integer> evens = numbers.stream()
                             .filter(n -> n % 2 == 0)
                             .collect(Collectors.toList());

// Map
List<Integer> squares = numbers.stream()
                               .map(n -> n * n)
                               .collect(Collectors.toList());

// Reduce
int sum = numbers.stream()
                 .reduce(0, (a, b) -> a + b);

// Count
long count = numbers.stream()
                    .filter(n -> n > 5)
                    .count();

// Find
Optional<Integer> first = numbers.stream()
                                 .filter(n -> n > 5)
                                 .findFirst();
```

### 5. Method References

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Lambda
names.forEach(name -> System.out.println(name));

// Method reference
names.forEach(System.out::println);

// Static method reference
List<Integer> nums = Arrays.asList("1", "2", "3")
                           .stream()
                           .map(Integer::parseInt)
                           .collect(Collectors.toList());
```

### 6. Collectors

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// To List
List<String> list = names.stream().collect(Collectors.toList());

// To Set
Set<String> set = names.stream().collect(Collectors.toSet());

// Joining
String joined = names.stream().collect(Collectors.joining(", "));

// Grouping
Map<Integer, List<String>> grouped = names.stream()
    .collect(Collectors.groupingBy(String::length));
```

## Your Tasks

### Task 1: Basic Lambda Expressions
Create a file named `LambdaBasics.java`.

**Example code:**
```java
import java.util.ArrayList;
import java.util.List;

interface Greeting {
    void greet(String name);
}

interface Calculator {
    int calculate(int a, int b);
}

public class LambdaBasics {
    public static void main(String[] args) {
        // Lambda with one parameter
        Greeting greeting = (name) -> System.out.println("Hello, " + name + "!");
        greeting.greet("Alice");
        greeting.greet("Bob");

        System.out.println();

        // Lambda with two parameters
        Calculator add = (a, b) -> a + b;
        Calculator multiply = (a, b) -> a * b;
        Calculator subtract = (a, b) -> a - b;

        System.out.println("5 + 3 = " + add.calculate(5, 3));
        System.out.println("5 * 3 = " + multiply.calculate(5, 3));
        System.out.println("5 - 3 = " + subtract.calculate(5, 3));

        System.out.println();

        // Lambda with collections
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");

        System.out.println("Names:");
        names.forEach(name -> System.out.println("- " + name));
    }
}
```

**Expected Output:**
```
Hello, Alice!
Hello, Bob!

5 + 3 = 8
5 * 3 = 15
5 - 3 = 2

Names:
- Alice
- Bob
- Charlie
```

### Task 2: Stream Filter and Map
Create a file named `StreamFilterMap.java`.

**Example code:**
```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamFilterMap {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        System.out.println("Original: " + numbers);

        // Filter even numbers
        List<Integer> evens = numbers.stream()
                                    .filter(n -> n % 2 == 0)
                                    .collect(Collectors.toList());
        System.out.println("Even numbers: " + evens);

        // Map to squares
        List<Integer> squares = numbers.stream()
                                      .map(n -> n * n)
                                      .collect(Collectors.toList());
        System.out.println("Squares: " + squares);

        // Filter and map together
        List<Integer> evenSquares = numbers.stream()
                                          .filter(n -> n % 2 == 0)
                                          .map(n -> n * n)
                                          .collect(Collectors.toList());
        System.out.println("Squares of evens: " + evenSquares);
    }
}
```

**Expected Output:**
```
Original: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Even numbers: [2, 4, 6, 8, 10]
Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
Squares of evens: [4, 16, 36, 64, 100]
```

### Task 3-12: Additional Stream and Lambda Tasks

Practice with:
- **Task 3**: Stream reduce operations (sum, product, max, min)
- **Task 4**: String stream operations (uppercase, filter by length)
- **Task 5**: Stream sorting and limiting
- **Task 6**: Method references
- **Task 7**: Collectors (grouping, partitioning)
- **Task 8**: flatMap for nested collections
- **Task 9**: Optional class usage
- **Task 10**: Parallel streams
- **Task 11**: Custom collectors
- **Task 12**: Stream statistics and summarizing

## Tips and Common Mistakes

### Tips:
- **Use streams for data processing**: More readable than loops
- **Streams are lazy**: Operations only execute when needed
- **Don't reuse streams**: Create new stream for each operation
- **Use method references**: When lambda just calls a method
- **Parallel streams carefully**: Not always faster

### Common Mistakes:

1. **Reusing streams**
   ```java
   Stream<String> stream = list.stream();
   stream.forEach(System.out::println);
   stream.forEach(System.out::println);  // ❌ Error: stream already used
   ```

2. **Modifying source while streaming**
   ```java
   list.stream().forEach(item -> list.remove(item));  // ❌ Don't modify source
   ```

3. **Forgetting terminal operation**
   ```java
   list.stream().filter(n -> n > 5);  // ❌ Nothing happens
   list.stream().filter(n -> n > 5).collect(Collectors.toList());  // ✅
   ```

## Next Steps

Move on to `03-File-IO` to learn about file operations!
