# Proxy Pattern

## What You'll Learn
- Understanding the Proxy design pattern
- Controlling access to objects through proxies
- Different types of proxies (Virtual, Protection, Remote)
- Lazy initialization and resource optimization
- Access control and security implementation
- Caching and performance optimization with proxies

## Concept Overview

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. The proxy has the same interface as the real object and controls access by performing additional operations before or after forwarding requests.

Think of it like a credit card - it acts as a proxy for your bank account. You don't carry cash (the real object), but you can still make purchases through the card (the proxy).

### Key Characteristics
- **Controlled Access**: Acts as a gatekeeper to the real object
- **Same Interface**: Implements the same interface as the real object
- **Transparency**: Client treats proxy like the real object
- **Lazy Loading**: Can defer object creation until needed
- **Additional Functionality**: Can add behavior without modifying the real object

### Types of Proxies

1. **Virtual Proxy**: Delays creation of expensive objects until needed
2. **Protection Proxy**: Controls access based on permissions
3. **Remote Proxy**: Represents objects in different address spaces
4. **Caching Proxy**: Caches results to improve performance
5. **Smart Reference**: Adds additional actions when object is accessed
6. **Logging Proxy**: Logs all requests to the real object

### When to Use
- Controlling access to expensive objects
- Adding security or access control
- Implementing lazy initialization
- Logging or auditing object usage
- Caching results of expensive operations
- Remote object communication

### Structure

```
Client ---> Subject (Interface)
               |
               |-- RealSubject
               |-- Proxy ---> RealSubject
```

## Basic Implementation

```java
// Subject interface
interface Image {
    void display();
}

// Real subject
class RealImage implements Image {
    private String filename;

    public RealImage(String filename) {
        this.filename = filename;
        loadFromDisk();
    }

    private void loadFromDisk() {
        System.out.println("Loading image: " + filename);
    }

    @Override
    public void display() {
        System.out.println("Displaying image: " + filename);
    }
}

// Proxy
class ImageProxy implements Image {
    private String filename;
    private RealImage realImage;

    public ImageProxy(String filename) {
        this.filename = filename;
    }

    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(filename);
        }
        realImage.display();
    }
}

// Client
public class ProxyDemo {
    public static void main(String[] args) {
        System.out.println("Creating proxy...");
        Image image = new ImageProxy("photo.jpg");

        System.out.println("\nFirst display call:");
        image.display();

        System.out.println("\nSecond display call:");
        image.display();
    }
}
```

**Output:**
```
Creating proxy...

First display call:
Loading image: photo.jpg
Displaying image: photo.jpg

Second display call:
Displaying image: photo.jpg
```

## Your Tasks

### Task 1: Virtual Proxy - Database Query
Create a virtual proxy for expensive database queries.

```java
// Subject interface
interface DatabaseQuery {
    List<String> execute(String query);
}

// Real subject - expensive operation
class RealDatabaseQuery implements DatabaseQuery {
    private String connectionString;

    public RealDatabaseQuery(String connectionString) {
        this.connectionString = connectionString;
        connect();
    }

    private void connect() {
        System.out.println("Connecting to database: " + connectionString);
        // Simulate expensive connection
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Connection established");
    }

    @Override
    public List<String> execute(String query) {
        System.out.println("Executing query: " + query);
        // Simulate query execution
        return List.of("Result1", "Result2", "Result3");
    }
}

// Virtual Proxy
class DatabaseQueryProxy implements DatabaseQuery {
    private String connectionString;
    private RealDatabaseQuery realQuery;

    public DatabaseQueryProxy(String connectionString) {
        this.connectionString = connectionString;
        System.out.println("Database proxy created (not connected yet)");
    }

    @Override
    public List<String> execute(String query) {
        if (realQuery == null) {
            System.out.println("Lazy initialization: Creating real database connection");
            realQuery = new RealDatabaseQuery(connectionString);
        }
        return realQuery.execute(query);
    }
}

// Test
public class DatabaseProxyTest {
    public static void main(String[] args) {
        System.out.println("Creating database proxy...");
        DatabaseQuery db = new DatabaseQueryProxy("jdbc:mysql://localhost:3306/mydb");

        System.out.println("\nExecuting first query:");
        List<String> results1 = db.execute("SELECT * FROM users");
        System.out.println("Results: " + results1);

        System.out.println("\nExecuting second query:");
        List<String> results2 = db.execute("SELECT * FROM orders");
        System.out.println("Results: " + results2);
    }
}
```

