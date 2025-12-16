# Advanced Data Structures

## Trie (Prefix Tree)

### What is a Trie?
Tree-like structure for storing strings, efficient for prefix-based operations.

### Implementation
```csharp
class TrieNode {
    public Dictionary<char, TrieNode> children = new Dictionary<char, TrieNode>();
    public bool isEndOfWord = false;
}

class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void Insert(string word) {
        TrieNode node = root;

        foreach (char c in word) {
            if (!node.children.ContainsKey(c)) {
                node.children[c] = new TrieNode();
            }
            node = node.children[c];
        }

        node.isEndOfWord = true;
    }

    public bool Search(string word) {
        TrieNode node = root;

        foreach (char c in word) {
            if (!node.children.ContainsKey(c)) {
                return false;
            }
            node = node.children[c];
        }

        return node.isEndOfWord;
    }

    public bool StartsWith(string prefix) {
        TrieNode node = root;

        foreach (char c in prefix) {
            if (!node.children.ContainsKey(c)) {
                return false;
            }
            node = node.children[c];
        }

        return true;
    }
}

// Time: O(m) where m is word length
// Space: O(n * m) where n is number of words
```

### Trie Applications
- Autocomplete
- Spell checker
- IP routing
- Word search games

### Word Search II (Trie + Backtracking)
```csharp
IList<string> FindWords(char[][] board, string[] words) {
    TrieNode root = BuildTrie(words);
    HashSet<string> result = new HashSet<string>();

    for (int i = 0; i < board.Length; i++) {
        for (int j = 0; j < board[0].Length; j++) {
            DFS(board, i, j, root, result);
        }
    }

    return result.ToList();
}

void DFS(char[][] board, int i, int j, TrieNode node, HashSet<string> result) {
    if (i < 0 || i >= board.Length || j < 0 || j >= board[0].Length) return;

    char c = board[i][j];
    if (c == '#' || !node.children.ContainsKey(c)) return;

    node = node.children[c];

    if (node.word != null) {
        result.Add(node.word);
        node.word = null;  // Avoid duplicates
    }

    board[i][j] = '#';
    DFS(board, i + 1, j, node, result);
    DFS(board, i - 1, j, node, result);
    DFS(board, i, j + 1, node, result);
    DFS(board, i, j - 1, node, result);
    board[i][j] = c;
}

TrieNode BuildTrie(string[] words) {
    TrieNode root = new TrieNode();
    foreach (string word in words) {
        TrieNode node = root;
        foreach (char c in word) {
            if (!node.children.ContainsKey(c)) {
                node.children[c] = new TrieNode();
            }
            node = node.children[c];
        }
        node.word = word;
    }
    return root;
}
```

## Union-Find (Disjoint Set)

### What is Union-Find?
Tracks elements partitioned into disjoint sets, supports union and find operations.

### Implementation (with Path Compression & Union by Rank)
```csharp
class UnionFind {
    private int[] parent;
    private int[] rank;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    public int Find(int x) {
        if (parent[x] != x) {
            parent[x] = Find(parent[x]);  // Path compression
        }
        return parent[x];
    }

    public bool Union(int x, int y) {
        int rootX = Find(x);
        int rootY = Find(y);

        if (rootX == rootY) return false;  // Already connected

        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        }
        else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        }
        else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }

        return true;
    }

    public bool IsConnected(int x, int y) {
        return Find(x) == Find(y);
    }
}

// Time: O(α(n)) ≈ O(1) amortized (inverse Ackermann)
// Space: O(n)
```

### Union-Find Applications

#### Number of Connected Components
```csharp
int CountComponents(int n, int[][] edges) {
    UnionFind uf = new UnionFind(n);
    int components = n;

    foreach (var edge in edges) {
        if (uf.Union(edge[0], edge[1])) {
            components--;
        }
    }

    return components;
}
```

#### Redundant Connection
```csharp
int[] FindRedundantConnection(int[][] edges) {
    UnionFind uf = new UnionFind(edges.Length + 1);

    foreach (var edge in edges) {
        if (!uf.Union(edge[0], edge[1])) {
            return edge;  // Creates cycle
        }
    }

    return new int[0];
}
```

