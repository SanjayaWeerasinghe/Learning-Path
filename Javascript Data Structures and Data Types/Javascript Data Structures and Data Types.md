# Comprehensive JavaScript Data Structures & Data Types: 63 Detailed Coding Tasks

This collection provides **63 hands-on coding tasks** designed to master JavaScript fundamentals through practical exercises. Each task includes detailed problem descriptions, input/output examples, helpful hints, and clear difficulty ratings. The tasks span from beginner-friendly exercises to advanced challenges, covering all major data structures and data types in JavaScript.

## How to use this collection

Start with beginner tasks in areas you're less familiar with, then progress to intermediate and advanced challenges. Each task is self-contained and can be completed in any order, though some advanced tasks build on concepts from earlier ones. The difficulty ratings guide your learning path: **Beginner** tasks establish foundations, **Intermediate** tasks develop problem-solving skills, and **Advanced** tasks push your understanding of JavaScript's nuances.

## Quick navigation by topic

**Data Structures**: Arrays (Tasks 1-3) • Objects & Hash Maps (4-6) • Maps & Sets (7-9) • Stacks (10-12) • Queues (13-15) • Linked Lists (16-19) • Trees (20-23) • Graphs (24-26) • Heaps (27-29) • Tries (30) • Integrated (31)

**Data Types**: Strings (32-36) • Numbers (37-41) • Booleans (42-44) • Null & Undefined (45-47) • Symbols (48-50) • BigInt (51-53) • Type Operations (54-56) • Object Properties (57-59) • Copy Operations (60-61) • Practical Applications (62-63)

---

# Part 1: Data Structures (31 Tasks)

## Arrays

### Task 1: Rotate Array
**Difficulty:** Beginner

**Problem Description:**
Write a function that rotates an array to the right by k steps, where k is non-negative. For example, rotating [1, 2, 3, 4, 5] by 2 steps results in [4, 5, 1, 2, 3].

**Expected Input/Output:**
```javascript
Input: nums = [1, 2, 3, 4, 5, 6, 7], k = 3
Output: [5, 6, 7, 1, 2, 3, 4]

Input: nums = [-1, -100, 3, 99], k = 2
Output: [3, 99, -1, -100]
```

**Hints/Approach:**
- Consider using array slicing methods
- Handle cases where k is greater than array length (use modulo operator)
- Alternative approach: reverse the array in parts
- Time complexity goal: O(n)

---

### Task 2: Find All Duplicates in Array
**Difficulty:** Intermediate

**Problem Description:**
Given an integer array where each element appears once or twice, return an array of all elements that appear twice. Solve it without using extra space (aside from the output array) and in O(n) runtime.

**Expected Input/Output:**
```javascript
Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]
Output: [2, 3]

Input: nums = [1, 1, 2]
Output: [1]
```

**Hints/Approach:**
- Use the array indices as a hash table
- Mark visited elements by negating values at their corresponding indices
- When you encounter a negative value, it indicates a duplicate
- Remember to handle 1-indexed vs 0-indexed arrays

---

### Task 3: Merge Overlapping Intervals
**Difficulty:** Intermediate

**Problem Description:**
Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of non-overlapping intervals.

**Expected Input/Output:**
```javascript
Input: intervals = [[1,3], [2,6], [8,10], [15,18]]
Output: [[1,6], [8,10], [15,18]]

Input: intervals = [[1,4], [4,5]]
Output: [[1,5]]
```

**Hints/Approach:**
- Sort intervals by start time first
- Iterate through sorted intervals and merge when current interval overlaps with previous
- An interval overlaps if: currentStart <= previousEnd
- Time complexity: O(n log n) due to sorting

---

## Objects & Hash Maps

### Task 4: Implement LRU Cache
**Difficulty:** Advanced

**Problem Description:**
Design and implement a Least Recently Used (LRU) cache with the following operations:
- `get(key)`: Get the value of the key if it exists in the cache, otherwise return -1
- `put(key, value)`: Update or insert the value if the key is not already present. When cache reaches capacity, invalidate the least recently used item before inserting.

**Expected Input/Output:**
```javascript
const cache = new LRUCache(2); // capacity = 2
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```

**Hints/Approach:**
- Use a Map (maintains insertion order) combined with logic to track access
- Or implement using a doubly linked list + hash map for O(1) operations
- Move accessed items to the front/end to track recency
- Remove from tail/front when capacity is exceeded

---

### Task 5: Group Anagrams
**Difficulty:** Intermediate

**Problem Description:**
Given an array of strings, group anagrams together. Anagrams are words formed by rearranging letters of another word.

**Expected Input/Output:**
```javascript
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]

Input: strs = [""]
Output: [[""]]
```

**Hints/Approach:**
- Use a hash map where the key is a sorted version of the word
- Or use character frequency as the key (e.g., "a1b1c1")
- Group words that produce the same key
- Time complexity: O(n * k log k) where k is max string length

---

### Task 6: Design Phone Directory
**Difficulty:** Beginner

**Problem Description:**
Create a PhoneDirectory class that stores contacts with names and phone numbers. Implement methods to:
- `add(name, number)`: Add a contact
- `find(name)`: Return phone number for a name
- `delete(name)`: Remove a contact
- `list()`: Return all contacts

**Expected Input/Output:**
```javascript
const dir = new PhoneDirectory();
dir.add("Alice", "123-456-7890");
dir.add("Bob", "234-567-8901");
dir.find("Alice"); // "123-456-7890"
dir.delete("Alice");
dir.find("Alice"); // undefined or null
dir.list(); // [["Bob", "234-567-8901"]]
```

**Hints/Approach:**
- Use a Map or plain object to store name-number pairs
- Handle edge cases: duplicate names, empty directory
- Consider making names case-insensitive
- All operations should be O(1) average case

---

## Maps & Sets

### Task 7: Two Sum Using Hash Map
**Difficulty:** Beginner

**Problem Description:**
Given an array of integers and a target sum, return the indices of two numbers that add up to the target. Each input has exactly one solution, and you cannot use the same element twice.

**Expected Input/Output:**
```javascript
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
```

