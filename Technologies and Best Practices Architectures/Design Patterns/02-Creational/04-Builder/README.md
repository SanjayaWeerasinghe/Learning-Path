# Builder Pattern

## What You'll Learn
- Understanding the Builder design pattern
- Constructing complex objects step by step
- Fluent interfaces and method chaining
- When to use Builder vs Constructor
- Different Builder implementations

## Concept Overview

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

### Key Benefits
- **Readability**: Clear, self-documenting code
- **Flexibility**: Build objects step by step
- **Immutability**: Can build immutable objects easily
- **Validation**: Validate during or after construction
- **Optional Parameters**: Handle many optional parameters elegantly

### When to Use
- Object has many parameters (especially optional ones)
- Constructor would have too many parameters
- Object creation requires multiple steps
- Different representations of the same object needed
- Want to create immutable objects with many fields

## Basic Implementation

```java
public class User {
    // Required parameters
    private final String firstName;
    private final String lastName;

    // Optional parameters
    private final int age;
    private final String phone;
    private final String address;
    private final String email;

    private User(Builder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.age = builder.age;
        this.phone = builder.phone;
        this.address = builder.address;
        this.email = builder.email;
    }

    public static class Builder {
        // Required parameters
        private final String firstName;
        private final String lastName;

        // Optional parameters - initialized to default values
        private int age = 0;
        private String phone = "";
        private String address = "";
        private String email = "";

        public Builder(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public User build() {
            // Validation can go here
            return new User(this);
        }
    }

    // Getters only (immutable object)
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    // ... other getters
}

// Usage
User user = new User.Builder("John", "Doe")
    .age(30)
    .email("john@example.com")
    .phone("123-456-7890")
    .build();
```

## Your Tasks

### Task 1: Pizza Builder
Create a Pizza class with various toppings and options.

```java
public class Pizza {
    private final String size;           // Required
    private final String crust;          // Required
    private final boolean cheese;        // Optional
    private final boolean pepperoni;     // Optional
    private final boolean mushrooms;     // Optional
    private final boolean onions;        // Optional
    private final boolean extraSauce;    // Optional

    private Pizza(Builder builder) {
        // Implement
    }

    public static class Builder {
        // Implement builder
    }
}

// Test
public class PizzaTest {
    public static void main(String[] args) {
        Pizza pizza = new Pizza.Builder("Large", "Thin")
            .cheese(true)
            .pepperoni(true)
            .mushrooms(true)
            .extraSauce(true)
            .build();

        System.out.println(pizza);
    }
}
```

**Expected Output:**
```
Pizza: Large, Thin crust, with cheese, pepperoni, mushrooms, extra sauce
```

### Task 2: Computer Builder
Build a computer with various components.

```java
public class Computer {
    // Required
    private final String CPU;
    private final String RAM;

    // Optional
    private final String GPU;
    private final String storage;
    private final boolean bluetoothEnabled;
    private final boolean wifiEnabled;

    private Computer(Builder builder) {
        // Validate required components
        if (builder.CPU == null || builder.RAM == null) {
            throw new IllegalStateException("CPU and RAM are required");
        }
        this.CPU = builder.CPU;
        this.RAM = builder.RAM;
        this.GPU = builder.GPU;
        this.storage = builder.storage;
        this.bluetoothEnabled = builder.bluetoothEnabled;
        this.wifiEnabled = builder.wifiEnabled;
    }

    public static class Builder {
        // Implement
    }

    @Override
    public String toString() {
        // Return formatted computer specs
    }
}
```

### Task 3: Email Builder
Create an email with subject, body, recipients, attachments.

