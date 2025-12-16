# Spring Boot Annotations

## What You'll Learn
- Understanding Spring Boot core annotations
- Component scanning and stereotypes
- Dependency injection annotations
- Web-related annotations
- Configuration annotations
- Data access annotations
- Bean lifecycle annotations
- Custom annotations

## Concept Overview

Annotations in Spring Boot are metadata that provide information to the Spring framework about how to configure and manage beans, dependencies, and application behavior.

### 1. Core Spring Boot Annotations

#### @SpringBootApplication
The main annotation that enables auto-configuration, component scanning, and Spring Boot configuration.

```java
@SpringBootApplication
// Equivalent to:
// @Configuration
// @EnableAutoConfiguration
// @ComponentScan
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

#### @Configuration
Indicates that a class declares one or more @Bean methods.

```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```

#### @Bean
Indicates that a method produces a bean to be managed by Spring.

```java
@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        return new HikariDataSource();
    }
}
```

### 2. Stereotype Annotations

#### @Component
Generic stereotype for any Spring-managed component.

```java
@Component
public class EmailService {
    public void sendEmail(String to, String message) {
        // Email sending logic
    }
}
```

#### @Service
Specialization of @Component for service layer.

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
```

#### @Repository
Specialization of @Component for data access layer.

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByLastName(String lastName);
}
```

#### @Controller
Specialization of @Component for web controllers (returns views).

```java
@Controller
public class HomeController {

    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("message", "Welcome");
        return "home"; // Returns view name
    }
}
```

#### @RestController
Combines @Controller and @ResponseBody (returns data, not views).

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}
```

### 3. Dependency Injection Annotations

#### @Autowired
Marks a dependency to be injected by Spring.

```java
@Service
public class OrderService {

    // Field injection (not recommended)
    @Autowired
    private PaymentService paymentService;

    // Constructor injection (recommended)
    private final UserService userService;

    @Autowired
    public OrderService(UserService userService) {
        this.userService = userService;
    }

    // Setter injection
    private EmailService emailService;

    @Autowired
    public void setEmailService(EmailService emailService) {
        this.emailService = emailService;
    }
}
```

#### @Qualifier
Specifies which bean to inject when multiple candidates exist.

```java
@Service
public class NotificationService {

    @Autowired
    @Qualifier("emailNotifier")
    private Notifier notifier;
}

@Component
@Qualifier("emailNotifier")
public class EmailNotifier implements Notifier { }

@Component
@Qualifier("smsNotifier")
public class SmsNotifier implements Notifier { }
```

#### @Primary
Indicates a primary bean when multiple candidates exist.

```java
@Component
@Primary
public class PrimaryDatabase implements Database { }

@Component
public class SecondaryDatabase implements Database { }
```

#### @Value
Injects values from properties files.

```java
@Component
public class AppConfig {

    @Value("${app.name}")
    private String appName;

    @Value("${app.version:1.0}") // Default value
    private String version;

    @Value("#{systemProperties['user.home']}")
    private String userHome;
}
```

### 4. Web Annotations

#### @RequestMapping
Maps HTTP requests to handler methods.

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Product> getAll() {
        return productService.findAll();
    }
}
```

#### HTTP Method Specific Annotations

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping           // GET requests
    public List<Product> getAll() { }

    @GetMapping("/{id}")  // GET with path variable
    public Product getById(@PathVariable Long id) { }

    @PostMapping          // POST requests
    public Product create(@RequestBody Product product) { }

    @PutMapping("/{id}")  // PUT requests
    public Product update(@PathVariable Long id,
                         @RequestBody Product product) { }

    @DeleteMapping("/{id}") // DELETE requests
    public void delete(@PathVariable Long id) { }

    @PatchMapping("/{id}")  // PATCH requests
    public Product partialUpdate(@PathVariable Long id,
                                 @RequestBody Map<String, Object> updates) { }
}
```

#### Request Parameter Annotations

```java
@RestController
public class SearchController {

    // Path variable
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) { }

    // Request parameter
    @GetMapping("/search")
    public List<User> search(@RequestParam String name,
                            @RequestParam(required = false) Integer age) { }

    // Request body
    @PostMapping("/users")
    public User create(@RequestBody User user) { }

    // Request header
    @GetMapping("/info")
    public String getInfo(@RequestHeader("User-Agent") String userAgent) { }
}
```

### 5. Configuration Annotations

#### @ConfigurationProperties
Binds properties to a Java object.

```java
@Component
@ConfigurationProperties(prefix = "database")
public class DatabaseProperties {
    private String url;
    private String username;
    private String password;
    private int maxConnections;

    // Getters and setters
}
```

```properties
database.url=jdbc:mysql://localhost:3306/mydb
database.username=root
database.password=secret
database.max-connections=10
```

#### @PropertySource
Specifies property file location.

```java
@Configuration
@PropertySource("classpath:custom.properties")
public class CustomConfig {
    // Configuration
}
```

### 6. Conditional Annotations

