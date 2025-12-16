# Dependency Injection (DI) and Inversion of Control (IoC)

## What You'll Learn
- Understanding Inversion of Control (IoC) principle
- Dependency Injection concepts and benefits
- Types of Dependency Injection (Constructor, Setter, Field)
- Spring IoC Container and Bean lifecycle
- Bean scopes (Singleton, Prototype, Request, Session)
- Autowiring modes and strategies
- Lazy initialization
- Circular dependency resolution

## Concept Overview

Dependency Injection is a design pattern where objects receive their dependencies from external sources rather than creating them internally. Spring's IoC container manages object creation and dependency injection.

### 1. What is Dependency Injection?

**Without DI (Tight Coupling):**
```java
public class UserService {
    private UserRepository repository = new UserRepository(); // Tight coupling!

    public User findUser(Long id) {
        return repository.findById(id);
    }
}
```

**With DI (Loose Coupling):**
```java
@Service
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository; // Dependency injected
    }

    public User findUser(Long id) {
        return repository.findById(id);
    }
}
```

### 2. Types of Dependency Injection

#### Constructor Injection (Recommended)
```java
@Service
public class OrderService {
    private final UserService userService;
    private final PaymentService paymentService;

    @Autowired // Optional in Spring 4.3+
    public OrderService(UserService userService,
                       PaymentService paymentService) {
        this.userService = userService;
        this.paymentService = paymentService;
    }
}
```

**Benefits:**
- Immutable dependencies (final fields)
- Easy to test
- Null-safety guaranteed
- Clear required dependencies

#### Setter Injection
```java
@Service
public class EmailService {
    private TemplateEngine templateEngine;

    @Autowired
    public void setTemplateEngine(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }
}
```

**Use Cases:**
- Optional dependencies
- Reconfigurable dependencies
- Breaking circular dependencies

#### Field Injection (Not Recommended)
```java
@Service
public class NotificationService {
    @Autowired
    private EmailService emailService; // Direct field injection
}
```

**Drawbacks:**
- Cannot use final fields
- Hard to test
- Hidden dependencies
- Null pointer risks

### 3. IoC Container

The Spring IoC container manages beans and their dependencies.

**Bean Definition:**
```java
@Configuration
public class AppConfig {

    @Bean
    public UserService userService() {
        return new UserService(userRepository());
    }

    @Bean
    public UserRepository userRepository() {
        return new UserRepositoryImpl();
    }
}
```

**Or using Component Scanning:**
```java
@Service
public class UserService { }

@Repository
public class UserRepository { }
```

### 4. Bean Scopes

#### Singleton (Default)
```java
@Service
@Scope("singleton") // Default, not needed
public class ConfigService {
    // Single instance per Spring container
}
```

#### Prototype
```java
@Service
@Scope("prototype")
public class TaskExecutor {
    // New instance every time it's requested
}
```

#### Request (Web)
```java
@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserContext {
    // New instance per HTTP request
}
```

#### Session (Web)
```java
@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class ShoppingCart {
    // New instance per HTTP session
}
```

### 5. Lazy Initialization

```java
@Service
@Lazy
public class HeavyService {
    public HeavyService() {
        System.out.println("HeavyService initialized");
    }
    // Initialized only when first used
}

// Or inject lazily
@Service
public class MyService {
    private final HeavyService heavyService;

    @Autowired
    public MyService(@Lazy HeavyService heavyService) {
        this.heavyService = heavyService;
    }
}
```

### 6. Qualifiers and Primary Beans

**Multiple Implementations:**
```java
public interface NotificationService {
    void sendNotification(String message);
}

@Service
@Qualifier("email")
public class EmailNotificationService implements NotificationService {
    public void sendNotification(String message) {
        System.out.println("Email: " + message);
    }
}

@Service
@Qualifier("sms")
@Primary
public class SmsNotificationService implements NotificationService {
    public void sendNotification(String message) {
        System.out.println("SMS: " + message);
    }
}
```

**Using Specific Implementation:**
```java
@Service
public class AlertService {

    @Autowired
    @Qualifier("email")
    private NotificationService emailNotifier;

    @Autowired
    private NotificationService primaryNotifier; // Uses @Primary (SMS)
}
```

### 7. Bean Lifecycle

```java
@Component
public class LifecycleBean {

    @PostConstruct
    public void init() {
        System.out.println("Bean initialized");
        // Initialization logic
    }

    @PreDestroy
    public void cleanup() {
        System.out.println("Bean destroyed");
        // Cleanup logic
    }
}
```

**Or implement interfaces:**
```java
@Component
public class DatabaseConnection implements InitializingBean, DisposableBean {

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("Connecting to database...");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("Closing database connection...");
    }
}
```