```java
import java.util.*;

public class Email {
    private final String from;                    // Required
    private final List<String> to;                // Required
    private final String subject;                 // Required
    private final String body;                    // Required
    private final List<String> cc;                // Optional
    private final List<String> bcc;               // Optional
    private final List<String> attachments;       // Optional
    private final boolean isHTML;                 // Optional
    private final int priority;                   // Optional (1-5)

    private Email(Builder builder) {
        this.from = builder.from;
        this.to = new ArrayList<>(builder.to);
        this.subject = builder.subject;
        this.body = builder.body;
        this.cc = new ArrayList<>(builder.cc);
        this.bcc = new ArrayList<>(builder.bcc);
        this.attachments = new ArrayList<>(builder.attachments);
        this.isHTML = builder.isHTML;
        this.priority = builder.priority;
    }

    public static class Builder {
        // Implement with methods:
        // addTo(String), addCc(String), addBcc(String)
        // addAttachment(String), priority(int), asHTML()
    }

    public void send() {
        System.out.println("Sending email...");
        System.out.println("From: " + from);
        System.out.println("To: " + to);
        System.out.println("Subject: " + subject);
        // ... print other details
    }
}
```

### Task 4: House Builder
Build a house with different features.

```java
public class House {
    private final int bedrooms;
    private final int bathrooms;
    private final int floors;
    private final boolean hasGarage;
    private final boolean hasSwimmingPool;
    private final boolean hasGarden;
    private final String roofType;
    private final String wallColor;

    private House(Builder builder) {
        // Implement
    }

    public static class Builder {
        // Implement with validation:
        // - At least 1 bedroom
        // - At least 1 bathroom
        // - Floors between 1 and 5
    }
}
```

### Task 5: HTTP Request Builder
Create an HTTP request builder.

```java
import java.util.*;

public class HttpRequest {
    private final String url;
    private final String method;  // GET, POST, PUT, DELETE
    private final Map<String, String> headers;
    private final Map<String, String> queryParams;
    private final String body;
    private final int timeout;

    private HttpRequest(Builder builder) {
        // Implement
    }

    public static class Builder {
        private String url;
        private String method = "GET";
        private Map<String, String> headers = new HashMap<>();
        private Map<String, String> queryParams = new HashMap<>();
        private String body;
        private int timeout = 30000; // 30 seconds default

        public Builder(String url) {
            this.url = url;
        }

        public Builder method(String method) {
            this.method = method;
            return this;
        }

        public Builder addHeader(String key, String value) {
            this.headers.put(key, value);
            return this;
        }

        public Builder addQueryParam(String key, String value) {
            this.queryParams.put(key, value);
            return this;
        }

        public Builder body(String body) {
            this.body = body;
            return this;
        }

        public Builder timeout(int timeout) {
            this.timeout = timeout;
            return this;
        }

        public HttpRequest build() {
            return new HttpRequest(this);
        }
    }

    public void execute() {
        System.out.println("Executing " + method + " request to " + url);
    }
}

// Usage
HttpRequest request = new HttpRequest.Builder("https://api.example.com/users")
    .method("POST")
    .addHeader("Content-Type", "application/json")
    .addHeader("Authorization", "Bearer token123")
    .addQueryParam("page", "1")
    .body("{\"name\":\"John\"}")
    .timeout(5000)
    .build();
```

### Task 6: SQL Query Builder
Build SQL queries programmatically.

```java
import java.util.*;

public class SQLQuery {
    private final String table;
    private final List<String> columns;
    private final String whereClause;
    private final String orderBy;
    private final Integer limit;
    private final List<String> joins;

    private SQLQuery(Builder builder) {
        // Implement
    }

    public static class Builder {
        private String table;
        private List<String> columns = new ArrayList<>();
        private String whereClause;
        private String orderBy;
        private Integer limit;
        private List<String> joins = new ArrayList<>();

        public Builder from(String table) {
            this.table = table;
            return this;
        }

        public Builder select(String... columns) {
            this.columns.addAll(Arrays.asList(columns));
            return this;
        }

        public Builder where(String condition) {
            this.whereClause = condition;
            return this;
        }

        public Builder orderBy(String column) {
            this.orderBy = column;
            return this;
        }

        public Builder limit(int limit) {
            this.limit = limit;
            return this;
        }

        public Builder join(String joinClause) {
            this.joins.add(joinClause);
            return this;
        }

        public SQLQuery build() {
            if (table == null) {
                throw new IllegalStateException("Table is required");
            }
            return new SQLQuery(this);
        }
    }

    public String toSQL() {
        // Build and return SQL string
        StringBuilder sql = new StringBuilder("SELECT ");
        sql.append(columns.isEmpty() ? "*" : String.join(", ", columns));
        sql.append(" FROM ").append(table);
        // ... add joins, where, order by, limit
        return sql.toString();
    }
}

// Usage
SQLQuery query = new SQLQuery.Builder()
    .from("users")
    .select("id", "name", "email")
    .where("age > 18")
    .orderBy("name ASC")
    .limit(10)
    .build();

System.out.println(query.toSQL());
```

