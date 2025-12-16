# Collections

## What You'll Learn
- Generic vs non-generic collections
- List<T>, Dictionary<TKey, TValue>, HashSet<T>
- Queue<T>, Stack<T>, LinkedList<T>
- SortedList, SortedDictionary, SortedSet
- Concurrent collections
- Collection interfaces (IEnumerable, ICollection, IList)
- Custom collections
- Performance characteristics

## Concept Overview

Collections are data structures that store and organize multiple items. C# provides many specialized collections for different scenarios.

### List<T> - Dynamic Array

```csharp
// Create and initialize
List<int> numbers = new List<int>();
List<string> names = new List<string> { "Alice", "Bob", "Charlie" };

// Add items
numbers.Add(1);
numbers.AddRange(new[] { 2, 3, 4, 5 });

// Access items
int first = numbers[0];
int last = numbers[numbers.Count - 1];

// Remove items
numbers.Remove(3);  // Remove value 3
numbers.RemoveAt(0);  // Remove at index 0
numbers.RemoveAll(n => n > 3);  // Remove matching items

// Search
bool contains = numbers.Contains(5);
int index = numbers.IndexOf(4);
int found = numbers.Find(n => n > 2);  // First match
List<int> filtered = numbers.FindAll(n => n > 2);  // All matches

// Sort
numbers.Sort();  // Ascending
numbers.Sort((a, b) => b.CompareTo(a));  // Descending
numbers.Reverse();

// Iterate
foreach (int num in numbers)
{
    Console.WriteLine(num);
}
```

### Dictionary<TKey, TValue> - Key-Value Pairs

```csharp
// Create and initialize
Dictionary<string, int> ages = new Dictionary<string, int>();
Dictionary<int, string> students = new Dictionary<int, string>
{
    { 1, "Alice" },
    { 2, "Bob" },
    { 3, "Charlie" }
};

// Add items
ages.Add("Alice", 25);
ages["Bob"] = 30;  // Add or update

// Access items
int aliceAge = ages["Alice"];

// Safe access
if (ages.TryGetValue("Bob", out int bobAge))
{
    Console.WriteLine($"Bob is {bobAge}");
}

// Check existence
bool hasAlice = ages.ContainsKey("Alice");
bool hasAge25 = ages.ContainsValue(25);

// Remove items
ages.Remove("Alice");

// Iterate
foreach (var kvp in ages)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}

// Iterate keys and values
foreach (string key in ages.Keys)
{
    Console.WriteLine(key);
}

foreach (int value in ages.Values)
{
    Console.WriteLine(value);
}
```

### HashSet<T> - Unique Items

```csharp
// Create
HashSet<int> numbers = new HashSet<int> { 1, 2, 3, 4, 5 };
HashSet<string> uniqueNames = new HashSet<string>();

// Add items (duplicates ignored)
uniqueNames.Add("Alice");
uniqueNames.Add("Bob");
uniqueNames.Add("Alice");  // Won't be added
// uniqueNames contains: Alice, Bob

// Set operations
HashSet<int> set1 = new HashSet<int> { 1, 2, 3, 4 };
HashSet<int> set2 = new HashSet<int> { 3, 4, 5, 6 };

// Union
set1.UnionWith(set2);  // set1 = { 1, 2, 3, 4, 5, 6 }

// Intersection
set1.IntersectWith(set2);  // set1 = { 3, 4 }

// Difference
set1.ExceptWith(set2);  // set1 = { 1, 2 }

// Symmetric difference
set1.SymmetricExceptWith(set2);  // Items in either but not both

// Subset/Superset checks
bool isSubset = set1.IsSubsetOf(set2);
bool isSuperset = set1.IsSupersetOf(set2);
```

### Queue<T> - First In, First Out (FIFO)

