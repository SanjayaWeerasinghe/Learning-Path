# Adapter Pattern

## What You'll Learn
- Understanding the Adapter design pattern
- Converting incompatible interfaces to work together
- Object Adapter vs Class Adapter approaches
- When and why to use Adapter pattern
- Real-world integration scenarios
- Working with legacy code and third-party libraries

## Concept Overview

The Adapter pattern allows incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces by wrapping an object and exposing a different interface that clients expect.

Think of it like a power adapter when traveling - your device has a specific plug type, but the outlet is different. The adapter bridges this gap.

### Key Characteristics
- **Interface Conversion**: Converts one interface to another
- **Reusability**: Allows reuse of existing classes with incompatible interfaces
- **Transparency**: Client code uses the adapter without knowing about the adaptation
- **Flexibility**: Can work with multiple incompatible interfaces

### When to Use
- Integrating legacy code with new systems
- Working with third-party libraries with different interfaces
- Creating reusable classes that work with unrelated classes
- Supporting multiple vendors or implementations
- Making incompatible interfaces compatible

### Structure

```
Client ---> Target Interface <--- Adapter ---> Adaptee
```

## Implementation Approaches

### 1. Object Adapter (Composition - Recommended)

```java
// Target interface that client expects
interface MediaPlayer {
    void play(String audioType, String fileName);
}

// Adaptee - existing incompatible interface
class AdvancedMediaPlayer {
    void playVlc(String fileName) {
        System.out.println("Playing vlc file: " + fileName);
    }

    void playMp4(String fileName) {
        System.out.println("Playing mp4 file: " + fileName);
    }
}

// Adapter using composition
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;

    public MediaAdapter(String audioType) {
        advancedPlayer = new AdvancedMediaPlayer();
    }

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("vlc")) {
            advancedPlayer.playVlc(fileName);
        } else if (audioType.equalsIgnoreCase("mp4")) {
            advancedPlayer.playMp4(fileName);
        }
    }
}

// Client
class AudioPlayer implements MediaPlayer {
    private MediaAdapter mediaAdapter;

    @Override
    public void play(String audioType, String fileName) {
        if (audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3 file: " + fileName);
        } else if (audioType.equalsIgnoreCase("vlc") ||
                   audioType.equalsIgnoreCase("mp4")) {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        } else {
            System.out.println("Invalid media type: " + audioType);
        }
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        AudioPlayer player = new AudioPlayer();
        player.play("mp3", "song.mp3");
        player.play("mp4", "video.mp4");
        player.play("vlc", "movie.vlc");
    }
}
```

### 2. Class Adapter (Inheritance)

```java
// Target interface
interface Target {
    void request();
}

// Adaptee
class Adaptee {
    void specificRequest() {
        System.out.println("Specific request");
    }
}

// Class Adapter using inheritance (only in languages supporting multiple inheritance)
class ClassAdapter extends Adaptee implements Target {
    @Override
    public void request() {
        specificRequest();
    }
}
```

**Note**: Java doesn't support multiple inheritance of classes, so Object Adapter is preferred.

## Your Tasks

### Task 1: Temperature Converter Adapter
Create an adapter to convert between Celsius and Fahrenheit temperature systems.

```java
// Old system works with Fahrenheit
class FahrenheitSensor {
    public double getTemperature() {
        return 98.6;  // Body temperature in Fahrenheit
    }
}

// New system expects Celsius
interface TemperatureSensor {
    double getTemperatureInCelsius();
    String getUnit();
}

// Create adapter
class TemperatureAdapter implements TemperatureSensor {
    private FahrenheitSensor fahrenheitSensor;

    public TemperatureAdapter(FahrenheitSensor sensor) {
        this.fahrenheitSensor = sensor;
    }

    @Override
    public double getTemperatureInCelsius() {
        // Convert F to C: (F - 32) * 5/9
        double fahrenheit = fahrenheitSensor.getTemperature();
        return (fahrenheit - 32) * 5.0 / 9.0;
    }

    @Override
    public String getUnit() {
        return "Celsius";
    }
}

// Test
public class TemperatureTest {
    public static void main(String[] args) {
        FahrenheitSensor oldSensor = new FahrenheitSensor();
        TemperatureSensor adapter = new TemperatureAdapter(oldSensor);

        System.out.println("Temperature: " + adapter.getTemperatureInCelsius() + " " + adapter.getUnit());
    }
}
```

