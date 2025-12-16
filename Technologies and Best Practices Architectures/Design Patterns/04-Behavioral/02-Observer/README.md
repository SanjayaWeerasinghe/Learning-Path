# Observer Pattern

## What You'll Learn
- Understanding the Observer design pattern
- Implementing one-to-many dependencies
- Creating event-driven systems
- Loose coupling between objects
- Push vs Pull observer models
- Avoiding memory leaks with observers

## Concept Overview

The Observer pattern defines a one-to-many dependency between objects so that when one object (Subject) changes state, all its dependents (Observers) are notified and updated automatically.

### Key Characteristics
- **Subject**: Maintains list of observers and notifies them of state changes
- **Observer**: Receives notifications and updates accordingly
- **Loose Coupling**: Subject doesn't know concrete observer classes
- **Dynamic Relationships**: Observers can subscribe/unsubscribe at runtime

### When to Use
- When a change to one object requires changing others
- When an object should notify others without knowing who they are
- When you need event handling systems
- When implementing distributed event handling
- For implementing Model-View separation

### Real-World Analogy
Think of a YouTube channel (Subject) and its subscribers (Observers). When a new video is uploaded, all subscribers get notified. Subscribers can subscribe or unsubscribe anytime without affecting the channel.

## Basic Implementation

```java
import java.util.*;

// Observer Interface
interface Observer {
    void update(String message);
}

// Subject Interface
interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

// Concrete Subject
class NewsAgency implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String news;

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(news);
        }
    }

    public void setNews(String news) {
        this.news = news;
        notifyObservers();
    }

    public String getNews() {
        return news;
    }
}

// Concrete Observers
class NewsChannel implements Observer {
    private String name;

    public NewsChannel(String name) {
        this.name = name;
    }

    public void update(String message) {
        System.out.println(name + " received news: " + message);
    }
}

class EmailSubscriber implements Observer {
    private String email;

    public EmailSubscriber(String email) {
        this.email = email;
    }

    public void update(String message) {
        System.out.println("Email sent to " + email + ": " + message);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();

        Observer channel1 = new NewsChannel("CNN");
        Observer channel2 = new NewsChannel("BBC");
        Observer subscriber = new EmailSubscriber("user@email.com");

        agency.attach(channel1);
        agency.attach(channel2);
        agency.attach(subscriber);

        agency.setNews("Breaking: New technology announced!");

        agency.detach(channel2);

        agency.setNews("Update: More details revealed");
    }
}
```

**Output:**
```
CNN received news: Breaking: New technology announced!
BBC received news: Breaking: New technology announced!
Email sent to user@email.com: Breaking: New technology announced!
CNN received news: Update: More details revealed
Email sent to user@email.com: Update: More details revealed
```

## Push vs Pull Model

### Push Model (Observer receives data)
```java
interface Observer {
    void update(String data); // Data is pushed
}

class Subject {
    public void notifyObservers() {
        for (Observer obs : observers) {
            obs.update(this.data); // Pushing data
        }
    }
}
```

### Pull Model (Observer pulls data)
```java
interface Observer {
    void update(Subject subject); // Subject reference passed
}

class ConcreteObserver implements Observer {
    public void update(Subject subject) {
        String data = subject.getData(); // Pulling data
    }
}
```

## Advanced Example: Stock Market

```java
import java.util.*;

class Stock {
    private String symbol;
    private double price;

    public Stock(String symbol, double price) {
        this.symbol = symbol;
        this.price = price;
    }

    public String getSymbol() { return symbol; }
    public double getPrice() { return price; }
}

interface StockObserver {
    void update(Stock stock);
}

class StockMarket {
    private Map<String, List<StockObserver>> observers = new HashMap<>();
    private Map<String, Stock> stocks = new HashMap<>();

    public void addStock(String symbol, double initialPrice) {
        stocks.put(symbol, new Stock(symbol, initialPrice));
        observers.put(symbol, new ArrayList<>());
    }

    public void subscribe(String symbol, StockObserver observer) {
        observers.get(symbol).add(observer);
    }

    public void unsubscribe(String symbol, StockObserver observer) {
        observers.get(symbol).remove(observer);
    }

    public void updateStockPrice(String symbol, double newPrice) {
        Stock stock = new Stock(symbol, newPrice);
        stocks.put(symbol, stock);

        List<StockObserver> stockObservers = observers.get(symbol);
        if (stockObservers != null) {
            for (StockObserver observer : stockObservers) {
                observer.update(stock);
            }
        }
    }
}

class Investor implements StockObserver {
    private String name;

    public Investor(String name) {
        this.name = name;
    }

    public void update(Stock stock) {
        System.out.println(name + " notified: " + stock.getSymbol() +
                         " is now $" + stock.getPrice());
    }
}

class TradingBot implements StockObserver {
    private String strategy;

    public TradingBot(String strategy) {
        this.strategy = strategy;
    }

    public void update(Stock stock) {
        System.out.println("Bot (" + strategy + "): Analyzing " +
                         stock.getSymbol() + " at $" + stock.getPrice());
    }
}
```