## Segment Tree

### What is a Segment Tree?
Tree structure for range queries and updates on arrays.

### Implementation (Range Sum)
```csharp
class SegmentTree {
    private int[] tree;
    private int n;

    public SegmentTree(int[] nums) {
        n = nums.Length;
        tree = new int[4 * n];
        Build(nums, 0, 0, n - 1);
    }

    private void Build(int[] nums, int node, int start, int end) {
        if (start == end) {
            tree[node] = nums[start];
            return;
        }

        int mid = start + (end - start) / 2;
        int leftNode = 2 * node + 1;
        int rightNode = 2 * node + 2;

        Build(nums, leftNode, start, mid);
        Build(nums, rightNode, mid + 1, end);

        tree[node] = tree[leftNode] + tree[rightNode];
    }

    public void Update(int index, int value) {
        Update(0, 0, n - 1, index, value);
    }

    private void Update(int node, int start, int end, int index, int value) {
        if (start == end) {
            tree[node] = value;
            return;
        }

        int mid = start + (end - start) / 2;
        int leftNode = 2 * node + 1;
        int rightNode = 2 * node + 2;

        if (index <= mid) {
            Update(leftNode, start, mid, index, value);
        }
        else {
            Update(rightNode, mid + 1, end, index, value);
        }

        tree[node] = tree[leftNode] + tree[rightNode];
    }

    public int Query(int left, int right) {
        return Query(0, 0, n - 1, left, right);
    }

    private int Query(int node, int start, int end, int left, int right) {
        if (right < start || left > end) return 0;  // Out of range

        if (left <= start && end <= right) return tree[node];  // Completely inside

        int mid = start + (end - start) / 2;
        int leftNode = 2 * node + 1;
        int rightNode = 2 * node + 2;

        int leftSum = Query(leftNode, start, mid, left, right);
        int rightSum = Query(rightNode, mid + 1, end, left, right);

        return leftSum + rightSum;
    }
}

// Build: O(n), Update: O(log n), Query: O(log n)
```

## Fenwick Tree (Binary Indexed Tree)

### What is a Fenwick Tree?
Efficient structure for prefix sum queries and point updates.

### Implementation
```csharp
class FenwickTree {
    private int[] tree;
    private int n;

    public FenwickTree(int n) {
        this.n = n;
        tree = new int[n + 1];
    }

    public void Update(int index, int delta) {
        index++;  // 1-indexed

        while (index <= n) {
            tree[index] += delta;
            index += index & (-index);  // Add LSB
        }
    }

    public int Query(int index) {
        index++;  // 1-indexed
        int sum = 0;

        while (index > 0) {
            sum += tree[index];
            index -= index & (-index);  // Remove LSB
        }

        return sum;
    }

    public int RangeQuery(int left, int right) {
        return Query(right) - (left > 0 ? Query(left - 1) : 0);
    }
}

// Update: O(log n), Query: O(log n)
```

### Range Sum Query - Mutable
```csharp
class NumArray {
    private FenwickTree ft;
    private int[] nums;

    public NumArray(int[] nums) {
        this.nums = nums;
        ft = new FenwickTree(nums.Length);

        for (int i = 0; i < nums.Length; i++) {
            ft.Update(i, nums[i]);
        }
    }

    public void Update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        ft.Update(index, delta);
    }

    public int SumRange(int left, int right) {
        return ft.RangeQuery(left, right);
    }
}
```

## Heap / Priority Queue