**Hints/Approach:**
- Use a Map to store visited numbers and their indices
- For each number, check if (target - number) exists in the map
- If found, return both indices
- Time complexity: O(n), Space complexity: O(n)

---

### Task 8: Longest Consecutive Sequence
**Difficulty:** Intermediate

**Problem Description:**
Given an unsorted array of integers, find the length of the longest consecutive elements sequence in O(n) time.

**Expected Input/Output:**
```javascript
Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4  // [1, 2, 3, 4] is the longest sequence

Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9  // [0,1,2,3,4,5,6,7,8]
```

**Hints/Approach:**
- Use a Set for O(1) lookups
- For each number, check if it's the start of a sequence (num-1 not in set)
- Count consecutive numbers from that starting point
- Avoid re-checking sequences by only starting at sequence beginnings

---

### Task 9: Find Symmetric Difference
**Difficulty:** Beginner

**Problem Description:**
Create a function that returns the symmetric difference of two or more sets. The symmetric difference is elements that are in either set but not in both.

**Expected Input/Output:**
```javascript
Input: [1, 2, 3], [2, 3, 4]
Output: [1, 4]

Input: [1, 2, 5], [2, 3, 5], [3, 4, 5]
Output: [1, 4, 5]
```

**Hints/Approach:**
- Use Sets for efficient operations
- For two sets: (A ∪ B) - (A ∩ B)
- For multiple sets: apply operation iteratively
- Result should contain no duplicates

---

## Stacks

### Task 10: Implement Stack from Scratch
**Difficulty:** Beginner

**Problem Description:**
Implement a Stack class with the following methods:
- `push(value)`: Add element to top
- `pop()`: Remove and return top element
- `peek()`: Return top element without removing
- `isEmpty()`: Check if stack is empty
- `size()`: Return number of elements

**Expected Input/Output:**
```javascript
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.peek();    // 2
stack.pop();     // 2
stack.size();    // 1
stack.isEmpty(); // false
```

**Hints/Approach:**
- Use an array internally to store elements
- Push/pop should be O(1) operations
- Handle edge cases: pop from empty stack
- Consider whether to use error throwing or return null/undefined

---

### Task 11: Valid Parentheses
**Difficulty:** Beginner

**Problem Description:**
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if brackets are closed in the correct order.

**Expected Input/Output:**
```javascript
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false

Input: s = "([)]"
Output: false
```

**Hints/Approach:**
- Use a stack to track opening brackets
- When encountering a closing bracket, check if it matches the top of stack
- String is valid if stack is empty at the end
- Time complexity: O(n)

---

### Task 12: Evaluate Reverse Polish Notation
**Difficulty:** Intermediate

**Problem Description:**
Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix notation). Valid operators are +, -, *, /. Each operand may be an integer or another expression.

**Expected Input/Output:**
```javascript
Input: tokens = ["2", "1", "+", "3", "*"]
Output: 9  // ((2 + 1) * 3)

Input: tokens = ["4", "13", "5", "/", "+"]
Output: 6  // (4 + (13 / 5))
```

**Hints/Approach:**
- Use a stack to store operands
- When encountering a number, push to stack
- When encountering an operator, pop two operands, apply operation, push result
- Final answer is the only element left in stack

---

## Queues

### Task 13: Implement Queue from Scratch
**Difficulty:** Beginner

**Problem Description:**
Implement a Queue class with the following methods:
- `enqueue(value)`: Add element to rear
- `dequeue()`: Remove and return front element
- `front()`: Return front element without removing
- `isEmpty()`: Check if queue is empty
- `size()`: Return number of elements

**Expected Input/Output:**
```javascript
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.front();    // 1
queue.dequeue();  // 1
queue.size();     // 1
```

**Hints/Approach:**
- Can use an array, but be aware dequeue from front is O(n)
- Better approach: use an object with front/rear pointers for O(1) operations
- Or use two pointers to track front and rear indices
- Handle wraparound for circular queue implementation

---

### Task 14: Implement Circular Queue
**Difficulty:** Intermediate

**Problem Description:**
Design a circular queue that supports operations enqueue, dequeue, front, rear, isEmpty, and isFull. A circular queue reuses space by wrapping around when the rear reaches the end.

**Expected Input/Output:**
```javascript
const queue = new CircularQueue(3);
queue.enqueue(1); // true
queue.enqueue(2); // true
queue.enqueue(3); // true
queue.enqueue(4); // false (queue is full)
queue.dequeue();  // 1
queue.enqueue(4); // true
queue.rear();     // 4
```

**Hints/Approach:**
- Use fixed-size array
- Track front and rear pointers
- Use modulo operator for wraparound: (index + 1) % capacity
- Distinguish between empty and full: track count or use front == (rear + 1) % capacity

---

### Task 15: Design Task Scheduler
**Difficulty:** Intermediate

**Problem Description:**
Implement a task scheduler using a queue. Tasks should be processed in FIFO order. Include methods to add tasks, process the next task, and check remaining tasks.

**Expected Input/Output:**
```javascript
const scheduler = new TaskScheduler();
scheduler.addTask("Task 1");
scheduler.addTask("Task 2");
scheduler.processNext(); // "Processing: Task 1"
scheduler.getRemainingTasks(); // ["Task 2"]
```

**Hints/Approach:**
- Use a queue to maintain task order
- addTask() enqueues a new task
- processNext() dequeues and executes/logs the task
- Consider adding priority levels (use priority queue)

---

## Linked Lists

### Task 16: Implement Singly Linked List
**Difficulty:** Intermediate

**Problem Description:**
Create a SinglyLinkedList class with Node class. Implement methods:
- `append(value)`: Add node to end
- `prepend(value)`: Add node to beginning
- `delete(value)`: Remove first node with value
- `find(value)`: Return node with value
- `toArray()`: Convert list to array
- `reverse()`: Reverse the list

**Expected Input/Output:**
```javascript
const list = new SinglyLinkedList();
list.append(1);
list.append(2);
list.prepend(0);
list.toArray(); // [0, 1, 2]
list.reverse();
list.toArray(); // [2, 1, 0]
```