## Your Tasks

### Task 1: Weather Station
Create a weather monitoring system where multiple displays update when weather changes.

```java
interface WeatherObserver {
    void update(float temperature, float humidity, float pressure);
}

class WeatherStation {
    private List<WeatherObserver> observers = new ArrayList<>();
    private float temperature;
    private float humidity;
    private float pressure;

    public void registerObserver(WeatherObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(WeatherObserver observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for (WeatherObserver observer : observers) {
            observer.update(temperature, humidity, pressure);
        }
    }

    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers();
    }
}

class CurrentConditionsDisplay implements WeatherObserver {
    public void update(float temperature, float humidity, float pressure) {
        System.out.println("Current: " + temperature + "°F, " +
                         humidity + "% humidity");
    }
}

class StatisticsDisplay implements WeatherObserver {
    private List<Float> temperatures = new ArrayList<>();

    public void update(float temperature, float humidity, float pressure) {
        temperatures.add(temperature);
        float avg = (float) temperatures.stream()
                                       .mapToDouble(Float::doubleValue)
                                       .average()
                                       .orElse(0.0);
        System.out.println("Avg temperature: " + avg + "°F");
    }
}

class ForecastDisplay implements WeatherObserver {
    private float lastPressure = 0;

    public void update(float temperature, float humidity, float pressure) {
        if (pressure > lastPressure) {
            System.out.println("Forecast: Improving weather!");
        } else if (pressure < lastPressure) {
            System.out.println("Forecast: Cooler, rainy weather");
        } else {
            System.out.println("Forecast: More of the same");
        }
        lastPressure = pressure;
    }
}

// Test
public class WeatherStationTest {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();

        WeatherObserver current = new CurrentConditionsDisplay();
        WeatherObserver statistics = new StatisticsDisplay();
        WeatherObserver forecast = new ForecastDisplay();

        station.registerObserver(current);
        station.registerObserver(statistics);
        station.registerObserver(forecast);

        station.setMeasurements(80, 65, 30.4f);
        station.setMeasurements(82, 70, 29.2f);
        station.setMeasurements(78, 90, 29.2f);
    }
}
```

**Expected Output:**
```
Current: 80.0°F, 65.0% humidity
Avg temperature: 80.0°F
Forecast: More of the same
Current: 82.0°F, 70.0% humidity
Avg temperature: 81.0°F
Forecast: Cooler, rainy weather
Current: 78.0°F, 90.0% humidity
Avg temperature: 80.0°F
Forecast: More of the same
```

### Task 2: Social Media Notifications
Implement a social media notification system.

```java
interface SocialMediaObserver {
    void onPostCreated(String username, String content);
    void onCommentAdded(String username, String comment);
    void onLikeReceived(String username);
}

class SocialMediaUser {
    private String username;
    private List<SocialMediaObserver> followers = new ArrayList<>();

    public SocialMediaUser(String username) {
        this.username = username;
    }

    public void addFollower(SocialMediaObserver follower) {
        followers.add(follower);
    }

    public void removeFollower(SocialMediaObserver follower) {
        followers.remove(follower);
    }

    public void createPost(String content) {
        System.out.println(username + " posted: " + content);
        for (SocialMediaObserver follower : followers) {
            follower.onPostCreated(username, content);
        }
    }

    public void addComment(String comment) {
        for (SocialMediaObserver follower : followers) {
            follower.onCommentAdded(username, comment);
        }
    }

    public void receiveLike() {
        for (SocialMediaObserver follower : followers) {
            follower.onLikeReceived(username);
        }
    }
}

class Follower implements SocialMediaObserver {
    private String name;

    public Follower(String name) {
        this.name = name;
    }

    public void onPostCreated(String username, String content) {
        System.out.println(name + " saw " + username + "'s post");
    }

    public void onCommentAdded(String username, String comment) {
        System.out.println(name + " saw " + username + "'s comment");
    }

    public void onLikeReceived(String username) {
        System.out.println(name + " saw " + username + " received a like");
    }
}
```