**Expected Output:**
```
Temperature: 37.0 Celsius
```

### Task 2: Payment Gateway Adapter
Adapt different payment gateways to a common interface.

```java
// Target interface
interface PaymentProcessor {
    void processPayment(double amount);
    boolean refund(String transactionId, double amount);
}

// Adaptee 1 - PayPal
class PayPalAPI {
    public void sendPayment(double dollars) {
        System.out.println("Processing PayPal payment: $" + dollars);
    }

    public void refundPayment(String id, double dollars) {
        System.out.println("Refunding PayPal payment " + id + ": $" + dollars);
    }
}

// Adaptee 2 - Stripe
class StripeAPI {
    public void makePayment(int cents) {
        System.out.println("Processing Stripe payment: " + cents + " cents");
    }

    public void makeRefund(String transactionId, int cents) {
        System.out.println("Refunding Stripe payment " + transactionId + ": " + cents + " cents");
    }
}

// Adapter for PayPal
class PayPalAdapter implements PaymentProcessor {
    private PayPalAPI payPalAPI;

    public PayPalAdapter() {
        this.payPalAPI = new PayPalAPI();
    }

    @Override
    public void processPayment(double amount) {
        payPalAPI.sendPayment(amount);
    }

    @Override
    public boolean refund(String transactionId, double amount) {
        payPalAPI.refundPayment(transactionId, amount);
        return true;
    }
}

// Adapter for Stripe
class StripeAdapter implements PaymentProcessor {
    private StripeAPI stripeAPI;

    public StripeAdapter() {
        this.stripeAPI = new StripeAPI();
    }

    @Override
    public void processPayment(double amount) {
        int cents = (int)(amount * 100);
        stripeAPI.makePayment(cents);
    }

    @Override
    public boolean refund(String transactionId, double amount) {
        int cents = (int)(amount * 100);
        stripeAPI.makeRefund(transactionId, cents);
        return true;
    }
}

// Test
public class PaymentTest {
    public static void main(String[] args) {
        PaymentProcessor paypal = new PayPalAdapter();
        PaymentProcessor stripe = new StripeAdapter();

        paypal.processPayment(100.00);
        stripe.processPayment(100.00);

        paypal.refund("PP123", 50.00);
        stripe.refund("ST456", 50.00);
    }
}
```

**Expected Output:**
```
Processing PayPal payment: $100.0
Processing Stripe payment: 10000 cents
Refunding PayPal payment PP123: $50.0
Refunding Stripe payment ST456: 5000 cents
```

### Task 3: Database Adapter
Create adapters for different database systems.