**Expected Output:**
```
Creating database proxy...
Database proxy created (not connected yet)

Executing first query:
Lazy initialization: Creating real database connection
Connecting to database: jdbc:mysql://localhost:3306/mydb
Connection established
Executing query: SELECT * FROM users
Results: [Result1, Result2, Result3]

Executing second query:
Executing query: SELECT * FROM orders
Results: [Result1, Result2, Result3]
```

### Task 2: Protection Proxy - Document Access Control
Create a protection proxy that controls access based on user permissions.

```java
// Subject interface
interface Document {
    void view();
    void edit(String content);
    void delete();
}

// Real subject
class SecureDocument implements Document {
    private String content;
    private String filename;

    public SecureDocument(String filename, String content) {
        this.filename = filename;
        this.content = content;
    }

    @Override
    public void view() {
        System.out.println("Viewing document: " + filename);
        System.out.println("Content: " + content);
    }

    @Override
    public void edit(String newContent) {
        System.out.println("Editing document: " + filename);
        this.content = newContent;
        System.out.println("New content: " + content);
    }

    @Override
    public void delete() {
        System.out.println("Deleting document: " + filename);
        this.content = null;
    }
}

// Protection Proxy
class DocumentProxy implements Document {
    private SecureDocument realDocument;
    private String userRole;
    private String filename;
    private String content;

    public DocumentProxy(String filename, String content, String userRole) {
        this.filename = filename;
        this.content = content;
        this.userRole = userRole;
    }

    private void initRealDocument() {
        if (realDocument == null) {
            realDocument = new SecureDocument(filename, content);
        }
    }

    @Override
    public void view() {
        System.out.println("Checking permissions for view operation...");
        if (hasPermission("VIEW")) {
            initRealDocument();
            realDocument.view();
        } else {
            System.out.println("ACCESS DENIED: Insufficient permissions to view");
        }
    }

    @Override
    public void edit(String newContent) {
        System.out.println("Checking permissions for edit operation...");
        if (hasPermission("EDIT")) {
            initRealDocument();
            realDocument.edit(newContent);
        } else {
            System.out.println("ACCESS DENIED: Insufficient permissions to edit");
        }
    }

    @Override
    public void delete() {
        System.out.println("Checking permissions for delete operation...");
        if (hasPermission("DELETE")) {
            initRealDocument();
            realDocument.delete();
        } else {
            System.out.println("ACCESS DENIED: Insufficient permissions to delete");
        }
    }

    private boolean hasPermission(String operation) {
        switch (userRole) {
            case "ADMIN":
                return true;
            case "EDITOR":
                return !operation.equals("DELETE");
            case "VIEWER":
                return operation.equals("VIEW");
            default:
                return false;
        }
    }
}

// Test
public class DocumentProxyTest {
    public static void main(String[] args) {
        System.out.println("=== Admin User ===");
        Document adminDoc = new DocumentProxy("report.txt", "Confidential Report", "ADMIN");
        adminDoc.view();
        adminDoc.edit("Updated Report");
        adminDoc.delete();

        System.out.println("\n=== Editor User ===");
        Document editorDoc = new DocumentProxy("notes.txt", "Meeting Notes", "EDITOR");
        editorDoc.view();
        editorDoc.edit("Updated Notes");
        editorDoc.delete();

        System.out.println("\n=== Viewer User ===");
        Document viewerDoc = new DocumentProxy("public.txt", "Public Info", "VIEWER");
        viewerDoc.view();
        viewerDoc.edit("Trying to edit");
        viewerDoc.delete();
    }
}
```

### Task 3: Caching Proxy - API Response Cache
Create a caching proxy for expensive API calls.

