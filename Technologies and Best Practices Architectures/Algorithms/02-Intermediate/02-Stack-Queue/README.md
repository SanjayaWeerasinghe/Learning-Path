# Stack & Queue

## Stack (LIFO - Last In First Out)

Like a stack of plates - last plate added is first to be removed.

### Stack Operations
```csharp
Stack<int> stack = new Stack<int>();

stack.Push(1);        // Add to top - O(1)
stack.Push(2);
stack.Push(3);

int top = stack.Peek();    // View top without removing - O(1)
int popped = stack.Pop();  // Remove from top - O(1)
bool empty = stack.Count == 0;  // Check if empty
```

### Stack Implementation (Array-based)
```csharp
class MyStack {
    private int[] arr;
    private int top;
    private int capacity;

    public MyStack(int size) {
        arr = new int[size];
        capacity = size;
        top = -1;
    }

    public void Push(int value) {
        if (top == capacity - 1) throw new Exception("Stack Overflow");
        arr[++top] = value;
    }

    public int Pop() {
        if (top == -1) throw new Exception("Stack Underflow");
        return arr[top--];
    }

    public int Peek() {
        if (top == -1) throw new Exception("Stack is empty");
        return arr[top];
    }

    public bool IsEmpty() {
        return top == -1;
    }
}
```

## Queue (FIFO - First In First Out)

Like a line at a store - first person in is first to be served.

### Queue Operations
```csharp
Queue<int> queue = new Queue<int>();

queue.Enqueue(1);     // Add to rear - O(1)
queue.Enqueue(2);
queue.Enqueue(3);

int front = queue.Peek();      // View front - O(1)
int dequeued = queue.Dequeue(); // Remove from front - O(1)
bool empty = queue.Count == 0;
```

### Queue Implementation (Array-based Circular)
```csharp
class MyQueue {
    private int[] arr;
    private int front, rear, size, capacity;

    public MyQueue(int capacity) {
        this.capacity = capacity;
        arr = new int[capacity];
        front = 0;
        rear = -1;
        size = 0;
    }

    public void Enqueue(int value) {
        if (size == capacity) throw new Exception("Queue is full");
        rear = (rear + 1) % capacity;
        arr[rear] = value;
        size++;
    }

    public int Dequeue() {
        if (size == 0) throw new Exception("Queue is empty");
        int value = arr[front];
        front = (front + 1) % capacity;
        size--;
        return value;
    }

    public int Peek() {
        if (size == 0) throw new Exception("Queue is empty");
        return arr[front];
    }

    public bool IsEmpty() {
        return size == 0;
    }
}
```

## Common Stack Problems

### 1. Valid Parentheses
```csharp
bool IsValid(string s) {
    Stack<char> stack = new Stack<char>();

    foreach (char c in s) {
        if (c == '(' || c == '[' || c == '{') {
            stack.Push(c);
        }
        else {
            if (stack.Count == 0) return false;

            char top = stack.Pop();
            if (c == ')' && top != '(') return false;
            if (c == ']' && top != '[') return false;
            if (c == '}' && top != '{') return false;
        }
    }

    return stack.Count == 0;
}
```

### 2. Min Stack
```csharp
class MinStack {
    private Stack<int> stack;
    private Stack<int> minStack;

    public MinStack() {
        stack = new Stack<int>();
        minStack = new Stack<int>();
    }

    public void Push(int val) {
        stack.Push(val);
        if (minStack.Count == 0 || val <= minStack.Peek()) {
            minStack.Push(val);
        }
    }

    public void Pop() {
        if (stack.Pop() == minStack.Peek()) {
            minStack.Pop();
        }
    }

    public int Top() {
        return stack.Peek();
    }

    public int GetMin() {
        return minStack.Peek();
    }
}
```

### 3. Evaluate Reverse Polish Notation
```csharp
int EvalRPN(string[] tokens) {
    Stack<int> stack = new Stack<int>();

    foreach (string token in tokens) {
        if (token == "+" || token == "-" || token == "*" || token == "/") {
            int b = stack.Pop();
            int a = stack.Pop();

            if (token == "+") stack.Push(a + b);
            else if (token == "-") stack.Push(a - b);
            else if (token == "*") stack.Push(a * b);
            else if (token == "/") stack.Push(a / b);
        }
        else {
            stack.Push(int.Parse(token));
        }
    }

    return stack.Pop();
}
```

### 4. Daily Temperatures
```csharp
int[] DailyTemperatures(int[] temperatures) {
    int n = temperatures.Length;
    int[] result = new int[n];
    Stack<int> stack = new Stack<int>();  // Stores indices

    for (int i = 0; i < n; i++) {
        while (stack.Count > 0 && temperatures[i] > temperatures[stack.Peek()]) {
            int idx = stack.Pop();
            result[idx] = i - idx;
        }
        stack.Push(i);
    }

    return result;
}
```

