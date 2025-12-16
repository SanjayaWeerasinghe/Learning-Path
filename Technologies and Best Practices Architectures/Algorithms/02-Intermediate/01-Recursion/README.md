# Recursion

## What is Recursion?

A function that **calls itself** to solve a problem by breaking it into smaller subproblems.

## Key Components

1. **Base Case**: Condition to stop recursion
2. **Recursive Case**: Function calls itself with modified input
3. **Progress**: Each call moves toward base case

## Basic Examples

### Factorial
```csharp
int Factorial(int n) {
    // Base case
    if (n <= 1) return 1;

    // Recursive case
    return n * Factorial(n - 1);
}

// Factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
```

### Fibonacci
```csharp
int Fibonacci(int n) {
    // Base cases
    if (n <= 1) return n;

    // Recursive case
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// Fib(5) = Fib(4) + Fib(3) = 5
```

### Sum of Array
```csharp
int SumArray(int[] arr, int index) {
    // Base case
    if (index >= arr.Length) return 0;

    // Recursive case
    return arr[index] + SumArray(arr, index + 1);
}
```

## Common Recursion Patterns

### 1. Linear Recursion (Single Call)
```csharp
void PrintNumbers(int n) {
    if (n <= 0) return;
    Console.WriteLine(n);
    PrintNumbers(n - 1);
}
```

### 2. Binary Recursion (Two Calls)
```csharp
int Fibonacci(int n) {
    if (n <= 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);  // Two calls
}
```

### 3. Tail Recursion (Last Operation)
```csharp
int FactorialTail(int n, int accumulator = 1) {
    if (n <= 1) return accumulator;
    return FactorialTail(n - 1, n * accumulator);
}
// Can be optimized to iteration by compiler
```

### 4. Multiple Recursion
```csharp
void TowerOfHanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        Console.WriteLine($"Move disk 1 from {from} to {to}");
        return;
    }
    TowerOfHanoi(n - 1, from, aux, to);
    Console.WriteLine($"Move disk {n} from {from} to {to}");
    TowerOfHanoi(n - 1, aux, to, from);
}
```

## Common Problems

### Power (x^n)
```csharp
double Power(double x, int n) {
    if (n == 0) return 1;
    if (n < 0) return 1 / Power(x, -n);

    // Optimize: x^n = (x^2)^(n/2)
    double half = Power(x, n / 2);
    if (n % 2 == 0)
        return half * half;
    else
        return x * half * half;
}
// Time: O(log n)
```

### Reverse String
```csharp
string ReverseString(string s) {
    if (s.Length <= 1) return s;
    return ReverseString(s.Substring(1)) + s[0];
}

// "hello" -> "o" + "l" + "l" + "e" + "h" = "olleh"
```

### Check Palindrome
```csharp
bool IsPalindrome(string s, int left, int right) {
    if (left >= right) return true;
    if (s[left] != s[right]) return false;
    return IsPalindrome(s, left + 1, right - 1);
}
```

### Generate Parentheses
```csharp
List<string> GenerateParentheses(int n) {
    List<string> result = new List<string>();
    Backtrack(result, "", 0, 0, n);
    return result;
}

void Backtrack(List<string> result, string current, int open, int close, int max) {
    if (current.Length == max * 2) {
        result.Add(current);
        return;
    }

    if (open < max)
        Backtrack(result, current + "(", open + 1, close, max);
    if (close < open)
        Backtrack(result, current + ")", open, close + 1, max);
}
```

### Permutations
```csharp
List<List<int>> Permute(int[] nums) {
    List<List<int>> result = new List<List<int>>();
    Backtrack(result, new List<int>(), nums);
    return result;
}

void Backtrack(List<List<int>> result, List<int> tempList, int[] nums) {
    if (tempList.Count == nums.Length) {
        result.Add(new List<int>(tempList));
        return;
    }

    for (int i = 0; i < nums.Length; i++) {
        if (tempList.Contains(nums[i])) continue;
        tempList.Add(nums[i]);
        Backtrack(result, tempList, nums);
        tempList.RemoveAt(tempList.Count - 1);  // Backtrack
    }
}
```

### Subsets
```csharp
List<List<int>> Subsets(int[] nums) {
    List<List<int>> result = new List<List<int>>();
    Backtrack(result, new List<int>(), nums, 0);
    return result;
}

void Backtrack(List<List<int>> result, List<int> tempList, int[] nums, int start) {
    result.Add(new List<int>(tempList));

    for (int i = start; i < nums.Length; i++) {
        tempList.Add(nums[i]);
        Backtrack(result, tempList, nums, i + 1);
        tempList.RemoveAt(tempList.Count - 1);
    }
}
```

## Recursion vs Iteration

| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Code | Cleaner, elegant | More verbose |
| Memory | O(n) call stack | O(1) typically |
| Speed | Slower (overhead) | Faster |
| Use | Tree/graph, divide & conquer | Simple loops |

### Converting Recursion to Iteration
```csharp
// Recursive
int FactorialRec(int n) {
    if (n <= 1) return 1;
    return n * FactorialRec(n - 1);
}

// Iterative
int FactorialIter(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

## Memoization (Optimizing Recursion)

```csharp
// Without memoization: O(2^n)
int FibSlow(int n) {
    if (n <= 1) return n;
    return FibSlow(n - 1) + FibSlow(n - 2);
}

// With memoization: O(n)
Dictionary<int, int> memo = new Dictionary<int, int>();

int FibFast(int n) {
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n];

    memo[n] = FibFast(n - 1) + FibFast(n - 2);
    return memo[n];
}
```

## Call Stack Visualization

```
Factorial(3)
  ├─ 3 * Factorial(2)
        ├─ 2 * Factorial(1)
              ├─ return 1
        ├─ return 2 * 1 = 2
  ├─ return 3 * 2 = 6
```

## Common Pitfalls

1. **Missing Base Case**: Infinite recursion, stack overflow
2. **Wrong Base Case**: Incorrect results
3. **Not Progressing**: Input doesn't move toward base case
4. **Stack Overflow**: Too many recursive calls (use iteration or memoization)

## Interview Tips

- Always identify base case first
- Draw recursion tree for complex problems
- Consider memoization for overlapping subproblems
- Know when to use recursion vs iteration
- Watch for stack overflow with large inputs
- Practice backtracking problems

## Practice Problems

1. Climbing Stairs
2. Letter Combinations of Phone Number
3. Word Search (2D grid)
4. N-Queens Problem
5. Combination Sum
6. Binary Tree problems (most use recursion)