```java
// Target interface
interface Database {
    void connect(String connectionString);
    void executeQuery(String query);
    void disconnect();
}

// Adaptee 1 - MySQL
class MySQLDatabase {
    public void connectToMySQL(String host, int port, String database) {
        System.out.println("Connected to MySQL: " + host + ":" + port + "/" + database);
    }

    public void runQuery(String sql) {
        System.out.println("Executing MySQL query: " + sql);
    }

    public void close() {
        System.out.println("MySQL connection closed");
    }
}

// Adaptee 2 - MongoDB
class MongoDB {
    public void connect(String uri) {
        System.out.println("Connected to MongoDB: " + uri);
    }

    public void find(String collection, String filter) {
        System.out.println("MongoDB find in " + collection + ": " + filter);
    }

    public void closeConnection() {
        System.out.println("MongoDB connection closed");
    }
}

// Implement MySQL Adapter
class MySQLAdapter implements Database {
    private MySQLDatabase mysql;

    public MySQLAdapter() {
        this.mysql = new MySQLDatabase();
    }

    @Override
    public void connect(String connectionString) {
        // Parse connection string: host:port/database
        String[] parts = connectionString.split("[:/]");
        mysql.connectToMySQL(parts[0], Integer.parseInt(parts[1]), parts[2]);
    }

    @Override
    public void executeQuery(String query) {
        mysql.runQuery(query);
    }

    @Override
    public void disconnect() {
        mysql.close();
    }
}

// Implement MongoDB Adapter
class MongoDBAdapter implements Database {
    private MongoDB mongo;

    public MongoDBAdapter() {
        this.mongo = new MongoDB();
    }

    @Override
    public void connect(String connectionString) {
        mongo.connect(connectionString);
    }

    @Override
    public void executeQuery(String query) {
        // Convert SQL-like query to MongoDB format
        mongo.find("collection", query);
    }

    @Override
    public void disconnect() {
        mongo.closeConnection();
    }
}
```

### Task 4: Logger Adapter
Adapt different logging frameworks to a unified interface.

```java
// Target interface
interface Logger {
    void info(String message);
    void error(String message);
    void debug(String message);
}

// Adaptee 1 - Log4j (legacy)
class Log4jLogger {
    public void logInfo(String msg) {
        System.out.println("[Log4j INFO] " + msg);
    }

    public void logError(String msg) {
        System.out.println("[Log4j ERROR] " + msg);
    }

    public void logDebug(String msg) {
        System.out.println("[Log4j DEBUG] " + msg);
    }
}

// Adaptee 2 - Custom logger
class CustomLogger {
    public void writeLog(String level, String message) {
        System.out.println("[Custom " + level + "] " + message);
    }
}

// Implement adapters for both
class Log4jAdapter implements Logger {
    private Log4jLogger log4j;

    public Log4jAdapter() {
        this.log4j = new Log4jLogger();
    }

    @Override
    public void info(String message) {
        log4j.logInfo(message);
    }

    @Override
    public void error(String message) {
        log4j.logError(message);
    }

    @Override
    public void debug(String message) {
        log4j.logDebug(message);
    }
}

class CustomLoggerAdapter implements Logger {
    private CustomLogger customLogger;

    public CustomLoggerAdapter() {
        this.customLogger = new CustomLogger();
    }

    @Override
    public void info(String message) {
        customLogger.writeLog("INFO", message);
    }

    @Override
    public void error(String message) {
        customLogger.writeLog("ERROR", message);
    }

    @Override
    public void debug(String message) {
        customLogger.writeLog("DEBUG", message);
    }
}
```

### Task 5: XML to JSON Adapter
Create an adapter to convert XML data format to JSON format.

```java
// Target interface
interface DataFormatter {
    String format(String data);
    String getFormatType();
}

// Adaptee - XML formatter
class XMLFormatter {
    public String toXML(String data) {
        return "<data>" + data + "</data>";
    }
}

// Adapter to JSON
class XMLToJSONAdapter implements DataFormatter {
    private XMLFormatter xmlFormatter;

    public XMLToJSONAdapter() {
        this.xmlFormatter = new XMLFormatter();
    }

    @Override
    public String format(String data) {
        String xml = xmlFormatter.toXML(data);
        // Simple XML to JSON conversion (simplified)
        String json = xml.replace("<data>", "{\"data\": \"")
                        .replace("</data>", "\"}");
        return json;
    }

    @Override
    public String getFormatType() {
        return "JSON";
    }
}

// Test
public class FormatterTest {
    public static void main(String[] args) {
        DataFormatter formatter = new XMLToJSONAdapter();
        String result = formatter.format("Hello World");
        System.out.println("Format: " + formatter.getFormatType());
        System.out.println("Result: " + result);
    }
}
```