### 5. Largest Rectangle in Histogram
```csharp
int LargestRectangle(int[] heights) {
    Stack<int> stack = new Stack<int>();
    int maxArea = 0;
    int i = 0;

    while (i < heights.Length) {
        if (stack.Count == 0 || heights[i] >= heights[stack.Peek()]) {
            stack.Push(i++);
        }
        else {
            int height = heights[stack.Pop()];
            int width = stack.Count == 0 ? i : i - stack.Peek() - 1;
            maxArea = Math.Max(maxArea, height * width);
        }
    }

    while (stack.Count > 0) {
        int height = heights[stack.Pop()];
        int width = stack.Count == 0 ? i : i - stack.Peek() - 1;
        maxArea = Math.Max(maxArea, height * width);
    }

    return maxArea;
}
```

## Common Queue Problems

### 1. Implement Stack using Queues
```csharp
class MyStack {
    private Queue<int> q1;
    private Queue<int> q2;

    public MyStack() {
        q1 = new Queue<int>();
        q2 = new Queue<int>();
    }

    public void Push(int x) {
        q2.Enqueue(x);
        while (q1.Count > 0) {
            q2.Enqueue(q1.Dequeue());
        }
        Queue<int> temp = q1;
        q1 = q2;
        q2 = temp;
    }

    public int Pop() {
        return q1.Dequeue();
    }

    public int Top() {
        return q1.Peek();
    }

    public bool Empty() {
        return q1.Count == 0;
    }
}
```

### 2. Number of Recent Calls
```csharp
class RecentCounter {
    private Queue<int> queue;

    public RecentCounter() {
        queue = new Queue<int>();
    }

    public int Ping(int t) {
        queue.Enqueue(t);
        while (queue.Peek() < t - 3000) {
            queue.Dequeue();
        }
        return queue.Count;
    }
}
```

### 3. Moving Average from Data Stream
```csharp
class MovingAverage {
    private Queue<int> queue;
    private int size;
    private double sum;

    public MovingAverage(int size) {
        this.size = size;
        queue = new Queue<int>();
        sum = 0;
    }

    public double Next(int val) {
        queue.Enqueue(val);
        sum += val;

        if (queue.Count > size) {
            sum -= queue.Dequeue();
        }

        return sum / queue.Count;
    }
}
```

## Deque (Double-Ended Queue)

```csharp
// C# doesn't have built-in Deque, use LinkedList
LinkedList<int> deque = new LinkedList<int>();

deque.AddFirst(1);   // Add to front
deque.AddLast(2);    // Add to rear
deque.RemoveFirst(); // Remove from front
deque.RemoveLast();  // Remove from rear
```

### Sliding Window Maximum (using Deque)
```csharp
int[] MaxSlidingWindow(int[] nums, int k) {
    LinkedList<int> deque = new LinkedList<int>();  // Stores indices
    List<int> result = new List<int>();

    for (int i = 0; i < nums.Length; i++) {
        // Remove indices outside window
        while (deque.Count > 0 && deque.First.Value < i - k + 1) {
            deque.RemoveFirst();
        }

        // Remove smaller elements (they won't be max)
        while (deque.Count > 0 && nums[deque.Last.Value] < nums[i]) {
            deque.RemoveLast();
        }

        deque.AddLast(i);

        // Add to result when window is complete
        if (i >= k - 1) {
            result.Add(nums[deque.First.Value]);
        }
    }

    return result.ToArray();
}
```

## Comparison Table

| Data Structure | Add | Remove | Access | Use Case |
|---------------|-----|--------|--------|----------|
| Stack | O(1) top | O(1) top | O(1) top | Undo, parsing, DFS |
| Queue | O(1) rear | O(1) front | O(1) front | BFS, scheduling |
| Deque | O(1) both ends | O(1) both ends | O(1) ends | Sliding window |

## Interview Tips

- **Stack**: Think LIFO, recursion simulation, matching/nesting
- **Queue**: Think FIFO, BFS, level order traversal
- **Monotonic Stack**: Daily temperatures, next greater element
- **Deque**: Sliding window problems
- Know how to implement using arrays and linked lists

## Practice Problems

**Stack:**
1. Baseball Game
2. Simplify Path
3. Decode String
4. Asteroid Collision

**Queue:**
1. Design Circular Queue
2. Perfect Squares (BFS)
3. Walls and Gates

**Deque:**
1. Sliding Window Maximum
2. Shortest Subarray with Sum at Least K
