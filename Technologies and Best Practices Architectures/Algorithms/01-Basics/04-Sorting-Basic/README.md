# Basic Sorting Algorithms

## Bubble Sort

**Concept**: Repeatedly swap adjacent elements if they're in wrong order.

```csharp
void BubbleSort(int[] arr) {
    int n = arr.Length;

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;

        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }

        // If no swap, array is sorted
        if (!swapped) break;
    }
}
```

- **Time Complexity**: O(n²) worst/avg, O(n) best (sorted)
- **Space Complexity**: O(1)
- **Stable**: Yes
- **Use Case**: Small datasets, nearly sorted data

## Selection Sort

**Concept**: Find minimum element and place it at the beginning.

```csharp
void SelectionSort(int[] arr) {
    int n = arr.Length;

    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;

        // Find minimum in unsorted part
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap minimum with first unsorted element
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
```

- **Time Complexity**: O(n²) all cases
- **Space Complexity**: O(1)
- **Stable**: No (can be made stable)
- **Use Case**: Small datasets, memory writes are expensive

## Insertion Sort

**Concept**: Build sorted array one element at a time, inserting each into correct position.

```csharp
void InsertionSort(int[] arr) {
    int n = arr.Length;

    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        // Shift elements greater than key to right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}
```

- **Time Complexity**: O(n²) worst/avg, O(n) best (sorted)
- **Space Complexity**: O(1)
- **Stable**: Yes
- **Use Case**: Small datasets, nearly sorted data, online sorting

## Comparison Table

| Algorithm | Best | Average | Worst | Space | Stable | Notes |
|-----------|------|---------|-------|-------|--------|-------|
| Bubble | O(n) | O(n²) | O(n²) | O(1) | Yes | Simple, inefficient |
| Selection | O(n²) | O(n²) | O(n²) | O(1) | No | Minimum swaps |
| Insertion | O(n) | O(n²) | O(n²) | O(1) | Yes | Good for small/sorted |

## When to Use Each?

### Bubble Sort
- Educational purposes
- Small datasets (< 10 elements)
- Nearly sorted data

### Selection Sort
- Memory writes are costly
- Small datasets
- Finding k smallest/largest elements

### Insertion Sort
- Small datasets (< 50 elements)
- Nearly sorted data
- Online algorithm (sort as data arrives)
- Part of more complex algorithms (Timsort, Introsort)

## Stability in Sorting

**Stable Sort**: Maintains relative order of equal elements.

```
Before: (4,a) (3,b) (4,c) (3,d)
After (Stable): (3,b) (3,d) (4,a) (4,c)
After (Unstable): (3,d) (3,b) (4,c) (4,a)
```

Stable: Bubble, Insertion
Unstable: Selection (standard implementation)

## Complete Sorting Example

```csharp
class SortingDemo {
    static void Main() {
        int[] arr = { 64, 34, 25, 12, 22, 11, 90 };

        Console.WriteLine("Original: " + string.Join(", ", arr));

        // Choose sorting algorithm
        InsertionSort(arr);

        Console.WriteLine("Sorted: " + string.Join(", ", arr));
    }

    static void InsertionSort(int[] arr) {
        for (int i = 1; i < arr.Length; i++) {
            int key = arr[i];
            int j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}
```

## Visualization

### Bubble Sort Steps
```
[5, 1, 4, 2, 8]
[1, 5, 4, 2, 8]  // 5 and 1 swap
[1, 4, 5, 2, 8]  // 5 and 4 swap
[1, 4, 2, 5, 8]  // 5 and 2 swap
...
[1, 2, 4, 5, 8]  // Sorted
```

### Selection Sort Steps
```
[5, 1, 4, 2, 8]
[1, 5, 4, 2, 8]  // Select min (1), swap with first
[1, 2, 4, 5, 8]  // Select min (2), swap with second
...
[1, 2, 4, 5, 8]  // Sorted
```

### Insertion Sort Steps
```
[5, 1, 4, 2, 8]
[1, 5, 4, 2, 8]  // Insert 1 in correct position
[1, 4, 5, 2, 8]  // Insert 4 in correct position
[1, 2, 4, 5, 8]  // Insert 2 in correct position
...
[1, 2, 4, 5, 8]  // Sorted
```

## Interview Tips

- Know time/space complexity of each algorithm
- Understand when each is useful
- Be able to implement from scratch
- Know what "stable" means
- For production: Use built-in sort (Array.Sort() in C#)
- For interviews: Know how to implement basics

## Practice Problems

1. Implement all three sorting algorithms
2. Sort array of 0s, 1s, and 2s (Dutch National Flag)
3. Sort colors (similar to above)
4. Kth largest element
5. Meeting rooms / Interval scheduling
