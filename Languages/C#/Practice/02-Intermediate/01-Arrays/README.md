# Arrays in C#

## What You'll Learn
- What arrays are and why they're useful
- How to declare and initialize arrays
- Accessing array elements
- Array properties and methods
- Multi-dimensional arrays
- Iterating through arrays

## Concept Overview

An array is a collection of elements of the same type stored in contiguous memory locations. Each element can be accessed using an index.

### Declaration and Initialization

```csharp
// Method 1: Declare then initialize
int[] numbers = new int[5]; // Array of 5 integers (default values: 0)

// Method 2: Declare and initialize with values
int[] numbers = new int[] { 1, 2, 3, 4, 5 };

// Method 3: Simplified syntax
int[] numbers = { 1, 2, 3, 4, 5 };

// Different types
string[] names = { "Alice", "Bob", "Charlie" };
double[] prices = { 9.99, 19.99, 29.99 };
bool[] flags = { true, false, true };
```

### Accessing Elements

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

// Access by index (0-based)
int first = numbers[0];    // 10
int third = numbers[2];    // 30
int last = numbers[4];     // 50

// Modify elements
numbers[0] = 100;  // Now array is { 100, 20, 30, 40, 50 }
```

### Array Properties

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

int length = numbers.Length;  // 5
int lastIndex = numbers.Length - 1;  // 4
```

### Common Array Methods

```csharp
int[] numbers = { 5, 2, 8, 1, 9 };

// Sort
Array.Sort(numbers);  // { 1, 2, 5, 8, 9 }

// Reverse
Array.Reverse(numbers);  // { 9, 8, 5, 2, 1 }

// Find index of element
int index = Array.IndexOf(numbers, 5);  // 2

// Copy array
int[] copy = new int[numbers.Length];
Array.Copy(numbers, copy, numbers.Length);

// Clear elements
Array.Clear(numbers, 0, numbers.Length);  // Sets all to 0
```

### Iterating Through Arrays

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

// Method 1: for loop
for (int i = 0; i < numbers.Length; i++)
{
    Console.WriteLine(numbers[i]);
}

// Method 2: foreach loop
foreach (int num in numbers)
{
    Console.WriteLine(num);
}
```

### Multi-Dimensional Arrays

```csharp
// 2D Array (matrix)
int[,] matrix = new int[3, 3]
{
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

// Access elements
int element = matrix[0, 0];  // 1
int element = matrix[1, 2];  // 6

// Jagged arrays (array of arrays)
int[][] jagged = new int[3][];
jagged[0] = new int[] { 1, 2 };
jagged[1] = new int[] { 3, 4, 5 };
jagged[2] = new int[] { 6, 7, 8, 9 };
```

## Your Tasks

### Task 1: Basic Array Operations
Create a program that:
- Declares an array of 5 integers
- Initializes it with values: 10, 20, 30, 40, 50
- Prints all elements
- Prints the first and last element
- Prints the length of the array

### Task 2: Array Input and Sum
Write a program that:
- Creates an array of 5 numbers
- Calculates and prints the sum of all elements
- Calculates and prints the average
- Finds and prints the maximum and minimum values

### Task 3: String Array
Create a program that:
- Stores 5 favorite movie names in a string array
- Prints all movies with their index numbers
- Prints movies in reverse order

### Task 4: Array Search
Write a program that:
- Creates an array of numbers: { 15, 22, 8, 47, 31, 19, 5 }
- Searches for a specific number (e.g., 47)
- Prints its index if found, or "Not found" if not present
- Use a loop to search

### Task 5: Array Sorting
Create a program that:
- Takes an unsorted array of numbers
- Sorts it using Array.Sort()
- Prints both the original and sorted arrays
- Also try sorting in descending order (sort then reverse)

### Task 6: Frequency Counter
Write a program that:
- Creates an array: { 1, 2, 2, 3, 3, 3, 4, 4, 4, 4 }
- Counts how many times each number appears
- Prints the frequency of each number

### Task 7: Copy and Modify
Create a program that:
- Creates an array of numbers
- Copies it to a new array
- Modifies the copy
- Proves that the original is unchanged
- Use Array.Copy()

### Task 8: Two-Dimensional Array
Write a program that:
- Creates a 3x3 matrix (2D array)
- Fills it with numbers 1-9
- Prints it in a grid format
- Calculates the sum of each row

### Task 9: Grade Book
Create a program that:
- Stores grades for 5 students in an array
- Calculates class average
- Finds highest and lowest grade
- Counts how many students passed (grade >= 60)

### Task 10: Array Reversal
Write a program that:
- Creates an array of elements
- Reverses it WITHOUT using Array.Reverse()
- Use a loop and swap elements
- Print original and reversed arrays

### Task 11: Merge Arrays
Create a program that:
- Creates two arrays: { 1, 2, 3 } and { 4, 5, 6 }
- Merges them into a new array: { 1, 2, 3, 4, 5, 6 }
- Do this manually with a loop (not Array.Copy)

### Task 12: Temperature Tracker
Write a program that:
- Stores 7 days of temperatures in an array
- Finds the warmest and coldest days
- Calculates average temperature
- Counts days above average

## Expected Output Examples

**Task 1:**
```
Elements: 10, 20, 30, 40, 50
First element: 10
Last element: 50
Array length: 5
```

**Task 2:**
```
Array: [5, 10, 15, 20, 25]
Sum: 75
Average: 15
Maximum: 25
Minimum: 5
```

**Task 8:**
```
Matrix:
1 2 3
4 5 6
7 8 9

Row 1 sum: 6
Row 2 sum: 15
Row 3 sum: 24
```

## Tips
- Arrays have **fixed size** - once created, size cannot change
- Array indices start at 0, not 1
- Last index is always `Length - 1`
- Accessing invalid index throws `IndexOutOfRangeException`
- Use `foreach` when you don't need the index
- Use `for` when you need the index or want to modify elements

## Common Mistakes
```csharp
// ❌ Index out of bounds
int[] arr = { 1, 2, 3 };
int value = arr[3]; // Error! Valid indices: 0, 1, 2

// ✅ Correct
int value = arr[2]; // Last element

// ❌ Cannot change array size
int[] arr = { 1, 2, 3 };
arr.Length = 5; // Error! Length is read-only

// ✅ Create new array if you need different size
int[] newArr = new int[5];
```

## When to Use Arrays
- ✅ Fixed number of elements
- ✅ Fast access by index
- ✅ Memory efficient
- ❌ Dynamic size needed → Use `List<T>` instead (next topic!)

## Next Steps
Move on to `02-Lists` to learn about dynamic collections that can grow and shrink!