### 8. Circular Dependencies

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

**Solutions:**

**1. Constructor Injection with @Lazy:**
```java
@Service
public class ServiceA {
    private final ServiceB serviceB;

    @Autowired
    public ServiceA(@Lazy ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

**2. Setter Injection:**
```java
@Service
public class ServiceA {
    private ServiceB serviceB;

    @Autowired
    public void setServiceB(ServiceB serviceB) {
        this.serviceB = serviceB;
    }
}
```

**3. Redesign (Best):**
```java
// Create a third service to break the cycle
@Service
public class SharedService {
    // Common functionality
}

@Service
public class ServiceA {
    @Autowired
    private SharedService sharedService;
}

@Service
public class ServiceB {
    @Autowired
    private SharedService sharedService;
}
```

## Your Tasks

### Task 1: Constructor Injection
Create a service with constructor injection:

```java
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final PriceCalculator priceCalculator;

    @Autowired
    public ProductService(ProductRepository productRepository,
                         PriceCalculator priceCalculator) {
        this.productRepository = productRepository;
        this.priceCalculator = priceCalculator;
    }

    public double calculateFinalPrice(Long productId) {
        Product product = productRepository.findById(productId);
        return priceCalculator.calculate(product);
    }
}

@Component
public class PriceCalculator {
    public double calculate(Product product) {
        return product.getBasePrice() * 1.1; // 10% markup
    }
}

@Repository
public class ProductRepository {
    public Product findById(Long id) {
        return new Product(id, "Sample Product", 100.0);
    }
}
```

### Task 2: Compare Injection Types
Demonstrate all three injection types:

```java
@Service
public class DemoService {

    // 1. Constructor Injection (Recommended)
    private final Logger logger;

    @Autowired
    public DemoService(Logger logger) {
        this.logger = logger;
    }

    // 2. Setter Injection
    private ConfigService configService;

    @Autowired
    public void setConfigService(ConfigService configService) {
        this.configService = configService;
    }

    // 3. Field Injection (Not recommended but shown for comparison)
    @Autowired
    private CacheService cacheService;

    public void performOperation() {
        logger.log("Operation started");
        String config = configService.getConfig();
        cacheService.cache(config);
    }
}
```

### Task 3: Bean Scopes
Create beans with different scopes:

```java
// Singleton (default)
@Service
public class ConfigurationService {
    private final String config;

    public ConfigurationService() {
        this.config = "Loaded at " + System.currentTimeMillis();
        System.out.println("ConfigurationService created: " + config);
    }

    public String getConfig() {
        return config;
    }
}

// Prototype
@Component
@Scope("prototype")
public class TaskRunner {
    private final long createdAt;

    public TaskRunner() {
        this.createdAt = System.currentTimeMillis();
        System.out.println("TaskRunner created at: " + createdAt);
    }

    public long getCreatedAt() {
        return createdAt;
    }
}

// Controller to test
@RestController
@RequestMapping("/api/scope")
public class ScopeController {

    @Autowired
    private ConfigurationService configService;

    @Autowired
    private ApplicationContext context;

    @GetMapping("/singleton")
    public Map<String, String> testSingleton() {
        Map<String, String> result = new HashMap<>();
        result.put("first", configService.getConfig());
        result.put("second", configService.getConfig());
        return result; // Both will be same
    }

    @GetMapping("/prototype")
    public Map<String, Long> testPrototype() {
        TaskRunner runner1 = context.getBean(TaskRunner.class);
        TaskRunner runner2 = context.getBean(TaskRunner.class);

        Map<String, Long> result = new HashMap<>();
        result.put("first", runner1.getCreatedAt());
        result.put("second", runner2.getCreatedAt());
        return result; // Both will be different
    }
}
```

### Task 4: Qualifier and Primary
Create multiple implementations with qualifiers:

```java
// Interface
public interface PaymentGateway {
    String processPayment(double amount);
}

// Implementations
@Service
@Qualifier("stripe")
public class StripeGateway implements PaymentGateway {
    public String processPayment(double amount) {
        return "Processed $" + amount + " via Stripe";
    }
}

@Service
@Qualifier("paypal")
@Primary
public class PayPalGateway implements PaymentGateway {
    public String processPayment(double amount) {
        return "Processed $" + amount + " via PayPal";
    }
}

@Service
@Qualifier("square")
public class SquareGateway implements PaymentGateway {
    public String processPayment(double amount) {
        return "Processed $" + amount + " via Square";
    }
}

// Service using qualifiers
@Service
public class CheckoutService {

    @Autowired
    @Qualifier("stripe")
    private PaymentGateway stripeGateway;

