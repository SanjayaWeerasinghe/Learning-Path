# Async/Await

## What You'll Learn
- What asynchronous programming is and why it's important
- async and await keywords
- Task and Task<T>
- Async methods best practices
- Exception handling in async code
- Task.Run vs async/await
- ConfigureAwait
- Async patterns and anti-patterns
- Cancellation tokens

## Concept Overview

Asynchronous programming allows your program to continue executing other code while waiting for long-running operations (like file I/O, network requests, or database queries) to complete, improving responsiveness and performance.

### Basic Async/Await

```csharp
// Synchronous (blocks thread)
public void DownloadData()
{
    // Blocks for 3 seconds
    Thread.Sleep(3000);
    Console.WriteLine("Data downloaded");
}

// Asynchronous (doesn't block)
public async Task DownloadDataAsync()
{
    // Doesn't block, allows other work
    await Task.Delay(3000);
    Console.WriteLine("Data downloaded");
}

// Usage
await DownloadDataAsync();  // Can only await in async method
Console.WriteLine("Continue working...");
```

### Task<T> - Returning Values

```csharp
public async Task<string> GetDataAsync()
{
    await Task.Delay(1000);  // Simulate async operation
    return "Data from server";
}

public async Task<int> CalculateAsync(int x, int y)
{
    await Task.Delay(500);
    return x + y;
}

// Usage
string data = await GetDataAsync();
Console.WriteLine(data);  // Data from server

int result = await CalculateAsync(5, 3);
Console.WriteLine(result);  // 8
```

### Multiple Async Operations

```csharp
public async Task<string> FetchData1Async()
{
    await Task.Delay(1000);
    return "Data 1";
}

public async Task<string> FetchData2Async()
{
    await Task.Delay(1000);
    return "Data 2";
}

// Sequential (slow - 2 seconds total)
public async Task SequentialAsync()
{
    string data1 = await FetchData1Async();  // Wait 1 second
    string data2 = await FetchData2Async();  // Wait 1 more second
    Console.WriteLine($"{data1}, {data2}");
}

// Parallel (fast - 1 second total)
public async Task ParallelAsync()
{
    Task<string> task1 = FetchData1Async();  // Start both
    Task<string> task2 = FetchData2Async();  // Start both

    string data1 = await task1;  // Wait for both
    string data2 = await task2;

    Console.WriteLine($"{data1}, {data2}");
}

// Using Task.WhenAll
public async Task ParallelWithWhenAllAsync()
{
    var tasks = new[]
    {
        FetchData1Async(),
        FetchData2Async()
    };

    string[] results = await Task.WhenAll(tasks);
    Console.WriteLine(string.Join(", ", results));
}
```

### Exception Handling

```csharp
public async Task<string> FetchDataAsync()
{
    await Task.Delay(1000);
    throw new Exception("Network error");
}

// Handle exceptions
public async Task ProcessDataAsync()
{
    try
    {
        string data = await FetchDataAsync();
        Console.WriteLine(data);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
    }
}

// Multiple tasks with exceptions
public async Task ProcessMultipleAsync()
{
    try
    {
        var tasks = new[]
        {
            FetchData1Async(),
            FetchData2Async()
        };

        await Task.WhenAll(tasks);
    }
    catch (Exception ex)
    {
        // Only catches first exception
        Console.WriteLine($"Error: {ex.Message}");
    }
}

// Catch all exceptions
public async Task ProcessAllExceptionsAsync()
{
    var tasks = new[]
    {
        FetchData1Async(),
        FetchData2Async()
    };

    var whenAllTask = Task.WhenAll(tasks);

    try
    {
        await whenAllTask;
    }
    catch
    {
        // Check all exceptions
        foreach (var ex in whenAllTask.Exception.InnerExceptions)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
```

### Cancellation Tokens

```csharp
public async Task LongRunningOperationAsync(CancellationToken cancellationToken)
{
    for (int i = 0; i < 10; i++)
    {
        // Check if cancellation requested
        cancellationToken.ThrowIfCancellationRequested();

        Console.WriteLine($"Step {i + 1}");
        await Task.Delay(1000, cancellationToken);
    }
}

// Usage
CancellationTokenSource cts = new CancellationTokenSource();

// Start operation
Task operation = LongRunningOperationAsync(cts.Token);

// Cancel after 3 seconds
cts.CancelAfter(TimeSpan.FromSeconds(3));

try
{
    await operation;
}
catch (OperationCanceledException)
{
    Console.WriteLine("Operation was cancelled");
}
finally
{
    cts.Dispose();
}
```

### Task.Run for CPU-Bound Work

```csharp
// CPU-bound work (computations)
public int CalculateExpensive(int n)
{
    int result = 0;
    for (int i = 0; i < n; i++)
    {
        result += i;
    }
    return result;
}

// Run on background thread
public async Task<int> CalculateExpensiveAsync(int n)
{
    return await Task.Run(() => CalculateExpensive(n));
}

// Usage
int result = await CalculateExpensiveAsync(1000000);
Console.WriteLine($"Result: {result}");
```

