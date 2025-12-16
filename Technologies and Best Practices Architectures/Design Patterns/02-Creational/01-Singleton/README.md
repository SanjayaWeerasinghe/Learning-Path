# Singleton Pattern

## What You'll Learn
- Understanding the Singleton design pattern
- When and why to use Singleton
- Different ways to implement Singleton
- Thread-safe Singleton implementation
- Common pitfalls and best practices

## Concept Overview

The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance. This is useful when exactly one object is needed to coordinate actions across the system.

### Key Characteristics
- **Single Instance**: Only one instance of the class exists
- **Global Access**: Provides a global point of access to that instance
- **Lazy Initialization**: Instance is created only when needed (in most implementations)

### When to Use
- Database connections
- Configuration managers
- Logging services
- Thread pools
- Cache managers
- Hardware interface access

## Implementation Approaches

### 1. Eager Initialization
```java
public class EagerSingleton {
    private static final EagerSingleton instance = new EagerSingleton();

    private EagerSingleton() {
        // Private constructor
    }

    public static EagerSingleton getInstance() {
        return instance;
    }
}
```

**Pros**: Thread-safe, simple
**Cons**: Instance created even if never used

### 2. Lazy Initialization
```java
public class LazySingleton {
    private static LazySingleton instance;

    private LazySingleton() {
        // Private constructor
    }

    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}
```

**Pros**: Instance created only when needed
**Cons**: Not thread-safe

### 3. Thread-Safe Singleton
```java
public class ThreadSafeSingleton {
    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton() {
        // Private constructor
    }

    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }
}
```

**Pros**: Thread-safe
**Cons**: Synchronized method can be slow

### 4. Double-Checked Locking
```java
public class DoubleCheckedSingleton {
    private static volatile DoubleCheckedSingleton instance;

    private DoubleCheckedSingleton() {
        // Private constructor
    }

    public static DoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
}
```

**Pros**: Thread-safe, efficient
**Cons**: More complex

### 5. Bill Pugh Singleton (Best Practice)
```java
public class BillPughSingleton {
    private BillPughSingleton() {
        // Private constructor
    }

    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}
```

**Pros**: Thread-safe, lazy initialization, no synchronization overhead
**Best Practice**: Recommended approach

### 6. Enum Singleton (Most Secure)
```java
public enum EnumSingleton {
    INSTANCE;

    public void doSomething() {
        // Your code here
    }
}

// Usage: EnumSingleton.INSTANCE.doSomething();
```

**Pros**: Thread-safe, prevents reflection attacks, serialization-safe
**Joshua Bloch (Effective Java)**: "A single-element enum type is the best way to implement a singleton"

## Your Tasks

### Task 1: Basic Singleton - Logger
Create a `Logger` class using the Eager Singleton pattern that manages application logging.

```java
public class Logger {
    // Implement singleton pattern

    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

// Test
public class LoggerTest {
    public static void main(String[] args) {
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();

        logger1.log("First message");
        logger2.log("Second message");

        System.out.println("Same instance? " + (logger1 == logger2));
    }
}
```

**Expected Output:**
```
[LOG] First message
[LOG] Second message
Same instance? true
```

### Task 2: Database Connection
Create a `DatabaseConnection` singleton using Bill Pugh implementation.

```java
public class DatabaseConnection {
    private String connectionString;

    // Implement Bill Pugh Singleton

    public void connect() {
        System.out.println("Connected to database: " + connectionString);
    }
}
```

### Task 3: Configuration Manager
Create a thread-safe `ConfigurationManager` using Double-Checked Locking.

```java
public class ConfigurationManager {
    private Map<String, String> config = new HashMap<>();

    // Implement with double-checked locking

    public void setConfig(String key, String value) {
        config.put(key, value);
    }

    public String getConfig(String key) {
        return config.get(key);
    }
}
```

### Task 4: Cache Manager with Enum
Create a `CacheManager` using Enum Singleton.

```java
public enum CacheManager {
    INSTANCE;

    private Map<String, Object> cache = new HashMap<>();

    public void put(String key, Object value) {
        cache.put(key, value);
    }

    public Object get(String key) {
        return cache.get(key);
    }
}
```

### Task 5: Thread Pool Manager
Create a `ThreadPoolManager` that manages a fixed thread pool.

```java
public class ThreadPoolManager {
    private ExecutorService executor;

    // Implement singleton

    public void executeTask(Runnable task) {
        executor.execute(task);
    }

    public void shutdown() {
        executor.shutdown();
    }
}
```

### Task 6: Application Settings
Create an `AppSettings` singleton that loads and manages application settings.

```java
public class AppSettings {
    private String appName;
    private String version;
    private boolean debugMode;

    // Implement singleton

    public void loadSettings() {
        appName = "MyApp";
        version = "1.0.0";
        debugMode = true;
    }

    // Getters and setters
}
```

### Task 7: Breaking Singleton with Reflection (Learning)
Try to break the Singleton pattern using reflection and then prevent it.

```java
public class SingletonBreakTest {
    public static void main(String[] args) throws Exception {
        Logger instance1 = Logger.getInstance();

        // Try to create another instance using reflection
        Constructor<Logger> constructor = Logger.class.getDeclaredConstructor();
        constructor.setAccessible(true);
        Logger instance2 = constructor.newInstance();

        System.out.println("Same instance? " + (instance1 == instance2));
    }
}
```

Then modify your Singleton to prevent this:
```java
private Logger() {
    if (instance != null) {
        throw new RuntimeException("Use getInstance() method");
    }
}
```

### Task 8: Serialization-Safe Singleton
Make your Singleton serialization-safe.

```java
public class SerializableSingleton implements Serializable {
    // Implement singleton

    // Prevent creating new instance during deserialization
    protected Object readResolve() {
        return getInstance();
    }
}
```

## Common Pitfalls

### 1. Multi-threading Issues
```java
// ❌ Not thread-safe
public static Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();  // Multiple threads can create instances
    }
    return instance;
}

// ✅ Thread-safe
public static synchronized Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();
    }
    return instance;
}
```

### 2. Reflection Attacks
```java
// ❌ Vulnerable to reflection
private Singleton() { }

// ✅ Protected
private Singleton() {
    if (instance != null) {
        throw new RuntimeException("Use getInstance()");
    }
}
```

### 3. Cloning Issues
```java
// ✅ Prevent cloning
@Override
protected Object clone() throws CloneNotSupportedException {
    throw new CloneNotSupportedException();
}
```

## When NOT to Use Singleton

- When you need multiple instances
- In unit testing (hard to mock)
- When it creates tight coupling
- If it maintains mutable state accessed by multiple threads (without proper synchronization)

## Best Practices

1. **Use Enum for simple cases**: Most robust implementation
2. **Use Bill Pugh for complex cases**: Lazy loading with thread safety
3. **Make constructor private**: Prevent instantiation
4. **Consider using Dependency Injection**: Instead of Singleton for better testability
5. **Document why Singleton is needed**: Help future maintainers understand

## Real-World Examples

- `java.lang.Runtime` - JVM runtime environment
- `java.awt.Desktop` - Desktop integration
- Spring Framework beans (by default)
- Database connection pools
- Logging frameworks

## Next Steps

After mastering Singleton, move on to `02-Factory` to learn about creating objects without specifying their exact classes!

**Challenge**: Create a Singleton that manages application state and can save/load state from a file, ensuring thread-safety and serialization support.