**Expected Output:**
```
Format: JSON
Result: {"data": "Hello World"}
```

### Task 6: Socket Adapter
Adapt different socket implementations to a unified interface.

```java
// Target interface
interface Socket {
    void connect(String address, int port);
    void send(String data);
    String receive();
    void disconnect();
}

// Adaptee 1 - TCP Socket
class TCPSocket {
    public void openConnection(String ip, int port) {
        System.out.println("TCP connected to " + ip + ":" + port);
    }

    public void write(byte[] data) {
        System.out.println("TCP sending: " + new String(data));
    }

    public byte[] read() {
        return "TCP response".getBytes();
    }

    public void closeConnection() {
        System.out.println("TCP disconnected");
    }
}

// Adaptee 2 - WebSocket
class WebSocket {
    public void connect(String url) {
        System.out.println("WebSocket connected to " + url);
    }

    public void sendMessage(String message) {
        System.out.println("WebSocket sending: " + message);
    }

    public String receiveMessage() {
        return "WebSocket response";
    }

    public void close() {
        System.out.println("WebSocket closed");
    }
}

// Implement adapters
class TCPSocketAdapter implements Socket {
    private TCPSocket tcpSocket;

    public TCPSocketAdapter() {
        this.tcpSocket = new TCPSocket();
    }

    @Override
    public void connect(String address, int port) {
        tcpSocket.openConnection(address, port);
    }

    @Override
    public void send(String data) {
        tcpSocket.write(data.getBytes());
    }

    @Override
    public String receive() {
        return new String(tcpSocket.read());
    }

    @Override
    public void disconnect() {
        tcpSocket.closeConnection();
    }
}

class WebSocketAdapter implements Socket {
    private WebSocket webSocket;

    public WebSocketAdapter() {
        this.webSocket = new WebSocket();
    }

    @Override
    public void connect(String address, int port) {
        webSocket.connect("ws://" + address + ":" + port);
    }

    @Override
    public void send(String data) {
        webSocket.sendMessage(data);
    }

    @Override
    public String receive() {
        return webSocket.receiveMessage();
    }

    @Override
    public void disconnect() {
        webSocket.close();
    }
}
```

### Task 7: Rectangle to Square Adapter
Adapt a Rectangle class to work as a Square.

```java
// Target interface
interface Square {
    void setSide(int side);
    int getArea();
    int getPerimeter();
}

// Adaptee - Rectangle
class Rectangle {
    private int width;
    private int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public int calculateArea() {
        return width * height;
    }

    public int calculatePerimeter() {
        return 2 * (width + height);
    }
}

// Adapter
class RectangleToSquareAdapter implements Square {
    private Rectangle rectangle;

    public RectangleToSquareAdapter() {
        this.rectangle = new Rectangle();
    }

    @Override
    public void setSide(int side) {
        rectangle.setWidth(side);
        rectangle.setHeight(side);
    }

    @Override
    public int getArea() {
        return rectangle.calculateArea();
    }

    @Override
    public int getPerimeter() {
        return rectangle.calculatePerimeter();
    }
}

// Test
public class SquareTest {
    public static void main(String[] args) {
        Square square = new RectangleToSquareAdapter();
        square.setSide(5);

        System.out.println("Area: " + square.getArea());
        System.out.println("Perimeter: " + square.getPerimeter());
    }
}
```

**Expected Output:**
```
Area: 25
Perimeter: 20
```

### Task 8: List to Stack Adapter
Adapt a List to work as a Stack.