### Min Heap Implementation
```csharp
class MinHeap {
    private List<int> heap = new List<int>();

    public void Insert(int val) {
        heap.Add(val);
        HeapifyUp(heap.Count - 1);
    }

    public int ExtractMin() {
        if (heap.Count == 0) throw new InvalidOperationException();

        int min = heap[0];
        heap[0] = heap[heap.Count - 1];
        heap.RemoveAt(heap.Count - 1);

        if (heap.Count > 0) {
            HeapifyDown(0);
        }

        return min;
    }

    public int Peek() {
        if (heap.Count == 0) throw new InvalidOperationException();
        return heap[0];
    }

    private void HeapifyUp(int index) {
        while (index > 0) {
            int parent = (index - 1) / 2;

            if (heap[index] >= heap[parent]) break;

            Swap(index, parent);
            index = parent;
        }
    }

    private void HeapifyDown(int index) {
        while (true) {
            int left = 2 * index + 1;
            int right = 2 * index + 2;
            int smallest = index;

            if (left < heap.Count && heap[left] < heap[smallest]) {
                smallest = left;
            }

            if (right < heap.Count && heap[right] < heap[smallest]) {
                smallest = right;
            }

            if (smallest == index) break;

            Swap(index, smallest);
            index = smallest;
        }
    }

    private void Swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
}

// Insert: O(log n), Extract: O(log n), Peek: O(1)
```

### Top K Frequent Elements (Heap)
```csharp
int[] TopKFrequent(int[] nums, int k) {
    Dictionary<int, int> freq = new Dictionary<int, int>();

    foreach (int num in nums) {
        freq[num] = freq.GetValueOrDefault(num, 0) + 1;
    }

    PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();

    foreach (var (num, count) in freq) {
        minHeap.Enqueue(num, count);
        if (minHeap.Count > k) {
            minHeap.Dequeue();
        }
    }

    int[] result = new int[k];
    for (int i = 0; i < k; i++) {
        result[i] = minHeap.Dequeue();
    }

    return result;
}
```

## Monotonic Stack/Queue

### Next Greater Element
```csharp
int[] NextGreaterElements(int[] nums) {
    int n = nums.Length;
    int[] result = new int[n];
    Array.Fill(result, -1);
    Stack<int> stack = new Stack<int>();  // Stores indices

    for (int i = 0; i < 2 * n; i++) {
        while (stack.Count > 0 && nums[stack.Peek()] < nums[i % n]) {
            result[stack.Pop()] = nums[i % n];
        }

        if (i < n) {
            stack.Push(i);
        }
    }

    return result;
}
```

## LRU Cache

```csharp
class LRUCache {
    private int capacity;
    private Dictionary<int, LinkedListNode<(int key, int value)>> cache;
    private LinkedList<(int key, int value)> list;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        cache = new Dictionary<int, LinkedListNode<(int, int)>>();
        list = new LinkedList<(int, int)>();
    }

    public int Get(int key) {
        if (!cache.ContainsKey(key)) return -1;

        var node = cache[key];
        list.Remove(node);
        list.AddFirst(node);

        return node.Value.value;
    }

    public void Put(int key, int value) {
        if (cache.ContainsKey(key)) {
            var node = cache[key];
            list.Remove(node);
        }
        else if (cache.Count >= capacity) {
            var last = list.Last;
            cache.Remove(last.Value.key);
            list.RemoveLast();
        }

        var newNode = list.AddFirst((key, value));
        cache[key] = newNode;
    }
}

// Get: O(1), Put: O(1)
```

## Comparison Table

| Data Structure | Use Case | Operations |
|---------------|----------|------------|
| Trie | Prefix search | Insert/Search: O(m) |
| Union-Find | Connected components | Find/Union: O(α(n)) ≈ O(1) |
| Segment Tree | Range queries/updates | Query/Update: O(log n) |
| Fenwick Tree | Prefix sum, simpler than Segment | Query/Update: O(log n) |
| Heap | Priority queue | Insert/Extract: O(log n) |
| LRU Cache | Eviction policy | Get/Put: O(1) |

## Interview Tips

- **Trie**: Think prefix, autocomplete, word games
- **Union-Find**: Connected components, MST
- **Segment/Fenwick**: Range queries (sum, min, max)
- **Heap**: K largest/smallest, median
- **Know trade-offs**: Time vs space, complexity vs simplicity

## Practice Problems

1. Design Add and Search Words Data Structure (Trie)
2. Word Squares (Trie)
3. Longest Word in Dictionary (Trie)
4. Accounts Merge (Union-Find)
5. Most Stones Removed (Union-Find)
6. Range Sum Query 2D (Segment Tree)
7. Count of Smaller Numbers After Self (Fenwick)
8. Find Median from Data Stream (Heap)
9. Sliding Window Median (Heap)
10. LFU Cache