```java
// Subject interface
interface WeatherAPI {
    String getWeather(String city);
}

// Real subject
class RealWeatherAPI implements WeatherAPI {
    @Override
    public String getWeather(String city) {
        System.out.println("Fetching weather from API for: " + city);
        // Simulate expensive API call
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Sunny, 75°F in " + city;
    }
}

// Caching Proxy
class CachedWeatherProxy implements WeatherAPI {
    private RealWeatherAPI realAPI;
    private Map<String, String> cache;
    private Map<String, Long> cacheTimestamps;
    private static final long CACHE_DURATION = 5000; // 5 seconds

    public CachedWeatherProxy() {
        this.realAPI = new RealWeatherAPI();
        this.cache = new HashMap<>();
        this.cacheTimestamps = new HashMap<>();
    }

    @Override
    public String getWeather(String city) {
        long currentTime = System.currentTimeMillis();

        // Check if cached and not expired
        if (cache.containsKey(city)) {
            long cachedTime = cacheTimestamps.get(city);
            if (currentTime - cachedTime < CACHE_DURATION) {
                System.out.println("Returning cached weather for: " + city);
                return cache.get(city);
            } else {
                System.out.println("Cache expired for: " + city);
            }
        }

        // Fetch from real API
        String weather = realAPI.getWeather(city);

        // Cache the result
        cache.put(city, weather);
        cacheTimestamps.put(city, currentTime);

        return weather;
    }

    public void clearCache() {
        System.out.println("Clearing cache");
        cache.clear();
        cacheTimestamps.clear();
    }
}

// Test
public class WeatherProxyTest {
    public static void main(String[] args) throws InterruptedException {
        WeatherAPI weather = new CachedWeatherProxy();

        System.out.println("First call:");
        System.out.println(weather.getWeather("New York"));

        System.out.println("\nSecond call (should use cache):");
        System.out.println(weather.getWeather("New York"));

        System.out.println("\nDifferent city:");
        System.out.println(weather.getWeather("London"));

        System.out.println("\nWaiting for cache to expire...");
        Thread.sleep(6000);

        System.out.println("\nCall after cache expiration:");
        System.out.println(weather.getWeather("New York"));
    }
}
```

### Task 4: Logging Proxy - Method Call Logger
Create a logging proxy that logs all method calls.

```java
// Subject interface
interface Calculator {
    int add(int a, int b);
    int subtract(int a, int b);
    int multiply(int a, int b);
    double divide(int a, int b);
}

// Real subject
class SimpleCalculator implements Calculator {
    @Override
    public int add(int a, int b) {
        return a + b;
    }

    @Override
    public int subtract(int a, int b) {
        return a - b;
    }

    @Override
    public int multiply(int a, int b) {
        return a * b;
    }

    @Override
    public double divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return (double) a / b;
    }
}

// Logging Proxy
class LoggingCalculatorProxy implements Calculator {
    private SimpleCalculator calculator;
    private List<String> logHistory;

    public LoggingCalculatorProxy() {
        this.calculator = new SimpleCalculator();
        this.logHistory = new ArrayList<>();
    }

    @Override
    public int add(int a, int b) {
        log("add", a, b);
        int result = calculator.add(a, b);
        log("add", a, b, result);
        return result;
    }

    @Override
    public int subtract(int a, int b) {
        log("subtract", a, b);
        int result = calculator.subtract(a, b);
        log("subtract", a, b, result);
        return result;
    }

    @Override
    public int multiply(int a, int b) {
        log("multiply", a, b);
        int result = calculator.multiply(a, b);
        log("multiply", a, b, result);
        return result;
    }

    @Override
    public double divide(int a, int b) {
        log("divide", a, b);
        try {
            double result = calculator.divide(a, b);
            log("divide", a, b, result);
            return result;
        } catch (Exception e) {
            logError("divide", a, b, e.getMessage());
            throw e;
        }
    }

    private void log(String method, int a, int b) {
        String entry = String.format("[%s] Calling %s(%d, %d)",
            new java.util.Date(), method, a, b);
        System.out.println(entry);
        logHistory.add(entry);
    }

    private void log(String method, int a, int b, Number result) {
        String entry = String.format("[%s] %s(%d, %d) = %s",
            new java.util.Date(), method, a, b, result);
        System.out.println(entry);
        logHistory.add(entry);
    }

    private void logError(String method, int a, int b, String error) {
        String entry = String.format("[%s] ERROR in %s(%d, %d): %s",
            new java.util.Date(), method, a, b, error);
        System.out.println(entry);
        logHistory.add(entry);
    }

    public void printHistory() {
        System.out.println("\n=== Call History ===");
        logHistory.forEach(System.out::println);
    }
}

// Test
public class LoggingProxyTest {
    public static void main(String[] args) {
        LoggingCalculatorProxy calc = new LoggingCalculatorProxy();

        calc.add(10, 5);
        calc.subtract(10, 5);
        calc.multiply(10, 5);
        calc.divide(10, 5);

        try {
            calc.divide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }

        calc.printHistory();
    }
}
```

