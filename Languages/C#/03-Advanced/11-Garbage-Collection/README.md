# Garbage Collection

## What You'll Learn
- What garbage collection is and why it's important
- How .NET garbage collector works
- Generations in garbage collection (Gen 0, 1, 2)
- Large Object Heap (LOH)
- Forcing garbage collection
- IDisposable pattern and finalizers
- Memory leaks in managed code
- Performance considerations
- GC modes (Workstation vs Server)
- Monitoring and profiling memory usage

## Concept Overview

Garbage Collection (GC) is an automatic memory management feature in .NET that frees developers from manually allocating and deallocating memory. The GC automatically reclaims memory occupied by objects that are no longer in use.

### How Garbage Collection Works

```csharp
// When you create objects, memory is allocated
Person person = new Person("Alice");  // Memory allocated on heap
int[] numbers = new int[1000];        // Memory allocated on heap

// When objects go out of scope or are no longer referenced
// they become eligible for garbage collection
person = null;  // Person object eligible for GC

// GC runs automatically and reclaims memory
// You don't need to manually free memory!
```

### Garbage Collection Process

```csharp
/*
1. MARK Phase: GC identifies which objects are still in use
   - Starts from "roots" (static fields, local variables, CPU registers)
   - Traces all reachable objects

2. COMPACT Phase: GC moves surviving objects together
   - Reduces memory fragmentation
   - Updates all references to moved objects

3. COLLECT Phase: Memory of unreachable objects is reclaimed
*/

class Program
{
    static void Main()
    {
        // Object created - allocated in Generation 0
        var obj1 = new MyClass();

        // After GC runs and obj1 survives, it moves to Gen 1
        // After another GC and survival, it moves to Gen 2

        // If obj1 is no longer referenced, it will be collected
        obj1 = null;

        // Force garbage collection (usually not recommended)
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();
    }
}
```

### Generational Garbage Collection

```csharp
using System;

class GenerationDemo
{
    static void Main()
    {
        // Create object
        var obj = new byte[1000];

        // Check which generation object is in
        Console.WriteLine($"Generation: {GC.GetGeneration(obj)}");  // 0

        // Force collection of Gen 0
        GC.Collect(0);
        Console.WriteLine($"After Gen 0 GC: {GC.GetGeneration(obj)}");  // 1

        // Force collection of Gen 0 and Gen 1
        GC.Collect(1);
        Console.WriteLine($"After Gen 1 GC: {GC.GetGeneration(obj)}");  // 2

        // Get GC collection counts
        Console.WriteLine($"\nGC Collections:");
        Console.WriteLine($"Gen 0: {GC.CollectionCount(0)}");
        Console.WriteLine($"Gen 1: {GC.CollectionCount(1)}");
        Console.WriteLine($"Gen 2: {GC.CollectionCount(2)}");
    }
}

/*
Generation 0 (Gen 0):
- Newly allocated objects
- Collected most frequently
- Fast collection

Generation 1 (Gen 1):
- Objects that survived one GC
- Buffer between short and long-lived objects
- Medium frequency

Generation 2 (Gen 2):
- Long-lived objects
- Collected least frequently
- Slower collection
*/
```

### Large Object Heap (LOH)

```csharp
class LOHDemo
{
    static void Main()
    {
        // Objects >= 85,000 bytes go to Large Object Heap
        byte[] smallArray = new byte[84999];   // Regular heap (Gen 0)
        byte[] largeArray = new byte[85000];   // Large Object Heap (Gen 2)

        Console.WriteLine($"Small array gen: {GC.GetGeneration(smallArray)}");  // 0
        Console.WriteLine($"Large array gen: {GC.GetGeneration(largeArray)}");  // 2

        // LOH is not compacted by default (to avoid copying large objects)
        // Can lead to fragmentation

        // .NET Core 2.1+ allows LOH compaction
        GCSettings.LargeObjectHeapCompactionMode =
            GCLargeObjectHeapCompactionMode.CompactOnce;
        GC.Collect();
    }
}
```

### IDisposable Pattern - Manual Resource Cleanup