### Task 3: Auction System
Create a bidding system where bidders are notified of new bids.

```java
interface Bidder {
    void update(String item, double currentBid, String bidder);
}

class Auction {
    private String item;
    private double currentBid;
    private String highestBidder;
    private List<Bidder> bidders = new ArrayList<>();

    public Auction(String item) {
        this.item = item;
        this.currentBid = 0;
    }

    public void registerBidder(Bidder bidder) {
        bidders.add(bidder);
    }

    public void placeBid(String bidderName, double amount) {
        if (amount > currentBid) {
            currentBid = amount;
            highestBidder = bidderName;
            notifyBidders();
        } else {
            System.out.println("Bid too low!");
        }
    }

    private void notifyBidders() {
        for (Bidder bidder : bidders) {
            bidder.update(item, currentBid, highestBidder);
        }
    }
}

class AuctionBidder implements Bidder {
    private String name;

    public AuctionBidder(String name) {
        this.name = name;
    }

    public void update(String item, double currentBid, String bidder) {
        System.out.println(name + " notified: " + item +
                         " bid is $" + currentBid + " by " + bidder);
    }

    public String getName() {
        return name;
    }
}
```

### Task 4: Event Management System
Implement an event notification system.

```java
interface EventListener {
    void onEvent(String eventType, String eventData);
}

class EventManager {
    private Map<String, List<EventListener>> listeners = new HashMap<>();

    public void subscribe(String eventType, EventListener listener) {
        listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(listener);
    }

    public void unsubscribe(String eventType, EventListener listener) {
        List<EventListener> eventListeners = listeners.get(eventType);
        if (eventListeners != null) {
            eventListeners.remove(listener);
        }
    }

    public void notify(String eventType, String data) {
        List<EventListener> eventListeners = listeners.get(eventType);
        if (eventListeners != null) {
            for (EventListener listener : eventListeners) {
                listener.onEvent(eventType, data);
            }
        }
    }
}

class EmailListener implements EventListener {
    private String email;

    public EmailListener(String email) {
        this.email = email;
    }

    public void onEvent(String eventType, String eventData) {
        System.out.println("Email to " + email + ": " +
                         eventType + " - " + eventData);
    }
}

class LogListener implements EventListener {
    public void onEvent(String eventType, String eventData) {
        System.out.println("LOG: " + eventType + " - " + eventData);
    }
}

class SMSListener implements EventListener {
    private String phone;

    public SMSListener(String phone) {
        this.phone = phone;
    }

    public void onEvent(String eventType, String eventData) {
        System.out.println("SMS to " + phone + ": " +
                         eventType + " - " + eventData);
    }
}
```

### Task 5: Chat Room
Create a chat room where users receive messages.

```java
interface ChatObserver {
    void receiveMessage(String sender, String message);
}

class ChatRoom {
    private List<ChatObserver> users = new ArrayList<>();
    private String roomName;

    public ChatRoom(String roomName) {
        this.roomName = roomName;
    }

    public void join(ChatObserver user) {
        users.add(user);
    }

    public void leave(ChatObserver user) {
        users.remove(user);
    }

    public void sendMessage(String sender, String message) {
        for (ChatObserver user : users) {
            user.receiveMessage(sender, message);
        }
    }
}

class User implements ChatObserver {
    private String username;

    public User(String username) {
        this.username = username;
    }

    public void receiveMessage(String sender, String message) {
        if (!sender.equals(username)) {
            System.out.println(username + " received from " +
                             sender + ": " + message);
        }
    }

    public void sendMessage(ChatRoom room, String message) {
        System.out.println(username + " sends: " + message);
        room.sendMessage(username, message);
    }

    public String getUsername() {
        return username;
    }
}
```

