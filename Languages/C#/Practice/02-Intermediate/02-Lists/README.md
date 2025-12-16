# Lists in C#

## What You'll Learn
- What Lists are and how they differ from arrays
- Creating and initializing Lists
- Adding, removing, and accessing elements
- Common List methods
- When to use Lists vs Arrays

## Concept Overview

A `List<T>` is a dynamic collection that can grow or shrink in size. Unlike arrays, you don't need to specify the size upfront.

### Creating Lists

```csharp
using System.Collections.Generic;

// Create empty list
List<int> numbers = new List<int>();

// Create with initial values
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

// Create with capacity (optimization)
List<string> names = new List<string>(100);

// Different types
List<string> cities = new List<string>();
List<double> prices = new List<double>();
List<bool> flags = new List<bool>();
```

### Adding Elements

```csharp
List<int> numbers = new List<int>();

// Add single element
numbers.Add(10);        // { 10 }
numbers.Add(20);        // { 10, 20 }

// Add multiple elements
numbers.AddRange(new int[] { 30, 40, 50 });  // { 10, 20, 30, 40, 50 }

// Insert at specific position
numbers.Insert(0, 5);   // { 5, 10, 20, 30, 40, 50 }
numbers.Insert(2, 15);  // { 5, 10, 15, 20, 30, 40, 50 }
```

### Accessing Elements

```csharp
List<int> numbers = new List<int> { 10, 20, 30, 40, 50 };

// Access by index
int first = numbers[0];      // 10
int third = numbers[2];      // 30

// Modify elements
numbers[0] = 100;            // { 100, 20, 30, 40, 50 }

// Properties
int count = numbers.Count;   // 5
```

### Removing Elements

```csharp
List<int> numbers = new List<int> { 10, 20, 30, 40, 50 };

// Remove by value
numbers.Remove(30);          // { 10, 20, 40, 50 }

// Remove at index
numbers.RemoveAt(0);         // { 20, 40, 50 }

// Remove range
numbers.RemoveRange(1, 2);   // Remove 2 elements starting at index 1

// Clear all
numbers.Clear();             // { }
```

### Common List Methods

```csharp
List<int> numbers = new List<int> { 5, 2, 8, 1, 9, 2 };

// Sort
numbers.Sort();                    // { 1, 2, 2, 5, 8, 9 }

// Reverse
numbers.Reverse();                 // { 9, 8, 5, 2, 2, 1 }

// Contains
bool hasEight = numbers.Contains(8);  // true

// Find index
int index = numbers.IndexOf(2);    // 3 (first occurrence)
int lastIndex = numbers.LastIndexOf(2);  // 4 (last occurrence)

// Find element
int found = numbers.Find(x => x > 5);     // 9 (first element > 5)
List<int> all = numbers.FindAll(x => x > 5);  // { 9, 8 }

// Convert to array
int[] arr = numbers.ToArray();
```

### Iterating Through Lists

```csharp
List<string> names = new List<string> { "Alice", "Bob", "Charlie" };

// foreach
foreach (string name in names)
{
    Console.WriteLine(name);
}

// for loop
for (int i = 0; i < names.Count; i++)
{
    Console.WriteLine(names[i]);
}

// ForEach method
names.ForEach(name => Console.WriteLine(name));
```

## Your Tasks

### Task 1: Basic List Operations
Create a program that:
- Creates an empty list of integers
- Adds numbers: 5, 10, 15, 20, 25
- Prints all elements
- Prints the count
- Removes the number 15
- Prints the updated list

### Task 2: Shopping List
Write a program that:
- Creates a shopping list (List<string>)
- Adds 5 items
- Prints the list with numbers
- Removes one item
- Adds 2 more items
- Prints the final list

### Task 3: Dynamic Input
Create a program that:
- Creates an empty list
- Keeps asking user for numbers (you can simulate this)
- Stops when user enters -1
- Prints all entered numbers
- Use a while loop and Add()

### Task 4: List Search
Write a program that:
- Creates a list of numbers
- Searches for a specific number
- Prints its index if found
- Use IndexOf() and Contains()

### Task 5: List Sorting
Create a program with a list of student names:
- Add at least 7 names in random order
- Print original list
- Sort alphabetically
- Print sorted list
- Sort in reverse alphabetical order
- Print reversed list

### Task 6: Remove Duplicates
Write a program that:
- Creates a list: { 1, 2, 2, 3, 3, 3, 4, 4, 5 }
- Removes all duplicates
- Results in: { 1, 2, 3, 4, 5 }
- Hint: Create a new list or use a loop to check

### Task 7: Find Min/Max
Create a program that:
- Creates a list of random numbers
- Finds minimum value (without using Min())
- Finds maximum value (without using Max())
- Use loops

### Task 8: List Filtering
Write a program that:
- Creates a list of numbers 1-20
- Creates a new list with only even numbers
- Creates another list with only numbers > 10
- Use FindAll() or loops

### Task 9: Grade Manager
Create a comprehensive grade management system:
- List to store student grades
- Add multiple grades
- Calculate average
- Find highest and lowest grades
- Count passing grades (>= 60)
- Remove failing grades (< 60)
- Print statistics

### Task 10: List vs Array Conversion
Write a program that:
- Creates an array of numbers
- Converts it to a List
- Adds more elements to the list
- Converts back to an array
- Demonstrates the difference

### Task 11: Insert Operations
Create a program that:
- Creates a list: { 1, 3, 5, 7, 9 }
- Inserts 2 between 1 and 3
- Inserts 4 between 3 and 5
- Continues the pattern
- Results in: { 1, 2, 3, 4, 5, 6, 7, 8, 9 }

### Task 12: To-Do List Application
Build a simple to-do app that:
- Maintains a list of tasks
- Menu options:
  1. Add task
  2. Remove task
  3. View all tasks
  4. Mark task as complete (remove it)
  5. Exit
- Use while loop and switch statement

## Expected Output Examples

**Task 1:**
```
Initial list: 5, 10, 15, 20, 25
Count: 5
After removing 15: 5, 10, 20, 25
```

**Task 2:**
```
Shopping List:
1. Milk
2. Bread
3. Eggs
4. Butter
5. Cheese

After updates:
1. Milk
2. Eggs
3. Butter
4. Cheese
5. Apples
6. Bananas
```

**Task 9:**
```
Grades: 85, 92, 78, 55, 90, 67, 45, 88
Average: 75.0
Highest: 92
Lowest: 45
Passing: 6
After removing failures: 85, 92, 78, 90, 67, 88
```

## Tips
- Use `Count` property (not `Length`)
- Lists are **0-indexed** like arrays
- `Add()` always adds to the end
- `Insert()` adds at a specific position
- `Remove()` removes first occurrence only
- `Contains()` is faster than looping for checking existence

## List vs Array

| Feature | Array | List |
|---------|-------|------|
| Size | Fixed | Dynamic |
| Performance | Faster | Slightly slower |
| Methods | Limited | Many built-in |
| Syntax | `int[]` | `List<int>` |
| When to use | Known size | Unknown/changing size |

## Common Mistakes
```csharp
// ❌ Modifying list while iterating
foreach (int num in numbers)
{
    numbers.Remove(num); // Error! Collection was modified
}

// ✅ Use for loop backwards
for (int i = numbers.Count - 1; i >= 0; i--)
{
    numbers.RemoveAt(i);
}

// ❌ Forgetting using directive
List<int> numbers = new List<int>(); // Error if no using

// ✅ Add using statement
using System.Collections.Generic;
```

## Next Steps
Move on to `03-Methods` to learn how to organize code into reusable functions!