### Task 5: Smart Reference Proxy - Reference Counting
Create a smart reference proxy that tracks object usage.

```java
// Subject interface
interface DatabaseConnection {
    void connect();
    void executeQuery(String query);
    void disconnect();
}

// Real subject
class RealDatabaseConnection implements DatabaseConnection {
    private String connectionString;
    private boolean connected = false;

    public RealDatabaseConnection(String connectionString) {
        this.connectionString = connectionString;
    }

    @Override
    public void connect() {
        System.out.println("Opening database connection to: " + connectionString);
        connected = true;
    }

    @Override
    public void executeQuery(String query) {
        if (!connected) {
            throw new IllegalStateException("Not connected to database");
        }
        System.out.println("Executing query: " + query);
    }

    @Override
    public void disconnect() {
        System.out.println("Closing database connection");
        connected = false;
    }
}

// Smart Reference Proxy
class SmartDatabaseProxy implements DatabaseConnection {
    private RealDatabaseConnection realConnection;
    private String connectionString;
    private static int referenceCount = 0;
    private int queryCount = 0;
    private long connectionTime;

    public SmartDatabaseProxy(String connectionString) {
        this.connectionString = connectionString;
    }

    @Override
    public void connect() {
        if (realConnection == null) {
            realConnection = new RealDatabaseConnection(connectionString);
            realConnection.connect();
            connectionTime = System.currentTimeMillis();
            referenceCount++;
            System.out.println("Reference count: " + referenceCount);
        } else {
            System.out.println("Already connected");
        }
    }

    @Override
    public void executeQuery(String query) {
        if (realConnection == null) {
            System.out.println("Auto-connecting before query execution");
            connect();
        }
        queryCount++;
        System.out.println("Query #" + queryCount);
        realConnection.executeQuery(query);
    }

    @Override
    public void disconnect() {
        if (realConnection != null) {
            long duration = System.currentTimeMillis() - connectionTime;
            System.out.println("Connection duration: " + duration + "ms");
            System.out.println("Total queries executed: " + queryCount);

            realConnection.disconnect();
            referenceCount--;
            System.out.println("Reference count: " + referenceCount);

            realConnection = null;
            queryCount = 0;
        }
    }

    public int getQueryCount() {
        return queryCount;
    }
}

// Test
public class SmartProxyTest {
    public static void main(String[] args) throws InterruptedException {
        SmartDatabaseProxy db1 = new SmartDatabaseProxy("jdbc:mysql://localhost/db1");

        db1.connect();
        db1.executeQuery("SELECT * FROM users");
        db1.executeQuery("SELECT * FROM orders");

        Thread.sleep(100);

        SmartDatabaseProxy db2 = new SmartDatabaseProxy("jdbc:mysql://localhost/db2");
        db2.executeQuery("SELECT * FROM products");
        db2.executeQuery("SELECT * FROM inventory");

        db1.disconnect();
        db2.disconnect();
    }
}
```

### Task 6: Remote Proxy - Service Proxy
Create a proxy for remote service calls.