**Hints/Approach:**
- Node structure: { value, next }
- Track head (and optionally tail) pointer
- For reverse: use three pointers (prev, current, next)
- Handle edge cases: empty list, single node

---

### Task 17: Detect Cycle in Linked List
**Difficulty:** Intermediate

**Problem Description:**
Given the head of a linked list, determine if the list has a cycle. A cycle exists if a node can be reached again by following the next pointers.

**Expected Input/Output:**
```javascript
Input: head = [3,2,0,-4], pos = 1 (tail connects to index 1)
Output: true

Input: head = [1,2], pos = -1 (no cycle)
Output: false
```

**Hints/Approach:**
- Floyd's Cycle Detection (Tortoise and Hare algorithm)
- Use two pointers: slow moves one step, fast moves two steps
- If they meet, there's a cycle
- If fast reaches null, no cycle
- Time: O(n), Space: O(1)

---

### Task 18: Find Middle of Linked List
**Difficulty:** Beginner

**Problem Description:**
Given the head of a singly linked list, return the middle node. If there are two middle nodes (even length), return the second one.

**Expected Input/Output:**
```javascript
Input: head = [1,2,3,4,5]
Output: node with value 3

Input: head = [1,2,3,4,5,6]
Output: node with value 4
```

**Hints/Approach:**
- Use fast and slow pointer technique
- Slow moves one step, fast moves two steps
- When fast reaches end, slow is at middle
- Time: O(n), Space: O(1)

---

### Task 19: Merge Two Sorted Linked Lists
**Difficulty:** Intermediate

**Problem Description:**
Merge two sorted linked lists into one sorted list. The new list should be made by splicing together nodes from the two lists.

**Expected Input/Output:**
```javascript
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Input: list1 = [], list2 = [0]
Output: [0]
```

**Hints/Approach:**
- Use a dummy head node to simplify edge cases
- Compare values from both lists and attach smaller node
- Continue until one list is exhausted
- Attach remaining nodes from non-empty list
- Can be done recursively or iteratively

---

## Trees

### Task 20: Implement Binary Search Tree
**Difficulty:** Intermediate

**Problem Description:**
Create a BinarySearchTree class with Node class. Implement methods:
- `insert(value)`: Add node maintaining BST property
- `search(value)`: Find if value exists
- `delete(value)`: Remove node
- `inOrderTraversal()`: Return array of values in sorted order
- `findMin()` and `findMax()`: Find minimum and maximum values

**Expected Input/Output:**
```javascript
const bst = new BST();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.search(3); // true
bst.inOrderTraversal(); // [3, 5, 7]
bst.findMin(); // 3
```

**Hints/Approach:**
- Node structure: { value, left, right }
- BST property: left < parent < right
- Insertion: recursively compare and insert
- Deletion: handle three cases (leaf, one child, two children)
- For two children: replace with inorder successor/predecessor

---

### Task 21: Level Order Traversal (BFS)
**Difficulty:** Intermediate

**Problem Description:**
Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

**Expected Input/Output:**
```javascript
Input: root = [3,9,20,null,null,15,7]
Output: [[3], [9,20], [15,7]]

Input: root = [1]
Output: [[1]]
```

**Hints/Approach:**
- Use a queue for BFS traversal
- Process nodes level by level
- Track level size to group nodes by level
- Enqueue children as you dequeue parents
- Time: O(n), Space: O(w) where w is max width

---

### Task 22: Validate Binary Search Tree
**Difficulty:** Intermediate

**Problem Description:**
Determine if a binary tree is a valid binary search tree. A valid BST has all left descendants < node < all right descendants.

**Expected Input/Output:**
```javascript
Input: root = [2,1,3]
Output: true

Input: root = [5,1,4,null,null,3,6]
Output: false (4 is in right subtree of 5 but 4 < 5)
```

**Hints/Approach:**
- Can't just compare with immediate children
- Use range checking: track min and max allowed values
- Recursive approach: pass valid range down the tree
- Left subtree: max becomes current node value
- Right subtree: min becomes current node value

---

### Task 23: Lowest Common Ancestor in BST
**Difficulty:** Intermediate

**Problem Description:**
Find the lowest common ancestor (LCA) of two nodes in a binary search tree. The LCA is the lowest node that has both nodes as descendants.

**Expected Input/Output:**
```javascript
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
```

**Hints/Approach:**
- Leverage BST property for efficient solution
- If both nodes are less than root, LCA is in left subtree
- If both nodes are greater than root, LCA is in right subtree
- Otherwise, current node is LCA
- Time: O(h) where h is height

---

## Graphs

### Task 24: Implement Graph with Adjacency List
**Difficulty:** Intermediate

**Problem Description:**
Create a Graph class using adjacency list representation. Implement:
- `addVertex(vertex)`: Add a vertex
- `addEdge(v1, v2)`: Add an edge between vertices
- `removeEdge(v1, v2)`: Remove an edge
- `removeVertex(vertex)`: Remove a vertex and all its edges
- `depthFirstSearch(start)`: DFS traversal
- `breadthFirstSearch(start)`: BFS traversal

**Expected Input/Output:**
```javascript
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addEdge("A", "B");
graph.dfs("A"); // ["A", "B"]
graph.bfs("A"); // ["A", "B"]
```

**Hints/Approach:**
- Use Map or object: { vertex: [neighbors] }
- DFS: use stack (or recursion) and visited set
- BFS: use queue and visited set
- For removeVertex: also remove edges from all neighbors

---

### Task 25: Number of Islands
**Difficulty:** Intermediate

**Problem Description:**
Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.

**Expected Input/Output:**
```javascript
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

**Hints/Approach:**
- Treat as graph problem: each cell is a node
- Use DFS or BFS to explore connected components
- When you find a '1', increment counter and mark entire island as visited
- Visit neighbors in 4 directions (up, down, left, right)
- Time: O(m * n)

---

### Task 26: Detect Cycle in Directed Graph
**Difficulty:** Advanced

**Problem Description:**
Given a directed graph, detect if it contains a cycle. A cycle exists if you can start at a node and return to it by following directed edges.

**Expected Input/Output:**
```javascript
Input: edges = [[0,1], [1,2], [2,0]]
Output: true (0 -> 1 -> 2 -> 0)

