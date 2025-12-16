# Greedy Algorithms

## What is a Greedy Algorithm?

Makes locally optimal choice at each step, hoping to find global optimum. **No backtracking** - once a choice is made, it's never reconsidered.

## When to Use Greedy?

- Problem has **greedy choice property**: Local optimum leads to global optimum
- Problem has **optimal substructure**
- Sorting often helps

⚠️ **Greedy doesn't always work!** Verify with proof or test cases.

## Classic Greedy Problems

### 1. Activity Selection / Meeting Rooms
```csharp
// Select maximum non-overlapping activities
int MaxActivities(int[] start, int[] end) {
    int n = start.Length;
    var activities = new List<(int start, int end)>();

    for (int i = 0; i < n; i++) {
        activities.Add((start[i], end[i]));
    }

    // Sort by end time (greedy choice)
    activities.Sort((a, b) => a.end.CompareTo(b.end));

    int count = 1;
    int lastEnd = activities[0].end;

    for (int i = 1; i < n; i++) {
        if (activities[i].start >= lastEnd) {
            count++;
            lastEnd = activities[i].end;
        }
    }

    return count;
}

// Time: O(n log n), Space: O(n)
```

### 2. Fractional Knapsack
```csharp
double FractionalKnapsack(int[] weights, int[] values, int capacity) {
    int n = weights.Length;
    var items = new List<(double ratio, int weight, int value)>();

    for (int i = 0; i < n; i++) {
        double ratio = (double)values[i] / weights[i];
        items.Add((ratio, weights[i], values[i]));
    }

    // Sort by value-to-weight ratio (greedy choice)
    items.Sort((a, b) => b.ratio.CompareTo(a.ratio));

    double totalValue = 0;
    int remaining = capacity;

    foreach (var (ratio, weight, value) in items) {
        if (remaining >= weight) {
            totalValue += value;
            remaining -= weight;
        }
        else {
            totalValue += ratio * remaining;
            break;
        }
    }

    return totalValue;
}
```

### 3. Jump Game
```csharp
// Can reach last index?
bool CanJump(int[] nums) {
    int maxReach = 0;

    for (int i = 0; i < nums.Length; i++) {
        if (i > maxReach) return false;  // Can't reach current position

        maxReach = Math.Max(maxReach, i + nums[i]);

        if (maxReach >= nums.Length - 1) return true;
    }

    return true;
}

// Time: O(n), Space: O(1)
```

### 4. Jump Game II (Minimum Jumps)
```csharp
int MinJumps(int[] nums) {
    int jumps = 0;
    int currentEnd = 0;
    int farthest = 0;

    for (int i = 0; i < nums.Length - 1; i++) {
        farthest = Math.Max(farthest, i + nums[i]);

        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }

    return jumps;
}

// Time: O(n), Space: O(1)
```

### 5. Gas Station
```csharp
int CanCompleteCircuit(int[] gas, int[] cost) {
    int totalGas = 0, totalCost = 0;
    int tank = 0, start = 0;

    for (int i = 0; i < gas.Length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
        tank += gas[i] - cost[i];

        if (tank < 0) {
            start = i + 1;  // Try next station
            tank = 0;
        }
    }

    return totalGas >= totalCost ? start : -1;
}

// Time: O(n), Space: O(1)
```

### 6. Task Scheduler
```csharp
int LeastInterval(char[] tasks, int n) {
    int[] freq = new int[26];

    foreach (char task in tasks) {
        freq[task - 'A']++;
    }

    Array.Sort(freq);
    int maxFreq = freq[25];
    int idleSlots = (maxFreq - 1) * n;

    for (int i = 24; i >= 0 && freq[i] > 0; i--) {
        idleSlots -= Math.Min(freq[i], maxFreq - 1);
    }

    return idleSlots > 0 ? idleSlots + tasks.Length : tasks.Length;
}

// Time: O(n), Space: O(1)
```

### 7. Partition Labels
```csharp
IList<int> PartitionLabels(string s) {
    int[] lastIndex = new int[26];

    // Record last occurrence of each character
    for (int i = 0; i < s.Length; i++) {
        lastIndex[s[i] - 'a'] = i;
    }

    List<int> result = new List<int>();
    int start = 0, end = 0;

    for (int i = 0; i < s.Length; i++) {
        end = Math.Max(end, lastIndex[s[i] - 'a']);

        if (i == end) {
            result.Add(end - start + 1);
            start = i + 1;
        }
    }

    return result;
}

// Time: O(n), Space: O(1)
```

## Interval Problems

### 8. Merge Intervals
```csharp
int[][] Merge(int[][] intervals) {
    if (intervals.Length == 0) return new int[0][];

    Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));

    List<int[]> merged = new List<int[]>();
    int[] current = intervals[0];

    foreach (var interval in intervals) {
        if (interval[0] <= current[1]) {
            current[1] = Math.Max(current[1], interval[1]);
        }
        else {
            merged.Add(current);
            current = interval;
        }
    }

    merged.Add(current);
    return merged.ToArray();
}
```

### 9. Non-overlapping Intervals (Min Removals)
```csharp
int EraseOverlapIntervals(int[][] intervals) {
    if (intervals.Length == 0) return 0;

    Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));

    int count = 0;
    int end = intervals[0][1];

    for (int i = 1; i < intervals.Length; i++) {
        if (intervals[i][0] < end) {
            count++;  // Remove current interval
        }
        else {
            end = intervals[i][1];
        }
    }

    return count;
}
```

