# ArrayList - Dynamic Collections

## What You'll Learn
- Understanding ArrayList vs arrays
- Creating and initializing ArrayLists
- Adding, removing, and accessing elements
- Common ArrayList methods
- Iterating through ArrayLists
- ArrayList with different data types

## Concept Overview

ArrayList is a resizable array implementation in Java. Unlike arrays, ArrayLists can grow and shrink dynamically.

### 1. Creating ArrayList

```java
import java.util.ArrayList;

// ArrayList of Integers
ArrayList<Integer> numbers = new ArrayList<>();

// ArrayList of Strings
ArrayList<String> names = new ArrayList<>();

// ArrayList with initial capacity
ArrayList<Integer> list = new ArrayList<>(10);

// ArrayList with initial values (Java 9+)
ArrayList<String> fruits = new ArrayList<>(List.of("Apple", "Banana", "Orange"));
```

### 2. Adding Elements

```java
ArrayList<String> names = new ArrayList<>();

names.add("John");        // Add at end
names.add("Jane");
names.add(0, "Bob");      // Add at specific index

System.out.println(names);  // [Bob, John, Jane]
```

### 3. Accessing Elements

```java
ArrayList<String> names = new ArrayList<>();
names.add("John");
names.add("Jane");
names.add("Bob");

String first = names.get(0);     // "John"
String last = names.get(names.size() - 1);  // "Bob"
```

### 4. Modifying Elements

```java
ArrayList<String> names = new ArrayList<>();
names.add("John");
names.add("Jane");

names.set(1, "Janet");  // Replace element at index 1
System.out.println(names);  // [John, Janet]
```

### 5. Removing Elements

```java
ArrayList<String> names = new ArrayList<>();
names.add("John");
names.add("Jane");
names.add("Bob");

names.remove(1);         // Remove by index
names.remove("Bob");     // Remove by value
```

### 6. Common Methods

```java
ArrayList<Integer> numbers = new ArrayList<>();
numbers.add(10);
numbers.add(20);
numbers.add(30);

int size = numbers.size();           // Get size
boolean isEmpty = numbers.isEmpty(); // Check if empty
boolean contains = numbers.contains(20);  // Check if contains element
int index = numbers.indexOf(20);     // Get index of element
numbers.clear();                     // Remove all elements
```

### 7. Iterating Through ArrayList

```java
ArrayList<String> names = new ArrayList<>();
names.add("John");
names.add("Jane");
names.add("Bob");

// Using for loop
for (int i = 0; i < names.size(); i++) {
    System.out.println(names.get(i));
}

// Using enhanced for loop
for (String name : names) {
    System.out.println(name);
}

// Using forEach (Java 8+)
names.forEach(name -> System.out.println(name));
```

## Your Tasks

### Task 1: ArrayList Basics
Create a file named `ArrayListBasics.java` demonstrating ArrayList creation and basic operations.

**Example code:**
```java
import java.util.ArrayList;

public class ArrayListBasics {
    public static void main(String[] args) {
        ArrayList<String> fruits = new ArrayList<>();

        // Adding elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Mango");

        System.out.println("Fruits: " + fruits);
        System.out.println("Size: " + fruits.size());
        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("Last fruit: " + fruits.get(fruits.size() - 1));
    }
}
```

**Expected Output:**
```
Fruits: [Apple, Banana, Orange, Mango]
Size: 4
First fruit: Apple
Last fruit: Mango
```

### Task 2: Adding at Specific Index
Create a file named `AddAtIndex.java` showing how to add elements at specific positions.

**Example code:**
```java
import java.util.ArrayList;

public class AddAtIndex {
    public static void main(String[] args) {
        ArrayList<String> colors = new ArrayList<>();

        colors.add("Red");
        colors.add("Blue");
        colors.add("Yellow");

        System.out.println("Original: " + colors);

        // Add at specific index
        colors.add(1, "Green");  // Add at index 1
        System.out.println("After adding Green at index 1: " + colors);

        colors.add(0, "Purple");  // Add at beginning
        System.out.println("After adding Purple at index 0: " + colors);
    }
}
```

**Expected Output:**
```
Original: [Red, Blue, Yellow]
After adding Green at index 1: [Red, Green, Blue, Yellow]
After adding Purple at index 0: [Purple, Red, Green, Blue, Yellow]
```

### Task 3: Modifying Elements
Create a file named `ModifyElements.java` demonstrating the set() method.

**Example code:**
```java
import java.util.ArrayList;

public class ModifyElements {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);

        System.out.println("Original: " + numbers);

        // Modify elements
        numbers.set(1, 25);  // Change second element
        numbers.set(3, 45);  // Change fourth element

        System.out.println("Modified: " + numbers);
    }
}
```

**Expected Output:**
```
Original: [10, 20, 30, 40]
Modified: [10, 25, 30, 45]
```

### Task 4: Removing Elements
Create a file named `RemoveElements.java` showing different ways to remove elements.