```csharp
using System;
using System.IO;

// Proper IDisposable implementation
class ResourceHolder : IDisposable
{
    // Unmanaged resources (file handles, database connections, etc.)
    private FileStream fileStream;
    private bool disposed = false;

    public ResourceHolder(string filename)
    {
        fileStream = new FileStream(filename, FileMode.OpenOrCreate);
    }

    // Public Dispose method
    public void Dispose()
    {
        Dispose(true);
        // Tell GC not to call finalizer
        GC.SuppressFinalize(this);
    }

    // Protected Dispose method
    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing)
            {
                // Dispose managed resources
                if (fileStream != null)
                {
                    fileStream.Dispose();
                    fileStream = null;
                }
            }

            // Free unmanaged resources here (if any)

            disposed = true;
        }
    }

    // Finalizer (destructor)
    ~ResourceHolder()
    {
        Dispose(false);
    }
}

// Usage with using statement
class Program
{
    static void Main()
    {
        // using ensures Dispose is called automatically
        using (var resource = new ResourceHolder("test.txt"))
        {
            // Use resource
        } // Dispose called automatically here

        // Or with C# 8.0+ using declaration
        using var resource2 = new ResourceHolder("test2.txt");
        // Dispose called at end of scope
    }
}
```

### Finalizers (Destructors)

```csharp
class FinalizerDemo
{
    private string name;

    public FinalizerDemo(string name)
    {
        this.name = name;
        Console.WriteLine($"{name} created");
    }

    // Finalizer - called by GC before object is collected
    ~FinalizerDemo()
    {
        Console.WriteLine($"{name} finalized");
        // Don't put complex code here!
        // Finalizers slow down GC
    }
}

class Program
{
    static void Main()
    {
        CreateObjects();

        // Force GC to demonstrate finalization
        GC.Collect();
        GC.WaitForPendingFinalizers();
        GC.Collect();

        Console.WriteLine("Program ending");
    }

    static void CreateObjects()
    {
        var obj1 = new FinalizerDemo("Object 1");
        var obj2 = new FinalizerDemo("Object 2");
        // Objects go out of scope and become eligible for GC
    }
}

/*
Output:
Object 1 created
Object 2 created
Object 2 finalized
Object 1 finalized
Program ending

Note: Finalizer order is not guaranteed!
*/
```

### Weak References

```csharp
using System;

class WeakReferenceDemo
{
    static void Main()
    {
        var strongRef = new byte[1000000];  // Strong reference
        var weakRef = new WeakReference(strongRef);

        Console.WriteLine($"Target alive: {weakRef.IsAlive}");  // True

        // Remove strong reference
        strongRef = null;

        // GC might collect the object now
        GC.Collect();
        GC.WaitForPendingFinalizers();

        Console.WriteLine($"Target alive: {weakRef.IsAlive}");  // Might be False

        // Try to get object back
        if (weakRef.Target != null)
        {
            var recovered = (byte[])weakRef.Target;
            Console.WriteLine("Object recovered!");
        }
        else
        {
            Console.WriteLine("Object was collected");
        }
    }
}

// Use case: Caching
class Cache
{
    private WeakReference cachedData;

    public byte[] GetData()
    {
        // Try to get from cache
        if (cachedData != null && cachedData.IsAlive)
        {
            return (byte[])cachedData.Target;
        }

        // Cache miss - reload data
        byte[] data = LoadExpensiveData();
        cachedData = new WeakReference(data);
        return data;
    }

    private byte[] LoadExpensiveData()
    {
        return new byte[1000000];
    }
}
```

### Memory Leaks in Managed Code

```csharp
using System;
using System.Collections.Generic;

// Common memory leak: Event handlers not unsubscribed
class Publisher
{
    public event EventHandler DataChanged;

    public void ChangeData()
    {
        DataChanged?.Invoke(this, EventArgs.Empty);
    }
}

class Subscriber
{
    public Subscriber(Publisher publisher)
    {
        // Subscribe to event
        publisher.DataChanged += OnDataChanged;

        // ❌ MEMORY LEAK: If Subscriber is disposed but event not unsubscribed,
        // Publisher keeps Subscriber alive!
    }

    private void OnDataChanged(object sender, EventArgs e)
    {
        Console.WriteLine("Data changed");
    }

    // ✅ Proper cleanup
    public void Cleanup(Publisher publisher)
    {
        publisher.DataChanged -= OnDataChanged;
    }
}

// Common memory leak: Static collections
class UserManager
{
    // ❌ Static collection keeps all users in memory forever
    private static List<User> allUsers = new List<User>();

    public static void AddUser(User user)
    {
        allUsers.Add(user);
        // Users are never removed - memory leak!
    }
}

// Common memory leak: Unclosed resources
class ResourceLeak
{
    public void ProcessFile(string filename)
    {
        // ❌ MEMORY LEAK: FileStream not disposed
        var stream = new System.IO.FileStream(filename, System.IO.FileMode.Open);
        // ... use stream
        // stream.Dispose() never called!
    }

    // ✅ Proper resource management
    public void ProcessFileCorrectly(string filename)
    {
        using var stream = new System.IO.FileStream(filename, System.IO.FileMode.Open);
        // ... use stream
    } // Disposed automatically
}
```