Input: edges = [[0,1], [1,2]]
Output: false
```

**Hints/Approach:**
- Use DFS with three states: unvisited, visiting, visited
- Mark node as "visiting" when entering DFS
- If you encounter a "visiting" node, cycle detected
- Mark as "visited" when leaving DFS
- Check all components for disconnected graphs

---

## Heaps

### Task 27: Implement Min Heap
**Difficulty:** Advanced

**Problem Description:**
Implement a MinHeap class with the following operations:
- `insert(value)`: Add element maintaining heap property
- `extractMin()`: Remove and return minimum element
- `peek()`: Return minimum without removing
- `heapify(array)`: Convert array to heap
- `size()`: Return number of elements

**Expected Input/Output:**
```javascript
const heap = new MinHeap();
heap.insert(3);
heap.insert(1);
heap.insert(5);
heap.peek();       // 1
heap.extractMin(); // 1
heap.peek();       // 3
```

**Hints/Approach:**
- Use array representation: parent at i, children at 2i+1 and 2i+2
- Insert: add to end, bubble up
- ExtractMin: swap with last, remove last, bubble down
- Bubble up: compare with parent, swap if needed
- Bubble down: compare with children, swap with smaller

---

### Task 28: Kth Largest Element
**Difficulty:** Intermediate

**Problem Description:**
Find the kth largest element in an unsorted array. Note that it is the kth largest element in sorted order, not the kth distinct element.

**Expected Input/Output:**
```javascript
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

**Hints/Approach:**
- Use a min heap of size k
- Maintain k largest elements in heap
- After processing all elements, top of heap is kth largest
- Time: O(n log k), Space: O(k)
- Alternative: QuickSelect algorithm for O(n) average case

---

### Task 29: Merge K Sorted Lists
**Difficulty:** Advanced

**Problem Description:**
Merge k sorted linked lists into one sorted linked list. Each list is sorted in ascending order.

**Expected Input/Output:**
```javascript
Input: lists = [[1,4,5], [1,3,4], [2,6]]
Output: [1,1,2,3,4,4,5,6]

Input: lists = []
Output: []
```

**Hints/Approach:**
- Use a min heap to efficiently get the smallest element
- Add first node from each list to heap
- Extract min, add to result, add next node from that list to heap
- Continue until heap is empty
- Time: O(N log k) where N is total nodes, k is number of lists

---

## Tries

### Task 30: Implement Trie (Prefix Tree)
**Difficulty:** Advanced

**Problem Description:**
Implement a Trie (prefix tree) with the following operations:
- `insert(word)`: Insert a word into the trie
- `search(word)`: Return true if word is in the trie
- `startsWith(prefix)`: Return true if any word starts with prefix
- `delete(word)`: Remove a word from trie
- `autoComplete(prefix)`: Return all words with given prefix

**Expected Input/Output:**
```javascript
const trie = new Trie();
trie.insert("apple");
trie.search("apple");   // true
trie.search("app");     // false
trie.startsWith("app"); // true
trie.insert("app");
trie.search("app");     // true
trie.autoComplete("app"); // ["app", "apple"]
```

**Hints/Approach:**
- Node structure: { children: {}, isEndOfWord: boolean }
- Insert: create nodes for each character
- Search: traverse and check isEndOfWord
- StartsWith: traverse prefix, return true if path exists
- AutoComplete: DFS from prefix node to collect all words
- Time for insert/search: O(m) where m is word length

---

## Advanced Integration

### Task 31: Design Twitter Feed
**Difficulty:** Advanced

**Problem Description:**
Design a simplified Twitter-like system supporting:
- `postTweet(userId, tweetId)`: User posts a tweet
- `getNewsFeed(userId)`: Retrieve 10 most recent tweets from user and their followees
- `follow(followerId, followeeId)`: User follows another
- `unfollow(followerId, followeeId)`: User unfollows another

**Expected Input/Output:**
```javascript
const twitter = new Twitter();
twitter.postTweet(1, 5);
twitter.getNewsFeed(1); // [5]
twitter.follow(1, 2);
twitter.postTweet(2, 6);
twitter.getNewsFeed(1); // [6, 5]
twitter.unfollow(1, 2);
twitter.getNewsFeed(1); // [5]
```

**Hints/Approach:**
- Use Map for user data and followee lists
- Use heap/priority queue to merge k sorted tweet lists
- Each user maintains list of their tweets with timestamps
- For news feed: merge tweets from user + all followees
- Consider using linked list for tweets ordered by time

---

# Part 2: Data Types (32 Tasks)

## Strings

### Task 32: Advanced String Parser
**Difficulty:** Intermediate

**Problem Description:**
Create a function `parseUserData(input)` that extracts structured information from a formatted string. The input contains user data in the format: "Name: John Doe | Age: 30 | Email: john@example.com". Your function should parse this string and return an object with properly typed values (age as number, name and email as strings).

**Expected Input/Output:**
```javascript
parseUserData("Name: Alice Smith | Age: 25 | Email: alice@test.com")
// Output: { name: "Alice Smith", age: 25, email: "alice@test.com" }

parseUserData("Name: Bob | Age: invalid | Email: bob@test.com")
// Output: { name: "Bob", age: null, email: "bob@test.com" }
```

**Hints/Approach:**
- Use `split()` to break the string into parts
- Use `trim()` to clean whitespace
- Convert age to number using `parseInt()` or `Number()`
- Handle invalid age values gracefully

---

### Task 33: Template String Validator
**Difficulty:** Advanced

**Problem Description:**
Build a function `validateTemplate(template, data)` that validates whether all placeholders in a template string can be filled with the provided data object. Template uses `${key}` syntax. Return an object with `isValid` boolean and `missing` array of missing keys.

**Expected Input/Output:**
```javascript
validateTemplate("Hello ${name}, you are ${age} years old", { name: "John", age: 30 })
// Output: { isValid: true, missing: [] }

validateTemplate("Hello ${name}, you live in ${city}", { name: "Jane" })
// Output: { isValid: false, missing: ["city"] }
```

