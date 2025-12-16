# Collections - Advanced Data Structures

## What You'll Learn
- Understanding the Collections Framework
- ArrayList vs LinkedList
- HashSet and TreeSet
- HashMap and TreeMap
- Queue and Deque
- Collections utility methods
- Iterators

## Concept Overview

The Java Collections Framework provides interfaces and classes for storing and manipulating groups of objects.

### 1. List Interface (ArrayList, LinkedList)

```java
import java.util.*;

// ArrayList - fast random access
ArrayList<String> arrayList = new ArrayList<>();
arrayList.add("Apple");
arrayList.add("Banana");

// LinkedList - fast insertion/deletion
LinkedList<String> linkedList = new LinkedList<>();
linkedList.add("First");
linkedList.addFirst("New First");
linkedList.addLast("Last");
```

### 2. Set Interface (HashSet, TreeSet)

```java
// HashSet - no duplicates, unordered
HashSet<Integer> hashSet = new HashSet<>();
hashSet.add(5);
hashSet.add(2);
hashSet.add(5);  // Duplicate, won't be added
// Contains: 5, 2 (order may vary)

// TreeSet - sorted set
TreeSet<Integer> treeSet = new TreeSet<>();
treeSet.add(5);
treeSet.add(2);
treeSet.add(8);
// Contains: 2, 5, 8 (sorted)
```

### 3. Map Interface (HashMap, TreeMap)

```java
// HashMap - key-value pairs
HashMap<String, Integer> map = new HashMap<>();
map.put("John", 25);
map.put("Jane", 30);
map.put("Bob", 28);

int age = map.get("John");  // 25
boolean exists = map.containsKey("Jane");  // true

// Iterate through map
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

### 4. Queue Interface

```java
// LinkedList as Queue
Queue<String> queue = new LinkedList<>();
queue.offer("First");
queue.offer("Second");
queue.offer("Third");

String first = queue.poll();  // Removes and returns "First"
String peek = queue.peek();   // Returns "Second" without removing
```

### 5. Collections Utility Methods

```java
List<Integer> list = new ArrayList<>(Arrays.asList(5, 2, 8, 1, 9));

Collections.sort(list);        // Sort ascending
Collections.reverse(list);     // Reverse
Collections.shuffle(list);     // Random order
int max = Collections.max(list);
int min = Collections.min(list);
```

## Your Tasks

### Task 1: ArrayList Operations
Create a file named `ArrayListDemo.java`.

**Example code:**
```java
import java.util.ArrayList;
import java.util.Collections;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<Integer> numbers = new ArrayList<>();

        // Add elements
        numbers.add(45);
        numbers.add(12);
        numbers.add(78);
        numbers.add(23);
        numbers.add(56);

        System.out.println("Original list: " + numbers);
        System.out.println("Size: " + numbers.size());

        // Sort
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);

        // Find max and min
        System.out.println("Max: " + Collections.max(numbers));
        System.out.println("Min: " + Collections.min(numbers));

        // Reverse
        Collections.reverse(numbers);
        System.out.println("Reversed: " + numbers);
    }
}
```

**Expected Output:**
```
Original list: [45, 12, 78, 23, 56]
Size: 5
Sorted: [12, 23, 45, 56, 78]
Max: 78
Min: 12
Reversed: [78, 56, 45, 23, 12]
```

### Task 2: HashSet Demo
Create a file named `HashSetDemo.java`.

**Example code:**
```java
import java.util.HashSet;

public class HashSetDemo {
    public static void main(String[] args) {
        HashSet<String> fruits = new HashSet<>();

        // Add elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");
        fruits.add("Apple");  // Duplicate

        System.out.println("Set: " + fruits);
        System.out.println("Size: " + fruits.size());
        System.out.println("Contains 'Banana': " + fruits.contains("Banana"));
        System.out.println("Contains 'Grape': " + fruits.contains("Grape"));

        // Remove element
        fruits.remove("Banana");
        System.out.println("After removing Banana: " + fruits);
    }
}
```

**Expected Output:**
```
Set: [Apple, Orange, Banana]
Size: 3
Contains 'Banana': true
Contains 'Grape': false
After removing Banana: [Apple, Orange]
```

### Task 3: HashMap Demo
Create a file named `HashMapDemo.java`.

**Example code:**
```java
import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();

        // Add key-value pairs
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 78);

        System.out.println("Scores: " + scores);
        System.out.println("Alice's score: " + scores.get("Alice"));

        // Check if key exists
        if (scores.containsKey("Bob")) {
            System.out.println("Bob's score: " + scores.get("Bob"));
        }

        // Iterate through map
        System.out.println("\nAll scores:");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
```

**Expected Output:**
```
Scores: {Alice=95, Bob=87, Charlie=92, David=78}
Alice's score: 95
Bob's score: 87

All scores:
Alice: 95
Bob: 87
Charlie: 92
David: 78
```

### Task 4-12: Additional Collection Tasks

Practice with:
- **Task 4**: TreeSet for sorted unique elements
- **Task 5**: LinkedList for queue operations
- **Task 6**: TreeMap for sorted key-value pairs
- **Task 7**: Frequency counter using HashMap
- **Task 8**: Remove duplicates using HashSet
- **Task 9**: Student grade management with HashMap
- **Task 10**: Priority Queue
- **Task 11**: Collections.sort() with custom comparator
- **Task 12**: Word frequency counter

## Tips and Common Mistakes

### Tips:
- **Choose right collection**:
  - ArrayList: Fast access, slow insertion/deletion
  - LinkedList: Fast insertion/deletion, slow access
  - HashSet: Fast operations, no duplicates
  - HashMap: Key-value mapping
- **Use generics**: `ArrayList<String>` not `ArrayList`
- **Initialize with capacity**: `new ArrayList<>(1000)` for large lists
- **Use enhanced for loop**: For iteration
- **Check for null**: Before operations

### Common Mistakes:

1. **Modifying collection while iterating**
   ```java
   for (String item : list) {
       list.remove(item);  // ❌ ConcurrentModificationException
   }

   Iterator<String> it = list.iterator();
   while (it.hasNext()) {
       it.next();
       it.remove();  // ✅ Correct way
   }
   ```

2. **Using == for equality**
   ```java
   list.contains("hello");  // ✅ Uses equals()
   if (obj1 == obj2) { }   // ❌ Compares references
   if (obj1.equals(obj2)) { }  // ✅ Compares content
   ```

## Next Steps

Congratulations! You've completed the Intermediate section. Move on to `03-Advanced/01-Generics` to learn about type-safe programming!