### GC Methods and Properties

```csharp
using System;

class GCInfo
{
    static void Main()
    {
        // Get total memory
        long memory = GC.GetTotalMemory(false);
        Console.WriteLine($"Total memory: {memory:N0} bytes");

        // Get memory with collection
        long memoryAfterGC = GC.GetTotalMemory(true);
        Console.WriteLine($"Memory after GC: {memoryAfterGC:N0} bytes");

        // Check max generation
        int maxGen = GC.MaxGeneration;
        Console.WriteLine($"Max generation: {maxGen}");  // Usually 2

        // Collection counts
        Console.WriteLine($"\nCollection counts:");
        for (int i = 0; i <= GC.MaxGeneration; i++)
        {
            Console.WriteLine($"Gen {i}: {GC.CollectionCount(i)}");
        }

        // Get GC mode
        Console.WriteLine($"\nGC Mode: {GCSettings.IsServerGC}");
        Console.WriteLine($"Latency Mode: {GCSettings.LatencyMode}");

        // Create some garbage
        for (int i = 0; i < 1000; i++)
        {
            var temp = new byte[1000];
        }

        // Collection counts after garbage
        Console.WriteLine($"\nAfter creating garbage:");
        for (int i = 0; i <= GC.MaxGeneration; i++)
        {
            Console.WriteLine($"Gen {i}: {GC.CollectionCount(i)}");
        }
    }
}
```

### GC Latency Modes

```csharp
using System;
using System.Runtime;

class LatencyModeDemo
{
    static void Main()
    {
        // Default mode
        Console.WriteLine($"Default mode: {GCSettings.LatencyMode}");

        // Low latency mode for interactive applications
        GCSettings.LatencyMode = GCLatencyMode.LowLatency;
        try
        {
            // Do work that needs low GC pauses
            PerformTimeSensitiveOperation();
        }
        finally
        {
            // Restore default mode
            GCSettings.LatencyMode = GCLatencyMode.Interactive;
        }

        // Modes:
        // - Batch: Maximum throughput (server scenarios)
        // - Interactive: Balance (default for workstation)
        // - LowLatency: Minimize pauses (real-time apps)
        // - SustainedLowLatency: Very low pauses
        // - NoGCRegion: No GC in critical region
    }

    static void PerformTimeSensitiveOperation()
    {
        Console.WriteLine("Performing time-sensitive work...");
        // GC will try to minimize interruptions
    }
}
```

### GC Notifications

```csharp
using System;
using System.Threading;

class GCNotificationDemo
{
    static void Main()
    {
        // Register for GC notifications
        GC.RegisterForFullGCNotification(10, 10);

        var notificationThread = new Thread(() =>
        {
            while (true)
            {
                // Wait for approaching collection
                GCNotificationStatus status = GC.WaitForFullGCApproach();
                if (status == GCNotificationStatus.Succeeded)
                {
                    Console.WriteLine("Full GC approaching...");
                    // Take action: redirect requests, prepare for pause, etc.
                }

                // Wait for collection to complete
                status = GC.WaitForFullGCComplete();
                if (status == GCNotificationStatus.Succeeded)
                {
                    Console.WriteLine("Full GC completed");
                    // Resume normal operations
                }
            }
        });

        notificationThread.IsBackground = true;
        notificationThread.Start();

        // Simulate work
        Thread.Sleep(5000);

        // Cancel notifications
        GC.CancelFullGCNotification();
    }
}
```

## Your Tasks

### Task 1: Generation Tracker
Create a program that:
- Creates objects of different sizes
- Tracks which generation each object is in
- Forces GC collections and observes generation promotions
- Displays generation statistics
- Shows collection counts for each generation

### Task 2: Memory Monitor
Write a program that:
- Monitors total memory usage
- Creates arrays in a loop (1000 iterations)
- Shows memory before and after each GC
- Displays memory growth over time
- Forces periodic GC and shows memory reduction

### Task 3: IDisposable Implementation
Create a class `DatabaseConnection` that:
- Implements IDisposable properly
- Has a finalizer as backup
- Manages a simulated connection (use bool flag)
- Logs when Dispose and finalizer are called
- Test with using statement and without

### Task 4: Resource Cleanup Pattern
Implement a class `FileManager` with:
- Multiple IDisposable resources (use List<FileStream>)
- Proper Dispose pattern
- Method to open multiple files
- Method to close all files
- Prevent double disposal
- Test cleanup in various scenarios

