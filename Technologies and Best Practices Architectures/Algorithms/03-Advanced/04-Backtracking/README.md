# Backtracking

## What is Backtracking?

A technique to solve problems by **trying all possibilities** and **undoing (backtracking)** when a choice doesn't lead to a solution. Think of it as exploring a decision tree.

## Backtracking Template

```csharp
void Backtrack(result, currentState, choices) {
    // Base case
    if (isValidSolution(currentState)) {
        result.Add(copy of currentState);
        return;
    }

    foreach (choice in choices) {
        // Make choice
        currentState.Add(choice);

        // Recurse
        Backtrack(result, currentState, newChoices);

        // Undo choice (backtrack)
        currentState.RemoveAt(currentState.Count - 1);
    }
}
```

## Core Concepts

1. **Choice**: What decision to make?
2. **Constraint**: When is a choice valid?
3. **Goal**: When have we found a solution?
4. **Backtrack**: Undo the last choice

## Classic Problems

### 1. Subsets
```csharp
IList<IList<int>> Subsets(int[] nums) {
    List<IList<int>> result = new List<IList<int>>();
    Backtrack(result, new List<int>(), nums, 0);
    return result;
}

void Backtrack(List<IList<int>> result, List<int> current, int[] nums, int start) {
    result.Add(new List<int>(current));  // Every state is a solution

    for (int i = start; i < nums.Length; i++) {
        current.Add(nums[i]);              // Choose
        Backtrack(result, current, nums, i + 1);  // Explore
        current.RemoveAt(current.Count - 1);      // Unchoose
    }
}

// Time: O(2^n), Space: O(n) recursion depth
```

### 2. Permutations
```csharp
IList<IList<int>> Permute(int[] nums) {
    List<IList<int>> result = new List<IList<int>>();
    Backtrack(result, new List<int>(), nums);
    return result;
}

void Backtrack(List<IList<int>> result, List<int> current, int[] nums) {
    if (current.Count == nums.Length) {
        result.Add(new List<int>(current));
        return;
    }

    for (int i = 0; i < nums.Length; i++) {
        if (current.Contains(nums[i])) continue;  // Skip used elements

        current.Add(nums[i]);
        Backtrack(result, current, nums);
        current.RemoveAt(current.Count - 1);
    }
}

// Time: O(n!), Space: O(n)
```

### 3. Combinations
```csharp
IList<IList<int>> Combine(int n, int k) {
    List<IList<int>> result = new List<IList<int>>();
    Backtrack(result, new List<int>(), n, k, 1);
    return result;
}

void Backtrack(List<IList<int>> result, List<int> current, int n, int k, int start) {
    if (current.Count == k) {
        result.Add(new List<int>(current));
        return;
    }

    for (int i = start; i <= n; i++) {
        current.Add(i);
        Backtrack(result, current, n, k, i + 1);
        current.RemoveAt(current.Count - 1);
    }
}

// Time: O(C(n,k) * k), Space: O(k)
```

### 4. Combination Sum
```csharp
// Can use same number multiple times
IList<IList<int>> CombinationSum(int[] candidates, int target) {
    List<IList<int>> result = new List<IList<int>>();
    Array.Sort(candidates);
    Backtrack(result, new List<int>(), candidates, target, 0);
    return result;
}

void Backtrack(List<IList<int>> result, List<int> current, int[] candidates, int remain, int start) {
    if (remain < 0) return;  // Exceeded target
    if (remain == 0) {
        result.Add(new List<int>(current));
        return;
    }

    for (int i = start; i < candidates.Length; i++) {
        current.Add(candidates[i]);
        Backtrack(result, current, candidates, remain - candidates[i], i);  // Can reuse
        current.RemoveAt(current.Count - 1);
    }
}
```

### 5. Letter Combinations of Phone Number
```csharp
IList<string> LetterCombinations(string digits) {
    if (digits.Length == 0) return new List<string>();

    string[] letters = { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };
    List<string> result = new List<string>();

    Backtrack(result, new StringBuilder(), digits, letters, 0);
    return result;
}

void Backtrack(List<string> result, StringBuilder current, string digits, string[] letters, int index) {
    if (index == digits.Length) {
        result.Add(current.ToString());
        return;
    }

    string possibleLetters = letters[digits[index] - '0'];

    foreach (char c in possibleLetters) {
        current.Append(c);
        Backtrack(result, current, digits, letters, index + 1);
        current.Remove(current.Length - 1, 1);
    }
}
```

### 6. Palindrome Partitioning
```csharp
IList<IList<string>> Partition(string s) {
    List<IList<string>> result = new List<IList<string>>();
    Backtrack(result, new List<string>(), s, 0);
    return result;
}

void Backtrack(List<IList<string>> result, List<string> current, string s, int start) {
    if (start == s.Length) {
        result.Add(new List<string>(current));
        return;
    }

    for (int i = start; i < s.Length; i++) {
        if (IsPalindrome(s, start, i)) {
            current.Add(s.Substring(start, i - start + 1));
            Backtrack(result, current, s, i + 1);
            current.RemoveAt(current.Count - 1);
        }
    }
}

bool IsPalindrome(string s, int left, int right) {
    while (left < right) {
        if (s[left++] != s[right--]) return false;
    }
    return true;
}
```

## Board/Grid Problems