### Task 6: Traffic Light System
Create a traffic light system with vehicle observers.

```java
enum LightState {
    RED, YELLOW, GREEN
}

interface TrafficObserver {
    void updateLight(LightState state);
}

class TrafficLight {
    private LightState currentState;
    private List<TrafficObserver> observers = new ArrayList<>();

    public void attach(TrafficObserver observer) {
        observers.add(observer);
    }

    public void detach(TrafficObserver observer) {
        observers.remove(observer);
    }

    public void changeLight(LightState newState) {
        this.currentState = newState;
        System.out.println("Traffic light changed to: " + newState);
        notifyObservers();
    }

    private void notifyObservers() {
        for (TrafficObserver observer : observers) {
            observer.updateLight(currentState);
        }
    }
}

class Vehicle implements TrafficObserver {
    private String name;

    public Vehicle(String name) {
        this.name = name;
    }

    public void updateLight(LightState state) {
        switch (state) {
            case RED:
                System.out.println(name + ": STOP");
                break;
            case YELLOW:
                System.out.println(name + ": SLOW DOWN");
                break;
            case GREEN:
                System.out.println(name + ": GO");
                break;
        }
    }
}

class Pedestrian implements TrafficObserver {
    private String name;

    public Pedestrian(String name) {
        this.name = name;
    }

    public void updateLight(LightState state) {
        if (state == LightState.RED) {
            System.out.println(name + ": Safe to cross");
        } else {
            System.out.println(name + ": Wait to cross");
        }
    }
}
```

### Task 7: Job Application Tracker
Track job application status changes.

```java
enum ApplicationStatus {
    SUBMITTED, UNDER_REVIEW, INTERVIEW_SCHEDULED, ACCEPTED, REJECTED
}

interface ApplicationObserver {
    void onStatusChange(String jobTitle, ApplicationStatus status);
}

class JobApplication {
    private String jobTitle;
    private ApplicationStatus status;
    private List<ApplicationObserver> observers = new ArrayList<>();

    public JobApplication(String jobTitle) {
        this.jobTitle = jobTitle;
        this.status = ApplicationStatus.SUBMITTED;
    }

    public void addObserver(ApplicationObserver observer) {
        observers.add(observer);
    }

    public void updateStatus(ApplicationStatus newStatus) {
        this.status = newStatus;
        notifyObservers();
    }

    private void notifyObservers() {
        for (ApplicationObserver observer : observers) {
            observer.onStatusChange(jobTitle, status);
        }
    }
}

class Applicant implements ApplicationObserver {
    private String name;

    public Applicant(String name) {
        this.name = name;
    }

    public void onStatusChange(String jobTitle, ApplicationStatus status) {
        System.out.println(name + ": Your application for " + jobTitle +
                         " is now: " + status);
    }
}

class RecruitmentSystem implements ApplicationObserver {
    public void onStatusChange(String jobTitle, ApplicationStatus status) {
        System.out.println("SYSTEM: Application " + jobTitle +
                         " updated to " + status);
    }
}
```

### Task 8: Property Listing Alert System
Real estate property alerts for interested buyers.

```java
class Property {
    private String address;
    private double price;
    private String type;

    public Property(String address, double price, String type) {
        this.address = address;
        this.price = price;
        this.type = type;
    }

    public String getAddress() { return address; }
    public double getPrice() { return price; }
    public String getType() { return type; }
}

interface PropertyObserver {
    void notifyNewProperty(Property property);
    void notifyPriceChange(Property property, double oldPrice);
}

class PropertyListing {
    private List<PropertyObserver> observers = new ArrayList<>();
    private List<Property> properties = new ArrayList<>();

    public void subscribe(PropertyObserver observer) {
        observers.add(observer);
    }

    public void unsubscribe(PropertyObserver observer) {
        observers.remove(observer);
    }

    public void addProperty(Property property) {
        properties.add(property);
        for (PropertyObserver observer : observers) {
            observer.notifyNewProperty(property);
        }
    }

    public void updatePrice(Property property, double newPrice) {
        double oldPrice = property.getPrice();
        // Update price logic here
        for (PropertyObserver observer : observers) {
            observer.notifyPriceChange(property, oldPrice);
        }
    }
}

class Buyer implements PropertyObserver {
    private String name;
    private double maxBudget;
    private String preferredType;

    public Buyer(String name, double maxBudget, String preferredType) {
        this.name = name;
        this.maxBudget = maxBudget;
        this.preferredType = preferredType;
    }

    public void notifyNewProperty(Property property) {
        if (property.getPrice() <= maxBudget &&
            property.getType().equals(preferredType)) {
            System.out.println(name + ": Interested in " +
                             property.getAddress() + " at $" + property.getPrice());
        }
    }

    public void notifyPriceChange(Property property, double oldPrice) {
        System.out.println(name + ": Price changed for " +
                         property.getAddress() + " from $" + oldPrice +
                         " to $" + property.getPrice());
    }
}
```