```java
// Subject interface
interface PaymentService {
    boolean processPayment(String userId, double amount);
    String getTransactionStatus(String transactionId);
}

// Real remote service
class RemotePaymentService implements PaymentService {
    @Override
    public boolean processPayment(String userId, double amount) {
        System.out.println("Remote Service: Processing payment");
        System.out.println("  User: " + userId);
        System.out.println("  Amount: $" + amount);
        // Simulate network delay
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("  Payment successful");
        return true;
    }

    @Override
    public String getTransactionStatus(String transactionId) {
        System.out.println("Remote Service: Checking transaction " + transactionId);
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "COMPLETED";
    }
}

// Remote Proxy
class PaymentServiceProxy implements PaymentService {
    private RemotePaymentService remoteService;
    private String serviceUrl;

    public PaymentServiceProxy(String serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    private void connectToRemoteService() {
        if (remoteService == null) {
            System.out.println("Connecting to remote service: " + serviceUrl);
            remoteService = new RemotePaymentService();
            System.out.println("Connected successfully");
        }
    }

    @Override
    public boolean processPayment(String userId, double amount) {
        System.out.println("\n=== Proxy: Processing Payment ===");
        connectToRemoteService();

        // Pre-processing
        if (amount <= 0) {
            System.out.println("Proxy: Invalid amount");
            return false;
        }

        // Call remote service
        boolean result = remoteService.processPayment(userId, amount);

        // Post-processing
        if (result) {
            System.out.println("Proxy: Payment logged locally");
        }

        return result;
    }

    @Override
    public String getTransactionStatus(String transactionId) {
        System.out.println("\n=== Proxy: Checking Status ===");
        connectToRemoteService();
        return remoteService.getTransactionStatus(transactionId);
    }
}

// Test
public class RemoteProxyTest {
    public static void main(String[] args) {
        PaymentService payment = new PaymentServiceProxy("https://payment.api.com");

        payment.processPayment("USER123", 99.99);
        payment.processPayment("USER456", 149.99);
        String status = payment.getTransactionStatus("TXN789");
        System.out.println("Status: " + status);
    }
}
```

### Task 7: Validation Proxy - Input Validation
Create a proxy that validates inputs before calling the real object.

```java
// Subject interface
interface UserService {
    void createUser(String username, String email, int age);
    void updateEmail(String username, String newEmail);
    void deleteUser(String username);
}

// Real subject
class RealUserService implements UserService {
    private Map<String, User> users = new HashMap<>();

    @Override
    public void createUser(String username, String email, int age) {
        User user = new User(username, email, age);
        users.put(username, user);
        System.out.println("User created: " + user);
    }

    @Override
    public void updateEmail(String username, String newEmail) {
        User user = users.get(username);
        if (user != null) {
            user.setEmail(newEmail);
            System.out.println("Email updated for: " + username);
        }
    }

    @Override
    public void deleteUser(String username) {
        users.remove(username);
        System.out.println("User deleted: " + username);
    }

    static class User {
        String username;
        String email;
        int age;

        User(String username, String email, int age) {
            this.username = username;
            this.email = email;
            this.age = age;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        @Override
        public String toString() {
            return String.format("User{username='%s', email='%s', age=%d}",
                username, email, age);
        }
    }
}

// Validation Proxy
class ValidationUserServiceProxy implements UserService {
    private RealUserService realService;

    public ValidationUserServiceProxy() {
        this.realService = new RealUserService();
    }

    @Override
    public void createUser(String username, String email, int age) {
        System.out.println("Validating user creation...");

        if (!isValidUsername(username)) {
            System.out.println("ERROR: Invalid username");
            return;
        }

        if (!isValidEmail(email)) {
            System.out.println("ERROR: Invalid email");
            return;
        }

        if (!isValidAge(age)) {
            System.out.println("ERROR: Invalid age (must be 18-120)");
            return;
        }

        System.out.println("Validation passed");
        realService.createUser(username, email, age);
    }

    @Override
    public void updateEmail(String username, String newEmail) {
        System.out.println("Validating email update...");

        if (!isValidEmail(newEmail)) {
            System.out.println("ERROR: Invalid email");
            return;
        }

        System.out.println("Validation passed");
        realService.updateEmail(username, newEmail);
    }

    @Override
    public void deleteUser(String username) {
        System.out.println("Validating user deletion...");

        if (username == null || username.trim().isEmpty()) {
            System.out.println("ERROR: Username cannot be empty");
            return;
        }

        System.out.println("Validation passed");
        realService.deleteUser(username);
    }

    private boolean isValidUsername(String username) {
        return username != null && username.length() >= 3 && username.length() <= 20;
    }

    private boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }

    private boolean isValidAge(int age) {
        return age >= 18 && age <= 120;
    }
}

// Test
public class ValidationProxyTest {
    public static void main(String[] args) {
        UserService userService = new ValidationUserServiceProxy();

        System.out.println("=== Valid User ===");
        userService.createUser("john_doe", "john@example.com", 25);

        System.out.println("\n=== Invalid Username ===");
        userService.createUser("ab", "short@example.com", 30);

        System.out.println("\n=== Invalid Email ===");
        userService.createUser("jane_doe", "invalid-email", 28);

        System.out.println("\n=== Invalid Age ===");
        userService.createUser("young_user", "young@example.com", 15);

        System.out.println("\n=== Valid Email Update ===");
        userService.updateEmail("john_doe", "newemail@example.com");

        System.out.println("\n=== Invalid Email Update ===");
        userService.updateEmail("john_doe", "invalid");
    }
}
```

