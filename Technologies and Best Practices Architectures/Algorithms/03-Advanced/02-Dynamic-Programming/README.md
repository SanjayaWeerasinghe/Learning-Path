# Dynamic Programming (DP)

## What is Dynamic Programming?

An optimization technique that solves complex problems by breaking them into **overlapping subproblems** and storing results to avoid redundant computation.

## Key Characteristics

1. **Overlapping Subproblems**: Same subproblems solved multiple times
2. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems

## DP Approaches

### 1. Top-Down (Memoization)
Recursive approach with caching.

### 2. Bottom-Up (Tabulation)
Iterative approach filling a table.

## Classic DP Problems

### 1. Fibonacci
```csharp
// Top-Down (Memoization)
Dictionary<int, int> memo = new Dictionary<int, int>();

int FibMemo(int n) {
    if (n <= 1) return n;
    if (memo.ContainsKey(n)) return memo[n];

    memo[n] = FibMemo(n - 1) + FibMemo(n - 2);
    return memo[n];
}

// Bottom-Up (Tabulation)
int FibTab(int n) {
    if (n <= 1) return n;

    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Space Optimized
int FibOptimized(int n) {
    if (n <= 1) return n;

    int prev2 = 0, prev1 = 1;

    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}
```

### 2. Climbing Stairs
```csharp
// Can climb 1 or 2 steps at a time
int ClimbStairs(int n) {
    if (n <= 2) return n;

    int prev2 = 1, prev1 = 2;

    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

// Time: O(n), Space: O(1)
```

### 3. House Robber
```csharp
// Can't rob adjacent houses
int Rob(int[] nums) {
    if (nums.Length == 0) return 0;
    if (nums.Length == 1) return nums[0];

    int prev2 = 0, prev1 = 0;

    foreach (int num in nums) {
        int curr = Math.Max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }

    return prev1;
}

// Time: O(n), Space: O(1)
```

### 4. Coin Change (Minimum Coins)
```csharp
int CoinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);
    dp[0] = 0;

    for (int i = 1; i <= amount; i++) {
        foreach (int coin in coins) {
            if (i - coin >= 0) {
                dp[i] = Math.Min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}

// Time: O(amount * coins), Space: O(amount)
```

### 5. Longest Increasing Subsequence (LIS)
```csharp
int LengthOfLIS(int[] nums) {
    if (nums.Length == 0) return 0;

    int[] dp = new int[nums.Length];
    Array.Fill(dp, 1);
    int maxLen = 1;

    for (int i = 1; i < nums.Length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.Max(dp[i], dp[j] + 1);
            }
        }
        maxLen = Math.Max(maxLen, dp[i]);
    }

    return maxLen;
}

// Time: O(n²), Space: O(n)
// Optimized: O(n log n) using binary search
```

## 0/1 Knapsack Pattern

### Classic Knapsack
```csharp
int Knapsack(int[] weights, int[] values, int W) {
    int n = weights.Length;
    int[,] dp = new int[n + 1, W + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (weights[i - 1] <= w) {
                dp[i, w] = Math.Max(
                    dp[i - 1, w],  // Don't take
                    dp[i - 1, w - weights[i - 1]] + values[i - 1]  // Take
                );
            }
            else {
                dp[i, w] = dp[i - 1, w];
            }
        }
    }

    return dp[n, W];
}

// Time: O(n * W), Space: O(n * W)
```

### Subset Sum
```csharp
bool CanPartition(int[] nums) {
    int sum = nums.Sum();
    if (sum % 2 != 0) return false;

    int target = sum / 2;
    bool[] dp = new bool[target + 1];
    dp[0] = true;

    foreach (int num in nums) {
        for (int i = target; i >= num; i--) {
            dp[i] = dp[i] || dp[i - num];
        }
    }

    return dp[target];
}

// Time: O(n * sum), Space: O(sum)
```

### Target Sum
```csharp
int FindTargetSumWays(int[] nums, int target) {
    int sum = nums.Sum();
    if (Math.Abs(target) > sum || (sum + target) % 2 != 0) return 0;

    int subsetSum = (sum + target) / 2;
    int[] dp = new int[subsetSum + 1];
    dp[0] = 1;

    foreach (int num in nums) {
        for (int i = subsetSum; i >= num; i--) {
            dp[i] += dp[i - num];
        }
    }

    return dp[subsetSum];
}
```

## String DP

### Longest Common Subsequence (LCS)
```csharp
int LongestCommonSubsequence(string text1, string text2) {
    int m = text1.Length, n = text2.Length;
    int[,] dp = new int[m + 1, n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i, j] = dp[i - 1, j - 1] + 1;
            }
            else {
                dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }
    }

    return dp[m, n];
}

// Time: O(m * n), Space: O(m * n)
```

### Edit Distance
```csharp
int MinDistance(string word1, string word2) {
    int m = word1.Length, n = word2.Length;
    int[,] dp = new int[m + 1, n + 1];

    // Base cases
    for (int i = 0; i <= m; i++) dp[i, 0] = i;
    for (int j = 0; j <= n; j++) dp[0, j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i, j] = dp[i - 1, j - 1];
            }
            else {
                dp[i, j] = 1 + Math.Min(
                    dp[i - 1, j],      // Delete
                    Math.Min(
                        dp[i, j - 1],  // Insert
                        dp[i - 1, j - 1]  // Replace
                    )
                );
            }
        }
    }

    return dp[m, n];
}
```