### 10. Minimum Number of Arrows to Burst Balloons
```csharp
int FindMinArrowShots(int[][] points) {
    if (points.Length == 0) return 0;

    Array.Sort(points, (a, b) => a[1].CompareTo(b[1]));

    int arrows = 1;
    int end = points[0][1];

    for (int i = 1; i < points.Length; i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }

    return arrows;
}
```

## String/Character Greedy

### 11. Remove K Digits
```csharp
string RemoveKdigits(string num, int k) {
    Stack<char> stack = new Stack<char>();

    foreach (char digit in num) {
        while (stack.Count > 0 && k > 0 && stack.Peek() > digit) {
            stack.Pop();
            k--;
        }
        stack.Push(digit);
    }

    // Remove remaining k digits from end
    while (k > 0) {
        stack.Pop();
        k--;
    }

    // Build result
    StringBuilder sb = new StringBuilder();
    while (stack.Count > 0) {
        sb.Insert(0, stack.Pop());
    }

    // Remove leading zeros
    while (sb.Length > 0 && sb[0] == '0') {
        sb.Remove(0, 1);
    }

    return sb.Length == 0 ? "0" : sb.ToString();
}
```

### 12. Reorganize String (No Adjacent Same Characters)
```csharp
string ReorganizeString(string s) {
    int[] freq = new int[26];
    int maxFreq = 0, maxChar = 0;

    foreach (char c in s) {
        freq[c - 'a']++;
        if (freq[c - 'a'] > maxFreq) {
            maxFreq = freq[c - 'a'];
            maxChar = c - 'a';
        }
    }

    if (maxFreq > (s.Length + 1) / 2) return "";

    char[] result = new char[s.Length];
    int index = 0;

    // Place most frequent character first
    while (freq[maxChar] > 0) {
        result[index] = (char)(maxChar + 'a');
        index += 2;
        freq[maxChar]--;
    }

    // Place remaining characters
    for (int i = 0; i < 26; i++) {
        while (freq[i] > 0) {
            if (index >= s.Length) index = 1;
            result[index] = (char)(i + 'a');
            index += 2;
            freq[i]--;
        }
    }

    return new string(result);
}
```

## Two Pointer Greedy

### 13. Container With Most Water
```csharp
int MaxArea(int[] height) {
    int left = 0, right = height.Length - 1;
    int maxArea = 0;

    while (left < right) {
        int area = Math.Min(height[left], height[right]) * (right - left);
        maxArea = Math.Max(maxArea, area);

        // Move pointer with smaller height (greedy choice)
        if (height[left] < height[right]) {
            left++;
        }
        else {
            right--;
        }
    }

    return maxArea;
}
```

### 14. Assign Cookies
```csharp
int FindContentChildren(int[] g, int[] s) {
    Array.Sort(g);  // Children's greed
    Array.Sort(s);  // Cookie sizes

    int child = 0, cookie = 0;

    while (child < g.Length && cookie < s.Length) {
        if (s[cookie] >= g[child]) {
            child++;  // Child is satisfied
        }
        cookie++;
    }

    return child;
}
```

## Mathematical Greedy

### 15. Best Time to Buy and Sell Stock II
```csharp
int MaxProfit(int[] prices) {
    int profit = 0;

    for (int i = 1; i < prices.Length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }

    return profit;
}
```

### 16. Candy Distribution
```csharp
int Candy(int[] ratings) {
    int n = ratings.Length;
    int[] candies = new int[n];
    Array.Fill(candies, 1);

    // Left to right
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right to left
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.Max(candies[i], candies[i + 1] + 1);
        }
    }

    return candies.Sum();
}
```

## Greedy vs DP

| Problem | Greedy | DP |
|---------|--------|-----|
| 0/1 Knapsack | ❌ Doesn't work | ✅ Works |
| Fractional Knapsack | ✅ Works | ❌ Overkill |
| Activity Selection | ✅ Works | ❌ Overkill |
| Coin Change | ❌ May not work | ✅ Works |

## Greedy Strategy

1. **Sort** if order matters
2. **Make local optimal choice**
3. **Never reconsider** the choice
4. **Prove or test** correctness

## Common Greedy Patterns

1. **Activity/Interval**: Sort by end time
2. **Value optimization**: Sort by ratio/priority
3. **Two pointers**: Move based on comparison
4. **Character rearrangement**: Frequency-based placement

## Interview Tips

- **Recognize greedy**: "Maximum", "Minimum", intervals
- **Sort first**: Often the first step
- **Prove correctness**: Exchange argument, induction
- **Check counterexample**: Greedy might not work
- **Time complexity**: Usually O(n log n) due to sorting
- **Space**: Often O(1) or O(n) for sorting

## When Greedy Fails

```csharp
// Coin change with coins [1, 3, 4] and amount 6
// Greedy: 4 + 1 + 1 = 3 coins (WRONG)
// Optimal: 3 + 3 = 2 coins (DP needed)
```

## Practice Problems

1. Queue Reconstruction by Height
2. Minimum Add to Make Parentheses Valid
3. Bag of Tokens
4. Broken Calculator
5. Maximize Sum of Array After K Negations
6. Minimum Number of Taps to Open Water Garden
7. Split Array into Consecutive Subsequences
8. Advantage Shuffle