### Task 5: Memory Leak Detector
Create a program that demonstrates:
- Event handler memory leak (subscribe but don't unsubscribe)
- Static collection memory leak
- Unclosed resource memory leak
- Show memory growing with each iteration
- Fix each leak and show memory stabilizing

### Task 6: Large Object Heap Demo
Write a program that:
- Creates small arrays (< 85KB)
- Creates large arrays (>= 85KB)
- Shows which generation each goes to
- Monitors LOH fragmentation
- Demonstrates LOH compaction in .NET Core

### Task 7: Weak Reference Cache
Implement a caching system using WeakReference:
- Class `ImageCache` with weak references
- Method: GetImage(string filename)
- If cached and alive, return cached image
- If collected, reload and cache
- Track cache hits and misses
- Simulate memory pressure with GC.Collect()

### Task 8: Finalizer Execution Order
Create a program that:
- Defines multiple classes with finalizers
- Each logs when finalized
- Creates objects in specific order
- Forces GC and observes finalization order
- Demonstrate order is not guaranteed
- Test with different object graphs

### Task 9: GC Performance Comparison
Write a benchmark program that:
- Compares performance with and without forced GC
- Measures time for object creation
- Measures GC pause times
- Tests different GC latency modes
- Shows impact on throughput
- Displays results in a table

### Task 10: Using Statement Practice
Create multiple scenarios demonstrating:
- Traditional using statement with braces
- C# 8.0 using declaration
- Multiple using statements
- Nested using statements
- Using with null objects (no crash)
- Using with exceptions (still disposes)

### Task 11: Memory Pressure Simulator
Build a program that:
- Gradually allocates more memory
- Monitors GC collections at each step
- Shows when Gen 0, 1, 2 collections occur
- Displays memory graphs (simple ASCII)
- Releases memory and shows GC behavior
- Analyzes collection patterns

### Task 12: Custom Disposable Pattern
Create an advanced `ResourcePool<T>` class that:
- Manages a pool of IDisposable resources
- Implements IDisposable
- Has methods: Acquire(), Release()
- Properly disposes all pooled resources
- Prevents use after disposal
- Uses ObjectDisposedException
- Test with multiple resource types

## Expected Output Examples

**Task 1:**
```
Object Generations:

Small object (1KB):
Initial generation: 0
After Gen 0 GC: 1
After Gen 1 GC: 2

GC Statistics:
Gen 0 collections: 3
Gen 1 collections: 2
Gen 2 collections: 1
```

**Task 3:**
```
DatabaseConnection Test:

Test 1: Using statement
Opening connection...
Using connection...
Dispose called - closing connection
Connection properly closed

Test 2: Without disposal
Opening connection...
Finalizer called - connection leaked!
Warning: Connection was not properly disposed
```

**Task 5:**
```
Memory Leak Demonstration:

Test 1: Event Handler Leak
Iteration 1: Memory = 5.2 MB
Iteration 10: Memory = 15.7 MB
Iteration 20: Memory = 26.3 MB
❌ Memory continuously growing!

After fixing (unsubscribe events):
Iteration 1: Memory = 5.2 MB
Iteration 10: Memory = 5.5 MB
Iteration 20: Memory = 5.4 MB
✅ Memory stable
```

**Task 7:**
```
Image Cache Test:

Loading image1.jpg... [Cache miss]
Loading image2.jpg... [Cache miss]
Getting image1.jpg... [Cache hit]
Getting image2.jpg... [Cache hit]

Simulating memory pressure...
GC.Collect()

Getting image1.jpg... [Cache miss - was collected]
Getting image2.jpg... [Cache miss - was collected]

Statistics:
Cache hits: 2
Cache misses: 4
Hit rate: 33.3%
```

**Task 11:**
```
Memory Pressure Simulation:

Allocated: 10 MB  | Gen 0: 1  Gen 1: 0  Gen 2: 0
Allocated: 20 MB  | Gen 0: 3  Gen 1: 0  Gen 2: 0
Allocated: 50 MB  | Gen 0: 8  Gen 1: 2  Gen 2: 0
Allocated: 100 MB | Gen 0: 15 Gen 1: 5  Gen 2: 1
Allocated: 200 MB | Gen 0: 25 Gen 1: 10 Gen 2: 3

Memory Graph:
[████████████████████░░░░░░░░░░░░] Gen 0 (25)
[████████░░░░░░░░░░░░░░░░░░░░░░░░] Gen 1 (10)
[███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] Gen 2 (3)
```

## Tips
- **Avoid calling GC.Collect()** - Let the GC manage itself
- **Always dispose IDisposable** - Use using statements
- **Unsubscribe event handlers** - Prevent memory leaks
- **Use finalizers sparingly** - They slow down GC
- **Monitor memory in production** - Use profilers
- **Understand generations** - Optimize object lifetimes
- **LOH is special** - Objects >= 85KB behave differently
- **WeakReference for caches** - Allow GC to reclaim when needed
- Use `GC.SuppressFinalize(this)` in Dispose method
- Implement Dispose pattern for unmanaged resources

## Common Mistakes

```csharp
// ❌ Forcing GC unnecessarily
for (int i = 0; i < 1000; i++)
{
    var obj = new MyObject();
    // ... use obj
    GC.Collect();  // ❌ Bad! Hurts performance
}

// ✅ Let GC manage itself
for (int i = 0; i < 1000; i++)
{
    var obj = new MyObject();
    // ... use obj
} // GC will collect when needed

// ❌ Not disposing resources
void ProcessFile()
{
    var stream = new FileStream("file.txt", FileMode.Open);
    // ... use stream
    // ❌ Stream never disposed!
}

// ✅ Always dispose
void ProcessFile()
{
    using var stream = new FileStream("file.txt", FileMode.Open);
    // ... use stream
} // Disposed automatically

// ❌ Event handler memory leak
class Subscriber
{
    public Subscriber(Publisher pub)
    {
        pub.Event += HandleEvent;
        // ❌ Never unsubscribes!
    }
}

// ✅ Unsubscribe when done
class Subscriber : IDisposable
{
    private Publisher publisher;

    public Subscriber(Publisher pub)
    {
        publisher = pub;
        publisher.Event += HandleEvent;
    }

    public void Dispose()
    {
        publisher.Event -= HandleEvent;
    }
}

// ❌ Finalizer without Dispose
class Resource
{
    ~Resource()
    {
        // Close resources
    }
    // ❌ No public Dispose method!
}

// ✅ Implement both
class Resource : IDisposable
{
    public void Dispose()
    {
        Cleanup();
        GC.SuppressFinalize(this);
    }

    ~Resource()
    {
        Cleanup();
    }

    private void Cleanup() { /* ... */ }
}

// ❌ Accessing object after Dispose
class MyClass : IDisposable
{
    private bool disposed = false;

    public void Dispose()
    {
        disposed = true;
    }

    public void DoWork()
    {
        // ❌ No check if disposed!
        // ... do work
    }
}

// ✅ Check disposed state
class MyClass : IDisposable
{
    private bool disposed = false;

    public void Dispose()
    {
        disposed = true;
    }

    public void DoWork()
    {
        if (disposed)
            throw new ObjectDisposedException(nameof(MyClass));
        // ... do work
    }
}

// ❌ Calling GC.Collect in finalizer
~MyClass()
{
    GC.Collect();  // ❌ Very bad! Can cause deadlock
}

// ✅ Simple cleanup only
~MyClass()
{
    // Simple cleanup of unmanaged resources only
    CloseHandle();
}
```

## Key Concepts
- **Garbage Collection**: Automatic memory management
- **Generations**: Gen 0 (new), Gen 1 (medium), Gen 2 (old)
- **Mark and Compact**: GC algorithm phases
- **Large Object Heap**: Heap for objects >= 85,000 bytes
- **IDisposable**: Interface for manual resource cleanup
- **Finalizer**: Method called before object is collected
- **Weak Reference**: Reference that doesn't prevent GC
- **Memory Leak**: Memory that's allocated but never freed
- **GC Modes**: Workstation vs Server garbage collection
- **Latency Mode**: Controls GC pause characteristics
- **Roots**: Starting points for GC tracing (locals, statics)
- **Unmanaged Resources**: Resources outside .NET (files, handles)

## Performance Impact

### When GC Runs:
- **Gen 0**: Very fast (~1-5 ms) - runs frequently
- **Gen 1**: Moderate (~5-50 ms) - runs occasionally
- **Gen 2**: Slower (~50-500+ ms) - runs rarely

### Best Practices:
1. **Minimize allocations** - Reuse objects when possible
2. **Use object pooling** - For frequently created objects
3. **Dispose properly** - Free resources early
4. **Avoid finalizers** - They slow down GC significantly
5. **Monitor memory** - Use performance counters and profilers
6. **Understand object lifetime** - Short vs long-lived
7. **Use structs for small data** - Avoid heap allocation
8. **Lazy initialization** - Create objects only when needed

## Next Steps
Move on to practice problems or explore ASP.NET Core to apply your C# knowledge!

**Advanced Topics to Explore:**
- Span<T> and Memory<T> for low-allocation code
- ArrayPool<T> for object pooling
- Memory profilers (dotMemory, ANTS Memory Profiler)
- Performance monitoring with PerfView