```csharp
// Create
Queue<string> queue = new Queue<string>();

// Enqueue (add to back)
queue.Enqueue("First");
queue.Enqueue("Second");
queue.Enqueue("Third");

// Dequeue (remove from front)
string first = queue.Dequeue();  // "First"
string second = queue.Dequeue();  // "Second"

// Peek (view front without removing)
string next = queue.Peek();  // "Third"

// Check count
int count = queue.Count;

// Check if empty
bool isEmpty = queue.Count == 0;

// Iterate (doesn't remove items)
foreach (string item in queue)
{
    Console.WriteLine(item);
}
```

### Stack<T> - Last In, First Out (LIFO)

```csharp
// Create
Stack<int> stack = new Stack<int>();

// Push (add to top)
stack.Push(1);
stack.Push(2);
stack.Push(3);

// Pop (remove from top)
int top = stack.Pop();  // 3
int next = stack.Pop();  // 2

// Peek (view top without removing)
int current = stack.Peek();  // 1

// Count and check
int count = stack.Count;
bool contains = stack.Contains(1);
```

### LinkedList<T> - Doubly Linked List

```csharp
// Create
LinkedList<string> list = new LinkedList<string>();

// Add items
list.AddFirst("First");
list.AddLast("Last");

LinkedListNode<string> node = list.Find("First");
list.AddAfter(node, "Middle");

// Remove items
list.RemoveFirst();
list.RemoveLast();
list.Remove("Middle");

// Iterate
foreach (string item in list)
{
    Console.WriteLine(item);
}

// Navigate nodes
LinkedListNode<string> current = list.First;
while (current != null)
{
    Console.WriteLine(current.Value);
    current = current.Next;
}
```

### SortedDictionary<TKey, TValue> - Sorted Key-Value

```csharp
// Automatically sorted by key
SortedDictionary<int, string> sorted = new SortedDictionary<int, string>
{
    { 3, "Three" },
    { 1, "One" },
    { 2, "Two" }
};

// Iterates in sorted order: 1, 2, 3
foreach (var kvp in sorted)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}
// Output:
// 1: One
// 2: Two
// 3: Three
```

### SortedSet<T> - Sorted Unique Items

```csharp
SortedSet<int> sortedSet = new SortedSet<int> { 5, 2, 8, 1, 9, 3 };

// Automatically sorted: 1, 2, 3, 5, 8, 9
foreach (int num in sortedSet)
{
    Console.WriteLine(num);
}

// Set operations (like HashSet)
SortedSet<int> set1 = new SortedSet<int> { 1, 2, 3 };
SortedSet<int> set2 = new SortedSet<int> { 2, 3, 4 };

set1.UnionWith(set2);  // Sorted: 1, 2, 3, 4
```

### Concurrent Collections (Thread-Safe)

```csharp
using System.Collections.Concurrent;

// ConcurrentBag - unordered collection
ConcurrentBag<int> bag = new ConcurrentBag<int>();
bag.Add(1);
bag.Add(2);
bag.TryTake(out int item);

// ConcurrentQueue - thread-safe queue
ConcurrentQueue<string> queue = new ConcurrentQueue<string>();
queue.Enqueue("First");
queue.TryDequeue(out string result);

// ConcurrentStack - thread-safe stack
ConcurrentStack<int> stack = new ConcurrentStack<int>();
stack.Push(1);
stack.TryPop(out int value);

// ConcurrentDictionary - thread-safe dictionary
ConcurrentDictionary<string, int> dict = new ConcurrentDictionary<string, int>();
dict.TryAdd("Alice", 25);
dict.TryUpdate("Alice", 26, 25);
dict.AddOrUpdate("Bob", 30, (key, oldValue) => oldValue + 1);
```

### Custom Collection

```csharp
public class CustomList<T> : IEnumerable<T>
{
    private T[] items = new T[4];
    private int count = 0;

    public void Add(T item)
    {
        if (count == items.Length)
        {
            Array.Resize(ref items, items.Length * 2);
        }
        items[count++] = item;
    }

    public T this[int index]
    {
        get
        {
            if (index < 0 || index >= count)
                throw new IndexOutOfRangeException();
            return items[index];
        }
    }

    public int Count => count;

    public IEnumerator<T> GetEnumerator()
    {
        for (int i = 0; i < count; i++)
        {
            yield return items[i];
        }
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
```