**Example code:**
```java
import java.util.ArrayList;

public class RemoveElements {
    public static void main(String[] args) {
        ArrayList<String> animals = new ArrayList<>();
        animals.add("Dog");
        animals.add("Cat");
        animals.add("Bird");
        animals.add("Fish");
        animals.add("Cat");

        System.out.println("Original: " + animals);

        // Remove by index
        animals.remove(2);
        System.out.println("After removing index 2: " + animals);

        // Remove by value (removes first occurrence)
        animals.remove("Cat");
        System.out.println("After removing 'Cat': " + animals);
    }
}
```

**Expected Output:**
```
Original: [Dog, Cat, Bird, Fish, Cat]
After removing index 2: [Dog, Cat, Fish, Cat]
After removing 'Cat': [Dog, Fish, Cat]
```

### Task 5: ArrayList Methods
Create a file named `ArrayListMethods.java` demonstrating common ArrayList methods.

**Example code:**
```java
import java.util.ArrayList;

public class ArrayListMethods {
    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>();
        items.add("Laptop");
        items.add("Phone");
        items.add("Tablet");

        System.out.println("Items: " + items);
        System.out.println("Size: " + items.size());
        System.out.println("Is empty? " + items.isEmpty());
        System.out.println("Contains 'Phone'? " + items.contains("Phone"));
        System.out.println("Contains 'TV'? " + items.contains("TV"));
        System.out.println("Index of 'Tablet': " + items.indexOf("Tablet"));
        System.out.println("Index of 'TV': " + items.indexOf("TV"));  // -1 if not found

        items.clear();
        System.out.println("\nAfter clear:");
        System.out.println("Items: " + items);
        System.out.println("Is empty? " + items.isEmpty());
    }
}
```

**Expected Output:**
```
Items: [Laptop, Phone, Tablet]
Size: 3
Is empty? false
Contains 'Phone'? true
Contains 'TV'? false
Index of 'Tablet': 2
Index of 'TV': -1

After clear:
Items: []
Is empty? true
```

### Task 6: Iterating with For Loop
Create a file named `IterateForLoop.java` showing iteration using a traditional for loop.

**Example code:**
```java
import java.util.ArrayList;

public class IterateForLoop {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(85);
        scores.add(92);
        scores.add(78);
        scores.add(95);
        scores.add(88);

        System.out.println("Student scores:");
        for (int i = 0; i < scores.size(); i++) {
            System.out.println("Student " + (i + 1) + ": " + scores.get(i));
        }
    }
}
```

**Expected Output:**
```
Student scores:
Student 1: 85
Student 2: 92
Student 3: 78
Student 4: 95
Student 5: 88
```

### Task 7: Enhanced For Loop
Create a file named `EnhancedForLoop.java` using for-each loop.

**Example code:**
```java
import java.util.ArrayList;

public class EnhancedForLoop {
    public static void main(String[] args) {
        ArrayList<String> cities = new ArrayList<>();
        cities.add("New York");
        cities.add("Los Angeles");
        cities.add("Chicago");
        cities.add("Houston");

        System.out.println("Cities:");
        for (String city : cities) {
            System.out.println("- " + city);
        }
    }
}
```

**Expected Output:**
```
Cities:
- New York
- Los Angeles
- Chicago
- Houston
```

### Task 8: Sum and Average
Create a file named `SumAverage.java` that calculates sum and average of ArrayList elements.

**Example code:**
```java
import java.util.ArrayList;

public class SumAverage {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(40);
        numbers.add(50);

        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }

        double average = sum / (double) numbers.size();

        System.out.println("Numbers: " + numbers);
        System.out.println("Sum: " + sum);
        System.out.println("Average: " + average);
    }
}
```

**Expected Output:**
```
Numbers: [10, 20, 30, 40, 50]
Sum: 150
Average: 30.0
```

### Task 9: Find Maximum and Minimum
Create a file named `MinMaxArrayList.java` finding max and min values.

**Example code:**
```java
import java.util.ArrayList;
import java.util.Collections;

public class MinMaxArrayList {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(45);
        numbers.add(23);
        numbers.add(67);
        numbers.add(12);
        numbers.add(89);
        numbers.add(34);

        // Method 1: Using Collections
        int max = Collections.max(numbers);
        int min = Collections.min(numbers);

        System.out.println("Numbers: " + numbers);
        System.out.println("Maximum: " + max);
        System.out.println("Minimum: " + min);

        // Method 2: Manual search
        int maxManual = numbers.get(0);
        int minManual = numbers.get(0);
        for (int num : numbers) {
            if (num > maxManual) maxManual = num;
            if (num < minManual) minManual = num;
        }
        System.out.println("\nUsing manual search:");
        System.out.println("Maximum: " + maxManual);
        System.out.println("Minimum: " + minManual);
    }
}
```

**Expected Output:**
```
Numbers: [45, 23, 67, 12, 89, 34]
Maximum: 89
Minimum: 12

Using manual search:
Maximum: 89
Minimum: 12
```

### Task 10: Sorting ArrayList
Create a file named `SortArrayList.java` demonstrating ArrayList sorting.