### Task 8: Composite Proxy - Multiple Concerns
Create a proxy that combines multiple concerns (logging, caching, validation).

```java
// Subject interface
interface ProductService {
    Product getProduct(String productId);
    void updatePrice(String productId, double newPrice);
}

// Product class
class Product {
    String id;
    String name;
    double price;

    Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    @Override
    public String toString() {
        return String.format("Product{id='%s', name='%s', price=$%.2f}", id, name, price);
    }
}

// Real subject
class RealProductService implements ProductService {
    private Map<String, Product> products = new HashMap<>();

    public RealProductService() {
        products.put("P1", new Product("P1", "Laptop", 999.99));
        products.put("P2", new Product("P2", "Mouse", 29.99));
    }

    @Override
    public Product getProduct(String productId) {
        System.out.println("RealService: Fetching product from database");
        return products.get(productId);
    }

    @Override
    public void updatePrice(String productId, double newPrice) {
        System.out.println("RealService: Updating price in database");
        Product product = products.get(productId);
        if (product != null) {
            product.price = newPrice;
        }
    }
}

// Composite Proxy (Logging + Caching + Validation)
class CompositeProductProxy implements ProductService {
    private RealProductService realService;
    private Map<String, Product> cache;
    private List<String> logs;

    public CompositeProductProxy() {
        this.realService = new RealProductService();
        this.cache = new HashMap<>();
        this.logs = new ArrayList<>();
    }

    @Override
    public Product getProduct(String productId) {
        // Logging
        log("getProduct called with ID: " + productId);

        // Validation
        if (productId == null || productId.trim().isEmpty()) {
            log("ERROR: Invalid product ID");
            return null;
        }

        // Caching
        if (cache.containsKey(productId)) {
            log("Returning cached product");
            return cache.get(productId);
        }

        // Fetch from real service
        Product product = realService.getProduct(productId);

        // Cache the result
        if (product != null) {
            cache.put(productId, product);
            log("Product cached");
        }

        return product;
    }

    @Override
    public void updatePrice(String productId, double newPrice) {
        // Logging
        log("updatePrice called - ID: " + productId + ", Price: $" + newPrice);

        // Validation
        if (newPrice < 0) {
            log("ERROR: Price cannot be negative");
            return;
        }

        if (productId == null || productId.trim().isEmpty()) {
            log("ERROR: Invalid product ID");
            return;
        }

        // Update in real service
        realService.updatePrice(productId, newPrice);

        // Invalidate cache
        cache.remove(productId);
        log("Cache invalidated for product: " + productId);
    }

    private void log(String message) {
        String logEntry = "[" + new java.util.Date() + "] " + message;
        System.out.println(logEntry);
        logs.add(logEntry);
    }

    public void printLogs() {
        System.out.println("\n=== Activity Log ===");
        logs.forEach(System.out::println);
    }
}

// Test
public class CompositeProxyTest {
    public static void main(String[] args) {
        CompositeProductProxy service = new CompositeProductProxy();

        System.out.println("=== First Request ===");
        Product p1 = service.getProduct("P1");
        System.out.println("Result: " + p1);

        System.out.println("\n=== Second Request (Should use cache) ===");
        Product p2 = service.getProduct("P1");
        System.out.println("Result: " + p2);

        System.out.println("\n=== Update Price ===");
        service.updatePrice("P1", 899.99);

        System.out.println("\n=== Request After Update ===");
        Product p3 = service.getProduct("P1");
        System.out.println("Result: " + p3);

        System.out.println("\n=== Invalid Operations ===");
        service.getProduct("");
        service.updatePrice("P1", -50);

        service.printLogs();
    }
}
```