**Hints/Approach:**
- Use regex `/\$\{([^}]+)\}/g` to find placeholders
- Use `match()` or `matchAll()` methods
- Check if each placeholder key exists in data object
- Template literals won't work here - you need manual parsing

---

### Task 34: Case Converter Utility
**Difficulty:** Beginner

**Problem Description:**
Create a function `convertCase(str, targetCase)` that converts strings between different case formats: 'camelCase', 'snake_case', 'kebab-case', and 'PascalCase'.

**Expected Input/Output:**
```javascript
convertCase("helloWorld", "snake_case") // "hello_world"
convertCase("hello_world", "camelCase") // "helloWorld"
convertCase("hello-world", "PascalCase") // "HelloWorld"
```

**Hints/Approach:**
- First, normalize the string to an array of words
- Use regex to identify word boundaries
- Apply appropriate transformations for each case type
- Consider edge cases like consecutive uppercase letters

---

### Task 35: String Immutability Demonstrator
**Difficulty:** Beginner

**Problem Description:**
Create a function `demonstrateImmutability()` that shows strings are immutable in JavaScript. Attempt various operations and return an array of examples showing that string methods return new strings rather than modifying the original.

**Expected Input/Output:**
```javascript
demonstrateImmutability()
// Output: [
//   { original: "hello", attempted: "h", unchanged: "hello" },
//   { original: "WORLD", lowercased: "world", unchanged: "WORLD" }
// ]
```

**Hints/Approach:**
- Try operations like `toUpperCase()`, `slice()`, `replace()`
- Compare original and result to show immutability
- Demonstrate that string[0] = 'x' doesn't work

---

### Task 36: Regex-Based Email Extractor
**Difficulty:** Intermediate

**Problem Description:**
Write a function `extractEmails(text)` that finds and extracts all valid email addresses from a text string. Return them as an array, ensuring no duplicates and all lowercase.

**Expected Input/Output:**
```javascript
extractEmails("Contact us at support@example.com or Sales@example.com")
// Output: ["support@example.com", "sales@example.com"]

extractEmails("No emails here!")
// Output: []
```

**Hints/Approach:**
- Use regex pattern for email validation
- Use `match()` with global flag
- Convert to Set to remove duplicates
- Use `toLowerCase()` for normalization

---

## Numbers

### Task 37: Safe Number Calculator
**Difficulty:** Intermediate

**Problem Description:**
Create a calculator function `safeCalculate(num1, operator, num2)` that performs arithmetic operations while checking for precision issues, overflow, and special values like `NaN` and `Infinity`. Return an object with the result and any warnings.

**Expected Input/Output:**
```javascript
safeCalculate(0.1, '+', 0.2)
// Output: { result: 0.3, warning: "Floating point precision issue detected" }

safeCalculate(Number.MAX_VALUE, '*', 2)
// Output: { result: Infinity, warning: "Result exceeds safe number range" }
```

**Hints/Approach:**
- Check if numbers exceed `Number.MAX_SAFE_INTEGER`
- Detect floating point precision issues
- Use `Number.isFinite()` and `Number.isNaN()`
- Consider returning rounded results for floating point operations

---

### Task 38: Number Type Validator
**Difficulty:** Beginner

**Problem Description:**
Build a function `classifyNumber(value)` that takes any value and returns detailed information about it: whether it's a number, its type (integer, float, special), and if it's in the safe range.

**Expected Input/Output:**
```javascript
classifyNumber(42)
// Output: { isNumber: true, type: "integer", safe: true, value: 42 }

classifyNumber(3.14)
// Output: { isNumber: true, type: "float", safe: true, value: 3.14 }

classifyNumber(NaN)
// Output: { isNumber: true, type: "NaN", safe: false, value: NaN }
```

**Hints/Approach:**
- Use `typeof`, `Number.isInteger()`, `Number.isNaN()`
- Check against `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`
- Handle special values: `Infinity`, `-Infinity`, `NaN`

---

### Task 39: Floating Point Comparator
**Difficulty:** Intermediate

**Problem Description:**
Write a function `floatEquals(a, b, epsilon = 0.0001)` that compares two floating-point numbers for equality within a tolerance (epsilon), solving the classic 0.1 + 0.2 !== 0.3 problem.

**Expected Input/Output:**
```javascript
floatEquals(0.1 + 0.2, 0.3) // true
floatEquals(0.1 + 0.2, 0.3, 0.0000001) // false (too strict)
floatEquals(1.0000001, 1.0000002, 0.00001) // true
```

**Hints/Approach:**
- Calculate the absolute difference
- Compare difference against epsilon
- Consider using `Math.abs()`
- Handle edge cases like both values being zero

---

### Task 40: Number Base Converter
**Difficulty:** Advanced

**Problem Description:**
Create a function `convertBase(number, fromBase, toBase)` that converts numbers between different bases (2-36). Handle string inputs and outputs appropriately.

**Expected Input/Output:**
```javascript
convertBase("FF", 16, 10) // "255"
convertBase("255", 10, 16) // "FF"
convertBase("1010", 2, 10) // "10"
```

**Hints/Approach:**
- Use `parseInt(string, base)` to parse from source base
- Use `toString(base)` to convert to target base
- Validate that input is valid for source base
- Handle uppercase/lowercase for bases > 10

---

### Task 41: Precision Rounder
**Difficulty:** Beginner

**Problem Description:**
Implement `roundToPrecision(number, decimals)` that rounds a number to a specified number of decimal places, avoiding floating-point errors.

**Expected Input/Output:**
```javascript
roundToPrecision(1.005, 2) // 1.01 (not 1.00)
roundToPrecision(2.675, 2) // 2.68 (not 2.67)
roundToPrecision(0.1 + 0.2, 1) // 0.3
```

**Hints/Approach:**
- Use `Math.round()` with multiplication/division
- Be aware of banker's rounding
- Consider using `Number.EPSILON` for adjustments
- Test with problematic values like 1.005

---

## Booleans & Logic