## Your Tasks

### Task 1: List Operations
Create a program that:
- Creates a List<int> with 20 random numbers (1-100)
- Finds min, max, average
- Removes all numbers less than 30
- Sorts the remaining numbers
- Finds and displays duplicates
Display results at each step.

### Task 2: Dictionary - Phone Book
Create a phone book using Dictionary<string, string>:
- Add 10 contacts (name -> phone)
- Search by name
- Update contact
- Delete contact
- Display all contacts sorted by name
- Find contacts with specific area code
Implement a menu system.

### Task 3: HashSet - Unique Words
Read text input and:
- Store unique words in HashSet<string>
- Compare two texts and find:
  - Common words (intersection)
  - Words only in first text
  - Words only in second text
  - All unique words from both
Display results.

### Task 4: Queue - Customer Service
Simulate a customer service queue:
- Customers arrive and join queue
- Service representatives serve customers
- Track wait times
- Display queue status
- Show statistics (avg wait time, total served)
Simulate 20 customers with random arrival times.

### Task 5: Stack - Undo/Redo
Implement undo/redo functionality:
- Stack for undo operations
- Stack for redo operations
- Commands: Add, Update, Delete
- Operations: Undo, Redo, Display history
Test with multiple operations.

### Task 6: LinkedList - Music Playlist
Create a music playlist using LinkedList<Song>:
- Add songs at beginning, end, or position
- Remove songs
- Navigate forward and backward
- Shuffle playlist
- Display current song and next/previous
Test with 10 songs.

### Task 7: SortedDictionary - Leaderboard
Create a game leaderboard:
- SortedDictionary<int, Player> sorted by score
- Add players with scores
- Update scores
- Display top 10 players
- Display rank for specific player
- Show score distribution
Test with 20 players.

### Task 8: Collection Performance Comparison
Compare performance of different collections:
- List vs LinkedList for insertions
- Dictionary vs SortedDictionary for lookups
- HashSet vs List for Contains operations
- Queue vs Stack for add/remove
Measure and display execution times for 10,000 operations.

### Task 9: Custom Collection - CircularBuffer
Implement a CircularBuffer<T>:
- Fixed capacity
- Overwrites oldest item when full
- Methods: Add, Get, IsFull, IsEmpty, Count
- Implement IEnumerable<T>
- Property: Capacity
Test with different data types.

### Task 10: Multi-Level Cache
Implement a caching system using multiple collections:
- Dictionary for O(1) access
- LinkedList for LRU (Least Recently Used) ordering
- Maximum capacity
- Methods: Get, Put, Display
- Evict least recently used when full
Test cache behavior.

### Task 11: Inventory Management
Create an inventory system using:
- Dictionary<int, Product> for products by ID
- SortedDictionary<string, HashSet<int>> for products by category
- SortedSet<Product> sorted by price
Operations:
- Add/remove products
- Update stock
- Search by ID, category, price range
- Display reports
Test with 30 products.

### Task 12: Concurrent Collection - Web Crawler
Simulate a web crawler using ConcurrentCollections:
- ConcurrentQueue<string> for URLs to visit
- ConcurrentBag<string> for visited URLs
- ConcurrentDictionary<string, int> for URL -> depth
- Multiple "crawler threads" processing URLs
- Track statistics (URLs visited, queue size)
Simulate crawling with async operations.

## Expected Output Examples

**Task 2:**
```
Phone Book Menu:
1. Add Contact
2. Search Contact
3. Update Contact
4. Delete Contact
5. Display All
6. Search by Area Code
7. Exit

> 1
Name: Alice Johnson
Phone: 555-1234
Contact added.

> 5
All Contacts:
1. Alice Johnson: 555-1234
2. Bob Smith: 555-5678
3. Charlie Brown: 555-9012

Total contacts: 3
```