## Common Pitfalls

### 1. Not Implementing Same Interface
```java
// ❌ Proxy doesn't implement subject interface
class BadProxy {
    private Subject subject;
    public void differentMethod() { }
}

// ✅ Proxy implements same interface
class GoodProxy implements Subject {
    private Subject subject;
    @Override
    public void method() { }
}
```

### 2. Memory Leaks with Caching
```java
// ❌ Unbounded cache
class BadCachingProxy {
    private Map<String, Object> cache = new HashMap<>();
    // Cache grows forever
}

// ✅ Bounded cache with expiration
class GoodCachingProxy {
    private Map<String, Object> cache = new LRUCache(100);
    private Map<String, Long> timestamps = new HashMap<>();
}
```

### 3. Proxy Doing Too Much
```java
// ❌ Proxy with too many responsibilities
class OverloadedProxy {
    // Logging, caching, validation, transformation, etc.
}

// ✅ Focused proxy or chain of proxies
class LoggingProxy { }
class CachingProxy { }
class ValidationProxy { }
```

### 4. Breaking Encapsulation
```java
// ❌ Exposing real subject
class BadProxy implements Subject {
    public Subject getRealSubject() {
        return realSubject;  // Don't expose
    }
}

// ✅ Hide real subject
class GoodProxy implements Subject {
    private Subject realSubject;  // Private
}
```

## When NOT to Use Proxy

- When direct access is simpler and sufficient
- When overhead is not justified
- When transparency is not needed
- For simple objects without expensive operations

## Best Practices

1. **Implement same interface**: Ensure transparency
2. **Lazy initialization**: Create real object only when needed
3. **Handle errors gracefully**: Catch exceptions from real object
4. **Keep proxy focused**: One concern per proxy
5. **Chain proxies carefully**: Avoid deep nesting
6. **Consider thread safety**: Especially for caching proxies
7. **Document behavior**: Explain what the proxy adds
8. **Test thoroughly**: Test both proxy and real object

## Real-World Examples

### Java Standard Library
- `java.lang.reflect.Proxy` - Dynamic proxy generation
- `java.rmi.*` - Remote Method Invocation proxies
- `javax.persistence.*` - JPA entity proxies for lazy loading

### Frameworks
- Spring AOP - Method interceptors and proxies
- Hibernate - Lazy loading proxies for entities
- Mock objects in testing frameworks
- Security proxies in Spring Security

### Other Examples
- RPC (Remote Procedure Call) systems
- ORM frameworks - Database entity proxies
- CDN - Proxy servers for content delivery
- API Gateways - Proxy for backend services

## Proxy vs Similar Patterns

### Proxy vs Decorator
- **Proxy**: Controls access to object
- **Decorator**: Adds functionality to object

### Proxy vs Adapter
- **Proxy**: Same interface as subject
- **Adapter**: Different interface

### Proxy vs Facade
- **Proxy**: Wraps single object
- **Facade**: Wraps subsystem

## Next Steps

After mastering Proxy, move on to `05-Composite` to learn about treating individual objects and compositions uniformly!

**Challenge**: Create a comprehensive file system proxy that implements virtual proxies for large files (lazy loading), protection proxies for access control (read/write/execute permissions), caching proxies for frequently accessed files, and logging proxies to track all file operations. The proxy system should handle millions of files efficiently while providing transparent access to clients.