### Task 42: Truthy/Falsy Analyzer
**Difficulty:** Beginner

**Problem Description:**
Create `analyzeTruthiness(values)` that takes an array of any values and returns an object categorizing them into truthy and falsy groups, along with their types.

**Expected Input/Output:**
```javascript
analyzeTruthiness([0, 1, "", "hello", null, undefined, [], {}])
// Output: {
//   truthy: [{ value: 1, type: "number" }, { value: "hello", type: "string" }, ...],
//   falsy: [{ value: 0, type: "number" }, { value: "", type: "string" }, ...]
// }
```

**Hints/Approach:**
- JavaScript has 6 falsy values: false, 0, "", null, undefined, NaN
- Use Boolean(value) or !!value to test truthiness
- Use typeof for type detection
- Remember [] and {} are truthy

---

### Task 43: Logical Operators Deep Dive
**Difficulty:** Intermediate

**Problem Description:**
Build `evaluateLogical(a, operator, b)` that performs logical operations (&&, ||, ??) and returns both the result and an explanation of why that result was returned based on JavaScript's short-circuit evaluation.

**Expected Input/Output:**
```javascript
evaluateLogical(0, '||', 5)
// Output: { result: 5, explanation: "Left side (0) is falsy, returned right side" }

evaluateLogical("hello", '&&', "world")
// Output: { result: "world", explanation: "Left side is truthy, returned right side" }
```

**Hints/Approach:**
- && returns first falsy value or last value
- || returns first truthy value or last value
- ?? only checks for null/undefined
- Explain the short-circuit behavior

---

### Task 44: Boolean Coercion Tester
**Difficulty:** Intermediate

**Problem Description:**
Write `testCoercion(value)` that demonstrates all the ways JavaScript might coerce a value to boolean in different contexts (if statements, logical operators, Boolean constructor, etc.).

**Expected Input/Output:**
```javascript
testCoercion([])
// Output: {
//   value: [],
//   inCondition: true,
//   withDoubleBang: true,
//   withBoolean: true,
//   withLogicalOr: [],
//   isConsideredTruthy: true
// }
```

**Hints/Approach:**
- Test in if statement context
- Try !!, Boolean(), logical operators
- Note that some contexts return the value, not a boolean
- Include type information

---

## Null & Undefined

### Task 45: Null/Undefined Guard
**Difficulty:** Beginner

**Problem Description:**
Create `safeAccess(obj, path, defaultValue)` that safely accesses nested object properties without throwing errors when encountering null or undefined. The path is a string like "user.address.city".

**Expected Input/Output:**
```javascript
safeAccess({ user: { name: "John" } }, "user.name", "N/A") // "John"
safeAccess({ user: null }, "user.address.city", "N/A") // "N/A"
safeAccess({}, "user.name", "Unknown") // "Unknown"
```

**Hints/Approach:**
- Split path by dots
- Check for null/undefined at each level
- Use optional chaining (?.) or manual checks
- Return defaultValue if path breaks

---

### Task 46: Null vs Undefined Differentiator
**Difficulty:** Beginner

**Problem Description:**
Write `distinguishNullish(obj)` that analyzes an object and categorizes its properties into three groups: those with null values, those with undefined values, and those with actual values.

**Expected Input/Output:**
```javascript
distinguishNullish({ a: 1, b: null, c: undefined, d: 0 })
// Output: {
//   withNull: ["b"],
//   withUndefined: ["c"],
//   withValues: ["a", "d"]
// }
```

**Hints/Approach:**
- Use `Object.entries()` or `Object.keys()`
- Use strict equality (===) to differentiate null and undefined
- Remember: 0, "", false are actual values
- Consider missing properties as undefined

---

### Task 47: Nullish Coalescing Implementer
**Difficulty:** Intermediate

**Problem Description:**
Implement `customNullishCoalesce(value, ...fallbacks)` that mimics the ?? operator but accepts multiple fallback values, returning the first non-nullish value.

**Expected Input/Output:**
```javascript
customNullishCoalesce(null, undefined, 0, "default") // 0
customNullishCoalesce(undefined, null, "fallback") // "fallback"
customNullishCoalesce(false, "won't reach") // false
```

**Hints/Approach:**
- Only null and undefined are "nullish"
- 0, false, "" are NOT nullish
- Iterate through arguments
- Return first non-nullish value

---

## Symbols

### Task 48: Symbol-Based Privacy
**Difficulty:** Intermediate

**Problem Description:**
Create a `User` class that uses Symbols to create truly private properties that won't show up in JSON serialization or Object.keys(). Implement properties like _id and _password using Symbols.

**Expected Input/Output:**
```javascript
const user = new User("John", "secret123");
user.getName() // "John"
Object.keys(user) // ["name"] // Symbol properties not included
JSON.stringify(user) // '{"name":"John"}' // Symbol properties excluded
```

**Hints/Approach:**
- Create Symbols outside the class or in static properties
- Use Symbols as property keys: `this[symbolKey] = value`
- Symbols aren't enumerable in for...in or Object.keys()
- Provide getter methods to access Symbol properties

---

### Task 49: Global Symbol Registry
**Difficulty:** Advanced

**Problem Description:**
Build a function `manageSymbols()` that demonstrates the difference between regular Symbols and global symbols (Symbol.for). Create a system that tracks both types and can detect if a symbol is global or local.

**Expected Input/Output:**
```javascript
const result = manageSymbols();
// Output: {
//   localSymbol: Symbol(test),
//   globalSymbol: Symbol(test),
//   areEqual: false,
//   globalKey: "test",
//   localKey: undefined
// }
```

**Hints/Approach:**
- Use Symbol() for local symbols
- Use Symbol.for() for global symbols
- Use Symbol.keyFor() to check if a symbol is global
- Global symbols with same key are identical

---

### Task 50: Well-Known Symbols
**Difficulty:** Advanced

**Problem Description:**
Create an object `CustomCollection` that implements custom behavior for well-known symbols: Symbol.iterator, Symbol.toStringTag, and Symbol.toPrimitive.