**Task 4:**
```
Customer Service Simulation

Time 0: Customer #1 arrives
Time 2: Customer #2 arrives
Time 3: Rep 1 starts serving Customer #1
Time 5: Customer #3 arrives
Time 8: Rep 1 finishes Customer #1 (wait: 5s)
Time 8: Rep 1 starts serving Customer #2
...

Statistics:
Total customers: 20
Total served: 20
Average wait time: 7.3 seconds
Maximum wait time: 15 seconds
```

**Task 8:**
```
Performance Comparison (10,000 operations)

List vs LinkedList - Insert at beginning:
List: 892ms
LinkedList: 12ms
Winner: LinkedList (74x faster)

Dictionary vs SortedDictionary - Random lookups:
Dictionary: 5ms
SortedDictionary: 18ms
Winner: Dictionary (3.6x faster)

HashSet vs List - Contains check:
HashSet: 3ms
List: 245ms
Winner: HashSet (81x faster)
```

**Task 10:**
```
LRU Cache (Capacity: 3)

Put(1, "One")
Cache: [1:One]

Put(2, "Two")
Cache: [2:Two, 1:One]

Put(3, "Three")
Cache: [3:Three, 2:Two, 1:One]

Get(1)
Cache: [1:One, 3:Three, 2:Two]  // 1 moved to front

Put(4, "Four")
Cache: [4:Four, 1:One, 3:Three]  // 2 evicted (LRU)
```

## Tips
- Use List<T> for most general-purpose collections
- Use Dictionary<TKey, TValue> for fast lookups by key
- Use HashSet<T> for unique items and set operations
- Use Queue<T> for FIFO scenarios
- Use Stack<T> for LIFO scenarios
- Use concurrent collections for thread-safe operations
- Consider performance characteristics for your use case
- Use appropriate capacity to avoid resizing
- Implement IEnumerable<T> for foreach support
- Use collection initializers for cleaner code

## Common Mistakes

```csharp
// ❌ Modifying collection while iterating
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
foreach (int num in numbers)
{
    if (num % 2 == 0)
        numbers.Remove(num);  // ❌ InvalidOperationException!
}

// ✅ Use separate list or iterate backwards
for (int i = numbers.Count - 1; i >= 0; i--)
{
    if (numbers[i] % 2 == 0)
        numbers.RemoveAt(i);
}

// ❌ Dictionary access with missing key
Dictionary<string, int> dict = new Dictionary<string, int>();
int value = dict["missing"];  // ❌ KeyNotFoundException!

// ✅ Use TryGetValue
if (dict.TryGetValue("missing", out int value))
{
    Console.WriteLine(value);
}

// ❌ Using List for Contains checks
List<int> list = new List<int>(Enumerable.Range(1, 10000));
bool contains = list.Contains(9999);  // O(n) - slow!

// ✅ Use HashSet for Contains
HashSet<int> set = new HashSet<int>(Enumerable.Range(1, 10000));
bool contains = set.Contains(9999);  // O(1) - fast!

// ❌ Not specifying initial capacity
List<int> list = new List<int>();
for (int i = 0; i < 1000000; i++)
{
    list.Add(i);  // Multiple resizes!
}

// ✅ Specify capacity if known
List<int> list = new List<int>(1000000);
for (int i = 0; i < 1000000; i++)
{
    list.Add(i);  // No resizing
}

// ❌ Using wrong collection type
Stack<int> stack = new Stack<int>();
// Want to access middle element? Can't efficiently!

// ✅ Use List if you need indexing
List<int> list = new List<int>();
int middle = list[list.Count / 2];
```

## Key Concepts
- **List<T>**: Dynamic array, indexed access
- **Dictionary<TKey, TValue>**: Fast key-value lookups
- **HashSet<T>**: Unique items, set operations
- **Queue<T>**: FIFO collection
- **Stack<T>**: LIFO collection
- **LinkedList<T>**: Doubly linked list, efficient insertions
- **SortedDictionary**: Sorted key-value pairs
- **SortedSet**: Sorted unique items
- **Concurrent Collections**: Thread-safe collections
- **IEnumerable<T>**: Interface for iteration
- **Time Complexity**: Performance characteristics

## Next Steps
Move on to `06-File-IO` to learn file and directory operations!
