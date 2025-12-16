# Arrays Basics

## What is an Array?

An array is a **contiguous block of memory** that stores elements of the same type, accessible by index.

## Array Operations

### Declaration and Initialization

```csharp
// Fixed size array
int[] arr1 = new int[5];  // [0, 0, 0, 0, 0]

// Initialize with values
int[] arr2 = { 1, 2, 3, 4, 5 };

// Multi-dimensional array
int[,] matrix = new int[3, 3];
```

### Common Operations

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| Access | O(1) | arr[i] |
| Search | O(n) | Linear search |
| Insert (end) | O(1) | If space available |
| Insert (middle) | O(n) | Shift elements |
| Delete | O(n) | Shift elements |
| Update | O(1) | arr[i] = value |

## Common Array Problems

### 1. Two Sum
```csharp
// Find two numbers that add up to target
int[] TwoSum(int[] nums, int target) {
    Dictionary<int, int> map = new Dictionary<int, int>();

    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (map.ContainsKey(complement)) {
            return new int[] { map[complement], i };
        }
        map[nums[i]] = i;
    }
    return new int[] { };
}
// Time: O(n), Space: O(n)
```

### 2. Reverse an Array
```csharp
void ReverseArray(int[] arr) {
    int left = 0, right = arr.Length - 1;

    while (left < right) {
        // Swap
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;

        left++;
        right--;
    }
}
// Time: O(n), Space: O(1)
```

### 3. Find Maximum Element
```csharp
int FindMax(int[] arr) {
    if (arr.Length == 0) throw new ArgumentException("Empty array");

    int max = arr[0];
    foreach (int num in arr) {
        if (num > max) max = num;
    }
    return max;
}
// Time: O(n), Space: O(1)
```

### 4. Rotate Array
```csharp
// Rotate array right by k positions
void RotateArray(int[] arr, int k) {
    k = k % arr.Length;  // Handle k > arr.Length

    Reverse(arr, 0, arr.Length - 1);
    Reverse(arr, 0, k - 1);
    Reverse(arr, k, arr.Length - 1);
}

void Reverse(int[] arr, int start, int end) {
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}
// Time: O(n), Space: O(1)
```

### 5. Remove Duplicates from Sorted Array
```csharp
int RemoveDuplicates(int[] nums) {
    if (nums.Length == 0) return 0;

    int i = 0;  // Slow pointer
    for (int j = 1; j < nums.Length; j++) {  // Fast pointer
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}
// Time: O(n), Space: O(1)
```

## Array Techniques

### Two Pointers
Used for: Reversing, finding pairs, removing duplicates
```csharp
int left = 0, right = arr.Length - 1;
while (left < right) {
    // Process
    left++;
    right--;
}
```

### Sliding Window
Used for: Subarrays, substrings
```csharp
int windowStart = 0;
for (int windowEnd = 0; windowEnd < arr.Length; windowEnd++) {
    // Add arr[windowEnd] to window
    while (/* window condition violated */) {
        // Remove arr[windowStart] from window
        windowStart++;
    }
}
```

### Kadane's Algorithm (Maximum Subarray)
```csharp
int MaxSubArray(int[] nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];

    for (int i = 1; i < nums.Length; i++) {
        maxEndingHere = Math.Max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = Math.Max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}
// Time: O(n), Space: O(1)
```

## Interview Tips

- Ask about array size and constraints
- Check for edge cases: empty array, single element
- Consider if array is sorted (enables binary search)
- Think about in-place vs. extra space solutions
- Two pointers and sliding window are common patterns

## Practice Problems

1. Find the second largest element
2. Move all zeros to the end
3. Merge two sorted arrays
4. Find missing number (1 to n)
5. Find majority element (appears > n/2 times)
