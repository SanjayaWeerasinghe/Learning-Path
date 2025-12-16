# Arrays - Working with Collections of Data

## What You'll Learn
- How to declare and initialize arrays
- Accessing and modifying array elements
- Understanding array length
- Iterating through arrays
- Multi-dimensional arrays
- Common array operations

## Concept Overview

An array is a container that holds a fixed number of values of a single type. Arrays are zero-indexed, meaning the first element is at index 0.

### 1. Array Declaration and Initialization

```java
// Declaration
int[] numbers;  // Preferred style
int numbers[];  // Also valid

// Declaration with initialization
int[] numbers = new int[5];  // Array of 5 integers, all initialized to 0

// Declaration with values
int[] numbers = {10, 20, 30, 40, 50};

// Alternative syntax
int[] numbers = new int[] {10, 20, 30, 40, 50};
```

### 2. Accessing Array Elements

```java
int[] numbers = {10, 20, 30, 40, 50};

System.out.println(numbers[0]);  // 10 (first element)
System.out.println(numbers[2]);  // 30 (third element)
System.out.println(numbers[4]);  // 50 (last element)

// Modifying elements
numbers[1] = 25;  // Changes second element to 25
```

### 3. Array Length

```java
int[] numbers = {10, 20, 30, 40, 50};
System.out.println(numbers.length);  // 5

// Last element
int lastElement = numbers[numbers.length - 1];  // 50
```

### 4. Iterating Through Arrays

```java
int[] numbers = {10, 20, 30, 40, 50};

// Using for loop
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}

// Using enhanced for loop (for-each)
for (int num : numbers) {
    System.out.println(num);
}
```

### 5. Multi-Dimensional Arrays

```java
// 2D array (matrix)
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println(matrix[0][0]);  // 1
System.out.println(matrix[1][2]);  // 6

// Declaration
int[][] matrix = new int[3][3];  // 3x3 matrix
```

### 6. Common Array Operations

```java
import java.util.Arrays;

int[] numbers = {5, 2, 8, 1, 9};

// Sorting
Arrays.sort(numbers);  // {1, 2, 5, 8, 9}

// Printing (toString)
System.out.println(Arrays.toString(numbers));

// Copying
int[] copy = Arrays.copyOf(numbers, numbers.length);

// Filling
Arrays.fill(numbers, 0);  // All elements become 0
```

## Your Tasks

### Task 1: Array Basics
Create a file named `ArrayBasics.java` that demonstrates array declaration and initialization.

**Example code:**
```java
public class ArrayBasics {
    public static void main(String[] args) {
        // Create an array of 5 integers
        int[] numbers = {10, 20, 30, 40, 50};

        System.out.println("Array elements:");
        System.out.println("First element: " + numbers[0]);
        System.out.println("Second element: " + numbers[1]);
        System.out.println("Third element: " + numbers[2]);
        System.out.println("Fourth element: " + numbers[3]);
        System.out.println("Fifth element: " + numbers[4]);
        System.out.println("Array length: " + numbers.length);
    }
}
```

**Expected Output:**
```
Array elements:
First element: 10
Second element: 20
Third element: 30
Fourth element: 40
Fifth element: 50
Array length: 5
```

### Task 2: Array with Loop
Create a file named `ArrayLoop.java` that prints all array elements using a for loop.

**Example code:**
```java
public class ArrayLoop {
    public static void main(String[] args) {
        int[] scores = {85, 92, 78, 95, 88};

        System.out.println("Student scores:");
        for (int i = 0; i < scores.length; i++) {
            System.out.println("Student " + (i + 1) + ": " + scores[i]);
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

### Task 3: Enhanced For Loop
Create a file named `EnhancedForLoop.java` demonstrating the for-each loop.

**Example code:**
```java
public class EnhancedForLoop {
    public static void main(String[] args) {
        String[] fruits = {"Apple", "Banana", "Orange", "Mango", "Grape"};

        System.out.println("Fruits:");
        for (String fruit : fruits) {
            System.out.println("- " + fruit);
        }
    }
}
```

**Expected Output:**
```
Fruits:
- Apple
- Banana
- Orange
- Mango
- Grape
```

### Task 4: Sum of Array Elements
Create a file named `ArraySum.java` that calculates the sum of all elements in an array.

**Example code:**
```java
public class ArraySum {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        int sum = 0;