### Progress Reporting

```csharp
public async Task DownloadFileAsync(string url, IProgress<int> progress)
{
    for (int i = 0; i <= 100; i += 10)
    {
        await Task.Delay(500);  // Simulate download
        progress?.Report(i);
    }
}

// Usage
var progress = new Progress<int>(percent =>
{
    Console.WriteLine($"Download progress: {percent}%");
});

await DownloadFileAsync("http://example.com/file.zip", progress);
```

### Async Event Handlers

```csharp
class Button
{
    public event EventHandler<EventArgs> Click;

    protected virtual void OnClick()
    {
        Click?.Invoke(this, EventArgs.Empty);
    }
}

// Async event handler
button.Click += async (sender, e) =>
{
    Console.WriteLine("Starting async operation...");
    await Task.Delay(2000);
    Console.WriteLine("Async operation completed");
};
```

### ConfigureAwait

```csharp
// Library code - doesn't need UI context
public async Task<string> GetDataFromDatabaseAsync()
{
    await Task.Delay(1000).ConfigureAwait(false);
    // Continues on thread pool thread, not UI thread
    return "Database data";
}

// UI code - needs UI context
public async Task UpdateUIAsync()
{
    string data = await GetDataFromDatabaseAsync();
    // This runs on UI thread if needed
    textBox.Text = data;
}
```

## Your Tasks

### Task 1: Basic Async Method
Create an async method `GreetAfterDelayAsync(string name, int seconds)`:
- Waits for specified seconds
- Returns greeting message
- Test with different delays
Show execution time.

### Task 2: Multiple Async Operations
Create methods that simulate:
- `FetchUserDataAsync()` - takes 2 seconds
- `FetchOrderDataAsync()` - takes 3 seconds
- `FetchInventoryDataAsync()` - takes 1 second

Implement:
- Sequential execution (measure time)
- Parallel execution with Task.WhenAll (measure time)
Compare execution times.

### Task 3: File Download Simulator
Create a `FileDownloader` class with:
- Method: `DownloadFileAsync(string url, string filename)`
- Simulate download with progress (0-100%)
- Use IProgress<int> for progress reporting
- Include random delays
Test downloading multiple files sequentially and in parallel.

### Task 4: Exception Handling
Create methods that:
- `RiskyOperationAsync()` - randomly throws exceptions
- `ProcessMultipleOperationsAsync()` - runs multiple risky operations
- Handle exceptions gracefully
- Log which operations succeeded and which failed
Test with 10 operations.

### Task 5: Cancellation Token
Create a `DataProcessor` class with:
- Method: `ProcessLargeDatasetAsync(CancellationToken cancellationToken)`
- Processes 100 items with delay
- Check cancellation token every 10 items
- Clean up resources if cancelled
Test cancelling at different stages.

### Task 6: Weather Service
Create an async weather service:
- `GetTemperatureAsync(string city)` - takes 1-3 seconds
- `GetHumidityAsync(string city)` - takes 1-2 seconds
- `GetWindSpeedAsync(string city)` - takes 1-2 seconds
- `GetCompleteWeatherAsync(string city)` - gets all data in parallel
Test with multiple cities.

### Task 7: Database Operations
Simulate async database operations:
- `InsertAsync(T item)` - takes 500ms
- `UpdateAsync(T item)` - takes 700ms
- `DeleteAsync(int id)` - takes 400ms
- `GetAllAsync()` - takes 1000ms
Create a batch operation method that processes multiple operations.
Measure and display timing.

### Task 8: Task.WhenAny
Create a race condition simulator:
- Multiple servers responding with different delays
- Use Task.WhenAny to get first response
- Display which server responded first
- Cancel other pending requests
Test with 5 servers.

### Task 9: Progress Reporting System
Create a complex operation with progress:
- Multiple stages (Download, Extract, Process, Save)
- Each stage reports progress 0-100%
- Overall progress calculation
- Display stage name and progress
Use Progress<T> with custom progress class.

### Task 10: Retry Logic
Create a method with retry logic:
- `ExecuteWithRetryAsync<T>(Func<Task<T>> operation, int maxRetries)`
- Retries failed operations with exponential backoff
- Logs each attempt
- Returns result or throws after max retries
Test with unreliable operations.

### Task 11: Async Producer-Consumer
Create an async producer-consumer pattern:
- Producer: generates data items asynchronously
- Consumer: processes items asynchronously
- Use async queue or channel
- Multiple producers and consumers
Display throughput statistics.

### Task 12: Comprehensive Async System
Create an e-commerce order processing system:
- `ValidateOrderAsync()` - 500ms
- `CheckInventoryAsync()` - 1000ms
- `ProcessPaymentAsync()` - 2000ms
- `SendConfirmationEmailAsync()` - 800ms
- `UpdateInventoryAsync()` - 600ms

Features:
- Process multiple orders in parallel
- Handle failures at each stage
- Retry payment operations
- Cancel orders on timeout (10 seconds max)
- Progress reporting for each order
- Comprehensive logging
Test processing 5 orders simultaneously.

