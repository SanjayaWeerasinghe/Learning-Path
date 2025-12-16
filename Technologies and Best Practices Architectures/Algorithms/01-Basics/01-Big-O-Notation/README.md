# Big-O Notation

## What is Big-O?

Big-O notation describes the **time complexity** and **space complexity** of algorithms - how they scale as input size grows.

## Common Time Complexities

### O(1) - Constant Time
```csharp
int GetFirstElement(int[] arr) {
    return arr[0];  // Always takes same time
}
```

### O(log n) - Logarithmic Time
```csharp
int BinarySearch(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
```

### O(n) - Linear Time
```csharp
int FindMax(int[] arr) {
    int max = arr[0];
    foreach (int num in arr) {  // Loop through all elements
        if (num > max) max = num;
    }
    return max;
}
```

### O(n log n) - Linearithmic Time
```csharp
void MergeSort(int[] arr) {
    // Efficient sorting algorithms like Merge Sort, Quick Sort
}
```

### O(n²) - Quadratic Time
```csharp
void BubbleSort(int[] arr) {
    for (int i = 0; i < arr.Length; i++) {
        for (int j = 0; j < arr.Length - 1; j++) {  // Nested loops
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
```

### O(2ⁿ) - Exponential Time
```csharp
int Fibonacci(int n) {
    if (n <= 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);  // Each call branches into 2
}
```

## Complexity Chart (Best to Worst)

```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
```

## Space Complexity

Measures memory usage:
- **O(1)**: Constant space (few variables)
- **O(n)**: Linear space (array/list proportional to input)
- **O(n²)**: Quadratic space (2D matrix)

## Rules for Calculating Big-O

1. **Drop constants**: O(2n) → O(n)
2. **Drop non-dominant terms**: O(n² + n) → O(n²)
3. **Different inputs = different variables**: O(a + b) or O(a * b)
4. **Nested loops multiply**: Two nested loops = O(n²)

## Interview Tips

- Always analyze both time and space complexity
- Mention best, average, and worst case when relevant
- Explain trade-offs between time and space
- Start with brute force, then optimize

## Practice Problems

1. What is the time complexity of accessing an element in a hash table?
2. What is the space complexity of creating a copy of an array?
3. How can you optimize an O(n²) solution to O(n)?
