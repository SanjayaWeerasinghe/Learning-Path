# Advanced Sorting Algorithms

## Merge Sort

**Concept**: Divide and conquer - split array in half, sort each half, merge them.

```csharp
void MergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        MergeSort(arr, left, mid);
        MergeSort(arr, mid + 1, right);
        Merge(arr, left, mid, right);
    }
}

void Merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int[] L = new int[n1];
    int[] R = new int[n2];

    Array.Copy(arr, left, L, 0, n1);
    Array.Copy(arr, mid + 1, R, 0, n2);

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        }
        else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

// Initial call: MergeSort(arr, 0, arr.Length - 1);
```

- **Time Complexity**: O(n log n) all cases
- **Space Complexity**: O(n)
- **Stable**: Yes
- **Use Case**: Large datasets, linked lists, external sorting

## Quick Sort

**Concept**: Pick pivot, partition array (smaller left, larger right), recursively sort partitions.

```csharp
void QuickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = Partition(arr, low, high);

        QuickSort(arr, low, pivotIndex - 1);
        QuickSort(arr, pivotIndex + 1, high);
    }
}

int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            Swap(arr, i, j);
        }
    }

    Swap(arr, i + 1, high);
    return i + 1;
}

void Swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Initial call: QuickSort(arr, 0, arr.Length - 1);
```

- **Time Complexity**: O(n log n) average, O(n²) worst
- **Space Complexity**: O(log n) call stack
- **Stable**: No (can be made stable)
- **Use Case**: In-place sorting, good cache performance

### Optimized Quick Sort (Random Pivot)
```csharp
Random rand = new Random();

int RandomPartition(int[] arr, int low, int high) {
    int randomIndex = rand.Next(low, high + 1);
    Swap(arr, randomIndex, high);
    return Partition(arr, low, high);
}
```

## Heap Sort

**Concept**: Build max heap, repeatedly extract max and place at end.

```csharp
void HeapSort(int[] arr) {
    int n = arr.Length;

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        Heapify(arr, n, i);
    }

    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        Swap(arr, 0, i);
        Heapify(arr, i, 0);
    }
}

void Heapify(int[] arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        Swap(arr, i, largest);
        Heapify(arr, n, largest);
    }
}
```

- **Time Complexity**: O(n log n) all cases
- **Space Complexity**: O(1)
- **Stable**: No
- **Use Case**: Memory constrained, guaranteed O(n log n)

## Counting Sort

**Concept**: Count occurrences, calculate positions. Works for integers in limited range.

```csharp
void CountingSort(int[] arr) {
    if (arr.Length == 0) return;

    int max = arr.Max();
    int min = arr.Min();
    int range = max - min + 1;

    int[] count = new int[range];
    int[] output = new int[arr.Length];

    // Count occurrences
    for (int i = 0; i < arr.Length; i++) {
        count[arr[i] - min]++;
    }

    // Calculate cumulative count
    for (int i = 1; i < count.Length; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (int i = arr.Length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    // Copy to original array
    for (int i = 0; i < arr.Length; i++) {
        arr[i] = output[i];
    }
}
```

- **Time Complexity**: O(n + k) where k is range
- **Space Complexity**: O(n + k)
- **Stable**: Yes
- **Use Case**: Small range of integers, duplicate values

## Radix Sort

**Concept**: Sort digit by digit using counting sort as subroutine.

```csharp
void RadixSort(int[] arr) {
    int max = arr.Max();

    // Sort by each digit
    for (int exp = 1; max / exp > 0; exp *= 10) {
        CountingSortByDigit(arr, exp);
    }
}

void CountingSortByDigit(int[] arr, int exp) {
    int n = arr.Length;
    int[] output = new int[n];
    int[] count = new int[10];

    // Count occurrences
    for (int i = 0; i < n; i++) {
        count[(arr[i] / exp) % 10]++;
    }

    // Cumulative count
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Copy back
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
```

- **Time Complexity**: O(d * (n + k)) where d is digits, k is base
- **Space Complexity**: O(n + k)
- **Stable**: Yes
- **Use Case**: Fixed-length integers, strings

## Bucket Sort

**Concept**: Distribute elements into buckets, sort each bucket, concatenate.

```csharp
void BucketSort(float[] arr) {
    int n = arr.Length;
    List<float>[] buckets = new List<float>[n];

    for (int i = 0; i < n; i++) {
        buckets[i] = new List<float>();
    }

    // Distribute into buckets
    for (int i = 0; i < n; i++) {
        int bucketIndex = (int)(arr[i] * n);
        buckets[bucketIndex].Add(arr[i]);
    }

    // Sort individual buckets
    for (int i = 0; i < n; i++) {
        buckets[i].Sort();
    }

    // Concatenate
    int index = 0;
    for (int i = 0; i < n; i++) {
        foreach (float val in buckets[i]) {
            arr[index++] = val;
        }
    }
}
```

- **Time Complexity**: O(n + k) average, O(n²) worst
- **Space Complexity**: O(n + k)
- **Stable**: Yes (if underlying sort is stable)
- **Use Case**: Uniformly distributed data

## Comparison Table

| Algorithm | Best | Average | Worst | Space | Stable | In-Place | Notes |
|-----------|------|---------|-------|-------|--------|----------|-------|
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No | Guaranteed performance |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes | Fast in practice |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes | No extra space |
| Counting Sort | O(n + k) | O(n + k) | O(n + k) | O(k) | Yes | No | Limited range |
| Radix Sort | O(d(n + k)) | O(d(n + k)) | O(d(n + k)) | O(n + k) | Yes | No | Fixed digits |
| Bucket Sort | O(n + k) | O(n + k) | O(n²) | O(n) | Yes | No | Uniform distribution |

## When to Use Each?

### Merge Sort
- Need stable sort
- Linked lists (O(1) space)
- External sorting (large data)
- Guaranteed O(n log n)

### Quick Sort
- Average case performance important
- In-place sorting needed
- Random/unpredictable data
- Default choice for primitives

### Heap Sort
- Space is critical (O(1))
- Guaranteed O(n log n)
- Priority queue operations

### Counting Sort
- Small range integers
- Many duplicates
- Need linear time

### Radix Sort
- Fixed-length integers
- Large n, small digit count
- String sorting

### Bucket Sort
- Uniformly distributed floats [0, 1)
- Known distribution

## Hybrid Sorting Algorithms

### Timsort (Python, Java)
- Merge Sort + Insertion Sort
- Identifies runs, merges efficiently
- O(n log n) worst, O(n) best

### Introsort (C++ STL)
- Quick Sort + Heap Sort + Insertion Sort
- Switches to Heap Sort if recursion depth exceeds limit
- O(n log n) guaranteed

## Interview Tips

- **Know complexities**: Time and space for each
- **Stability matters**: For sorting objects by multiple keys
- **Ask about data**: Range, distribution, size
- **In-place vs Extra space**: Trade-off discussion
- **Comparison-based**: Can't be better than O(n log n)
- **Non-comparison**: Can achieve O(n) with constraints

## Common Interview Questions

1. Sort array of 0s, 1s, 2s → Counting Sort / Dutch Flag
2. Kth largest element → Quick Select
3. Merge k sorted arrays → Merge Sort / Heap
4. Sort nearly sorted array → Insertion Sort
5. External sorting → Merge Sort

## Practice Problems

1. Sort Colors (Dutch National Flag)
2. Wiggle Sort
3. Largest Number (custom comparator)
4. Sort Characters By Frequency
5. Top K Frequent Elements
6. Meeting Rooms II
7. Merge Intervals
8. Insert Interval