## Common Pitfalls

### 1. Memory Leaks
```java
// ❌ Observer not removed
class Subject {
    private List<Observer> observers = new ArrayList<>();

    public void attach(Observer obs) {
        observers.add(obs);
    }
    // Missing detach method or observers never removed
}

// ✅ Proper cleanup
class Subject {
    private List<Observer> observers = new ArrayList<>();

    public void attach(Observer obs) {
        observers.add(obs);
    }

    public void detach(Observer obs) {
        observers.remove(obs);
    }

    public void cleanup() {
        observers.clear();
    }
}
```

### 2. ConcurrentModificationException
```java
// ❌ Modifying list during iteration
public void notifyObservers() {
    for (Observer obs : observers) {
        obs.update(); // Observer might detach itself
    }
}

// ✅ Use copy of list
public void notifyObservers() {
    List<Observer> observersCopy = new ArrayList<>(observers);
    for (Observer obs : observersCopy) {
        obs.update();
    }
}
```

### 3. Unexpected Update Order
```java
// ❌ Order dependent logic
class Display1 implements Observer {
    void update() {
        // Assumes Display2 already updated
    }
}

// ✅ Observers should be independent
class Display1 implements Observer {
    void update() {
        // Self-contained logic
    }
}
```

### 4. Heavy Processing in Update
```java
// ❌ Blocking update
public void update(Data data) {
    processLargeDataset(data); // Takes long time
}

// ✅ Async processing
public void update(Data data) {
    CompletableFuture.runAsync(() -> processLargeDataset(data));
}
```

## Best Practices

1. **Use WeakReferences**: For automatic cleanup in some cases
2. **Thread Safety**: Synchronize observer list access if needed
3. **Async Notifications**: For time-consuming updates
4. **Event Types**: Support multiple event types in one subject
5. **Prevent Infinite Loops**: Avoid observers modifying subject during update
6. **Document Notification Order**: If order matters, document it
7. **Consider Pull Model**: When observers need different data
8. **Proper Cleanup**: Always provide detach/unsubscribe mechanism

## Observer in Java

### Built-in Observer Pattern (Deprecated)
```java
import java.util.Observable;
import java.util.Observer;

// Note: Deprecated in Java 9+
class Subject extends Observable {
    public void changeState(String state) {
        setChanged();
        notifyObservers(state);
    }
}
```

### Modern Alternatives
- **PropertyChangeListener**: For JavaBeans properties
- **EventListener**: For AWT/Swing events
- **Reactive Streams**: RxJava, Project Reactor
- **Spring Events**: ApplicationEvent and @EventListener

## Real-World Examples

### Java Library Examples
- `java.util.EventListener` - GUI event handling
- `javax.servlet.ServletContextListener` - Web application events
- JavaBeans `PropertyChangeListener`
- Swing/AWT event model

### Framework Examples
- Spring Framework - ApplicationEvent
- Android - LiveData, Observer
- JavaFX - Observable collections
- Message queues - Pub/Sub pattern

## Next Steps

After mastering Observer, move on to `03-Command` to learn about encapsulating requests as objects!

**Challenge**: Create a complete stock portfolio management system where:
- Multiple portfolios can watch multiple stocks
- Support different notification types (email, SMS, push)
- Implement price alerts (notify when price crosses threshold)
- Add support for portfolio value updates
- Handle thousands of observers efficiently
- Implement proper memory management and cleanup
