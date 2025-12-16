# Searching Algorithms

## Linear Search

**Concept**: Check each element sequentially until target is found.

```csharp
int LinearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.Length; i++) {
        if (arr[i] == target) {
            return i;  // Return index
        }
    }
    return -1;  // Not found
}
```

- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Use Case**: Unsorted arrays, small datasets

## Binary Search

**Concept**: Divide and conquer on **sorted** arrays. Compare middle element and eliminate half.

### Iterative Approach
```csharp
int BinarySearch(int[] arr, int target) {
    int left = 0;
    int right = arr.Length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow

        if (arr[mid] == target) {
            return mid;
        }
        else if (arr[mid] < target) {
            left = mid + 1;  // Search right half
        }
        else {
            right = mid - 1;  // Search left half
        }
    }
    return -1;
}
```

### Recursive Approach
```csharp
int BinarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;

    int mid = left + (right - left) / 2;

    if (arr[mid] == target) return mid;
    if (arr[mid] < target)
        return BinarySearchRecursive(arr, target, mid + 1, right);
    return BinarySearchRecursive(arr, target, left, mid - 1);
}
```

- **Time Complexity**: O(log n)
- **Space Complexity**: O(1) iterative, O(log n) recursive (call stack)
- **Requirement**: Array must be sorted

## Binary Search Variations

### Find First Occurrence
```csharp
int FindFirst(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    int result = -1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            result = mid;
            right = mid - 1;  // Continue searching left
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return result;
}
```

### Find Last Occurrence
```csharp
int FindLast(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    int result = -1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) {
            result = mid;
            left = mid + 1;  // Continue searching right
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return result;
}
```

### Search in Rotated Sorted Array
```csharp
int SearchRotated(int[] nums, int target) {
    int left = 0, right = nums.Length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) return mid;

        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {  // Left half is sorted
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        else {  // Right half is sorted
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
```

### Find Peak Element
```csharp
int FindPeakElement(int[] nums) {
    int left = 0, right = nums.Length - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;  // Peak is on right
        }
        else {
            right = mid;  // Peak is on left or at mid
        }
    }
    return left;
}
```

### Square Root (Integer)
```csharp
int MySqrt(int x) {
    if (x < 2) return x;

    int left = 2, right = x / 2;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        long num = (long)mid * mid;

        if (num == x) return mid;
        if (num < x) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return right;
}
```

## Jump Search

**Concept**: Jump ahead by fixed steps, then linear search in the block.

```csharp
int JumpSearch(int[] arr, int target) {
    int n = arr.Length;
    int step = (int)Math.Sqrt(n);
    int prev = 0;

    // Jump to find block
    while (arr[Math.Min(step, n) - 1] < target) {
        prev = step;
        step += (int)Math.Sqrt(n);
        if (prev >= n) return -1;
    }

    // Linear search in block
    while (arr[prev] < target) {
        prev++;
        if (prev == Math.Min(step, n)) return -1;
    }

    if (arr[prev] == target) return prev;
    return -1;
}
```

- **Time Complexity**: O(√n)
- **Space Complexity**: O(1)

## Comparison Table

| Algorithm | Time (Best) | Time (Avg) | Time (Worst) | Space | Requirement |
|-----------|-------------|------------|--------------|-------|-------------|
| Linear | O(1) | O(n) | O(n) | O(1) | None |
| Binary | O(1) | O(log n) | O(log n) | O(1) | Sorted |
| Jump | O(1) | O(√n) | O(√n) | O(1) | Sorted |

## Interview Tips

- **Always ask**: Is the array sorted?
- **Binary Search**: Remember `mid = left + (right - left) / 2`
- **Edge Cases**: Empty array, single element, target not present
- **Variations**: First/last occurrence, rotated array, 2D matrix
- If you need O(log n), think Binary Search

## Practice Problems

1. Search Insert Position
2. Find minimum in rotated sorted array
3. Search in 2D matrix
4. Find K closest elements
5. Capacity to ship packages within D days
