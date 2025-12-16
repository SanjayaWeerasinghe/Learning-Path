# Multithreading - Concurrent Programming

## What You'll Learn
- Understanding threads and processes
- Creating threads (Thread class and Runnable interface)
- Thread lifecycle and states
- Synchronization
- Thread communication
- Executor framework
- Common multithreading issues

## Concept Overview

Multithreading allows multiple parts of a program to run concurrently, improving performance and responsiveness.

### 1. Creating Threads - Extending Thread Class

```java
class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
            try {
                Thread.sleep(500);  // Sleep 500ms
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

// Usage
MyThread thread1 = new MyThread();
MyThread thread2 = new MyThread();
thread1.start();
thread2.start();
```

### 2. Creating Threads - Implementing Runnable

```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }
}

// Usage
Thread thread1 = new Thread(new MyRunnable());
Thread thread2 = new Thread(new MyRunnable());
thread1.start();
thread2.start();
```

### 3. Synchronization

```java
class Counter {
    private int count = 0;

    // Synchronized method
    public synchronized void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}

// Or synchronized block
class Counter {
    private int count = 0;

    public void increment() {
        synchronized(this) {
            count++;
        }
    }
}
```

### 4. Thread Communication (wait, notify)

```java
class SharedResource {
    private int data;
    private boolean available = false;

    public synchronized void produce(int value) {
        while (available) {
            try {
                wait();
            } catch (InterruptedException e) { }
        }
        data = value;
        available = true;
        notify();
    }

    public synchronized int consume() {
        while (!available) {
            try {
                wait();
            } catch (InterruptedException e) { }
        }
        available = false;
        notify();
        return data;
    }
}
```

### 5. Executor Framework

```java
import java.util.concurrent.*;

// Thread pool
ExecutorService executor = Executors.newFixedThreadPool(3);

// Submit tasks
for (int i = 0; i < 5; i++) {
    executor.submit(() -> {
        System.out.println(Thread.currentThread().getName() + " executing");
    });
}

executor.shutdown();
```

## Your Tasks

### Task 1: Basic Thread Creation
Create a file named `BasicThread.java`.

**Example code:**
```java
class NumberPrinter extends Thread {
    private String threadName;

    public NumberPrinter(String name) {
        this.threadName = name;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(threadName + ": " + i);
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(threadName + " finished");
    }
}

public class BasicThread {
    public static void main(String[] args) {
        NumberPrinter thread1 = new NumberPrinter("Thread-A");
        NumberPrinter thread2 = new NumberPrinter("Thread-B");

        thread1.start();
        thread2.start();

        System.out.println("Main thread continues...");
    }
}
```

### Task 2: Runnable Interface
Create a file named `RunnableDemo.java`.

**Example code:**
```java
class Task implements Runnable {
    private String taskName;

    public Task(String name) {
        this.taskName = name;
    }

    @Override
    public void run() {
        System.out.println(taskName + " started");
        for (int i = 1; i <= 3; i++) {
            System.out.println(taskName + " - Step " + i);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println(taskName + " completed");
    }
}

public class RunnableDemo {
    public static void main(String[] args) {
        Thread t1 = new Thread(new Task("Task-1"));
        Thread t2 = new Thread(new Task("Task-2"));
        Thread t3 = new Thread(new Task("Task-3"));

        t1.start();
        t2.start();
        t3.start();
    }
}
```

### Task 3-12: Additional Threading Tasks

Practice with:
- **Task 3**: Thread with lambda expressions
- **Task 4**: Synchronized counter (race condition demo)
- **Task 5**: Producer-Consumer problem
- **Task 6**: Thread join() method
- **Task 7**: Thread priority
- **Task 8**: Executor service with thread pool
- **Task 9**: Callable and Future
- **Task 10**: Thread-safe collections
- **Task 11**: Deadlock demonstration
- **Task 12**: Thread interruption

## Tips and Common Mistakes

### Tips:
- **Use Runnable over Thread**: More flexible (can extend other classes)
- **Synchronize shared data**: Prevent race conditions
- **Use Executor framework**: Better thread management
- **Avoid excessive synchronization**: Can cause deadlock
- **Handle InterruptedException**: Properly

### Common Mistakes:

1. **Calling run() instead of start()**
   ```java
   Thread t = new Thread(new MyRunnable());
   t.run();   // ❌ Executes in current thread
   t.start(); // ✅ Creates new thread
   ```

2. **Not synchronizing shared resources**
   ```java
   class Counter {
       private int count = 0;
       public void increment() {
           count++;  // ❌ Not thread-safe
       }
   }
   ```

3. **Deadlock**
   ```java
   // Thread 1 locks A, waits for B
   // Thread 2 locks B, waits for A
   // ❌ Deadlock!
   ```

## Next Steps

Move on to `05-JDBC` to learn about database connectivity!