### Longest Palindromic Subsequence
```csharp
int LongestPalindromeSubseq(string s) {
    int n = s.Length;
    int[,] dp = new int[n, n];

    for (int i = n - 1; i >= 0; i--) {
        dp[i, i] = 1;
        for (int j = i + 1; j < n; j++) {
            if (s[i] == s[j]) {
                dp[i, j] = dp[i + 1, j - 1] + 2;
            }
            else {
                dp[i, j] = Math.Max(dp[i + 1, j], dp[i, j - 1]);
            }
        }
    }

    return dp[0, n - 1];
}
```

### Palindrome Partitioning II (Min Cuts)
```csharp
int MinCut(string s) {
    int n = s.Length;
    int[] dp = new int[n];
    bool[,] isPalin = new bool[n, n];

    for (int i = 0; i < n; i++) {
        dp[i] = i;  // Max cuts
        for (int j = 0; j <= i; j++) {
            if (s[i] == s[j] && (i - j <= 1 || isPalin[j + 1, i - 1])) {
                isPalin[j, i] = true;
                dp[i] = j == 0 ? 0 : Math.Min(dp[i], dp[j - 1] + 1);
            }
        }
    }

    return dp[n - 1];
}
```

## Matrix DP

### Unique Paths
```csharp
int UniquePaths(int m, int n) {
    int[,] dp = new int[m, n];

    for (int i = 0; i < m; i++) dp[i, 0] = 1;
    for (int j = 0; j < n; j++) dp[0, j] = 1;

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i, j] = dp[i - 1, j] + dp[i, j - 1];
        }
    }

    return dp[m - 1, n - 1];
}
```

### Minimum Path Sum
```csharp
int MinPathSum(int[][] grid) {
    int m = grid.Length, n = grid[0].Length;

    for (int i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }
    for (int j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }

    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            grid[i][j] += Math.Min(grid[i - 1][j], grid[i][j - 1]);
        }
    }

    return grid[m - 1][n - 1];
}
```

### Maximal Square
```csharp
int MaximalSquare(char[][] matrix) {
    if (matrix.Length == 0) return 0;

    int m = matrix.Length, n = matrix[0].Length;
    int[,] dp = new int[m + 1, n + 1];
    int maxSide = 0;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (matrix[i - 1][j - 1] == '1') {
                dp[i, j] = Math.Min(
                    dp[i - 1, j],
                    Math.Min(dp[i, j - 1], dp[i - 1, j - 1])
                ) + 1;
                maxSide = Math.Max(maxSide, dp[i, j]);
            }
        }
    }

    return maxSide * maxSide;
}
```

## Advanced DP

### Longest Valid Parentheses
```csharp
int LongestValidParentheses(string s) {
    int n = s.Length;
    int[] dp = new int[n];
    int maxLen = 0;

    for (int i = 1; i < n; i++) {
        if (s[i] == ')') {
            if (s[i - 1] == '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            }
            else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == '(') {
                dp[i] = dp[i - 1] + 2 +
                        (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0);
            }
            maxLen = Math.Max(maxLen, dp[i]);
        }
    }

    return maxLen;
}
```

### Word Break
```csharp
bool WordBreak(string s, IList<string> wordDict) {
    HashSet<string> dict = new HashSet<string>(wordDict);
    bool[] dp = new bool[s.Length + 1];
    dp[0] = true;

    for (int i = 1; i <= s.Length; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.Contains(s.Substring(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.Length];
}
```

## DP Patterns Summary

1. **Linear DP**: Fibonacci, Climbing Stairs, House Robber
2. **Knapsack**: 0/1 Knapsack, Subset Sum, Partition Equal
3. **String DP**: LCS, Edit Distance, Palindrome
4. **Matrix DP**: Unique Paths, Min Path Sum
5. **Interval DP**: Burst Balloons, Palindrome Partitioning

## DP Strategy

1. **Define state**: What does dp[i] represent?
2. **Find recurrence**: How to compute dp[i] from previous states?
3. **Base cases**: What are initial values?
4. **Order**: In what order to fill the table?
5. **Answer**: Where is the final answer?

## Interview Tips

- **Identify DP**: Overlapping subproblems + optimal substructure
- **Start with recursion**: Then add memoization
- **Draw table**: Visualize the DP table
- **Space optimization**: Often can reduce from 2D to 1D
- **Common patterns**: Know knapsack, LCS, LIS patterns
- **Time/Space trade-off**: Discuss both approaches

## Practice Problems

1. Maximum Subarray (Kadane's)
2. Decode Ways
3. Unique Binary Search Trees
4. Interleaving String
5. Distinct Subsequences
6. Regular Expression Matching
7. Wildcard Matching
8. Best Time to Buy and Sell Stock (all variations)
9. Longest Increasing Path in Matrix
10. Burst Balloons