**Example code:**
```java
import java.util.ArrayList;
import java.util.Collections;

public class SortArrayList {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(64);
        numbers.add(34);
        numbers.add(25);
        numbers.add(12);
        numbers.add(90);

        System.out.println("Original: " + numbers);

        // Sort in ascending order
        Collections.sort(numbers);
        System.out.println("Sorted (ascending): " + numbers);

        // Sort in descending order
        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println("Sorted (descending): " + numbers);
    }
}
```

**Expected Output:**
```
Original: [64, 34, 25, 12, 90]
Sorted (ascending): [12, 25, 34, 64, 90]
Sorted (descending): [90, 64, 34, 25, 12]
```

### Task 11: Search Element
Create a file named `SearchArrayList.java` to search for elements.

**Example code:**
```java
import java.util.ArrayList;

public class SearchArrayList {
    public static void main(String[] args) {
        ArrayList<String> students = new ArrayList<>();
        students.add("Alice");
        students.add("Bob");
        students.add("Charlie");
        students.add("David");
        students.add("Eve");

        String searchName = "Charlie";

        if (students.contains(searchName)) {
            int index = students.indexOf(searchName);
            System.out.println(searchName + " found at position " + (index + 1));
        } else {
            System.out.println(searchName + " not found");
        }

        // Search for non-existent element
        String notFound = "Frank";
        if (students.contains(notFound)) {
            System.out.println(notFound + " found");
        } else {
            System.out.println(notFound + " not found");
        }
    }
}
```

**Expected Output:**
```
Charlie found at position 3
Frank not found
```

### Task 12: To-Do List Manager
Create a file named `TodoList.java` simulating a simple to-do list.

**Example code:**
```java
import java.util.ArrayList;

public class TodoList {
    public static void main(String[] args) {
        ArrayList<String> tasks = new ArrayList<>();

        // Adding tasks
        tasks.add("Complete Java homework");
        tasks.add("Read chapter 5");
        tasks.add("Practice coding");
        tasks.add("Review notes");

        System.out.println("=== To-Do List ===");
        System.out.println("Total tasks: " + tasks.size());
        System.out.println("\nTasks:");
        for (int i = 0; i < tasks.size(); i++) {
            System.out.println((i + 1) + ". " + tasks.get(i));
        }

        // Complete a task (remove it)
        System.out.println("\n✓ Completed: " + tasks.get(1));
        tasks.remove(1);

        System.out.println("\n=== Updated To-Do List ===");
        System.out.println("Remaining tasks: " + tasks.size());
        System.out.println("\nTasks:");
        for (int i = 0; i < tasks.size(); i++) {
            System.out.println((i + 1) + ". " + tasks.get(i));
        }
    }
}
```

**Expected Output:**
```
=== To-Do List ===
Total tasks: 4

Tasks:
1. Complete Java homework
2. Read chapter 5
3. Practice coding
4. Review notes

✓ Completed: Read chapter 5

=== Updated To-Do List ===
Remaining tasks: 3

Tasks:
1. Complete Java homework
2. Practice coding
3. Review notes
```

## Tips and Common Mistakes

### Tips:
- **Use generics**: Always specify the type: `ArrayList<String>`
- **Check size before accessing**: Prevent IndexOutOfBoundsException
- **Use contains() before indexOf()**: More efficient for checking existence
- **Consider ArrayList vs Array**: Use ArrayList for dynamic size, array for fixed size
- **Import properly**: `import java.util.ArrayList;`

### Common Mistakes:

1. **Wrong type declaration**
   ```java
   ArrayList list = new ArrayList();  // ❌ Raw type (no generics)
   ArrayList<String> list = new ArrayList<>();  // ✅ With generics
   ```

2. **Index out of bounds**
   ```java
   ArrayList<String> list = new ArrayList<>();
   list.add("A");
   System.out.println(list.get(1));  // ❌ Error: index 1 doesn't exist

   if (list.size() > 1) {
       System.out.println(list.get(1));  // ✅ Check size first
   }
   ```

3. **Using length instead of size()**
   ```java
   ArrayList<String> list = new ArrayList<>();
   System.out.println(list.length);  // ❌ Error: ArrayList has size(), not length
   System.out.println(list.size());  // ✅ Correct
   ```

4. **Modifying list while iterating**
   ```java
   for (String item : list) {
       list.remove(item);  // ❌ ConcurrentModificationException
   }

   for (int i = list.size() - 1; i >= 0; i--) {
       list.remove(i);  // ✅ Remove from end to beginning
   }
   ```

5. **Comparing with ==**
   ```java
   ArrayList<Integer> list1 = new ArrayList<>();
   ArrayList<Integer> list2 = new ArrayList<>();
   if (list1 == list2) { }  // ❌ Compares references
   if (list1.equals(list2)) { }  // ✅ Compares content
   ```

6. **Primitive types directly**
   ```java
   ArrayList<int> list = new ArrayList<>();  // ❌ Cannot use primitives
   ArrayList<Integer> list = new ArrayList<>();  // ✅ Use wrapper class
   ```

## Next Steps

Once you complete these tasks, move on to `03-Methods` to learn about creating reusable code blocks!

**Challenge**: Create a program that manages a student grade book using ArrayList. It should allow adding students, recording grades for each student (store in nested ArrayLists), calculating averages, and finding the top performer. Implement methods for each operation.