### Task 7: Car Builder with Director
Implement Builder with a Director class.

```java
public class Car {
    private final String make;
    private final String model;
    private final int year;
    private final String color;
    private final String engine;
    private final String transmission;

    private Car(Builder builder) {
        // Implement
    }

    public static class Builder {
        // Implement
    }
}

// Director class
public class CarDirector {
    public Car constructSportsCar(Car.Builder builder) {
        return builder
            .engine("V8")
            .transmission("Manual")
            .color("Red")
            .build();
    }

    public Car constructFamilyCar(Car.Builder builder) {
        return builder
            .engine("V6")
            .transmission("Automatic")
            .color("Blue")
            .build();
    }
}

// Usage
CarDirector director = new CarDirector();
Car sportsCar = director.constructSportsCar(
    new Car.Builder("Ferrari", "F8", 2024)
);
```

### Task 8: Meal Builder
Create a meal with multiple items.

```java
import java.util.*;

public class Meal {
    private final List<Item> items;

    private Meal(Builder builder) {
        this.items = new ArrayList<>(builder.items);
    }

    public static class Builder {
        private List<Item> items = new ArrayList<>();

        public Builder addItem(Item item) {
            this.items.add(item);
            return this;
        }

        public Builder addBurger(String name, double price) {
            return addItem(new Item(name, price, "Main"));
        }

        public Builder addDrink(String name, double price) {
            return addItem(new Item(name, price, "Drink"));
        }

        public Builder addDessert(String name, double price) {
            return addItem(new Item(name, price, "Dessert"));
        }

        public Meal build() {
            return new Meal(this);
        }
    }

    public double getTotalPrice() {
        return items.stream().mapToDouble(Item::getPrice).sum();
    }

    public void showItems() {
        items.forEach(item ->
            System.out.println(item.getName() + " - $" + item.getPrice())
        );
        System.out.println("Total: $" + getTotalPrice());
    }
}

class Item {
    private String name;
    private double price;
    private String category;

    // Constructor and getters
}
```

## Common Pitfalls

### 1. Too Simple Objects
```java
// ❌ Don't use Builder for simple objects
public class Point {
    private int x;
    private int y;
    // Just use constructor: new Point(x, y)
}

// ✅ Use Builder for complex objects
public class GraphicsConfig {
    private int width, height, fps, quality;
    private boolean antiAliasing, vSync, shadows;
    // Builder makes sense here
}
```

### 2. Forgetting Validation
```java
public User build() {
    // ✅ Validate before building
    if (email != null && !email.contains("@")) {
        throw new IllegalArgumentException("Invalid email");
    }
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Invalid age");
    }
    return new User(this);
}
```

## Best Practices

1. **Make product immutable**: Only provide getters
2. **Use method chaining**: Return `this` from builder methods
3. **Validate in build()**: Check constraints before creating object
4. **Required vs Optional**: Use constructor for required params
5. **Named static factory**: Use `builder()` method instead of `new Builder()`

```java
public static Builder builder(String requiredParam) {
    return new Builder(requiredParam);
}

// Usage
User user = User.builder("email@example.com")
    .name("John")
    .age(30)
    .build();
```

## Real-World Examples

- `StringBuilder` and `StringBuffer` in Java
- `HttpClient` in Java 11+
- Retrofit (HTTP client library)
- OkHttp request builder
- Gson JSON builder
- JUnit test builders

## Next Steps

After mastering Builder, move on to `05-Prototype` to learn about cloning objects!

**Challenge**: Create a complex form builder that can generate HTML forms with validation rules, different field types (text, email, password, select, checkbox), and custom styling options.