**Expected Input/Output:**
```javascript
const col = new CustomCollection([1, 2, 3]);
[...col] // [1, 2, 3] (using Symbol.iterator)
String(col) // "[object CustomCollection]" (using Symbol.toStringTag)
+col // 6 (sum of elements, using Symbol.toPrimitive)
```

**Hints/Approach:**
- Symbol.iterator: make object iterable with for...of
- Symbol.toStringTag: customize Object.prototype.toString output
- Symbol.toPrimitive: control type conversion behavior
- Use generator functions for iterator

---

## BigInt

### Task 51: Large Number Factorial
**Difficulty:** Intermediate

**Problem Description:**
Write `bigFactorial(n)` that calculates factorial for very large numbers (e.g., 100!) using BigInt. Return the result as a BigInt and also provide the number of digits.

**Expected Input/Output:**
```javascript
bigFactorial(20)
// Output: { result: 2432902008176640000n, digits: 19 }

bigFactorial(100)
// Output: { result: 93326215443...000n, digits: 158 }
```

**Hints/Approach:**
- Convert n to BigInt for calculations
- Use BigInt literals (n suffix)
- Calculate digits using toString().length
- Handle edge cases (0!, 1!)

---

### Task 52: BigInt and Number Mixer
**Difficulty:** Beginner

**Problem Description:**
Create `mixedCalculation(bigIntValue, numberValue, operation)` that safely performs operations between BigInt and Number types by handling conversion and potential precision loss.

**Expected Input/Output:**
```javascript
mixedCalculation(100n, 50, '+')
// Output: { result: 150n, type: "BigInt", warning: null }

mixedCalculation(BigInt(Number.MAX_SAFE_INTEGER), 1.5, '+')
// Output: { result: 9007199254740993n, warning: "Decimal part lost in conversion" }
```

**Hints/Approach:**
- Can't directly mix BigInt and Number
- Convert Number to BigInt (loses decimal)
- Or convert BigInt to Number (may lose precision)
- Warn about precision loss

---

### Task 53: BigInt Range Validator
**Difficulty:** Intermediate

**Problem Description:**
Write `isInBigIntRange(value, min, max)` that checks if a value (which might be Number, BigInt, or string) falls within a specified BigInt range. Handle type conversions safely.

**Expected Input/Output:**
```javascript
isInBigIntRange("12345678901234567890", 0n, 99999999999999999999n) // true
isInBigIntRange(100, 0n, 50n) // false
isInBigIntRange(9007199254740992, 0n, 10000000000000000n) // true
```

**Hints/Approach:**
- Try converting value to BigInt
- Handle potential conversion errors (decimals, invalid strings)
- Use BigInt comparison operators
- Return false for unconvertible values

---

## Type Checking & Validation

### Task 54: Comprehensive Type Checker
**Difficulty:** Advanced

**Problem Description:**
Build `getDetailedType(value)` that returns much more detailed type information than typeof, distinguishing between arrays, null, dates, regex, different number types, etc.

**Expected Input/Output:**
```javascript
getDetailedType([1, 2, 3])
// Output: { primitive: false, type: "Array", constructor: "Array", toString: "[object Array]" }

getDetailedType(null)
// Output: { primitive: true, type: "null", constructor: null, toString: "[object Null]" }
```

**Hints/Approach:**
- typeof has limitations (null, arrays)
- Use Object.prototype.toString.call()
- Check Array.isArray(), Number.isNaN()
- Check constructor property
- Handle edge cases

---

### Task 55: Type Coercion Predictor
**Difficulty:** Advanced

**Problem Description:**
Create `predictCoercion(value1, operator, value2)` that predicts and explains how JavaScript will coerce types in an operation before actually performing it.

**Expected Input/Output:**
```javascript
predictCoercion(5, '+', '5')
// Output: {
//   result: "55",
//   explanation: "Number coerced to string because + operator with string performs concatenation",
//   coercionType: "Number→String"
// }
```

**Hints/Approach:**
- Rules differ by operator (+, -, ==, etc.)
- + with string converts to string
- Other math operators convert to numbers
- == has complex coercion rules
- Explain the coercion steps

---

### Task 56: Strict Equality Explainer
**Difficulty:** Intermediate

**Problem Description:**
Write `compareValues(a, b)` that compares two values using both == and ===, explains the difference in results, and details any type coercion that occurs.

**Expected Input/Output:**
```javascript
compareValues('5', 5)
// Output: {
//   looseEqual: true,
//   strictEqual: false,
//   explanation: "Loose equality coerced string '5' to number 5",
//   types: { a: "string", b: "number" }
// }
```

**Hints/Approach:**
- Use both == and === operators
- Explain when results differ
- Detail the coercion steps for ==
- Note type information

---

## Object Properties

### Task 57: Dynamic Property Creator
**Difficulty:** Intermediate

**Problem Description:**
Build `createDynamicObject(properties)` that creates an object with properties of different types (regular, computed, symbol, non-enumerable) based on configuration.

**Expected Input/Output:**
```javascript
createDynamicObject([
  { key: 'name', value: 'John', enumerable: true },
  { key: Symbol('id'), value: 123, enumerable: false },
  { key: 'computed', value: () => 'Hello', getter: true }
])
```

**Hints/Approach:**
- Use Object.defineProperty() for fine control
- Handle Symbol keys differently
- Support getters/setters with getter flag
- Control enumerable, writable, configurable

---

### Task 58: Object Property Type Mapper
**Difficulty:** Beginner

**Problem Description:**
Create `mapPropertyTypes(obj)` that analyzes an object and returns a new object with the same structure but with type names as values instead of actual values.

**Expected Input/Output:**
```javascript
mapPropertyTypes({ name: "John", age: 30, active: true })
// Output: { name: "string", age: "number", active: "boolean" }

mapPropertyTypes({ user: { id: 1 } })
// Output: { user: "object" }
```

**Hints/Approach:**
- Use Object.entries() to iterate
- Use typeof for primitive detection
- Consider special cases (null, arrays)
- Maintain object structure

---

### Task 59: Property Descriptor Analyzer
**Difficulty:** Advanced