### 7. N-Queens
```csharp
IList<IList<string>> SolveNQueens(int n) {
    List<IList<string>> result = new List<IList<string>>();
    char[][] board = new char[n][];

    for (int i = 0; i < n; i++) {
        board[i] = new string('.', n).ToCharArray();
    }

    Backtrack(result, board, 0);
    return result;
}

void Backtrack(List<IList<string>> result, char[][] board, int row) {
    if (row == board.Length) {
        result.Add(board.Select(r => new string(r)).ToList());
        return;
    }

    for (int col = 0; col < board.Length; col++) {
        if (IsValid(board, row, col)) {
            board[row][col] = 'Q';
            Backtrack(result, board, row + 1);
            board[row][col] = '.';
        }
    }
}

bool IsValid(char[][] board, int row, int col) {
    int n = board.Length;

    // Check column
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') return false;
    }

    // Check diagonal (top-left)
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') return false;
    }

    // Check diagonal (top-right)
    for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] == 'Q') return false;
    }

    return true;
}
```

### 8. Sudoku Solver
```csharp
void SolveSudoku(char[][] board) {
    Solve(board);
}

bool Solve(char[][] board) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == '.') {
                for (char c = '1'; c <= '9'; c++) {
                    if (IsValidSudoku(board, row, col, c)) {
                        board[row][col] = c;

                        if (Solve(board)) return true;

                        board[row][col] = '.';  // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

bool IsValidSudoku(char[][] board, int row, int col, char c) {
    for (int i = 0; i < 9; i++) {
        // Check row
        if (board[row][i] == c) return false;
        // Check column
        if (board[i][col] == c) return false;
        // Check 3x3 box
        if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
    }
    return true;
}
```

### 9. Word Search
```csharp
bool Exist(char[][] board, string word) {
    int m = board.Length, n = board[0].Length;

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (Backtrack(board, word, i, j, 0)) {
                return true;
            }
        }
    }
    return false;
}

bool Backtrack(char[][] board, string word, int i, int j, int index) {
    if (index == word.Length) return true;
    if (i < 0 || i >= board.Length || j < 0 || j >= board[0].Length) return false;
    if (board[i][j] != word[index]) return false;

    char temp = board[i][j];
    board[i][j] = '#';  // Mark as visited

    bool found = Backtrack(board, word, i + 1, j, index + 1) ||
                 Backtrack(board, word, i - 1, j, index + 1) ||
                 Backtrack(board, word, i, j + 1, index + 1) ||
                 Backtrack(board, word, i, j - 1, index + 1);

    board[i][j] = temp;  // Restore

    return found;
}
```

### 10. Generate Parentheses
```csharp
IList<string> GenerateParenthesis(int n) {
    List<string> result = new List<string>();
    Backtrack(result, new StringBuilder(), 0, 0, n);
    return result;
}

void Backtrack(List<string> result, StringBuilder current, int open, int close, int max) {
    if (current.Length == max * 2) {
        result.Add(current.ToString());
        return;
    }

    if (open < max) {
        current.Append('(');
        Backtrack(result, current, open + 1, close, max);
        current.Remove(current.Length - 1, 1);
    }

    if (close < open) {
        current.Append(')');
        Backtrack(result, current, open, close + 1, max);
        current.Remove(current.Length - 1, 1);
    }
}
```

## Optimization Techniques

### 1. Pruning
```csharp
// Skip invalid branches early
if (remain < 0) return;  // Don't explore further
```

### 2. Sorting for Early Termination
```csharp
Array.Sort(candidates);
for (int i = start; i < candidates.Length; i++) {
    if (candidates[i] > remain) break;  // No point continuing
    // ...
}
```

### 3. Memoization (with state)
```csharp
Dictionary<string, bool> memo = new Dictionary<string, bool>();

bool Backtrack(string state, ...) {
    if (memo.ContainsKey(state)) return memo[state];
    // ... backtrack logic
    memo[state] = result;
    return result;
}
```

## Backtracking vs Other Techniques

| Technique | Use Case | Example |
|-----------|----------|---------|
| Backtracking | Generate all solutions | Permutations, N-Queens |
| Greedy | One optimal solution | Activity Selection |
| DP | Overlapping subproblems | Fibonacci, Knapsack |
| DFS/BFS | Graph traversal | Shortest Path |

## Time Complexity Patterns

- **Subsets**: O(2^n)
- **Permutations**: O(n!)
- **Combinations**: O(C(n,k))
- **String partitioning**: O(2^n) worst case

## Interview Tips

- **Identify backtracking**: "All possible", "find all", "generate all"
- **Start with brute force**: Then optimize with pruning
- **Use StringBuilder**: For string concatenation in loops
- **Mark and unmark**: For visited cells in grid problems
- **Base case first**: Check termination condition
- **Draw recursion tree**: Helps visualize choices

## Common Patterns

1. **Subset/Combination**: Start index to avoid duplicates
2. **Permutation**: Track used elements
3. **Grid exploration**: Mark visited, restore after
4. **Constraint checking**: Validate before recursing

## Avoiding Duplicates

```csharp
// For arrays with duplicates
Array.Sort(nums);
for (int i = start; i < nums.Length; i++) {
    if (i > start && nums[i] == nums[i - 1]) continue;  // Skip duplicates
    // ... backtrack
}
```

## Practice Problems

1. Subsets II (with duplicates)
2. Permutations II (with duplicates)
3. Combination Sum II
4. IP Address Restoration
5. Letter Case Permutation
6. Beautiful Arrangement
7. Matchsticks to Square
8. Partition to K Equal Sum Subsets
9. Expression Add Operators
10. Word Break II