## Expected Output Examples

**Task 2:**
```
Sequential Execution:
Fetching user data...
User data received (2.0s)
Fetching order data...
Order data received (3.0s)
Fetching inventory data...
Inventory data received (1.0s)
Total time: 6.0s

Parallel Execution:
Starting all operations...
All data received
Total time: 3.0s
```

**Task 3:**
```
Downloading file1.zip...
Progress: 10%
Progress: 20%
...
Progress: 100%
file1.zip downloaded (5.2s)

Downloading 3 files in parallel...
file1.zip: 30%
file2.zip: 20%
file3.zip: 40%
...
All files downloaded (5.5s)
```

**Task 5:**
```
Processing dataset...
Processed 10/100 items
Processed 20/100 items
Processed 30/100 items
Operation cancelled!
Cleaning up resources...
Processed 32 items before cancellation
```

**Task 8:**
```
Racing 5 servers...

Server 3 responded first! (1.2s)
Response: "Data from Server 3"

Cancelling other requests...
Server 1 cancelled
Server 2 cancelled
Server 4 cancelled
Server 5 cancelled
```

**Task 12:**
```
Processing Order #1001...
[1001] Validating order... ✓ (0.5s)
[1001] Checking inventory... ✓ (1.0s)
[1001] Processing payment... ✓ (2.0s)
[1001] Sending confirmation... ✓ (0.8s)
[1001] Updating inventory... ✓ (0.6s)
Order #1001 completed successfully (4.9s)

Processing Order #1002...
[1002] Validating order... ✓ (0.5s)
[1002] Checking inventory... ✗ Out of stock
Order #1002 failed: Out of stock

Summary:
Orders processed: 5
Successful: 4
Failed: 1
Average time: 4.2s
```

## Tips
- Always use async/await for I/O-bound operations
- Use Task.Run for CPU-bound operations
- Avoid async void except for event handlers
- Use ConfigureAwait(false) in library code
- Always pass CancellationToken to async methods
- Use Task.WhenAll for parallel operations
- Use Task.WhenAny for race conditions
- Handle exceptions in async code properly
- Don't block on async code with .Result or .Wait()
- Use IProgress<T> for progress reporting

## Common Mistakes

```csharp
// ❌ Async void (except event handlers)
public async void ProcessDataAsync()  // Can't catch exceptions!
{
    await Task.Delay(1000);
}

// ✅ Async Task
public async Task ProcessDataAsync()
{
    await Task.Delay(1000);
}

// ❌ Blocking on async code
public void BlockingMethod()
{
    var result = GetDataAsync().Result;  // Deadlock risk!
    GetDataAsync().Wait();  // Deadlock risk!
}

// ✅ Async all the way
public async Task AsyncMethod()
{
    var result = await GetDataAsync();
}

// ❌ Not awaiting tasks
public async Task ProcessAsync()
{
    Task.Delay(1000);  // Not awaited! Returns immediately
    Console.WriteLine("Done");  // Executes right away
}

// ✅ Await tasks
public async Task ProcessAsync()
{
    await Task.Delay(1000);  // Actually waits
    Console.WriteLine("Done");  // After 1 second
}

// ❌ Sequential when should be parallel
public async Task SlowMethod()
{
    await Task1Async();  // Wait
    await Task2Async();  // Wait
    await Task3Async();  // Wait
}

// ✅ Parallel execution
public async Task FastMethod()
{
    var tasks = new[] { Task1Async(), Task2Async(), Task3Async() };
    await Task.WhenAll(tasks);
}

// ❌ Ignoring cancellation token
public async Task OperationAsync(CancellationToken ct)
{
    await Task.Delay(1000);  // Doesn't pass ct!
}

// ✅ Pass cancellation token
public async Task OperationAsync(CancellationToken ct)
{
    await Task.Delay(1000, ct);  // Respects cancellation
}

// ❌ Not handling exceptions in fire-and-forget
public void FireAndForget()
{
    var task = DoWorkAsync();  // Exception swallowed!
}

// ✅ Handle exceptions
public void FireAndForget()
{
    var task = DoWorkAsync();
    task.ContinueWith(t =>
    {
        if (t.IsFaulted)
        {
            Log(t.Exception);
        }
    });
}
```

## Key Concepts
- **Async**: Keyword marking method as asynchronous
- **Await**: Keyword that waits for async operation to complete
- **Task**: Represents an async operation (void)
- **Task<T>**: Represents an async operation returning T
- **Asynchronous**: Non-blocking execution
- **I/O-Bound**: Operations waiting for external resources
- **CPU-Bound**: Operations performing computations
- **Cancellation Token**: Mechanism to cancel async operations
- **Task.WhenAll**: Wait for all tasks to complete
- **Task.WhenAny**: Wait for any task to complete
- **ConfigureAwait**: Control context for continuation

## Next Steps
Move on to `05-Collections` to learn advanced collection types and techniques!