```java
@Configuration
public class ConditionalConfig {

    @Bean
    @ConditionalOnProperty(name = "feature.enabled", havingValue = "true")
    public FeatureService featureService() {
        return new FeatureServiceImpl();
    }

    @Bean
    @ConditionalOnMissingBean
    public DefaultService defaultService() {
        return new DefaultServiceImpl();
    }

    @Bean
    @ConditionalOnClass(name = "com.example.SomeClass")
    public SomeService someService() {
        return new SomeServiceImpl();
    }
}
```

### 7. Validation Annotations

```java
public class User {

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 50)
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @Min(18)
    @Max(100)
    private Integer age;

    @Pattern(regexp = "^[0-9]{10}$")
    private String phoneNumber;

    // Getters and setters
}
```

## Your Tasks

### Task 1: Stereotype Annotations Practice
Create a simple application using all stereotype annotations:

```java
// Component
@Component
public class MessageFormatter {
    public String format(String message) {
        return "Formatted: " + message.toUpperCase();
    }
}

// Service
@Service
public class MessageService {
    @Autowired
    private MessageFormatter formatter;

    public String processMessage(String message) {
        return formatter.format(message);
    }
}

// Controller
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping
    public String getMessage(@RequestParam String text) {
        return messageService.processMessage(text);
    }
}
```

Test: http://localhost:8080/api/messages?text=hello

### Task 2: Dependency Injection Methods
Demonstrate all three types of dependency injection:

```java
@Service
public class OrderService {

    // 1. Field Injection (not recommended)
    @Autowired
    private EmailService emailService;

    // 2. Constructor Injection (recommended)
    private final UserService userService;
    private final PaymentService paymentService;

    @Autowired
    public OrderService(UserService userService,
                       PaymentService paymentService) {
        this.userService = userService;
        this.paymentService = paymentService;
    }

    // 3. Setter Injection
    private NotificationService notificationService;

    @Autowired
    public void setNotificationService(NotificationService service) {
        this.notificationService = service;
    }
}
```

### Task 3: @Value Annotation Practice
Create a configuration class using @Value:

```java
@Component
public class AppSettings {

    @Value("${app.name}")
    private String appName;

    @Value("${app.version}")
    private String version;

    @Value("${app.max-users:100}") // Default value 100
    private int maxUsers;

    @Value("#{2 * 10}") // SpEL expression
    private int calculatedValue;

    public Map<String, Object> getSettings() {
        Map<String, Object> settings = new HashMap<>();
        settings.put("name", appName);
        settings.put("version", version);
        settings.put("maxUsers", maxUsers);
        settings.put("calculated", calculatedValue);
        return settings;
    }
}
```

**application.properties:**
```properties
app.name=My Application
app.version=1.0.0
app.max-users=200
```

### Task 4: HTTP Method Annotations
Create a complete CRUD controller:

```java
@RestController
@RequestMapping("/api/books")
public class BookController {

    private List<Book> books = new ArrayList<>();
    private Long nextId = 1L;

    @GetMapping
    public List<Book> getAllBooks() {
        return books;
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return books.stream()
            .filter(b -> b.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        book.setId(nextId++);
        books.add(book);
        return book;
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id,
                          @RequestBody Book book) {
        books.removeIf(b -> b.getId().equals(id));
        book.setId(id);
        books.add(book);
        return book;
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        books.removeIf(b -> b.getId().equals(id));
    }
}
```

### Task 5: @ConfigurationProperties
Create type-safe configuration:

```java
@Component
@ConfigurationProperties(prefix = "server.config")
public class ServerConfig {
    private String host;
    private int port;
    private int timeout;
    private List<String> allowedOrigins;

    // Getters and setters
}
```

**application.properties:**
```properties
server.config.host=localhost
server.config.port=8080
server.config.timeout=30
server.config.allowed-origins=http://localhost:3000,http://localhost:4200
```

### Task 6: @Qualifier and @Primary
Demonstrate bean selection:

```java
// Interface
public interface PaymentProcessor {
    void processPayment(double amount);
}

// Implementations
@Component
@Primary
public class CreditCardProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        System.out.println("Processing credit card payment: " + amount);
    }
}

@Component
@Qualifier("paypal")
public class PayPalProcessor implements PaymentProcessor {
    public void processPayment(double amount) {
        System.out.println("Processing PayPal payment: " + amount);
    }
}

// Service using @Qualifier
@Service
public class PaymentService {

    @Autowired
    @Qualifier("paypal")
    private PaymentProcessor paypalProcessor;

    @Autowired
    private PaymentProcessor defaultProcessor; // Uses @Primary

    public void processWithPayPal(double amount) {
        paypalProcessor.processPayment(amount);
    }

    public void processWithDefault(double amount) {
        defaultProcessor.processPayment(amount);
    }
}
```

### Task 7: Request Parameters
Create endpoints using various parameter annotations:

```java
@RestController
@RequestMapping("/api/users")
public class UserSearchController {

    @GetMapping("/search")
    public String search(
        @RequestParam String name,
        @RequestParam(required = false) Integer age,
        @RequestParam(defaultValue = "0") int page
    ) {
        return String.format("Searching: name=%s, age=%s, page=%d",
                           name, age, page);
    }

    @GetMapping("/{id}/posts/{postId}")
    public String getUserPost(
        @PathVariable Long id,
        @PathVariable Long postId
    ) {
        return String.format("User %d, Post %d", id, postId);
    }

    @GetMapping("/headers")
    public Map<String, String> getHeaders(
        @RequestHeader("User-Agent") String userAgent,
        @RequestHeader(value = "Accept", required = false) String accept
    ) {
        Map<String, String> headers = new HashMap<>();
        headers.put("userAgent", userAgent);
        headers.put("accept", accept);
        return headers;
    }
}
```

### Task 8: Custom Configuration
Create a custom configuration class:

```java
@Configuration
public class AppConfiguration {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    @ConditionalOnProperty(name = "cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("products", "users");
    }
}
```

### Task 9: Validation Annotations
Create a validated entity and endpoint:

```java
public class UserRegistration {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20)
    private String username;

    @Email(message = "Invalid email format")
    @NotBlank
    private String email;

    @NotNull
    @Min(value = 18, message = "Must be at least 18 years old")
    private Integer age;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
             message = "Password must be at least 8 characters with letters and numbers")
    private String password;

    // Getters and setters
}

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    @PostMapping
    public String register(@Valid @RequestBody UserRegistration user) {
        return "User registered: " + user.getUsername();
    }
}
```

### Task 10: Component Scan Configuration
Create a custom component scan configuration:

```java
@Configuration
@ComponentScan(basePackages = {
    "com.example.app.services",
    "com.example.app.repositories"
})
public class CustomScanConfig {

    @Bean
    public CustomService customService() {
        return new CustomServiceImpl();
    }
}
```

## Common Pitfalls

### 1. Circular Dependencies
**Problem:**
```java
@Service
public class ServiceA {
    @Autowired
    private ServiceB serviceB;
}

@Service
public class ServiceB {
    @Autowired
    private ServiceA serviceA; // Circular dependency!
}
```

**Solution:**
```java
// Use constructor injection with @Lazy
@Service
public class ServiceA {
    private final ServiceB serviceB;

    public ServiceA(@Lazy ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

### 2. Field Injection
**Problem:**
```java
@Autowired
private UserService userService; // Hard to test
```

**Solution:**
```java
private final UserService userService;

@Autowired
public MyClass(UserService userService) {
    this.userService = userService;
}
```

### 3. Missing @RequestBody
**Problem:**
```java
@PostMapping
public User create(User user) { // Won't work!
}
```

**Solution:**
```java
@PostMapping
public User create(@RequestBody User user) { // Correct
}
```

### 4. Wrong @PathVariable Name
**Problem:**
```java
@GetMapping("/{id}")
public User get(@PathVariable Long userId) { // Names don't match!
}
```

**Solution:**
```java
@GetMapping("/{id}")
public User get(@PathVariable Long id) { // Matching names
// OR
@GetMapping("/{id}")
public User get(@PathVariable("id") Long userId) { // Explicit mapping
}
```

### 5. Missing @Component on @ConfigurationProperties
**Problem:**
```java
@ConfigurationProperties(prefix = "app")
public class AppConfig { } // Won't be picked up
```

**Solution:**
```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig { } // Correct
```

## Best Practices

1. **Use Constructor Injection**: Preferred over field injection for testability
2. **@RestController for APIs**: Use @RestController for REST APIs, @Controller for views
3. **Specific HTTP Annotations**: Use @GetMapping, @PostMapping instead of @RequestMapping
4. **@Primary for Default**: Use @Primary to specify default bean when multiple exist
5. **@Qualifier for Specific**: Use @Qualifier when you need a specific implementation
6. **@Value for Simple Properties**: Use @ConfigurationProperties for complex configuration
7. **Validation Annotations**: Always validate user input with @Valid
8. **Meaningful Bean Names**: Use descriptive names for @Bean methods
9. **Package Organization**: Keep annotations-based components well-organized
10. **Documentation**: Document custom annotations and configuration

## Annotation Cheat Sheet

| Annotation | Purpose | Layer |
|-----------|---------|-------|
| @SpringBootApplication | Main application class | Application |
| @RestController | REST API controller | Controller |
| @Service | Service layer | Service |
| @Repository | Data access layer | Repository |
| @Component | Generic component | Any |
| @Autowired | Dependency injection | Any |
| @Value | Inject property values | Any |
| @GetMapping | Handle GET requests | Controller |
| @PostMapping | Handle POST requests | Controller |
| @PathVariable | Extract URL path variable | Controller |
| @RequestParam | Extract query parameter | Controller |
| @RequestBody | Extract request body | Controller |
| @Valid | Enable validation | Controller |

## Next Steps

Once you complete these tasks, move on to `04-Dependency-Injection` to dive deeper into Spring's IoC container and dependency injection patterns!

**Challenge**: Create a multi-layer application (Controller -> Service -> Repository) for a simple library system. Use appropriate annotations, demonstrate different injection types, add validation, use @ConfigurationProperties for settings, and create multiple implementations of a service with @Qualifier and @Primary.