        for (int num : numbers) {
            sum += num;
        }

        System.out.println("Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println("\nSum: " + sum);
        System.out.println("Average: " + (sum / (double) numbers.length));
    }
}
```

**Expected Output:**
```
Numbers:
10 20 30 40 50
Sum: 150
Average: 30.0
```

### Task 5: Find Maximum and Minimum
Create a file named `MinMax.java` that finds the maximum and minimum values in an array.

**Example code:**
```java
public class MinMax {
    public static void main(String[] args) {
        int[] numbers = {45, 23, 67, 12, 89, 34, 56};

        int max = numbers[0];
        int min = numbers[0];

        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
            if (numbers[i] < min) {
                min = numbers[i];
            }
        }

        System.out.println("Array: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println("\nMaximum: " + max);
        System.out.println("Minimum: " + min);
    }
}
```

**Expected Output:**
```
Array:
45 23 67 12 89 34 56
Maximum: 89
Minimum: 12
```

### Task 6: Search Element
Create a file named `SearchArray.java` that searches for a specific element in an array.

**Example code:**
```java
public class SearchArray {
    public static void main(String[] args) {
        int[] numbers = {10, 25, 30, 45, 50, 65, 70};
        int searchValue = 45;
        int foundIndex = -1;

        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == searchValue) {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex != -1) {
            System.out.println(searchValue + " found at index " + foundIndex);
        } else {
            System.out.println(searchValue + " not found in array");
        }
    }
}
```

**Expected Output:**
```
45 found at index 3
```

### Task 7: Reverse Array
Create a file named `ReverseArray.java` that reverses the elements of an array.

**Example code:**
```java
public class ReverseArray {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        System.out.println("Original array:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }

        // Reverse the array
        for (int i = 0; i < numbers.length / 2; i++) {
            int temp = numbers[i];
            numbers[i] = numbers[numbers.length - 1 - i];
            numbers[numbers.length - 1 - i] = temp;
        }

        System.out.println("\nReversed array:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
```

**Expected Output:**
```
Original array:
10 20 30 40 50
Reversed array:
50 40 30 20 10
```

### Task 8: Copy Array
Create a file named `CopyArray.java` demonstrating array copying.

**Example code:**
```java
import java.util.Arrays;

public class CopyArray {
    public static void main(String[] args) {
        int[] original = {1, 2, 3, 4, 5};

        // Method 1: Using Arrays.copyOf
        int[] copy1 = Arrays.copyOf(original, original.length);

        // Method 2: Manual copying
        int[] copy2 = new int[original.length];
        for (int i = 0; i < original.length; i++) {
            copy2[i] = original[i];
        }

        // Modify original to show copies are independent
        original[0] = 99;

        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Copy 1: " + Arrays.toString(copy1));
        System.out.println("Copy 2: " + Arrays.toString(copy2));
    }
}
```

**Expected Output:**
```
Original: [99, 2, 3, 4, 5]
Copy 1: [1, 2, 3, 4, 5]
Copy 2: [1, 2, 3, 4, 5]
```

### Task 9: Sort Array
Create a file named `SortArray.java` that sorts an array.

**Example code:**
```java
import java.util.Arrays;

public class SortArray {
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};

        System.out.println("Original array:");
        System.out.println(Arrays.toString(numbers));

        Arrays.sort(numbers);

        System.out.println("Sorted array:");
        System.out.println(Arrays.toString(numbers));
    }
}
```

**Expected Output:**
```
Original array:
[64, 34, 25, 12, 22, 11, 90]
Sorted array:
[11, 12, 22, 25, 34, 64, 90]
```

### Task 10: Count Even and Odd Numbers
Create a file named `CountEvenOdd.java` that counts even and odd numbers in an array.

**Example code:**
```java
public class CountEvenOdd {
    public static void main(String[] args) {
        int[] numbers = {12, 7, 18, 23, 30, 45, 56, 67, 78};
        int evenCount = 0;
        int oddCount = 0;

        for (int num : numbers) {
            if (num % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

        System.out.println("Array: " + java.util.Arrays.toString(numbers));
        System.out.println("Even numbers: " + evenCount);
        System.out.println("Odd numbers: " + oddCount);
    }
}
```

**Expected Output:**
```
Array: [12, 7, 18, 23, 30, 45, 56, 67, 78]
Even numbers: 5
Odd numbers: 4
```

### Task 11: 2D Array (Matrix)
Create a file named `MatrixDemo.java` demonstrating 2D arrays.

**Example code:**
```java
public class MatrixDemo {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        System.out.println("Matrix:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        System.out.println("\nElement at [1][2]: " + matrix[1][2]);
    }
}
```

**Expected Output:**
```
Matrix:
1 2 3
4 5 6
7 8 9

Element at [1][2]: 6
```

### Task 12: Grade Statistics
Create a file named `GradeStats.java` that analyzes student grades.

**Example code:**
```java
public class GradeStats {
    public static void main(String[] args) {
        int[] grades = {85, 92, 78, 95, 88, 76, 90, 84};
        int sum = 0;
        int max = grades[0];
        int min = grades[0];
        int passCount = 0;

        for (int grade : grades) {
            sum += grade;
            if (grade > max) max = grade;
            if (grade < min) min = grade;
            if (grade >= 60) passCount++;
        }

        double average = sum / (double) grades.length;

        System.out.println("Grade Statistics:");
        System.out.println("Total students: " + grades.length);
        System.out.println("Average: " + average);
        System.out.println("Highest: " + max);
        System.out.println("Lowest: " + min);
        System.out.println("Passing (>= 60): " + passCount);
        System.out.println("Failing: " + (grades.length - passCount));
    }
}
```

**Expected Output:**
```
Grade Statistics:
Total students: 8
Average: 86.0
Highest: 95
Lowest: 76
Passing (>= 60): 8
Failing: 0
```

## Tips and Common Mistakes

### Tips:
- **Use meaningful array names**: `scores` instead of `arr`
- **Check array bounds**: Always ensure index is < length
- **Use enhanced for loop** when you don't need the index
- **Initialize with appropriate size**: Arrays have fixed size
- **Use Arrays utility class** for common operations

### Common Mistakes:

1. **Array index out of bounds**
   ```java
   int[] arr = {1, 2, 3};
   System.out.println(arr[3]);  // ❌ Error: Index 3 out of bounds for length 3
   System.out.println(arr[2]);  // ✅ Correct (last element)
   ```

2. **Not initializing array**
   ```java
   int[] arr;
   arr[0] = 10;  // ❌ Error: arr not initialized

   int[] arr = new int[5];
   arr[0] = 10;  // ✅ Correct
   ```

3. **Confusing length and length()**
   ```java
   int[] arr = {1, 2, 3};
   System.out.println(arr.length());  // ❌ Error: length is a field, not method
   System.out.println(arr.length);    // ✅ Correct
   ```

4. **Off-by-one errors**
   ```java
   int[] arr = {1, 2, 3, 4, 5};
   for (int i = 0; i <= arr.length; i++) {  // ❌ Will throw exception
       System.out.println(arr[i]);
   }
   for (int i = 0; i < arr.length; i++) {   // ✅ Correct
       System.out.println(arr[i]);
   }
   ```

5. **Modifying array in enhanced for loop**
   ```java
   int[] arr = {1, 2, 3};
   for (int num : arr) {
       num = num * 2;  // ❌ Doesn't modify the array
   }
   for (int i = 0; i < arr.length; i++) {
       arr[i] = arr[i] * 2;  // ✅ Modifies the array
   }
   ```

6. **Comparing arrays with ==**
   ```java
   int[] arr1 = {1, 2, 3};
   int[] arr2 = {1, 2, 3};
   if (arr1 == arr2) { }  // ❌ Compares references, not content
   if (Arrays.equals(arr1, arr2)) { }  // ✅ Compares content
   ```

## Next Steps

Once you complete these tasks, move on to `02-ArrayList` to learn about dynamic collections!

**Challenge**: Create a program that implements a simple bubble sort algorithm to sort an array of integers without using Arrays.sort(). Then, create another program that merges two sorted arrays into one sorted array.