```java
import java.util.*;

// Target interface
interface Stack<T> {
    void push(T item);
    T pop();
    T peek();
    boolean isEmpty();
    int size();
}

// Adapter using ArrayList
class ListToStackAdapter<T> implements Stack<T> {
    private List<T> list;

    public ListToStackAdapter() {
        this.list = new ArrayList<>();
    }

    @Override
    public void push(T item) {
        list.add(item);
    }

    @Override
    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return list.remove(list.size() - 1);
    }

    @Override
    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return list.get(list.size() - 1);
    }

    @Override
    public boolean isEmpty() {
        return list.isEmpty();
    }

    @Override
    public int size() {
        return list.size();
    }
}

// Test
public class StackTest {
    public static void main(String[] args) {
        Stack<Integer> stack = new ListToStackAdapter<>();

        stack.push(1);
        stack.push(2);
        stack.push(3);

        System.out.println("Size: " + stack.size());
        System.out.println("Peek: " + stack.peek());
        System.out.println("Pop: " + stack.pop());
        System.out.println("Pop: " + stack.pop());
        System.out.println("Size: " + stack.size());
    }
}
```

**Expected Output:**
```
Size: 3
Peek: 3
Pop: 3
Pop: 2
Size: 1
```

## Common Pitfalls

### 1. Over-Adapting
```java
// ❌ Don't create adapters for everything
class SimpleAdapter implements Target {
    private Adaptee adaptee;

    public void method() {
        adaptee.method();  // No real adaptation needed
    }
}

// ✅ Only adapt when interfaces are truly incompatible
```

### 2. Two-Way Adaptation
```java
// ❌ Avoid bidirectional adapters (violates single responsibility)
class BidirectionalAdapter implements Target, Adaptee {
    // Trying to adapt both ways
}

// ✅ Create separate adapters for each direction
class TargetAdapter implements Target { }
class AdapteeAdapter implements Adaptee { }
```

### 3. Not Handling Null or Edge Cases
```java
// ❌ Missing validation
public String convert(String data) {
    return data.toUpperCase();  // Throws NPE if data is null
}

// ✅ Proper validation
public String convert(String data) {
    if (data == null) {
        return "";
    }
    return data.toUpperCase();
}
```

### 4. Losing Information During Adaptation
```java
// ❌ Loss of precision
public void processPayment(double amount) {
    int cents = (int) amount;  // Loses decimal precision
    stripeAPI.charge(cents);
}

// ✅ Proper conversion
public void processPayment(double amount) {
    int cents = (int) Math.round(amount * 100);
    stripeAPI.charge(cents);
}
```

## When NOT to Use Adapter

- When you can modify the source code of incompatible classes
- When the adaptation is too complex (consider redesigning)
- When performance is critical (extra layer adds overhead)
- When a simpler solution like interface extension works

## Best Practices

1. **Prefer Object Adapter over Class Adapter**: More flexible with composition
2. **Keep adapters simple**: One responsibility - interface conversion
3. **Use descriptive names**: `PayPalToPaymentProcessorAdapter` is clear
4. **Handle errors gracefully**: Validate inputs and handle edge cases
5. **Document the adaptation**: Explain what's being converted and why
6. **Consider bidirectional needs**: Create separate adapters if needed
7. **Test thoroughly**: Ensure all interface methods work correctly
8. **Use interfaces for target**: Makes adapter interchangeable

## Real-World Examples

### Java Standard Library
- `java.util.Arrays#asList()` - Adapts array to List
- `java.util.Collections#list()` - Adapts Enumeration to ArrayList
- `java.io.InputStreamReader` - Adapts InputStream to Reader
- `java.io.OutputStreamWriter` - Adapts OutputStream to Writer

### Frameworks
- Spring Framework's `HandlerAdapter` - Adapts different handler types
- JDBC-ODBC Bridge - Adapts JDBC to ODBC
- JPA implementations - Adapt to different database vendors
- API Gateway patterns - Adapt internal services to external APIs

## Next Steps

After mastering Adapter, move on to `02-Decorator` to learn about adding responsibilities to objects dynamically!

**Challenge**: Create a comprehensive media player that can play various formats (MP3, MP4, VLC, AVI) by adapting different media player libraries. Include features like playlists, volume control, and format conversion, all using the Adapter pattern to integrate different players seamlessly.