    @Autowired
    @Qualifier("paypal")
    private PaymentGateway paypalGateway;

    @Autowired
    private PaymentGateway defaultGateway; // Uses @Primary

    public String payWithStripe(double amount) {
        return stripeGateway.processPayment(amount);
    }

    public String payWithPayPal(double amount) {
        return paypalGateway.processPayment(amount);
    }

    public String payWithDefault(double amount) {
        return defaultGateway.processPayment(amount);
    }
}
```

### Task 5: Bean Lifecycle
Implement bean lifecycle methods:

```java
@Component
public class DatabaseManager {

    private Connection connection;

    @PostConstruct
    public void initialize() {
        System.out.println("Initializing database connection...");
        this.connection = createConnection();
        System.out.println("Database connection established");
    }

    @PreDestroy
    public void cleanup() {
        System.out.println("Closing database connection...");
        if (connection != null) {
            closeConnection(connection);
        }
        System.out.println("Database connection closed");
    }

    private Connection createConnection() {
        // Simulate connection creation
        return new Connection();
    }

    private void closeConnection(Connection conn) {
        // Simulate connection closing
    }

    public void executeQuery(String query) {
        System.out.println("Executing: " + query);
    }

    static class Connection { }
}
```

### Task 6: Lazy Initialization
Demonstrate lazy bean initialization:

```java
@Service
@Lazy
public class ExpensiveService {

    public ExpensiveService() {
        System.out.println("ExpensiveService initialized - this is costly!");
        // Simulate expensive initialization
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public String performOperation() {
        return "Operation completed";
    }
}

@RestController
@RequestMapping("/api/lazy")
public class LazyController {

    private final ExpensiveService expensiveService;

    @Autowired
    public LazyController(@Lazy ExpensiveService expensiveService) {
        System.out.println("LazyController created");
        this.expensiveService = expensiveService;
    }

    @GetMapping("/trigger")
    public String trigger() {
        System.out.println("Endpoint called, now using expensive service");
        return expensiveService.performOperation();
    }
}
```

### Task 7: Configuration Class with Beans
Create beans using @Configuration:

```java
@Configuration
public class AppConfiguration {

    @Bean
    public EmailService emailService() {
        return new EmailService(emailConfig());
    }

    @Bean
    public EmailConfig emailConfig() {
        EmailConfig config = new EmailConfig();
        config.setHost("smtp.gmail.com");
        config.setPort(587);
        return config;
    }

    @Bean
    public MessageFormatter messageFormatter() {
        return new MessageFormatter();
    }
}

public class EmailService {
    private final EmailConfig config;

    public EmailService(EmailConfig config) {
        this.config = config;
    }

    public String getConfigInfo() {
        return "SMTP: " + config.getHost() + ":" + config.getPort();
    }
}
```

### Task 8: Conditional Beans
Create conditional bean configurations:

```java
@Configuration
public class ConditionalConfig {

    @Bean
    @ConditionalOnProperty(name = "feature.cache.enabled", havingValue = "true")
    public CacheService cacheService() {
        System.out.println("Cache is ENABLED");
        return new RedisCacheService();
    }

    @Bean
    @ConditionalOnMissingBean(CacheService.class)
    public CacheService noCacheService() {
        System.out.println("Cache is DISABLED");
        return new NoCacheService();
    }
}

interface CacheService {
    String cache(String key, String value);
}

class RedisCacheService implements CacheService {
    public String cache(String key, String value) {
        return "Cached in Redis: " + key + " = " + value;
    }
}

class NoCacheService implements CacheService {
    public String cache(String key, String value) {
        return "No caching: " + key + " = " + value;
    }
}
```

**application.properties:**
```properties
feature.cache.enabled=true
```

### Task 9: Circular Dependency Resolution
Demonstrate and fix circular dependency:

```java
// Problem: Circular dependency
@Service
public class OrderService {
    @Autowired
    private CustomerService customerService;

    public String processOrder(Long customerId) {
        String customer = customerService.getCustomerInfo(customerId);
        return "Processing order for: " + customer;
    }
}

@Service
public class CustomerService {
    @Autowired
    private OrderService orderService;

    public String getCustomerInfo(Long id) {
        return "Customer " + id;
    }

    public String getOrderHistory(Long customerId) {
        return orderService.processOrder(customerId);
    }
}
```

**Fix with @Lazy:**
```java
@Service
public class OrderService {
    private final CustomerService customerService;