**Problem Description:**
Write `analyzeDescriptors(obj)` that returns complete information about all property descriptors in an object, including non-enumerable and symbol properties.

**Expected Input/Output:**
```javascript
const obj = {};
Object.defineProperty(obj, 'hidden', { value: 42, enumerable: false });
analyzeDescriptors(obj)
// Output: {
//   hidden: { value: 42, writable: false, enumerable: false, configurable: false }
// }
```

**Hints/Approach:**
- Use Object.getOwnPropertyDescriptors()
- Include Symbol properties with Object.getOwnPropertySymbols()
- Show all descriptor properties
- Merge regular and symbol properties

---

## Copy Operations

### Task 60: Copy Comparison Tool
**Difficulty:** Intermediate

**Problem Description:**
Create `demonstrateCopyTypes(obj)` that makes both shallow and deep copies of an object, then modifies nested properties to show the difference.

**Expected Input/Output:**
```javascript
demonstrateCopyTypes({ user: { name: "John" } })
// Output: {
//   original: { user: { name: "Modified" } },
//   shallow: { user: { name: "Modified" } },
//   deep: { user: { name: "John" } },
//   explanation: "Shallow copy shares nested object references"
// }
```

**Hints/Approach:**
- Shallow: use spread operator or Object.assign()
- Deep: use JSON.parse(JSON.stringify()) or structuredClone()
- Modify nested property in each copy
- Show which copies are affected

---

### Task 61: Safe Deep Clone
**Difficulty:** Advanced

**Problem Description:**
Implement `deepClone(obj)` that creates a true deep copy of an object, handling special cases like dates, regex, functions, circular references, and symbols.

**Expected Input/Output:**
```javascript
const original = {
  date: new Date(),
  regex: /test/g,
  func: () => {},
  nested: { a: 1 }
};
const cloned = deepClone(original);
// All properties correctly cloned with proper types
```

**Hints/Approach:**
- Recursively clone nested objects/arrays
- Check constructor/type for special objects
- Handle Date, RegExp, Set, Map
- Use WeakMap to track circular references
- Preserve Symbol properties
- JSON methods won't work for all cases

---

## Practical Combined Applications

### Task 62: Form Data Validator
**Difficulty:** Advanced

**Problem Description:**
Create `validateFormData(data, schema)` that validates form data against a schema, checking types, required fields, formats (email, phone), and ranges. Return detailed validation results.

**Expected Input/Output:**
```javascript
const schema = {
  email: { type: 'string', format: 'email', required: true },
  age: { type: 'number', min: 0, max: 150, required: true }
};
validateFormData({ email: 'invalid', age: 200 }, schema)
// Output: {
//   valid: false,
//   errors: [
//     { field: 'email', message: 'Invalid email format' },
//     { field: 'age', message: 'Value exceeds maximum (150)' }
//   ]
// }
```

**Hints/Approach:**
- Check typeof for basic type validation
- Use regex for format validation
- Handle null/undefined for required fields
- Provide specific error messages
- Validate ranges for numbers

---

### Task 63: Data Type Converter Pipeline
**Difficulty:** Advanced

**Problem Description:**
Build `convertData(value, conversions)` that applies a series of type conversions to a value, showing the transformation at each step. Conversions: 'string', 'number', 'boolean', 'bigint', 'array', 'json'.

**Expected Input/Output:**
```javascript
convertData(42, ['string', 'array', 'json'])
// Output: {
//   original: 42,
//   steps: [
//     { step: 'string', result: '42', type: 'string' },
//     { step: 'array', result: ['42'], type: 'object' },
//     { step: 'json', result: '["42"]', type: 'string' }
//   ],
//   final: '["42"]'
// }
```

**Hints/Approach:**
- Apply conversions sequentially
- Track intermediate results
- Handle conversion failures gracefully
- Show type at each step
- Some conversions may not be possible

---

## Summary & Learning Path

### Task Distribution by Difficulty

**Beginner (15 tasks):** 1, 6, 7, 9, 10, 11, 13, 18, 34, 35, 38, 41, 42, 45, 46, 52, 58

**Intermediate (31 tasks):** 2, 3, 5, 8, 12, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 28, 32, 36, 37, 39, 43, 44, 47, 48, 51, 53, 56, 57, 60, 62

**Advanced (17 tasks):** 4, 26, 27, 29, 30, 31, 33, 40, 49, 50, 54, 55, 59, 61, 63

### Coverage by Data Structure

**Arrays:** 3 tasks • **Objects/Hash Maps:** 3 tasks • **Maps/Sets:** 3 tasks • **Stacks:** 3 tasks • **Queues:** 3 tasks • **Linked Lists:** 4 tasks • **Trees:** 4 tasks • **Graphs:** 3 tasks • **Heaps:** 3 tasks • **Tries:** 1 task • **Integrated:** 1 task

### Coverage by Data Type

**Strings:** 5 tasks • **Numbers:** 5 tasks • **Booleans:** 3 tasks • **Null/Undefined:** 3 tasks • **Symbols:** 3 tasks • **BigInt:** 3 tasks • **Type Operations:** 3 tasks • **Object Properties:** 3 tasks • **Copy Operations:** 2 tasks • **Practical:** 2 tasks

### Recommended Learning Path

1. **Foundation (Weeks 1-2):** Start with beginner tasks in arrays, stacks, queues, and basic type operations. Focus on understanding core concepts and JavaScript fundamentals.

2. **Building Skills (Weeks 3-4):** Progress to intermediate tasks involving linked lists, trees, and more complex type manipulations. Begin combining data structures with practical problems.

3. **Advanced Concepts (Weeks 5-6):** Tackle advanced tasks including graphs, heaps, tries, and sophisticated type systems. Work on optimization and handling edge cases.

4. **Mastery (Week 7+):** Complete integrated tasks that combine multiple concepts. Focus on real-world applications and system design challenges.

This comprehensive collection provides a complete curriculum for mastering JavaScript data structures and data types through hands-on practice. Work through tasks at your own pace, focusing on understanding the underlying concepts rather than rushing through solutions. Each completed task builds toward expertise in JavaScript fundamentals.