    @Autowired
    public OrderService(@Lazy CustomerService customerService) {
        this.customerService = customerService;
    }
}
```

### Task 10: Complete DI Example
Create a complete multi-layer application:

```java
// Entity
public class Employee {
    private Long id;
    private String name;
    private String department;
    private double salary;
    // Constructor, getters, setters
}

// Repository
@Repository
public class EmployeeRepository {
    private List<Employee> employees = new ArrayList<>();

    public List<Employee> findAll() {
        return employees;
    }

    public void save(Employee employee) {
        employees.add(employee);
    }
}

// Service
@Service
public class EmployeeService {
    private final EmployeeRepository repository;
    private final SalaryCalculator salaryCalculator;

    @Autowired
    public EmployeeService(EmployeeRepository repository,
                          SalaryCalculator salaryCalculator) {
        this.repository = repository;
        this.salaryCalculator = salaryCalculator;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee addEmployee(Employee employee) {
        double calculatedSalary = salaryCalculator.calculateFinalSalary(
            employee.getSalary(), employee.getDepartment()
        );
        employee.setSalary(calculatedSalary);
        repository.save(employee);
        return employee;
    }
}

// Helper
@Component
public class SalaryCalculator {
    public double calculateFinalSalary(double baseSalary, String dept) {
        double multiplier = dept.equals("IT") ? 1.2 : 1.1;
        return baseSalary * multiplier;
    }
}

// Controller
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public Employee add(@RequestBody Employee employee) {
        return employeeService.addEmployee(employee);
    }
}
```

## Common Pitfalls

### 1. Field Injection in Tests
**Problem:**
```java
@Service
public class MyService {
    @Autowired
    private Dependency dependency; // Hard to mock in tests
}
```

**Solution:**
```java
@Service
public class MyService {
    private final Dependency dependency;

    @Autowired
    public MyService(Dependency dependency) {
        this.dependency = dependency; // Easy to mock
    }
}
```

### 2. Forgetting @Autowired on Multiple Parameters
**Problem:**
```java
public MyService(DepA depA, DepB depB) { } // Won't work in older Spring
```

**Solution:**
```java
@Autowired
public MyService(DepA depA, DepB depB) { } // Explicit @Autowired
```

### 3. Mixing Scopes Incorrectly
**Problem:**
```java
@Service // Singleton
public class MyService {
    @Autowired
    private PrototypeBean bean; // Will be same instance!
}
```

**Solution:**
```java
@Service
public class MyService {
    @Autowired
    private ApplicationContext context;

    public void usePrototype() {
        PrototypeBean bean = context.getBean(PrototypeBean.class);
        // Gets new instance each time
    }
}
```

### 4. Null Pointer with Field Injection
**Problem:**
```java
@Service
public class MyService {
    @Autowired
    private Dependency dep;

    public MyService() {
        dep.doSomething(); // NullPointerException!
    }
}
```

**Solution:**
```java
@Service
public class MyService {
    private final Dependency dep;

    @Autowired
    public MyService(Dependency dep) {
        this.dep = dep;
        dep.doSomething(); // Safe
    }
}
```

### 5. Wrong Qualifier Name
**Problem:**
```java
@Qualifier("emailService") // Typo
private NotificationService service;
```

**Solution:**
```java
@Qualifier("email") // Match bean name
private NotificationService service;
```

## Best Practices

1. **Prefer Constructor Injection**: Makes dependencies explicit and enables immutability
2. **Use Final Fields**: With constructor injection for immutable dependencies
3. **Avoid Field Injection**: Hard to test and leads to hidden dependencies
4. **Use @Qualifier Sparingly**: Design better to avoid too many qualifiers
5. **Singleton by Default**: Most beans should be singleton
6. **Lazy Loading**: Use for expensive beans that aren't always needed
7. **Break Circular Dependencies**: Redesign or use @Lazy as last resort
8. **Meaningful Bean Names**: Use clear names for @Bean methods
9. **Lifecycle Methods**: Clean up resources in @PreDestroy
10. **Test Your DI**: Ensure dependencies are properly injected

## Dependency Injection Benefits

- **Loose Coupling**: Components don't know about concrete implementations
- **Testability**: Easy to mock dependencies in tests
- **Maintainability**: Changes to dependencies don't affect consumers
- **Flexibility**: Easy to swap implementations
- **Reusability**: Components can be reused in different contexts
- **Single Responsibility**: Objects focus on their core functionality

## Next Steps

Once you complete these tasks, move on to `02-Intermediate/01-REST-API` to build complete RESTful web services using your DI knowledge!

**Challenge**: Create a complete blog system with Articles, Authors, and Comments. Use constructor injection throughout, implement at least 2 bean scopes, create a service with multiple implementations using @Qualifier, add lifecycle methods to initialize sample data, and demonstrate lazy loading for a heavy reporting service.
